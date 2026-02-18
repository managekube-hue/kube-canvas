import { useState } from "react";
import { UidrLayout } from "@/components/UidrLayout";
import { Github, MessageSquare, LayoutGrid, FileText, Video, Calendar, CheckSquare, ExternalLink, Key, Copy, Check } from "lucide-react";

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
    href: "#notion-config",
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
  const [notionKey, setNotionKey] = useState("");
  const [notionPageId] = useState("577e03ba-7700-4f59-8e4e-08e2c07bb275");
  const [keySaved, setKeySaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notionKey.trim()) return;
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  const copyPageId = () => {
    navigator.clipboard.writeText(notionPageId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                href={tool.href === "#notion-config" ? "#notion-config" : tool.href}
                target={tool.href.startsWith("http") ? "_blank" : undefined}
                rel={tool.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-[#111111] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-white/20 transition-colors group"
              >
                <tool.icon size={20} className="text-white group-hover:opacity-80 transition-opacity" />
                <p className="text-xs font-semibold text-white">{tool.label}</p>
                <p className="text-[10px] text-white/40 text-center">{tool.sub}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Notion API Configuration */}
        <div id="notion-config" className="mb-16 rounded-xl border border-white/10 bg-[#111111] p-6">
          <div className="flex items-center gap-3 mb-5">
            <Key size={16} style={{ color: "hsl(24 95% 53%)" }} />
            <h2 className="text-base font-bold text-white">Notion API Configuration</h2>
          </div>
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            Connect your Notion workspace to enable live documentation sync across all 480+ K-DOCS pages.
          </p>

          <form onSubmit={handleSaveKey} className="space-y-4">
            {/* API Key */}
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                Notion API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={notionKey}
                  onChange={e => setNotionKey(e.target.value)}
                  placeholder="secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm font-mono focus:outline-none focus:border-white/30 transition-colors pr-24"
                />
                <a
                  href="https://www.notion.so/my-integrations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors"
                >
                  Get key <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Root Page ID */}
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                Root Documentation Page ID
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white/60 text-sm font-mono">
                  {notionPageId}
                </div>
                <button
                  type="button"
                  onClick={copyPageId}
                  className="flex items-center gap-2 px-3 py-3 rounded-lg border border-white/10 bg-[#0a0a0a] text-white/40 hover:text-white transition-colors text-xs"
                >
                  {copied ? <Check size={14} style={{ color: "hsl(24 95% 53%)" }} /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-white/25 text-xs mt-1.5 font-mono">
                Syncs all 480+ child pages recursively from DOCUMENTATION root
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: keySaved ? "rgba(255,255,255,0.05)" : "hsl(24 95% 53%)",
                color: keySaved ? "hsl(24 95% 53%)" : "#ffffff",
                border: keySaved ? "1px solid hsl(24 95% 53%)" : "none",
              }}
            >
              {keySaved ? <><Check size={14} /> Saved</> : "Save Configuration"}
            </button>
          </form>
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
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-xs text-white/40 hover:text-white/70 transition-colors mb-1"
                  >
                    {link.label}
                  </a>
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
