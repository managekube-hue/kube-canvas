import { useState, useEffect } from "react";
import { Loader2, ChevronDown, ChevronRight, FileCode } from "lucide-react";
import type { GitCommitDetail } from "@/hooks/useGitHub";

interface Commit {
  sha: string;
  commit: { message: string; author: { name: string; date: string } };
  author?: { avatar_url: string; login: string };
}

interface Props {
  commits: Commit[];
  loading: boolean;
  onLoadCommitDetail: (sha: string) => Promise<GitCommitDetail>;
}

export function IdeCommitsPanel({ commits, loading, onLoadCommitDetail }: Props) {
  const [expandedSha, setExpandedSha] = useState<string | null>(null);
  const [detail, setDetail] = useState<GitCommitDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const toggleCommit = async (sha: string) => {
    if (expandedSha === sha) {
      setExpandedSha(null);
      setDetail(null);
      return;
    }
    setExpandedSha(sha);
    setLoadingDetail(true);
    try {
      const d = await onLoadCommitDetail(sha);
      setDetail(d);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Source Control</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {loading && <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-blue-400" /></div>}
        {commits.map(c => (
          <div key={c.sha}>
            <button onClick={() => toggleCommit(c.sha)}
              className="w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                {expandedSha === c.sha ? <ChevronDown size={10} className="text-white/30" /> : <ChevronRight size={10} className="text-white/30" />}
                <p className="text-xs text-white font-medium truncate flex-1">
                  {c.commit.message.split("\n")[0]}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1 ml-4">
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
            </button>

            {/* Diff view */}
            {expandedSha === c.sha && (
              <div className="bg-[#060606] border-b border-white/5">
                {loadingDetail && (
                  <div className="flex justify-center py-4">
                    <Loader2 size={14} className="animate-spin text-blue-400" />
                  </div>
                )}
                {detail && detail.stats && (
                  <div className="px-3 py-2 flex items-center gap-3 text-[10px] border-b border-white/5">
                    <span className="text-white/30">{detail.files?.length || 0} files</span>
                    <span className="text-green-400">+{detail.stats.additions}</span>
                    <span className="text-red-400">−{detail.stats.deletions}</span>
                  </div>
                )}
                {detail?.files?.map(f => (
                  <div key={f.filename} className="border-b border-white/[0.03]">
                    <div className="px-3 py-1.5 flex items-center gap-2 text-[10px]">
                      <FileCode size={10} className="text-white/20" />
                      <span className={`px-1 rounded ${
                        f.status === "added" ? "bg-green-500/15 text-green-400" :
                        f.status === "removed" ? "bg-red-500/15 text-red-400" :
                        "bg-yellow-500/15 text-yellow-400"
                      }`}>{f.status[0].toUpperCase()}</span>
                      <span className="text-white/50 truncate">{f.filename}</span>
                      <span className="text-green-400 ml-auto">+{f.additions}</span>
                      <span className="text-red-400">−{f.deletions}</span>
                    </div>
                    {f.patch && (
                      <pre className="px-1 pb-1 text-[9px] font-mono overflow-x-auto max-h-48" style={{ scrollbarWidth: "thin" }}>
                        {f.patch.split("\n").slice(0, 60).map((line, i) => (
                          <div key={i} className={`px-2 ${
                            line.startsWith("+") ? "bg-green-500/10 text-green-300" :
                            line.startsWith("-") ? "bg-red-500/10 text-red-300" :
                            line.startsWith("@@") ? "text-blue-400/50" :
                            "text-white/30"
                          }`}>{line}</div>
                        ))}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
