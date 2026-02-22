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
            <p className="text-label text-brand-orange mb-4">PLATFORMS</p>
            <h2 className="text-headline text-white mb-4">Choose Your Platform</h2>
            <p className="text-body-lg text-white/60 mb-14 max-w-2xl">
              Three purpose-built platforms powered by the Kubric platform. Each maps to the modules your organisation needs — from 7 to all 18.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  code: "XRO",
                  name: "Small Business Platform",
                  audience: "1–50 Employees",
                  desc: "7 essential modules. Complete security and operations for small businesses. Deploy in 48 hours.",
                  kubes: ["CIO", "NPM", "ITDR", "NDR", "VDR", "CFDR", "GRC"],
                  href: "/service-tiers/xro-essentials",
                  featured: false,
                },
                {
                  code: "XMX",
                  name: "Advanced Platform",
                  audience: "50–500 Employees",
                  desc: "12 modules. Advanced detection, response, and compliance for growing organizations.",
                  kubes: ["All 7 XRO Modules", "MDM", "APM", "CDR", "ADR", "BDR"],
                  href: "/service-tiers/xmx-advanced",
                  featured: true,
                },
                {
                  code: "XME",
                  name: "Enterprise Platform",
                  audience: "500+ Employees",
                  desc: "All 18 modules. Full enterprise coverage with premium KubricAI orchestration capabilities.",
                  kubes: ["All 12 XMX Modules", "SDR", "DDR", "TI", "STRIKE", "EASM", "HONEYPOT"],
                  href: "/service-tiers/xme-enterprise",
                  featured: false,
                },
              ].map((p) => (
                <motion.div
                  key={p.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative bg-white/5 p-8 border ${p.featured ? "border-brand-orange" : "border-white/10"} hover:border-white/30 transition-colors`}
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
                  <ul className="space-y-1.5 mb-8">
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

      {/* Pricing Models */}
      <section className="py-20 lg:py-32 bg-white">
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
      </section>

      {/* No Lock-in Section */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-headline text-white mb-6">
              Zero lock-in. Ever.
            </h2>
            <p className="text-body-lg text-white/70 mb-8">
              We don't believe in trapping clients with long-term contracts and exit penalties. 
              Our agreements are designed for flexibility—because if we're not delivering value, 
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

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-headline text-foreground mb-6">
            Not sure which model fits?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Take our free assessment and we'll recommend the pricing model that 
            best matches your organization's size, needs, and budget preferences.
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
