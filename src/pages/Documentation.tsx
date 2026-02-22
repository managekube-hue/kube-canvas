import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { PageBanner } from "@/components/PageBanner";
import {
  BookOpen,
  Shield,
  FileText,
  Wrench,
  Users,
  DollarSign,
  Lock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const docCards = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description:
      "Onboarding guides, platform overview, and your first assessment walkthrough. Everything you need to get operational with Kubric fast.",
    links: [
      { label: "Platform Overview", href: "/our-tools/how-kubric-works" },
      { label: "Get Started", href: "/get-started" },
      { label: "Service Layer Overview", href: "/service-layer" },
      { label: "Service Methodology", href: "/methodology" },
    ],
  },
  {
    icon: Shield,
    title: "Service Layer Reference",
    description:
      "Deep-dive documentation on all 18 detection, response, and operations modules across Infrastructure, Security, and Intelligence pillars.",
    links: [
      { label: "All 18 Modules", href: "/service-layer" },
      { label: "CIO — Infrastructure", href: "/service-layer/cio" },
      { label: "ITDR — Identity", href: "/service-layer/itdr" },
      { label: "NDR — Network", href: "/service-layer/ndr" },
      { label: "GRC — Governance", href: "/service-layer/grc" },
    ],
  },
  {
    icon: FileText,
    title: "Compliance Frameworks",
    description:
      "Framework-specific guides for CMMC, HIPAA, SOC 2, NIST, PCI-DSS, and more. Pre-configured controls with automated gap analysis.",
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
    description:
      "Kubric UIDR, Data Graph, and KubricAI technical documentation covering architecture, APIs, and integration patterns.",
    links: [
      { label: "Kubric UIDR Platform", href: "/our-tools/kubric-uidr" },
      { label: "Kubric Data Graph", href: "/our-tools/kubric-data-graph" },
      { label: "KubricAI Automation", href: "/our-tools/kubric-ai" },
      { label: "How Kubric Works", href: "/our-tools/how-kubric-works" },
    ],
  },
  {
    icon: Users,
    title: "Industry Solutions",
    description:
      "Vertical-specific architecture and compliance guides for Healthcare, Manufacturing, Financial Services, Public Sector, and more.",
    links: [
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Manufacturing", href: "/solutions/manufacturing" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Public Sector", href: "/solutions/public-sector" },
      { label: "Technology (MSP/MSSP)", href: "/solutions/technology" },
    ],
  },
  {
    icon: DollarSign,
    title: "Pricing & Contracts",
    description:
      "Six flexible pricing models — from Precision Pay™ consumption billing to Enterprise Custom. SLA documentation and engagement structures.",
    links: [
      { label: "All Pricing Models", href: "/pricing" },
      { label: "Precision Pay™", href: "/pricing" },
      { label: "Flex Core™", href: "/pricing" },
      { label: "APEX™ As-a-Service", href: "/pricing" },
      { label: "Enterprise Custom", href: "/contact" },
    ],
  },
  {
    icon: Wrench,
    title: "Services Reference",
    description:
      "Documentation for all managed and professional services — NOC, SOC, Compliance, Cloud, Penetration Testing, and deployment engagements.",
    links: [
      { label: "Managed NOC", href: "/services/managed-noc" },
      { label: "Managed SOC", href: "/services/managed-soc" },
      { label: "Managed Compliance & GRC", href: "/services/managed-compliance" },
      { label: "Penetration Testing", href: "/services/penetration-testing" },
      { label: "All Services", href: "/services" },
    ],
  },
];

export default function Documentation() {
  return (
    <PageLayout showBreadcrumb={false}>
      <PageBanner
        title="Documentation"
        subtitle="Everything you need to deploy, configure, and operate the Kubric platform across your organisation."
      />

      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* 7-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {docCards.map((card) => (
              <div
                key={card.title}
                className="bg-background border border-border p-8 flex flex-col hover:shadow-lg transition-shadow group"
              >
                <div className="mb-5">
                  <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:border-brand-orange transition-colors">
                    <card.icon size={22} className="text-brand-orange" />
                  </div>
                </div>
                <h2 className="text-xl font-black text-foreground mb-3">{card.title}</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
                  {card.description}
                </p>
                <ul className="space-y-2">
                  {card.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-brand-orange transition-colors group/link"
                      >
                        <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Docs — password protected — full-width banner */}
          <div className="border border-border bg-background p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 flex items-center justify-center border border-border bg-secondary flex-shrink-0">
                <Lock size={22} className="text-muted-foreground" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-1">
                  Restricted Access
                </div>
                <h3 className="text-2xl font-black text-foreground mb-2">
                  Technical Documentation
                </h3>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Full K-DOCS monorepo explorer — 23 internal documents covering orchestration architecture, 120k+ detection rules, persona configurations, and internal reference materials. Authorised personnel only.
                </p>
              </div>
            </div>
            <Link
              to="/uidr"
              className="flex-shrink-0 flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Access Technical Docs
              <ExternalLink size={14} />
            </Link>
          </div>

        </div>
      </section>
    </PageLayout>
  );
}
