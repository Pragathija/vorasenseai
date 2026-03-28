import { useChat } from "@/contexts/ChatContext";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Mic, MicOff, Brain } from "lucide-react";

export default function Concepts() {
  const { messages, isListening, toggleListening, partialTranscript, isLoading, volume } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, partialTranscript]);

  const soundDetected = volume > 2;

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl vs-gradient-hero">
          <Brain className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Concept Space</h2>
          <p className="text-sm text-muted-foreground">Visualize and explore ideas using your AI Copilot.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-5 py-4 ${
              msg.role === "user" 
                ? "vs-gradient-hero text-primary-foreground shadow-md rounded-br-sm" 
                : "bg-muted/50 border border-border/50 text-foreground rounded-bl-sm"
            }`}>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl bg-muted/50 border border-border/50 px-5 py-4 text-sm text-foreground animate-pulse">
              Thinking...
            </div>
          </div>
        )}
        {partialTranscript && (
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl bg-primary/10 border border-primary/20 px-5 py-4 text-sm text-foreground/80 italic animate-pulse">
              Listening: {partialTranscript}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-4 bg-muted/20">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleListening}
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all ${
              isListening ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
             style={isListening ? { 
                boxShadow: `0 0 ${Math.max(10, volume * 1.5)}px rgba(13, 202, 240, ${Math.min(0.8, volume / 50)})`,
                transform: `scale(${1 + Math.min(0.15, volume / 200)})` 
             } : {}}
          >
            {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </button>
          
          <div className="flex flex-1 flex-col justify-center rounded-2xl border border-border bg-card px-4 py-2 text-sm">
            {isListening ? (
              <>
                <div className="font-semibold text-foreground/80">Listening natively...</div>
                <div className={`text-xs ${soundDetected ? 'text-green-500' : 'text-red-400'}`}>
                  {soundDetected ? `Audio levels active (${Math.round(volume)}%) - Speak your thoughts.` : `No sound detected. Check OS microphone settings.`}
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">Click the microphone to start conceptualizing...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
