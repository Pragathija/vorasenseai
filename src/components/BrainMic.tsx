import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";
import { streamChat, createSpeechRecognition, speak, stopSpeaking } from "@/services/aiChat";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";

type ChatMsg = { role: "user" | "assistant"; content: string };

export function BrainMic() {
  const { language, speechLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: t.aiAssistant + " - " + t.alwaysListening + "! 🧠" },
  ]);
  const [input, setInput] = useState("");
  const [interimText, setInterimText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendToAI = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: ChatMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

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
      messages: newMessages,
      language,
      onDelta: upsertAssistant,
      onDone: () => {
        setIsLoading(false);
        if (isSpeaking && assistantSoFar) {
          speak(assistantSoFar.replace(/[#*`_]/g, ""), speechLang);
        }
      },
      onError: (err) => {
        setIsLoading(false);
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${err}` }]);
      },
    });
  }, [messages, language, speechLang, isLoading, isSpeaking]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = createSpeechRecognition(speechLang);
    if (!recognition) return;

    recognitionRef.current = recognition;
    recognition.onresult = (event: any) => {
      let final = "";
      let interim = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setInterimText(interim);
      if (final) {
        setInterimText("");
        sendToAI(final);
      }
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  }, [isListening, speechLang, sendToAI]);

  const WaveBars = () => (
    <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-primary-foreground/80"
          animate={{
            height: isListening || isLoading ? [4, 14, 6, 18, 8] : [4, 6, 4, 6, 4],
          }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.15 }}
        />
      ))}
    </div>
  );

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full vs-gradient-hero shadow-lg animate-brain-glow overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Voice Assistant"
      >
        <img src={brainLogo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <WaveBars />
        <div className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between vs-gradient-hero px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={brainLogo} alt="" className="h-8 w-8 rounded-lg" />
                <div>
                  <p className="text-sm font-bold text-primary-foreground">{t.aiAssistant}</p>
                  <p className="text-xs text-primary-foreground/70">{t.alwaysListening} • {language.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setIsSpeaking(!isSpeaking); if (isSpeaking) stopSpeaking(); }}
                  className="rounded-lg p-1.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  title={isSpeaking ? "Mute TTS" : "Enable TTS"}
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user" ? "vs-gradient-hero text-primary-foreground" : "bg-muted text-foreground"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none [&>*]:my-1">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
              {interimText && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl bg-muted/50 px-4 py-2.5 text-sm italic text-muted-foreground">
                    {interimText}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-3 flex gap-2">
              <button
                onClick={toggleListening}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isListening ? "bg-destructive text-destructive-foreground" : "bg-muted hover:bg-muted/80"
                }`}
                title={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendToAI(input)}
                placeholder={t.typeOrSpeak}
                className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                onClick={() => sendToAI(input)}
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl vs-gradient-hero text-primary-foreground disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
