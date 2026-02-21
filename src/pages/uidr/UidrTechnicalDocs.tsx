import { useState } from "react";
import { UidrLayout } from "@/components/UidrLayout";
import { TreeSidebar } from "@/components/TreeSidebar";
import { PageViewer } from "@/components/PageViewer";
import { useAllPages } from "@/hooks/useDocumentation";
import { SyncHealthWidget } from "@/components/SyncHealthWidget";
import { Search, PanelLeftClose, PanelLeftOpen, BookOpen } from "lucide-react";

export default function UidrTechnicalDocs() {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const { pages, loading, error } = useAllPages();

  return (
    <UidrLayout>
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
                <SyncHealthWidget />
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
