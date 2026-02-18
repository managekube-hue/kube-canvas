import { UidrLayout } from "@/components/UidrLayout";
import { MessageSquare, LayoutGrid, FileText, Github, Video } from "lucide-react";

const TOOLCHAIN = [
  { icon: MessageSquare, label: "Slack", sub: "Daily comms" },
  { icon: LayoutGrid, label: "Linear", sub: "Sprint tracking" },
  { icon: FileText, label: "Notion", sub: "Documentation" },
  { icon: Github, label: "GitHub", sub: "Code & PRs" },
  { icon: Video, label: "Zoom", sub: "Standups" },
];

export default function UidrContributors() {
  return (
    <UidrLayout>
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        {/* Hero */}
        <div className="mb-16 border-b border-white/10 pb-16">
          <p className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">CONTRIBUTORS</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
            Build the future of <span className="text-blue-500">autonomous<br />security.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mt-6 max-w-xl">
            Kubric is an open-core platform built by a distributed team of security engineers, Rust developers, and AI researchers. We're looking for contributors who want to shape the next generation of detection and response.
          </p>
        </div>

        {/* Toolchain */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-white mb-6">Our Toolchain</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {TOOLCHAIN.map(tool => (
              <div key={tool.label} className="bg-[#111111] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2">
                <tool.icon size={24} className="text-blue-400" />
                <p className="text-sm font-semibold text-white">{tool.label}</p>
                <p className="text-xs text-white/40 text-center">{tool.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Apply to Contribute</h2>
          <p className="text-white/50 text-sm mb-8">We review applications weekly and reach out via email.</p>

          <form className="space-y-5" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">GitHub Profile</label>
              <input
                type="text"
                placeholder="https://github.com/janesmith"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Area of Interest</label>
              <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white/60 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="">Select an area...</option>
                <option value="rust">Rust / eBPF (CoreSec Agent)</option>
                <option value="go">Go (NetGuard, API layer)</option>
                <option value="python">Python (KAI Orchestration)</option>
                <option value="k8s">Kubernetes / Infrastructure</option>
                <option value="ml">ML / AI Personas</option>
                <option value="security">Security Research</option>
                <option value="docs">Documentation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Experience & Motivation</label>
              <textarea
                rows={5}
                placeholder="Tell us about your background and what excites you about Kubric..."
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-bold text-white mb-3">Platform</p>
            {["SOC", "NOC", "GRC", "PSA", "KAI"].map(l => (
              <p key={l} className="text-xs text-white/40 mb-1">{l}</p>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-white mb-3">Resources</p>
            {["Documentation", "Contributors", "Open source", "GitHub", "Status"].map(l => (
              <p key={l} className="text-xs text-white/40 mb-1">{l}</p>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-white mb-3">Connect</p>
            {["Slack", "Twitter", "LinkedIn", "Contact", "Security"].map(l => (
              <p key={l} className="text-xs text-white/40 mb-1">{l}</p>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-white mb-3">Legal</p>
            {["License", "Attribution", "Privacy", "Terms", "Cookies"].map(l => (
              <p key={l} className="text-xs text-white/40 mb-1">{l}</p>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/20 mt-6">© 2026 Kubric. All rights reserved.</p>
      </div>
    </UidrLayout>
  );
}
