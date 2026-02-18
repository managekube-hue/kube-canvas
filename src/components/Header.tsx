/** DO NOT TOUCH - Mega Menu Header */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Mega Menu Data ────────────────────────────────────────────────────────────

const megaMenu = {
  "OUR TOOLS": {
    description: "Discover the unified platform that powers detection, response, and operations across your entire infrastructure.",
    columns: [
      {
        heading: "Platform Overview",
        items: [
          { label: "How Kubric Works", desc: "Learn how Kubric UIDR unifies NOC, SOC, and business operations.", href: "/our-tools/how-kubric-works" },
          { label: "Kubric UIDR Platform", desc: "The core RMM, PSA, and Microsoft 365 management platform.", href: "/our-tools/kubric-uidr" },
          { label: "Kubric Data Graph", desc: "Real-time relationship mapping across infrastructure and security events.", href: "/our-tools/kubric-data-graph" },
        ],
      },
      {
        heading: "Intelligence & Automation",
        items: [
          { label: "KubricAI", desc: "AI-powered orchestration using CrewAI for predictive threat detection.", href: "/our-tools/kubric-ai" },
          { label: "Service Delivery Methodology", desc: "Our proven framework for onboarding, operations, and continuous improvement.", href: "/methodology" },
        ],
      },
    ],
    rail: [
      { label: "Automation & AI", href: "/our-tools/kubric-ai" },
      { label: "Network Discovery", href: "/our-tools/kubric-uidr" },
      { label: "Integrations", href: "/our-tools/kubric-uidr" },
      { label: "Mobile App", href: "/our-tools/kubric-uidr" },
      { label: "Security", href: "/our-tools/kubric-uidr" },
      { label: "Roadmap", href: "/our-tools/kubric-uidr" },
    ],
  },
  "KUBES": {
    description: "15 specialized detection, response, and operations modules delivering coverage across infrastructure, security, and compliance.",
    columns: [
      {
        heading: "Infrastructure & Operations",
        items: [
          { label: "CIO KUBE", desc: "Core infrastructure orchestration and asset lifecycle management.", href: "/kubes/cio-kube" },
          { label: "NPM KUBE", desc: "Real-time network monitoring with AI-powered capacity forecasting.", href: "/kubes/npm-kube" },
          { label: "MDM KUBE", desc: "Policy-driven mobile device governance for iOS and Android.", href: "/kubes/mdm-kube" },
          { label: "APM KUBE", desc: "Full-stack observability with distributed tracing and code profiling.", href: "/kubes/apm-kube" },
          { label: "CFDR KUBE", desc: "Configuration drift detection and automated remediation.", href: "/kubes/cfdr-kube" },
          { label: "BDR KUBE", desc: "Backup verification and disaster recovery orchestration.", href: "/kubes/bdr-kube" },
        ],
      },
      {
        heading: "Security Detection & Response",
        items: [
          { label: "ITDR KUBE", desc: "Identity threats stopped before escalation via AD monitoring.", href: "/kubes/itdr-kube" },
          { label: "NDR KUBE", desc: "Network threats detected at the source with deep packet inspection.", href: "/kubes/ndr-kube" },
          { label: "CDR KUBE", desc: "Multi-cloud security monitoring for AWS, Azure, and GCP.", href: "/kubes/cdr-kube" },
          { label: "SDR KUBE", desc: "SBOM analysis and software supply chain risk management.", href: "/kubes/sdr-kube" },
          { label: "ADR KUBE", desc: "Application-level threat containment with WAF and RASP.", href: "/kubes/adr-kube" },
          { label: "DDR KUBE", desc: "Data misuse and exfiltration detection with DLP controls.", href: "/kubes/ddr-kube" },
        ],
      },
      {
        heading: "Intelligence & Governance",
        items: [
          { label: "TI KUBE", desc: "Threat intelligence that informs action via MISP and EPSS scoring.", href: "/kubes/ti-kube" },
          { label: "VDR KUBE", desc: "Vulnerabilities prioritized by real risk, not just CVSS.", href: "/kubes/vdr-kube" },
          { label: "GRC KUBE", desc: "Governance, risk & compliance across 100+ frameworks.", href: "/kubes/grc-kube" },
        ],
      },
    ],
    rail: [
      { label: "90% MITRE ATT&CK Coverage", href: "/kubes" },
      { label: "Real-Time Correlation", href: "/kubes" },
      { label: "Automated Response", href: "/kubes" },
      { label: "Unified Dashboard", href: "/kubes" },
      { label: "API Integrations", href: "/kubes" },
    ],
  },
  "PRODUCTS": {
    description: "Purpose-built security and operations platforms tailored to business size.",
    columns: [
      {
        heading: "Platform Tiers",
        items: [
          { label: "XRO — Small Business Platform", desc: "Complete security and operations for small businesses with 7 essential Kubes.", href: "/products/xro" },
          { label: "XMM — SME Platform", desc: "Advanced security and operations for growing organizations with 12 Kubes.", href: "/products/xmm" },
          { label: "XME — Enterprise Platform", desc: "Complete enterprise coverage with all 15 Kubes and premium capabilities.", href: "/products/xme" },
        ],
      },
      {
        heading: "Add-On Capabilities",
        items: [
          { label: "Supply Chain Cyber Risk", desc: "SCDR protection for third-party and software supply chains.", href: "/products/xme" },
          { label: "External Attack Surface Management", desc: "Continuous discovery and monitoring of your attack surface.", href: "/products/xmm" },
          { label: "STRIKE Strategic Intelligence", desc: "Advanced threat intelligence and adversary tracking.", href: "/products/xme" },
          { label: "Honeypots", desc: "Deception-based threat detection and attacker profiling.", href: "/products/xme" },
          { label: "Custom Configuration", desc: "Get exactly what you need whenever you need it.", href: "/products/custom" },
        ],
      },
    ],
    rail: [
      { label: "24/7 SOC Monitoring", href: "/services/managed-soc" },
      { label: "Threat Hunting", href: "/services/managed-soc" },
      { label: "Purple Team Exercises", href: "/services" },
      { label: "Custom Integrations", href: "/products/custom" },
    ],
  },
  "SERVICES": {
    description: "Expert services to design, deploy, and operate your security and IT infrastructure.",
    columns: [
      {
        heading: "Managed Services",
        items: [
          { label: "Managed NOC", desc: "24/7 network operations center with proactive monitoring.", href: "/services/managed-noc" },
          { label: "Managed SOC", desc: "24/7 security operations center with threat hunting and incident response.", href: "/services/managed-soc" },
          { label: "Managed Compliance & GRC", desc: "Continuous compliance monitoring across 100+ frameworks.", href: "/services/managed-compliance" },
          { label: "Managed Cloud & FinOps", desc: "Cloud cost optimization and performance management.", href: "/services/managed-cloud" },
        ],
      },
      {
        heading: "Advisory Services",
        items: [
          { label: "Security Assessments", desc: "Holistic security posture evaluation with risk prioritization.", href: "/services/security-assessments" },
          { label: "Penetration Testing", desc: "Manual penetration testing across network, app, and cloud.", href: "/services/penetration-testing" },
          { label: "Compliance Gap Analysis", desc: "Framework-specific gap assessments with remediation plans.", href: "/services/compliance-gap-analysis" },
          { label: "IT Infrastructure Audits", desc: "Architecture, performance, security, and efficiency review.", href: "/services/infrastructure-audits" },
          { label: "Right-Sizing Engagements", desc: "Eliminate waste and improve performance per dollar spent.", href: "/services/right-sizing" },
        ],
      },
      {
        heading: "Deployment & Integration",
        items: [
          { label: "Physical Security Integration", desc: "Video surveillance, access control, and SOC integration.", href: "/services/physical-security" },
          { label: "Network Infrastructure Buildouts", desc: "Enterprise network design, deployment, and migration.", href: "/services/network-buildouts" },
          { label: "Custom Automation Development", desc: "Bespoke automation, scripting, and workflow development.", href: "/services/custom-automation" },
          { label: "Legacy System Integrations", desc: "Bridge aging infrastructure with modern security platforms.", href: "/services/legacy-integrations" },
        ],
      },
    ],
    rail: [
      { label: "vCISO Services", href: "/services/advisory" },
      { label: "Purple Team Exercises", href: "/services" },
      { label: "Security Awareness Training", href: "/services" },
      { label: "Tabletop Exercises", href: "/services" },
    ],
  },
  "SOLUTIONS": {
    description: "Industry-specific and market-tailored solutions addressing unique compliance and operational needs.",
    columns: [
      {
        heading: "By Industry",
        items: [
          { label: "Manufacturing", desc: "OT/IT convergence, supply chain security, and IP protection.", href: "/solutions/manufacturing" },
          { label: "Healthcare", desc: "HIPAA compliance, PHI protection, and medical device security.", href: "/solutions/healthcare" },
          { label: "Public Sector", desc: "CJIS, FedRAMP, and government compliance for state & local.", href: "/solutions/public-sector" },
          { label: "Financial Services", desc: "PCI-DSS, SOX compliance, and financial fraud prevention.", href: "/solutions/financial-services" },
          { label: "Retail", desc: "PCI-DSS, supply chain risk, and customer data protection.", href: "/solutions/retail" },
          { label: "Technology (MSPs/MSSPs)", desc: "Multi-tenant platforms and white-label security solutions.", href: "/solutions/technology" },
        ],
      },
      {
        heading: "By Market Size",
        items: [
          { label: "SMB", desc: "Turnkey security and operations for small businesses with limited IT staff.", href: "/solutions/smb" },
          { label: "SME", desc: "Flexible platform for growing mid-market companies.", href: "/solutions/sme" },
          { label: "Enterprise", desc: "Enterprise-grade customization, dedicated support, and advanced features.", href: "/solutions/enterprise" },
        ],
      },
    ],
    rail: [
      { label: "Pre-configured Kube bundles", href: "/solutions" },
      { label: "Industry compliance templates", href: "/compliance" },
      { label: "Vertical-specific playbooks", href: "/solutions" },
      { label: "Reference architectures", href: "/solutions" },
    ],
  },
  "COMPLIANCE": {
    description: "Pre-configured compliance frameworks with automated gap analysis and continuous monitoring.",
    columns: [
      {
        heading: "Government & Defense",
        items: [
          { label: "CMMC", desc: "Cybersecurity Maturity Model Certification for defense contractors.", href: "/compliance/cmmc" },
          { label: "CJIS", desc: "Criminal Justice Information Services Security Policy compliance.", href: "/compliance/cjis" },
          { label: "NIST 800-171", desc: "Protecting Controlled Unclassified Information for federal contractors.", href: "/compliance/nist-800-171" },
          { label: "NIST 800-53", desc: "Security controls for federal information systems and critical infrastructure.", href: "/compliance/nist-800-53" },
        ],
      },
      {
        heading: "Industry Standards",
        items: [
          { label: "HIPAA", desc: "HIPAA compliance automation with PHI protection and breach notification.", href: "/compliance/hipaa" },
          { label: "SOC 2", desc: "SOC 2 Type II audit readiness with continuous control monitoring.", href: "/compliance/soc2" },
          { label: "ISO 27001", desc: "International ISMS certification with 114 controls across 14 domains.", href: "/compliance/iso-27001" },
          { label: "PCI-DSS", desc: "Payment card data security and cardholder data environment protection.", href: "/compliance/pci-dss" },
        ],
      },
    ],
    rail: [
      { label: "Automated evidence collection", href: "/compliance" },
      { label: "Gap analysis dashboards", href: "/compliance" },
      { label: "Audit report generation", href: "/compliance" },
      { label: "Control mapping matrices", href: "/compliance" },
      { label: "Remediation tracking", href: "/compliance" },
    ],
  },
};

const utilityLinks = [
  { label: "SUPPORT", href: "/contact", desc: "Get expert help and technical assistance." },
  { label: "LOG IN", href: "/login/client", desc: "Access your ManageKube dashboard." },
];

// ─── Types ─────────────────────────────────────────────────────────────────────
type MegaMenuKey = keyof typeof megaMenu;

// ─── Component ─────────────────────────────────────────────────────────────────
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<MegaMenuKey | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setActiveSection(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on route change
  const closeMenu = () => {
    setMenuOpen(false);
    setActiveSection(null);
  };

  const toggleMenu = () => {
    setMenuOpen((o) => !o);
    if (menuOpen) setActiveSection(null);
  };

  const currentSection = activeSection ? megaMenu[activeSection] : null;

  return (
    <header ref={menuRef} className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      {/* Top bar */}
      <div className="container mx-auto h-20 lg:h-24 flex items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex-shrink-0">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Manage</span>
            <span className="text-brand-orange">Kube</span>
          </span>
        </Link>

        {/* Right side: utility links + hamburger */}
        <div className="flex items-center gap-6">
          {/* Utility links — desktop only */}
          <div className="hidden lg:flex items-center gap-4">
            {utilityLinks.map((u) => (
              <Link
                key={u.label}
                to={u.href}
                onClick={closeMenu}
                className="text-xs font-semibold tracking-widest text-muted-foreground hover:text-brand-orange transition-colors uppercase"
              >
                {u.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="p-3 text-foreground hover:text-brand-orange transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mega Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-20 lg:top-24 z-40 overflow-y-auto"
            style={{ backgroundColor: "#464648", maxHeight: "calc(100vh - 5rem)" }}
          >
            {/* Primary nav — top row of section labels */}
            <div
              className="border-b"
              style={{ borderColor: "#CDCAC5" }}
            >
              <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row">
                  {(Object.keys(megaMenu) as MegaMenuKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(activeSection === key ? null : key)}
                      className={`
                        flex items-center gap-2 py-5 px-4 text-sm font-bold tracking-widest uppercase transition-colors border-b lg:border-b-0 lg:border-r
                        ${activeSection === key
                          ? "text-brand-orange border-brand-orange lg:border-r-transparent lg:border-b-2"
                          : "text-white/80 hover:text-white border-white/10"}
                      `}
                      style={activeSection === key ? { borderBottomColor: "hsl(var(--brand-orange))", borderBottomWidth: "2px" } : {}}
                    >
                      {key}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${activeSection === key ? "rotate-180" : ""}`}
                      />
                    </button>
                  ))}

                  {/* Mobile utility links */}
                  <div className="flex lg:hidden gap-4 py-4 px-4 border-t" style={{ borderColor: "#CDCAC5" }}>
                    {utilityLinks.map((u) => (
                      <Link key={u.label} to={u.href} onClick={closeMenu}
                        className="text-xs font-bold tracking-widest text-white/60 hover:text-brand-orange uppercase">
                        {u.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section content */}
            <AnimatePresence>
              {currentSection && (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="container mx-auto px-6 lg:px-12 py-10"
                >
                  {/* Section description */}
                  <p className="text-sm mb-8" style={{ color: "#CDCAC5" }}>
                    {currentSection.description}
                  </p>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main columns */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {currentSection.columns.map((col) => (
                        <div key={col.heading}>
                          <h4
                            className="text-xs font-bold tracking-widest uppercase mb-4 pb-3 border-b"
                            style={{ color: "hsl(var(--brand-orange))", borderColor: "#CDCAC5" }}
                          >
                            {col.heading}
                          </h4>
                          <ul className="space-y-3">
                            {col.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.href}
                                  onClick={closeMenu}
                                  className="group block"
                                >
                                  <span
                                    className="block text-sm font-semibold group-hover:text-brand-orange transition-colors"
                                    style={{ color: "white" }}
                                  >
                                    {item.label}
                                  </span>
                                  <span className="block text-xs mt-0.5 leading-relaxed" style={{ color: "#CDCAC5" }}>
                                    {item.desc}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Right rail */}
                    {currentSection.rail && (
                      <div
                        className="lg:w-48 lg:border-l pl-0 lg:pl-8 pt-4 lg:pt-0"
                        style={{ borderColor: "#CDCAC5" }}
                      >
                        <h4
                          className="text-xs font-bold tracking-widest uppercase mb-4"
                          style={{ color: "hsl(var(--brand-orange))" }}
                        >
                          Quick Links
                        </h4>
                        <ul className="space-y-3">
                          {currentSection.rail.map((r) => (
                            <li key={r.label}>
                              <Link
                                to={r.href}
                                onClick={closeMenu}
                                className="flex items-center gap-1.5 text-xs font-medium hover:text-brand-orange transition-colors"
                                style={{ color: "#CDCAC5" }}
                              >
                                <ExternalLink size={10} />
                                {r.label}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="mt-8">
                          <Link
                            to="/assessment"
                            onClick={closeMenu}
                            className="block text-center py-3 px-4 text-xs font-bold tracking-wider uppercase text-white transition-colors hover:opacity-90"
                            style={{ backgroundColor: "hsl(var(--brand-orange))" }}
                          >
                            Free Assessment
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom links */}
                  <div className="mt-10 pt-6 border-t flex flex-wrap gap-6" style={{ borderColor: "#CDCAC5" }}>
                    <Link to="/contact" onClick={closeMenu}
                      className="text-xs font-semibold tracking-wider uppercase hover:text-brand-orange transition-colors"
                      style={{ color: "#CDCAC5" }}>
                      Contact Us
                    </Link>
                    <Link to="/pricing" onClick={closeMenu}
                      className="text-xs font-semibold tracking-wider uppercase hover:text-brand-orange transition-colors"
                      style={{ color: "#CDCAC5" }}>
                      Pricing
                    </Link>
                    <Link to="/about" onClick={closeMenu}
                      className="text-xs font-semibold tracking-wider uppercase hover:text-brand-orange transition-colors"
                      style={{ color: "#CDCAC5" }}>
                      About
                    </Link>
                    <Link to="/careers" onClick={closeMenu}
                      className="text-xs font-semibold tracking-wider uppercase hover:text-brand-orange transition-colors"
                      style={{ color: "#CDCAC5" }}>
                      Careers
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
/** END DO NOT TOUCH */
