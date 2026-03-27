import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, ThumbsUp, Copy, Brain, BookOpen, Code, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const topics = [
  { icon: BookOpen, label: "All Chats", count: 0 },
  { icon: Code, label: "Arrays", count: 0 },
  { icon: Brain, label: "Linked Lists", count: 0 },
  { icon: Brain, label: "Trees", count: 0 },
  { icon: Volume2, label: "General", count: 0 },
];

const suggestions = [
  "What is an array?",
  "Explain linked lists",
  "Binary trees",
  "Time complexity",
  "Sorting algorithms",
];

type Message = { role: "user" | "ai"; text: string; time: string };

export default function VoiceTutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeTopic, setActiveTopic] = useState(0);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", text, time: now }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      const aiNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Great question! I'll explain "${text}" in detail. This will be powered by the AI backend once connected. Stay tuned for real-time adaptive responses!`,
          time: aiNow,
        },
      ]);
    }, 1200);
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)]">
      {/* Topics sidebar */}
      <div className="w-64 shrink-0 vs-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Topics</h2>
        </div>
        <div className="space-y-1">
          {topics.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTopic(i)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                i === activeTopic ? "vs-gradient-hero text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <span className="flex items-center gap-2">
                <t.icon className="h-4 w-4" />
                {t.label}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${
                i === activeTopic ? "bg-primary-foreground/20" : "bg-muted"
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col vs-card overflow-hidden">
        {/* Chat header */}
        <div className="border-b border-border p-4">
          <h2 className="font-semibold">{topics[activeTopic].label}</h2>
          <p className="text-xs text-muted-foreground">{messages.length} messages • Ask me anything</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <Brain className="mx-auto h-16 w-16 text-muted-foreground/30" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">Start a conversation</p>
                <p className="text-sm text-muted-foreground/70">Ask anything about your learning topics</p>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${msg.role === "user" ? "" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${msg.role === "ai" ? "text-primary" : "text-vs-purple"}`}>
                    {msg.role === "ai" ? "AI Tutor" : "You"}
                  </span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "vs-gradient-hero text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "ai" && (
                  <div className="mt-1 flex gap-2">
                    <button className="text-muted-foreground hover:text-foreground"><ThumbsUp className="h-3.5 w-3.5" /></button>
                    <button className="text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask me anything about data structures..."
              className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => sendMessage(input)}
              className="flex h-12 w-12 items-center justify-center rounded-xl vs-gradient-hero text-primary-foreground"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          {/* Suggestion chips */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto">
            <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
              >
                {s}
              </button>
            ))}
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Context sidebar */}
      <div className="w-64 shrink-0 vs-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Current Context</h2>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 mb-4">
          <p className="text-xs text-muted-foreground">Active Topic</p>
          <p className="font-medium text-sm">{topics[activeTopic].label}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Related Lessons</p>
          <p className="text-sm text-muted-foreground italic">Start chatting to see related content</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Try Asking</p>
          <div className="space-y-2">
            {["How do I implement...", "What are the use cases?", "Time complexity?", "Give me an example"].map((q) => (
              <button key={q} onClick={() => sendMessage(q)} className="block text-left text-sm text-primary hover:underline">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
