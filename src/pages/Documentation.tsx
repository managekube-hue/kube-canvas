import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shield, Settings, Layers, Users, FileText } from "lucide-react";

const docSections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Onboarding guides, platform overview, and your first assessment walkthrough.",
    links: [
      { label: "Platform Overview", href: "/our-tools/how-kubric-works" },
      { label: "Start Your Assessment", href: "/assessment" },
      { label: "Understanding Kubes", href: "/kubes" },
    ],
  },
  {
    icon: Layers,
    title: "Kubes Reference",
    description: "Deep-dive documentation on all 15 detection and response modules.",
    links: [
      { label: "All 15 Kubes", href: "/kubes" },
      { label: "CIO Kube", href: "/kubes/cio-kube" },
      { label: "MSSP Kube (SOC)", href: "/kubes/mssp-kube" },
      { label: "MSP Kube (NOC)", href: "/kubes/msp-kube" },
    ],
  },
  {
    icon: Shield,
    title: "Compliance Frameworks",
    description: "Framework-specific guides for CMMC, HIPAA, SOC 2, NIST, and more.",
    links: [
      { label: "CMMC", href: "/compliance/cmmc" },
      { label: "HIPAA", href: "/compliance/hipaa" },
      { label: "SOC 2", href: "/compliance/soc2" },
      { label: "NIST 800-171", href: "/compliance/nist-800-171" },
      { label: "PCI-DSS", href: "/compliance/pci-dss" },
    ],
  },
  {
    icon: Settings,
    title: "Platform Tools",
    description: "Kubric UIDR, Data Graph, and KubricAI technical documentation.",
    links: [
      { label: "Kubric UIDR Platform", href: "/our-tools/kubric-uidr" },
      { label: "Kubric Data Graph", href: "/our-tools/kubric-data-graph" },
      { label: "KubricAI", href: "/our-tools/kubric-ai" },
    ],
  },
  {
    icon: Users,
    title: "Industry Solutions",
    description: "Vertical-specific architecture guides for your sector.",
    links: [
      { label: "Healthcare (H2BLOCK)", href: "/industries/healthcare" },
      { label: "Manufacturing (M2BLOCK)", href: "/industries/manufacturing" },
      { label: "Financial Services (F2BLOCK)", href: "/industries/financial-services" },
      { label: "Public Sector", href: "/industries/public-sector" },
    ],
  },
  {
    icon: FileText,
    title: "Pricing & Contracts",
    description: "Pricing models, engagement structures, and SLA documentation.",
    links: [
      { label: "Six Pricing Models", href: "/pricing" },
      { label: "Enterprise Custom", href: "/contact" },
    ],
  },
];

export default function Documentation() {
  return (
    <PageLayout>
      <PageBanner
        title="Documentation"
        subtitle="Guides, references, and technical documentation for the ManageKube platform, Kubes, compliance frameworks, and tools."
        phase="RESOURCES"
      />

      {/* Doc Sections Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-secondary p-8 border border-border"
              >
                <section.icon className="w-8 h-8 text-brand-orange mb-6" />
                <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{section.description}</p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="flex items-center justify-between text-sm font-medium text-foreground hover:text-brand-orange transition-colors group"
                      >
                        <span>{link.label}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-orange" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-white/70 mb-8">
              Our solutions architects are available to walk you through any aspect of the platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-semibold hover:bg-brand-orange/90 transition-colors"
              >
                Contact Support <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 font-semibold hover:bg-white/10 transition-colors"
              >
                Start Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
