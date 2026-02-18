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
      <div className="min-h-screen" style={{ background: "#f4f4f5" }}>
        {/* Header bar */}
        <div className="border-b px-8 py-4 flex items-center justify-between" style={{ background: "#ffffff", borderColor: "#e4e4e7" }}>
          <Link to="/uidr" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "#71717a" }}>
            ← Back to Kubric UIDR
          </Link>
          <div className="flex items-center gap-6 text-sm" style={{ color: "#71717a" }}>
            <Link to="/contact" className="hover:opacity-70 transition-opacity">SUPPORT</Link>
            <span style={{ color: "#d4d4d8" }}>|</span>
            <Link to="/login/client" className="hover:opacity-70 transition-opacity">LOG IN</Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-black mb-3" style={{ color: "#09090b" }}>Kubric Documentation</h1>
            <p className="text-lg" style={{ color: "#71717a" }}>Everything you need to deploy, configure, and operate the Kubric platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {docCategories.map((cat) => (
              <div
                key={cat.title}
                className="p-8 hover:shadow-md transition-shadow border"
                style={{ background: "#ffffff", borderColor: "#e4e4e7" }}
              >
                <div className="mb-5">
                  <cat.icon size={28} className="text-brand-orange" />
                </div>
                <h2 className="text-xl font-black mb-3" style={{ color: "#09090b" }}>{cat.title}</h2>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "#71717a" }}>{cat.description}</p>
                <ul className="space-y-2">
                  {cat.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm hover:text-brand-orange transition-colors"
                        style={{ color: "#3f3f46" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Docs CTA */}
          <div className="mt-8 border p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ background: "#ffffff", borderColor: "#e4e4e7" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center border flex-shrink-0" style={{ borderColor: "#e4e4e7" }}>
                <Lock size={20} style={{ color: "#a1a1aa" }} />
              </div>
              <div>
                <h3 className="text-xl font-black mb-1" style={{ color: "#09090b" }}>Technical Documentation</h3>
                <p className="text-sm" style={{ color: "#71717a" }}>
                  Full K-DOCS monorepo explorer — 23 documents, 120k+ detection rules, orchestration assets, and internal reference. Authorised personnel only.
                </p>
              </div>
            </div>
            <Link
              to="/uidr/technical-docs"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
              style={{ background: "#09090b", color: "#ffffff" }}
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
