import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePath } from "@/context/PathContext";
import { STORAGE_KEY } from "@/context/PathContext";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/** DO NOT TOUCH — Qualification Gate — #0C0C0C premium dark enterprise experience */

const PATHS = [
  {
    id: "fully-managed" as const,
    label: "FULLY MANAGED",
    headline: "We run it.\nYou own the outcomes.",
    sub: "NOC. SOC. Compliance. Cloud. End-to-end.",
    detail: "Your dedicated team handles every layer of infrastructure, security, and compliance. You get outcomes — we handle operations.",
    badge: "Most Popular",
  },
  {
    id: "co-managed" as const,
    label: "CO-MANAGED",
    headline: "Your team runs it.\nOur platform backs you up.",
    sub: "Kubes, tooling, and engineer escalation on demand.",
    detail: "You keep control of daily operations. We provide the platform, playbooks, and escalation support when your team needs backup.",
    badge: "Best for IT Teams",
  },
  {
    id: "self-managed" as const,
    label: "SELF-MANAGED",
    headline: "You run it.\nThe platform gets out of your way.",
    sub: "Deploy, configure, and control every layer yourself.",
    detail: "Full access to Kubric UIDR, the K-DOCS library, and the open-core platform. Deploy on your terms, your infrastructure.",
    badge: "For Engineers",
  },
];

const ORANGE = "#993619";

export default function QualificationGate() {
  const navigate = useNavigate();
  const { setPath } = usePath();

  // DO NOT auto-redirect — user must always see and choose their path on the gate
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {}, []);

  const choose = (id: typeof PATHS[0]["id"]) => {
    setPath(id);
    navigate(`/${id}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0C0C0C", fontFamily: "'Roboto Mono', monospace" }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-8 lg:px-16 py-5"
        style={{ borderBottom: "1px solid rgba(205,202,197,0.07)" }}
      >
        <span
          className="text-[22px] font-bold tracking-tight text-white"
          style={{ fontFamily: "'Special Elite', serif" }}
        >
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 lg:py-24">

        {/* Thin orange rule */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-[2px] mb-10"
          style={{ background: ORANGE }}
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[10px] font-bold tracking-[0.24em] uppercase mb-6 text-center"
          style={{ color: "rgba(205,202,197,0.35)" }}
        >
          One Platform. Three Ways to Work With Us.
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white text-center leading-[1.08] mb-4 max-w-3xl"
          style={{ fontFamily: "'Special Elite', serif" }}
        >
          How you engage with ManageKube
          <br />
          <span style={{ color: ORANGE }}>depends on how your team operates.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-[14px] text-center max-w-md mb-14 leading-relaxed"
          style={{ color: "rgba(205,202,197,0.4)" }}
        >
          Choose your model.
        </motion.p>

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
              style={{ background: "#141414" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1D1D1B"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#141414"; }}
            >
              {/* Orange top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] transition-all" style={{ background: ORANGE }} />

              {/* Badge */}
              <span
                className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-8 inline-block"
                style={{
                  background: "rgba(153,54,25,0.1)",
                  color: ORANGE,
                  border: "1px solid rgba(153,54,25,0.18)",
                }}
              >
                {p.badge}
              </span>

              {/* Eyebrow */}
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: ORANGE }}>
                {p.label}
              </p>

              {/* Headline */}
              <h2
                className="text-[1.55rem] font-black text-white leading-tight mb-4 whitespace-pre-line"
                style={{ fontFamily: "'Special Elite', serif" }}
              >
                {p.headline}
              </h2>

              {/* Sub-statement */}
              <p className="text-[13px] font-semibold mb-4 leading-snug" style={{ color: "rgba(205,202,197,0.65)" }}>
                {p.sub}
              </p>

              {/* Detail */}
              <p className="text-[13px] leading-relaxed mb-10 flex-1" style={{ color: "rgba(205,202,197,0.35)" }}>
                {p.detail}
              </p>

              {/* CTA */}
              <div
                className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase transition-all group-hover:gap-3"
                style={{ color: ORANGE, letterSpacing: "0.1em" }}
              >
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
            to="/methodology"
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
        className="px-8 lg:px-16 py-5 flex items-center justify-between"
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
/** END DO NOT TOUCH */
