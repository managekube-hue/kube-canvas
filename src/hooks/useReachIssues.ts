import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReachIssue {
  id: string;
  workspace_id: string;
  number: number;
  title: string;
  body: string | null;
  body_html: string | null;
  status: string; // backlog | todo | in_progress | review | done | closed
  priority: string; // low | medium | high | urgent
  labels: string[];
  assigned_to: string | null;
  created_by: string;
  github_issue_number: number | null;
  github_synced_at: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  // Scrum fields
  story_points?: number | null;
  sprint_id?: string | null;
  epic_id?: string | null;
  due_date?: string | null;
  parent_id?: string | null;
}

export type IssueColumn = "backlog" | "todo" | "in_progress" | "review" | "done";

export function useReachIssues(workspaceId: string | null) {
  const { user } = useAuth();
  const [issues, setIssues] = useState<ReachIssue[]>([]);
  const [loading, setLoading] = useState(false);

  const loadIssues = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reach_issues")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setIssues((data || []) as unknown as ReachIssue[]);
    } catch (err) {
      console.error("[useReachIssues] Load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const createIssue = useCallback(async (
    title: string,
    body: string = "",
    status: string = "todo",
    priority: string = "medium",
    labels: string[] = [],
    extra?: { story_points?: number; sprint_id?: string; due_date?: string }
  ) => {
    if (!workspaceId || !user) throw new Error("No workspace or user");
    const { data, error } = await supabase
      .from("reach_issues")
      .insert({
        workspace_id: workspaceId,
        title,
        body,
        status,
        priority,
        labels,
        created_by: user.id,
        ...(extra?.story_points != null ? { story_points: extra.story_points } : {}),
        ...(extra?.sprint_id ? { sprint_id: extra.sprint_id } : {}),
        ...(extra?.due_date ? { due_date: extra.due_date } : {}),
      })
      .select()
      .single();
    if (error) throw error;
    const issue = data as unknown as ReachIssue;
    setIssues(prev => [issue, ...prev]);
    return issue;
  }, [workspaceId, user]);

  const updateIssue = useCallback(async (
    issueId: string,
    updates: Partial<Pick<ReachIssue, "title" | "body" | "status" | "priority" | "labels" | "assigned_to" | "closed_at">>
  ) => {
    // If moving to done/closed, set closed_at
    if (updates.status === "done" || updates.status === "closed") {
      updates.closed_at = new Date().toISOString();
    } else if (updates.status && updates.status !== "done" && updates.status !== "closed") {
      updates.closed_at = null;
    }

    const { data, error } = await supabase
      .from("reach_issues")
      .update(updates)
      .eq("id", issueId)
      .select()
      .single();
    if (error) throw error;
    const updated = data as unknown as ReachIssue;
    setIssues(prev => prev.map(i => i.id === issueId ? updated : i));
    return updated;
  }, []);

  const deleteIssue = useCallback(async (issueId: string) => {
    const { error } = await supabase
      .from("reach_issues")
      .delete()
      .eq("id", issueId);
    if (error) throw error;
    setIssues(prev => prev.filter(i => i.id !== issueId));
  }, []);

  // Computed
  const openIssues = issues.filter(i => i.status !== "done" && i.status !== "closed");
  const closedIssues = issues.filter(i => i.status === "done" || i.status === "closed");

  return {
    issues,
    loading,
    openIssues,
    closedIssues,
    loadIssues,
    createIssue,
    updateIssue,
    deleteIssue,
  };
}
