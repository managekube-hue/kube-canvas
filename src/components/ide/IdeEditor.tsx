import { useState } from "react";
import { GitBranch, Loader2, Save, X, ChevronRight, Eye, Columns2 } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import type { PresenceUser } from "@/hooks/useReachPresence";
import { IdeFileIcon } from "@/components/ide/IdeFileIcon";

interface OpenTab {
  path: string;
  content: string;
  dirty: boolean;
  language: string;
  loading: boolean;
}

interface Props {
  tabs: OpenTab[];
  activeTab: string | null;
  onTabSelect: (path: string) => void;
  onTabClose: (path: string) => void;
  onContentChange: (path: string, content: string) => void;
  onCommit: (path: string, message: string) => void;
  branch: string;
  onlineUsers: PresenceUser[];
  owner: string;
  repo: string;
}

export function IdeEditor({
  tabs, activeTab, onTabSelect, onTabClose,
  onContentChange, onCommit, branch, onlineUsers, owner, repo,
}: Props) {
  const [commitMsg, setCommitMsg] = useState("");
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitTarget, setCommitTarget] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const activeTabData = tabs.find(t => t.path === activeTab);
  const isMarkdown = activeTab?.match(/\.(md|mdx)$/i);

  const startCommit = (path: string) => {
    setCommitTarget(path);
    setCommitMsg(`Update ${path.split("/").pop()}`);
    setShowCommitDialog(true);
  };

  const doCommit = () => {
    if (commitTarget && commitMsg.trim()) {
      onCommit(commitTarget, commitMsg.trim());
      setShowCommitDialog(false);
      setCommitMsg("");
      setCommitTarget(null);
    }
  };

  const fileUsers = activeTab
    ? onlineUsers.filter(u => u.active_file === activeTab)
    : [];

  // Breadcrumb segments
  const breadcrumbs = activeTab?.split("/") || [];

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Tab bar */}
      <div className="h-9 border-b border-white/5 flex items-center px-1 gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {tabs.map(tab => (
          <div
            key={tab.path}
            onClick={() => onTabSelect(tab.path)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs cursor-pointer border-r border-white/5 flex-shrink-0 ${
              activeTab === tab.path
                ? "bg-[#0a0a0a] text-white/80 border-t-2 border-t-blue-500"
                : "bg-[#0e0e0e] text-white/40 hover:text-white/60 border-t-2 border-t-transparent"
            }`}
          >
            <IdeFileIcon filename={tab.path.split("/").pop() || ""} size={12} />
            <span className="max-w-[120px] truncate">{tab.path.split("/").pop()}</span>
            {tab.dirty && <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
            <button onClick={(e) => { e.stopPropagation(); onTabClose(tab.path); }}
              className="ml-1 text-white/20 hover:text-white/60"><X size={10} /></button>
          </div>
        ))}
        <div className="flex-1" />
        {isMarkdown && (
          <button onClick={() => setShowPreview(!showPreview)}
            className={`h-6 px-2 text-[10px] rounded flex items-center gap-1 mr-1 ${showPreview ? "bg-emerald-500/15 text-emerald-400" : "text-white/30 hover:text-white/60"}`}
            title={showPreview ? "Hide preview" : "Show preview"}>
            {showPreview ? <Columns2 size={10} /> : <Eye size={10} />}
            {showPreview ? "Split" : "Preview"}
          </button>
        )}
        {activeTabData?.dirty && (
          <Button size="sm" onClick={() => startCommit(activeTabData.path)}
            className="h-6 text-[10px] bg-blue-600 hover:bg-blue-700 gap-1 mr-2 flex-shrink-0">
            <Save size={10} /> Commit
          </Button>
        )}
        {fileUsers.length > 0 && (
          <div className="flex items-center gap-1 mr-2 flex-shrink-0">
            {fileUsers.map(u => (
              <div key={u.user_id} className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center" title={u.email}>
                <span className="text-[8px] text-green-400 font-bold">{u.email?.[0]?.toUpperCase() || "?"}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Breadcrumbs */}
      {activeTab && (
        <div className="h-6 px-3 border-b border-white/[0.03] flex items-center gap-0.5 overflow-hidden">
          {breadcrumbs.map((seg, i) => (
            <span key={i} className="flex items-center gap-0.5 text-[10px]">
              {i > 0 && <ChevronRight size={9} className="text-white/15" />}
              <span className={i === breadcrumbs.length - 1 ? "text-white/60" : "text-white/25"}>{seg}</span>
            </span>
          ))}
        </div>
      )}

      {/* Commit dialog */}
      {showCommitDialog && (
        <div className="px-4 py-2 bg-[#0c0c0c] border-b border-white/10 flex items-center gap-2">
          <GitBranch size={12} className="text-blue-400 flex-shrink-0" />
          <input autoFocus value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doCommit()}
            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none"
            placeholder="Commit message..." />
          <Button size="sm" onClick={doCommit} className="h-6 text-[10px] bg-blue-600">Commit to {branch}</Button>
          <button onClick={() => setShowCommitDialog(false)} className="text-white/30 hover:text-white/60"><X size={14} /></button>
        </div>
      )}

      {/* Editor + Preview */}
      <div className="flex-1 flex overflow-hidden">
        {activeTabData ? (
          activeTabData.loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            </div>
          ) : (
            <>
              <div className={`${showPreview && isMarkdown ? "w-1/2" : "flex-1"} overflow-hidden`}>
                <Editor
                  height="100%"
                  language={activeTabData.language}
                  value={activeTabData.content}
                  onChange={(val) => onContentChange(activeTabData.path, val || "")}
                  theme="vs-dark"
                  options={{
                    fontSize: 13,
                    fontFamily: "'Roboto Mono', monospace",
                    minimap: { enabled: !showPreview, scale: 1 },
                    scrollBeyondLastLine: false,
                    padding: { top: 12 },
                    lineNumbers: "on",
                    wordWrap: "on",
                    renderWhitespace: "selection",
                    bracketPairColorization: { enabled: true },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    formatOnPaste: true,
                    suggest: { showMethods: true, showFunctions: true },
                  }}
                />
              </div>
              {showPreview && isMarkdown && (
                <div className="w-1/2 border-l border-white/5 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
                  <div className="prose prose-invert prose-sm max-w-none
                    prose-headings:font-bold prose-headings:text-white
                    prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
                    prose-p:text-white/70 prose-p:text-[13px] prose-p:leading-relaxed
                    prose-a:text-blue-400 prose-a:no-underline
                    prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-[#0c0c0c] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg
                    prose-li:text-white/60 prose-li:text-[13px]
                    prose-strong:text-white prose-em:text-white/80
                    prose-blockquote:border-blue-500/40 prose-blockquote:text-white/50
                    prose-hr:border-white/10
                  ">
                    <ReactMarkdown>{activeTabData.content}</ReactMarkdown>
                  </div>
                </div>
              )}
            </>
          )
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-white/20">
            <IdeFileIcon filename="welcome.md" size={48} className="mb-4 !text-white/10" />
            <p className="text-sm">Select a file from the explorer</p>
            <p className="text-xs mt-1 text-white/10">{owner}/{repo} · {branch}</p>
            <div className="mt-6 flex flex-col items-center gap-1 text-[10px] text-white/15">
              <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd> Command Palette</span>
              <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘P</kbd> Quick File Open</span>
              <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘S</kbd> Commit Changes</span>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-blue-600 flex items-center px-3 gap-4 text-[10px] text-white/80">
        <span className="flex items-center gap-1"><GitBranch size={10} /> {branch}</span>
        {activeTab && <span className="flex items-center gap-1"><IdeFileIcon filename={activeTab.split("/").pop() || ""} size={10} /> {activeTab}</span>}
        <div className="flex-1" />
        {activeTabData && <span>{activeTabData.language}</span>}
        <span>UTF-8</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          {onlineUsers.length} online
        </span>
      </div>
    </div>
  );
}
