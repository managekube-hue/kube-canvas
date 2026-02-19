import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { PathSwitcher } from "@/components/PathSwitcher";
import { ArrowRight, Terminal, BookOpen, GitBranch, Cpu, ExternalLink } from "lucide-react";

/** DO NOT TOUCH — Self-Managed Home */

const SM_ACCENT = "hsl(145,60%,45%)";

const TOOLS = [
  { icon: Terminal, label: "K-XRO Super Agent", desc: "Rust-based endpoint agent with eBPF hooks, YARA-X, and NATS JetStream publishing.", href: "/uidr/platform" },
  { icon: Cpu, label: "KAI Orchestration", desc: "13 CrewAI personas coordinated through NATS subjects and Temporal workflows.", href: "/our-tools/kubric-ai" },
  { icon: BookOpen, label: "K-DOCS Monorepo", desc: "120k+ detection assets, full library-to-module mapping from K-MAP-001 through K-MAP-020.", href: "/uidr/docs" },
  { icon: GitBranch, label: "Open Source Core", desc: "Apache 2.0 licensed. Fork it, extend it, deploy it — your infrastructure, your rules.", href: "/uidr/open-source" },
];

const PATHS_LINKS = [
  { label: "UIDR Platform Overview", href: "/uidr/platform" },
  { label: "Technical Documentation", href: "/uidr/technical-docs" },
  { label: "DR Module Library", href: "/uidr/docs" },
  { label: "Open Source Libraries", href: "/uidr/open-source" },
  { label: "Become a Contributor", href: "/uidr/contributors" },
];

export default function SelfManaged() {
  return (
    <div className="min-h-screen" style={{ background: "#080808", color: "#fff" }}>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-8 h-14 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#080808" }}
      >
        <Link to="/" className="text-[20px] font-bold tracking-tight text-white">
          Manage<span style={{ color: SM_ACCENT }}>Kube</span>
        </Link>
        <div className="flex items-center gap-6">
          <PathSwitcher />
          <Link
            to="/uidr/docs"
            className="text-[13px] font-semibold px-4 py-1.5 rounded transition-colors"
            style={{ background: SM_ACCENT, color: "#fff" }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36">
        <p
          className="text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
          style={{ color: SM_ACCENT }}
        >
          Self-Managed · Open Core · Apache 2.0
        </p>
        <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl">
          You run it.<br />
          <span style={{ color: SM_ACCENT }}>The platform gets out of your way.</span>
        </h1>
        <p className="text-xl text-white/50 leading-relaxed mb-4 max-w-2xl">
          Deploy, configure, and control every layer yourself.
        </p>
        <p className="text-lg text-white/35 leading-relaxed mb-12 max-w-2xl">
          Full access to Kubric UIDR, the K-DOCS library, and the open-core platform. 18 DR modules. One autonomous orchestration layer — from kernel-level eBPF to automated invoicing.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/uidr/docs"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white transition-all hover:opacity-90"
            style={{ background: SM_ACCENT }}
          >
            <BookOpen size={16} />
            Read the Docs
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold border transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
          >
            Book a Technical Demo <ExternalLink size={14} />
          </Link>
        </div>
      </section>

      {/* Thin separator */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* Tools grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: SM_ACCENT }}>
          What You're Getting
        </p>
        <h2 className="text-4xl font-black text-white mb-12">
          18 modules. One platform. Full control.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map(t => (
            <Link
              key={t.label}
              to={t.href}
              className="group p-6 border transition-all"
              style={{ borderColor: "rgba(255,255,255,0.07)", background: "#0f0f0f" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = SM_ACCENT}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <t.icon size={24} style={{ color: SM_ACCENT }} className="mb-4" />
              <h3 className="text-[15px] font-black text-white mb-2">{t.label}</h3>
              <p className="text-[13px] text-white/40 leading-relaxed mb-4">{t.desc}</p>
              <span className="text-[12px] font-semibold flex items-center gap-1" style={{ color: SM_ACCENT }}>
                Explore <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-wrap gap-4">
          {PATHS_LINKS.map(l => (
            <Link
              key={l.label}
              to={l.href}
              className="flex items-center gap-2 px-4 py-2 border text-[13px] font-medium text-white/60 hover:text-white hover:border-white/20 transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {l.label} <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: "18", l: "DR Modules" },
            { v: "120k+", l: "Detection Assets" },
            { v: "10G", l: "Line Rate Analysis" },
            { v: "Apache 2.0", l: "License" },
          ].map(s => (
            <div key={s.l}>
              <p className="text-3xl font-black text-white mb-1" style={{ color: s.l === "License" ? SM_ACCENT : undefined }}>{s.v}</p>
              <p className="text-[11px] text-white/35 tracking-widest uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
