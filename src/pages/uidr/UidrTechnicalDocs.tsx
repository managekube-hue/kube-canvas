import { useState } from "react";
import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import { TreeSidebar } from "@/components/TreeSidebar";
import { PageViewer } from "@/components/PageViewer";
import { useAllPages } from "@/hooks/useDocumentation";
import { Search, PanelLeftClose, PanelLeftOpen, BookOpen, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

const DOCS_PASSWORD = "KUBRIC2026";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === DOCS_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]" style={{ background: "#0a0a0a" }}>
      <div className="w-full max-w-sm border border-white/10 p-8" style={{ background: "#0d0d0d" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 border border-blue-500/50 flex items-center justify-center">
            <Lock size={18} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm tracking-widest uppercase">Restricted Access</h2>
            <p className="text-white/40 text-xs mt-0.5">K-DOCS Technical Documentation</p>
          </div>
        </div>
        <p className="text-white/50 text-xs mb-6 leading-relaxed">
          This section contains internal Kubric orchestration reference documentation. Authorised personnel only.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">Access Key</label>
            <div className="flex items-center border border-white/10 bg-white/5">
              <input
                type={show ? "text" : "password"}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter access key"
                className={`flex-1 bg-transparent text-white text-sm px-4 py-3 outline-none placeholder:text-white/20 ${error ? "placeholder:text-red-400" : ""}`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="px-3 text-white/30 hover:text-white/60 transition-colors"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-[10px] mt-1.5 tracking-wider">ACCESS DENIED — Invalid key</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 tracking-widest uppercase transition-colors"
          >
            Authenticate
          </button>
        </form>
        <div className="mt-6 pt-4 border-t border-white/5">
          <Link to="/uidr/docs" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Back to Public Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UidrTechnicalDocs() {
  const [unlocked, setUnlocked] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const { pages, loading, error } = useAllPages();

  if (!unlocked) {
    return (
      <UidrLayout>
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </UidrLayout>
    );
  }

  return (
    <UidrLayout>
      {/* Back bar */}
      <div className="border-b border-white/5 bg-background/80 px-6 py-3 flex items-center gap-4">
        <Link
          to="/uidr/docs"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft size={14} />
          Back to Kubric Docs
        </Link>
        <span className="text-foreground/20">|</span>
        <span className="text-foreground/50 text-sm font-mono">K-DOCS Technical Documentation Explorer</span>
        {!loading && !error && pages.length > 0 && (
          <>
            <span className="text-foreground/20">|</span>
            <span className="text-foreground/30 text-xs font-mono">{pages.length} pages synced from Notion</span>
          </>
        )}
      </div>

      {/* App shell */}
      <div className="flex" style={{ height: "calc(100vh - 3.5rem - 2.75rem)", overflow: "hidden" }}>

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────── */}
        <div
          className="flex-shrink-0 border-r border-white/10 flex flex-col transition-all duration-200"
          style={{
            width: sidebarOpen ? 320 : 48,
            background: "#0d0d0d",
            overflow: "hidden",
          }}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-3 py-3 border-b border-white/5 flex-shrink-0">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-blue-400" />
                <span className="text-white text-xs font-semibold tracking-wider">K-DOCS TREE</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded"
            >
              {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
            </button>
          </div>

          {sidebarOpen && (
            <>
              {/* Search */}
              <div className="px-3 py-2 border-b border-white/5 flex-shrink-0">
                <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5">
                  <Search size={12} className="text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-transparent text-white text-xs outline-none w-full placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Live Supabase Tree */}
              <div
                className="flex-1 overflow-y-auto px-2 py-2"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}
              >
                <TreeSidebar
                  allPages={pages}
                  loading={loading}
                  error={error}
                  onPageSelect={setSelectedPageId}
                  selectedPageId={selectedPageId}
                  searchQuery={search}
                />
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT CONTENT PANEL ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#0a0a0a" }}>
          <PageViewer pageId={selectedPageId} onPageSelect={setSelectedPageId} />
        </div>
      </div>
    </UidrLayout>
  );
}
