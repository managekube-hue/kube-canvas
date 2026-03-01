import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReachWorkspace {
  id: string;
  name: string;
  slug: string;
  github_owner: string;
  github_repo: string;
  default_branch: string;
  created_by: string;
  created_at: string;
}

export interface ReachMember {
  id: string;
  user_id: string;
  workspace_id: string;
  role: string;
  joined_at: string;
}

export function useReachWorkspace() {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<ReachWorkspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<ReachWorkspace | null>(null);
  const [members, setMembers] = useState<ReachMember[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWorkspaces = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("reach_workspaces")
      .select("*")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) {
      setWorkspaces(data as unknown as ReachWorkspace[]);
      if (!activeWorkspace) setActiveWorkspace(data[0] as unknown as ReachWorkspace);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadWorkspaces(); }, [loadWorkspaces]);

  const loadMembers = useCallback(async () => {
    if (!activeWorkspace) return;
    const { data } = await supabase
      .from("reach_workspace_members")
      .select("*")
      .eq("workspace_id", activeWorkspace.id);
    if (data) setMembers(data as unknown as ReachMember[]);
  }, [activeWorkspace]);

  useEffect(() => { loadMembers(); }, [loadMembers]);

  const createWorkspace = async (name: string, githubOwner: string, githubRepo: string) => {
    if (!user) throw new Error("Not authenticated");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { data, error } = await supabase
      .from("reach_workspaces")
      .insert({
        name,
        slug,
        github_owner: githubOwner,
        github_repo: githubRepo,
        default_branch: "main",
        created_by: user.id,
      })
      .select()
      .single();
    if (error) throw error;
    const ws = data as unknown as ReachWorkspace;
    setWorkspaces((prev) => [ws, ...prev]);
    setActiveWorkspace(ws);
    return ws;
  };

  return {
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
    members,
    loading,
    createWorkspace,
    refreshWorkspaces: loadWorkspaces,
    refreshMembers: loadMembers,
  };
}
