import {
  FolderTree, Bug, MessageSquare, GitBranch, Bell,
  Search, Settings, Users,
} from "lucide-react";

export type ViewMode = "explorer" | "search" | "issues" | "chat" | "commits" | "notifications";

interface Props {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  unreadCount: number;
  onlineCount: number;
}

const items: { mode: ViewMode; icon: typeof FolderTree; label: string }[] = [
  { mode: "explorer", icon: FolderTree, label: "Explorer" },
  { mode: "search", icon: Search, label: "Search" },
  { mode: "issues", icon: Bug, label: "Issues" },
  { mode: "chat", icon: MessageSquare, label: "Chat" },
  { mode: "commits", icon: GitBranch, label: "Source Control" },
  { mode: "notifications", icon: Bell, label: "Notifications" },
];

export function IdeActivityBar({ viewMode, setViewMode, unreadCount, onlineCount }: Props) {
  return (
    <div className="w-12 flex-shrink-0 bg-[#080808] border-r border-white/5 flex flex-col items-center py-2 gap-1">
      {items.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          title={label}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            viewMode === mode
              ? "bg-blue-500/15 text-blue-400"
              : "text-white/30 hover:text-white/60 hover:bg-white/5"
          }`}
        >
          <Icon size={18} />
          {mode === "notifications" && unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      ))}
      <div className="flex-1" />
      <div className="flex items-center justify-center w-10 h-10 text-white/20" title={`${onlineCount} online`}>
        <Users size={14} />
        <span className="text-[9px] ml-0.5">{onlineCount}</span>
      </div>
      <button className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white/60 rounded-lg hover:bg-white/5">
        <Settings size={18} />
      </button>
    </div>
  );
}
