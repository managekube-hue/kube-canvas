import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import {
  Shield, Server, Eye, BarChart3, Network, Lock,
  ArrowRight, CheckCircle2, Layers, Cpu, Globe,
  Building2, Factory, Heart, Landmark, ShoppingCart,
  Zap, Users, Clock, TrendingUp, ChevronRight,
} from "lucide-react";
import heroVideo from "@/assets/datacenter-walkthrough.mp4";
import ctaVideo from "@/assets/cta-banner.mp4";

const ORANGE = "#993619";
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO (full-bleed video + overlayed headline + JSON-LD)
   ═══════════════════════════════════════════════════════════════════════ */
const HeroBand = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
      <motion.div style={{ y }} className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ opacity: 0.35 }}>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,12,12,0.85) 0%, rgba(12,12,12,0.6) 50%, rgba(12,12,12,1) 100%)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase mb-6" style={{ color: ORANGE }}>
            Enterprise MSP &amp; MSSP Services
          </p>
        </motion.div>
        <motion.h1 {...fadeUp} transition={{ delay: 0.35 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.02] max-w-5xl mb-8"
          style={{ fontFamily: "'Special Elite', serif" }}
        >
          IT Transformation.{" "}
          <span className="block" style={{ color: ORANGE }}>Methodically Delivered.</span>
        </motion.h1>
        <motion.p {...fadeUp} transition={{ delay: 0.5 }}
          className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          We replace IT complexity with a systematic methodology — delivering validated architecture,
          continuous compliance, and measurable business outcomes across 18 detection &amp; response modules.
        </motion.p>
        <motion.div {...fadeUp} transition={{ delay: 0.65 }} className="flex flex-wrap gap-4 justify-center">
          <Link to="/get-started"
            className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-105"
            style={{ background: ORANGE, letterSpacing: "0.12em" }}
          >
            Start Your Assessment <ArrowRight className="inline ml-2" size={16} />
          </Link>
          <Link to="/how-it-works"
            className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white border border-white/15 hover:border-white/30 transition-all"
            style={{ letterSpacing: "0.12em" }}
          >
            How It Works
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 2 — STATS TICKER (light band)
   ═══════════════════════════════════════════════════════════════════════ */
const stats = [
  { value: "18", label: "Detection & Response Modules" },
  { value: "12", label: "Compliance Frameworks Mapped" },
  { value: "24/7", label: "NOC & SOC Coverage" },
  { value: "96", label: "Assessment Questions" },
];
const StatsBand = () => (
  <section style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
    <div className="container mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
            <p className="text-4xl md:text-5xl font-black mb-2" style={{ color: ORANGE, fontFamily: "'Special Elite', serif" }}>{s.value}</p>
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 3 — GATE PATHS (3-column)
   ═══════════════════════════════════════════════════════════════════════ */
const gates = [
  { id: "fully-managed", title: "Fully Managed", desc: "We operate everything. You receive outcomes. 24/7 coverage, zero tool tuning, no staffing requirements.", badge: "Most Popular", href: "/fully-managed" },
  { id: "co-managed", title: "Co-Managed", desc: "Your team participates in triage and response during business hours. We extend coverage for nights and weekends.", badge: "Best for IT Teams", href: "/co-managed" },
  { id: "self-managed", title: "Self-Managed", desc: "You operate the tools on enterprise-grade infrastructure. We provide architecture, updates, and technical support.", badge: "For Engineers", href: "/self-managed" },
];
const GatePathsBand = () => (
  <section style={{ background: "#0C0C0C" }} className="py-24 lg:py-32">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Choose Your Operating Model</p>
        <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          One Provider. <span style={{ color: ORANGE }}>Three Ways to Operate.</span>
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-[1px]" style={{ background: "rgba(255,255,255,0.06)" }}>
        {gates.map((g, i) => (
          <motion.div key={g.id} {...fadeUp} transition={{ delay: i * 0.12 }}>
            <Link to={g.href}
              className="group flex flex-col p-10 h-full transition-all duration-300 hover:bg-white/[0.03]"
              style={{ background: "#111111" }}
            >
              <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 self-start mb-6 border"
                style={{ color: ORANGE, borderColor: "rgba(153,54,25,0.2)", background: "rgba(153,54,25,0.06)" }}
              >{g.badge}</span>
              <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>{g.title}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>{g.desc}</p>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: ORANGE }}>
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 4 — MANAGED SERVICES BENTO GRID (dark band)
   ═══════════════════════════════════════════════════════════════════════ */
const services = [
  { icon: Eye, title: "Managed SOC", desc: "24/7 threat detection, SIEM, incident response", href: "/services/managed-soc" },
  { icon: Server, title: "Managed NOC", desc: "Infrastructure monitoring, alerting, remediation", href: "/services/managed-noc" },
  { icon: Lock, title: "Managed Compliance", desc: "Continuous audit-readiness across 12 frameworks", href: "/services/managed-compliance" },
  { icon: Network, title: "Managed Cloud", desc: "AWS, Azure, GCP operations & migration", href: "/services/managed-cloud" },
  { icon: Cpu, title: "Managed IT", desc: "Full-stack infrastructure management", href: "/services/managed-it" },
  { icon: Users, title: "Help Desk", desc: "Tier 1–3 user support & ticket resolution", href: "/services/help-desk" },
];
const ServicesBand = () => (
  <section style={{ background: "#0E0E0E" }} className="py-24 lg:py-32">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Managed Services</p>
        <h2 className="text-3xl md:text-5xl font-black text-white max-w-3xl" style={{ fontFamily: "'Special Elite', serif" }}>
          Enterprise-Grade Operations <span style={{ color: ORANGE }}>Without the Headcount</span>
        </h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <motion.div key={s.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
            <Link to={s.href}
              className="group flex flex-col p-8 h-full border border-white/[0.06] hover:border-white/[0.12] transition-all hover:bg-white/[0.02]"
              style={{ background: "rgba(17,17,17,0.8)" }}
            >
              <s.icon size={28} strokeWidth={1.4} className="mb-5 text-white/25 group-hover:text-white/50 transition-colors" style={{ color: ORANGE }} />
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.38)" }}>{s.desc}</p>
              <ChevronRight size={16} className="mt-4 text-white/15 group-hover:text-white/40 transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 5 — SERVICE LAYER / DETECTION & RESPONSE (alternating light)
   ═══════════════════════════════════════════════════════════════════════ */
const modules = [
  "CIO", "NPM", "MDM", "APM", "ITDR", "NDR", "CDR", "SDR", "ADR", "DDR",
  "TI", "VDR", "GRC", "CFDR", "BDR", "STRIKE", "EASM", "HONEYPOT",
];
const ServiceLayerBand = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#111111" }}>
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Service Layer</p>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
          18 Detection &amp; Response <span style={{ color: ORANGE }}>Modules</span>
        </h2>
        <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
          Each module delivers a specific detection and response capability — from identity to cloud to application.
        </p>
      </motion.div>
      <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3 mb-12">
        {modules.map((m, i) => (
          <Link key={m} to={`/service-layer/${m.toLowerCase()}`}
            className="px-5 py-3 text-xs font-bold tracking-wider uppercase border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {m}
          </Link>
        ))}
      </motion.div>
      <div className="text-center">
        <Link to="/service-layer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:underline" style={{ color: ORANGE }}>
          Explore All Modules <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 6 — SERVICE TIERS (product slider)
   ═══════════════════════════════════════════════════════════════════════ */
const tiers = [
  { name: "XRO Essentials", desc: "Foundational monitoring, alerting, and compliance. Built for SMBs entering managed services.", href: "/service-tiers/xro-essentials", accent: "rgba(153,54,25,0.7)" },
  { name: "XMX Advanced", desc: "Full detection & response stack with NOC/SOC, threat intelligence, and incident management.", href: "/service-tiers/xmx-advanced", accent: ORANGE },
  { name: "XME Enterprise", desc: "Complete enterprise coverage. Every module. Every framework. Dedicated engineering team.", href: "/service-tiers/xme-enterprise", accent: "#d4531a" },
];
const TiersBand = () => (
  <section style={{ background: "#0C0C0C" }} className="py-24 lg:py-32">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Service Tiers</p>
        <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          Right-Sized <span style={{ color: ORANGE }}>Packages</span>
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t, i) => (
          <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.12 }}>
            <Link to={t.href}
              className="group block p-10 border border-white/[0.06] hover:border-white/[0.15] transition-all relative overflow-hidden"
              style={{ background: "#111111" }}
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: t.accent }} />
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>{t.name}</h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.38)" }}>{t.desc}</p>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: ORANGE }}>
                View Tier <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 7 — COMPLIANCE FRAMEWORKS (overlay marquee)
   ═══════════════════════════════════════════════════════════════════════ */
const frameworks = [
  { name: "CMMC", href: "/compliance/cmmc" },
  { name: "HIPAA", href: "/compliance/hipaa" },
  { name: "SOC 2", href: "/compliance/soc2" },
  { name: "NIST 800-171", href: "/compliance/nist-800-171" },
  { name: "NIST 800-53", href: "/compliance/nist-800-53" },
  { name: "PCI DSS", href: "/compliance/pci-dss" },
  { name: "ISO 27001", href: "/compliance/iso-27001" },
  { name: "FedRAMP", href: "/compliance/fedramp" },
  { name: "CJIS", href: "/compliance/cjis" },
  { name: "NIST CSF", href: "/compliance/nist-csf" },
  { name: "CIS Controls", href: "/compliance/cis-controls" },
  { name: "FISMA", href: "/compliance/fisma" },
];
const ComplianceBand = () => (
  <section className="py-24 lg:py-32 relative" style={{ background: "#0E0E0E" }}>
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Compliance</p>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
          12 Frameworks. <span style={{ color: ORANGE }}>Continuous Readiness.</span>
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
          Every service module maps to the controls your auditors expect.
        </p>
      </motion.div>
      <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
        {frameworks.map(f => (
          <Link key={f.name} to={f.href}
            className="px-6 py-3 text-sm font-bold border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition-all"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {f.name}
          </Link>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Link to="/compliance" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:underline" style={{ color: ORANGE }}>
          Compliance Overview <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 8 — INDUSTRIES (icon grid)
   ═══════════════════════════════════════════════════════════════════════ */
const industries = [
  { icon: Factory, name: "Manufacturing", href: "/industries/manufacturing" },
  { icon: Heart, name: "Healthcare", href: "/industries/healthcare" },
  { icon: Landmark, name: "Public Sector", href: "/industries/public-sector" },
  { icon: BarChart3, name: "Financial Services", href: "/industries/financial-services" },
  { icon: ShoppingCart, name: "Retail", href: "/industries/retail" },
  { icon: Zap, name: "Energy & Utilities", href: "/industries/energy-utilities" },
  { icon: Globe, name: "Telecommunications", href: "/industries/telecommunications" },
  { icon: Building2, name: "Mining & Extraction", href: "/industries/mining-extraction" },
];
const IndustriesBand = () => (
  <section className="py-24 lg:py-32" style={{ background: "#111111" }}>
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Industries</p>
        <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          Purpose-Built for <span style={{ color: ORANGE }}>Your Sector</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {industries.map((ind, i) => (
          <motion.div key={ind.name} {...fadeUp} transition={{ delay: i * 0.06 }}>
            <Link to={ind.href}
              className="group flex flex-col items-center p-8 border border-white/[0.06] hover:border-white/[0.15] transition-all hover:bg-white/[0.02] text-center"
              style={{ background: "rgba(17,17,17,0.6)" }}
            >
              <ind.icon size={32} strokeWidth={1.3} className="mb-4 transition-colors" style={{ color: ORANGE }} />
              <p className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{ind.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 9 — METHODOLOGY (horizontal timeline)
   ═══════════════════════════════════════════════════════════════════════ */
const methodSteps = ["Hunt", "Identify", "Alert", "Triage", "Diagnose", "Remediate", "Document", "Close"];
const MethodologyBand = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#0C0C0C" }}>
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Our Methodology</p>
        <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          8-Step Lifecycle. <span style={{ color: ORANGE }}>Every Incident. Every Time.</span>
        </h2>
      </motion.div>
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px]" style={{ background: "rgba(153,54,25,0.25)" }} />
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {methodSteps.map((step, i) => (
            <motion.div key={step} {...fadeUp} transition={{ delay: i * 0.08 }} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2 relative z-10"
                style={{ borderColor: ORANGE, background: "#0C0C0C" }}
              >
                <span className="text-xs font-black" style={{ color: ORANGE }}>{i + 1}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/60">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <Link to="/methodology" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:underline" style={{ color: ORANGE }}>
          Deep Dive <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 10 — HOW IT WORKS / PLATFORM (video + overlay)
   ═══════════════════════════════════════════════════════════════════════ */
const PlatformBand = () => (
  <section className="relative overflow-hidden" style={{ minHeight: "500px" }}>
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.2 }}>
      <source src={ctaVideo} type="video/mp4" />
    </video>
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.7) 100%)" }} />
    <div className="relative z-10 container mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>How It Works</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6" style={{ fontFamily: "'Special Elite', serif" }}>
            Kubric UIDR + <span style={{ color: ORANGE }}>Data Graph + AI</span>
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            Our platform unifies infrastructure, detection, and response into a single operational graph.
            KubricAI enriches every alert with context. The Data Graph maps every asset, user, and event relationship in real time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/how-it-works/platform-overview" className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-105" style={{ background: ORANGE }}>
              Platform Overview
            </Link>
            <Link to="/how-it-works/kubricai" className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/50 border border-white/10 hover:text-white hover:border-white/25 transition-all">
              KubricAI
            </Link>
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
          {[
            { icon: Layers, label: "Kubric UIDR", sub: "Unified detection engine" },
            { icon: Network, label: "Data Graph", sub: "Real-time asset mapping" },
            { icon: Cpu, label: "KubricAI", sub: "Contextual enrichment" },
            { icon: Shield, label: "K-DOCS", sub: "Technical documentation" },
          ].map((item, i) => (
            <div key={item.label} className="p-6 border border-white/[0.06] hover:border-white/10 transition-all" style={{ background: "rgba(17,17,17,0.5)" }}>
              <item.icon size={24} strokeWidth={1.4} className="mb-3" style={{ color: ORANGE }} />
              <p className="text-sm font-bold text-white mb-1">{item.label}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 11 — TRUST SIGNALS / DIFFERENTIATORS
   ═══════════════════════════════════════════════════════════════════════ */
const differentiators = [
  { icon: CheckCircle2, title: "Single Pane of Glass", desc: "One dashboard. Every module. Full visibility." },
  { icon: Clock, title: "Mean Time to Detect < 15 min", desc: "Automated triage and correlation across every data source." },
  { icon: TrendingUp, title: "Continuous Compliance", desc: "Real-time control mapping across 12 frameworks — not annual audits." },
  { icon: Shield, title: "No Vendor Lock-In", desc: "Open-core architecture. Your data. Your infrastructure. Always." },
];
const TrustBand = () => (
  <section className="py-24 lg:py-32" style={{ background: "#0E0E0E" }}>
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ORANGE }}>Why ManageKube</p>
        <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          Built Different. <span style={{ color: ORANGE }}>Operates Better.</span>
        </h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {differentiators.map((d, i) => (
          <motion.div key={d.title} {...fadeUp} transition={{ delay: i * 0.1 }}
            className="p-8 border border-white/[0.06] hover:border-white/[0.12] transition-all text-center"
            style={{ background: "rgba(17,17,17,0.6)" }}
          >
            <d.icon size={32} strokeWidth={1.4} className="mx-auto mb-4" style={{ color: ORANGE }} />
            <h3 className="text-sm font-bold text-white mb-2">{d.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════════════════════════════ */
export default function UniversalHome() {
  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ManageKube",
        url: "https://managekube.com",
        logo: "https://managekube.com/logo.png",
        description: "Enterprise MSP & MSSP providing managed NOC, SOC, compliance, and cloud services with 18 detection & response modules.",
        sameAs: [],
        contactPoint: { "@type": "ContactPoint", telephone: "+1-800-MANAGEKUBE", contactType: "sales" },
        areaServed: "US",
        serviceType: ["Managed Security Services", "Managed IT Services", "Compliance Management"],
      }) }} />

      <Header />
      <HeroBand />
      <StatsBand />
      <GatePathsBand />
      <ServicesBand />
      <ServiceLayerBand />
      <TiersBand />
      <ComplianceBand />
      <IndustriesBand />
      <MethodologyBand />
      <PlatformBand />
      <TrustBand />
      <PathfinderCTA />
      <Footer />
    </div>
  );
}
