import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface PresenceUser {
  user_id: string;
  email: string;
  online_at: string;
  active_file?: string;
}

export function useReachPresence(workspaceId: string | null, activeFile: string | null) {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const sync = useCallback(() => {
    if (!user) return;

    // Clean up previous
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channelName = workspaceId
      ? `reach-presence-${workspaceId}`
      : `reach-presence-local`;

    const ch = supabase.channel(channelName, {
      config: { presence: { key: user.id } },
    });

    ch.on("presence", { event: "sync" }, () => {
      const state = ch.presenceState<PresenceUser>();
      const users: PresenceUser[] = [];
      for (const key of Object.keys(state)) {
        const presences = state[key];
        if (presences && presences.length > 0) {
          users.push(presences[0] as unknown as PresenceUser);
        }
      }
      setOnlineUsers(users);
    });

    ch.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await ch.track({
          user_id: user.id,
          email: user.email || "unknown",
          online_at: new Date().toISOString(),
          active_file: activeFile || undefined,
        });
      }
    });

    channelRef.current = ch;
  }, [workspaceId, user]);

  useEffect(() => {
    sync();
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [sync]);

  // Update presence when active file changes
  useEffect(() => {
    if (channelRef.current && user) {
      channelRef.current.track({
        user_id: user.id,
        email: user.email || "unknown",
        online_at: new Date().toISOString(),
        active_file: activeFile || undefined,
      });
    }
  }, [activeFile, user]);

  return { onlineUsers };
}
