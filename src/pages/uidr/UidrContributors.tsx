import { UidrLayout } from "@/components/UidrLayout";
import { Github, MessageSquare, LayoutGrid, FileText, Calendar, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

const TOOLCHAIN = [
  {
    icon: Github,
    label: "GitHub",
    sub: "Code & PRs",
    href: "https://github.com/managekube-hue/Kubric-UiDR",
  },
  {
    icon: LayoutGrid,
    label: "Linear",
    sub: "Sprint tracking",
    href: "https://linear.app/kubric-uidr/team/KUB/all",
  },
  {
    icon: Calendar,
    label: "Reclaim",
    sub: "Book time",
    href: "https://app.reclaim.ai/m/managekube/kubrick-udir",
  },
  {
    icon: MessageSquare,
    label: "Slack",
    sub: "Daily comms",
    href: "https://join.slack.com/t/kubricuidr/shared_invite/zt-3pdt8jjr5-S9De6l8OdLwbDnMc4sCeLA",
  },
  {
    icon: CheckSquare,
    label: "ClickUp",
    sub: "Task management",
    href: "https://app.clickup.com/9017861673/v/li/901710896918",
  },
  {
    icon: FileText,
    label: "Notion",
    sub: "Documentation",
    href: "https://notion.so",
  },
];

const FOOTER_LINKS = {
  Platform: [
    { label: "SOC", href: "/uidr/docs/mdr" },
    { label: "NOC", href: "/uidr/docs/npm" },
    { label: "GRC", href: "/uidr/docs/grc" },
    { label: "PSA", href: "/uidr/docs/psa" },
    { label: "KAI", href: "/uidr/platform" },
  ],
  Resources: [
    { label: "Documentation", href: "/uidr/docs" },
    { label: "Contributors", href: "/uidr/contributors" },
    { label: "Open Source", href: "/uidr/open-source" },
    { label: "GitHub", href: "https://github.com/managekube-hue/Kubric-UiDR", external: true },
    { label: "Linear", href: "https://linear.app/kubric-uidr/team/KUB/all", external: true },
  ],
  Connect: [
    { label: "Slack", href: "https://join.slack.com/t/kubricuidr/shared_invite/zt-3pdt8jjr5-S9De6l8OdLwbDnMc4sCeLA", external: true },
    { label: "ClickUp", href: "https://app.clickup.com/9017861673/v/li/901710896918", external: true },
    { label: "Book Time", href: "https://app.reclaim.ai/m/managekube/kubrick-udir", external: true },
    { label: "Contact", href: "/uidr/contact" },
  ],
  Legal: [
    { label: "License", href: "/uidr/open-source" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export default function UidrContributors() {
  return (
    <UidrLayout>
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">

        {/* Hero */}
        <div className="mb-16 border-b border-white/10 pb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "hsl(24 95% 53%)" }}>CONTRIBUTORS</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
            Build the future of{" "}
            <span style={{ color: "hsl(24 95% 53%)" }}>autonomous<br />security.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mt-6 max-w-xl">
            Kubric is an open-core platform built by a distributed team of security engineers, Rust developers, and AI researchers. We're looking for contributors who want to shape the next generation of detection and response.
          </p>
        </div>

        {/* Toolchain */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-white mb-6">Our Toolchain</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {TOOLCHAIN.map(tool => (
              <a
                key={tool.label}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111111] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-white/20 transition-colors group"
              >
                <tool.icon size={20} className="text-white group-hover:opacity-80 transition-opacity" />
                <p className="text-xs font-semibold text-white">{tool.label}</p>
                <p className="text-[10px] text-white/40 text-center">{tool.sub}</p>
              </a>
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
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">GitHub Profile</label>
              <input
                type="text"
                placeholder="https://github.com/janesmith"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Area of Interest</label>
              <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white/60 text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none">
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
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white font-semibold py-3 rounded-lg transition-colors text-sm"
              style={{ background: "hsl(24 95% 53%)" }}
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 grid grid-cols-4 gap-6">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-bold text-white mb-3">{section}</p>
              {links.map(link => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-white/40 hover:text-white/70 transition-colors mb-1"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-xs text-white/40 hover:text-white/70 transition-colors mb-1"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-white/20 mt-6">© 2026 Kubric. All rights reserved.</p>
      </div>
    </UidrLayout>
  );
}
