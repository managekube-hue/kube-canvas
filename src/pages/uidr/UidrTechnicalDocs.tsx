import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import { TreeSidebar } from "@/components/TreeSidebar";
import { PageViewer } from "@/components/PageViewer";
import { useAllPages } from "@/hooks/useDocumentation";
import { supabase } from "@/integrations/supabase/client";
import {
  Search, PanelLeftClose, PanelLeftOpen, BookOpen, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle
} from "lucide-react";

// ─── Main page ────────────────────────────────────────────────────────────────
export default function UidrTechnicalDocs() {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastSyncMsg, setLastSyncMsg] = useState<string>("");

  const { pages, loading, error, refetch } = useAllPages() as { pages: any[], loading: boolean, error: string | null, refetch: () => void };

  const triggerSync = useCallback(async () => {
    setSyncing(true);
    setSyncStatus("idle");
    try {
      // Trigger fill_content to pick up any changed pages
      const { error: fnError } = await supabase.functions.invoke("notion-sync", {
        body: { mode: "fill_content" },
      });
      if (fnError) throw fnError;
      await refetch();
      setSyncStatus("success");
      setLastSyncMsg("Synced just now");
    } catch (e) {
      setSyncStatus("error");
      setLastSyncMsg("Sync failed");
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncStatus("idle"), 4000);
    }
  }, [refetch]);

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
        <div className="ml-auto flex items-center gap-2">
          {syncStatus === "success" && (
            <span className="flex items-center gap-1 text-green-400 text-xs font-mono">
              <CheckCircle2 size={12} /> {lastSyncMsg}
            </span>
          )}
          {syncStatus === "error" && (
            <span className="flex items-center gap-1 text-red-400 text-xs font-mono">
              <AlertCircle size={12} /> {lastSyncMsg}
            </span>
          )}
          <button
            onClick={triggerSync}
            disabled={syncing}
            title="Sync from Notion now"
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/20 transition-all disabled:opacity-50"
          >
            <RefreshCw size={12} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing…" : "Sync Now"}
          </button>
        </div>
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
