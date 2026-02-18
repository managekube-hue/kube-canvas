/**
 * DO NOT TOUCH - Kubes Overview Page
 * Updated design with gradient banner headers
 * Functionality and UI design are COMPLETED - do not modify
 */

import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const kubes = [
  {
    id: "assessment",
    name: "Assessment Kube",
    tagline: "FREE entry point",
    description: "The starting point for every engagement. Infrastructure inventory, security assessment, compliance mapping, and a prioritized remediation roadmap.",
    href: "/kubes/assessment-kube",
    phase: "ASSESS",
  },
  {
    id: "compliance",
    name: "Compliance Kube",
    tagline: "Framework gaps closed",
    description: "Turn assessment gaps into a compliance program. SOC 2, HIPAA, CMMC, ISO 27001, PCI DSS. Gap remediation, evidence automation, policy development.",
    href: "/kubes/compliance-kube",
    phase: "ASSESS",
  },
  {
    id: "mssp",
    name: "MSSP Kube",
    tagline: "24/7 SOC operations",
    description: "Continuous threat detection and response. 24/7 SOC monitoring, managed EDR/XDR, vulnerability management, Zero Trust architecture.",
    href: "/kubes/mssp-kube",
    phase: "MANAGE",
  },
  {
    id: "msp",
    name: "MSP Kube",
    tagline: "NOC & Service Desk",
    description: "Fully managed or co-managed infrastructure. L1-L3 service desk, hybrid infrastructure, managed workplace, BCDR.",
    href: "/kubes/msp-kube",
    phase: "MANAGE",
  },
  {
    id: "advisory",
    name: "Advisory Kube",
    tagline: "vCIO & vCISO",
    description: "Virtual executive roles and strategic consulting. Security governance, IT strategic planning, Cloud FinOps, M&A due diligence.",
    href: "/kubes/advisory-kube",
    phase: "OPTIMIZE",
  },
  {
    id: "innovation",
    name: "Innovation Kube",
    tagline: "AI & Automation",
    description: "AI-driven automation and modern software delivery. Hyperautomation, DevSecOps, data intelligence with watsonx, custom development.",
    href: "/kubes/innovation-kube",
    phase: "OPTIMIZE",
  },
  {
    id: "industry",
    name: "Industry Kube",
    tagline: "9 vertical platforms",
    description: "Pre-integrated platforms combining Dell infrastructure and IBM software specifically architected for your vertical.",
    href: "/kubes/industry-kube",
    phase: "REMEDIATE",
  },
  {
    id: "product",
    name: "Product Kube",
    tagline: "Dell & IBM partnership",
    description: "Strategic partnerships delivering validated reference architectures and certified expertise. Project implementation and procurement configurator.",
    href: "/kubes/product-kube",
    phase: "REMEDIATE",
  },
];

const KubesOverview = () => {
  return (
    <PageLayout>
      {/* Gradient Banner */}
      <PageBanner
        title="Eight Integrated Kubes"
        subtitle="Each Kube serves a specific function in the Assess → Remediate → Manage → Optimize cycle. Together, they deliver end-to-end IT transformation."
        phase="CAPABILITIES"
      />

      {/* Kubes List */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {kubes.map((kube, index) => (
              <motion.div
                key={kube.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={kube.href}
                  className="block border-t border-border py-12 lg:py-16 group hover:bg-white transition-colors -mx-6 lg:-mx-12 px-6 lg:px-12"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4">
                      <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-2 group-hover:translate-x-2 transition-transform">
                        {kube.name}
                      </h2>
                      <span className="font-mono text-sm text-muted-foreground">{kube.tagline}</span>
                    </div>
                    <div className="lg:col-span-6">
                      <p className="font-mono text-lg text-muted-foreground leading-relaxed">{kube.description}</p>
                    </div>
                    <div className="lg:col-span-2 flex items-center justify-end">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-muted-foreground">{kube.phase}</span>
                        <ArrowRight className="w-6 h-6 text-foreground group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Not sure which Kube to start with?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Take our free assessment to get personalized recommendations based on your infrastructure, security, and compliance needs.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </PageLayout>
  );
};

export default KubesOverview;
