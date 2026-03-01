import { useState } from "react";
import { ReachActivityBar, type ReachView } from "@/components/reach/ReachActivityBar";
import { ReachTopBar } from "@/components/reach/ReachTopBar";
import { ReachHomeDashboard } from "@/components/reach/ReachHomeDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useReachWorkspace } from "@/hooks/useReachWorkspace";

export default function Reach() {
  const [activeView, setActiveView] = useState<ReachView>("home");
  const { user } = useAuth();
  const { workspaces, activeWorkspace, setActiveWorkspace, loading } = useReachWorkspace();

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "there";

  return (
    <div className="h-screen w-screen flex bg-[#0a0a0a] text-white overflow-hidden">
      {/* Activity Bar */}
      <ReachActivityBar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <ReachTopBar
          workspace={activeWorkspace}
          workspaces={workspaces}
          onSelectWorkspace={setActiveWorkspace}
          user={user}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {activeView === "home" && (
            <ReachHomeDashboard
              displayName={displayName}
              hasWorkspace={!!activeWorkspace}
            />
          )}
          {activeView === "issues" && <PlaceholderPanel title="Issues" icon="📋" />}
          {activeView === "chat" && <PlaceholderPanel title="Chat" icon="💬" />}
          {activeView === "files" && <PlaceholderPanel title="Files" icon="📁" />}
          {activeView === "prs" && <PlaceholderPanel title="Pull Requests" icon="🔀" />}
          {activeView === "docs" && <PlaceholderPanel title="Documents" icon="📄" />}
          {activeView === "meetings" && <PlaceholderPanel title="Meetings" icon="📹" />}
          {activeView === "notifications" && <PlaceholderPanel title="Notifications" icon="🔔" />}
          {activeView === "settings" && <PlaceholderPanel title="Settings" icon="⚙️" />}
        </main>
      </div>
    </div>
  );
}

function PlaceholderPanel({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-white/30">
        <span className="text-4xl block mb-3">{icon}</span>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm mt-1">Coming next</p>
      </div>
    </div>
  );
}
