import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";
import ReactMarkdown from "react-markdown";
import { useChat } from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function BrainMic() {
  const { language, t } = useLanguage();
  const {
    messages, isListening, isSpeaking, isLoading, partialTranscript,
    isOpen, setIsOpen, toggleSpeaking, toggleListening, sendMessage
  } = useChat();
  const location = useLocation();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, partialTranscript]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const WaveBars = () => (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200">
      {[...Array(6)].map((_, i) => (
        <motion.path
          key={i}
          d="M10 180 Q35 160 50 170 Q65 155 80 170 Q95 160 110 175 Q125 155 140 170 Q155 165 170 170 L170 200 L10 200 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary-foreground/70"
          strokeDasharray="20,10"
          animate={{
            pathLength: isListening || isLoading ? 1 : 0,
            strokeDashoffset: isListening || isLoading ? -30 : 0,
            opacity: isListening || isLoading ? 0.8 : 0.3
          }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: i * 0.1 }}
        />
      ))}
    </svg>
  );

  // Don't render full BrainMic on Concepts page since it has a full page viewer
  if (location.pathname.includes('/concepts')) {
    return (
      <motion.button
        onClick={toggleListening}
        className="fixed bottom-6 right-6 z-50 flex h-20 w-20 items-center justify-center vs-gradient-hero shadow-lg animate-brain-glow overflow-hidden [clip-path:url(#brainShape)]"
        style={{clipPath: 'url(#brainShape)'}}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
      >
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 200">
          <clipPath id="brainShape">
            <path d="M0.1,0.05 C0.05,0.1 0.05,0.3 0.1,0.4 C0.15,0.5 0.3,0.55 0.45,0.55 C0.6,0.55 0.75,0.5 0.85,0.45 C0.95,0.4 0.98,0.3 0.95,0.2 C0.92,0.1 0.85,0.05 0.7,0.05 C0.55,0.05 0.4,0.1 0.25,0.15 C0.2,0.18 0.15,0.22 0.12,0.25 C0.1,0.28 0.09,0.32 0.1,0.35 L0.3,0.9 C0.35,0.92 0.45,0.93 0.55,0.92 C0.65,0.91 0.75,0.88 0.82,0.85 C0.89,0.82 0.94,0.77 0.97,0.72 C1,0.67 1.02,0.62 1,0.57 C0.98,0.52 0.95,0.47 0.9,0.42 C0.85,0.37 0.78,0.32 0.7,0.3 C0.62,0.28 0.55,0.27 0.48,0.28 C0.41,0.29 0.35,0.31 0.3,0.34 C0.25,0.37 0.22,0.41 0.2,0.45 C0.18,0.49 0.17,0.53 0.18,0.57 L0.1,0.35 Z M0.9,0.05 C0.95,0.1 0.95,0.3 0.9,0.4 C0.85,0.5 0.7,0.55 0.55,0.55 C0.4,0.55 0.25,0.5 0.15,0.45 C0.05,0.4 0.02,0.3 0.05,0.2 C0.08,0.1 0.15,0.05 0.3,0.05 C0.45,0.05 0.6,0.1 0.75,0.15 C0.8,0.18 0.85,0.22 0.88,0.25 C0.9,0.28 0.91,0.32 0.9,0.35 L0.7,0.9 C0.65,0.92 0.55,0.93 0.45,0.92 C0.35,0.91 0.25,0.88 0.18,0.85 C0.11,0.82 0.06,0.77 0.03,0.72 C0,0.67 -0.02,0.62 0,0.57 C0.02,0.52 0.05,0.47 0.1,0.42 C0.15,0.37 0.22,0.32 0.3,0.3 C0.38,0.28 0.45,0.27 0.52,0.28 C0.59,0.29 0.65,0.31 0.7,0.34 C0.75,0.37 0.78,0.41 0.8,0.45 C0.82,0.49 0.83,0.53 0.82,0.57 L0.9,0.35 Z"/>
          </clipPath>
        </svg>
        <WaveBars />
        <div className={`absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-card ${isListening ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
      </motion.button>
    );
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-20 w-20 items-center justify-center vs-gradient-hero shadow-lg animate-brain-glow overflow-hidden [clip-path:url(#brainShape)]"
        style={{clipPath: 'url(#brainShape)'}}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        aria-label="AI Voice Assistant"
      >
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 200">
          <clipPath id="brainShape">
            <path d="M0.1,0.05 C0.05,0.1 0.05,0.3 0.1,0.4 C0.15,0.5 0.3,0.55 0.45,0.55 C0.6,0.55 0.75,0.5 0.85,0.45 C0.95,0.4 0.98,0.3 0.95,0.2 C0.92,0.1 0.85,0.05 0.7,0.05 C0.55,0.05 0.4,0.1 0.25,0.15 C0.2,0.18 0.15,0.22 0.12,0.25 C0.1,0.28 0.09,0.32 0.1,0.35 L0.3,0.9 C0.35,0.92 0.45,0.93 0.55,0.92 C0.65,0.91 0.75,0.88 0.82,0.85 C0.89,0.82 0.94,0.77 0.97,0.72 C1,0.67 1.02,0.62 1,0.57 C0.98,0.52 0.95,0.47 0.9,0.42 C0.85,0.37 0.78,0.32 0.7,0.3 C0.62,0.28 0.55,0.27 0.48,0.28 C0.41,0.29 0.35,0.31 0.3,0.34 C0.25,0.37 0.22,0.41 0.2,0.45 C0.18,0.49 0.17,0.53 0.18,0.57 L0.1,0.35 Z M0.9,0.05 C0.95,0.1 0.95,0.3 0.9,0.4 C0.85,0.5 0.7,0.55 0.55,0.55 C0.4,0.55 0.25,0.5 0.15,0.45 C0.05,0.4 0.02,0.3 0.05,0.2 C0.08,0.1 0.15,0.05 0.3,0.05 C0.45,0.05 0.6,0.1 0.75,0.15 C0.8,0.18 0.85,0.22 0.88,0.25 C0.9,0.28 0.91,0.32 0.9,0.35 L0.7,0.9 C0.65,0.92 0.55,0.93 0.45,0.92 C0.35,0.91 0.25,0.88 0.18,0.85 C0.11,0.82 0.06,0.77 0.03,0.72 C0,0.67 -0.02,0.62 0,0.57 C0.02,0.52 0.05,0.47 0.1,0.42 C0.15,0.37 0.22,0.32 0.3,0.3 C0.38,0.28 0.45,0.27 0.52,0.28 C0.59,0.29 0.65,0.31 0.7,0.34 C0.75,0.37 0.78,0.41 0.8,0.45 C0.82,0.49 0.83,0.53 0.82,0.57 L0.9,0.35 Z"/>
          </clipPath>
        </svg>
        <WaveBars />
        <div className={`absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-card ${isListening ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-6 z-50 w-[400px] overflow-hidden rounded-3xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between vs-gradient-hero px-5 py-4">
              <div className="flex items-center gap-3">
                <img src={brainLogo} alt="" className="h-10 w-10 rounded-xl bg-white/20 p-1" />
                <div>
                  <p className="text-base font-bold text-primary-foreground">{t.aiAssistant}</p>
                  <p className="text-xs font-medium text-primary-foreground/80">{t.alwaysListening} • {language.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={toggleSpeaking}
                  className="rounded-full bg-black/20 p-2 text-primary-foreground transition hover:bg-black/40">
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} 
                  className="rounded-full bg-black/20 p-2 text-primary-foreground transition hover:bg-black/40">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === "user" ? "vs-gradient-hero text-primary-foreground rounded-br-none" : "bg-muted border border-border/50 text-foreground rounded-bl-none"
                  }`}>
                    {msg.role === "assistant" || msg.role === "system" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="max-w-[60%] rounded-2xl bg-muted border border-border/50 px-4 py-3 text-sm rounded-bl-none animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
              {partialTranscript && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-primary/10 border border-primary/20 px-4 py-3 text-sm italic text-foreground/80 rounded-br-none animate-pulse">
                    Listening: {partialTranscript}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border bg-card/50 backdrop-blur-md p-4 flex gap-3">
              <button 
                onClick={toggleListening}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all ${
                  isListening ? "bg-primary text-primary-foreground shadow-md animate-pulse" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                aria-label={isListening ? "Listening - Click to pause" : "Not listening - Click to resume"}
              >
                {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.typeOrSpeak} 
                className="flex-1 rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-2 text-sm outline-none transition focus:border-primary/50 focus:bg-background" 
                disabled={isLoading} 
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background transition hover:scale-105 active:scale-95 disabled:opacity-50"
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
