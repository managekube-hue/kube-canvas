import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { PathSwitcher } from "@/components/PathSwitcher";
import { ArrowRight, Terminal, BookOpen, GitBranch, Cpu, ExternalLink, Code2, Database } from "lucide-react";
import { motion } from "framer-motion";

/** DO NOT TOUCH — Self-Managed Home — ManageKube/Kubric #993619/#1D1D1B design system */

// Self-Managed sub-nav per architecture doc
const SUB_NAV = [
  { label: "UIDR Platform", href: "/uidr/platform" },
  { label: "Technical Docs", href: "/uidr/technical-docs" },
  { label: "DR Module Library", href: "/uidr/docs" },
  { label: "Open Source", href: "/uidr/open-source" },
  { label: "Contributors", href: "/uidr/contributors" },
  { label: "Contact", href: "/uidr/contact" },
  { label: "Get Started", href: "/uidr/docs", cta: true },
];

const TOOLS = [
  { icon: Terminal, label: "K-XRO Super Agent", desc: "Rust-based endpoint agent with eBPF hooks, YARA-X, and NATS JetStream publishing.", href: "/uidr/platform" },
  { icon: Cpu, label: "KAI Orchestration", desc: "13 CrewAI personas coordinated through NATS subjects and Temporal workflows.", href: "/our-tools/kubric-ai" },
  { icon: BookOpen, label: "K-DOCS Monorepo", desc: "120k+ detection assets, full library-to-module mapping from K-MAP-001 through K-MAP-020.", href: "/uidr/docs" },
  { icon: GitBranch, label: "Open Source Core", desc: "Apache 2.0 licensed. Fork it, extend it, deploy it — your infrastructure, your rules.", href: "/uidr/open-source" },
  { icon: Database, label: "Kubric Data Graph", desc: "Real-time relationship mapping across infrastructure, identities, and security events.", href: "/our-tools/kubric-data-graph" },
  { icon: Code2, label: "Technical Docs", desc: "Full API reference, deployment guides, and architecture documentation.", href: "/uidr/technical-docs" },
];

// Kubric Self-Managed design tokens (from PDF spec)
const SM = {
  bg: "#0C0C0C",
  bg2: "#1D1D1B",
  bg3: "#393837",
  accent: "#993619",       // #993619 per spec — NOT green
  border: "rgba(205,202,197,0.08)",
  divider: "#CDCAC5",
  text: "#FFFCF7",
  body: "#393837",
  support: "#5A5A5B",
};

export default function SelfManaged() {
  return (
    <div className="min-h-screen" style={{ background: SM.bg }}>

      {/* === SELF-MANAGED NAV (standalone — no global header) === */}
      <nav
        className="flex items-center justify-between px-8 lg:px-16 h-14"
        style={{ borderBottom: `1px solid ${SM.border}`, background: SM.bg }}
      >
        <Link to="/" className="text-[20px] font-bold tracking-tight text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          Manage<span style={{ color: SM.accent }}>Kube</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/uidr/docs"
            className="text-[13px] font-bold px-5 py-2 text-white transition-all hover:opacity-90"
            style={{ background: SM.accent, letterSpacing: "0.08em" }}
          >
            Read the Docs
          </Link>
        </div>
      </nav>

      {/* === PATH SUB-NAV === */}
      <div className="sticky top-0 z-40" style={{ background: SM.bg2, borderBottom: `1px solid ${SM.border}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <div className="flex-shrink-0 pr-4 mr-2" style={{ borderRight: `1px solid ${SM.border}` }}>
              <PathSwitcher />
            </div>
            {SUB_NAV.map(item => (
              item.cta ? (
                <Link key={item.label} to={item.href}
                  className="flex-shrink-0 ml-auto px-5 py-3.5 text-[12px] font-bold uppercase tracking-widest text-white"
                  style={{ background: SM.accent, letterSpacing: "0.12em" }}
                >
                  {item.label}
                </Link>
              ) : (
                <Link key={item.label} to={item.href}
                  className="flex-shrink-0 px-4 py-3.5 text-[12px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                  style={{ color: "rgba(205,202,197,0.45)", letterSpacing: "0.1em" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SM.accent}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.45)"}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      {/* === HERO === */}
      <section
        className="max-w-7xl mx-auto px-6 lg:px-16 py-32 lg:py-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[11px] font-bold tracking-[0.22em] uppercase mb-6"
          style={{ color: SM.accent }}
        >
          Self-Managed · Open Core · Apache 2.0
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[2px] mb-10"
          style={{ background: SM.accent }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-black text-white leading-[1.05] mb-6 max-w-4xl"
          style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontFamily: "'Special Elite', serif" }}
        >
          You run it.<br />
          <span style={{ color: SM.accent }}>The platform gets out of your way.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xl leading-relaxed mb-4 max-w-2xl"
          style={{ color: "rgba(205,202,197,0.7)" }}
        >
          Deploy, configure, and control every layer yourself.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-lg leading-relaxed mb-12 max-w-2xl"
          style={{ color: "rgba(205,202,197,0.4)" }}
        >
          Full access to Kubric UIDR, the K-DOCS library, and the open-core platform. 18 DR modules. One autonomous orchestration layer — from kernel-level eBPF to automated invoicing.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/uidr/docs"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
            style={{ background: SM.accent, letterSpacing: "0.1em" }}
          >
            <BookOpen size={16} />
            Read the Docs
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
            style={{ border: `1px solid ${SM.border}`, color: "rgba(205,202,197,0.6)", letterSpacing: "0.1em" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = SM.accent}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = SM.border}
          >
            Book a Technical Demo <ExternalLink size={14} />
          </Link>
        </motion.div>
      </section>

      {/* === SEPARATOR === */}
      <div style={{ borderTop: `1px solid ${SM.border}` }} />

      {/* === TOOLS GRID === */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-24">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: SM.accent }}>What You're Getting</p>
        <div className="w-10 h-[2px] mb-8" style={{ background: SM.accent }} />
        <h2
          className="font-black text-white mb-16"
          style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "'Special Elite', serif" }}
        >
          18 modules. One platform. Full control.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: SM.border }}>
          {TOOLS.map(t => (
            <Link
              key={t.label}
              to={t.href}
              className="group p-8 transition-all"
              style={{ background: SM.bg }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SM.bg2}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = SM.bg}
            >
              <t.icon size={24} style={{ color: SM.accent }} className="mb-5" />
              <h3
                className="text-[16px] font-black text-white mb-2 group-hover:text-[#993619] transition-colors"
                style={{ fontFamily: "'Special Elite', serif" }}
              >
                {t.label}
              </h3>
              <p className="text-[13px] leading-relaxed mb-5" style={{ color: "rgba(205,202,197,0.4)" }}>{t.desc}</p>
              <span className="text-[12px] font-bold flex items-center gap-2 uppercase tracking-wider" style={{ color: SM.accent, letterSpacing: "0.1em" }}>
                Explore <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* === STATS === */}
      <div style={{ borderTop: `1px solid ${SM.border}` }} />
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { v: "18", l: "DR Modules" },
            { v: "120k+", l: "Detection Assets" },
            { v: "10G", l: "Line Rate Analysis" },
            { v: "Apache 2.0", l: "License" },
          ].map(s => (
            <div key={s.l}>
              <p
                className="font-black mb-2"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  color: s.l === "License" ? SM.accent : "white",
                  fontFamily: "'Special Elite', serif"
                }}
              >
                {s.v}
              </p>
              <p className="text-[11px] tracking-widest uppercase" style={{ color: SM.support }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
/** END DO NOT TOUCH */
