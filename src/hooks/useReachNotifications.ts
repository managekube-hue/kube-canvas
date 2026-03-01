import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReachNotification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  is_read: boolean;
  created_at: string;
  workspace_id: string;
}

export function useReachNotifications(workspaceId: string | null) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<ReachNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = useCallback(async () => {
    if (!user || !workspaceId) return;
    const { data } = await supabase
      .from("reach_notifications")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) {
      const typed = data as unknown as ReachNotification[];
      setNotifications(typed);
      setUnreadCount(typed.filter((n) => !n.is_read).length);
    }
  }, [user, workspaceId]);

  useEffect(() => { load(); }, [load]);

  // Realtime
  useEffect(() => {
    if (!user || !workspaceId) return;
    const ch = supabase
      .channel(`reach-notif-${workspaceId}-${user.id}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "reach_notifications",
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        const n = payload.new as unknown as ReachNotification;
        setNotifications((prev) => [n, ...prev]);
        setUnreadCount((c) => c + 1);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user, workspaceId]);

  const markRead = async (id: string) => {
    await supabase.from("reach_notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
    setUnreadCount((c) => Math.max(0, c - 1));
  };

  const markAllRead = async () => {
    if (!user || !workspaceId) return;
    await supabase.from("reach_notifications").update({ is_read: true })
      .eq("workspace_id", workspaceId).eq("user_id", user.id).eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markRead, markAllRead, refresh: load };
}
