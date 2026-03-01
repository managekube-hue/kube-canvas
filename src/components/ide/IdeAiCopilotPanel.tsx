import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, Trash2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  workspaceId: string;
  activeFile?: string | null;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

export function IdeAiCopilotPanel({ workspaceId, activeFile }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const contextPrefix = activeFile ? `[Currently editing: ${activeFile}]\n\n` : "";

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: contextPrefix + text },
          ],
          stream: true,
        }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({ error: "AI request failed" }));
        setMessages(prev => [...prev, { role: "assistant", content: `⚠️ ${errData.error || "Request failed"}` }]);
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch { /* ignore */ }
        }
      }

      if (!assistantSoFar) {
        setMessages(prev => [...prev, { role: "assistant", content: "No response received." }]);
      }
    } catch (e) {
      console.error("AI chat error:", e);
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <Bot size={12} className="text-purple-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex-1">AI Copilot</span>
        {messages.length > 0 && (
          <button onClick={() => setMessages([])} className="text-white/20 hover:text-white/50" title="Clear chat">
            <Trash2 size={11} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-3" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white/20">
            <Sparkles size={28} className="mb-3 text-purple-400/40" />
            <p className="text-xs text-center">Ask anything about your code</p>
            <p className="text-[10px] text-white/15 mt-1 text-center">Uses your BYOK API key or Lovable AI</p>
            <div className="mt-4 space-y-1.5 w-full max-w-[200px]">
              {["Explain this function", "Find bugs in my code", "Write unit tests"].map(s => (
                <button key={s} onClick={() => setInput(s)}
                  className="w-full text-left text-[10px] text-white/30 hover:text-white/60 hover:bg-white/5 px-2.5 py-1.5 rounded border border-white/5 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`${msg.role === "user" ? "ml-4" : ""}`}>
            <div className="flex items-center gap-1.5 mb-1">
              {msg.role === "assistant" ? (
                <Bot size={10} className="text-purple-400" />
              ) : null}
              <span className="text-[9px] text-white/30 font-bold uppercase">
                {msg.role === "user" ? "You" : "Copilot"}
              </span>
            </div>
            <div className={`text-xs leading-relaxed ${msg.role === "user"
              ? "text-white/70 bg-white/5 rounded-lg px-3 py-2"
              : "text-white/70"
            }`}>
              {msg.role === "assistant" ? (
                <div className="prose prose-invert prose-xs max-w-none prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1 prose-code:rounded prose-code:text-[11px] prose-pre:bg-[#0c0c0c] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <span>{msg.content}</span>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex items-center gap-2 text-[10px] text-purple-400/60">
            <Loader2 size={10} className="animate-spin" />
            Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-white/5">
        <div className="flex items-end gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            placeholder="Ask Copilot..."
            rows={1}
            className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20 resize-none max-h-24"
            style={{ minHeight: "1.5rem" }}
          />
          <button onClick={send} disabled={!input.trim() || isLoading}
            className="text-purple-400 hover:text-purple-300 disabled:opacity-30 flex-shrink-0 mb-0.5">
            <Send size={14} />
          </button>
        </div>
        {activeFile && (
          <p className="text-[9px] text-white/15 mt-1 truncate">
            Context: {activeFile}
          </p>
        )}
      </div>
    </div>
  );
}
