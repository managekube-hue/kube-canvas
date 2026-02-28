import { useState, useEffect } from "react";
import { Video, VideoOff, Plus, ExternalLink, Loader2, Users, Clock, PhoneOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Room {
  id: string;
  name: string;
  zoom_meeting_id: string | null;
  zoom_join_url: string | null;
  zoom_password: string | null;
  is_active: boolean;
  started_by: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
}

interface Props {
  workspaceId: string;
}

export function IdeVideoRoomsPanel({ workspaceId }: Props) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("zoom-meetings", {
        body: { action: "list", workspace_id: workspaceId },
      });
      if (fnErr) throw fnErr;
      setRooms(data.rooms || []);
    } catch (err: any) {
      console.error("Load rooms failed:", err);
      setError(err.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRooms(); }, [workspaceId]);

  const createRoom = async () => {
    if (!topic.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("zoom-meetings", {
        body: { action: "create", workspace_id: workspaceId, topic: topic.trim() },
      });
      if (fnErr) throw fnErr;
      setRooms(prev => [data.room, ...prev]);
      setTopic("");
      setShowCreate(false);
      // Auto-open the join URL
      if (data.zoom?.join_url) {
        window.open(data.zoom.join_url, "_blank", "noopener");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create meeting");
    } finally {
      setCreating(false);
    }
  };

  const endRoom = async (roomId: string) => {
    try {
      await supabase.functions.invoke("zoom-meetings", {
        body: { action: "end", room_id: roomId },
      });
      setRooms(prev => prev.map(r => r.id === roomId ? { ...r, is_active: false, ended_at: new Date().toISOString() } : r));
    } catch (err: any) {
      setError(err.message || "Failed to end meeting");
    }
  };

  const activeRooms = rooms.filter(r => r.is_active);
  const pastRooms = rooms.filter(r => !r.is_active);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <Video size={12} className="text-blue-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex-1">Video Rooms</span>
        <button onClick={() => setShowCreate(!showCreate)} className="text-white/30 hover:text-blue-400">
          <Plus size={12} />
        </button>
      </div>

      {error && (
        <div className="px-3 py-2 bg-red-500/10 border-b border-red-500/20">
          <p className="text-[10px] text-red-400">{error}</p>
          <button onClick={() => setError(null)} className="text-[9px] text-white/30 hover:text-white/50 mt-0.5">Dismiss</button>
        </div>
      )}

      {showCreate && (
        <div className="px-3 py-2 border-b border-white/5 space-y-2">
          <input
            autoFocus
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createRoom()}
            placeholder="Meeting topic..."
            className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white outline-none placeholder:text-white/20 focus:border-blue-500/40"
          />
          <Button size="sm" onClick={createRoom} disabled={creating || !topic.trim()}
            className="w-full h-7 text-[10px] bg-blue-600 hover:bg-blue-700 gap-1.5 disabled:opacity-30">
            {creating ? <Loader2 size={10} className="animate-spin" /> : <Video size={10} />}
            Create & Join Zoom Meeting
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 size={16} className="animate-spin text-blue-400" />
          </div>
        )}

        {!loading && rooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white/20">
            <Video size={28} className="mb-3" />
            <p className="text-xs">No meetings yet</p>
            <p className="text-[10px] text-white/15 mt-1">Create one to start collaborating</p>
          </div>
        )}

        {/* Active Rooms */}
        {activeRooms.length > 0 && (
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse" />
              Live ({activeRooms.length})
            </div>
            {activeRooms.map(room => (
              <div key={room.id} className="px-3 py-2 hover:bg-white/[0.02] border-b border-white/5 group">
                <div className="flex items-center gap-2">
                  <Video size={12} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-xs text-white/80 truncate flex-1">{room.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  {room.zoom_join_url && (
                    <button onClick={() => window.open(room.zoom_join_url!, "_blank", "noopener")}
                      className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">
                      <ExternalLink size={9} />
                      Join
                    </button>
                  )}
                  <button onClick={() => endRoom(room.id)}
                    className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300 bg-red-500/10 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <PhoneOff size={9} />
                    End
                  </button>
                  {room.started_at && (
                    <span className="text-[9px] text-white/20 ml-auto flex items-center gap-1">
                      <Clock size={8} />
                      {new Date(room.started_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                </div>
                {room.zoom_password && (
                  <div className="text-[9px] text-white/15 mt-1">
                    Password: <span className="text-white/30 select-all">{room.zoom_password}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Past Rooms */}
        {pastRooms.length > 0 && (
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              Past ({pastRooms.length})
            </div>
            {pastRooms.map(room => (
              <div key={room.id} className="px-3 py-1.5 hover:bg-white/[0.02] group">
                <div className="flex items-center gap-2">
                  <VideoOff size={11} className="text-white/15 flex-shrink-0" />
                  <span className="text-xs text-white/30 truncate flex-1">{room.name}</span>
                  {room.ended_at && (
                    <span className="text-[9px] text-white/15">
                      {new Date(room.ended_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
