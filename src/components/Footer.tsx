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
    <h4
      style={{ color: "#ffffff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px" }}
    >
      {title}
    </h4>
    <ul className="space-y-[10px]">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={item.href}
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: "1.4", display: "block" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(15 67% 36%)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
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
    <footer style={{ background: "#121212", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        {/* Path strip */}
        <div style={{ marginBottom: "48px", paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "20px" }}>Choose Your Model</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/fully-managed" className="group flex items-start gap-3">
              <div style={{ width: "4px", minHeight: "2.5rem", background: "hsl(15 67% 36%)", marginTop: "2px", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(15 67% 36%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#ffffff"}
                >Fully Managed</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>We run it. You own the outcomes.</p>
              </div>
            </Link>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
            <Link to="/co-managed" className="group flex items-start gap-3">
              <div style={{ width: "4px", minHeight: "2.5rem", background: "hsl(210,70%,55%)", marginTop: "2px", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(210,70%,65%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#ffffff"}
                >Co-Managed</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Your team runs it. Our engineers back you up.</p>
              </div>
            </Link>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
            <Link to="/self-managed" className="group flex items-start gap-3">
              <div style={{ width: "4px", minHeight: "2.5rem", background: "hsl(145,60%,45%)", marginTop: "2px", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(145,60%,55%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#ffffff"}
                >Self-Managed</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>You run it. The platform gets out of your way.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Wordmark & tagline */}
        <div style={{ marginBottom: "56px" }}>
          <Link to="/" style={{ display: "inline-block", marginBottom: "16px", textDecoration: "none" }}>
            <span style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", color: "#ffffff" }}>
              Manage<span style={{ color: "hsl(15 67% 36%)" }}>Kube</span>
            </span>
          </Link>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.40)", maxWidth: "280px", lineHeight: "1.7" }}>
            Enterprise managed MSP &amp; MSSP services. Unified infrastructure, detection, and response.
          </p>
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-10" style={{ marginBottom: "56px" }}>
          {columns.map((col) => (
            <FooterCol key={col.title} title={col.title} items={col.items} />
          ))}
        </div>

        {/* Thin separator */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "28px" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>© 2026 ManageKube. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.60)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.30)"}
            >Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.60)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.30)"}
            >Terms of Service</Link>
            <Link to="/contact" style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.60)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.30)"}
            >Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
