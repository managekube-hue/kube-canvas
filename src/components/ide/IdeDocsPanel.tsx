import { useState, useEffect, useCallback, useMemo } from "react";
import { BookOpen, ChevronRight, ChevronDown, FileText, Loader2, ArrowLeft, ExternalLink, Plus, Save, Edit3, Eye } from "lucide-react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import type { TreeNode } from "./IdeFileTree";

interface Props {
  tree: TreeNode[];
  onLoadFile: (path: string) => Promise<string>;
  onOpenInEditor: (path: string) => void;
  onSaveDoc?: (path: string, content: string) => void;
  onCreateDoc?: (path: string) => void;
}

interface DocNode {
  name: string;
  path: string;
  children: DocNode[];
  isDir: boolean;
}

function extractDocs(nodes: TreeNode[]): DocNode[] {
  const result: DocNode[] = [];
  for (const node of nodes) {
    if (node.type === "tree") {
      const childDocs = extractDocs(node.children);
      if (childDocs.length > 0) {
        result.push({ name: node.name, path: node.path, children: childDocs, isDir: true });
      }
    } else if (/\.(md|mdx|txt|rst)$/i.test(node.name)) {
      result.push({ name: node.name, path: node.path, children: [], isDir: false });
    }
  }
  return result;
}

function DocTreeView({ nodes, onSelect, selectedPath, depth = 0 }: {
  nodes: DocNode[];
  onSelect: (path: string) => void;
  selectedPath: string | null;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const set = new Set<string>();
    if (depth === 0) nodes.filter(n => n.isDir).forEach(n => set.add(n.path));
    return set;
  });

  return (
    <div>
      {nodes.map(node => (
        <div key={node.path}>
          <button
            onClick={() => node.isDir
              ? setExpanded(prev => { const n = new Set(prev); n.has(node.path) ? n.delete(node.path) : n.add(node.path); return n; })
              : onSelect(node.path)
            }
            className={`flex items-center gap-1.5 w-full px-2 py-1.5 text-xs hover:bg-white/5 rounded transition-colors ${
              selectedPath === node.path ? "bg-blue-500/15 text-blue-400" : "text-white/70"
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
          >
            {node.isDir ? (
              expanded.has(node.path) ? <ChevronDown size={11} /> : <ChevronRight size={11} />
            ) : (
              <FileText size={12} className="text-emerald-400/60" />
            )}
            <span className="truncate">{node.name.replace(/\.(md|mdx)$/i, "")}</span>
          </button>
          {node.isDir && expanded.has(node.path) && (
            <DocTreeView nodes={node.children} onSelect={onSelect} selectedPath={selectedPath} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

// Markdown editor using BlockNote
function BlockEditor({ initialContent, onContentChange }: { initialContent: string; onContentChange: (md: string) => void }) {
  const editor = useCreateBlockNote({
    initialContent: undefined,
  });

  // Load markdown content into editor
  useEffect(() => {
    if (!editor || !initialContent) return;
    const load = async () => {
      try {
        const blocks = await editor.tryParseMarkdownToBlocks(initialContent);
        editor.replaceBlocks(editor.document, blocks);
      } catch {
        // fallback - just set as paragraph
      }
    };
    load();
  }, [editor, initialContent]);

  // Track changes
  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      const md = editor.blocksToMarkdownLossy(editor.document);
      onContentChange(md);
    };
    editor.onEditorContentChange(handler);
  }, [editor, onContentChange]);

  return (
    <div className="blocknote-dark-wrapper" style={{ minHeight: "300px" }}>
      <BlockNoteView editor={editor} theme="dark" />
    </div>
  );
}

export function IdeDocsPanel({ tree, onLoadFile, onOpenInEditor, onSaveDoc, onCreateDoc }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isDirty, setIsDirty] = useState(false);
  const [showNewDoc, setShowNewDoc] = useState(false);
  const [newDocPath, setNewDocPath] = useState("");
  const docTree = extractDocs(tree);

  const loadDoc = useCallback(async (path: string) => {
    setSelectedDoc(path);
    setLoading(true);
    setMode("view");
    setIsDirty(false);
    try {
      const raw = await onLoadFile(path);
      setContent(raw);
      setEditedContent(raw);
    } catch {
      setContent(`> Error loading ${path}`);
      setEditedContent("");
    } finally {
      setLoading(false);
    }
  }, [onLoadFile]);

  const handleSave = () => {
    if (selectedDoc && onSaveDoc && isDirty) {
      onSaveDoc(selectedDoc, editedContent);
      setContent(editedContent);
      setIsDirty(false);
    }
  };

  const handleContentChange = useCallback((md: string) => {
    setEditedContent(md);
    setIsDirty(true);
  }, []);

  const handleCreateDoc = () => {
    if (!newDocPath.trim()) return;
    const path = newDocPath.trim().endsWith(".md") ? newDocPath.trim() : `${newDocPath.trim()}.md`;
    onCreateDoc?.(path);
    setShowNewDoc(false);
    setNewDocPath("");
    // Open it after a brief delay for tree to update
    setTimeout(() => loadDoc(path), 1000);
  };

  // Doc detail view (edit or read)
  if (selectedDoc && !loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
          <button onClick={() => { setSelectedDoc(null); setMode("view"); }} className="text-white/30 hover:text-white/60">
            <ArrowLeft size={14} />
          </button>
          <BookOpen size={12} className="text-emerald-400" />
          <span className="text-[10px] text-white/50 truncate flex-1">{selectedDoc}</span>
          <div className="flex items-center gap-1">
            {mode === "view" ? (
              <button onClick={() => setMode("edit")} className="text-white/30 hover:text-blue-400 flex items-center gap-1" title="Edit">
                <Edit3 size={12} />
              </button>
            ) : (
              <>
                <button onClick={() => setMode("view")} className="text-white/30 hover:text-white/60" title="Preview">
                  <Eye size={12} />
                </button>
                {isDirty && (
                  <button onClick={handleSave}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[10px]"
                    title="Save & stage">
                    <Save size={12} />
                  </button>
                )}
              </>
            )}
            <button onClick={() => onOpenInEditor(selectedDoc)} className="text-white/30 hover:text-blue-400" title="Open in Monaco">
              <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {isDirty && (
          <div className="px-3 py-1 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center gap-2">
            <span className="text-[10px] text-yellow-400">Unsaved changes</span>
            <button onClick={handleSave} className="text-[10px] text-emerald-400 hover:text-emerald-300 ml-auto">
              Save to staging
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
          {mode === "edit" ? (
            <BlockEditor initialContent={content} onContentChange={handleContentChange} />
          ) : (
            <div className="px-4 py-4 prose prose-invert prose-sm max-w-none
              prose-headings:font-bold prose-headings:text-white prose-headings:border-b prose-headings:border-white/10 prose-headings:pb-2
              prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
              prose-p:text-white/70 prose-p:text-[13px] prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0c0c0c] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg
              prose-li:text-white/60 prose-li:text-[13px]
              prose-strong:text-white prose-em:text-white/80
              prose-blockquote:border-blue-500/40 prose-blockquote:text-white/50
              prose-table:text-xs prose-th:text-white/60 prose-td:text-white/50 prose-th:border-white/10 prose-td:border-white/10
              prose-hr:border-white/10 prose-img:rounded-lg prose-img:border prose-img:border-white/10
            ">
              {/* Render markdown as text for view mode since BlockNote handles edit */}
              {content.split("\n").map((line, i) => {
                if (line.startsWith("# ")) return <h1 key={i}>{line.slice(2)}</h1>;
                if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
                if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
                if (line.startsWith("- ")) return <li key={i}>{line.slice(2)}</li>;
                if (line.startsWith("> ")) return <blockquote key={i}><p>{line.slice(2)}</p></blockquote>;
                if (line.startsWith("```")) return null;
                if (line.trim() === "") return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
        <BookOpen size={12} className="text-emerald-400" />
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex-1">Documentation</span>
        {onCreateDoc && (
          <button onClick={() => setShowNewDoc(!showNewDoc)} className="text-white/30 hover:text-emerald-400" title="New document">
            <Plus size={12} />
          </button>
        )}
      </div>

      {showNewDoc && (
        <div className="px-3 py-2 border-b border-white/5 space-y-1.5">
          <input
            autoFocus
            value={newDocPath}
            onChange={(e) => setNewDocPath(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateDoc()}
            placeholder="docs/my-doc.md"
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none placeholder:text-white/20 focus:border-blue-500/40"
          />
          <button onClick={handleCreateDoc}
            className="w-full text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white rounded py-1.5 transition-colors">
            Create & Open
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 size={16} className="animate-spin text-blue-400" />
          </div>
        )}
        {!loading && docTree.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white/20">
            <BookOpen size={28} className="mb-3" />
            <p className="text-xs">No documentation found</p>
            <p className="text-[10px] text-white/15 mt-1">Add .md files or create one above</p>
          </div>
        )}
        {!loading && <DocTreeView nodes={docTree} onSelect={loadDoc} selectedPath={selectedDoc} />}
      </div>
    </div>
  );
}
