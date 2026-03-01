import {
  Home, Bug, MessageSquare, FolderTree, GitPullRequest,
  FileText, Video, Bell, Settings,
} from "lucide-react";

export type ReachView = "home" | "issues" | "chat" | "files" | "prs" | "docs" | "meetings" | "notifications" | "settings";

const topItems: { view: ReachView; icon: typeof Home; label: string }[] = [
  { view: "home", icon: Home, label: "Home" },
  { view: "issues", icon: Bug, label: "Issues" },
  { view: "chat", icon: MessageSquare, label: "Chat" },
  { view: "files", icon: FolderTree, label: "Files" },
  { view: "prs", icon: GitPullRequest, label: "Pull Requests" },
  { view: "docs", icon: FileText, label: "Documents" },
  { view: "meetings", icon: Video, label: "Meetings" },
  { view: "notifications", icon: Bell, label: "Notifications" },
];

interface Props {
  activeView: ReachView;
  setActiveView: (v: ReachView) => void;
}

export function ReachActivityBar({ activeView, setActiveView }: Props) {
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
          className={`w-10 h-9 flex items-center justify-center rounded-lg transition-colors ${
            activeView === view
              ? "bg-blue-500/15 text-blue-400"
              : "text-white/30 hover:text-white/60 hover:bg-white/5"
          }`}
        >
          <Icon size={18} />
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
