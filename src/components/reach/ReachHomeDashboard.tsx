import { Bug, MessageSquare, GitCommitHorizontal, Video, ArrowRight, Plug } from "lucide-react";

interface Props {
  displayName: string;
  hasWorkspace: boolean;
}

export function ReachHomeDashboard({ displayName, hasWorkspace }: Props) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Greeting */}
      <h1 className="text-2xl font-semibold text-white mb-1">
        {greeting}, {displayName}
      </h1>
      <p className="text-sm text-white/40 mb-8">Here's what's happening across your workspace.</p>

      {/* Connect banner if no workspace */}
      {!hasWorkspace && (
        <div className="mb-8 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plug size={18} className="text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">Connect a repository</p>
              <p className="text-xs text-white/40">Link a GitHub repo to see your issues, commits, and PRs.</p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors">
            Connect Repo
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard icon={Bug} label="My Open Issues" value="—" color="text-orange-400" bg="bg-orange-500/10" />
        <StatCard icon={MessageSquare} label="Unread Messages" value="—" color="text-blue-400" bg="bg-blue-500/10" />
        <StatCard icon={GitCommitHorizontal} label="Commits Today" value="—" color="text-green-400" bg="bg-green-500/10" />
        <StatCard icon={Video} label="Upcoming Meetings" value="—" color="text-purple-400" bg="bg-purple-500/10" />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* My Assignments */}
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/70">My Assignments</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <EmptyState message="No assignments yet" />
        </div>

        {/* Upcoming Meetings */}
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/70">Upcoming Meetings</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <EmptyState message="No upcoming meetings" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold text-white/70 mb-4">Recent Activity</h2>
        <EmptyState message="No recent activity" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }: {
  icon: typeof Bug;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 flex items-start gap-3">
      <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={16} className={color} />
      </div>
      <div>
        <p className="text-xl font-semibold text-white">{value}</p>
        <p className="text-xs text-white/40 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-8 text-center">
      <p className="text-sm text-white/20">{message}</p>
    </div>
  );
}
