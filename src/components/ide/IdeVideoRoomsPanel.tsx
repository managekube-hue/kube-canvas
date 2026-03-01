import { useState, useEffect, useRef } from "react";
import { Video, Plus, ExternalLink, Users, Trash2, Copy, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Room {
  id: string;
  workspace_id: string;
  name: string;
  room_url: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
}

interface Props { workspaceId: string }

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function IdeVideoRoomsPanel({ workspaceId }: Props) {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    loadRooms();
  }, [workspaceId]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("reach_video_rooms")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });
      if (data) setRooms(data as Room[]);
    } catch (err) {
      console.error("Failed to load rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!newRoomName.trim() || !user) return;
    setCreating(true);
    try {
      const slug = slugify(newRoomName.trim());
      const roomId = `kubric-${workspaceId.slice(0, 8)}-${slug}`;
      const roomUrl = `https://meet.jit.si/${roomId}`;

      const { data, error } = await supabase
        .from("reach_video_rooms")
        .insert({
          workspace_id: workspaceId,
          name: newRoomName.trim(),
          room_url: roomUrl,
          created_by: user.id,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setRooms(prev => [data as Room, ...prev]);
        setActiveRoom(data as Room);
      }
      setNewRoomName("");
      setShowCreate(false);
    } catch (err) {
      console.error("Failed to create room:", err);
    } finally {
      setCreating(false);
    }
  };

  const deleteRoom = async (roomId: string) => {
    await supabase.from("reach_video_rooms").delete().eq("id", roomId);
    setRooms(prev => prev.filter(r => r.id !== roomId));
    if (activeRoom?.id === roomId) setActiveRoom(null);
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // ── Active room embed view ────────────────────────────────────────────────
  if (activeRoom) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2 flex-shrink-0">
          <button onClick={() => setActiveRoom(null)} className="text-white/30 hover:text-white/60 text-[10px]">← Back</button>
          <Video size={12} className="text-purple-400" />
          <span className="text-[11px] font-semibold text-white flex-1 truncate">{activeRoom.name}</span>
          <button
            onClick={() => copyUrl(activeRoom.room_url, activeRoom.id)}
            className="text-white/30 hover:text-white/60" title="Copy link"
          >
            {copied === activeRoom.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          </button>
          <a href={activeRoom.room_url} target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-blue-400" title="Open in new tab">
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="flex-1 relative">
          <iframe
            ref={iframeRef}
            src={`${activeRoom.room_url}#config.prejoinPageEnabled=false&config.disableDeepLinking=true`}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            className="w-full h-full border-0"
            title={activeRoom.name}
          />
        </div>
      </div>
    );
  }

  // ── Room list ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <Video size={12} className="text-purple-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex-1">Video Rooms</span>
        <button
          onClick={() => setShowCreate(o => !o)}
          className="text-white/30 hover:text-white/60" title="New room"
        >
          <Plus size={14} />
        </button>
      </div>

      {showCreate && (
        <div className="px-3 py-2 border-b border-white/5 space-y-2">
          <div className="text-[9px] text-white/30 uppercase tracking-widest">New Room (Jitsi Meet)</div>
          <input
            autoFocus
            value={newRoomName}
            onChange={e => setNewRoomName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") createRoom(); if (e.key === "Escape") setShowCreate(false); }}
            placeholder="e.g. Daily Standup, Sprint Review"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-purple-500/50 placeholder:text-white/20"
          />
          <div className="flex gap-2">
            <button onClick={() => setShowCreate(false)} className="flex-1 text-[10px] text-white/30 hover:text-white/60 py-1">Cancel</button>
            <button
              onClick={createRoom}
              disabled={creating || !newRoomName.trim()}
              className="flex-1 text-[10px] bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded py-1 flex items-center justify-center gap-1"
            >
              {creating ? <Loader2 size={10} className="animate-spin" /> : <Video size={10} />}
              Create
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 size={16} className="animate-spin text-purple-400" />
          </div>
        )}

        {!loading && rooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/20">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Users size={24} className="text-purple-400/40" />
            </div>
            <p className="text-xs">No video rooms yet</p>
            <p className="text-[10px] text-white/15">Create a room to start a meeting</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-1 text-[10px] bg-purple-600 hover:bg-purple-500 text-white rounded px-4 py-1.5"
            >
              + New Room
            </button>
          </div>
        )}

        {rooms.map(room => (
          <div key={room.id} className="px-3 py-3 border-b border-white/5 hover:bg-white/[0.02] group">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                <Video size={12} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">{room.name}</div>
                <div className="text-[9px] text-white/25 truncate mt-0.5">
                  {new Date(room.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyUrl(room.room_url, room.id)}
                  className="p-1 text-white/30 hover:text-white/60" title="Copy link"
                >
                  {copied === room.id ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                </button>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="p-1 text-white/20 hover:text-red-400" title="Delete"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
            <button
              onClick={() => setActiveRoom(room)}
              className="mt-2 w-full text-[10px] bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded py-1.5 transition-colors"
            >
              Join Room
            </button>
          </div>
        ))}
      </div>

      {/* Powered by notice */}
      <div className="px-3 py-1.5 border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] text-white/15">Powered by Jitsi Meet (free, no account needed)</span>
        <a href="https://meet.jit.si" target="_blank" rel="noopener noreferrer" className="text-[9px] text-white/20 hover:text-white/40">
          <ExternalLink size={9} />
        </a>
      </div>
    </div>
  );
}
