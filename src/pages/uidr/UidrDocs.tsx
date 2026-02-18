import { Link } from "react-router-dom";
import { UidrLayout } from "@/components/UidrLayout";
import {
  BookOpen, Shield, FileText, Wrench, Users, Lock, ExternalLink,
} from "lucide-react";

const docCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Onboarding guides, platform overview, and your first assessment walkthrough.",
    links: [
      { label: "Platform Overview", href: "/our-tools/how-kubric-works" },
      { label: "Onboard Today", href: "/assessment" },
      { label: "Understanding Kubes", href: "/kubes" },
    ],
  },
  {
    icon: Shield,
    title: "Kubes Reference",
    description: "Deep-dive documentation on all 15 detection and response modules.",
    links: [
      { label: "All 15 Kubes", href: "/kubes" },
      { label: "CIO Kube", href: "/kubes/cio-kube" },
      { label: "ITDR Kube", href: "/kubes/itdr-kube" },
      { label: "NDR Kube", href: "/kubes/ndr-kube" },
      { label: "GRC Kube", href: "/kubes/grc-kube" },
    ],
  },
  {
    icon: FileText,
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
    icon: Wrench,
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
      { label: "Healthcare (H2BLOCK)", href: "/solutions/healthcare" },
      { label: "Manufacturing (M2BLOCK)", href: "/solutions/manufacturing" },
      { label: "Financial Services (F2BLOCK)", href: "/solutions/financial-services" },
      { label: "Public Sector", href: "/solutions/public-sector" },
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

export default function UidrDocs() {
  return (
    <UidrLayout>
      <div className="min-h-screen bg-secondary">
        {/* Header bar */}
        <div className="border-b border-border bg-background px-8 py-4 flex items-center justify-between">
          <Link to="/uidr" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Kubric UIDR
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-foreground transition-colors">SUPPORT</Link>
            <span className="text-border">|</span>
            <Link to="/login/client" className="hover:text-foreground transition-colors">LOG IN</Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-foreground mb-3">Kubric Documentation</h1>
            <p className="text-muted-foreground text-lg">Everything you need to deploy, configure, and operate the Kubric platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {docCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-background border border-border p-8 hover:shadow-md transition-shadow"
              >
                <div className="mb-5">
                  <cat.icon size={28} className="text-brand-orange" />
                </div>
                <h2 className="text-xl font-black text-foreground mb-3">{cat.title}</h2>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{cat.description}</p>
                <ul className="space-y-2">
                  {cat.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-foreground/70 hover:text-brand-orange transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Docs CTA — password protected */}
          <div className="mt-8 border border-border bg-background p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-border flex-shrink-0">
                <Lock size={20} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-black text-foreground mb-1">Technical Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Full K-DOCS monorepo explorer — 23 documents, 120k+ detection rules, orchestration assets, and internal reference. Authorised personnel only.
                </p>
              </div>
            </div>
            <Link
              to="/uidr/technical-docs"
              className="flex-shrink-0 flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              Access Technical Docs
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </UidrLayout>
  );
}
