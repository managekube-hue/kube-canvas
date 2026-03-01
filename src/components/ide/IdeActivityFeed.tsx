import { useState, useEffect } from "react";
import { Activity, GitCommit, Bug, GitPullRequest, MessageSquare, Loader2, RefreshCw, Target, Users, FileText } from "lucide-react";
import type { ReachActivityEntry } from "@/hooks/useReachActivity";

interface Props {
  entries: ReachActivityEntry[];
  loading: boolean;
  onRefresh: () => void;
}

const actionIcons: Record<string, any> = {
  issue_created: Bug,
  issue_updated: Bug,
  milestone_created: Target,
  milestone_updated: Target,
  pr_created: GitPullRequest,
  pr_merged: GitPullRequest,
  pr_closed: GitPullRequest,
  file_uploaded: FileText,
  member_joined: Users,
  comment_added: MessageSquare,
};

const actionColors: Record<string, string> = {
  issue_created: "text-yellow-400 bg-yellow-500/10",
  issue_updated: "text-yellow-400 bg-yellow-500/10",
  milestone_created: "text-blue-400 bg-blue-500/10",
  milestone_updated: "text-blue-400 bg-blue-500/10",
  pr_created: "text-purple-400 bg-purple-500/10",
  pr_merged: "text-green-400 bg-green-500/10",
  pr_closed: "text-red-400 bg-red-500/10",
  file_uploaded: "text-cyan-400 bg-cyan-500/10",
  member_joined: "text-emerald-400 bg-emerald-500/10",
  comment_added: "text-blue-400 bg-blue-500/10",
};

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

function actionLabel(action: string): string {
  return action.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export function IdeActivityFeed({ entries, loading, onRefresh }: Props) {
  const [filter, setFilter] = useState<"all" | "issue" | "pr" | "milestone" | "file">("all");

  const filtered = filter === "all"
    ? entries
    : entries.filter(e => e.entity_type === filter || (filter === "pr" && e.entity_type === "pull_request"));

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <Activity size={12} className="text-orange-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Activity</span>
        <div className="flex-1" />
        <button onClick={onRefresh} className="text-white/20 hover:text-white/50">
          <RefreshCw size={11} />
        </button>
      </div>

      <div className="px-3 py-1.5 border-b border-white/5 flex gap-1.5">
        {(["all", "issue", "pr", "milestone", "file"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-[10px] px-2 py-0.5 rounded capitalize ${
              filter === f ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60"
            }`}>
            {f === "all" ? "All" : f === "pr" ? "PRs" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 size={16} className="animate-spin text-blue-400" />
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white/20">
            <Activity size={24} className="mb-2" />
            <p className="text-xs">No activity yet</p>
          </div>
        )}
        {filtered.map(entry => {
          const Icon = actionIcons[entry.action] || Activity;
          const color = actionColors[entry.action] || "text-white/40 bg-white/5";
          return (
            <div key={entry.id} className="px-3 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start gap-2.5">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${color}`}>
                  <Icon size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/80 font-medium truncate">
                    {entry.entity_title || actionLabel(entry.action)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/40">{actionLabel(entry.action)}</span>
                    <span className="text-[9px] text-white/15 ml-auto flex-shrink-0">{timeAgo(entry.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
