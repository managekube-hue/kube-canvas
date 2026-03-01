import { ChevronDown } from "lucide-react";
import type { ReachWorkspace } from "@/hooks/useReachWorkspace";
import type { User } from "@supabase/supabase-js";

interface Props {
  workspace: ReachWorkspace | null;
  workspaces: ReachWorkspace[];
  onSelectWorkspace: (ws: ReachWorkspace) => void;
  user: User | null;
}

export function ReachTopBar({ workspace, workspaces, onSelectWorkspace, user }: Props) {
  const initials = (user?.user_metadata?.display_name || user?.email || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="h-12 flex-shrink-0 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a]">
      {/* Left: brand + workspace */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-wider text-white/80">REACH</span>
        <span className="text-white/10">|</span>
        <button className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
          <span>{workspace?.name || "No workspace"}</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Right: avatar */}
      <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
        <span className="text-[10px] font-bold text-blue-400">{initials}</span>
      </div>
    </div>
  );
}
