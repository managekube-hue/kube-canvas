/** Fully Managed: /solutions/by-service-type/fully-managed: rich deep page */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Monitor, FileCheck, Cloud, Search, Rocket, Settings, TrendingUp } from "lucide-react";
import { ManagedServicesWheel, FULLY_MANAGED_SEGMENTS } from "@/components/ManagedServicesWheel";
import childPageVideo from "@/assets/child-page.mp4";
import socImg from "@/assets/soc-operations.jpg";
import nocImg from "@/assets/noc-operations.jpg";
import grcImg from "@/assets/compliance-grc.jpg";
import cloudImg from "@/assets/cloud-ops.jpg";
import helpdeskImg from "@/assets/helpdesk-support.jpg";

const ORANGE = "#993619";

const SERVICES = [
  { title: "Managed SOC", sub: "24/7 threat hunting, incident response, and security monitoring staffed by certified analysts.", img: socImg, href: "/services/managed-soc", tag: "Security Operations" },
  { title: "Managed NOC", sub: "Proactive infrastructure monitoring, patch management, and remediation across hybrid environments.", img: nocImg, href: "/services/managed-noc", tag: "Network Operations" },
  { title: "Compliance & GRC", sub: "Continuous compliance monitoring across 100+ frameworks with automated evidence collection.", img: grcImg, href: "/services/managed-compliance", tag: "Governance" },
  { title: "Managed Cloud & FinOps", sub: "Cloud infrastructure management, cost optimization, and multi-cloud governance.", img: cloudImg, href: "/services/managed-cloud", tag: "Cloud Operations" },
  { title: "Help Desk Services", sub: "Tiered support from L1 through L3 with defined SLAs and escalation procedures.", img: helpdeskImg, href: "/services/help-desk", tag: "End-User Support" },
];

const CAPABILITIES = [
  { icon: Shield, title: "Managed SOC", desc: "Threat hunting, incident response, and 24/7 security monitoring staffed by certified analysts." },
  { icon: Monitor, title: "Managed NOC", desc: "Proactive infrastructure monitoring, patch management, and remediation across hybrid environments." },
  { icon: FileCheck, title: "Compliance & GRC", desc: "Continuous compliance monitoring across 100+ frameworks with automated evidence collection." },
  { icon: Cloud, title: "vCISO & Advisory", desc: "Executive-level security leadership, risk assessments, board reporting, and strategic roadmaps." },
];

const METHODOLOGY = [
  { step: "01", icon: Search, title: "Discovery", sub: "Assessment & planning", items: ["Current state inventory", "Risk register + roadmap", "4-week fixed scope"] },
  { step: "02", icon: Rocket, title: "Deployment", sub: "Phased implementation", items: ["Infrastructure setup", "Platform onboarding", "90-day execution plan"] },
  { step: "03", icon: Settings, title: "Integration", sub: "Connect existing tools", items: ["200+ connectors", "API configuration", "Data migration"] },
  { step: "04", icon: CheckCircle, title: "Training", sub: "Knowledge transfer", items: ["Team onboarding", "Runbook development", "Process documentation"] },
  { step: "05", icon: TrendingUp, title: "Optimization", sub: "Continuous improvement", items: ["Quarterly reviews", "Cost optimization", "SLA refinement"] },
];

export default function FullyManagedSolution() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative min-h-[56vh] flex items-center overflow-hidden" style={{ background: "#1D1D1B" }}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.22 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(29,29,27,0.97) 40%, rgba(29,29,27,0.65) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(29,29,27,1) 0%, transparent 55%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10 py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: ORANGE }}>Solutions › By Service Type</span>
            <div className="h-[2px] w-16 my-6" style={{ background: ORANGE }} />
            <h1 className="font-black text-white mb-3 leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "'Special Elite', serif" }}>
              Fully Managed
            </h1>
            <p className="text-xl font-semibold mb-6" style={{ color: ORANGE }}>We Operate. You Receive Outcomes.</p>
            <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: "rgba(205,202,197,0.7)" }}>
              You Have a Business to Operate. Let Us Operate the Security.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #1D1D1B, transparent)" }} />
      </section>

      {/* ── Narrative ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>The Fully Managed Model</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
          <p className="text-[16px] leading-relaxed max-w-4xl" style={{ color: "#393837" }}>
            Fully Managed is for organizations that require security outcomes without security operational overhead. The organization does not want to manage tools, tune detections, or staff a 24/7 security operations center. It wants threats detected, incidents responded to, compliance maintained, and evidence produced, without directing internal resources toward how those outcomes are achieved. Fully Managed delivers: we operate the Kubric platform continuously. Your team receives outcomes.
          </p>
        </div>
      </section>

      {/* ── Bento Service Grid ── */}
      <section className="py-20" style={{ background: "#1D1D1B" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="h-[2px] w-10 mb-6" style={{ background: ORANGE }} />
            <h2 className="font-black text-white mb-3 leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "'Special Elite', serif" }}>
              We are not another MSP or software platform — we are a different kind of partner.
            </h2>
            <p className="text-[14px] mb-12" style={{ color: "rgba(205,202,197,0.45)" }}>
              Our service delivery is unmatched and consistently outperforms expectations.
            </p>
          </motion.div>

          {/* Bento grid: large left + stacked right */}
          <div className="grid lg:grid-cols-3 gap-[2px]">
            {/* Large featured card */}
            <Link to={SERVICES[0].href} className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-lg" style={{ minHeight: 420 }}>
              <img src={SERVICES[0].img} alt={SERVICES[0].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-4 inline-block" style={{ background: "rgba(153,54,25,0.2)", color: ORANGE, border: "1px solid rgba(153,54,25,0.3)" }}>
                  {SERVICES[0].tag}
                </span>
                <h3 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>{SERVICES[0].title}</h3>
                <p className="text-[13px] leading-relaxed max-w-lg" style={{ color: "rgba(205,202,197,0.6)" }}>{SERVICES[0].sub}</p>
              </div>
            </Link>

            {/* Stacked right cards */}
            {SERVICES.slice(1, 3).map(s => (
              <Link key={s.title} to={s.href} className="group relative overflow-hidden rounded-lg" style={{ minHeight: 200 }}>
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 70%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "'Special Elite', serif" }}>{s.title}</h3>
                  <p className="text-[11px]" style={{ color: "rgba(205,202,197,0.5)" }}>{s.tag}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom row cards */}
          <div className="grid md:grid-cols-2 gap-[2px] mt-[2px]">
            {SERVICES.slice(3).map(s => (
              <Link key={s.title} to={s.href} className="group relative overflow-hidden rounded-lg" style={{ minHeight: 220 }}>
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 70%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-3 inline-block" style={{ background: "rgba(153,54,25,0.2)", color: ORANGE, border: "1px solid rgba(153,54,25,0.3)" }}>
                    {s.tag}
                  </span>
                  <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "'Special Elite', serif" }}>{s.title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(205,202,197,0.5)" }}>{s.sub}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick-access pills */}
          <div className="mt-8 p-6 rounded-lg" style={{ background: "#252523", border: "1px solid rgba(205,202,197,0.08)" }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(205,202,197,0.3)" }}>All Services in This Section</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map(s => (
                <Link key={s.title} to={s.href} className="text-[11px] px-4 py-2 rounded-full font-medium transition-all hover:border-[#993619]" style={{ border: "1px solid rgba(205,202,197,0.12)", color: "rgba(205,202,197,0.5)" }}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Capabilities Wheel — Light Band ── */}
      <ManagedServicesWheel
        title="Every Capability. One Wheel."
        subtitle="Hover any segment to explore the managed services included in a Fully Managed engagement."
        segments={FULLY_MANAGED_SEGMENTS}
        variant="light"
      />

      {/* ── What Fully Managed Includes ── */}
      <section className="py-20" style={{ background: "#EEE9E3" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>What Fully Managed Includes</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
          <div className="grid sm:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {[
              "24/7 Platform Operations — We monitor, tune, and maintain the Kubric platform continuously. Your team has no platform management responsibilities.",
              "Full Methodology Coverage — Every detection runs through Hunt, Identify, Alert, Triage, Diagnose, Remediate, Document, and Close — according to your service tier.",
              "Incident Response — We respond to incidents. We contain, remediate, document, and close. Your team is notified of outcomes, not tasked with producing them.",
              "Compliance Evidence — Evidence is collected automatically throughout operations. Audit packages are generated on demand without manual preparation.",
              "Quarterly Business Reviews — Incidents, trends, and forward-looking recommendations reviewed with your leadership on a defined cadence.",
              "Dedicated Service Delivery Manager — One named point of contact. One team that maintains continuity of knowledge about your environment.",
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="p-6 flex items-start gap-3" style={{ background: "#EEE9E3" }}>
                <CheckCircle size={14} style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }} />
                <span className="text-[13px] leading-relaxed" style={{ color: "#393837" }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities Cards ── */}
      <section className="py-24" style={{ background: "#2A2A28" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="h-[2px] w-10 mb-6" style={{ background: ORANGE }} />
            <h2 className="font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontFamily: "'Special Elite', serif" }}>
              Capabilities That Drive Outcomes
            </h2>
            <p className="text-[14px] mb-14 max-w-xl" style={{ color: "rgba(205,202,197,0.45)" }}>
              From security operations to infrastructure management — we deliver measurable results, not just tools.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: "rgba(205,202,197,0.06)" }}>
            {CAPABILITIES.map((cap, i) => (
              <motion.div key={cap.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-8 flex flex-col" style={{ background: "#2A2A28", borderTop: `2px solid ${i === 0 ? ORANGE : "rgba(205,202,197,0.06)"}` }}>
                <cap.icon size={28} style={{ color: ORANGE }} className="mb-6" />
                <h3 className="text-[15px] font-black text-white mb-3">{cap.title}</h3>
                <p className="text-[12px] leading-relaxed flex-1" style={{ color: "rgba(205,202,197,0.45)" }}>{cap.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white rounded-full transition-all hover:opacity-90" style={{ background: ORANGE }}>
              Explore Our Services <ArrowRight size={14} />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all" style={{ color: "rgba(205,202,197,0.5)" }}>
              Why ManageKube <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Delivery Methodology ── */}
      <section className="py-24" style={{ background: "#1D1D1B" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: ORANGE }}>Proven Approach</span>
            <div className="h-[2px] w-10 my-6" style={{ background: ORANGE }} />
            <h2 className="font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontFamily: "'Special Elite', serif" }}>
              Service Delivery Methodology
            </h2>
            <p className="text-[14px] mb-16" style={{ color: "rgba(205,202,197,0.4)" }}>
              Structured framework from onboarding to continuous optimization
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {METHODOLOGY.map((m, i) => (
              <motion.div key={m.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center md:text-left">
                {/* Circle icon */}
                <div className="mx-auto md:mx-0 w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all"
                  style={{ background: i === METHODOLOGY.length - 1 ? ORANGE : "rgba(205,202,197,0.08)", border: `1px solid ${i === METHODOLOGY.length - 1 ? ORANGE : "rgba(205,202,197,0.12)"}` }}>
                  <m.icon size={20} style={{ color: i === METHODOLOGY.length - 1 ? "#fff" : "rgba(205,202,197,0.5)" }} />
                </div>
                <span className="text-[11px] font-bold" style={{ color: ORANGE }}>{m.step}</span>
                <h4 className="text-[15px] font-black text-white mt-1 mb-1">{m.title}</h4>
                <p className="text-[12px] mb-3" style={{ color: "rgba(205,202,197,0.5)" }}>{m.sub}</p>
                <ul className="space-y-1">
                  {m.items.map(item => (
                    <li key={item} className="text-[11px]" style={{ color: "rgba(205,202,197,0.3)" }}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It Is For ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Who It Is For</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
          <div className="grid sm:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {[
              "Organizations without 24/7 security staff",
              "Organizations that want detection and response entirely managed externally",
              "Lean IT and security teams stretched across too many priorities",
              "Organizations that require security outcomes without the operational overhead of producing them internally",
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="p-6 flex items-start gap-3" style={{ background: "#FEFBF6" }}>
                <CheckCircle size={14} style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }} />
                <span className="text-[13px] leading-relaxed" style={{ color: "#393837" }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#393837" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Get Started</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontFamily: "'Special Elite', serif" }}>
                Ready to find your solution?
              </h2>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90 rounded-full" style={{ background: ORANGE }}>
                  Contact Sales <ArrowRight size={14} />
                </Link>
                <Link to="/service-tiers" className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-sm uppercase tracking-wider transition-all" style={{ border: "1px solid rgba(205,202,197,0.15)", color: "rgba(205,202,197,0.55)" }}>
                  View Service Tiers
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(205,202,197,0.3)" }}>Related Pages</p>
              <div className="space-y-[1px]" style={{ background: "rgba(205,202,197,0.07)" }}>
                {[
                  { label: "Co-Managed", href: "/solutions/by-service-type/co-managed" },
                  { label: "Self-Managed", href: "/solutions/by-service-type/self-managed" },
                  { label: "Service Tiers", href: "/service-tiers" },
                ].map(s => (
                  <Link key={s.label} to={s.href} className="group flex items-center justify-between p-5 transition-all" style={{ background: "#464648" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1D1D1B"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#464648"}>
                    <span className="text-[14px] font-semibold text-white group-hover:text-[#993619] transition-colors">{s.label}</span>
                    <ArrowRight size={14} style={{ color: ORANGE }} className="group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
