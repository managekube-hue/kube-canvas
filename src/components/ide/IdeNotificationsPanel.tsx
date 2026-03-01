import { Bell, Check, CheckCheck, Bug, GitPullRequest, MessageSquare, AtSign, GitCommit } from "lucide-react";
import type { ReachNotification } from "@/hooks/useReachNotifications";

interface Props {
  notifications: ReachNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onNavigate?: (type: string, refId?: string) => void;
}

const typeIcons: Record<string, typeof Bell> = {
  issue: Bug,
  pr: GitPullRequest,
  mention: AtSign,
  chat: MessageSquare,
  commit: GitCommit,
};

const typeColors: Record<string, string> = {
  issue: "text-yellow-400",
  pr: "text-purple-400",
  mention: "text-blue-400",
  chat: "text-emerald-400",
  commit: "text-green-400",
};

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export function IdeNotificationsPanel({ notifications, onMarkRead, onMarkAllRead, onNavigate }: Props) {
  const handleClick = (n: ReachNotification) => {
    if (!n.is_read) onMarkRead(n.id);
    onNavigate?.(n.type);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Notifications</span>
        {notifications.some(n => !n.is_read) && (
          <button onClick={onMarkAllRead} className="text-white/30 hover:text-white/60" title="Mark all read">
            <CheckCheck size={12} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-white/20">
            <Bell size={24} className="mb-2" />
            <p className="text-xs">No notifications</p>
          </div>
        )}
        {notifications.map(n => {
          const Icon = typeIcons[n.type] || Bell;
          const color = typeColors[n.type] || "text-white/40";
          return (
            <div
              key={n.id}
              className={`px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer ${
                !n.is_read ? "bg-blue-500/5" : ""
              }`}
              onClick={() => handleClick(n)}
            >
              <div className="flex items-start gap-2">
                <Icon size={13} className={`mt-0.5 flex-shrink-0 ${color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {!n.is_read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                    <p className="text-xs text-white font-medium truncate">{n.title}</p>
                  </div>
                  {n.body && <p className="text-[10px] text-white/40 mt-0.5 truncate">{n.body}</p>}
                  <p className="text-[9px] text-white/20 mt-1">{timeAgo(n.created_at)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
