/** DO NOT TOUCH — v2.0 spec copy */
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const tiers = [
  {
    name: "Essentials",
    market: "SMB — 10 to 100 users",
    tagline: "Your foundation for managed IT and security visibility",
    price: "Scored by Assessment",
    priceUnit: "",
    methodology: "Hunt → Identify → Alert → Triage",
    capabilities: [
      "Managed NOC (24/7)", "Help Desk & Desktop Support", "Mobile Device Management",
      "Microsoft 365 Management", "Network Performance Monitoring",
      "Identity Threat Detection & Response", "Vulnerability Detection & Prioritization",
      "Configuration Drift Detection", "Customer Portal + Ticketing",
    ],
    href: "/service-tiers/xro-essentials",
    cta: "Start with Essentials",
    ctaHref: "/get-started?tier=essentials",
    featured: false,
  },
  {
    name: "Advanced",
    market: "SME — 100 to 500 users",
    tagline: "Full-spectrum security operations with real-time detection and response",
    price: "Scored by Assessment",
    priceUnit: "",
    methodology: "Hunt → Identify → Alert → Triage → Diagnose → Remediate",
    capabilities: [
      "Everything in Essentials", "Managed SOC (24/7)", "Cloud Detection & Response",
      "Application Performance Monitoring", "Application Threat Containment",
      "Backup & Disaster Recovery", "Compliance Management", "Real-Time Visibility Dashboard",
    ],
    href: "/service-tiers/xmx-advanced",
    cta: "Get Advanced",
    ctaHref: "/get-started?tier=advanced",
    featured: true,
  },
  {
    name: "Enterprise",
    market: "Enterprise — 500+ users / regulated industries",
    tagline: "Complete coverage with threat intelligence, deception, and supply chain defense",
    price: "Scored by Assessment",
    priceUnit: "",
    methodology: "Full lifecycle: Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close",
    capabilities: [
      "Everything in Advanced", "Software Supply Chain Detection & Response",
      "Data Exfiltration Detection & Response", "STRIKE Strategic Intelligence",
      "External Attack Surface Management", "Honeypot & Deception Network",
      "FinOps & Cloud Cost Governance", "Dedicated Advisory / vCISO Access",
    ],
    href: "/service-tiers/xme-enterprise",
    cta: "Talk to Enterprise Team",
    ctaHref: "/get-started?tier=enterprise",
    featured: false,
  },
];

export default function Products() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.55 }}>
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,12,12,0.80) 25%, rgba(12,12,12,0.45) 60%, rgba(12,12,12,0.25) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,12,12,0.90) 0%, transparent 40%, rgba(12,12,12,0.35) 100%)" }} />
        </div>
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10 py-32 lg:py-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-4">Service Tiers</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              The commercial gateway. Each tier is defined by the capabilities active in the Service Layer, not by module codes. Tier comparison, capability mapping, and a clear path forward.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Tier Comparison */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-2">Tier Comparison</p>
            <h2 className="text-3xl font-black text-foreground">Choose Your Tier</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative bg-white p-8 ${t.featured ? "ring-2 ring-brand-orange" : "border border-border"}`}>
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1 uppercase tracking-wider">Most Popular</span>
                  </div>
                )}
                <div className="mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">{t.market}</span>
                  <h2 className="text-2xl font-black mt-2 mb-1">{t.name}</h2>
                  <p className="text-2xl font-black mt-2" style={{ color: "#993619" }}>{t.price}<span className="text-sm font-normal text-muted-foreground">{t.priceUnit}</span></p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t.tagline}</p>
                <p className="text-xs text-muted-foreground/60 mb-6">{t.methodology}</p>
                <ul className="space-y-2 mb-8">
                  {t.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-brand-orange flex-shrink-0" /> {cap}
                    </li>
                  ))}
                </ul>
                <Link to={t.ctaHref} className={`block text-center py-3 text-sm font-bold uppercase tracking-wider transition-colors ${t.featured ? "bg-brand-orange text-white hover:bg-brand-orange/90" : "border border-foreground hover:bg-foreground hover:text-white"}`}>
                  {t.cta} <ArrowRight size={14} className="inline ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/service-tiers/custom" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-orange transition-colors border border-border px-6 py-3">
              Custom Tier <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-black text-foreground mb-4">Not sure where to start?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Run a free assessment and we'll build your transformation roadmap — scoped to your size, budget, and compliance requirements.
          </p>
          <Link to="/get-started" className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
