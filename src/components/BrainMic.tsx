import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";

export function BrainMic() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your VoraSense AI assistant. I can help you navigate, learn, and answer questions. Just speak or type!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "I'm processing your request. This feature will be fully active once the AI backend is connected!" },
      ]);
    }, 1000);
    setInput("");
  };

  // Audio wave bars for the brain button
  const WaveBars = () => (
    <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-primary-foreground/80"
          animate={{
            height: isListening ? [4, 14, 6, 18, 8] : [4, 4, 4, 4, 4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Brain Mic Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full vs-gradient-hero shadow-lg animate-brain-glow overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Voice Assistant"
      >
        <img src={brainLogo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <WaveBars />
        {/* Green dot indicator */}
        <div className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between vs-gradient-hero px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={brainLogo} alt="" className="h-8 w-8 rounded-lg" />
                <div>
                  <p className="text-sm font-bold text-primary-foreground">VoraSense AI</p>
                  <p className="text-xs text-primary-foreground/70">Always listening • Multilingual</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "vs-gradient-hero text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type or speak..."
                className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSend}
                className="flex h-10 w-10 items-center justify-center rounded-xl vs-gradient-hero text-primary-foreground"
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
