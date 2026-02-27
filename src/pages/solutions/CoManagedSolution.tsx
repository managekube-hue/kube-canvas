/** Co-Managed: /solutions/by-service-type/co-managed: rich deep page */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Monitor, FileCheck, Users, Sun, Moon, Clock, Handshake } from "lucide-react";
import { ManagedServicesWheel, CO_MANAGED_SEGMENTS } from "@/components/ManagedServicesWheel";
import childPageVideo from "@/assets/child-page.mp4";
import socImg from "@/assets/soc-operations.jpg";
import nocImg from "@/assets/noc-operations.jpg";
import grcImg from "@/assets/compliance-grc.jpg";
import helpdeskImg from "@/assets/helpdesk-support.jpg";
import cloudImg from "@/assets/cloud-ops.jpg";

const ORANGE = "#993619";

const SERVICES = [
  { title: "Managed SOC", sub: "We hunt threats 24/7. Your team triages during business hours. We cover the rest.", img: socImg, href: "/services/managed-soc", tag: "Security Operations" },
  { title: "Managed NOC", sub: "Continuous infrastructure monitoring with shared escalation and daytime collaboration.", img: nocImg, href: "/services/managed-noc", tag: "Network Operations" },
  { title: "Compliance & GRC", sub: "Automated evidence collection. Shared audit preparation. Your team stays in the loop.", img: grcImg, href: "/services/managed-compliance", tag: "Governance" },
  { title: "Help Desk Services", sub: "Tiered support with your team handling daytime L1 and our team covering after-hours.", img: helpdeskImg, href: "/services/help-desk", tag: "End-User Support" },
  { title: "Cloud Operations", sub: "Shared cloud management with your team controlling architecture decisions.", img: cloudImg, href: "/services/managed-cloud", tag: "Cloud & FinOps" },
];

const SHARED_MODEL = [
  { icon: Sun, title: "Business Hours", desc: "Your team receives alerts, triages incidents, and makes response decisions during working hours.", accent: false },
  { icon: Moon, title: "After Hours", desc: "We handle nights, weekends, and holidays. Incidents are triaged and contained. Your team is briefed next business day.", accent: true },
  { icon: Handshake, title: "Shared Methodology", desc: "Hunt, Identify, Alert continuously by us. Triage, Diagnose, Remediate shared based on your team's availability.", accent: false },
  { icon: Clock, title: "24/7 Platform Ops", desc: "We monitor, tune, and maintain the Kubric platform continuously. Your team does not manage the platform.", accent: true },
];

export default function CoManagedSolution() {
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
              Co-Managed
            </h1>
            <p className="text-xl font-semibold mb-6" style={{ color: ORANGE }}>We Operate. You Participate.</p>
            <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: "rgba(205,202,197,0.7)" }}>
              You Want Visibility and Control. You Do Not Want 24/7 Platform Management.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{ background: "linear-gradient(to top, #1D1D1B, transparent)" }} />
      </section>

      {/* ── Narrative ── */}
      <section className="py-20" style={{ background: "#FEFBF6" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>The Co-Managed Model</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
          <p className="text-[16px] leading-relaxed max-w-4xl" style={{ color: "#393837" }}>
            Co-Managed is for organizations with internal security staff who intend to remain operationally involved. The team wants to see what is happening, participate in triage decisions, and engage in response during business hours. But it does not want to manage the platform continuously or maintain a follow-the-sun staffing model to cover nights, weekends, and holidays. Co-Managed delivers: we operate the Kubric platform continuously. Your team participates in triage and response during business hours. We cover what your team does not.
          </p>
        </div>
      </section>

      {/* ── Shared Responsibility Model ── */}
      <section className="py-24" style={{ background: "#1D1D1B" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="h-[2px] w-10 mb-6" style={{ background: ORANGE }} />
            <h2 className="font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontFamily: "'Special Elite', serif" }}>
              How the Shared Responsibility Model Works
            </h2>
            <p className="text-[14px] mb-14 max-w-xl" style={{ color: "rgba(205,202,197,0.4)" }}>
              Your team keeps control. We keep the lights on.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: "rgba(205,202,197,0.06)" }}>
            {SHARED_MODEL.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-8 flex flex-col" style={{ background: item.accent ? "#252523" : "#1D1D1B", borderTop: `2px solid ${i === 0 ? ORANGE : "rgba(205,202,197,0.06)"}` }}>
                <item.icon size={28} style={{ color: ORANGE }} className="mb-6" />
                <h3 className="text-[15px] font-black text-white mb-3">{item.title}</h3>
                <p className="text-[12px] leading-relaxed flex-1" style={{ color: "rgba(205,202,197,0.45)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Capabilities Wheel — Light Band ── */}
      <ManagedServicesWheel
        title="Shared Capabilities. One Wheel."
        subtitle="Hover any segment to see how responsibilities are shared between your team and ours."
        segments={CO_MANAGED_SEGMENTS}
        variant="light"
      />

      {/* ── Bento Service Grid ── */}
      <section className="py-20" style={{ background: "#2A2A28" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="h-[2px] w-10 mb-6" style={{ background: ORANGE }} />
            <h2 className="font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontFamily: "'Special Elite', serif" }}>
              Services You Can Co-Manage
            </h2>
            <p className="text-[14px] mb-12" style={{ color: "rgba(205,202,197,0.4)" }}>
              Every service adapts to your team's capacity and working hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-[2px]">
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
          <div className="grid md:grid-cols-2 gap-[2px] mt-[2px]">
            {SERVICES.slice(3).map(s => (
              <Link key={s.title} to={s.href} className="group relative overflow-hidden rounded-lg" style={{ minHeight: 220 }}>
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 70%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-3 inline-block" style={{ background: "rgba(153,54,25,0.2)", color: ORANGE, border: "1px solid rgba(153,54,25,0.3)" }}>{s.tag}</span>
                  <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "'Special Elite', serif" }}>{s.title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(205,202,197,0.5)" }}>{s.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Co-Managed Includes ── */}
      <section className="py-20" style={{ background: "#EEE9E3" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>What Co-Managed Includes</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
          <div className="grid sm:grid-cols-2 gap-[1px]" style={{ background: "#CDCAC5" }}>
            {[
              "24/7 Platform Operations: We monitor, tune, and maintain the Kubric platform continuously. Your team does not manage the platform.",
              "Business Hours Participation: Your team receives alerts during business hours. You triage, make decisions, and participate in response according to your internal processes.",
              "After-Hours Coverage: We handle nights, weekends, and holidays. Incidents are triaged and contained. Your team is briefed at the start of the next business day with full context.",
              "Shared Methodology: We handle Hunt, Identify, and Alert continuously. Triage, Diagnose, and Remediate are shared based on your team's availability. Document and Close are handled by whoever closes the incident.",
              "Compliance Evidence — Evidence is collected automatically. Audit packages are generated on demand.",
              "Quarterly Business Reviews — Incidents, trends, and recommendations reviewed with your team on a defined cadence.",
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

      {/* ── Who It Is For ── */}
      <section className="py-20" style={{ background: "#1D1D1B" }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>Who It Is For</p>
          <div className="h-[2px] w-10 mb-8" style={{ background: ORANGE }} />
          <div className="grid sm:grid-cols-2 gap-[1px]" style={{ background: "rgba(205,202,197,0.08)" }}>
            {[
              "Organizations with in-house security staff during business hours",
              "Organizations that want visibility and operational involvement without 24/7 coverage burden",
              "Teams building internal security maturity with partner support as a complement",
              "Organizations that need after-hours coverage but want to retain daytime decision authority",
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="p-6 flex items-start gap-3" style={{ background: "#1D1D1B" }}>
                <CheckCircle size={14} style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }} />
                <span className="text-[13px] leading-relaxed" style={{ color: "rgba(205,202,197,0.6)" }}>{item}</span>
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
                  { label: "Fully Managed", href: "/solutions/by-service-type/fully-managed" },
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
