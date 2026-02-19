import { Link } from "react-router-dom";

/** DO NOT TOUCH — Footer component */

const columns = [
  {
    title: "Our Tools",
    items: [
      { label: "How Kubric Works", href: "/our-tools/how-kubric-works" },
      { label: "Kubric UIDR", href: "/our-tools/kubric-uidr" },
      { label: "Kubric Data Graph", href: "/our-tools/kubric-data-graph" },
      { label: "KubricAI", href: "/our-tools/kubric-ai" },
      { label: "Service Delivery Methodology", href: "/methodology" },
    ],
  },
  {
    title: "Kubes",
    items: [
      { label: "What Are Kubes?", href: "/kubes" },
      { label: "CIO Kube", href: "/kubes/cio-kube" },
      { label: "NPM Kube", href: "/kubes/npm-kube" },
      { label: "MDM Kube", href: "/kubes/mdm-kube" },
      { label: "APM Kube", href: "/kubes/apm-kube" },
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
      { label: "CFDR Kube", href: "/kubes/cfdr-kube" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "XRO — Small Business", href: "/products/xro" },
      { label: "XMM — SME Platform", href: "/products/xmm" },
      { label: "XME — Enterprise", href: "/products/xme" },
      { label: "Custom Product", href: "/products/custom" },
    ],
  },
  {
    title: "Services",
    items: [
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
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Enterprise", href: "/solutions/enterprise" },
      { label: "SME", href: "/solutions/sme" },
      { label: "SMB", href: "/solutions/smb" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Manufacturing", href: "/solutions/manufacturing" },
      { label: "Public Sector", href: "/solutions/public-sector" },
      { label: "Retail", href: "/solutions/retail" },
      { label: "Technology", href: "/solutions/technology" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { label: "CMMC", href: "/compliance/cmmc" },
      { label: "HIPAA", href: "/compliance/hipaa" },
      { label: "SOC 2", href: "/compliance/soc2" },
      { label: "NIST 800-171", href: "/compliance/nist-800-171" },
      { label: "NIST 800-53", href: "/compliance/nist-800-53" },
      { label: "PCI-DSS", href: "/compliance/pci-dss" },
      { label: "ISO 27001", href: "/compliance/iso-27001" },
      { label: "CJIS", href: "/compliance/cjis" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Energy & Utilities", href: "/industries/energy-utilities" },
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Public Sector", href: "/industries/public-sector" },
      { label: "Telecommunications", href: "/industries/telecommunications" },
      { label: "Transportation", href: "/industries/transportation" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Methodology", href: "/methodology" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Assessment", href: "/assessment" },
      { label: "Documentation", href: "/documentation" },
      { label: "Client Portal", href: "/login/client" },
      { label: "Partner Portal", href: "/login/partner" },
    ],
  },
];

const FooterCol = ({ title, items }: { title: string; items: { label: string; href: string }[] }) => (
  <div>
    <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-5">{title}</h4>
    <ul className="space-y-[10px]">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={item.href}
            className="text-[13px] text-white/45 hover:text-brand-orange transition-colors leading-snug"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => {
  return (
    <footer style={{ background: "hsl(0 0% 7%)" }} className="py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        {/* Path strip */}
        <div className="mb-12 pb-10 border-b border-white/[0.08]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/30 mb-5">Choose Your Model</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/fully-managed" className="group flex items-start gap-3">
              <div className="w-1 h-full min-h-[2.5rem] bg-brand-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[13px] font-bold text-white group-hover:text-brand-orange transition-colors">Fully Managed</p>
                <p className="text-[12px] text-white/35 mt-0.5">We run it. You own the outcomes.</p>
              </div>
            </Link>
            <div className="w-px bg-white/[0.08] self-stretch" />
            <Link to="/co-managed" className="group flex items-start gap-3">
              <div className="w-1 h-full min-h-[2.5rem] bg-[hsl(210,70%,55%)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[13px] font-bold text-white group-hover:text-[hsl(210,70%,65%)] transition-colors">Co-Managed</p>
                <p className="text-[12px] text-white/35 mt-0.5">Your team runs it. Our platform backs you up.</p>
              </div>
            </Link>
            <div className="w-px bg-white/[0.08] self-stretch" />
            <Link to="/self-managed" className="group flex items-start gap-3">
              <div className="w-1 h-full min-h-[2.5rem] bg-[hsl(145,60%,45%)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[13px] font-bold text-white group-hover:text-[hsl(145,60%,55%)] transition-colors">Self-Managed</p>
                <p className="text-[12px] text-white/35 mt-0.5">You run it. The platform gets out of your way.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Wordmark & tagline */}
        <div className="mb-14">
          <Link to="/" className="inline-block mb-4">
            <span className="text-[22px] font-bold tracking-tight text-white">
              Manage<span className="text-brand-orange">Kube</span>
            </span>
          </Link>
          <p className="text-[13px] text-white/40 max-w-xs leading-relaxed">
            Enterprise managed MSP &amp; MSSP services. Unified infrastructure, detection, and response.
          </p>
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-10 mb-14">
          {columns.map((col) => (
            <FooterCol key={col.title} title={col.title} items={col.items} />
          ))}
        </div>

        {/* Thin separator */}
        <div className="border-t border-white/[0.08] mb-7" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-white/25">© 2026 ManageKube. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
