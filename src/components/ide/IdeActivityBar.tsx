import {
  FolderTree, Bug, MessageSquare, GitBranch, Bell,
  Search, Settings, GitPullRequest, Target,
  BookOpen, LayoutDashboard, Activity, GitCommitHorizontal,
} from "lucide-react";

export type ViewMode = "explorer" | "search" | "issues" | "chat" | "commits" | "notifications" | "pulls" | "milestones" | "settings" | "docs" | "kanban" | "activity" | "staging";

interface Props {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  unreadCount: number;
  onlineCount: number;
  dirtyCount?: number;
}

const items: { mode: ViewMode; icon: typeof FolderTree; label: string }[] = [
  { mode: "explorer", icon: FolderTree, label: "Explorer" },
  { mode: "search", icon: Search, label: "Search" },
  { mode: "docs", icon: BookOpen, label: "Documentation" },
  { mode: "staging", icon: GitCommitHorizontal, label: "Source Control" },
  { mode: "issues", icon: Bug, label: "Issues" },
  { mode: "kanban", icon: LayoutDashboard, label: "Issue Board" },
  { mode: "pulls", icon: GitPullRequest, label: "Pull Requests" },
  { mode: "milestones", icon: Target, label: "Milestones" },
  { mode: "commits", icon: GitBranch, label: "History" },
  { mode: "activity", icon: Activity, label: "Activity Feed" },
  { mode: "chat", icon: MessageSquare, label: "Chat" },
  { mode: "notifications", icon: Bell, label: "Notifications" },
];

export function IdeActivityBar({ viewMode, setViewMode, unreadCount, onlineCount }: Props) {
  return (
    <div className="w-12 flex-shrink-0 bg-[#080808] border-r border-white/5 flex flex-col items-center py-2 gap-0.5">
      {items.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          title={label}
          className={`relative w-10 h-9 flex items-center justify-center rounded-lg transition-colors ${
            viewMode === mode
              ? "bg-blue-500/15 text-blue-400"
              : "text-white/30 hover:text-white/60 hover:bg-white/5"
          }`}
        >
          <Icon size={16} />
          {mode === "notifications" && unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] flex items-center justify-center text-white font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          {mode === "chat" && onlineCount > 1 && (
            <span className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </button>
      ))}
      <div className="flex-1" />
      <button
        onClick={() => setViewMode("settings")}
        title="Settings"
        className={`w-10 h-9 flex items-center justify-center rounded-lg transition-colors ${
          viewMode === "settings" ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60 hover:bg-white/5"
        }`}
      >
        <Settings size={16} />
      </button>
    </div>
  );
}
