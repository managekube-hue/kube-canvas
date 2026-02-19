import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathSwitcher } from "@/components/PathSwitcher";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { ArrowRight, Layers, Zap, Users, BookOpen, CheckCircle } from "lucide-react";

/** DO NOT TOUCH — Co-Managed Home */

const CO_ACCENT = "hsl(210,70%,55%)";
const CO_ACCENT_DIM = "hsl(210,70%,55%,0.1)";

const PILLARS = [
  { icon: Layers, label: "Kubric Kubes", desc: "Pre-built detection and response modules your team deploys and controls.", href: "/kubes" },
  { icon: Zap, label: "Engineer Escalation", desc: "On-demand access to Kubric engineers when incidents exceed your team's bandwidth.", href: "/services/managed-soc" },
  { icon: BookOpen, label: "K-DOCS Playbooks", desc: "120k+ detection assets and runbooks available to your team immediately.", href: "/uidr/docs" },
  { icon: Users, label: "Collaboration Layer", desc: "Shared ticketing, project tracking, and executive reporting in one place.", href: "/contact" },
];

const OUTCOMES = [
  "Your team stays in control of day-to-day operations",
  "Kubric platform handles detection, alerting, and enrichment",
  "Escalate to our engineers only when you need to",
  "Access to every Kube module your contract includes",
  "Shared reporting with your leadership and ours",
];

export default function CoManaged() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Path switcher strip */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl py-3">
          <PathSwitcher />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-background py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-4xl">
            <p
              className="text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
              style={{ color: CO_ACCENT }}
            >
              Co-Managed
            </p>
            <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-tight mb-6">
              Your team runs it.<br />
              <span style={{ color: CO_ACCENT }}>Our platform backs you up.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl">
              Kubes, tooling, and engineer escalation on demand.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              You keep control of daily operations. We provide the platform, playbooks, and escalation support when your team needs backup.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all hover:opacity-90"
                style={{ background: CO_ACCENT }}
              >
                Start Collaborating <ArrowRight size={16} />
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-off-white py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: CO_ACCENT }}>
                The Partnership Model
              </p>
              <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
                Control without the overhead.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Co-managed means your IT leadership stays in the driver's seat while Kubric handles the platform complexity, detection assets, and escalation paths your team shouldn't have to build alone.
              </p>
            </div>
            <ul className="space-y-4">
              {OUTCOMES.map(o => (
                <li key={o} className="flex items-start gap-3">
                  <CheckCircle size={18} style={{ color: CO_ACCENT }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: CO_ACCENT }}>
            What You Get Access To
          </p>
          <h2 className="text-4xl font-black text-foreground mb-12">
            The full platform. Your team's hands on it.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map(p => (
              <Link
                key={p.label}
                to={p.href}
                className="group p-8 border border-border hover:border-[hsl(210,70%,55%)] transition-colors bg-background"
              >
                <p.icon size={28} style={{ color: CO_ACCENT }} className="mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[hsl(210,70%,55%)] transition-colors">{p.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                <span className="text-sm font-semibold flex items-center gap-1" style={{ color: CO_ACCENT }}>
                  Learn more <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA dark */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: CO_ACCENT }}>
              Ready to Partner?
            </p>
            <h2 className="text-4xl font-black text-white mb-6">
              Start with a technical scoping call.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              We'll map out which Kubes your environment needs, which your team handles, and where escalation paths make sense.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all hover:opacity-90"
              style={{ background: CO_ACCENT }}
            >
              Book a Scoping Call <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <PathfinderCTA />
      <Footer />
    </div>
  );
}
