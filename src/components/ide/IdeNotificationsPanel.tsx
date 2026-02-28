import { Bell, Check, CheckCheck } from "lucide-react";
import type { ReachNotification } from "@/hooks/useReachNotifications";

interface Props {
  notifications: ReachNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export function IdeNotificationsPanel({ notifications, onMarkRead, onMarkAllRead }: Props) {
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
        {notifications.map(n => (
          <div
            key={n.id}
            className={`px-3 py-2.5 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer ${
              !n.is_read ? "bg-blue-500/5" : ""
            }`}
            onClick={() => !n.is_read && onMarkRead(n.id)}
          >
            <div className="flex items-start gap-2">
              {!n.is_read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white font-medium truncate">{n.title}</p>
                {n.body && <p className="text-[10px] text-white/40 mt-0.5 truncate">{n.body}</p>}
                <p className="text-[9px] text-white/20 mt-1">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
