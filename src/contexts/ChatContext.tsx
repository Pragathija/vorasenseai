import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import { streamChat, speak, stopSpeaking } from "@/services/aiChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";

export type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

type ChatContextType = {
  messages: ChatMsg[];
  isListening: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  partialTranscript: string;
  learningPath: string[];
  volume: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSpeaking: () => void;
  toggleListening: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { language, speechLang, t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [partialTranscript, setPartialTranscript] = useState("");
  const [learningPath, setLearningPath] = useState<string[]>([]);
  const [volume, setVolume] = useState(0);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: t?.aiAssistant + " - " + t?.alwaysListening + "! 🧠" },
  ]);

  const recognitionRef = useRef<any>(null);
  const manualStopRef = useRef(false);

  // Audio Analyser for Visualizer & Permission forcing
  useEffect(() => {
    let audioCtx: AudioContext;
    let analyser: AnalyserNode;
    let source: MediaStreamAudioSourceNode;
    let stream: MediaStream;
    let reqFrame: number;

    if (isListening) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((s) => {
          stream = s;
          audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          analyser = audioCtx.createAnalyser();
          source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.fftSize = 256;
          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const updateVolume = () => {
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
            setVolume(avg);
            reqFrame = requestAnimationFrame(updateVolume);
          };
          updateVolume();
        })
        .catch((e) => {
          console.error("Mic access denied or error:", e);
        });
    }

    return () => {
      if (reqFrame) cancelAnimationFrame(reqFrame);
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (audioCtx && audioCtx.state !== "closed") audioCtx.close();
      setVolume(0);
    };
  }, [isListening]);

  const saveMessage = useCallback(async (role: string, content: string) => {
    if (!user) return;
    try {
      await supabase.from("chat_messages").insert({ user_id: user.id, role, content, language });
    } catch (e) {
      console.error("Save msg error", e);
    }
  }, [user, language]);

  const clearChat = useCallback(() => {
    setMessages([{ role: "assistant", content: t?.aiAssistant + " - " + t?.alwaysListening + "! 🧠" }]);
  }, [t]);

  const toggleSpeaking = useCallback(() => {
    setIsSpeaking(prev => {
      const next = !prev;
      if (!next) stopSpeaking();
      return next;
    });
  }, []);

  const sendToAI = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: ChatMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);
    saveMessage("user", text);

    // If on normal pages, open chat automatically if closed?
    // Actually, don't open BrainMic layout if user is on full-page concept viewer!
    if (!isOpen && !location.pathname.includes('/concepts')) {
       setIsOpen(true); 
    }

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: newMessages.filter(m => m.role !== "system") as any,
      language,
      onDelta: upsertAssistant,
      onDone: () => {
        setIsLoading(false);
        saveMessage("assistant", assistantSoFar);
        if (isSpeaking && assistantSoFar) {
          speak(assistantSoFar.replace(/[#*`_]/g, ""), speechLang);
        }
      },
      onError: (err) => {
        setIsLoading(false);
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${err}` }]);
      },
    });
  }, [messages, language, speechLang, isLoading, isSpeaking, saveMessage, isOpen, location.pathname]);

  const executeVoiceCommand = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const textLower = text.toLowerCase();
    
    // Learning Intents
    if (learningPath.length > 0) {
      const topicMatch = learningPath.find(topic => textLower.includes(topic.toLowerCase()));
      if (topicMatch && textLower.includes("quiz")) {
        const quizPrompt = `Generate 3-question MC quiz JSON on ${topicMatch}: [{"q":"?", "options":["A","B","C","D"], "answerIndex":0, "explanation":""}]`;
        setMessages(prev => [...prev, { role: "user", content: text }]);
        sendToAI(quizPrompt);
        if (isSpeaking) speak(`Starting quiz on ${topicMatch}`, speechLang);
        return;
      }
      if (topicMatch && (textLower.includes("teach") || textLower.includes("lesson"))) {
        setMessages(prev => [...prev, { role: "user", content: text }]);
        sendToAI(`Teach me ${topicMatch} interactively for beginners`);
        if (isSpeaking) speak(`Starting lesson on ${topicMatch}`, speechLang);
        return;
      }
    }
    
    // Screen Reader Intent
    if (textLower.includes("read page") || textLower.includes("read screen") || textLower.includes("read this")) {
      const mainContent = document.querySelector('main')?.textContent;
      const contentToRead = mainContent ? "Reading page. " + mainContent.substring(0, 1500) : "There is no readable content on this page.";
      
      setMessages(prev => [...prev, { role: "user", content: text }, { role: "assistant", content: `🎙️ **System**: ${contentToRead.substring(0, 50)}...` }]);
      saveMessage("user", text);
      if (isSpeaking) speak(contentToRead.replace(/[#*`_]/g, ""), speechLang);
      return;
    }

    // Navigation Intent
    const isNavCommand = textLower.includes("go to") || textLower.includes("open") || textLower.includes("navigate") || textLower.includes("show me");
    if (isNavCommand) {
      const navMatchers = [
        { keywords: ["dashboard", "home", "main"], path: "/dashboard", name: "Dashboard" },
        { keywords: ["learning", "course", "study", "module"], path: "/dashboard/learning", name: "Learning" },
        { keywords: ["concepts", "history", "visual"], path: "/dashboard/concepts", name: "AI Concepts" },
        { keywords: ["tutor", "practice", "voice"], path: "/dashboard/voice-tutor", name: "Voice Tutor" },
        { keywords: ["analytics", "progress", "report"], path: "/dashboard/analytics", name: "Analytics" },
        { keywords: ["leaderboard", "ranking", "score", "rank"], path: "/dashboard/leaderboard", name: "Leaderboard" },
        { keywords: ["setting", "config", "preference"], path: "/dashboard/settings", name: "Settings" },
      ];
      
      for (const match of navMatchers) {
        if (match.keywords.some(kw => textLower.includes(kw))) {
          const responseMsg = `Navigating to ${match.name}.`;
          setMessages(prev => [...prev, { role: "user", content: text }, { role: "assistant", content: `🧭 **System**: ${responseMsg}` }]);
          saveMessage("user", text);
          if (isSpeaking) speak(responseMsg, speechLang);
          navigate(match.path);
          return;
        }
      }
    }

    sendToAI(text);
  }, [sendToAI, isSpeaking, speechLang, saveMessage, learningPath, navigate]);

  const generatePath = useCallback(async () => {
    if (learningPath.length > 0 || isLoading) return;
    const prompt = `Generate a personalized learning path for a beginner in data structures. Return ONLY valid JSON array of topics like [{"topic": "Arrays", "type": "lesson"}, {"topic": "Linked Lists", "type": "lesson"}]`;

    let pathJson = "";
    setMessages(prev => [...prev, { role: "assistant", content: "🧠 Generating your personalized learning path..." }]);
    if (isSpeaking) speak("Generating your learning path", speechLang);

    await streamChat({
      messages: [{ role: "user", content: prompt }],
      language,
      onDelta: (chunk) => { pathJson += chunk; },
      onDone: () => {
        try {
          const parsedPath = JSON.parse(pathJson.replace(/```json|```/g, '').trim());
          if (Array.isArray(parsedPath)) {
            const topics = parsedPath.map((item: any) => item.topic);
            setLearningPath(topics);
            const summary = `Your path: ${topics.slice(0,3).join(', ')}${topics.length > 3 ? '...' : ''}`;
            setMessages(prev => [...prev.slice(0, -1), { role: "assistant", content: `✅ ${summary}. Say "start lesson" or "quiz on Arrays" to begin!` }]);
            if (isSpeaking) speak(summary, speechLang);
            saveMessage("assistant", summary);
          }
        } catch (e) {
          console.error("Path parse error", e);
        }
      },
      onError: (err) => console.error("Stream error:", err),
    });
  }, [learningPath.length, isLoading, language, speechLang, saveMessage, isSpeaking]);

  const startContinuousListeningImpl = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported");
      if (isSpeaking) speak("Speech recognition not available on this browser", speechLang);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setPartialTranscript("");
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      setPartialTranscript(interim);
      if (final) {
        executeVoiceCommand(final);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed' || event.error === 'aborted') {
        setIsListening(false);
      }
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        if (isSpeaking) speak(`Recognition error: ${event.error}`, speechLang);
      }
    };

    recognition.onend = () => {
      if (!manualStopRef.current && document.visibilityState === 'visible') {
        // Keep isListening true visually during the auto-restart gap
        setTimeout(startContinuousListeningImpl, 250);
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [speechLang, executeVoiceCommand, isSpeaking]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      manualStopRef.current = true;
      recognitionRef.current?.stop();
      setIsListening(false);
      setPartialTranscript("");
      return;
    }
    manualStopRef.current = false;
    // Try to gen path once
    if (learningPath.length === 0) generatePath();
    startContinuousListeningImpl();
  }, [isListening, learningPath.length, generatePath, startContinuousListeningImpl]);

  // Login greeting & autostart
  useEffect(() => {
    if (user && !isListening && !recognitionRef.current) {
      const username = user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || 'user';
      const timer = setTimeout(() => {
         // Auto-start listening without speech if they navigated back, or do speech conditionally!
         if (messages.length <= 1) {
            if (isSpeaking) speak(`Hello, ${username}! I'm ready to help you learn.`, speechLang);
            setTimeout(() => {
              if (isSpeaking) speak("Ask me anything about learning!", speechLang);
              setTimeout(() => startContinuousListeningImpl(), 1000);
            }, 3000);
         } else {
           // We just restarted contextual listening
           startContinuousListeningImpl();
         }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, speechLang, startContinuousListeningImpl]); // intentionally removed isListening to prevent double trigger

  // Hotkey globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        toggleListening();
        if (!location.pathname.includes('/concepts')) setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleListening, location.pathname]);

  const value = {
    messages,
    isListening,
    isSpeaking,
    isLoading,
    partialTranscript,
    learningPath,
    volume,
    isOpen,
    setIsOpen,
    toggleSpeaking,
    toggleListening,
    sendMessage: sendToAI,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
