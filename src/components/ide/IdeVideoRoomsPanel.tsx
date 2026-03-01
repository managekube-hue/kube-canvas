import { useState } from "react";
import { Video, Plus, Loader2, ExternalLink, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Props {
  workspaceId: string;
}

export function IdeVideoRoomsPanel({ workspaceId }: Props) {
  const [loading, setLoading] = useState(false);
  const [callUrl, setCallUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCall = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get CometChat auth token
      const { data: authData, error: authErr } = await supabase.functions.invoke("cometchat-auth", {
        body: { action: "sync_user" },
      });
      if (authErr || !authData?.authToken) {
        throw new Error(authErr?.message || "Failed to get CometChat auth");
      }

      // Initiate a call session
      const sessionId = `ws-${workspaceId}-${Date.now()}`;
      const { data: callData, error: callErr } = await supabase.functions.invoke("cometchat-auth", {
        body: { action: "initiate_call", session_id: sessionId, receiver_uid: workspaceId, call_type: "video" },
      });

      if (callErr) throw new Error(callErr.message);

      // For now, show a success state with the session info
      setCallUrl(sessionId);
    } catch (e: any) {
      console.error("Video call error:", e);
      setError(e.message || "Failed to start video call");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <Video size={12} className="text-purple-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex-1">Video Rooms</span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {error && (
          <div className="mb-3 p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[11px]">
            {error}
          </div>
        )}

        {callUrl ? (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Call Active</span>
              </div>
              <p className="text-[10px] text-white/40 mb-2">Session: {callUrl}</p>
              <Button size="sm" variant="outline" onClick={() => setCallUrl(null)}
                className="text-[10px] h-7 w-full border-white/10 text-white/60">
                End Call
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
              <Users size={20} className="text-purple-400/60" />
            </div>
            <p className="text-xs text-white/40 mb-1">CometChat Video</p>
            <p className="text-[10px] text-white/20 mb-4">Start a video call with your team</p>
            <Button size="sm" onClick={startCall} disabled={loading}
              className="text-[10px] h-8 bg-purple-600 hover:bg-purple-700 gap-1.5">
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Video size={12} />}
              {loading ? "Connecting..." : "Start Video Call"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
