
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, ThumbsUp, Copy, Brain, BookOpen, Code, Volume2, ChevronLeft, ChevronRight, Mic, MicOff } from "lucide-react";
import { speak } from "@/services/aiChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { useChat } from "@/contexts/ChatContext";

const topicKeys = [
  { icon: BookOpen, label: "allChats" },
  { icon: Code, label: "Arrays" },
  { icon: Brain, label: "Linked Lists" },
  { icon: Brain, label: "Trees" },
  { icon: Volume2, label: "General" },
];

const suggestions = [
  "What is an array?",
  "Explain linked lists",
  "Binary trees",
  "Time complexity",
  "Sorting algorithms",
];

type Message = { role: "user" | "assistant"; content: string; time: string };

export default function VoiceTutor() {
  const { language, speechLang, t } = useLanguage();
  const { messages: rawMessages, isListening, isLoading, toggleListening, sendMessage, partialTranscript: interimText } = useChat();
  const [input, setInput] = useState("");
  const [activeTopic, setActiveTopic] = useState(0);
  const messagesEnd = useRef<HTMLDivElement>(null);

  const messages = rawMessages.filter(m => m.role !== 'system');

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, interimText]);

  const topicLabels = topicKeys.map((tk) => tk.label === "allChats" ? t.allChats : tk.label);

  return (
    <div className="flex gap-4 h-[calc(100vh-120px)]">
      <div className="w-64 shrink-0 vs-card p-4">
        <div className="flex items-center gap-2 mb-4"><Brain className="h-5 w-5 text-primary" /><h2 className="font-semibold">{t.topics}</h2></div>
        <div className="space-y-1">
          {topicKeys.map((tk, i) => (
            <button key={i} onClick={() => setActiveTopic(i)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${i === activeTopic ? "vs-gradient-hero text-primary-foreground" : "hover:bg-muted"}`}>
              <span className="flex items-center gap-2"><tk.icon className="h-4 w-4" />{topicLabels[i]}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${i === activeTopic ? "bg-primary-foreground/20" : "bg-muted"}`}>{messages.filter((m) => m.role === "user").length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col vs-card overflow-hidden">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold">{topicLabels[activeTopic]}</h2>
          <p className="text-xs text-muted-foreground">{messages.length} messages • {t.askAnything}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-center">
              <div><Brain className="mx-auto h-16 w-16 text-muted-foreground/30" /><p className="mt-4 text-lg font-medium text-muted-foreground">{t.startConversation}</p><p className="text-sm text-muted-foreground/70">{t.askAnything}</p></div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[70%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${msg.role === "assistant" ? "text-primary" : "text-secondary"}`}>{msg.role === "assistant" ? "AI Tutor" : "You"}</span>
                </div>
                <div className={`rounded-2xl px-4 py-3 text-sm ${msg.role === "user" ? "vs-gradient-hero text-primary-foreground" : "bg-muted"}`}>
                  {msg.role === "assistant" ? <div className="prose prose-sm prose-invert max-w-none [&>*]:my-1"><ReactMarkdown>{msg.content}</ReactMarkdown></div> : msg.content}
                </div>
                {msg.role === "assistant" && (
                  <div className="mt-1 flex gap-2">
                    <button className="text-muted-foreground hover:text-foreground"><ThumbsUp className="h-3.5 w-3.5" /></button>
                    <button onClick={() => navigator.clipboard.writeText(msg.content)} className="text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
                    <button onClick={() => speak(msg.content.replace(/[#*`_]/g, ""), speechLang)} className="text-muted-foreground hover:text-foreground"><Volume2 className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex justify-start"><div className="rounded-2xl bg-muted px-4 py-3 text-sm animate-pulse">Thinking...</div></div>
          )}
          {interimText && <div className="flex justify-end"><div className="max-w-[70%] rounded-2xl bg-muted/50 px-4 py-3 text-sm italic text-muted-foreground">{interimText}</div></div>}
          <div ref={messagesEnd} />
        </div>

        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <button onClick={toggleListening} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${isListening ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-muted hover:bg-muted/80"}`}>
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={t.typeOrSpeak} className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" disabled={isLoading} />
            <button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} className="flex h-12 w-12 items-center justify-center rounded-xl vs-gradient-hero text-primary-foreground disabled:opacity-50">
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 overflow-x-auto">
            <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
            {suggestions.map((s) => (
              <button key={s} onClick={() => sendMessage(s)} className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">{s}</button>
            ))}
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="w-64 shrink-0 vs-card p-4">
        <div className="flex items-center gap-2 mb-4"><BookOpen className="h-5 w-5 text-primary" /><h2 className="font-semibold">{t.currentContext}</h2></div>
        <div className="rounded-lg bg-muted/50 p-3 mb-4"><p className="text-xs text-muted-foreground">{t.activeTopic}</p><p className="font-medium text-sm">{topicLabels[activeTopic]}</p></div>
        <div className="mb-4"><p className="text-xs text-muted-foreground mb-2">{t.relatedLessons}</p><p className="text-sm text-muted-foreground italic">{t.startConversation}</p></div>
        <div><p className="text-xs text-muted-foreground mb-2">{t.tryAsking}</p>
          <div className="space-y-2">{["How do I implement...", "What are the use cases?", "Time complexity?", "Give me an example"].map((q) => (
            <button key={q} onClick={() => sendMessage(q)} className="block text-left text-sm text-primary hover:underline">{q}</button>
          ))}</div>
        </div>
      </div>
    </div>
  );
}
