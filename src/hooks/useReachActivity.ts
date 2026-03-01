import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReachActivityEntry {
  id: string;
  workspace_id: string;
  actor_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_title: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export function useReachActivity(workspaceId: string | null) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ReachActivityEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reach_activity")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      setEntries((data || []) as unknown as ReachActivityEntry[]);
    } catch (err) {
      console.error("[useReachActivity] Load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const log = useCallback(async (
    action: string,
    entityType: string,
    entityId?: string,
    entityTitle?: string,
    metadata?: Record<string, any>
  ) => {
    if (!workspaceId || !user) return;
    try {
      await supabase.from("reach_activity").insert({
        workspace_id: workspaceId,
        actor_id: user.id,
        action,
        entity_type: entityType,
        entity_id: entityId || null,
        entity_title: entityTitle || null,
        metadata: metadata || {},
      });
    } catch (err) {
      console.error("[useReachActivity] Log failed:", err);
    }
  }, [workspaceId, user]);

  return { entries, loading, load, log };
}
