import { useState } from "react";
import { UidrLayout } from "@/components/UidrLayout";
import { Github, MessageSquare, LayoutGrid, FileText, Calendar, CheckSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

function ContributorForm() {
  const [form, setForm] = useState({ name: "", email: "", github: "", area: "", motivation: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.from("cms_contacts").insert({
        first_name: form.name.trim(),
        email: form.email.trim(),
        website: form.github.trim() || null,
        message: form.motivation.trim() || null,
        source: "uidr-contributor",
        source_detail: form.area || "general",
      });

      supabase.functions.invoke("send-alert", {
        body: {
          type: "contributor_request",
          data: {
            name: form.name.trim(),
            email: form.email.trim(),
            github: form.github.trim() || null,
            area_of_interest: form.area || "Not specified",
            motivation: form.motivation.trim() || null,
          },
        },
      }).then(({ error }) => { if (error) console.error("Alert error:", error); });

      setSubmitted(true);
    } catch (err) {
      console.error("Contributor form error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <Send size={28} className="mx-auto mb-4" style={{ color: "hsl(24 95% 53%)" }} />
        <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
        <p className="text-white/50 text-sm">We review applications weekly and will reach out via email.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
        <input type="text" required placeholder="Jane Smith" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Email</label>
        <input type="email" required placeholder="jane@example.com" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">GitHub Profile</label>
        <input type="text" placeholder="https://github.com/janesmith" value={form.github}
          onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Area of Interest</label>
        <select value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white/60 text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none">
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
        <textarea rows={5} placeholder="Tell us about your background and what excites you about Kubric..." value={form.motivation}
          onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none" />
      </div>
      <button type="submit" disabled={submitting}
        className="w-full text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50"
        style={{ background: "hsl(24 95% 53%)" }}>
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

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

          <ContributorForm />
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
