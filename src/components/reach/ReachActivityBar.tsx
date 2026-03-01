import {
  Home, Bug, MessageSquare, FolderTree, GitPullRequest,
  FileText, Video, Bell, Settings, Search, Activity, Target,
} from "lucide-react";

export type ReachView = "home" | "issues" | "chat" | "files" | "prs" | "docs" | "meetings" | "notifications" | "settings" | "search" | "activity" | "milestones";

const topItems: { view: ReachView; icon: typeof Home; label: string }[] = [
  { view: "home", icon: Home, label: "Home" },
  { view: "issues", icon: Bug, label: "Issues" },
  { view: "activity", icon: Activity, label: "Activity" },
  { view: "chat", icon: MessageSquare, label: "Chat" },
  { view: "files", icon: FolderTree, label: "Files" },
  { view: "search", icon: Search, label: "Search" },
  { view: "prs", icon: GitPullRequest, label: "Pull Requests" },
  { view: "milestones", icon: Target, label: "Milestones" },
  { view: "docs", icon: FileText, label: "Documents" },
  { view: "meetings", icon: Video, label: "Meetings" },
  { view: "notifications", icon: Bell, label: "Notifications" },
];

interface Props {
  activeView: ReachView;
  setActiveView: (v: ReachView) => void;
  unreadCount?: number;
  onlineCount?: number;
  dirtyCount?: number;
}

export function ReachActivityBar({ activeView, setActiveView, unreadCount = 0, onlineCount = 0, dirtyCount = 0 }: Props) {
  return (
    <div className="w-[52px] flex-shrink-0 bg-[#080808] border-r border-white/5 flex flex-col items-center py-3 gap-1">
      {/* Logo mark */}
      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
        <span className="text-blue-400 font-bold text-xs">R</span>
      </div>

      {topItems.map(({ view, icon: Icon, label }) => (
        <button
          key={view}
          onClick={() => setActiveView(view)}
          title={label}
          className={`relative w-10 h-9 flex items-center justify-center rounded-lg transition-colors ${
            activeView === view
              ? "bg-blue-500/15 text-blue-400"
              : "text-white/30 hover:text-white/60 hover:bg-white/5"
          }`}
        >
          <Icon size={18} />
          {view === "notifications" && unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] flex items-center justify-center text-white font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          {view === "files" && dirtyCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full text-[7px] flex items-center justify-center text-white font-bold">
              {dirtyCount > 9 ? "9+" : dirtyCount}
            </span>
          )}
          {view === "chat" && onlineCount > 1 && (
            <span className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </button>
      ))}

      <div className="flex-1" />

      <button
        onClick={() => setActiveView("settings")}
        title="Settings"
        className={`w-10 h-9 flex items-center justify-center rounded-lg transition-colors ${
          activeView === "settings"
            ? "bg-blue-500/15 text-blue-400"
            : "text-white/30 hover:text-white/60 hover:bg-white/5"
        }`}
      >
        <Settings size={18} />
      </button>
    </div>
  );
}
