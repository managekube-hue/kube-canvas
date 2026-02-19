import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathSwitcher } from "@/components/PathSwitcher";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import {
  ArrowRight, Shield, Layers, Users, BookOpen, CheckCircle,
  HeadphonesIcon, BarChart3, Server, Cpu, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import childPageVideo from "@/assets/child-page.mp4";

/** DO NOT TOUCH — Co-Managed Home — per architecture doc page 18/15 */

// Doc: Route prefix: /co-managed
// Doc: Brand voice: Outcome + Technical Capabilities + Differentiation
// Doc: Hero design: Dark background. Technical topology/grid aesthetic. Dense type.
// Doc: Primary CTA: "Build My Stack →"   Secondary CTA: "See How Kubric Works →"
// Doc: H1: "Your Team Runs It. Kubric Powers It."
// Doc: H2: "Built for internal IT and security teams that want platform depth without managed services overhead."

// Co-Managed design tokens per PDF spec
const CM = {
  bg:     "#1D1D1D",
  bg2:    "#254543",   // teal dark background per spec
  bg3:    "#3A2111",
  accent: "#BC4A17",   // per Co-Managed palette in PDF
  accent2:"#813510",
  border: "rgba(205,202,197,0.08)",
  divider:"#CDCAC5",
  text:   "#FFFCF8",
  body:   "#615C58",
  orange: "#BC4A17",
};

// Doc page 18: Sub-nav for co-managed
const SUB_NAV = [
  { label: "Our Tools",       href: "/our-tools" },
  { label: "Kube Catalog",    href: "/kubes" },
  { label: "Escalation",      href: "/services/managed-soc" },
  { label: "Platform Tiers",  href: "/products" },
  { label: "Compliance",      href: "/compliance/cmmc" },
  { label: "Solutions",       href: "/solutions/hub" },
  { label: "Pricing",         href: "/pricing" },
  { label: "Build My Stack",  href: "/assessment", cta: true },
];

// Doc page 18: Section 1 — What Your Team Controls
const PLATFORM_CONTROLS = [
  { icon: Layers, label: "Kubric UIDR Platform", desc: "The orchestration engine your team deploys, configures, and operates.", href: "/our-tools/how-kubric-works" },
  { icon: Cpu, label: "KubricAI", desc: "AI your team configures. Automation your team controls.", href: "/our-tools/kubric-ai" },
  { icon: BookOpen, label: "K-DOCS Playbooks", desc: "120k+ detection assets. Full runbooks available to your team immediately.", href: "/uidr/docs" },
  { icon: Server, label: "Data Graph", desc: "Real-time relationship mapping your analysts query.", href: "/our-tools/kubric-data-graph" },
];

// Doc page 18/20: Section 2 — The Kubes Your Team Deploys
const KUBES = [
  { label: "CIO KUBE", desc: "Infrastructure orchestration your team manages. Outcomes your organization measures.", href: "/kubes/cio-kube" },
  { label: "NPM KUBE", desc: "Your team gets network visibility. AI-powered forecasting included.", href: "/kubes/npm-kube" },
  { label: "ITDR KUBE", desc: "Your SOC team detects identity threats. Before they escalate.", href: "/kubes/itdr-kube" },
  { label: "NDR KUBE", desc: "Deep packet inspection your team configures. Threats your team stops.", href: "/kubes/ndr-kube" },
  { label: "CDR KUBE", desc: "Multi-cloud security posture your team manages across AWS, Azure, and GCP.", href: "/kubes/cdr-kube" },
  { label: "GRC KUBE", desc: "The GRC KUBE maps your environment against 100+ frameworks. Your team owns the controls.", href: "/kubes/grc-kube" },
];

// Doc page 24: Section 3 — Where We Back You Up (Escalation)
const ESCALATION = [
  { icon: HeadphonesIcon, label: "Managed SOC — On-Demand Escalation", desc: "Surge capacity when your team needs reinforcement — activated when you need additional capacity for major incidents, threat hunts, or coverage gaps.", href: "/services/managed-soc" },
  { icon: Shield, label: "Advisory Services", desc: "Expert guidance when your environment needs more than your team. Schedule with our team on demand.", href: "/services/security-assessments" },
  { icon: BarChart3, label: "Deployment & Integration", desc: "Deployment engineering when your team wants outside expertise on a specific integration challenge.", href: "/services/custom-automation" },
];

// Doc page 24: Section 4 — What Teams Like Yours Are Running
const OUTCOMES = [
  "Your team stays in control of day-to-day detection and response operations",
  "Kubric UIDR handles orchestration, alerting, correlation, and enrichment",
  "Escalate to our SOC engineers only when your team needs reinforcement",
  "Access to every Kube module your contract includes — deploy what you need",
  "Shared reporting with your leadership and ours — transparent, always",
];

export default function CoManaged() {
  return (
    <div className="min-h-screen" style={{ background: CM.bg }}>

      {/* ── Global Header (hamburger mega-menu — same as all paths) ── */}
      <Header />

      {/* ── HERO WITH VIDEO (same pattern as Fully Managed) ─────────── */}
      <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden" style={{ background: "#0C0C0C" }}>
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          >
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,12,12,0.97) 35%, rgba(12,12,12,0.75) 65%, rgba(12,12,12,0.3) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,12,12,1) 0%, transparent 40%, rgba(12,12,12,0.4) 100%)" }} />
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[10px] font-bold tracking-[0.22em] uppercase mb-6"
              style={{ color: CM.accent }}
            >
              Co-Managed
            </motion.p>

            {/* Orange accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-[2px] mb-8"
              style={{ background: CM.accent }}
            />

            {/* Doc H1: "Your Team Runs It. Kubric Powers It." */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-black text-white leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontFamily: "'Special Elite', serif" }}
            >
              Your Team Runs It.<br />
              <span style={{ color: CM.accent }}>Kubric Powers It.</span>
            </motion.h1>

            {/* Doc H2 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl leading-relaxed mb-3"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Built for internal IT and security teams that want platform depth without managed services overhead.
            </motion.p>

            {/* Doc subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="text-[15px] leading-relaxed mb-12"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Stop stitching tools together. The Kubric platform gives your team unified detection, response, and operations coverage — with our engineers on standby when escalation matters.
            </motion.p>

            {/* Doc Primary CTA: "Build My Stack →"   Secondary: "See How Kubric Works →" */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                style={{ background: CM.accent, letterSpacing: "0.1em" }}
              >
                Build My Stack <ArrowRight size={14} />
              </Link>
              <Link
                to="/our-tools/how-kubric-works"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all"
                style={{
                  border: "1px solid rgba(205,202,197,0.2)",
                  color: "rgba(205,202,197,0.65)",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = CM.accent}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.2)"}
              >
                See How Kubric Works
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade to sub-nav */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10" style={{ background: "linear-gradient(to top, #0C0C0C, transparent)" }} />
      </section>

      {/* ── PATH SUB-NAVIGATION (below hero, sticky) ─────────────────── */}
      {/* Doc: "Location: Below hero. Sticky. Path switcher left side." */}
      <div className="sticky top-0 z-40" style={{ background: CM.bg, borderBottom: `1px solid ${CM.border}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {/* Path switcher — left side */}
            <div className="flex-shrink-0 pr-4 mr-1" style={{ borderRight: `1px solid ${CM.border}` }}>
              <PathSwitcher />
            </div>

            {SUB_NAV.map(item =>
              item.cta ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex-shrink-0 ml-auto px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap"
                  style={{ background: CM.accent, letterSpacing: "0.12em" }}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex-shrink-0 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors"
                  style={{ color: "rgba(205,202,197,0.45)", letterSpacing: "0.1em" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CM.accent}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.45)"}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* ══ SECTION 1: What Your Team Controls ══════════════════════════ */}
      {/* Doc page 18: Section 1 — What Your Team Controls */}
      <section className="py-24" style={{ background: CM.bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: CM.accent }}>Section 1</p>
          <div className="w-10 h-[2px] mb-8" style={{ background: CM.accent }} />
          <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
            What Your Team Controls
          </h2>
          <p className="text-[15px] leading-relaxed mb-16 max-w-2xl" style={{ color: "rgba(205,202,197,0.5)" }}>
            The Kubric platform gives your team unified detection, response, and operations coverage — with our engineers on standby when escalation matters.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: CM.border }}>
            {PLATFORM_CONTROLS.map(p => (
              <Link
                key={p.label}
                to={p.href}
                className="group p-8 transition-all"
                style={{ background: CM.bg }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#252523"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = CM.bg}
              >
                <p.icon size={22} style={{ color: CM.accent }} className="mb-5" />
                <h3 className="text-[15px] font-black text-white mb-2 group-hover:text-[#BC4A17] transition-colors" style={{ fontFamily: "'Special Elite', serif" }}>
                  {p.label}
                </h3>
                <p className="text-[12px] leading-relaxed mb-5" style={{ color: "rgba(205,202,197,0.4)" }}>{p.desc}</p>
                <span className="text-[11px] font-bold flex items-center gap-1 uppercase tracking-wider transition-all group-hover:gap-2" style={{ color: CM.accent, letterSpacing: "0.1em" }}>
                  Explore <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: The Kubes Your Team Deploys ══════════════════════ */}
      {/* Doc page 18: Section 2 — The Kubes Your Team Deploys */}
      <section className="py-24" style={{ background: "#141414" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: CM.accent }}>Section 2</p>
          <div className="w-10 h-[2px] mb-8" style={{ background: CM.accent }} />
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
                The Kubes Your Team Deploys
              </h2>
            </div>
            <div>
              <p className="text-[15px] font-black text-white mb-3" style={{ fontFamily: "'Special Elite', serif" }}>
                16 independent detection and response modules. Pick the coverage your environment requires.
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(205,202,197,0.45)" }}>
                Every Kube integrates into your existing toolchain. Your team configures them. Kubric orchestrates them. You own the detection logic, the response playbooks, and the outcomes.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: CM.border }}>
            {KUBES.map(k => (
              <Link
                key={k.label}
                to={k.href}
                className="group p-8 transition-all"
                style={{ background: "#141414" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = CM.bg}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#141414"}
              >
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 group-hover:text-[#BC4A17] transition-colors" style={{ color: CM.accent }}>
                  {k.label}
                </p>
                <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(205,202,197,0.4)" }}>{k.desc}</p>
                <span className="text-[11px] font-bold flex items-center gap-1 uppercase tracking-wider transition-all group-hover:gap-2" style={{ color: CM.accent, letterSpacing: "0.1em" }}>
                  Add to My Stack <ArrowRight size={11} />
                </span>
              </Link>
            ))}
            <Link
              to="/kubes"
              className="group p-8 flex flex-col items-center justify-center text-center transition-all"
              style={{ background: "#0C0C0C" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#141414"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#0C0C0C"}
            >
              <Layers size={24} style={{ color: CM.accent }} className="mb-3" />
              <p className="text-[14px] font-black text-white mb-1" style={{ fontFamily: "'Special Elite', serif" }}>View Full Catalog</p>
              <p className="text-[11px] mb-4" style={{ color: "rgba(205,202,197,0.3)" }}>All 16 modules</p>
              <ArrowRight size={16} style={{ color: CM.accent }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: Where We Back You Up ═════════════════════════════ */}
      {/* Doc page 18/24: Section 3 — Where We Back You Up */}
      <section className="py-24" style={{ background: CM.bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: CM.accent }}>Section 3</p>
          <div className="w-10 h-[2px] mb-8" style={{ background: CM.accent }} />
          <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
            Where We Back You Up
          </h2>
          <p className="text-[15px] leading-relaxed mb-16 max-w-2xl" style={{ color: "rgba(205,202,197,0.5)" }}>
            On-demand escalation, expert advisory, and deployment support from the engineers who built the platform. Co-managed means your team runs it — but you're never alone.
          </p>

          <div className="grid lg:grid-cols-3 gap-[1px]" style={{ background: CM.border }}>
            {ESCALATION.map(e => (
              <Link
                key={e.label}
                to={e.href}
                className="group p-10 transition-all"
                style={{ background: CM.bg }}
                onMouseEnter={el => (el.currentTarget as HTMLElement).style.background = "#252523"}
                onMouseLeave={el => (el.currentTarget as HTMLElement).style.background = CM.bg}
              >
                <e.icon size={24} style={{ color: CM.accent }} className="mb-6" />
                <h3 className="text-[17px] font-black text-white mb-3 leading-tight group-hover:text-[#BC4A17] transition-colors" style={{ fontFamily: "'Special Elite', serif" }}>
                  {e.label}
                </h3>
                <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(205,202,197,0.4)" }}>{e.desc}</p>
                <span className="text-[11px] font-bold flex items-center gap-2 uppercase tracking-wider transition-all group-hover:gap-3" style={{ color: CM.accent, letterSpacing: "0.1em" }}>
                  Schedule With Our Team <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: What Teams Like Yours Are Running ═════════════════ */}
      {/* Doc page 18: Section 4 — What Teams Like Yours Are Running */}
      <section className="py-24" style={{ background: "#141414" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: CM.accent }}>Section 4</p>
              <div className="w-10 h-[2px] mb-8" style={{ background: CM.accent }} />
              <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
                What Teams Like Yours Are Running
              </h2>
              <p className="text-[14px] leading-relaxed" style={{ color: "rgba(205,202,197,0.45)" }}>
                Co-managed means your IT leadership stays in the driver's seat while Kubric handles the platform complexity, detection assets, and escalation paths your team shouldn't have to build alone.
              </p>
            </div>
            <ul className="space-y-5">
              {OUTCOMES.map(o => (
                <li key={o} className="flex items-start gap-4">
                  <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center" style={{ border: `1px solid ${CM.accent}` }}>
                    <CheckCircle size={11} style={{ color: CM.accent }} />
                  </div>
                  <span className="text-[14px] leading-relaxed" style={{ color: "rgba(205,202,197,0.7)" }}>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: Build Your Stack ══════════════════════════════════ */}
      {/* Doc page 18: Section 5 — Build Your Stack */}
      <section className="py-24" style={{ background: "#0C0C0C" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: CM.accent }}>Section 5</p>
            <div className="w-10 h-[2px] mb-8" style={{ background: CM.accent }} />
            <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "'Special Elite', serif" }}>
              Build Your Stack
            </h2>
            <p className="text-[15px] leading-relaxed mb-10" style={{ color: "rgba(205,202,197,0.45)" }}>
              Tell us about your environment. We'll recommend your starting configuration. Platform tier cards → Kube selector → Live BOM builds → Pricing shown inline → Onboarding questions → Account creation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                style={{ background: CM.accent, letterSpacing: "0.1em" }}
              >
                Build My Stack <ArrowRight size={14} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all"
                style={{ border: "1px solid rgba(205,202,197,0.12)", color: "rgba(205,202,197,0.55)", letterSpacing: "0.1em" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = CM.accent}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.12)"}
              >
                View Pricing
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
