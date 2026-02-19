import { useNavigate } from "react-router-dom";
import { usePath } from "@/context/PathContext";
import { ArrowRight } from "lucide-react";

/** DO NOT TOUCH — Qualification Gate */

const PATHS = [
  {
    id: "fully-managed" as const,
    label: "Fully Managed",
    headline: "We run it.\nYou own the outcomes.",
    sub: "NOC. SOC. Compliance. Cloud. End-to-end.",
    detail: "Your dedicated team handles every layer of infrastructure, security, and compliance. You get outcomes — we handle operations.",
    accent: "hsl(24,95%,53%)",
    accentDim: "hsl(24,95%,53%,0.12)",
    badge: "Most Popular",
  },
  {
    id: "co-managed" as const,
    label: "Co-Managed",
    headline: "Your team runs it.\nOur platform backs you up.",
    sub: "Kubes, tooling, and engineer escalation on demand.",
    detail: "You keep control of daily operations. We provide the platform, playbooks, and escalation support when your team needs backup.",
    accent: "hsl(210,70%,55%)",
    accentDim: "hsl(210,70%,55%,0.12)",
    badge: "Best for IT Teams",
  },
  {
    id: "self-managed" as const,
    label: "Self-Managed",
    headline: "You run it.\nThe platform gets out of your way.",
    sub: "Deploy, configure, and control every layer yourself.",
    detail: "Full access to Kubric UIDR, the K-DOCS library, and the open-core platform. Deploy on your terms, your infrastructure.",
    accent: "hsl(145,60%,45%)",
    accentDim: "hsl(145,60%,45%,0.12)",
    badge: "For Engineers",
  },
];

export default function QualificationGate() {
  const navigate = useNavigate();
  const { setPath } = usePath();

  const choose = (id: typeof PATHS[0]["id"]) => {
    setPath(id);
    navigate(`/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080808" }}>
      {/* Top wordmark */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06]">
        <span className="text-[20px] font-bold tracking-tight text-white">
          Manage<span style={{ color: "hsl(24,95%,53%)" }}>Kube</span>
        </span>
        <a
          href="/fully-managed"
          className="text-[13px] text-white/35 hover:text-white/60 transition-colors"
        >
          Skip →
        </a>
      </div>

      {/* Hero text */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-6">
          One Platform. Three Ways to Work With Us.
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center leading-tight mb-4 max-w-3xl">
          How do you want to<br />
          <span style={{ color: "hsl(24,95%,53%)" }}>engage with us?</span>
        </h1>
        <p className="text-white/40 text-lg text-center max-w-xl mb-16 leading-relaxed">
          How you engage with ManageKube depends on how your team operates. Choose your model.
        </p>

        {/* 3 path cards */}
        <div className="grid md:grid-cols-3 gap-5 w-full max-w-5xl">
          {PATHS.map((p) => (
            <button
              key={p.id}
              onClick={() => choose(p.id)}
              className="group relative flex flex-col items-start p-8 rounded-none border text-left transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "#0f0f0f",
                borderColor: "rgba(255,255,255,0.08)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = p.accent;
                (e.currentTarget as HTMLElement).style.background = `color-mix(in srgb, ${p.accent} 6%, #0f0f0f)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background = "#0f0f0f";
              }}
            >
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: p.accent }} />

              {/* Badge */}
              <span
                className="text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-sm mb-6"
                style={{ background: `${p.accent}18`, color: p.accent }}
              >
                {p.badge}
              </span>

              <p className="text-[11px] font-bold tracking-[0.12em] uppercase mb-3" style={{ color: p.accent }}>
                {p.label}
              </p>

              <h2 className="text-2xl font-black text-white leading-tight mb-3 whitespace-pre-line">
                {p.headline}
              </h2>

              <p className="text-[13px] font-semibold mb-4" style={{ color: p.accent }}>
                {p.sub}
              </p>

              <p className="text-[13px] text-white/45 leading-relaxed mb-8 flex-1">
                {p.detail}
              </p>

              <div
                className="flex items-center gap-2 text-[13px] font-bold transition-colors"
                style={{ color: p.accent }}
              >
                This is my model
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Compare link */}
        <p className="mt-10 text-[13px] text-white/30">
          Not sure which model fits?{" "}
          <a href="/methodology" className="text-white/55 hover:text-white underline underline-offset-4 transition-colors">
            Read the comparison →
          </a>
        </p>
      </div>
    </div>
  );
}
