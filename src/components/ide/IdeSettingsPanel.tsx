import { useState, useEffect } from "react";
import { Settings, Users, Plus, Loader2, Shield, Crown, Eye, Wrench, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { ReachWorkspace, ReachMember } from "@/hooks/useReachWorkspace";

interface Props {
  workspace: ReachWorkspace;
  members: ReachMember[];
  onRefreshMembers: () => void;
  collaborators: Array<{ login: string; avatar_url: string; permissions: { admin: boolean; push: boolean; pull: boolean } }>;
}

const roleIcons: Record<string, typeof Crown> = {
  owner: Crown,
  admin: Shield,
  maintainer: Wrench,
  contributor: Code,
  viewer: Eye,
};

const roleColors: Record<string, string> = {
  owner: "text-yellow-400",
  admin: "text-red-400",
  maintainer: "text-blue-400",
  contributor: "text-green-400",
  viewer: "text-white/40",
};

export function IdeSettingsPanel({ workspace, members, onRefreshMembers, collaborators }: Props) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("contributor");
  const [inviting, setInviting] = useState(false);
  const [tab, setTab] = useState<"members" | "repo" | "general">("members");

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      // Look up user by email in profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", inviteEmail.trim())
        .single();

      if (!profile) {
        alert("User not found. They must sign up first.");
        return;
      }

      await supabase.from("reach_workspace_members").insert({
        workspace_id: workspace.id,
        user_id: profile.user_id,
        role: inviteRole,
      });
      setInviteEmail("");
      onRefreshMembers();
    } catch (err: any) {
      alert(err.message || "Failed to invite");
    } finally {
      setInviting(false);
    }
  };

  const updateRole = async (memberId: string, role: string) => {
    await supabase.from("reach_workspace_members")
      .update({ role })
      .eq("id", memberId);
    onRefreshMembers();
  };

  const removeMember = async (memberId: string) => {
    await supabase.from("reach_workspace_members")
      .delete()
      .eq("id", memberId);
    onRefreshMembers();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <Settings size={12} className="text-white/40" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Settings</span>
      </div>

      {/* Tabs */}
      <div className="px-3 py-1.5 border-b border-white/5 flex gap-3">
        {(["members", "repo", "general"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-[10px] py-0.5 capitalize ${tab === t ? "text-blue-400 border-b border-blue-400" : "text-white/30"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {tab === "members" && (
          <div>
            {/* Invite */}
            <div className="px-3 py-3 border-b border-white/5 space-y-2">
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Invite Member</span>
              <div className="flex gap-1">
                <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none" />
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none">
                  <option value="contributor" className="bg-[#0c0c0c]">Contributor</option>
                  <option value="maintainer" className="bg-[#0c0c0c]">Maintainer</option>
                  <option value="admin" className="bg-[#0c0c0c]">Admin</option>
                  <option value="viewer" className="bg-[#0c0c0c]">Viewer</option>
                </select>
              </div>
              <Button size="sm" onClick={handleInvite} disabled={inviting} className="w-full h-7 text-[10px] bg-blue-600 gap-1">
                {inviting ? <Loader2 size={10} className="animate-spin" /> : <Plus size={10} />}
                Invite
              </Button>
            </div>

            {/* Current members */}
            <div className="px-3 py-2">
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">
                Workspace Members ({members.length})
              </span>
            </div>
            {members.map(m => {
              const Icon = roleIcons[m.role] || Eye;
              return (
                <div key={m.id} className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
                  <Icon size={12} className={roleColors[m.role] || "text-white/30"} />
                  <span className="text-xs text-white/60 flex-1 truncate">{m.user_id.slice(0, 8)}…</span>
                  <select value={m.role} onChange={(e) => updateRole(m.id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-white outline-none">
                    {["owner", "admin", "maintainer", "contributor", "viewer"].map(r => (
                      <option key={r} value={r} className="bg-[#0c0c0c]">{r}</option>
                    ))}
                  </select>
                  {m.role !== "owner" && (
                    <button onClick={() => removeMember(m.id)} className="text-[9px] text-red-400/60 hover:text-red-400">Remove</button>
                  )}
                </div>
              );
            })}

            {/* GitHub Collaborators */}
            {collaborators.length > 0 && (
              <>
                <div className="px-3 py-2 mt-2">
                  <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">
                    GitHub Collaborators ({collaborators.length})
                  </span>
                </div>
                {collaborators.map(c => (
                  <div key={c.login} className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
                    <img src={c.avatar_url} className="w-5 h-5 rounded-full" alt="" />
                    <span className="text-xs text-white/60 flex-1">{c.login}</span>
                    <span className="text-[9px] text-white/25">
                      {c.permissions.admin ? "Admin" : c.permissions.push ? "Write" : "Read"}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {tab === "repo" && (
          <div className="px-3 py-3 space-y-3">
            <div>
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Repository</span>
              <p className="text-xs text-white/60 mt-1">{workspace.github_owner}/{workspace.github_repo}</p>
            </div>
            <div>
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Default Branch</span>
              <p className="text-xs text-white/60 mt-1">{workspace.default_branch}</p>
            </div>
          </div>
        )}

        {tab === "general" && (
          <div className="px-3 py-3 space-y-3">
            <div>
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Workspace Name</span>
              <p className="text-xs text-white/60 mt-1">{workspace.name}</p>
            </div>
            <div>
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Slug</span>
              <p className="text-xs text-white/60 mt-1">{workspace.slug}</p>
            </div>
            <div>
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Created</span>
              <p className="text-xs text-white/60 mt-1">{new Date(workspace.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
