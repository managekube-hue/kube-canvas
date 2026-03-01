import { useState, useEffect, useRef, useCallback } from "react";
import { Hash, Send, Plus, AtSign, Reply, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";

interface Channel { id: string; name: string; }
interface Message { id: string; body: string; user_id: string; created_at: string; parent_id?: string | null; }
interface Props { workspaceId: string; }

// Typing indicator hook using Supabase presence (free, no VPS)
function useTypingIndicator(channelId: string | null, userId: string | null, userEmail: string | null) {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!channelId || !userId) return;
    if (channelRef.current) supabase.removeChannel(channelRef.current);

    const ch = supabase.channel(`typing-${channelId}`, {
      config: { presence: { key: userId } },
    });

    ch.on("presence", { event: "sync" }, () => {
      const state = ch.presenceState();
      const users: string[] = [];
      for (const key of Object.keys(state)) {
        if (key === userId) continue;
        const presences = state[key] as any[];
        if (presences?.[0]?.is_typing) {
          users.push(presences[0].email || key.slice(0, 8));
        }
      }
      setTypingUsers(users);
    });

    ch.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await ch.track({ user_id: userId, email: userEmail || "unknown", is_typing: false });
      }
    });

    channelRef.current = ch;
    return () => { if (channelRef.current) supabase.removeChannel(channelRef.current); };
  }, [channelId, userId, userEmail]);

  const setTyping = useCallback((isTyping: boolean) => {
    if (!channelRef.current || !userId) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    channelRef.current.track({ user_id: userId, email: userEmail || "unknown", is_typing: isTyping });
    if (isTyping) {
      timeoutRef.current = setTimeout(() => {
        channelRef.current?.track({ user_id: userId, email: userEmail || "unknown", is_typing: false });
      }, 3000);
    }
  }, [userId, userEmail]);

  return { typingUsers, setTyping };
}

// P42: Message grouping — same user within 5 minutes
function shouldShowHeader(messages: Message[], idx: number): boolean {
  if (idx === 0) return true;
  const prev = messages[idx - 1];
  const curr = messages[idx];
  if (prev.user_id !== curr.user_id) return true;
  const diff = new Date(curr.created_at).getTime() - new Date(prev.created_at).getTime();
  return diff > 5 * 60 * 1000; // 5 minutes
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { typingUsers, setTyping } = useTypingIndicator(
    activeChannel, user?.id || null, user?.email || null
  );

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

  // Load messages & subscribe (P37 + P38)
  useEffect(() => {
    if (!activeChannel) return;
    supabase
      .from("reach_messages")
      .select("id, body, user_id, created_at")
      .eq("channel_id", activeChannel)
      .order("created_at", { ascending: true })
      .limit(200)
      .then(({ data }) => { if (data) setMessages(data); });

    // P38: Realtime subscription
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

  // P39: Send message (Enter, not Shift+Enter)
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
    setTyping(false);
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

  const handleInputChange = (val: string) => {
    setInput(val);
    setTyping(val.length > 0);
  };

  // P41: @mention highlighting
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
          <input autoFocus value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createChannel()}
            placeholder="channel-name"
            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none" />
        </div>
      )}

      <div className="border-b border-white/5">
        {channels.map(ch => (
          <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
              activeChannel === ch.id ? "bg-blue-500/10 text-blue-400" : "text-white/50 hover:bg-white/5"
            }`}>
            <Hash size={12} />
            <span>{ch.name}</span>
          </button>
        ))}
      </div>

      {/* Messages — P42: grouped by user within 5min */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5" style={{ scrollbarWidth: "thin" }}>
        {messages.map((msg, idx) => {
          const isOwn = msg.user_id === user?.id;
          const showHeader = shouldShowHeader(messages, idx);
          return (
            <div key={msg.id} className="group hover:bg-white/[0.02] rounded px-1 py-0.5 -mx-1">
              {showHeader && (
                <div className="flex items-baseline gap-2 mt-2">
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
                {/* P40: Reply button + hover timestamp for grouped messages */}
                {!showHeader && (
                  <span className="text-[8px] text-white/0 group-hover:text-white/15 flex-shrink-0 mt-1 tabular-nums">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
                <button onClick={() => setReplyTo(msg)}
                  className="text-white/0 group-hover:text-white/20 hover:!text-white/50 flex-shrink-0 mt-0.5" title="Reply">
                  <Reply size={10} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div className="px-3 py-1 border-t border-white/5 flex items-center gap-2">
          <div className="flex gap-0.5">
            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span className="text-[10px] text-white/30">
            {typingUsers.length === 1
              ? `${typingUsers[0]} is typing...`
              : `${typingUsers.length} people typing...`}
          </span>
        </div>
      )}

      {/* P40: Reply indicator */}
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

      {/* P39: Input — Enter sends, Shift+Enter newline */}
      <div className="px-3 py-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <button onClick={() => { setInput(prev => prev + "@"); inputRef.current?.focus(); }}
            className="text-white/20 hover:text-blue-400" title="Mention">
            <AtSign size={14} />
          </button>
          <input ref={inputRef} value={input} onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
            }}
            placeholder={activeChannel ? "Message..." : "Select a channel"}
            disabled={!activeChannel}
            className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20" />
          <button onClick={sendMessage} className="text-blue-400 hover:text-blue-300 disabled:opacity-30" disabled={!input.trim()}>
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
