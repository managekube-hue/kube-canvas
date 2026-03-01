import {
  FolderTree, Bug, MessageSquare, GitBranch, Bell,
  Search, Settings, GitPullRequest, Target,
  BookOpen, LayoutDashboard, Activity, GitCommitHorizontal, Video,
  Bot,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ViewMode = "explorer" | "search" | "issues" | "chat" | "commits" | "notifications" | "pulls" | "milestones" | "settings" | "docs" | "kanban" | "activity" | "staging" | "video" | "ai";

interface Props {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  unreadCount: number;
  onlineCount: number;
  dirtyCount?: number;
}

const items: { mode: ViewMode; icon: typeof FolderTree; label: string; shortcut?: string }[] = [
  { mode: "explorer", icon: FolderTree, label: "Explorer", shortcut: "⇧⌘E" },
  { mode: "search", icon: Search, label: "Search", shortcut: "⇧⌘F" },
  { mode: "docs", icon: BookOpen, label: "Documentation" },
  { mode: "staging", icon: GitCommitHorizontal, label: "Source Control", shortcut: "⇧⌘G" },
  { mode: "issues", icon: Bug, label: "Issues" },
  { mode: "kanban", icon: LayoutDashboard, label: "Issue Board" },
  { mode: "pulls", icon: GitPullRequest, label: "Pull Requests" },
  { mode: "milestones", icon: Target, label: "Milestones" },
  { mode: "commits", icon: GitBranch, label: "History" },
  { mode: "activity", icon: Activity, label: "Activity Feed" },
  { mode: "chat", icon: MessageSquare, label: "Chat", shortcut: "⇧⌘M" },
  { mode: "video", icon: Video, label: "Video Rooms" },
  { mode: "ai", icon: Bot, label: "AI Copilot", shortcut: "⇧⌘I" },
  { mode: "notifications", icon: Bell, label: "Notifications" },
];

export function IdeActivityBar({ viewMode, setViewMode, unreadCount, onlineCount, dirtyCount = 0 }: Props) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="w-12 flex-shrink-0 bg-[#080808] border-r border-white/5 flex flex-col items-center py-2 gap-0.5">
        {items.map(({ mode, icon: Icon, label, shortcut }) => (
          <Tooltip key={mode}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setViewMode(mode)}
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
                {mode === "staging" && dirtyCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full text-[7px] flex items-center justify-center text-white font-bold">
                    {dirtyCount > 9 ? "9+" : dirtyCount}
                  </span>
                )}
                {mode === "chat" && onlineCount > 1 && (
                  <span className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-green-500 rounded-full" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#1e1e1e] border-white/10 text-white text-xs">
              <span>{label}</span>
              {shortcut && <span className="ml-2 text-white/30 text-[10px]">{shortcut}</span>}
            </TooltipContent>
          </Tooltip>
        ))}
        <div className="flex-1" />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setViewMode("settings")}
              className={`w-10 h-9 flex items-center justify-center rounded-lg transition-colors ${
                viewMode === "settings" ? "bg-blue-500/15 text-blue-400" : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              <Settings size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-[#1e1e1e] border-white/10 text-white text-xs">
            <span>Settings</span>
            <span className="ml-2 text-white/30 text-[10px]">⌘,</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
