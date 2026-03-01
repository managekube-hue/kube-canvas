import { Bug, MessageSquare, GitCommitHorizontal, ArrowRight, Plug, GitPullRequest, CheckCircle2 } from "lucide-react";
import type { ReachIssue } from "@/hooks/useReachIssues";
import { formatDistanceToNow } from "date-fns";

interface Props {
  displayName: string;
  hasWorkspace: boolean;
  onConnectRepo?: () => void;
  issues?: ReachIssue[];
  commits?: any[];
  pulls?: any[];
  unreadMessages?: number;
  onNavigate?: (view: string) => void;
}

export function ReachHomeDashboard({
  displayName, hasWorkspace, onConnectRepo,
  issues = [], commits = [], pulls = [],
  unreadMessages = 0,
  onNavigate,
}: Props) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const openIssues = issues.filter(i => i.status !== "done" && i.status !== "closed");
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const commitsToday = commits.filter(c => new Date(c.commit?.author?.date || c.created_at) >= todayStart);
  const openPrs = pulls.filter(p => p.state === "open");

  const recentIssues = openIssues.slice(0, 5);
  const recentCommits = commits.slice(0, 8);

  const statusColors: Record<string, string> = {
    backlog: "text-white/40",
    todo: "text-blue-400",
    in_progress: "text-yellow-400",
    review: "text-purple-400",
    done: "text-green-400",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 overflow-y-auto h-full">
      <h1 className="text-2xl font-semibold text-white mb-1">
        {greeting}, {displayName}
      </h1>
      <p className="text-sm text-white/40 mb-8">Here's what's happening across your workspace.</p>

      {!hasWorkspace && (
        <div className="mb-8 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plug size={18} className="text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">Connect a repository</p>
              <p className="text-xs text-white/40">Link a GitHub repo to unlock file management, commits, and PRs.</p>
            </div>
          </div>
          <button onClick={onConnectRepo}
            className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors">
            Connect Repo
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard icon={Bug} label="Open Issues" value={String(openIssues.length)} color="text-orange-400" bg="bg-orange-500/10"
          onClick={() => onNavigate?.("issues")} />
        <StatCard icon={MessageSquare} label="Unread Messages" value={String(unreadMessages)} color="text-blue-400" bg="bg-blue-500/10"
          onClick={() => onNavigate?.("chat")} />
        <StatCard icon={GitCommitHorizontal} label="Commits Today" value={hasWorkspace ? String(commitsToday.length) : "—"} color="text-green-400" bg="bg-green-500/10"
          onClick={() => onNavigate?.("files")} />
        <StatCard icon={GitPullRequest} label="Open PRs" value={hasWorkspace ? String(openPrs.length) : "—"} color="text-purple-400" bg="bg-purple-500/10"
          onClick={() => onNavigate?.("prs")} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Issues */}
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/70">Open Issues</h2>
            <button onClick={() => onNavigate?.("issues")} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          {recentIssues.length > 0 ? (
            <div className="space-y-2">
              {recentIssues.map(issue => (
                <div key={issue.id} className="flex items-start gap-2.5 py-2 px-2 rounded hover:bg-white/[0.03] cursor-pointer transition-colors"
                  onClick={() => onNavigate?.("issues")}>
                  <Bug size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/80 font-medium truncate">{issue.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-white/30">#{issue.number}</span>
                      <span className={`text-[9px] capitalize ${statusColors[issue.status] || "text-white/30"}`}>
                        {issue.status.replace("_", " ")}
                      </span>
                      <span className="text-[9px] text-white/20 capitalize">{issue.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No open issues — create one from the Issues panel" />
          )}
        </div>

        {/* Open PRs */}
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/70">Pull Requests</h2>
            <button onClick={() => onNavigate?.("prs")} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          {openPrs.length > 0 ? (
            <div className="space-y-2">
              {openPrs.slice(0, 5).map((pr: any) => (
                <div key={pr.number} className="flex items-start gap-2.5 py-2 px-2 rounded hover:bg-white/[0.03] cursor-pointer transition-colors"
                  onClick={() => onNavigate?.("prs")}>
                  <GitPullRequest size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/80 font-medium truncate">{pr.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-white/30">#{pr.number}</span>
                      <span className="text-[10px] text-white/20">{pr.head?.ref} → {pr.base?.ref}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message={hasWorkspace ? "No open pull requests" : "Connect a repo to see PRs"} />
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold text-white/70 mb-4">Recent Commits</h2>
        {recentCommits.length > 0 ? (
          <div className="space-y-1">
            {recentCommits.map((c: any) => (
              <div key={c.sha} className="flex items-center gap-2.5 py-2 px-2 rounded hover:bg-white/[0.03] transition-colors">
                <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70 truncate">{c.commit?.message || "Commit"}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-white/25 font-mono">{c.sha?.substring(0, 7)}</span>
                    <span className="text-[10px] text-white/20">
                      {c.commit?.author?.date ? formatDistanceToNow(new Date(c.commit.author.date), { addSuffix: true }) : ""}
                    </span>
                  </div>
                </div>
                {c.author?.avatar_url && (
                  <img src={c.author.avatar_url} className="w-5 h-5 rounded-full" alt="" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message={hasWorkspace ? "No recent commits" : "Connect a repo to see activity"} />
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg, onClick }: {
  icon: typeof Bug; label: string; value: string; color: string; bg: string; onClick?: () => void;
}) {
  return (
    <div onClick={onClick}
      className="rounded-lg border border-white/5 bg-white/[0.02] p-4 flex items-start gap-3 cursor-pointer hover:bg-white/[0.04] transition-colors">
      <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={16} className={color} />
      </div>
      <div>
        <p className="text-xl font-semibold text-white">{value}</p>
        <p className="text-xs text-white/40 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-8 text-center">
      <p className="text-sm text-white/20">{message}</p>
    </div>
  );
}
