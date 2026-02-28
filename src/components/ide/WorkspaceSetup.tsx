import { useState, useEffect } from "react";
import { Loader2, FolderGit2, Lock, Globe, Star, GitBranch } from "lucide-react";
import { useGitHubGlobal, type GitRepo } from "@/hooks/useGitHubProxy";

interface WorkspaceSetupProps {
  onCreateWorkspace: (name: string, owner: string, repo: string) => Promise<void>;
}

export function WorkspaceSetup({ onCreateWorkspace }: WorkspaceSetupProps) {
  const gh = useGitHubGlobal();
  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await gh.listRepos(100, 1, "updated");
      setRepos(data);
    } catch (err: any) {
      setError(err.message || "Failed to load repositories");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (repo: GitRepo) => {
    setImporting(repo.full_name);
    try {
      await onCreateWorkspace(repo.name, repo.owner.login, repo.name);
    } catch (err: any) {
      setError(err.message || "Failed to import repository");
    } finally {
      setImporting(null);
    }
  };

  const filtered = filter
    ? repos.filter(r =>
        r.full_name.toLowerCase().includes(filter.toLowerCase()) ||
        (r.description || "").toLowerCase().includes(filter.toLowerCase())
      )
    : repos;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-sm text-white/40">Detecting repositories…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <FolderGit2 size={20} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Open Repository</h2>
            <p className="text-xs text-white/40">Select a repo to start working</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-8 pb-4">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter repositories…"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/20"
        />
      </div>

      {error && (
        <div className="px-8 pb-4">
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        </div>
      )}

      {/* Repo grid */}
      <div className="flex-1 overflow-y-auto px-8 pb-8" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {filtered.length === 0 && !error && (
          <p className="text-sm text-white/30 text-center py-12">No repositories found</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(repo => (
            <button
              key={repo.id}
              onClick={() => handleImport(repo)}
              disabled={importing !== null}
              className="group relative text-left bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-blue-500/30 rounded-xl p-4 transition-all duration-200 disabled:opacity-50"
            >
              {importing === repo.full_name && (
                <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center z-10">
                  <Loader2 size={20} className="animate-spin text-blue-400" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <img
                  src={repo.owner.avatar_url}
                  alt=""
                  className="w-8 h-8 rounded-lg flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white truncate">{repo.name}</span>
                    {repo.private ? (
                      <Lock size={10} className="text-yellow-500/60 flex-shrink-0" />
                    ) : (
                      <Globe size={10} className="text-green-500/60 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-white/30 truncate">{repo.owner.login}</p>
                  {repo.description && (
                    <p className="text-[11px] text-white/40 mt-1.5 line-clamp-2">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-white/25">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400/60" />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={9} />
                        {repo.stargazers_count}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <GitBranch size={9} />
                      {repo.default_branch}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
