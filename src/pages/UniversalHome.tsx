import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { ServiceLayerConstellation } from "@/components/ServiceLayerConstellation";
import {
  Shield, Server, Eye, BarChart3, Network, Lock,
  ArrowRight, CheckCircle2, Layers, Cpu, Globe,
  Building2, Factory, Heart, Landmark, ShoppingCart,
  Zap, Users, Clock, TrendingUp, ChevronRight,
} from "lucide-react";
import heroVideo from "@/assets/datacenter-walkthrough.mp4";
import ctaVideo from "@/assets/cta-banner.mp4";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO (full-bleed video, heavy overlay for legibility)
   ═══════════════════════════════════════════════════════════════════════ */
const HeroBand = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
      <motion.div style={{ y }} className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ opacity: 0.3 }}>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(29,29,27,0.92) 0%, rgba(29,29,27,0.80) 40%, rgba(29,29,27,0.95) 100%)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase mb-6 text-primary">
            Enterprise MSP &amp; MSSP Services
          </p>
        </motion.div>
        <motion.h1 {...fadeUp} transition={{ delay: 0.35 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.02] max-w-5xl mb-8"
          style={{ fontFamily: "'Special Elite', serif" }}
        >
          IT Transformation.{" "}
          <span className="block text-primary">Methodically Delivered.</span>
        </motion.h1>
        <motion.p {...fadeUp} transition={{ delay: 0.5 }}
          className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed text-white/70"
        >
          We replace IT complexity with a systematic methodology, delivering validated architecture,
          continuous compliance, and measurable business outcomes across 18 detection and response modules.
        </motion.p>
        <motion.div {...fadeUp} transition={{ delay: 0.65 }} className="flex flex-wrap gap-4 justify-center">
          <Link to="/get-started"
            className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90"
            style={{ letterSpacing: "0.12em" }}
          >
            Start Your Assessment <ArrowRight className="inline ml-2" size={16} />
          </Link>
          <Link to="/how-it-works"
            className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-all"
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
   SECTION 2 — STATS TICKER (warm cream band)
   ═══════════════════════════════════════════════════════════════════════ */
const stats = [
  { value: "18", label: "Detection & Response Modules" },
  { value: "12", label: "Compliance Frameworks Mapped" },
  { value: "24/7", label: "NOC & SOC Coverage" },
  { value: "48hr", label: "Onboarding to First Alert" },
];
const StatsBand = () => (
  <section className="bg-secondary border-y border-border">
    <div className="container mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
            <p className="text-4xl md:text-5xl font-black mb-2 text-primary" style={{ fontFamily: "'Special Elite', serif" }}>{s.value}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 3 — GATE PATHS (3-column, warm off-white)
   ═══════════════════════════════════════════════════════════════════════ */
const gates = [
  { id: "fully-managed", title: "Fully Managed", desc: "We operate everything. You receive outcomes. 24/7 coverage, zero tool tuning, no staffing requirements.", badge: "Most Popular", href: "/fully-managed" },
  { id: "co-managed", title: "Co-Managed", desc: "Your team participates in triage and response during business hours. We extend coverage for nights and weekends.", badge: "Best for IT Teams", href: "/co-managed" },
  { id: "self-managed", title: "Self-Managed", desc: "You operate the tools on enterprise-grade infrastructure. We provide architecture, updates, and technical support.", badge: "For Engineers", href: "/self-managed" },
];
const GatePathsBand = () => (
  <section className="py-24 lg:py-32 bg-background">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Choose Your Operating Model</p>
        <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ fontFamily: "'Special Elite', serif" }}>
          One Provider. <span className="text-primary">Three Ways to Operate.</span>
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {gates.map((g, i) => (
          <motion.div key={g.id} {...fadeUp} transition={{ delay: i * 0.12 }}>
            <Link to={g.href}
              className="group flex flex-col p-10 h-full transition-all duration-300 bg-card border border-border hover:border-primary/30 hover:shadow-lg"
            >
              <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 self-start mb-6 border border-primary/20 text-primary bg-primary/5">
                {g.badge}
              </span>
              <h3 className="text-2xl font-black text-foreground mb-4" style={{ fontFamily: "'Special Elite', serif" }}>{g.title}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-8 text-muted-foreground">{g.desc}</p>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary group-hover:gap-3 transition-all">
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
   SECTION 4 — MANAGED SERVICES BENTO GRID (warm gray band)
   ═══════════════════════════════════════════════════════════════════════ */
const services = [
  { icon: Eye, title: "Managed SOC", desc: "24/7 threat detection, SIEM, incident response", href: "/services/managed-soc" },
  { icon: Server, title: "Managed NOC", desc: "Infrastructure monitoring, alerting, remediation", href: "/services/managed-noc" },
  { icon: Lock, title: "Managed Compliance", desc: "Continuous audit-readiness across 12 frameworks", href: "/services/managed-compliance" },
  { icon: Network, title: "Managed Cloud", desc: "AWS, Azure, GCP operations and migration", href: "/services/managed-cloud" },
  { icon: Cpu, title: "Managed IT", desc: "Full-stack infrastructure management", href: "/services/managed-it" },
  { icon: Users, title: "Help Desk", desc: "Tier 1 through 3 user support and ticket resolution", href: "/services/help-desk" },
];
const ServicesBand = () => (
  <section className="py-24 lg:py-32 bg-secondary">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Managed Services</p>
        <h2 className="text-3xl md:text-5xl font-black text-foreground max-w-3xl" style={{ fontFamily: "'Special Elite', serif" }}>
          Enterprise-Grade Operations <span className="text-primary">Without the Headcount</span>
        </h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <motion.div key={s.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
            <Link to={s.href}
              className="group flex flex-col p-8 h-full bg-card border border-border hover:border-primary/30 transition-all hover:shadow-md"
            >
              <s.icon size={28} strokeWidth={1.4} className="mb-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed flex-1 text-muted-foreground">{s.desc}</p>
              <ChevronRight size={16} className="mt-4 text-border group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 5 — SERVICE LAYER / DETECTION & RESPONSE (dark contrast band)
   ═══════════════════════════════════════════════════════════════════════ */
const modules = [
  "CIO", "NPM", "MDM", "APM", "ITDR", "NDR", "CDR", "SDR", "ADR", "DDR",
  "TI", "VDR", "GRC", "CFDR", "BDR", "STRIKE", "EASM", "HONEYPOT",
];
const ServiceLayerBand = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden section-dark">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Service Layer</p>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
          18 Detection &amp; Response <span className="text-primary">Modules</span>
        </h2>
        <p className="text-sm max-w-xl mx-auto text-white/50">
          Each module delivers a specific detection and response capability, from identity to cloud to application.
        </p>
      </motion.div>
      <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3 mb-12">
        {modules.map((m) => (
          <Link key={m} to={`/service-layer/${m.toLowerCase()}`}
            className="px-5 py-3 text-xs font-bold tracking-wider uppercase border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white/60 hover:text-white transition-all"
          >
            {m}
          </Link>
        ))}
      </motion.div>
      <div className="text-center">
        <Link to="/service-layer" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:underline">
          Explore All Modules <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 6 — SERVICE TIERS (warm off-white)
   ═══════════════════════════════════════════════════════════════════════ */
const tiers = [
  { name: "XRO Essentials", desc: "Foundational monitoring, alerting, and compliance. Built for SMBs entering managed services.", href: "/service-tiers/xro-essentials", accentOpacity: "70%" },
  { name: "XMX Advanced", desc: "Full detection and response stack with NOC/SOC, threat intelligence, and incident management.", href: "/service-tiers/xmx-advanced", accentOpacity: "100%" },
  { name: "XME Enterprise", desc: "Complete enterprise coverage. Every module. Every framework. Dedicated engineering team.", href: "/service-tiers/xme-enterprise", accentOpacity: "100%" },
];
const TiersBand = () => (
  <section className="py-24 lg:py-32 bg-background">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Service Tiers</p>
        <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ fontFamily: "'Special Elite', serif" }}>
          Right-Sized <span className="text-primary">Packages</span>
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t, i) => (
          <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.12 }}>
            <Link to={t.href}
              className="group block p-10 bg-card border border-border hover:border-primary/30 transition-all relative overflow-hidden hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <h3 className="text-xl font-black text-foreground mb-3" style={{ fontFamily: "'Special Elite', serif" }}>{t.name}</h3>
              <p className="text-sm leading-relaxed mb-8 text-muted-foreground">{t.desc}</p>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary group-hover:gap-3 transition-all">
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
   SECTION 7 — COMPLIANCE FRAMEWORKS (warm gray)
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
  <section className="py-24 lg:py-32 bg-secondary">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Compliance</p>
        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4" style={{ fontFamily: "'Special Elite', serif" }}>
          12 Frameworks. <span className="text-primary">Continuous Readiness.</span>
        </h2>
        <p className="text-sm max-w-lg mx-auto text-muted-foreground">
          Every service module maps to the controls your auditors expect.
        </p>
      </motion.div>
      <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
        {frameworks.map(f => (
          <Link key={f.name} to={f.href}
            className="px-6 py-3 text-sm font-bold bg-card border border-border hover:border-primary/40 hover:bg-primary/5 text-foreground transition-all"
          >
            {f.name}
          </Link>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Link to="/compliance" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:underline">
          Compliance Overview <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 8 — INDUSTRIES (off-white)
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
  <section className="py-24 lg:py-32 bg-background">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Industries</p>
        <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ fontFamily: "'Special Elite', serif" }}>
          Purpose-Built for <span className="text-primary">Your Sector</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {industries.map((ind, i) => (
          <motion.div key={ind.name} {...fadeUp} transition={{ delay: i * 0.06 }}>
            <Link to={ind.href}
              className="group flex flex-col items-center justify-center p-8 aspect-square bg-card border border-border hover:border-primary/30 transition-all hover:shadow-md text-center"
            >
              <ind.icon size={32} strokeWidth={1.3} className="mb-4 text-primary transition-colors" />
              <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{ind.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 9 — METHODOLOGY (dark contrast band)
   ═══════════════════════════════════════════════════════════════════════ */
const methodSteps = ["Hunt", "Identify", "Alert", "Triage", "Diagnose", "Remediate", "Document", "Close"];
const MethodologyBand = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden section-dark">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Our Methodology</p>
        <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          8-Step Lifecycle. <span className="text-primary">Every Incident. Every Time.</span>
        </h2>
      </motion.div>
      <div className="relative">
        <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-primary/25" />
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {methodSteps.map((step, i) => (
            <motion.div key={step} {...fadeUp} transition={{ delay: i * 0.08 }} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2 border-primary relative z-10 section-dark">
                <span className="text-xs font-black text-primary">{i + 1}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/60">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <Link to="/methodology" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:underline">
          Deep Dive <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 10 — HOW IT WORKS / PLATFORM (video overlay)
   ═══════════════════════════════════════════════════════════════════════ */
const PlatformBand = () => (
  <section className="relative overflow-hidden" style={{ minHeight: "500px" }}>
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.15 }}>
      <source src={ctaVideo} type="video/mp4" />
    </video>
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(29,29,27,0.95) 0%, rgba(29,29,27,0.80) 100%)" }} />
    <div className="relative z-10 container mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6" style={{ fontFamily: "'Special Elite', serif" }}>
            Kubric UIDR + <span className="text-primary">Data Graph + AI</span>
          </h2>
          <p className="text-sm leading-relaxed mb-8 text-white/55">
            Our platform unifies infrastructure, detection, and response into a single operational graph.
            KubricAI enriches every alert with context. The Data Graph maps every asset, user, and event relationship in real time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/how-it-works/platform-overview" className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-primary hover:bg-primary/90 transition-all hover:scale-105">
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
          ].map((item) => (
            <div key={item.label} className="p-6 border border-white/10 hover:border-white/15 transition-all" style={{ background: "rgba(29,29,27,0.7)" }}>
              <item.icon size={24} strokeWidth={1.4} className="mb-3 text-primary" />
              <p className="text-sm font-bold text-white mb-1">{item.label}</p>
              <p className="text-xs text-white/40">{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 11 — TRUST SIGNALS / DIFFERENTIATORS (warm off-white)
   ═══════════════════════════════════════════════════════════════════════ */
const differentiators = [
  { icon: CheckCircle2, title: "Single Pane of Glass", desc: "One dashboard. Every module. Full visibility." },
  { icon: Clock, title: "Mean Time to Detect < 15 min", desc: "Automated triage and correlation across every data source." },
  { icon: TrendingUp, title: "Continuous Compliance", desc: "Real-time control mapping across 12 frameworks, not annual audits." },
  { icon: Shield, title: "No Vendor Lock-In", desc: "Open-core architecture. Your data. Your infrastructure. Always." },
];
const TrustBand = () => (
  <section className="py-24 lg:py-32 bg-secondary">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-4 text-primary">Why ManageKube</p>
        <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ fontFamily: "'Special Elite', serif" }}>
          Built Different. <span className="text-primary">Operates Better.</span>
        </h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {differentiators.map((d, i) => (
          <motion.div key={d.title} {...fadeUp} transition={{ delay: i * 0.1 }}
            className="p-8 bg-card border border-border hover:border-primary/30 transition-all text-center hover:shadow-md"
          >
            <d.icon size={32} strokeWidth={1.4} className="mx-auto mb-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground mb-2">{d.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{d.desc}</p>
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
        description: "Enterprise MSP and MSSP providing managed NOC, SOC, compliance, and cloud services with 18 detection and response modules.",
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
      <ServiceLayerConstellation />
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
