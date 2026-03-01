import { useState, useEffect, useRef, useCallback } from "react";
import {
  Hash, Lock, Send, Plus, AtSign, Reply, X, Smile,
  ChevronDown, ChevronRight, Search, Volume2, VolumeX,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Channel {
  id: string;
  name: string;
  type: "channel" | "dm";
  is_private?: boolean;
  unread?: number;
}

interface Reaction { emoji: string; user_ids: string[] }

interface Message {
  id: string;
  body: string;
  user_id: string;
  created_at: string;
  parent_id?: string | null;
  reactions?: Reaction[] | null;
  edited?: boolean;
}

interface Member { user_id: string; email: string; display_name?: string }
interface Props { workspaceId: string }

// ─── Constants ────────────────────────────────────────────────────────────────
const QUICK_REACTIONS = ["👍", "🎉", "❤️", "👀", "🔥", "✅"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function displayName(member: Member | undefined, userId: string) {
  if (!member) return userId.slice(0, 8);
  return member.display_name || member.email.split("@")[0];
}

function avatarColor(userId: string) {
  const colors = [
    "bg-blue-500", "bg-violet-500", "bg-emerald-500",
    "bg-orange-500", "bg-pink-500", "bg-cyan-500",
  ];
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = (hash + userId.charCodeAt(i)) % colors.length;
  return colors[hash];
}

function avatarInitials(member: Member | undefined, userId: string) {
  const name = displayName(member, userId);
  return name.slice(0, 2).toUpperCase();
}

function shouldShowHeader(msgs: Message[], idx: number): boolean {
  if (idx === 0) return true;
  const prev = msgs[idx - 1];
  const curr = msgs[idx];
  if (prev.user_id !== curr.user_id) return true;
  return new Date(curr.created_at).getTime() - new Date(prev.created_at).getTime() > 5 * 60 * 1000;
}

function isDifferentDay(msgs: Message[], idx: number): boolean {
  if (idx === 0) return true;
  const prev = new Date(msgs[idx - 1].created_at).toDateString();
  const curr = new Date(msgs[idx].created_at).toDateString();
  return prev !== curr;
}

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

// ─── Typing Indicator Hook ────────────────────────────────────────────────────
function useTypingIndicator(channelId: string | null, userId: string | null, email: string | null) {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!channelId || !userId) return;
    if (channelRef.current) supabase.removeChannel(channelRef.current);
    const ch = supabase.channel(`typing:${channelId}`, { config: { presence: { key: userId } } });
    ch.on("presence", { event: "sync" }, () => {
      const state = ch.presenceState();
      const users: string[] = [];
      for (const key of Object.keys(state)) {
        if (key === userId) continue;
        const p = state[key] as any[];
        if (p?.[0]?.is_typing) users.push(p[0].label || key.slice(0, 6));
      }
      setTypingUsers(users);
    });
    ch.subscribe(async (s) => {
      if (s === "SUBSCRIBED")
        await ch.track({ user_id: userId, label: email?.split("@")[0] || userId.slice(0, 6), is_typing: false });
    });
    channelRef.current = ch;
    return () => { if (channelRef.current) supabase.removeChannel(channelRef.current); };
  }, [channelId, userId, email]);

  const setTyping = useCallback((isTyping: boolean) => {
    if (!channelRef.current || !userId) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    channelRef.current.track({ user_id: userId, label: email?.split("@")[0] || userId.slice(0, 6), is_typing: isTyping });
    if (isTyping) {
      timeoutRef.current = setTimeout(
        () => channelRef.current?.track({ user_id: userId, label: email?.split("@")[0] || "", is_typing: false }),
        3500
      );
    }
  }, [userId, email]);

  return { typingUsers, setTyping };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function IdeChatPanel({ workspaceId }: Props) {
  const { user } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [activeChannelData, setActiveChannelData] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Map<string, Member>>(new Map());
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const [showEmojiFor, setShowEmojiFor] = useState<string | null>(null);
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelPrivate, setNewChannelPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mutedChannels, setMutedChannels] = useState<Set<string>>(new Set());
  const [sectionOpen, setSectionOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { typingUsers, setTyping } = useTypingIndicator(activeChannel, user?.id ?? null, user?.email ?? null);

  // Load workspace members for display names + avatars
  useEffect(() => {
    supabase
      .from("reach_workspace_members")
      .select("user_id, email, display_name")
      .eq("workspace_id", workspaceId)
      .then(({ data }) => {
        if (!data) return;
        const map = new Map<string, Member>();
        data.forEach((m: Member) => map.set(m.user_id, m));
        setMembers(map);
      });
  }, [workspaceId]);

  // Load channels
  useEffect(() => {
    supabase
      .from("reach_channels")
      .select("id, name, type, is_private")
      .eq("workspace_id", workspaceId)
      .order("created_at")
      .then(({ data }) => {
        if (data) {
          setChannels(data as Channel[]);
          if (!activeChannel && data.length > 0) {
            setActiveChannel(data[0].id);
            setActiveChannelData(data[0] as Channel);
          }
        }
      });
  }, [workspaceId]);

  // Load messages + realtime
  useEffect(() => {
    if (!activeChannel) return;
    setMessages([]);
    supabase
      .from("reach_messages")
      .select("id, body, user_id, created_at, parent_id, reactions")
      .eq("channel_id", activeChannel)
      .is("parent_id", null)
      .order("created_at", { ascending: true })
      .limit(300)
      .then(({ data }) => { if (data) setMessages(data as Message[]); });

    const ch = supabase
      .channel(`chat:${activeChannel}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "reach_messages",
        filter: `channel_id=eq.${activeChannel}`,
      }, (payload) => {
        const msg = payload.new as Message;
        if (!msg.parent_id) setMessages(prev => [...prev, msg]);
      })
      .on("postgres_changes", {
        event: "UPDATE", schema: "public", table: "reach_messages",
        filter: `channel_id=eq.${activeChannel}`,
      }, (payload) => {
        setMessages(prev => prev.map(m => m.id === payload.new.id ? payload.new as Message : m));
      })
      .subscribe();

    return () => { supabase.removeChannel(ch); };
  }, [activeChannel]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !activeChannel || !user) return;
    const optimisticId = `opt-${Date.now()}`;
    const optimistic: Message = {
      id: optimisticId,
      body: input.trim(),
      user_id: user.id,
      created_at: new Date().toISOString(),
      parent_id: replyTo?.id ?? null,
    };
    setMessages(prev => [...prev, optimistic]);
    setInput("");
    setReplyTo(null);
    setTyping(false);
    const { data } = await supabase.from("reach_messages").insert({
      channel_id: activeChannel,
      workspace_id: workspaceId,
      user_id: user.id,
      body: optimistic.body,
      parent_id: replyTo?.id ?? null,
    }).select("id, body, user_id, created_at, parent_id, reactions").single();
    if (data) setMessages(prev => prev.map(m => m.id === optimisticId ? data as Message : m));
  };

  const createChannel = async () => {
    if (!newChannelName.trim() || !user) return;
    const slug = newChannelName.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { data } = await supabase
      .from("reach_channels")
      .insert({ workspace_id: workspaceId, name: slug, created_by: user.id, is_private: newChannelPrivate, type: "channel" })
      .select("id, name, type, is_private")
      .single();
    if (data) {
      setChannels(prev => [...prev, data as Channel]);
      selectChannel(data as Channel);
    }
    setNewChannelName("");
    setNewChannelPrivate(false);
    setShowNewChannel(false);
  };

  const selectChannel = (ch: Channel) => {
    setActiveChannel(ch.id);
    setActiveChannelData(ch);
    setReplyTo(null);
    setShowEmojiFor(null);
  };

  const toggleReaction = async (msgId: string, emoji: string) => {
    if (!user) return;
    const msg = messages.find(m => m.id === msgId);
    if (!msg || msgId.startsWith("opt-")) return;
    const reactions: Reaction[] = JSON.parse(JSON.stringify(msg.reactions ?? []));
    const existing = reactions.find(r => r.emoji === emoji);
    if (existing) {
      const idx = existing.user_ids.indexOf(user.id);
      if (idx >= 0) existing.user_ids.splice(idx, 1);
      else existing.user_ids.push(user.id);
      if (existing.user_ids.length === 0) reactions.splice(reactions.indexOf(existing), 1);
    } else {
      reactions.push({ emoji, user_ids: [user.id] });
    }
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, reactions } : m));
    setShowEmojiFor(null);
    await supabase.from("reach_messages").update({ reactions: reactions as any }).eq("id", msgId);
  };

  const toggleMute = (channelId: string) => {
    setMutedChannels(prev => {
      const next = new Set(prev);
      if (next.has(channelId)) next.delete(channelId);
      else next.add(channelId);
      return next;
    });
  };

  const filteredMessages = searchQuery
    ? messages.filter(m => m.body.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  const renderBody = (body: string) =>
    body.split(/(@\w[\w.+-]*)/g).map((part, i) =>
      /^@\w/.test(part)
        ? <span key={i} className="bg-blue-500/20 text-blue-300 px-0.5 rounded font-medium">{part}</span>
        : <span key={i}>{part}</span>
    );

  return (
    <div className="flex h-full overflow-hidden bg-[#1a1a2e] text-white">
      {/* ── Left sidebar ──────────────────────────────────────────────────── */}
      <div className="w-56 flex-shrink-0 flex flex-col border-r border-white/5 bg-[#16162a]">
        {/* Workspace label */}
        <div className="px-3 pt-3 pb-2 border-b border-white/5">
          <span className="text-[11px] font-bold text-white/80 tracking-wide truncate block">Kubric Chat</span>
          <span className="text-[9px] text-white/30">workspace</span>
        </div>

        {/* Search bar */}
        <div className="px-2 py-2 border-b border-white/5">
          <div className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1">
            <Search size={10} className="text-white/30" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search messages…"
              className="bg-transparent text-[10px] text-white outline-none placeholder:text-white/25 w-full"
            />
          </div>
        </div>

        {/* Channels section */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#ffffff10 transparent" }}>
          <button
            onClick={() => setSectionOpen(o => !o)}
            className="w-full flex items-center gap-1 px-2 py-1.5 text-[9px] font-bold text-white/35 uppercase tracking-widest hover:text-white/55"
          >
            {sectionOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            Channels
          </button>

          {sectionOpen && (
            <>
              {channels.filter(c => c.type !== "dm").map(ch => (
                <div
                  key={ch.id}
                  className={`group flex items-center gap-1.5 px-3 py-1 cursor-pointer transition-colors rounded mx-1 ${
                    activeChannel === ch.id
                      ? "bg-blue-600/20 text-white"
                      : "text-white/45 hover:bg-white/5 hover:text-white/70"
                  }`}
                  onClick={() => selectChannel(ch)}
                >
                  {ch.is_private ? <Lock size={10} className="flex-shrink-0 opacity-60" /> : <Hash size={10} className="flex-shrink-0 opacity-60" />}
                  <span className="text-[11px] flex-1 truncate">{ch.name}</span>
                  {mutedChannels.has(ch.id) && <VolumeX size={8} className="text-white/20" />}
                  {ch.unread && !mutedChannels.has(ch.id) && (
                    <span className="text-[8px] bg-blue-500 rounded-full px-1 text-white font-bold">{ch.unread}</span>
                  )}
                </div>
              ))}

              {/* Add channel */}
              <button
                onClick={() => setShowNewChannel(o => !o)}
                className="w-full flex items-center gap-1.5 px-3 py-1 text-[10px] text-white/25 hover:text-white/50"
              >
                <Plus size={10} />
                <span>Add channel</span>
              </button>
            </>
          )}
        </div>

        {/* Current user badge */}
        {user && (
          <div className="px-3 py-2 border-t border-white/5 flex items-center gap-2">
            <div className={`w-5 h-5 rounded-sm flex items-center justify-center text-[8px] font-bold flex-shrink-0 ${avatarColor(user.id)}`}>
              {avatarInitials(members.get(user.id), user.id)}
            </div>
            <span className="text-[10px] text-white/50 truncate">{user.email?.split("@")[0]}</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" title="Online" />
          </div>
        )}
      </div>

      {/* ── Main chat area ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Channel header */}
        {activeChannelData && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-[#1a1a2e] flex-shrink-0">
            {activeChannelData.is_private ? <Lock size={13} className="text-white/40" /> : <Hash size={13} className="text-white/40" />}
            <span className="text-sm font-semibold text-white/90">{activeChannelData.name}</span>
            <div className="flex-1" />
            <button
              onClick={() => toggleMute(activeChannelData.id)}
              className="text-white/25 hover:text-white/60 p-1"
              title={mutedChannels.has(activeChannelData.id) ? "Unmute" : "Mute"}
            >
              {mutedChannels.has(activeChannelData.id) ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
          </div>
        )}

        {/* Create channel form */}
        {showNewChannel && (
          <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex-shrink-0 space-y-2">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">New Channel</div>
            <input
              autoFocus
              value={newChannelName}
              onChange={e => setNewChannelName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") createChannel(); if (e.key === "Escape") setShowNewChannel(false); }}
              placeholder="e.g. general, frontend, design"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-blue-500/50 placeholder:text-white/20"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-[10px] text-white/40 cursor-pointer">
                <input type="checkbox" checked={newChannelPrivate} onChange={e => setNewChannelPrivate(e.target.checked)} className="w-3 h-3" />
                Private
              </label>
              <div className="flex gap-2">
                <button onClick={() => setShowNewChannel(false)} className="text-[10px] text-white/30 hover:text-white/60 px-2 py-1">Cancel</button>
                <button onClick={createChannel} className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Create</button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-0"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#ffffff10 transparent" }}
        >
          {filteredMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-white/20">
              <Hash size={32} className="opacity-30" />
              <p className="text-xs">No messages yet. Say hello!</p>
            </div>
          )}

          {filteredMessages.map((msg, idx) => {
            const member = members.get(msg.user_id);
            const isOwn = msg.user_id === user?.id;
            const showHeader = shouldShowHeader(filteredMessages, idx);
            const showDayDivider = isDifferentDay(filteredMessages, idx);
            const isOptimistic = msg.id.startsWith("opt-");

            return (
              <div key={msg.id}>
                {/* Day divider */}
                {showDayDivider && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[9px] font-semibold text-white/25 uppercase tracking-widest">
                      {formatDayLabel(msg.created_at)}
                    </span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                )}

                {/* Message row */}
                <div
                  className="group relative flex gap-2 rounded px-2 py-0.5 hover:bg-white/[0.025] -mx-2"
                  onMouseEnter={() => setHoveredMsg(msg.id)}
                  onMouseLeave={() => { setHoveredMsg(null); if (showEmojiFor === msg.id) setShowEmojiFor(null); }}
                >
                  {/* Avatar column */}
                  <div className="w-8 flex-shrink-0 pt-0.5">
                    {showHeader ? (
                      <div className={`w-7 h-7 rounded flex items-center justify-center text-[9px] font-bold ${avatarColor(msg.user_id)}`}>
                        {avatarInitials(member, msg.user_id)}
                      </div>
                    ) : (
                      <span className="text-[8px] text-white/0 group-hover:text-white/20 tabular-nums leading-6 block text-right pr-0.5">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                  </div>

                  {/* Message content */}
                  <div className="flex-1 min-w-0">
                    {showHeader && (
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className={`text-[11px] font-semibold ${isOwn ? "text-blue-300" : "text-white/80"}`}>
                          {isOwn ? "You" : displayName(member, msg.user_id)}
                        </span>
                        <span className="text-[9px] text-white/25 tabular-nums">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {isOptimistic && <span className="text-[9px] text-white/20">sending…</span>}
                      </div>
                    )}
                    <div className={`text-[12px] text-white/75 leading-relaxed ${isOptimistic ? "opacity-60" : ""}`}>
                      {renderBody(msg.body)}
                    </div>

                    {/* Reactions */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {msg.reactions.map(r => (
                          <button
                            key={r.emoji}
                            onClick={() => toggleReaction(msg.id, r.emoji)}
                            className={`flex items-center gap-0.5 text-[10px] rounded-full px-1.5 py-0.5 border transition-colors ${
                              r.user_ids.includes(user?.id ?? "")
                                ? "bg-blue-500/20 border-blue-400/40 text-blue-300"
                                : "bg-white/5 border-white/10 text-white/50 hover:border-white/25"
                            }`}
                          >
                            <span>{r.emoji}</span>
                            <span>{r.user_ids.length}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hover action toolbar */}
                  {hoveredMsg === msg.id && !isOptimistic && (
                    <div className="absolute right-2 top-0 -translate-y-1 flex items-center gap-0.5 bg-[#1e1e38] border border-white/10 rounded shadow-lg">
                      {/* Quick emoji */}
                      {QUICK_REACTIONS.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => toggleReaction(msg.id, emoji)}
                          className="px-1 py-0.5 text-sm hover:bg-white/5 rounded transition-colors"
                          title={emoji}
                        >
                          {emoji}
                        </button>
                      ))}
                      <div className="w-px h-4 bg-white/10 mx-0.5" />
                      <button
                        onClick={() => setReplyTo(msg)}
                        className="p-1 text-white/30 hover:text-white/70 hover:bg-white/5 rounded"
                        title="Reply"
                      >
                        <Reply size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="px-4 pb-1 flex items-center gap-2 flex-shrink-0">
            <div className="flex gap-0.5 items-end">
              {[0, 150, 300].map(delay => (
                <span key={delay} className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
            <span className="text-[10px] text-white/30">
              {typingUsers.length === 1 ? `${typingUsers[0]} is typing…` : `${typingUsers.length} people are typing…`}
            </span>
          </div>
        )}

        {/* Reply indicator */}
        {replyTo && (
          <div className="mx-4 mb-1 px-3 py-1.5 bg-white/[0.03] border-l-2 border-blue-500 rounded flex items-center gap-2 flex-shrink-0">
            <Reply size={10} className="text-blue-400 flex-shrink-0" />
            <span className="text-[10px] text-white/40 truncate flex-1">
              Replying to <span className="text-white/60">{replyTo.user_id === user?.id ? "yourself" : displayName(members.get(replyTo.user_id), replyTo.user_id)}</span>
              {" · "}<span className="text-white/30">{replyTo.body.slice(0, 60)}{replyTo.body.length > 60 ? "…" : ""}</span>
            </span>
            <button onClick={() => setReplyTo(null)} className="text-white/25 hover:text-white/60">
              <X size={10} />
            </button>
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 focus-within:border-blue-500/40">
            <button
              onClick={() => { setInput(p => p + "@"); inputRef.current?.focus(); }}
              className="text-white/20 hover:text-blue-400"
              title="Mention"
            >
              <AtSign size={14} />
            </button>
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setTyping(e.target.value.length > 0); }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={activeChannelData ? `Message #${activeChannelData.name}` : "Select a channel…"}
              disabled={!activeChannel}
              className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || !activeChannel}
              className="text-blue-400 hover:text-blue-300 disabled:opacity-20 transition-opacity"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-[9px] text-white/15 mt-1 pl-1">Enter to send · Shift+Enter for newline</p>
        </div>
      </div>
    </div>
  );
}
