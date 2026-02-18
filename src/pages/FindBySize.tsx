/**
 * DO NOT TOUCH - Business Size Navigation Page
 * Maps solutions by organization size (SMB to Enterprise)
 * Functionality and UI design are COMPLETED - do not modify
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Building, Building2, Globe, Check } from "lucide-react";

const businessSizes = [
  {
    id: "smb",
    name: "Small Business",
    subtitle: "1-50 employees",
    icon: Users,
    description: "Essential security and IT management for growing businesses. Get enterprise-grade protection without enterprise complexity.",
    recommendedKubes: [
      { name: "Assessment Kube", href: "/kubes/assessment-kube", reason: "Free starting point" },
      { name: "MSP Kube", href: "/kubes/msp-kube", reason: "Managed IT support" },
      { name: "MSSP Kube", href: "/kubes/mssp-kube", reason: "Security basics" },
    ],
    features: [
      "Managed endpoint protection",
      "24/7 help desk support",
      "Cloud backup & disaster recovery",
      "Basic compliance support",
    ],
    investmentRange: "$2,500 - $7,500/month",
  },
  {
    id: "midmarket",
    name: "Mid-Market",
    subtitle: "51-500 employees",
    icon: Building,
    description: "Comprehensive security and IT operations for scaling organizations. Balance control with managed services.",
    recommendedKubes: [
      { name: "Assessment Kube", href: "/kubes/assessment-kube", reason: "Gap analysis" },
      { name: "Compliance Kube", href: "/kubes/compliance-kube", reason: "SOC 2, HIPAA readiness" },
      { name: "MSSP Kube", href: "/kubes/mssp-kube", reason: "Full SOC operations" },
      { name: "MSP Kube", href: "/kubes/msp-kube", reason: "Hybrid IT management" },
    ],
    features: [
      "24/7 SOC monitoring",
      "Multi-framework compliance",
      "Hybrid infrastructure management",
      "vCISO advisory services",
      "Business continuity planning",
    ],
    investmentRange: "$10,000 - $35,000/month",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "501-5,000 employees",
    icon: Building2,
    description: "Full-stack transformation for complex, multi-site organizations. Enterprise security, compliance, and innovation.",
    recommendedKubes: [
      { name: "Assessment Kube", href: "/kubes/assessment-kube", reason: "Full discovery" },
      { name: "Compliance Kube", href: "/kubes/compliance-kube", reason: "Enterprise GRC" },
      { name: "MSSP Kube", href: "/kubes/mssp-kube", reason: "Advanced threat ops" },
      { name: "Advisory Kube", href: "/kubes/advisory-kube", reason: "vCIO/vCISO leadership" },
      { name: "Innovation Kube", href: "/kubes/innovation-kube", reason: "AI & automation" },
    ],
    features: [
      "Advanced threat hunting",
      "Zero Trust architecture",
      "Multi-cloud security",
      "AI-powered automation",
      "Strategic IT planning",
      "M&A due diligence",
    ],
    investmentRange: "$50,000 - $150,000/month",
  },
  {
    id: "global-enterprise",
    name: "Global Enterprise",
    subtitle: "5,000+ employees",
    icon: Globe,
    description: "Comprehensive managed services for global organizations. Multi-region security operations and digital transformation.",
    recommendedKubes: [
      { name: "Full Kube Suite", href: "/kubes", reason: "All 8 Kubes" },
      { name: "Industry Kube", href: "/kubes/industry-kube", reason: "Vertical solutions" },
      { name: "Product Kube", href: "/kubes/product-kube", reason: "Infrastructure refresh" },
    ],
    features: [
      "Multi-region SOC operations",
      "Global compliance programs",
      "Enterprise AI initiatives",
      "Digital transformation",
      "Custom integration development",
      "Dedicated account team",
      "Executive security briefings",
    ],
    investmentRange: "Custom engagement",
  },
];

const FindBySize = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Solutions by Business Size"
        subtitle="From startup to global enterprise, find the right combination of Kubes for your organization's scale and complexity."
        phase="PATHFINDER"
      />

      {/* Size Cards */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-8">
            {businessSizes.map((size, index) => (
              <motion.div
                key={size.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-border hover:border-foreground transition-colors"
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Left - Size Info */}
                  <div className="p-8 lg:p-12 bg-secondary border-b lg:border-b-0 lg:border-r border-border">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-foreground rounded-lg flex items-center justify-center">
                        <size.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{size.name}</h3>
                        <p className="text-sm text-muted-foreground">{size.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{size.description}</p>
                    <div className="pt-6 border-t border-border">
                      <p className="text-label text-muted-foreground mb-2">TYPICAL INVESTMENT</p>
                      <p className="text-xl font-bold text-brand-orange">{size.investmentRange}</p>
                    </div>
                  </div>

                  {/* Middle - Recommended Kubes */}
                  <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border">
                    <p className="text-label text-muted-foreground mb-6">RECOMMENDED KUBES</p>
                    <div className="space-y-3">
                      {size.recommendedKubes.map((kube) => (
                        <Link
                          key={kube.name}
                          to={kube.href}
                          className="flex items-center justify-between p-4 bg-white border border-border hover:border-foreground transition-colors group"
                        >
                          <div>
                            <p className="font-semibold text-foreground group-hover:text-brand-orange transition-colors">
                              {kube.name}
                            </p>
                            <p className="text-sm text-muted-foreground">{kube.reason}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right - Features */}
                  <div className="p-8 lg:p-12">
                    <p className="text-label text-muted-foreground mb-6">KEY CAPABILITIES</p>
                    <ul className="space-y-3">
                      {size.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Bar */}
                <div className="flex items-center justify-between p-6 bg-foreground">
                  <p className="text-white/80">
                    Ready to explore {size.name.toLowerCase()} solutions?
                  </p>
                  <div className="flex gap-4">
                    <Link
                      to="/assessment"
                      className="px-6 py-3 bg-brand-orange text-white font-semibold hover:bg-opacity-90 transition-colors"
                    >
                      Take Assessment
                    </Link>
                    <Link
                      to="/contact"
                      className="px-6 py-3 bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Compare */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-label text-muted-foreground mb-4">NOT SURE WHERE YOU FIT?</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Take the free assessment
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI-powered assessment analyzes your infrastructure, security posture, and compliance needs 
              to recommend the exact Kube combination for your organization.
            </p>
          </div>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-opacity-90 transition-colors"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </PageLayout>
  );
};

export default FindBySize;
