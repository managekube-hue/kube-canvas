import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import {
  ArrowRight, Shield, Cloud, BarChart3, HeadphonesIcon, CheckCircle,
  Server
} from "lucide-react";
import { motion } from "framer-motion";
import datacenterVideo from "@/assets/datacenter-walkthrough.mp4";
import { ManagedServicesWheel, FULLY_MANAGED_SEGMENTS } from "@/components/ManagedServicesWheel";


/** DO NOT TOUCH — Fully Managed Home — #993619 design system */

// Sub-nav per architecture doc
const SUB_NAV = [
  { label: "Our Tools", href: "/our-tools" },
  { label: "Service Layer", href: "/service-layer" },
  { label: "Services", href: "/services" },
  { label: "Service Tiers", href: "/service-tiers" },
  { label: "Compliance", href: "/compliance" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Get Started", href: "/get-started", cta: true },
];

const OUTCOMES = [
  "Zero silos between NOC, SOC, and compliance",
  "Single dedicated account team for all operations",
  "Guaranteed SLAs across every managed function",
  "Monthly executive reporting and business reviews",
  "Continuous improvement through the Kubric framework",
];

const SERVICES = [
  { icon: HeadphonesIcon, label: "Managed NOC", desc: "24/7 network operations monitoring and response.", href: "/services/managed-noc" },
  { icon: Shield, label: "Managed SOC", desc: "Continuous threat detection, triage, and remediation.", href: "/services/managed-soc" },
  { icon: CheckCircle, label: "Managed Compliance", desc: "Ongoing compliance posture management across all frameworks.", href: "/services/managed-compliance" },
  { icon: Cloud, label: "Managed Cloud", desc: "Full lifecycle cloud infrastructure management.", href: "/services/managed-cloud" },
  { icon: BarChart3, label: "Security Assessments", desc: "Scheduled vulnerability and security posture assessments.", href: "/services/security-assessments" },
  { icon: Server, label: "Infrastructure Audits", desc: "Architecture, performance, and security review by your team.", href: "/services/infrastructure-audits" },
];

export default function FullyManaged() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* === HERO WITH VIDEO === */}
      <section className="relative min-h-screen flex items-center pt-20 pb-0 overflow-hidden" style={{ background: "#0C0C0C" }}>
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.55 }}
          >
            <source src={datacenterVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,12,12,0.80) 25%, rgba(12,12,12,0.45) 60%, rgba(12,12,12,0.25) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,12,12,0.90) 0%, transparent 40%, rgba(12,12,12,0.35) 100%)" }} />
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-6"
              style={{ color: "#993619" }}
            >
              Fully Managed
            </motion.p>

            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-[2px] mb-8"
              style={{ background: "#993619" }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-black text-white leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontFamily: "'Special Elite', serif" }}
            >
              One Service Provider.<br />
              <span style={{ color: "#993619" }}>Zero Silos.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl leading-relaxed mb-3"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Complete visibility across NOC, SOC, and business operations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="text-lg leading-relaxed mb-12"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              We manage your infrastructure, security, and compliance so you can focus on growth. One team. One service provider. Every operation covered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                style={{ background: "#993619", letterSpacing: "0.1em" }}
              >
                Get Started <ArrowRight size={15} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all"
                style={{
                  border: "1px solid rgba(205,202,197,0.2)",
                  color: "rgba(205,202,197,0.7)",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#993619"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,202,197,0.2)"}
              >
                View Pricing
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade to sub-nav */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10" style={{ background: "linear-gradient(to top, #0C0C0C, transparent)" }} />
      </section>




      {/* === OUTCOMES === */}
      <section className="py-24" style={{ background: "#141414" }}>
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#993619" }}>What You Get</p>
              <div className="w-10 h-[2px] mb-8" style={{ background: "#993619" }} />
              <h2
                className="font-black text-white mb-6 leading-tight"
                style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "'Special Elite', serif" }}
              >
                Outcomes you can measure.<br />Operations we own.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(205,202,197,0.55)" }}>
                Every contract includes a dedicated account team, transparent reporting, and a commitment to continuous improvement across every managed service.
              </p>
            </div>
            <ul className="space-y-5">
              {OUTCOMES.map(o => (
                <li key={o} className="flex items-start gap-4">
                  <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center" style={{ border: "1px solid #993619" }}>
                    <CheckCircle size={11} style={{ color: "#993619" }} />
                  </div>
                  <span className="text-[15px] leading-relaxed" style={{ color: "rgba(205,202,197,0.8)" }}>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* === SERVICES GRID === */}
      <section className="py-24" style={{ background: "#1D1D1B" }}>
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#993619" }}>What We Run For You</p>
          <div className="w-10 h-[2px] mb-8" style={{ background: "#993619" }} />
          <h2
            className="font-black text-white mb-16"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "'Special Elite', serif" }}
          >
            Every operation. Fully covered.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: "rgba(205,202,197,0.08)" }}>
            {SERVICES.map(s => (
              <Link
                key={s.label}
                to={s.href}
                className="group p-10 transition-all"
                style={{ background: "#1D1D1B" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#393837"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1D1D1B"}
              >
                <s.icon size={26} style={{ color: "#993619" }} className="mb-6" />
                <h3
                  className="text-[18px] font-black text-white mb-3 leading-tight group-hover:text-[#993619] transition-colors"
                  style={{ fontFamily: "'Special Elite', serif" }}
                >
                  {s.label}
                </h3>
                <p className="text-[14px] leading-relaxed mb-6" style={{ color: "rgba(205,202,197,0.5)" }}>{s.desc}</p>
                <span className="text-[12px] font-bold flex items-center gap-2 uppercase tracking-wider transition-all group-hover:gap-3" style={{ color: "#993619", letterSpacing: "0.1em" }}>
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
            ))}
            {/* View all */}
            <Link
              to="/services"
              className="group p-10 flex flex-col items-center justify-center text-center transition-all"
              style={{ background: "#141414" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1D1D1B"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#141414"}
            >
              <p className="text-[15px] font-black text-white mb-2" style={{ fontFamily: "'Special Elite', serif" }}>View All Services</p>
              <p className="text-[13px] mb-4" style={{ color: "rgba(205,202,197,0.4)" }}>16 specialized modules managed by our team.</p>
              <ArrowRight size={20} style={{ color: "#993619" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* === CAPABILITIES WHEEL === */}
      <ManagedServicesWheel
        title="Every Capability. One Wheel."
        subtitle="Hover any segment to explore the managed services included in a Fully Managed engagement."
        segments={FULLY_MANAGED_SEGMENTS}
        hubLabel={"MANAGE\nKUBE"}
        variant="light"
      />

      {/* === PLATFORM CTA === */}
      <section className="py-24" style={{ background: "#0C0C0C" }}>
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#993619" }}>The Engine Running Behind Your Managed Services</p>
            <div className="w-10 h-[2px] mb-8" style={{ background: "#993619" }} />
            <h2
              className="font-black text-white mb-6"
              style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "'Special Elite', serif" }}
            >
              Built to unify every operation we run for you.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(205,202,197,0.5)" }}>
              Kubric UIDR is the orchestration engine that gives your account team, NOC, SOC, and compliance operations a single source of operational truth.
            </p>
            <Link
              to="/our-tools/how-kubric-works"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
              style={{ background: "#993619", letterSpacing: "0.1em" }}
            >
              See What We Run For You <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <PathfinderCTA />
      <Footer />
    </div>
  );
}
/** END DO NOT TOUCH */
