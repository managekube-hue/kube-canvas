import { useState, useEffect, useRef } from "react";
import { FileEdit, Trash2, Copy, ExternalLink, FilePlus, FolderPlus } from "lucide-react";

export interface ContextMenuAction {
  label: string;
  icon: typeof FileEdit;
  action: () => void;
  danger?: boolean;
  divider?: boolean;
}

interface Props {
  x: number;
  y: number;
  actions: ContextMenuAction[];
  onClose: () => void;
}

export function IdeContextMenu({ x, y, actions, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [onClose]);

  // Adjust position to stay in viewport
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - actions.length * 32 - 20);

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-[#151515] border border-white/10 rounded-lg shadow-xl shadow-black/50 py-1 min-w-[180px]"
      style={{ left: adjustedX, top: adjustedY }}
    >
      {actions.map((action, i) => (
        <div key={i}>
          {action.divider && i > 0 && <div className="my-1 border-t border-white/5" />}
          <button
            onClick={() => { action.action(); onClose(); }}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs transition-colors ${
              action.danger
                ? "text-red-400/80 hover:bg-red-500/10 hover:text-red-400"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <action.icon size={13} className={action.danger ? "text-red-400/60" : "text-white/30"} />
            <span>{action.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

// Helper to build standard file actions
export function buildFileActions(
  path: string,
  isDir: boolean,
  callbacks: {
    onRename?: (path: string) => void;
    onDelete?: (path: string) => void;
    onCopyPath?: (path: string) => void;
    onNewFile?: (dir: string) => void;
    onOpenInEditor?: (path: string) => void;
  }
): ContextMenuAction[] {
  const actions: ContextMenuAction[] = [];

  if (!isDir && callbacks.onOpenInEditor) {
    actions.push({ label: "Open File", icon: ExternalLink, action: () => callbacks.onOpenInEditor!(path) });
  }

  if (isDir && callbacks.onNewFile) {
    actions.push({ label: "New File Here…", icon: FilePlus, action: () => callbacks.onNewFile!(path + "/") });
  }

  if (callbacks.onRename) {
    actions.push({ label: "Rename…", icon: FileEdit, action: () => callbacks.onRename!(path) });
  }

  if (callbacks.onCopyPath) {
    actions.push({ label: "Copy Path", icon: Copy, action: () => callbacks.onCopyPath!(path) });
  }

  if (callbacks.onDelete) {
    actions.push({ label: "Delete", icon: Trash2, action: () => callbacks.onDelete!(path), danger: true, divider: true });
  }

  return actions;
}
