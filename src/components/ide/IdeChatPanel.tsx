import { useState, useEffect, useRef } from "react";
import { Hash, Send, Plus, Loader2, AtSign, Reply, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";

interface Channel {
  id: string;
  name: string;
}

interface Message {
  id: string;
  body: string;
  user_id: string;
  created_at: string;
  thread_id?: string | null;
}

interface Props {
  workspaceId: string;
}

export function IdeChatPanel({ workspaceId }: Props) {
  const { user } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showMentions, setShowMentions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load channels
  useEffect(() => {
    supabase
      .from("reach_channels")
      .select("id, name")
      .eq("workspace_id", workspaceId)
      .eq("type", "channel")
      .order("created_at")
      .then(({ data }) => {
        if (data) {
          setChannels(data);
          if (!activeChannel && data.length > 0) setActiveChannel(data[0].id);
        }
      });
  }, [workspaceId]);

  // Load messages & subscribe
  useEffect(() => {
    if (!activeChannel) return;
    supabase
      .from("reach_messages")
      .select("id, body, user_id, created_at")
      .eq("channel_id", activeChannel)
      .order("created_at", { ascending: true })
      .limit(200)
      .then(({ data }) => { if (data) setMessages(data); });

    const ch = supabase
      .channel(`ide-chat-${activeChannel}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "reach_messages",
        filter: `channel_id=eq.${activeChannel}`,
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => { supabase.removeChannel(ch); };
  }, [activeChannel]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !activeChannel || !user) return;
    const body = replyTo
      ? `> _replying to ${replyTo.user_id === user.id ? "yourself" : replyTo.user_id.slice(0, 8)}_\n\n${input.trim()}`
      : input.trim();
    await supabase.from("reach_messages").insert({
      channel_id: activeChannel,
      workspace_id: workspaceId,
      user_id: user.id,
      body,
    });
    setInput("");
    setReplyTo(null);
  };

  const createChannel = async () => {
    if (!newChannelName.trim() || !user) return;
    const { data } = await supabase
      .from("reach_channels")
      .insert({
        workspace_id: workspaceId,
        name: newChannelName.trim().toLowerCase().replace(/\s+/g, "-"),
        created_by: user.id,
      })
      .select("id, name")
      .single();
    if (data) {
      setChannels(prev => [...prev, data]);
      setActiveChannel(data.id);
    }
    setNewChannelName("");
    setShowNewChannel(false);
  };

  const insertMention = () => {
    setInput(prev => prev + "@");
    setShowMentions(false);
    inputRef.current?.focus();
  };

  // Render message body with @mention highlighting
  const renderBody = (body: string) => {
    const parts = body.split(/(@\w+)/g);
    return parts.map((part, i) =>
      part.startsWith("@") ? (
        <span key={i} className="bg-blue-500/20 text-blue-400 px-0.5 rounded">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Channel list */}
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Channels</span>
        <button onClick={() => setShowNewChannel(!showNewChannel)} className="text-white/30 hover:text-white/60">
          <Plus size={12} />
        </button>
      </div>

      {showNewChannel && (
        <div className="px-3 py-2 border-b border-white/5 flex gap-1">
          <input
            autoFocus
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createChannel()}
            placeholder="channel-name"
            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none"
          />
        </div>
      )}

      <div className="border-b border-white/5">
        {channels.map(ch => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.id)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
              activeChannel === ch.id ? "bg-blue-500/10 text-blue-400" : "text-white/50 hover:bg-white/5"
            }`}
          >
            <Hash size={12} />
            <span>{ch.name}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-1" style={{ scrollbarWidth: "thin" }}>
        {messages.map((msg, idx) => {
          const isOwn = msg.user_id === user?.id;
          const showAvatar = idx === 0 || messages[idx - 1].user_id !== msg.user_id;
          return (
            <div key={msg.id} className="group hover:bg-white/[0.02] rounded px-1 py-0.5 -mx-1">
              {showAvatar && (
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-[10px] font-bold text-white/60">
                    {isOwn ? "You" : msg.user_id.slice(0, 8)}
                  </span>
                  <span className="text-[9px] text-white/20">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-1 pl-0">
                <div className="text-xs text-white/70 flex-1 leading-relaxed">
                  {msg.body.startsWith(">") ? (
                    <div className="prose prose-invert prose-xs max-w-none">
                      <ReactMarkdown>{msg.body}</ReactMarkdown>
                    </div>
                  ) : (
                    <span>{renderBody(msg.body)}</span>
                  )}
                </div>
                <button
                  onClick={() => setReplyTo(msg)}
                  className="text-white/0 group-hover:text-white/20 hover:!text-white/50 flex-shrink-0 mt-0.5"
                  title="Reply"
                >
                  <Reply size={10} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply indicator */}
      {replyTo && (
        <div className="px-3 py-1.5 border-t border-white/5 flex items-center gap-2 bg-blue-500/5">
          <Reply size={10} className="text-blue-400 flex-shrink-0" />
          <span className="text-[10px] text-white/40 truncate flex-1">
            Replying to {replyTo.user_id === user?.id ? "yourself" : replyTo.user_id.slice(0, 8)}
          </span>
          <button onClick={() => setReplyTo(null)} className="text-white/30 hover:text-white/60">
            <X size={10} />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <button onClick={insertMention} className="text-white/20 hover:text-blue-400" title="Mention">
            <AtSign size={14} />
          </button>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={activeChannel ? "Message..." : "Select a channel"}
            disabled={!activeChannel}
            className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20"
          />
          <button onClick={sendMessage} className="text-blue-400 hover:text-blue-300 disabled:opacity-30" disabled={!input.trim()}>
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
