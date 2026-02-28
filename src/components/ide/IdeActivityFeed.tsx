import { useState, useEffect, useCallback } from "react";
import { Activity, GitCommit, Bug, GitPullRequest, MessageSquare, GitBranch, Loader2, RefreshCw } from "lucide-react";

interface FeedItem {
  id: string;
  type: "commit" | "issue" | "pr" | "comment" | "branch";
  title: string;
  description?: string;
  author: string;
  avatar?: string;
  timestamp: string;
  meta?: string;
}

interface Props {
  owner: string;
  repo: string;
  onLoadCommits: () => Promise<Array<{
    sha: string;
    commit: { message: string; author: { name: string; date: string } };
    author?: { avatar_url: string; login: string };
  }>>;
  onLoadIssueEvents: () => Promise<Array<{
    number: number;
    title: string;
    state: string;
    user: { login: string; avatar_url: string };
    created_at: string;
    updated_at: string;
  }>>;
  onLoadPullEvents: () => Promise<Array<{
    number: number;
    title: string;
    state: string;
    merged: boolean;
    user: { login: string; avatar_url: string };
    created_at: string;
    updated_at: string;
  }>>;
}

const typeIcons = {
  commit: GitCommit,
  issue: Bug,
  pr: GitPullRequest,
  comment: MessageSquare,
  branch: GitBranch,
};

const typeColors = {
  commit: "text-green-400 bg-green-500/10",
  issue: "text-yellow-400 bg-yellow-500/10",
  pr: "text-purple-400 bg-purple-500/10",
  comment: "text-blue-400 bg-blue-500/10",
  branch: "text-cyan-400 bg-cyan-500/10",
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

export function IdeActivityFeed({ owner, repo, onLoadCommits, onLoadIssueEvents, onLoadPullEvents }: Props) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "commit" | "issue" | "pr">("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [commits, issues, pulls] = await Promise.all([
        onLoadCommits().catch(() => []),
        onLoadIssueEvents().catch(() => []),
        onLoadPullEvents().catch(() => []),
      ]);

      const feed: FeedItem[] = [
        ...commits.slice(0, 20).map(c => ({
          id: `commit-${c.sha}`,
          type: "commit" as const,
          title: c.commit.message.split("\n")[0],
          author: c.author?.login || c.commit.author.name,
          avatar: c.author?.avatar_url,
          timestamp: c.commit.author.date,
          meta: c.sha.slice(0, 7),
        })),
        ...issues.slice(0, 15).map(i => ({
          id: `issue-${i.number}`,
          type: "issue" as const,
          title: i.title,
          description: `#${i.number} ${i.state}`,
          author: i.user.login,
          avatar: i.user.avatar_url,
          timestamp: i.updated_at || i.created_at,
          meta: `#${i.number}`,
        })),
        ...pulls.slice(0, 10).map(p => ({
          id: `pr-${p.number}`,
          type: "pr" as const,
          title: p.title,
          description: p.merged ? "merged" : p.state,
          author: p.user.login,
          avatar: p.user.avatar_url,
          timestamp: p.updated_at || p.created_at,
          meta: `#${p.number}`,
        })),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setItems(feed);
    } catch (err) {
      console.error("Activity feed error:", err);
    } finally {
      setLoading(false);
    }
  }, [onLoadCommits, onLoadIssueEvents, onLoadPullEvents]);

  useEffect(() => { load(); }, [load]);

  const filtered = filter === "all" ? items : items.filter(i => i.type === filter);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <Activity size={12} className="text-orange-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Activity</span>
        <div className="flex-1" />
        <button onClick={load} className="text-white/20 hover:text-white/50">
          <RefreshCw size={11} />
        </button>
      </div>

      {/* Filters */}
      <div className="px-3 py-1.5 border-b border-white/5 flex gap-1.5">
        {(["all", "commit", "issue", "pr"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-[10px] px-2 py-0.5 rounded capitalize ${
              filter === f ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60"
            }`}>
            {f === "all" ? "All" : f === "pr" ? "PRs" : f === "commit" ? "Commits" : "Issues"}
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
        {filtered.map((item, idx) => {
          const Icon = typeIcons[item.type];
          const color = typeColors[item.type];
          return (
            <div key={item.id} className="px-3 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start gap-2.5">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${color}`}>
                  <Icon size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/80 font-medium truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.avatar && <img src={item.avatar} className="w-3.5 h-3.5 rounded-full" alt="" />}
                    <span className="text-[10px] text-white/40">{item.author}</span>
                    {item.meta && <span className="text-[9px] text-white/20 font-mono">{item.meta}</span>}
                    <span className="text-[9px] text-white/15 ml-auto flex-shrink-0">{timeAgo(item.timestamp)}</span>
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
