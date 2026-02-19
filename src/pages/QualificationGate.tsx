import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePath } from "@/context/PathContext";
import { STORAGE_KEY } from "@/context/PathContext";
import { ArrowRight } from "lucide-react";

/** DO NOT TOUCH — Qualification Gate — Premium dark enterprise experience */

const PATHS = [
  {
    id: "fully-managed" as const,
    label: "Fully Managed",
    headline: "We run it.\nYou own the outcomes.",
    sub: "NOC. SOC. Compliance. Cloud. End-to-end.",
    detail: "Your dedicated team handles every layer of infrastructure, security, and compliance. You get outcomes — we handle operations.",
    accent: "#993619",
    badge: "Most Popular",
  },
  {
    id: "co-managed" as const,
    label: "Co-Managed",
    headline: "Your team runs it.\nOur platform backs you up.",
    sub: "Kubes, tooling, and engineer escalation on demand.",
    detail: "You keep control of daily operations. We provide the platform, playbooks, and escalation support when your team needs backup.",
    accent: "#BC4A17",
    badge: "Best for IT Teams",
  },
  {
    id: "self-managed" as const,
    label: "Self-Managed",
    headline: "You run it.\nThe platform gets out of your way.",
    sub: "Deploy, configure, and control every layer yourself.",
    detail: "Full access to Kubric UIDR, the K-DOCS library, and the open-core platform. Deploy on your terms, your infrastructure.",
    accent: "#993619",
    badge: "For Engineers",
  },
];

export default function QualificationGate() {
  const navigate = useNavigate();
  const { setPath } = usePath();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fully-managed" || stored === "co-managed" || stored === "self-managed") {
      navigate(`/${stored}`, { replace: true });
    }
  }, [navigate]);

  const choose = (id: typeof PATHS[0]["id"]) => {
    setPath(id);
    navigate(`/${id}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0C0C0C", fontFamily: "'Roboto Mono', monospace" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 lg:px-16 py-6"
        style={{ borderBottom: "1px solid rgba(205,202,197,0.08)" }}
      >
        <span
          className="text-[22px] font-bold tracking-tight text-white"
          style={{ fontFamily: "'Special Elite', serif" }}
        >
          Manage<span style={{ color: "#993619" }}>Kube</span>
        </span>
        <button
          onClick={() => { setPath("fully-managed"); navigate("/fully-managed"); }}
          className="text-[12px] tracking-widest uppercase transition-colors"
          style={{ color: "rgba(205,202,197,0.35)", letterSpacing: "0.14em" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.7)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.35)"}
        >
          Skip to Site →
        </button>
      </div>

      {/* Hero copy */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* Thin orange rule */}
        <div className="w-12 h-[2px] mb-10" style={{ background: "#993619" }} />

        <p
          className="text-[11px] font-bold tracking-[0.22em] uppercase mb-8 text-center"
          style={{ color: "rgba(205,202,197,0.4)" }}
        >
          One Platform. Three Ways to Work With Us.
        </p>

        <h1
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white text-center leading-[1.08] mb-5 max-w-3xl"
          style={{ fontFamily: "'Special Elite', serif" }}
        >
          How do you want to<br />
          <span style={{ color: "#993619" }}>engage with us?</span>
        </h1>

        <p
          className="text-[15px] text-center max-w-lg mb-16 leading-relaxed"
          style={{ color: "rgba(205,202,197,0.45)" }}
        >
          How you engage with ManageKube depends on how your team operates. Choose your model.
        </p>

        {/* 3 path cards */}
        <div className="grid md:grid-cols-3 gap-[1px] w-full max-w-5xl" style={{ border: "1px solid rgba(205,202,197,0.1)", background: "rgba(205,202,197,0.1)" }}>
          {PATHS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => choose(p.id)}
              className="group relative flex flex-col items-start p-10 text-left transition-all duration-300"
              style={{ background: "#141414" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#1D1D1B";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#141414";
              }}
            >
              {/* Accent top bar — only orange */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "#993619" }} />

              {/* Badge */}
              <span
                className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-8 inline-block"
                style={{
                  background: "rgba(153,54,25,0.12)",
                  color: "#993619",
                  border: "1px solid rgba(153,54,25,0.2)",
                }}
              >
                {p.badge}
              </span>

              <p
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: "#993619" }}
              >
                {p.label}
              </p>

              <h2
                className="text-[1.6rem] font-black text-white leading-tight mb-4 whitespace-pre-line"
                style={{ fontFamily: "'Special Elite', serif" }}
              >
                {p.headline}
              </h2>

              <p
                className="text-[13px] font-semibold mb-5 leading-snug"
                style={{ color: "rgba(205,202,197,0.7)" }}
              >
                {p.sub}
              </p>

              <p
                className="text-[13px] leading-relaxed mb-10 flex-1"
                style={{ color: "rgba(205,202,197,0.4)" }}
              >
                {p.detail}
              </p>

              {/* CTA row */}
              <div
                className="flex items-center gap-2 text-[12px] font-bold tracking-wider uppercase transition-all group-hover:gap-3"
                style={{ color: "#993619" }}
              >
                This is my model
                <ArrowRight size={13} />
              </div>
            </button>
          ))}
        </div>

        {/* Compare link */}
        <p className="mt-12 text-[13px]" style={{ color: "rgba(205,202,197,0.3)" }}>
          Not sure which model fits?{" "}
          <a
            href="/methodology"
            className="transition-colors underline underline-offset-4"
            style={{ color: "rgba(205,202,197,0.55)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#993619"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.55)"}
          >
            Read the comparison →
          </a>
        </p>
      </div>

      {/* Thin footer bar */}
      <div
        className="px-8 lg:px-16 py-5 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(205,202,197,0.06)" }}
      >
        <p className="text-[11px]" style={{ color: "rgba(205,202,197,0.2)" }}>
          © 2026 ManageKube. Enterprise MSP &amp; MSSP.
        </p>
        <p className="text-[11px]" style={{ color: "rgba(205,202,197,0.2)" }}>
          Your selection is remembered on return visits.
        </p>
      </div>
    </div>
  );
}
/** END DO NOT TOUCH */
