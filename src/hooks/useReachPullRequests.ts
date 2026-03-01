import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReachPullRequest {
  id: string;
  workspace_id: string;
  number: number;
  title: string;
  body: string | null;
  status: "open" | "merged" | "closed";
  source_branch: string;
  target_branch: string;
  created_by: string;
  assigned_to: string | null;
  merged_at: string | null;
  closed_at: string | null;
  github_pr_number: number | null;
  github_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useReachPullRequests(workspaceId: string | null) {
  const { user } = useAuth();
  const [pullRequests, setPullRequests] = useState<ReachPullRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reach_pull_requests")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPullRequests((data || []) as unknown as ReachPullRequest[]);
    } catch (err) {
      console.error("[useReachPullRequests] Load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const create = useCallback(async (
    title: string,
    sourceBranch: string,
    targetBranch: string = "main",
    body: string = ""
  ) => {
    if (!workspaceId || !user) throw new Error("No workspace or user");
    const { data, error } = await supabase
      .from("reach_pull_requests")
      .insert({
        workspace_id: workspaceId,
        title,
        body,
        source_branch: sourceBranch,
        target_branch: targetBranch,
        created_by: user.id,
      })
      .select()
      .single();
    if (error) throw error;
    const pr = data as unknown as ReachPullRequest;
    setPullRequests(prev => [pr, ...prev]);
    return pr;
  }, [workspaceId, user]);

  const update = useCallback(async (
    id: string,
    updates: Partial<Pick<ReachPullRequest, "title" | "body" | "status" | "assigned_to">>
  ) => {
    if (updates.status === "merged") {
      (updates as any).merged_at = new Date().toISOString();
    }
    if (updates.status === "closed") {
      (updates as any).closed_at = new Date().toISOString();
    }
    const { data, error } = await supabase
      .from("reach_pull_requests")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    const updated = data as unknown as ReachPullRequest;
    setPullRequests(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  }, []);

  const openPRs = pullRequests.filter(p => p.status === "open");
  const closedPRs = pullRequests.filter(p => p.status !== "open");

  return { pullRequests, loading, openPRs, closedPRs, load, create, update };
}
