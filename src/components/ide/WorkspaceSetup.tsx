import { useState } from "react";
import { Plus, GitBranch, Loader2, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkspaceSetupProps {
  onCreateWorkspace: (name: string, owner: string, repo: string) => Promise<void>;
}

export function WorkspaceSetup({ onCreateWorkspace }: WorkspaceSetupProps) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name.trim() || !owner.trim() || !repo.trim()) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onCreateWorkspace(name.trim(), owner.trim(), repo.trim());
    } catch (err: any) {
      setError(err.message || "Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <FolderGit2 size={24} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Import Repository</h2>
            <p className="text-xs text-white/40">Connect a GitHub repo to start coding</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
              Workspace Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Project"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/20"
            />
          </div>
          <div>
            <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
              GitHub Owner / Org
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="my-org"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/20"
            />
          </div>
          <div>
            <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
              Repository Name
            </label>
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="my-repo"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/20"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Import &amp; Create Workspace
          </Button>
        </div>

        <p className="text-[10px] text-white/20 mt-6 text-center">
          The repository must be accessible via the configured GITHUB_TOKEN
        </p>
      </div>
    </div>
  );
}
