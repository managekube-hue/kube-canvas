import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReachMilestone {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  status: "open" | "closed";
  closed_at: string | null;
  created_by: string;
  github_milestone_number: number | null;
  github_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useReachMilestones(workspaceId: string | null) {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<ReachMilestone[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reach_milestones")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMilestones((data || []) as unknown as ReachMilestone[]);
    } catch (err) {
      console.error("[useReachMilestones] Load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const create = useCallback(async (title: string, description: string = "", dueDate?: string) => {
    if (!workspaceId || !user) throw new Error("No workspace or user");
    const { data, error } = await supabase
      .from("reach_milestones")
      .insert({
        workspace_id: workspaceId,
        title,
        description,
        due_date: dueDate || null,
        created_by: user.id,
      })
      .select()
      .single();
    if (error) throw error;
    const ms = data as unknown as ReachMilestone;
    setMilestones(prev => [ms, ...prev]);
    return ms;
  }, [workspaceId, user]);

  const update = useCallback(async (id: string, updates: Partial<Pick<ReachMilestone, "title" | "description" | "due_date">> & { status?: string }) => {
    if (updates.status === "closed") {
      (updates as any).closed_at = new Date().toISOString();
    } else if (updates.status === "open") {
      (updates as any).closed_at = null;
    }
    const { data, error } = await supabase
      .from("reach_milestones")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    const updated = data as unknown as ReachMilestone;
    setMilestones(prev => prev.map(m => m.id === id ? updated : m));
    return updated;
  }, []);

  const openMilestones = milestones.filter(m => m.status === "open");
  const closedMilestones = milestones.filter(m => m.status === "closed");

  return { milestones, loading, openMilestones, closedMilestones, load, create, update };
}
