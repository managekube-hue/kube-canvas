import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import {
  ArrowRight, Terminal, BookOpen, GitBranch, Cpu, Code2, Database,
  Layers, Lock, Zap, Server, Activity, Shield
} from "lucide-react";
import { motion } from "framer-motion";



/** DO NOT TOUCH: Self-Managed Home, per architecture doc page 27/23 */

// Doc: Route prefix /self-managed
// Doc: Hero → "The Platform. No Managed Layer. Full Control."
// Doc: Brand voice: Technical Capabilities + Platform Mechanics + Feature Use Cases
// Doc: Hero design: Black background. Code/terminal/topology aesthetic. Dense type. No stock photography.
// Doc: Primary CTA: "Book a Technical Demo →"  Secondary CTA: "Read the Docs →"

const ORANGE = "#993619";
const BG = "#0C0C0C";
const BG2 = "#111111";
const BG3 = "#1D1D1B";
const BORDER = "rgba(205,202,197,0.07)";
const TEXT_DIM = "rgba(205,202,197,0.45)";
const TEXT_DIMMER = "rgba(205,202,197,0.28)";

// Per architecture doc page 27: Self-Managed sub-nav
const SUB_NAV = [
  { label: "Platform Architecture", href: "/our-tools/how-kubric-works" },
  { label: "Module Catalog",          href: "/service-layer" },
  { label: "Platform Mechanics",    href: "/uidr/platform" },
  { label: "Compliance Automation", href: "/compliance" },
  { label: "K-DOCS",                href: "/uidr/docs" },
  { label: "Open Source",           href: "/uidr/open-source" },
  { label: "Book a Demo",           href: "/contact", cta: true },
];

// Per architecture doc page 27: Home page sections
// Section 1: Platform Architecture: How Kubric UIDR Orchestrates Your Environment
// Section 2: The Detection and Response Kube Catalog: 16 Modules. Each One Independently Deployable.
// Section 3: Platform Mechanics: Data Flows, APIs, and Integration Points
// Section 4: Compliance Automation at the Control Level: 100+ Frameworks. Your Team Owns the Evidence.
// Section 5: Start Building: Free Trial. Technical Demo. Or Deploy Now.

const PLATFORM_MODULES = [
  {
    icon: Server,
    label: "Kubric UIDR Platform",
    desc: "Platform internals: agent architecture, data ingestion, and correlation engine.",
    detail: "The Kubric UIDR agent-based architecture deploys across your environment, collecting telemetry at the endpoint, network, and cloud layer, normalizing it into the Kubric data model, and making it queryable via graph API and REST endpoints.",
    href: "/uidr/platform",
  },
  {
    icon: Database,
    label: "Kubric Data Graph",
    desc: "Graph data model: nodes, edges, relationships, and query interface.",
    detail: "The Kubric Data Graph represents your environment as a continuously updated property graph: assets, identities, events, vulnerabilities, and their relationships modeled as nodes and edges queryable via graph API.",
    href: "/our-tools/kubric-data-graph",
  },
  {
    icon: Cpu,
    label: "KubricAI",
    desc: "ML models, detection logic, automated response playbooks, and AI configuration.",
    detail: "KubricAI runs ML-based anomaly detection, behavioral analysis, and automated response orchestration on top of the Kubric data graph, configurable via playbook editor and exposed through the KubricAI API for custom integration.",
    href: "/our-tools/kubric-ai",
  },
  {
    icon: BookOpen,
    label: "K-DOCS Monorepo",
    desc: "120k+ detection assets. Full library-to-module mapping.",
    detail: "The complete K-DOCS detection library, from K-MAP-001 through K-MAP-020. Every playbook, every runbook, every detection rule available to your team immediately.",
    href: "/uidr/docs",
  },
  {
    icon: GitBranch,
    label: "Open Source Core",
    desc: "Apache 2.0 licensed. Fork it, extend it, deploy it.",
    detail: "Open-core architecture means your team owns the platform. Contribute upstream, fork for your environment, or deploy the reference implementation as-is.",
    href: "/uidr/open-source",
  },
  {
    icon: Code2,
    label: "API Reference",
    desc: "Complete REST API. Every endpoint. Full schema documentation.",
    detail: "Full Kubric REST API documentation covering authentication flows, all endpoints across the platform and Kube APIs, request/response schemas, rate limiting, and webhook configuration.",
    href: "/uidr/technical-docs",
  },
];

const KUBE_CATALOG = [
  { label: "CIO", desc: "Asset discovery, infrastructure orchestration, and lifecycle management APIs.", href: "/service-layer/cio" },
  { label: "NPM", desc: "Deep packet inspection, flow analysis, and AI-powered capacity forecasting APIs.", href: "/service-layer/npm" },
  { label: "MDM", desc: "Device policy engine with API-driven enrollment, compliance, and enforcement.", href: "/service-layer/mdm" },
  { label: "APM", desc: "Distributed tracing, span correlation, and application performance monitoring API.", href: "/service-layer/apm" },
  { label: "ITDR", desc: "Active Directory, Azure AD, and Okta integration with identity threat detection logic.", href: "/service-layer/itdr" },
  { label: "NDR", desc: "Deep packet inspection with PCAP export, MISP integration, and threat detection API.", href: "/service-layer/ndr" },
  { label: "CDR", desc: "Multi-cloud CSPM with AWS, Azure, and GCP APIs and continuous posture monitoring.", href: "/service-layer/cdr" },
  { label: "SDR", desc: "SBOM pipeline integration, dependency graph mapping, and supply chain risk scoring API.", href: "/service-layer/sdr" },
  { label: "ADR", desc: "WAF rule management and RASP instrumentation with application threat API.", href: "/service-layer/adr" },
  { label: "DDR", desc: "DLP policy engine, data classification API, and exfiltration detection logic.", href: "/service-layer/ddr" },
  { label: "TI", desc: "MISP, STIX/TAXII, and EPSS integration with threat intelligence operationalization API.", href: "/service-layer/ti" },
  { label: "VDR", desc: "CVSS contextualization, EPSS scoring, and asset-risk correlation API.", href: "/service-layer/vdr" },
  { label: "CFDR", desc: "IaC baseline comparison, drift detection, and automated remediation API.", href: "/service-layer/cfdr" },
  { label: "BDR", desc: "Backup orchestration with recovery verification API and compliance audit trail.", href: "/service-layer/bdr" },
  { label: "GRC", desc: "100+ compliance frameworks. Evidence collection APIs. Audit package generation.", href: "/service-layer/grc" },
];

const PLATFORM_TIERS = [
  {
    name: "XRO",
    label: "XRO: Essentials",
    sub: "9 Capabilities. Foundational detection coverage. Deployable in your environment.",
    desc: "XRO deploys 9 core capabilities for unified infrastructure visibility, network monitoring, identity threat detection, vulnerability management, configuration drift, help desk, MDM, M365 management, and portal access: all running in your environment under your control.",
    cta: "Deploy XRO →",
    href: "/service-tiers/xro-essentials",
  },
  {
    name: "XMX",
    label: "XMX: Advanced",
    sub: "16 Capabilities. Expanded detection surface. Full API access.",
    desc: "XMX deploys 16 capabilities extending coverage to managed SOC, cloud detection, application performance, backup and disaster recovery, compliance management, and real-time visibility: all integrated through the Kubric UIDR orchestration layer.",
    cta: "Deploy XMX →",
    href: "/service-tiers/xmx-advanced",
  },
  {
    name: "XME",
    label: "XME: Enterprise",
    sub: "All 23 Capabilities. Complete detection stack. Premium API access.",
    desc: "XME deploys the full capability set including software supply chain detection, data exfiltration response, STRIKE threat intelligence, EASM, Honeypot deception, FinOps governance, and dedicated vCISO advisory: complete coverage for regulated enterprises.",
    cta: "Deploy XME →",
    href: "/service-tiers/xme-enterprise",
  },
];

export default function SelfManaged() {
  return (
    <div className="min-h-screen" style={{ background: BG }}>

      {/* ── Global Header (hamburger mega-menu — same as all paths) ── */}
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/* Doc: Black background. Code/terminal/topology aesthetic. Dense type. No stock photography. */}
      <section
        className="pt-[72px]"  // offset for fixed header
        style={{ background: BG }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-28 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[10px] font-bold tracking-[0.24em] uppercase mb-6"
            style={{ color: ORANGE }}
          >
            Self-Managed · Open Core · Apache 2.0
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[2px] mb-10"
            style={{ background: ORANGE }}
          />

          {/* Doc H1: "The Platform. No Managed Layer. Full Control." */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-black text-white leading-[1.04] mb-5 max-w-4xl"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontFamily: "'Special Elite', serif" }}
          >
            The Platform.<br />
            No Managed Layer.<br />
            <span style={{ color: ORANGE }}>Full Control.</span>
          </motion.h1>

          {/* Doc H2: "Built for technical teams who evaluate platforms before they talk to vendors." */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-xl font-semibold leading-relaxed mb-4 max-w-2xl"
            style={{ color: "rgba(205,202,197,0.75)" }}
          >
            Built for technical teams who evaluate platforms before they talk to vendors.
          </motion.p>

          {/* Doc subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="text-[15px] leading-relaxed mb-12 max-w-2xl"
            style={{ color: TEXT_DIM }}
          >
            Deploy Kubric in your own environment. Configure every module. Own every data flow. Access every API. No managed services overhead. No abstraction between you and the platform.
          </motion.p>

          {/* Doc Primary CTA: "Book a Technical Demo →"  Secondary: "Read the Docs →" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
              style={{ background: ORANGE, letterSpacing: "0.1em" }}
            >
              Book a Technical Demo <ArrowRight size={14} />
            </Link>
            <Link
              to="/uidr/docs"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
              style={{ border: `1px solid ${BORDER}`, color: TEXT_DIM, letterSpacing: "0.1em" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = ORANGE;
                (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.8)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                (e.currentTarget as HTMLElement).style.color = TEXT_DIM;
              }}
            >
              Read the Docs <BookOpen size={14} />
            </Link>
          </motion.div>
        </div>
      </section>




      {/* ── STATS BAR ───────────────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: BG2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: "18", l: "DR Modules" },
              { v: "120k+", l: "Detection Assets" },
              { v: "10G", l: "Line Rate Analysis" },
              { v: "Apache 2.0", l: "License" },
            ].map(s => (
              <div key={s.l} className="flex flex-col">
                <p className="font-black mb-1" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: s.l === "License" ? ORANGE : "white", fontFamily: "'Special Elite', serif" }}>
                  {s.v}
                </p>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: TEXT_DIMMER }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 1: Platform Architecture ════════════════════════════ */}
      {/* Doc: "Platform Architecture — How Kubric UIDR Orchestrates Your Environment" */}
      <section className="py-24" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Platform Architecture</p>
          <div className="w-10 h-[2px] mb-8" style={{ background: ORANGE }} />
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
                How Kubric UIDR<br />Orchestrates Your Environment
              </h2>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: TEXT_DIM }}>
                Kubric UIDR aggregates infrastructure, identity, network, application, and cloud data into a single correlated data graph. Every module runs on top of it. Every API exposes it. Every integration feeds it.
              </p>
              <Link
                to="/uidr/technical-docs"
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider transition-all hover:gap-3"
                style={{ color: ORANGE, letterSpacing: "0.1em" }}
              >
                Read the Architecture Docs <ArrowRight size={12} />
              </Link>
            </div>
            <div>
              {/* Terminal-style code block */}
              <div className="p-6" style={{ background: "#0A0A0A", border: `1px solid ${BORDER}`, fontFamily: "'Roboto Mono', monospace" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#993619" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#464648" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#464648" }} />
                  <span className="text-[10px] ml-2" style={{ color: TEXT_DIMMER }}>kubric-uidr / orchestration</span>
                </div>
                <pre className="text-[11px] leading-relaxed overflow-x-auto" style={{ color: "rgba(205,202,197,0.6)" }}>
{`$ kubric deploy --env production \\
  --kubes cio,npm,itdr,ndr,cdr \\
  --agent-type distributed \\
  --graph-api enabled

✓ UIDR agent deployed → 47 endpoints
✓ Data graph initialized → 0ms latency
✓ Detection baseline → 120k+ rules
✓ API surface exposed → /v1/kubes/*

[KUBRIC] Orchestration layer active
[KUBRIC] All 5 Kubes operational`}
                </pre>
              </div>
            </div>
          </div>

          {/* Platform modules grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: BORDER }}>
            {PLATFORM_MODULES.map(m => (
              <Link
                key={m.label}
                to={m.href}
                className="group p-8 transition-all"
                style={{ background: BG }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BG2}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = BG}
              >
                <m.icon size={22} style={{ color: ORANGE }} className="mb-5" />
                <h3 className="text-[15px] font-black text-white mb-2 group-hover:text-[#993619] transition-colors" style={{ fontFamily: "'Special Elite', serif" }}>
                  {m.label}
                </h3>
                <p className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: TEXT_DIM }}>
                  {m.desc}
                </p>
                <p className="text-[12px] leading-relaxed mb-5" style={{ color: TEXT_DIMMER }}>
                  {m.detail}
                </p>
                <span className="text-[11px] font-bold flex items-center gap-2 uppercase tracking-wider transition-all group-hover:gap-3" style={{ color: ORANGE, letterSpacing: "0.1em" }}>
                  Explore <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: Kube Catalog ══════════════════════════════════════ */}
      {/* Doc: "The Detection and Response Kube Catalog — 16 Modules. Each One Independently Deployable." */}
      <section className="py-24" style={{ background: BG3 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Detection & Response</p>
          <div className="w-10 h-[2px] mb-8" style={{ background: ORANGE }} />
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
                The Detection and Response<br />Module Catalog
              </h2>
            </div>
            <div>
              <p className="text-[16px] font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>18 Modules. Each One Independently Deployable.</p>
              <p className="text-[14px] leading-relaxed" style={{ color: TEXT_DIM }}>
                Every module is a self-contained detection engine with its own data ingestion pipeline, detection logic, response playbooks, and API surface. They run independently and orchestrate through Kubric UIDR.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: BORDER }}>
            {KUBE_CATALOG.map(k => (
              <Link
                key={k.label}
                to={k.href}
                className="group p-6 transition-all flex flex-col"
                style={{ background: BG3 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#232321"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = BG3}
              >
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3 group-hover:text-[#993619] transition-colors" style={{ color: ORANGE }}>
                  {k.label}
                </p>
                <p className="text-[12px] leading-relaxed flex-1" style={{ color: TEXT_DIMMER }}>
                  {k.desc}
                </p>
                <span className="mt-4 text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider" style={{ color: ORANGE }}>
                  View Docs <ArrowRight size={10} />
                </span>
              </Link>
            ))}
            {/* View all */}
            <Link
              to="/service-layer"
              className="group p-6 flex flex-col items-center justify-center text-center transition-all"
              style={{ background: "#0A0A0A" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BG3}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#0A0A0A"}
            >
              <Layers size={24} style={{ color: ORANGE }} className="mb-3" />
              <p className="text-[14px] font-black text-white mb-1" style={{ fontFamily: "'Special Elite', serif" }}>View All Modules</p>
              <p className="text-[11px] mb-4" style={{ color: TEXT_DIMMER }}>Full catalog with API reference</p>
              <ArrowRight size={16} style={{ color: ORANGE }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: Platform Bundles ══════════════════════════════════ */}
      {/* Doc: "Platform Bundles as Your Starting Configuration" */}
      <section className="py-24" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Platform Bundles</p>
          <div className="w-10 h-[2px] mb-8" style={{ background: ORANGE }} />
          <h2 className="font-black text-white mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
            Pre-configured module sets matched to environment size.<br />Fully customizable from day one.
          </h2>
          <p className="text-[15px] leading-relaxed mb-16 max-w-3xl" style={{ color: TEXT_DIM }}>
            XRO, XMM, and XME are deployment starting points — each one a proven module configuration your team deploys, then expands by adding modules as your detection and response requirements grow.
          </p>

          <div className="grid lg:grid-cols-3 gap-[1px]" style={{ background: BORDER }}>
            {PLATFORM_TIERS.map((tier, i) => (
              <div key={tier.name} className="p-10" style={{ background: i === 1 ? BG3 : BG }}>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>
                  {tier.name}
                </p>
                <h3 className="text-[18px] font-black text-white mb-3 leading-tight" style={{ fontFamily: "'Special Elite', serif" }}>
                  {tier.label}
                </h3>
                <p className="text-[12px] font-bold mb-4 uppercase tracking-wide" style={{ color: TEXT_DIM }}>
                  {tier.sub}
                </p>
                <p className="text-[13px] leading-relaxed mb-10" style={{ color: TEXT_DIMMER }}>
                  {tier.desc}
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    to={tier.href}
                    className="inline-flex items-center gap-2 px-6 py-3 font-bold text-[11px] uppercase tracking-wider text-white transition-all hover:opacity-90"
                    style={{ background: ORANGE, letterSpacing: "0.1em" }}
                  >
                    {tier.cta}
                  </Link>
                  <Link
                    to={tier.href}
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-[11px] uppercase tracking-wider transition-all"
                    style={{ border: `1px solid ${BORDER}`, color: TEXT_DIM, letterSpacing: "0.1em" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = ORANGE}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
                  >
                    View Technical Specs →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: Compliance Automation ════════════════════════════ */}
      {/* Doc: "Compliance Automation at the Control Level — 100+ Frameworks. Your Team Owns the Evidence." */}
      <section className="py-24" style={{ background: BG3 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Compliance Automation</p>
              <div className="w-10 h-[2px] mb-8" style={{ background: ORANGE }} />
              <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
                Compliance Automation<br />at the Control Level
              </h2>
              <p className="text-[18px] font-black text-white mb-5" style={{ fontFamily: "'Special Elite', serif" }}>
                100+ Frameworks. Your Team Owns the Evidence.
              </p>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: TEXT_DIM }}>
                The GRC module maps your environment against 100+ frameworks. Your team owns the evidence collection logic. Configure evidence collection rules, set control verification schedules, and export audit packages via API — the GRC module gives your team programmatic access to your entire compliance posture.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/service-layer/grc" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: ORANGE, letterSpacing: "0.1em" }}>
                  View GRC API <ArrowRight size={11} />
                </Link>
                <span style={{ color: TEXT_DIMMER }}>·</span>
                <Link to="/service-layer/grc" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: TEXT_DIM, letterSpacing: "0.1em" }}>
                  Deploy GRC Module <ArrowRight size={11} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[1px]" style={{ background: BORDER }}>
              {["CMMC", "CJIS", "NIST 800-171", "NIST 800-53", "HIPAA", "SOC 2", "ISO 27001", "PCI-DSS"].map(f => (
                <div key={f} className="p-5" style={{ background: BG3 }}>
                  <div className="w-1.5 h-1.5 rounded-full mb-3" style={{ background: ORANGE }} />
                  <p className="text-[12px] font-bold text-white">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: Start Building ════════════════════════════════════ */}
      {/* Doc: "Start Building — Free Trial. Technical Demo. Or Deploy Now." */}
      <section className="py-24" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Start Building</p>
            <div className="w-10 h-[2px] mb-8" style={{ background: ORANGE }} />
            <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
              Free Trial. Technical Demo.<br />Or Deploy Now.
            </h2>
            <p className="text-[15px] leading-relaxed mb-12" style={{ color: TEXT_DIM }}>
              Optional professional services for self-managed teams — deployment engineering, integration development, and security advisory available on a project basis when your team wants outside expertise on a specific challenge.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                style={{ background: ORANGE, letterSpacing: "0.1em" }}
              >
                Book a Technical Demo <ArrowRight size={14} />
              </Link>
              <Link
                to="/uidr/docs"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
                style={{ border: `1px solid ${BORDER}`, color: TEXT_DIM, letterSpacing: "0.1em" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = ORANGE;
                  (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.8)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                  (e.currentTarget as HTMLElement).style.color = TEXT_DIM;
                }}
              >
                Read the Docs <BookOpen size={14} />
              </Link>
              <Link
                to="/uidr/technical-docs"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
                style={{ border: `1px solid ${BORDER}`, color: TEXT_DIM, letterSpacing: "0.1em" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = ORANGE;
                  (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.8)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                  (e.currentTarget as HTMLElement).style.color = TEXT_DIM;
                }}
              >
                View API Reference <Code2 size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PathfinderCTA />
      <Footer />
    </div>
  );
}
/** END DO NOT TOUCH */

