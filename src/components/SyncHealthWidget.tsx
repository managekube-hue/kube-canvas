import { useSyncStatus } from "@/hooks/useDocumentation";
import { CheckCircle, AlertTriangle, XCircle, Loader2, Clock } from "lucide-react";

export function SyncHealthWidget() {
  const { status, loading } = useSyncStatus();

  if (loading) return null;

  const getTimeSince = (dateStr: string | null) => {
    if (!dateStr) return "never";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const isStale = () => {
    if (!status?.completed_at) return true;
    const diff = Date.now() - new Date(status.completed_at).getTime();
    return diff > 10 * 60_000; // >10 minutes
  };

  const getIcon = () => {
    if (!status) return <AlertTriangle size={12} className="text-yellow-400" />;
    if (status.status === "running") return <Loader2 size={12} className="text-blue-400 animate-spin" />;
    if (status.status === "failed") return <XCircle size={12} className="text-red-400" />;
    if (isStale()) return <AlertTriangle size={12} className="text-yellow-400" />;
    if (status.status === "completed_with_errors") return <AlertTriangle size={12} className="text-yellow-400" />;
    return <CheckCircle size={12} className="text-emerald-400" />;
  };

  const getLabel = () => {
    if (!status) return "No sync data";
    if (status.status === "running") return "Syncing...";
    if (status.status === "failed") return "Sync failed";
    if (isStale()) return "Sync stale";
    return "Sync OK";
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/5 text-xs">
      {getIcon()}
      <span className="text-slate-300">{getLabel()}</span>
      {status?.completed_at && (
        <span className="text-slate-500 flex items-center gap-1">
          <Clock size={10} />
          {getTimeSince(status.completed_at)}
        </span>
      )}
      {status?.pages_synced != null && status.pages_synced > 0 && (
        <span className="text-blue-400/70">{status.pages_synced} updated</span>
      )}
    </div>
  );
}
