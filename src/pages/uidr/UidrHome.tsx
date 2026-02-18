import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import { Shield, Settings, FileText, Zap, Monitor } from "lucide-react";

const MODULE_GRID = [
  { id: "SOC", icon: Shield, color: "text-blue-400", active: false },
  { id: "NOC", icon: Settings, color: "text-blue-400", active: false },
  { id: "GRC", icon: FileText, color: "text-blue-400", active: false },
  { id: "PSA", icon: Monitor, color: "text-blue-400", active: false },
  { id: "KAI", icon: Zap, color: "text-blue-400", active: true },
];

const STATS = [
  { value: "100%", label: "OPEN CORE AGENT" },
  { value: "3,000+", label: "SIGMA RULES" },
  { value: "10G", label: "LINE RATE ANALYSIS" },
  { value: "70B", label: "LOCAL LLM REASONING" },
];

export default function UidrHome() {
  return (
    <UidrLayout>
      <div className="min-h-screen flex flex-col">
        {/* Hero */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-16 pb-24 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">V1.0.0-RC.1</span>
              <span className="text-white/30 text-xs">OPEN CORE · APACHE 2.0</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-8">
              <span className="text-white">Unified<br />Infrastructure</span>
              <br />
              <span className="text-blue-500">Detection &<br />Response</span>
            </h1>

            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
              One platform. Five modules. Autonomous orchestration from kernel-level eBPF to automated invoicing.
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/uidr/docs"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
              >
                Read documentation
              </Link>
              <Link
                to="/uidr/contributors"
                className="border border-white/20 text-white hover:bg-white/5 font-semibold px-6 py-3 rounded text-sm transition-colors"
              >
                Become a contributor
              </Link>
            </div>
          </div>

          {/* Right — Module Grid */}
          <div className="flex justify-center">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 w-full max-w-sm">
              <div className="grid grid-cols-3 gap-3 mb-3">
                {MODULE_GRID.slice(0, 3).map(mod => (
                  <div
                    key={mod.id}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${
                      mod.active
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-white/10 bg-[#1a1a1a]"
                    }`}
                  >
                    <mod.icon size={22} className={mod.active ? "text-blue-400" : "text-white/50"} />
                    <span className={`text-xs font-semibold tracking-widest ${mod.active ? "text-blue-400" : "text-white/60"}`}>
                      {mod.id}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {MODULE_GRID.slice(3).map(mod => (
                  <div
                    key={mod.id}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${
                      mod.active
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-white/10 bg-[#1a1a1a]"
                    }`}
                  >
                    <mod.icon size={22} className={mod.active ? "text-blue-400" : "text-white/50"} />
                    <span className={`text-xs font-semibold tracking-widest ${mod.active ? "text-blue-400" : "text-white/60"}`}>
                      {mod.id}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs tracking-widest text-white/30 uppercase">Autonomous Orchestration</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UidrLayout>
  );
}
