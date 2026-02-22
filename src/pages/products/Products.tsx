import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import childPageVideo from "@/assets/child-page.mp4";

const platforms = [
  {
    code: "XRO",
    name: "Small Business Platform",
    audience: "Small Business",
    tagline: "Complete security and operations for small businesses with 7 essential Kubes.",
    kubes: ["CIO KUBE", "NPM KUBE", "ITDR KUBE", "NDR KUBE", "VDR KUBE", "CFDR KUBE", "GRC KUBE"],
    href: "/service-tiers/xro-essentials",
    featured: false,
  },
  {
    code: "XMX",
    name: "Advanced Platform",
    audience: "Small/Medium Enterprise",
    tagline: "Advanced security and operations for growing organisations with 12 modules.",
    kubes: ["All 7 XRO Modules", "MDM", "APM", "CDR", "ADR", "BDR"],
    href: "/service-tiers/xmx-advanced",
    featured: true,
  },
  {
    code: "XME",
    name: "Enterprise Platform",
    audience: "Enterprise",
    tagline: "Complete enterprise coverage with all 18 modules and premium capabilities.",
    kubes: ["All 12 XMX Modules", "SDR", "DDR", "TI", "STRIKE", "EASM", "HONEYPOT"],
    href: "/service-tiers/xme-enterprise",
    featured: false,
  },
];

const services = [
  {
    category: "MANAGED SERVICES",
    items: [
      { label: "Managed NOC", description: "24/7 network operations centre monitoring and response", href: "/services/managed-noc" },
      { label: "Managed SOC", description: "24/7 security operations centre with threat hunting and IR", href: "/services/managed-soc" },
      { label: "Managed Compliance", description: "Continuous compliance management across 100+ frameworks", href: "/services/managed-compliance" },
      { label: "Managed Cloud", description: "Multi-cloud management for AWS, Azure, and GCP", href: "/services/managed-cloud" },
    ],
  },
  {
    category: "PROFESSIONAL SERVICES",
    items: [
      { label: "Security Assessments", description: "Comprehensive security posture analysis and roadmap", href: "/services/security-assessments" },
      { label: "Penetration Testing", description: "Adversarial testing by certified ethical hackers", href: "/services/penetration-testing" },
      { label: "Compliance Gap Analysis", description: "Identify gaps against CMMC, HIPAA, SOC 2, and more", href: "/services/compliance-gap-analysis" },
      { label: "Infrastructure Audits", description: "Full infrastructure review with remediation planning", href: "/services/infrastructure-audits" },
      { label: "Right-Sizing", description: "Cloud and infrastructure cost optimisation", href: "/services/right-sizing" },
      { label: "Network Buildouts", description: "Enterprise network design, deployment, and documentation", href: "/services/network-buildouts" },
      { label: "Physical Security", description: "Physical access control, CCTV, and site hardening", href: "/services/physical-security" },
      { label: "Custom Automation", description: "Bespoke workflow and process automation development", href: "/services/custom-automation" },
      { label: "Legacy Integrations", description: "Connect legacy systems to modern security infrastructure", href: "/services/legacy-integrations" },
    ],
  },
];

export default function Products() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-black min-h-[42vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src={childPageVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-1 w-16 bg-brand-orange mb-8" />
            <h1 className="text-headline text-white mb-4">Service Tiers</h1>
            <p className="text-body-xl text-white/70 max-w-2xl">
              Purpose-built security and operations platforms. &gt;90% MITRE ATT&CK coverage. Unified threat detection, correlation, and automated response powered by the Kubric Data Graph and KubricAI.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Platform Packages */}
      <section className="section-off-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-2 font-mono">// PLATFORM PACKAGES</p>
            <h2 className="text-3xl font-black text-foreground">Choose What's Right For You</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {platforms.map((p, i) => (
              <motion.div key={p.code} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative bg-white p-8 ${p.featured ? "ring-2 ring-brand-orange" : "border border-border"}`}>
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1 uppercase tracking-wider">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">{p.audience}</span>
                  <h2 className="text-3xl font-black mt-2 mb-1">{p.code}</h2>
                  <p className="text-sm font-semibold text-muted-foreground">{p.name}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{p.tagline}</p>
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3">Included Kubes</h4>
                  <ul className="space-y-2">
                    {p.kubes.map((k) => (
                      <li key={k} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-brand-orange flex-shrink-0" />
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={p.href} className={`block text-center py-3 text-sm font-bold uppercase tracking-wider transition-colors ${p.featured ? "bg-brand-orange text-white hover:bg-brand-orange/90" : "border border-foreground hover:bg-foreground hover:text-white"}`}>
                  Learn More <ArrowRight size={14} className="inline ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/service-tiers/custom" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-orange transition-colors border border-border px-6 py-3">
              Custom Configuration <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((group) => (
        <section key={group.category} className="py-16 border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-8 font-mono">// {group.category}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to={item.href}
                    className="block p-6 border border-border bg-white hover:border-brand-orange group transition-colors"
                  >
                    <h3 className="font-bold text-foreground group-hover:text-brand-orange transition-colors mb-2">{item.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-brand-orange font-semibold">
                      Learn more <ArrowRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-black text-foreground mb-4">Not sure where to start?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Run a free assessment and we'll build your transformation roadmap — scoped to your size, budget, and compliance requirements.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Onboard Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
