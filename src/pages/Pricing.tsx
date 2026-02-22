/**
 * DO NOT TOUCH - Pricing Page with Global Design Standards
 * Uses PageBanner for consistent header styling
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const pricingModels = [
  {
    name: "Precision Pay™",
    tagline: "Consumption-based",
    description: "Pay only for what you use. Ideal for variable workloads and project-based engagements.",
    examples: ["Tickets resolved", "Endpoints managed", "Hours consumed"],
    bestFor: "Organizations with fluctuating IT needs",
  },
  {
    name: "Flex Core™",
    tagline: "Tiered pricing",
    description: "Predictable monthly pricing based on your organization's size and scope.",
    examples: ["Small: 1-50 employees", "Mid: 51-500 employees", "Enterprise: 500+"],
    bestFor: "Organizations wanting budget predictability",
  },
  {
    name: "Fractional™",
    tagline: "On-demand expertise",
    description: "Access senior expertise (vCIO, vCISO) on a fractional basis without full-time cost.",
    examples: ["4 hours/week vCISO", "8 hours/week vCIO", "Monthly strategic reviews"],
    bestFor: "Organizations needing executive-level guidance",
  },
  {
    name: "APEX™",
    tagline: "As-a-Service",
    description: "Infrastructure delivered as a service. No CapEx, no depreciation, just monthly consumption.",
    examples: ["Servers as a Service", "Storage as a Service", "PCs as a Service"],
    bestFor: "Organizations preferring OpEx over CapEx",
  },
  {
    name: "Project-Based",
    tagline: "Fixed-fee delivery",
    description: "Defined scope, defined timeline, defined price. Perfect for discrete projects.",
    examples: ["Cloud migrations", "Security implementations", "Compliance programs"],
    bestFor: "Organizations with specific project needs",
  },
  {
    name: "Enterprise Custom",
    tagline: "Tailored engagement",
    description: "Custom engagement structures for complex, multi-year transformations.",
    examples: ["Multi-site rollouts", "Global SOC operations", "Digital transformation"],
    bestFor: "Large enterprises with unique requirements",
  },
];

const Pricing = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Six Ways to Pay"
        subtitle="From consumption-based to enterprise custom. Choose the model that matches your business reality. Zero lock-in."
        phase="PRICING"
      />

      {/* Platform Tiers */}
      <section className="py-20 lg:py-28 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">SERVICE TIERS</p>
            <h2 className="text-headline text-white mb-4">Choose Your Service Tier</h2>
            <p className="text-body-lg text-white/60 mb-14 max-w-2xl">
              Three service tiers powered by the Kubric engine. Each maps to the capabilities your organisation needs, from 9 to all 23.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  code: "XRO",
                  name: "Essentials",
                  audience: "10 to 100 Users",
                  desc: "9 capabilities. Your foundation for managed IT and security visibility. Deploy in 48 hours.",
                  kubes: ["Managed NOC", "Help Desk", "MDM", "M365", "NPM", "ITDR", "VDR", "CFDR", "Portal + Ticketing"],
                  href: "/service-tiers/xro-essentials",
                  featured: false,
                },
                {
                  code: "XMX",
                  name: "Advanced",
                  audience: "100 to 500 Users",
                  desc: "16 capabilities. Full-spectrum security operations with real-time detection and response.",
                  kubes: ["All 9 Essentials", "Managed SOC", "CDR", "APM", "BDR", "Compliance Mgmt", "Real-Time Dashboard", "App Threat Containment"],
                  href: "/service-tiers/xmx-advanced",
                  featured: true,
                },
                {
                  code: "XME",
                  name: "Enterprise",
                  audience: "500+ Users / Regulated Industries",
                  desc: "All 23 capabilities. Complete coverage with threat intelligence, deception, and supply chain defense.",
                  kubes: ["All 16 Advanced", "SCDR", "DDR", "TI (STRIKE)", "EASM", "Honeypot", "FinOps", "vCISO"],
                  href: "/service-tiers/xme-enterprise",
                  featured: false,
                },
              ].map((p) => (
                <motion.div
                  key={p.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative bg-white/5 p-8 border flex flex-col ${p.featured ? "border-brand-orange" : "border-white/10"} hover:border-white/30 transition-colors`}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1 uppercase tracking-wider">Most Popular</span>
                    </div>
                  )}
                  <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-2">{p.audience}</p>
                  <h3 className="text-4xl font-black text-white mb-1">{p.code}</h3>
                  <p className="text-sm text-white/50 mb-4">{p.name}</p>
                  <p className="text-sm text-white/60 mb-6 leading-relaxed">{p.desc}</p>
                  <ul className="space-y-1.5 mb-8 flex-1">
                    {p.kubes.map((k) => (
                      <li key={k} className="flex items-center gap-2 text-sm text-white/70">
                        <Check className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                        {k}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={p.href}
                    className={`block text-center py-3 text-sm font-bold uppercase tracking-wider transition-colors ${p.featured ? "bg-brand-orange text-white hover:bg-brand-orange/90" : "border border-white/30 text-white hover:bg-white/10"}`}
                  >
                    Explore {p.code} <ArrowRight size={14} className="inline ml-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Models Heading */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto mb-14">
            <p className="text-label text-brand-orange mb-4">PRICING MODELS</p>
            <h2 className="text-headline text-foreground mb-4">Six Ways to Pay</h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              From consumption-based to enterprise custom. Choose the model that matches your business reality. Combine with any Service Tier above.
            </p>
          </div>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary p-8 border border-border hover:border-foreground transition-colors"
              >
                <p className="text-label text-brand-orange mb-2">{model.tagline}</p>
                <h3 className="text-2xl font-bold text-foreground mb-4">{model.name}</h3>
                <p className="text-muted-foreground mb-6">{model.description}</p>
                
                <p className="text-label text-muted-foreground mb-3">Examples</p>
                <ul className="space-y-2 mb-6">
                  {model.examples.map((example, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-brand-orange" />
                      {example}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best for:</strong> {model.bestFor}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* No Lock-in Section */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-headline text-white mb-6">
              Zero lock-in. Ever.
            </h2>
            <p className="text-body-lg text-white/70 mb-8">
              We do not believe in trapping clients with long-term contracts and exit penalties. 
              Our agreements are designed for flexibility, because if we are not delivering value, 
              you should be able to walk away.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/60">
              <span>✓ 30-day termination clauses</span>
              <span>✓ No data hostage situations</span>
              <span>✓ Full documentation handoff</span>
            </div>
          </div>
        </div>
      </section>

      {/* BOM Add-On Services */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-label text-brand-orange mb-4">ADD-ONS</p>
            <h2 className="text-headline text-foreground mb-4">Professional Services: BOM Add-Ons</h2>
            <p className="text-body-lg text-muted-foreground mb-14 max-w-2xl">
              Standalone services available as add-ons to any Service Tier. Build your Bill of Materials with exactly what you need.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Help Desk",
                  desc: "Tier 1–3 end-user support with SLA-backed resolution, Mac support, and warranty services.",
                  href: "/services/help-desk",
                },
                {
                  name: "Managed IT",
                  desc: "Full-spectrum IT operations: endpoints, IoT, print, O365, data centre, and strategic planning.",
                  href: "/services/managed-it",
                },
                {
                  name: "Smart Hands",
                  desc: "On-site field technicians for rack-and-stack, cabling, hardware swaps, and multi-site rollouts.",
                  href: "/services/smart-hands",
                },
              ].map((svc) => (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 border border-border hover:border-brand-orange transition-colors"
                >
                  <h3 className="text-xl font-bold text-foreground mb-3">{svc.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{svc.desc}</p>
                  <Link
                    to={svc.href}
                    className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-brand-orange hover:opacity-80 transition-opacity"
                  >
                    Learn More <ArrowRight size={13} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-foreground mb-6">
            Not sure which model fits?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Tell us about your organization and we'll recommend the right Service Tier, 
            pricing model, and add-ons for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default Pricing;
