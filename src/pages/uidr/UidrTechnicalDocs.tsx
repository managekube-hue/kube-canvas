import { useState } from "react";
import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import { kdocsTree, KDocsSection, KDocsGroup, KDocsSubGroup, KDocsFile } from "@/data/kdocs-tree";
import {
  ChevronRight, ChevronDown, Folder, FolderOpen, FileText,
  Search, PanelLeftClose, PanelLeftOpen, BookOpen, ArrowLeft
} from "lucide-react";

// ─── Ext color map ──────────────────────────────────────────────────────────
const extColor: Record<string, string> = {
  rs: "#fb923c",
  go: "#22d3ee",
  py: "#a78bfa",
  ts: "#3b82f6",
  yaml: "#34d399",
  sql: "#f59e0b",
  md: "#94a3b8",
  sh: "#86efac",
  hcl: "#f472b6",
  toml: "#fbbf24",
};
function extBadge(ext?: string) {
  if (!ext) return null;
  const color = extColor[ext] ?? "#94a3b8";
  return (
    <span style={{ color, fontSize: "0.7rem", fontFamily: "monospace", marginLeft: 4, opacity: 0.85 }}>
      .{ext}
    </span>
  );
}

// ─── Selected node state ─────────────────────────────────────────────────────
type SelectedNode =
  | { kind: "welcome" }
  | { kind: "section"; section: KDocsSection }
  | { kind: "group"; section: KDocsSection; group: KDocsGroup }
  | { kind: "subgroup"; section: KDocsSection; group: KDocsGroup; sub: KDocsSubGroup }
  | { kind: "file"; section: KDocsSection; group: KDocsGroup; file: KDocsFile };

// ─── Sidebar file row ─────────────────────────────────────────────────────────
function FileRow({
  file,
  depth,
  isSelected,
  onSelect,
}: {
  file: KDocsFile;
  depth: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-2 py-1 px-2 rounded text-left transition-colors"
      style={{
        paddingLeft: depth * 14 + 8,
        background: isSelected ? "rgba(59,130,246,0.18)" : "transparent",
        color: isSelected ? "#93c5fd" : "#94a3b8",
      }}
    >
      <FileText size={12} style={{ flexShrink: 0, color: "#64748b" }} />
      <span style={{ fontSize: "0.78rem", lineHeight: 1.4 }} className="truncate">{file.label}</span>
      {extBadge(file.ext)}
    </button>
  );
}

// ─── Subgroup ─────────────────────────────────────────────────────────────────
function SubGroupRow({
  sub,
  depth,
  selected,
  onSelect,
  section,
  group,
}: {
  sub: KDocsSubGroup;
  depth: number;
  selected: SelectedNode;
  onSelect: (n: SelectedNode) => void;
  section: KDocsSection;
  group: KDocsGroup;
}) {
  const [open, setOpen] = useState(false);
  const isSelected = selected.kind === "subgroup" && selected.sub.id === sub.id;
  return (
    <div>
      <button
        onClick={() => { setOpen(o => !o); onSelect({ kind: "subgroup", section, group, sub }); }}
        className="w-full flex items-center gap-2 py-1 px-2 rounded transition-colors"
        style={{
          paddingLeft: depth * 14 + 8,
          background: isSelected ? "rgba(59,130,246,0.12)" : "transparent",
          color: isSelected ? "#93c5fd" : "#cbd5e1",
        }}
      >
        {open ? <FolderOpen size={13} style={{ color: "#f59e0b", flexShrink: 0 }} /> : <Folder size={13} style={{ color: "#64748b", flexShrink: 0 }} />}
        <span style={{ fontSize: "0.8rem" }} className="truncate flex-1 text-left">{sub.label}</span>
        {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
      </button>
      {open && sub.files.map(f => (
        <FileRow
          key={f.id}
          file={f}
          depth={depth + 1}
          isSelected={selected.kind === "file" && selected.file.id === f.id}
          onSelect={() => onSelect({ kind: "file", section, group, file: f })}
        />
      ))}
    </div>
  );
}

// ─── Group row ────────────────────────────────────────────────────────────────
function GroupRow({
  group,
  depth,
  selected,
  onSelect,
  section,
}: {
  group: KDocsGroup;
  depth: number;
  selected: SelectedNode;
  onSelect: (n: SelectedNode) => void;
  section: KDocsSection;
}) {
  const [open, setOpen] = useState(false);
  const isSelected = selected.kind === "group" && selected.group.id === group.id;
  return (
    <div>
      <button
        onClick={() => { setOpen(o => !o); onSelect({ kind: "group", section, group }); }}
        className="w-full flex items-center gap-2 py-1.5 px-2 rounded transition-colors"
        style={{
          paddingLeft: depth * 14 + 8,
          background: isSelected ? "rgba(59,130,246,0.12)" : "transparent",
          color: isSelected ? "#93c5fd" : "#e2e8f0",
        }}
      >
        {open ? <FolderOpen size={14} style={{ color: "#f59e0b", flexShrink: 0 }} /> : <Folder size={14} style={{ color: "#64748b", flexShrink: 0 }} />}
        <span style={{ fontSize: "0.83rem", fontWeight: 500 }} className="truncate flex-1 text-left">{group.code}</span>
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      {open && (
        <>
          {group.files?.map(f => (
            <FileRow
              key={f.id}
              file={f}
              depth={depth + 1}
              isSelected={selected.kind === "file" && selected.file.id === f.id}
              onSelect={() => onSelect({ kind: "file", section, group, file: f })}
            />
          ))}
          {group.subGroups?.map(sub => (
            <SubGroupRow
              key={sub.id}
              sub={sub}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
              section={section}
              group={group}
            />
          ))}
        </>
      )}
    </div>
  );
}

// ─── Section row ──────────────────────────────────────────────────────────────
function SectionRow({
  section,
  selected,
  onSelect,
  searchQuery,
}: {
  section: KDocsSection;
  selected: SelectedNode;
  onSelect: (n: SelectedNode) => void;
  searchQuery: string;
}) {
  const [open, setOpen] = useState(false);
  const isSelected = selected.kind === "section" && selected.section.id === section.id;

  // Filter children by search
  const visibleChildren = searchQuery
    ? section.children.filter(g =>
        g.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.files?.some(f => f.label.toLowerCase().includes(searchQuery.toLowerCase())) ||
        g.subGroups?.some(s =>
          s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.files.some(f => f.label.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
    : section.children;

  if (searchQuery && visibleChildren.length === 0) return null;

  const shouldOpen = open || (searchQuery.length > 0 && visibleChildren.length > 0);

  return (
    <div className="mb-1">
      <button
        onClick={() => { setOpen(o => !o); onSelect({ kind: "section", section }); }}
        className="w-full flex items-center gap-2 py-2 px-3 rounded-md transition-colors font-semibold tracking-wider"
        style={{
          background: isSelected ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
          color: section.color,
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
        }}
      >
        <span className="flex-1 text-left">{section.code} — {section.label.toUpperCase()}</span>
        {shouldOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>
      {shouldOpen && (
        <div className="mt-0.5">
          {visibleChildren.map(group => (
            <GroupRow
              key={group.id}
              group={group}
              depth={1}
              selected={selected}
              onSelect={onSelect}
              section={section}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Content panel ────────────────────────────────────────────────────────────
function ContentPanel({ selected }: { selected: SelectedNode }) {
  if (selected.kind === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-24">
        <div className="text-7xl mb-8">📁</div>
        <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "monospace" }}>
          Kubric Technical Docs
        </h1>
        <p className="text-2xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Expand any section in the left sidebar to navigate the complete K-DOCS orchestration hierarchy.
          300+ documents across infrastructure, detection engines, AI orchestration, and ITIL governance.
        </p>
        <div className="grid grid-cols-3 gap-6 w-full max-w-3xl">
          {[
            { label: "K-CORE-01", desc: "Infrastructure & Platform", color: "#3b82f6" },
            { label: "K-VENDOR-00", desc: "120k+ Detection Assets", color: "#f97316" },
            { label: "K-XRO-02", desc: "Super Agent (eBPF/Rust)", color: "#ef4444" },
            { label: "K-KAI-03", desc: "AI Personas & Orchestration", color: "#a855f7" },
            { label: "K-GRC-17", desc: "Governance & Compliance", color: "#fbbf24" },
            { label: "K-ITIL-10", desc: "ITIL Matrix & PSA", color: "#22d3ee" },
          ].map(item => (
            <div
              key={item.label}
              className="rounded-xl border p-5 text-left"
              style={{ borderColor: item.color + "40", background: item.color + "10" }}
            >
              <div className="text-lg font-bold mb-1" style={{ color: item.color, fontFamily: "monospace" }}>
                {item.label}
              </div>
              <div className="text-slate-400" style={{ fontSize: "0.9rem" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selected.kind === "section") {
    const s = selected.section;
    return (
      <div className="p-12">
        <div className="text-sm font-mono mb-3" style={{ color: s.color }}>{s.code}</div>
        <h1 className="text-5xl font-bold text-white mb-6">{s.label}</h1>
        <p className="text-xl text-slate-400 mb-10">
          This section contains {s.children.length} module groups. Expand the sidebar to navigate individual files.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {s.children.map(g => (
            <div key={g.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono text-slate-500 mb-1">{g.code}</div>
              <div className="text-lg font-semibold text-white">{g.label}</div>
              <div className="text-sm text-slate-400 mt-1">
                {(g.files?.length ?? 0) + (g.subGroups?.reduce((a, sg) => a + sg.files.length, 0) ?? 0)} files
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selected.kind === "group") {
    const { section, group } = selected;
    const totalFiles = (group.files?.length ?? 0) + (group.subGroups?.reduce((a, sg) => a + sg.files.length, 0) ?? 0);
    return (
      <div className="p-12">
        <div className="text-sm font-mono mb-1" style={{ color: section.color }}>{section.code}</div>
        <div className="text-base font-mono text-slate-500 mb-3">{group.code}</div>
        <h1 className="text-5xl font-bold text-white mb-6">{group.label}</h1>
        <p className="text-xl text-slate-400 mb-10">{totalFiles} files in this module group</p>
        {group.files && group.files.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-300 mb-3">Root Files</h3>
            <div className="space-y-2">
              {group.files.map(f => (
                <div key={f.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <FileText size={16} className="text-slate-500" />
                  <span className="text-white flex-1">{f.label}</span>
                  {f.ext && <span className="font-mono text-xs" style={{ color: extColor[f.ext] ?? "#94a3b8" }}>.{f.ext}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        {group.subGroups && group.subGroups.map(sg => (
          <div key={sg.id} className="mb-6">
            <h3 className="text-base font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <Folder size={15} className="text-yellow-500" />
              {sg.label}
            </h3>
            <div className="space-y-1.5 pl-4">
              {sg.files.map(f => (
                <div key={f.id} className="flex items-center gap-3 rounded border border-white/5 bg-white/3 px-3 py-2">
                  <FileText size={13} className="text-slate-600" />
                  <span className="text-slate-300 flex-1" style={{ fontSize: "0.9rem" }}>{f.label}</span>
                  {f.ext && <span className="font-mono" style={{ fontSize: "0.7rem", color: extColor[f.ext] ?? "#94a3b8" }}>.{f.ext}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (selected.kind === "subgroup") {
    const { section, group, sub } = selected;
    return (
      <div className="p-12">
        <div className="text-sm font-mono mb-1" style={{ color: section.color }}>{section.code} / {group.code}</div>
        <div className="text-base font-mono text-slate-500 mb-3">{sub.code}</div>
        <h1 className="text-5xl font-bold text-white mb-6">{sub.label}</h1>
        <p className="text-xl text-slate-400 mb-10">{sub.files.length} files</p>
        <div className="space-y-2">
          {sub.files.map(f => (
            <div key={f.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <FileText size={16} className="text-slate-500" />
              <span className="text-white flex-1">{f.label}</span>
              {f.ext && <span className="font-mono text-xs" style={{ color: extColor[f.ext] ?? "#94a3b8" }}>.{f.ext}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selected.kind === "file") {
    const { section, group, file } = selected;
    return (
      <div className="p-12">
        <div className="text-sm font-mono mb-1" style={{ color: section.color }}>{section.code} / {group.code}</div>
        <div className="flex items-center gap-3 mb-6">
          <FileText size={28} className="text-slate-400" />
          <h1 className="text-4xl font-bold text-white font-mono">{file.code}</h1>
          {file.ext && (
            <span className="text-lg font-mono" style={{ color: extColor[file.ext] ?? "#94a3b8" }}>.{file.ext}</span>
          )}
        </div>
        <h2 className="text-3xl text-slate-300 mb-8">{file.label}</h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-slate-400 text-sm font-mono">Pending Notion sync — this document will be populated via the Kubric Notion API integration.</span>
          </div>
          <div className="space-y-3 text-slate-500 text-sm font-mono">
            <div># {file.code} — {file.label}</div>
            <div className="opacity-50">## Status: PENDING_SYNC</div>
            <div className="opacity-50">## Module: {group.code}</div>
            <div className="opacity-50">## Section: {section.code}</div>
            {file.ext && <div className="opacity-50">## Format: .{file.ext}</div>}
          </div>
        </div>
        <div className="mt-8 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
          <p className="text-blue-300 text-sm">
            Once Lovable Cloud + Notion API integration is active, this page will auto-sync with live documentation content from the Kubric workspace.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function UidrTechnicalDocs() {
  const [selected, setSelected] = useState<SelectedNode>({ kind: "welcome" });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <UidrLayout>
      {/* Back bar */}
      <div className="border-b border-white/5 bg-[#0d0d0d] px-6 py-3 flex items-center gap-4">
        <Link
          to="/uidr/docs"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={14} />
          Back to Kubric Docs
        </Link>
        <span className="text-white/20">|</span>
        <span className="text-white/50 text-sm font-mono">K-DOCS Technical Documentation Explorer</span>
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

              {/* Tree */}
              <div className="flex-1 overflow-y-auto px-2 py-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
                {kdocsTree.map(section => (
                  <SectionRow
                    key={section.id}
                    section={section}
                    selected={selected}
                    onSelect={setSelected}
                    searchQuery={search}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT CONTENT PANEL ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#0a0a0a" }}>
          <ContentPanel selected={selected} />
        </div>
      </div>
    </UidrLayout>
  );
}
