import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathSwitcher } from "@/components/PathSwitcher";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { ArrowRight, Shield, Cloud, BarChart3, HeadphonesIcon, CheckCircle } from "lucide-react";

/** DO NOT TOUCH — Fully Managed Home */

const SERVICES = [
  { icon: HeadphonesIcon, label: "Managed NOC", desc: "24/7 network operations monitoring and response.", href: "/services/managed-noc" },
  { icon: Shield, label: "Managed SOC", desc: "Continuous threat detection, triage, and remediation.", href: "/services/managed-soc" },
  { icon: CheckCircle, label: "Managed Compliance", desc: "Ongoing compliance posture management across all frameworks.", href: "/services/managed-compliance" },
  { icon: Cloud, label: "Managed Cloud", desc: "Full lifecycle cloud infrastructure management.", href: "/services/managed-cloud" },
  { icon: BarChart3, label: "Security Assessments", desc: "Scheduled vulnerability and security posture assessments.", href: "/services/security-assessments" },
];

const OUTCOMES = [
  "Zero silos between NOC, SOC, and compliance",
  "Single dedicated account team for all operations",
  "Guaranteed SLAs across every managed function",
  "Monthly executive reporting and business reviews",
  "Continuous improvement through the Kubric framework",
];

export default function FullyManaged() {
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
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-orange mb-6">Fully Managed</p>
            <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-tight mb-6">
              One Service Provider.<br />
              <span className="text-brand-orange">Zero Silos.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl">
              Complete visibility across NOC, SOC, and business operations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              We manage your infrastructure, security, and compliance so you can focus on growth. One team. One platform. Every operation covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/assessment" className="btn-primary flex items-center gap-2">
                Onboard Today <ArrowRight size={16} />
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
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-orange mb-4">What You Get</p>
              <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
                Outcomes you can measure.<br />Operations we own.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every contract includes a dedicated account team, transparent reporting, and a commitment to continuous improvement across every managed service.
              </p>
            </div>
            <ul className="space-y-4">
              {OUTCOMES.map(o => (
                <li key={o} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-orange mb-4">What We Run For You</p>
          <h2 className="text-4xl font-black text-foreground mb-12">
            Every operation. Fully covered.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <Link
                key={s.label}
                to={s.href}
                className="group p-8 border border-border hover:border-brand-orange transition-colors bg-background"
              >
                <s.icon size={28} className="text-brand-orange mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">{s.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-brand-orange text-sm font-semibold flex items-center gap-1">
                  Learn more <ArrowRight size={13} />
                </span>
              </Link>
            ))}
            {/* View all */}
            <Link
              to="/services"
              className="group p-8 border border-dashed border-border hover:border-brand-orange transition-colors flex flex-col items-center justify-center text-center"
            >
              <p className="text-foreground font-bold mb-1">View All Services</p>
              <p className="text-muted-foreground text-sm">16 specialized modules managed by our team.</p>
              <ArrowRight size={20} className="text-brand-orange mt-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform CTA */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-orange mb-4">The Platform Running Behind Your Managed Services</p>
            <h2 className="text-4xl font-black text-white mb-6">Built to unify every operation we run for you.</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Kubric UIDR is the orchestration engine that gives your account team, NOC, SOC, and compliance operations a single source of operational truth.
            </p>
            <Link to="/our-tools/how-kubric-works" className="btn-primary inline-flex items-center gap-2">
              See What We Run For You <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <PathfinderCTA />
      <Footer />
    </div>
  );
}
