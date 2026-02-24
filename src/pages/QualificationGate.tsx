import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePath } from "@/context/PathContext";
import { STORAGE_KEY } from "@/context/PathContext";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import datacenterVideo from "@/assets/datacenter-walkthrough.mp4";

const PATHS = [
  {
    id: "fully-managed" as const,
    label: "FULLY MANAGED",
    headline: "We run it.\nYou own the outcomes.",
    sub: "NOC. SOC. Compliance. Cloud. End-to-end.",
    detail: "Your dedicated team handles every layer of infrastructure, security, and compliance. You get outcomes. We handle operations.",
    badge: "Most Popular",
  },
  {
    id: "co-managed" as const,
    label: "CO-MANAGED",
    headline: "Your team runs it.\nOur engineers back you up.",
    sub: "Modules, tooling, and engineer escalation on demand.",
    detail: "You keep control of daily operations. We provide the tools, playbooks, and escalation support when your team needs backup.",
    badge: "Best for IT Teams",
  },
  {
    id: "self-managed" as const,
    label: "SELF-MANAGED",
    headline: "You run it.\nThe service provider gets out of your way.",
    sub: "Deploy, configure, and control every layer yourself.",
    detail: "Full access to Kubric UIDR, the K-DOCS library, and the open-core system. Deploy on your terms, your infrastructure.",
    badge: "For Engineers",
  },
];

const ORANGE = "#993619";

export default function QualificationGate() {
  const navigate = useNavigate();
  const { setPath } = usePath();

  useEffect(() => {}, []);

  const choose = (id: typeof PATHS[0]["id"]) => {
    setPath(id);
    navigate(`/${id}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col" style={{ fontFamily: "'Roboto Mono', monospace" }}>
      {/* ── Full-page video background ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src={datacenterVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(12,12,12,0.92) 0%, rgba(12,12,12,0.75) 40%, rgba(12,12,12,0.92) 100%)" }} />
      </div>

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-5"
        style={{ borderBottom: "1px solid rgba(205,202,197,0.07)" }}
      >
        <span className="text-[22px] font-bold tracking-tight text-white" style={{ fontFamily: "'Special Elite', serif" }}>
          Manage<span style={{ color: ORANGE }}>Kube</span>
        </span>
        <div className="flex items-center gap-6">
          <Link
            to="/contact"
            className="text-[11px] tracking-widest uppercase transition-colors hidden sm:block"
            style={{ color: "rgba(205,202,197,0.3)", letterSpacing: "0.14em" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.65)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.3)"}
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 lg:py-24">

        {/* Hero — centered text */}
        <div className="w-full max-w-4xl text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-[2px] mb-10 mx-auto"
            style={{ background: ORANGE }}
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] font-bold tracking-[0.24em] uppercase mb-6"
            style={{ color: "rgba(205,202,197,0.35)" }}
          >
            One Service Provider. Three Ways to Work With Us.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.08] mb-4"
            style={{ fontFamily: "'Special Elite', serif" }}
          >
            How you engage with ManageKube
            <br />
            <span style={{ color: ORANGE }}>depends on how your team operates.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-[14px] max-w-md mx-auto mb-4 leading-relaxed"
            style={{ color: "rgba(205,202,197,0.4)" }}
          >
            Choose your model.
          </motion.p>
        </div>

        {/* ── 3 path cards ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid md:grid-cols-3 gap-[1px] w-full max-w-5xl"
          style={{ background: "rgba(205,202,197,0.08)" }}
        >
          {PATHS.map(p => (
            <button
              key={p.id}
              onClick={() => choose(p.id)}
              className="group relative flex flex-col items-start p-10 text-left transition-all duration-300"
              style={{ background: "rgba(20,20,20,0.85)", backdropFilter: "blur(12px)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(29,29,27,0.9)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(20,20,20,0.85)"; }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] transition-all" style={{ background: ORANGE }} />
              <span
                className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-8 inline-block"
                style={{ background: "rgba(153,54,25,0.1)", color: ORANGE, border: "1px solid rgba(153,54,25,0.18)" }}
              >
                {p.badge}
              </span>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>
                {p.label}
              </p>
              <h2 className="text-[1.55rem] font-black text-white leading-tight mb-4 whitespace-pre-line" style={{ fontFamily: "'Special Elite', serif" }}>
                {p.headline}
              </h2>
              <p className="text-[13px] font-semibold mb-4 leading-snug" style={{ color: "rgba(205,202,197,0.65)" }}>
                {p.sub}
              </p>
              <p className="text-[13px] leading-relaxed mb-10 flex-1" style={{ color: "rgba(205,202,197,0.35)" }}>
                {p.detail}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase transition-all group-hover:gap-3" style={{ color: ORANGE, letterSpacing: "0.1em" }}>
                This is my model <ArrowRight size={12} />
              </div>
            </button>
          ))}
        </motion.div>

        {/* Compare link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-[13px]"
          style={{ color: "rgba(205,202,197,0.25)" }}
        >
          Not sure which model fits?{" "}
          <Link
            to="/solutions/by-service-type"
            className="transition-colors underline underline-offset-4"
            style={{ color: "rgba(205,202,197,0.5)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = ORANGE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.5)"}
          >
            Read the comparison →
          </Link>
        </motion.p>
      </div>

      {/* ── Footer bar ──────────────────────────────────────────────────── */}
      <div
        className="relative z-10 px-8 lg:px-16 py-5 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(205,202,197,0.05)" }}
      >
        <p className="text-[11px]" style={{ color: "rgba(205,202,197,0.18)" }}>
          © 2026 ManageKube. Enterprise MSP &amp; MSSP.
        </p>
        <p className="text-[11px]" style={{ color: "rgba(205,202,197,0.18)" }}>
          Your selection is remembered on return visits.
        </p>
      </div>
    </div>
  );
}
