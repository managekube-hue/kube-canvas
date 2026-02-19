import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const kubes = [
  { label: "CIO Kube", href: "/kubes/cio-kube" },
  { label: "NPM Kube", href: "/kubes/npm-kube" },
  { label: "ITDR Kube", href: "/kubes/itdr-kube" },
  { label: "NDR Kube", href: "/kubes/ndr-kube" },
  { label: "CDR Kube", href: "/kubes/cdr-kube" },
  { label: "GRC Kube", href: "/kubes/grc-kube" },
  { label: "VDR Kube", href: "/kubes/vdr-kube" },
  { label: "ADR Kube", href: "/kubes/adr-kube" },
  { label: "BDR Kube", href: "/kubes/bdr-kube" },
  { label: "DDR Kube", href: "/kubes/ddr-kube" },
  { label: "SDR Kube", href: "/kubes/sdr-kube" },
  { label: "TI Kube", href: "/kubes/ti-kube" },
  { label: "APM Kube", href: "/kubes/apm-kube" },
  { label: "MDM Kube", href: "/kubes/mdm-kube" },
  { label: "CFDR Kube", href: "/kubes/cfdr-kube" },
  { label: "View All Kubes →", href: "/kubes" },
];

const products = [
  { label: "XRO — Small Business", href: "/products/xro" },
  { label: "XMM — SME Platform", href: "/products/xmm" },
  { label: "XME — Enterprise", href: "/products/xme" },
  { label: "Custom Product", href: "/products/custom" },
  { label: "All Products →", href: "/products" },
];

const services = [
  { label: "Managed NOC", href: "/services/managed-noc" },
  { label: "Managed SOC", href: "/services/managed-soc" },
  { label: "Managed Cloud", href: "/services/managed-cloud" },
  { label: "Managed Compliance", href: "/services/managed-compliance" },
  { label: "Security Assessments", href: "/services/security-assessments" },
  { label: "Penetration Testing", href: "/services/penetration-testing" },
  { label: "Infrastructure Audits", href: "/services/infrastructure-audits" },
  { label: "Network Buildouts", href: "/services/network-buildouts" },
  { label: "Physical Security", href: "/services/physical-security" },
  { label: "Custom Automation", href: "/services/custom-automation" },
  { label: "Legacy Integrations", href: "/services/legacy-integrations" },
  { label: "Right Sizing", href: "/services/right-sizing" },
  { label: "All Services →", href: "/services" },
];

const compliance = [
  { label: "CMMC", href: "/compliance/cmmc" },
  { label: "HIPAA", href: "/compliance/hipaa" },
  { label: "SOC 2", href: "/compliance/soc2" },
  { label: "NIST 800-171", href: "/compliance/nist-800-171" },
  { label: "NIST 800-53", href: "/compliance/nist-800-53" },
  { label: "PCI-DSS", href: "/compliance/pci-dss" },
  { label: "ISO 27001", href: "/compliance/iso-27001" },
  { label: "CJIS", href: "/compliance/cjis" },
];

const solutions = [
  { label: "Enterprise", href: "/solutions/enterprise" },
  { label: "SME", href: "/solutions/sme" },
  { label: "SMB", href: "/solutions/smb" },
  { label: "Healthcare", href: "/solutions/healthcare" },
  { label: "Financial Services", href: "/solutions/financial-services" },
  { label: "Manufacturing", href: "/solutions/manufacturing" },
  { label: "Public Sector", href: "/solutions/public-sector" },
  { label: "Retail", href: "/solutions/retail" },
  { label: "Technology", href: "/solutions/technology" },
  { label: "All Solutions →", href: "/solutions" },
];

const industries = [
  { label: "Energy & Utilities", href: "/industries/energy-utilities" },
  { label: "Financial Services", href: "/industries/financial-services" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Mining & Extraction", href: "/industries/mining-extraction" },
  { label: "Public Sector", href: "/industries/public-sector" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Telecommunications", href: "/industries/telecommunications" },
  { label: "Transportation", href: "/industries/transportation" },
  { label: "All Industries →", href: "/industries" },
];

const ourTools = [
  { label: "How Kubric Works", href: "/our-tools/how-kubric-works" },
  { label: "Kubric UIDR", href: "/our-tools/kubric-uidr" },
  { label: "Kubric Data Graph", href: "/our-tools/kubric-data-graph" },
  { label: "KubricAI", href: "/our-tools/kubric-ai" },
  { label: "All Tools →", href: "/our-tools" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Assessment", href: "/assessment" },
  { label: "Find by Problem", href: "/find-by-problem" },
  { label: "Find by Size", href: "/find-by-size" },
];

const kubricDocs = [
  { label: "Documentation Hub", href: "/documentation" },
  { label: "Kubric UIDR Home", href: "/uidr" },
  { label: "UIDR Platform", href: "/uidr/platform" },
  { label: "UIDR Docs", href: "/uidr/docs" },
  { label: "Technical Docs", href: "/uidr/technical-docs" },
  { label: "Open Source", href: "/uidr/open-source" },
  { label: "Contributors", href: "/uidr/contributors" },
  { label: "UIDR Contact", href: "/uidr/contact" },
];

const VISIBLE = 5;

const FooterCol = ({ title, items }: { title: string; items: { label: string; href: string }[] }) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > VISIBLE;
  const visible = expanded ? items : items.slice(0, VISIBLE);

  return (
    <div>
      <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-4">{title}</h4>
      <ul className="space-y-2">
        {visible.map((item) => (
          <li key={item.label}>
            <Link
              to={item.href}
              className="text-sm text-white/55 hover:text-brand-orange transition-colors leading-relaxed"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1 text-xs text-white/35 hover:text-white/60 transition-colors"
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Show less" : `+${items.length - VISIBLE} more`}
        </button>
      )}
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="section-dark py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Logo & tagline */}
        <div className="mb-12">
          <img src={logo} alt="ManageKube IT Services" className="h-12 w-auto mb-4 brightness-0 invert" />
          <p className="text-sm text-white/50 max-w-md leading-relaxed">
            Unified detection, response, and operations. 18 DR Modules. One intelligent platform.
          </p>
        </div>

        {/* Main nav grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16">
          <FooterCol title="Kubes" items={kubes} />
          <FooterCol title="Products" items={products} />
          <FooterCol title="Services" items={services} />
          <FooterCol title="Compliance" items={compliance} />
          <FooterCol title="Solutions" items={solutions} />
          <FooterCol title="Industries" items={industries} />
          <FooterCol title="Our Tools" items={ourTools} />
          <div className="space-y-8">
            <FooterCol title="Company" items={company} />
            <FooterCol title="Kubric Docs" items={kubricDocs} />
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35">© 2025 ManageKube. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-sm text-white/35 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-white/35 hover:text-white transition-colors">Terms</Link>
            <Link to="/login/client" className="text-sm text-white/35 hover:text-white transition-colors">Client Portal</Link>
            <Link to="/login/partner" className="text-sm text-white/35 hover:text-white transition-colors">Partner Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
