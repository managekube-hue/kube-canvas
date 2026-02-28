import { Loader2 } from "lucide-react";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  author?: { avatar_url: string; login: string };
}

interface Props {
  commits: Commit[];
  loading: boolean;
}

export function IdeCommitsPanel({ commits, loading }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Source Control</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}
        {commits.map(c => (
          <div key={c.sha} className="px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02]">
            <p className="text-xs text-white font-medium truncate">
              {c.commit.message.split("\n")[0]}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {c.author?.avatar_url && (
                <img src={c.author.avatar_url} className="w-4 h-4 rounded-full" alt="" />
              )}
              <span className="text-[10px] text-white/30">
                {c.author?.login || c.commit.author.name}
              </span>
              <span className="text-[10px] text-white/20 font-mono">
                {c.sha.slice(0, 7)}
              </span>
              <span className="text-[10px] text-white/15 ml-auto">
                {new Date(c.commit.author.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
