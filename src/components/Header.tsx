import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// ─── Brand Colors ──────────────────────────────────────────────────────────────
const CHARCOAL = "#464648";
const DIVIDER = "rgba(205,202,197,0.2)";
const TEXT_MUTED = "rgba(255,255,255,0.55)";
const TEXT_WHITE = "#ffffff";
const ORANGE = "hsl(24 95% 53%)";

// ─── Mega Menu Data ────────────────────────────────────────────────────────────
const megaMenu = {
  "How It Works": {
    href: "/how-it-works",
    desc: "The technology engine that delivers the Service Layer capabilities: orchestration, correlation, and AI-assisted detection.",
    viewAll: "View How It Works",
    columns: [
      {
        heading: "Service Components",
        items: [
          { label: "Service Overview", desc: "Full service architecture: ingestion, correlation, detection, and response orchestration.", href: "/how-it-works/platform-overview" },
          { label: "Kubric UIDR", desc: "The orchestration and management layer unifying detection signals across the Service Layer.", href: "/how-it-works/kubric-uidr" },
          { label: "Kubric Data Graph", desc: "The correlation engine connecting telemetry across all Service Layer capabilities.", href: "/how-it-works/kubric-data-graph" },
        ],
      },
      {
        heading: "Intelligence & Methodology",
        items: [
          { label: "KubricAI", desc: "ML-driven detection prioritization, automated triage, and intelligent response recommendations.", href: "/how-it-works/kubricai" },
          { label: "Our Methodology", desc: "Hunt → Identify → Alert → Triage → Diagnose → Remediate → Document → Close.", href: "/methodology" },
        ],
      },
    ],
  },
  "Service Layer": {
    href: "/service-layer",
    desc: "18 specialised detection, response, and operations modules delivering targeted coverage across infrastructure, security, and compliance.",
    viewAll: "View All Modules",
    columns: [
      {
        heading: "Infrastructure & Operations",
        items: [
          { label: "CIO", desc: "Core infrastructure orchestration and asset lifecycle management.", href: "/service-layer/cio" },
          { label: "NPM", desc: "Real-time network performance monitoring with AI-powered capacity forecasting.", href: "/service-layer/npm" },
          { label: "MDM", desc: "Policy-driven mobile device governance for iOS and Android.", href: "/service-layer/mdm" },
          { label: "APM", desc: "Full-stack application observability with distributed tracing.", href: "/service-layer/apm" },
          { label: "CFDR", desc: "Configuration drift detection and automated remediation.", href: "/service-layer/cfdr" },
          { label: "BDR", desc: "Backup verification and disaster recovery orchestration.", href: "/service-layer/bdr" },
        ],
      },
      {
        heading: "Security Detection & Response",
        items: [
          { label: "ITDR", desc: "Identity threats stopped before escalation via Active Directory monitoring.", href: "/service-layer/itdr" },
          { label: "NDR", desc: "Network threats detected at the source with deep packet inspection.", href: "/service-layer/ndr" },
          { label: "CDR", desc: "Multi-cloud security monitoring for AWS, Azure, and GCP.", href: "/service-layer/cdr" },
          { label: "SDR", desc: "SBOM analysis and software supply chain risk management.", href: "/service-layer/sdr" },
          { label: "ADR", desc: "Application-level threat containment with WAF and RASP.", href: "/service-layer/adr" },
          { label: "DDR", desc: "Data misuse and exfiltration detection with DLP controls.", href: "/service-layer/ddr" },
          { label: "EASM", desc: "Continuous discovery and monitoring of your external attack surface.", href: "/service-layer/easm" },
          { label: "HONEYPOT", desc: "Deception-based threat detection and attacker profiling.", href: "/service-layer/honeypot" },
        ],
      },
      {
        heading: "Intelligence & Governance",
        items: [
          { label: "TI", desc: "Threat intelligence that informs action via MISP and EPSS scoring.", href: "/service-layer/ti" },
          { label: "VDR", desc: "Vulnerabilities prioritised by real risk, not just CVSS scores.", href: "/service-layer/vdr" },
          { label: "GRC", desc: "Governance, risk & compliance automation across 100+ frameworks.", href: "/compliance" },
          { label: "STRIKE", desc: "Advanced adversary tracking and kill-chain intelligence.", href: "/service-layer/strike" },
        ],
      },
    ],
  },
  "Service Tiers": {
    href: "/service-tiers",
    desc: "Purpose-built security and operations tiers tailored to your business size and maturity.",
    viewAll: "View All Tiers",
    columns: [
      {
        heading: "Service Tiers",
        items: [
          { label: "XRO Essentials", desc: "Complete security and operations for small businesses with essential coverage.", href: "/service-tiers/xro-essentials" },
          { label: "XMX Advanced", desc: "Advanced security and operations for growing organisations.", href: "/service-tiers/xmx-advanced" },
          { label: "XME Enterprise", desc: "Full enterprise coverage with all modules and premium capabilities.", href: "/service-tiers/xme-enterprise" },
        ],
      },
      {
        heading: "Core Capabilities",
        items: [
          { label: "STRIKE Intelligence", desc: "Advanced threat intelligence and adversary tracking capabilities.", href: "/service-layer/strike" },
          { label: "External Attack Surface Management", desc: "Continuous discovery and monitoring of your attack surface.", href: "/service-layer/easm" },
          { label: "Honeypots", desc: "Deception-based threat detection and attacker profiling.", href: "/service-layer/honeypot" },
          { label: "Custom Configuration", desc: "Get exactly the coverage you need, configured for your environment.", href: "/service-tiers/custom" },
        ],
      },
    ],
  },
  "Services": {
    href: "/services",
    desc: "Expert services to design, deploy, and operate your security and IT infrastructure.",
    viewAll: "View All Services",
    columns: [
      {
        heading: "Managed Services",
        items: [
          { label: "Managed NOC", desc: "24/7 network operations centre with proactive monitoring and response.", href: "/services/managed-noc" },
          { label: "Managed SOC", desc: "24/7 security operations with threat hunting and incident response.", href: "/services/managed-soc" },
          { label: "Managed Compliance & GRC", desc: "Continuous compliance monitoring across 100+ frameworks.", href: "/services/managed-compliance" },
          { label: "Managed Cloud & FinOps", desc: "Cloud cost optimisation and performance management.", href: "/services/managed-cloud" },
        ],
      },
      {
        heading: "Professional Services: BOM Add-Ons",
        items: [
          { label: "Help Desk", desc: "Tier 1-3 end-user support with Mac support, warranty services, and SLA-backed resolution.", href: "/services/help-desk" },
          { label: "Managed IT", desc: "Full-spectrum IT operations: endpoints, IoT, print, O365, data centre, and vCIO advisory.", href: "/services/managed-it" },
          { label: "Smart Hands", desc: "On-site field technicians for rack-and-stack, cabling, and multi-site rollouts.", href: "/services/smart-hands" },
        ],
      },
      {
        heading: "Advisory & Deployment",
        items: [
          { label: "Security Assessments", desc: "Holistic security posture evaluation with risk prioritisation.", href: "/services/security-assessments" },
          { label: "Penetration Testing", desc: "Manual penetration testing across network, application, and cloud.", href: "/services/penetration-testing" },
          { label: "Compliance Gap Analysis", desc: "Framework-specific gap assessments with remediation roadmaps.", href: "/services/compliance-gap-analysis" },
          { label: "IT Infrastructure Audits", desc: "Architecture, performance, security, and efficiency review.", href: "/services/infrastructure-audits" },
          { label: "Right-Sizing Engagements", desc: "Eliminate waste and improve performance per dollar spent.", href: "/services/right-sizing" },
          { label: "Network Infrastructure Buildouts", desc: "Enterprise network design, deployment, and migration.", href: "/services/network-buildouts" },
          { label: "Physical Security Integration", desc: "Video surveillance, access control, and SOC integration.", href: "/services/physical-security" },
          { label: "Custom Automation Development", desc: "Bespoke automation, scripting, and workflow development.", href: "/services/custom-automation" },
          { label: "Legacy System Integrations", desc: "Bridge ageing infrastructure with modern security platforms.", href: "/services/legacy-integrations" },
        ],
      },
    ],
  },
  "Solutions": {
    href: "/solutions",
    desc: "Industry-specific and market-tailored solutions addressing unique compliance and operational requirements.",
    viewAll: "View All Solutions",
    columns: [
      {
        heading: "By Industry",
        items: [
          { label: "Manufacturing", desc: "OT/IT convergence, supply chain security, and intellectual property protection.", href: "/solutions/manufacturing" },
          { label: "Healthcare", desc: "HIPAA compliance, PHI protection, and medical device security.", href: "/solutions/healthcare" },
          { label: "Public Sector", desc: "CJIS, FedRAMP, and government compliance for state and local agencies.", href: "/solutions/public-sector" },
          { label: "Financial Services", desc: "PCI-DSS, SOX compliance, and financial fraud prevention.", href: "/solutions/financial-services" },
          { label: "Retail", desc: "PCI-DSS, supply chain risk management, and customer data protection.", href: "/solutions/retail" },
          { label: "Technology (MSPs/MSSPs)", desc: "Multi-tenant platforms and white-label security solutions.", href: "/solutions/technology" },
        ],
      },
      {
        heading: "By Market Size",
        items: [
          { label: "SMB", desc: "Turnkey security and operations for small businesses with limited IT staff.", href: "/solutions/smb" },
          { label: "SME", desc: "Flexible platform for growing mid-market companies.", href: "/solutions/sme" },
          { label: "Enterprise", desc: "Enterprise-grade customisation, dedicated support, and advanced features.", href: "/solutions/enterprise" },
        ],
      },
    ],
  },
  "Compliance": {
    href: "/compliance",
    desc: "Managed compliance services across 12 frameworks: continuous monitoring, evidence collection, and audit-ready reporting.",
    viewAll: "View All Compliance Frameworks",
    columns: [
      {
        heading: "Government & Defence",
        items: [
          { label: "CMMC", desc: "Cybersecurity Maturity Model Certification for defence contractors.", href: "/compliance/cmmc" },
          { label: "CJIS", desc: "Criminal Justice Information Services Security Policy compliance.", href: "/compliance/cjis" },
          { label: "NIST 800-171", desc: "Protecting Controlled Unclassified Information for federal contractors.", href: "/compliance/nist-800-171" },
          { label: "NIST 800-53", desc: "Security controls for federal information systems and critical infrastructure.", href: "/compliance/nist-800-53" },
          { label: "FedRAMP", desc: "Federal Risk and Authorization Management Program for cloud service providers.", href: "/compliance/fedramp" },
          { label: "FISMA", desc: "Federal Information Security Modernisation Act compliance for federal agencies.", href: "/compliance/fisma" },
        ],
      },
      {
        heading: "Industry Standards",
        items: [
          { label: "HIPAA", desc: "HIPAA Security Rule and Privacy Rule compliance for healthcare organisations.", href: "/compliance/hipaa" },
          { label: "SOC 2", desc: "SOC 2 Type I and Type II audit readiness with continuous control monitoring.", href: "/compliance/soc2" },
          { label: "ISO 27001", desc: "International ISMS certification: 93 controls across 4 themes.", href: "/compliance/iso-27001" },
          { label: "PCI-DSS", desc: "Payment card data security and cardholder data environment protection.", href: "/compliance/pci-dss" },
          { label: "NIST CSF", desc: "NIST Cybersecurity Framework 2.0: risk-based security programme development.", href: "/compliance/nist-csf" },
          { label: "CIS Controls v8.1", desc: "18 Controls, 153 Safeguards: prioritised and actionable security controls.", href: "/compliance/cis-controls" },
        ],
      },
    ],
  },
  "Pricing": {
    href: "/pricing",
    desc: "Six flexible pricing models and three service tiers. Zero lock-in, built for your business reality.",
    viewAll: "View All Pricing & Tiers",
    columns: [
      {
        heading: "Service Tiers",
        items: [
          { label: "XRO Essentials", desc: "7 essential modules for small businesses. Deploy in 48 hours.", href: "/service-tiers/xro-essentials" },
          { label: "XMX Advanced", desc: "12 modules for growing organisations with advanced detection.", href: "/service-tiers/xmx-advanced" },
          { label: "XME Enterprise", desc: "All 18 modules with premium KubricAI orchestration.", href: "/service-tiers/xme-enterprise" },
          { label: "Custom Configuration", desc: "Get exactly the coverage you need, configured for your environment.", href: "/service-tiers/custom" },
        ],
      },
      {
        heading: "Pricing Models",
        items: [
          { label: "Precision Pay™", desc: "Pay only for what you use. Ideal for variable workloads.", href: "/pricing" },
          { label: "Flex Core™", desc: "Predictable monthly pricing based on your organisation's size.", href: "/pricing" },
          { label: "Fractional™", desc: "Access senior vCIO/vCISO expertise without full-time cost.", href: "/pricing" },
          { label: "APEX™ As-a-Service", desc: "Infrastructure delivered as a service. No CapEx.", href: "/pricing" },
          { label: "Project-Based", desc: "Defined scope, timeline, and price for discrete projects.", href: "/pricing" },
          { label: "Enterprise Custom", desc: "Custom engagement for complex, multi-year transformations.", href: "/pricing" },
        ],
      },
      {
        heading: "Get Started",
        items: [
          { label: "Onboard Today", desc: "96-question assessment: instant EMS score, tier, and pricing.", href: "/assessment/start" },
          { label: "Get Started / Contact", desc: "Choose your path: full assessment, quick contact, or talk to sales.", href: "/get-started" },
        ],
      },
    ],
  },
  "Resources": {
    href: "/documentation",
    desc: "Technical documentation for Kubric UIDR: infrastructure, orchestration, security, and compliance.",
    viewAll: "View Documentation",
    columns: [
      {
        heading: "Documentation",
        items: [
          { label: "Read the Docs", desc: "All Kubric documentation: modules, compliance, tools, services, and pricing guides.", href: "/documentation" },
          { label: "How Kubric Works", desc: "Architecture overview of the unified Kubric platform.", href: "/our-tools/how-kubric-works" },
          { label: "Compliance Matrix", desc: "Cross-reference compliance frameworks against module coverage.", href: "/compliance" },
          { label: "Onboard Today", desc: "Complete the full assessment for custom scoring and pricing.", href: "/assessment/start" },
        ],
      },
      {
        heading: "Resources",
        items: [
          { label: "Methodology", desc: "Eight-stage closed lifecycle: Hunt through Close. No gaps, no shortcuts.", href: "/methodology" },
          { label: "Pricing Guide", desc: "Six flexible pricing models explained. Find the right fit for your business.", href: "/pricing" },
          { label: "ThreatAI: CVE Lookup", desc: "Free CVE & EPSS vulnerability search with downloadable threat reports.", href: "/tools/threat-ai" },
        ],
      },
    ],
  },
  "About": {
    href: "/about",
    desc: "Learn who we are, our mission, leadership, partnerships, and career opportunities at ManageKube.",
    viewAll: "About ManageKube",
    columns: [
      {
        heading: "Company",
        items: [
          { label: "About Us", desc: "Our mission, values, and the team behind ManageKube.", href: "/about" },
          { label: "Leadership", desc: "Meet the founders: Sunny, Hildman, Hamza, and Ali.", href: "/about" },
          { label: "Careers", desc: "Build the future of managed security and IT.", href: "/careers" },
          { label: "Partners", desc: "MSP, MSSP, consulting, technology, and referral partner programs.", href: "/about/partners" },
          { label: "Roadmap", desc: "Where we are going. What we are building.", href: "/about/roadmap" },
          { label: "Get Started", desc: "Assessment, contact form, and sales inquiries in one place.", href: "/get-started" },
        ],
      },
    ],
  },
};

type MenuKey = keyof typeof megaMenu;

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<MenuKey | null>(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setActiveSection(null);
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveSection(null);
  };

  const toggleSection = (key: MenuKey) => {
    setActiveSection((prev) => (prev === key ? null : key));
  };

  const currentSection = activeSection ? megaMenu[activeSection] : null;

  return (
    <>
      {/* ── Fixed header bar ──────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border"
        style={{ height: "72px" }}
      >
        <div className="h-full flex items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex-shrink-0">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight leading-none">
              <span className="text-foreground">Manage</span>
              <span style={{ color: ORANGE }}>Kube</span>
            </span>
          </Link>

          {/* Right: utility + hamburger */}
          <div className="flex items-center gap-5">
            <Link
              to="/support"
              onClick={closeMenu}
              className="hidden sm:block text-xs font-semibold tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              Support
            </Link>
            <span className="hidden sm:block text-muted-foreground/40 text-sm">|</span>
            <Link
              to="/login/client"
              onClick={closeMenu}
              className="hidden sm:block text-xs font-semibold tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              Log In
            </Link>
            <button
              aria-label="Search"
              className="hidden sm:flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Hamburger / Close */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
              className="flex items-center justify-center text-foreground hover:text-foreground/70 transition-colors"
            >
              {menuOpen
                ? <X size={24} strokeWidth={1.5} />
                : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-page overlay menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mega-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 flex"
            style={{ backgroundColor: CHARCOAL, top: "72px" }}
          >
            {/* ── Left accordion panel ─────────────────────────────────── */}
            <div
              className="flex-shrink-0 flex flex-col overflow-y-auto"
              style={{
                width: "clamp(280px, 30vw, 420px)",
                borderRight: `1px solid ${DIVIDER}`,
              }}
            >
              {/* Nav items */}
              <nav className="flex-1 py-4">
                {(Object.keys(megaMenu) as MenuKey[]).map((key, i) => {
                  const isActive = activeSection === key;
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggleSection(key)}
                        className="w-full flex items-center justify-between px-10 py-5 text-left transition-colors group"
                        style={{ color: isActive ? ORANGE : TEXT_WHITE }}
                      >
                        <span
                          className="text-base font-semibold tracking-wide transition-colors group-hover:text-white"
                          style={{ color: isActive ? ORANGE : TEXT_WHITE }}
                        >
                          {key}
                        </span>
                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          className="transition-transform duration-200"
                          style={{
                            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                            color: isActive ? ORANGE : TEXT_MUTED,
                          }}
                        />
                      </button>
                      {/* Subtle divider — not after last item */}
                      {i < Object.keys(megaMenu).length - 1 && (
                        <div style={{ height: "1px", backgroundColor: DIVIDER, marginLeft: "40px", marginRight: "40px" }} />
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* CTA buttons at bottom */}
              <div className="px-10 py-8 space-y-3">
                <Link
                  to="/assessment/start"
                  onClick={closeMenu}
                  className="block w-full text-center py-3 px-6 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ORANGE, color: "#fff", borderRadius: "4px" }}
                >
                  Onboard Today
                </Link>
              <Link
                  to="/get-started"
                  onClick={closeMenu}
                  className="block w-full text-center py-3 px-6 text-sm font-semibold tracking-wide transition-colors hover:bg-white/10"
                  style={{ border: `1px solid rgba(255,255,255,0.35)`, color: TEXT_WHITE, borderRadius: "4px" }}
                >
                  Get Started / Contact
                </Link>
                <Link
                  to="/login/client"
                  onClick={closeMenu}
                  className="block w-full text-center py-3 px-6 text-xs font-semibold tracking-wide transition-colors hover:bg-white/10"
                  style={{ color: TEXT_MUTED, borderRadius: "4px" }}
                >
                  Log In
                </Link>
              </div>
            </div>

            {/* ── Right content panel ───────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {currentSection ? (
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}
                    className="p-10 lg:p-16 h-full"
                  >
                    {/* Section header */}
                    <div className="mb-8">
                      <p className="text-sm leading-relaxed mb-3" style={{ color: TEXT_MUTED, maxWidth: "600px" }}>
                        {currentSection.desc}
                      </p>
                      <Link
                        to={currentSection.href}
                        onClick={closeMenu}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{ color: ORANGE }}
                      >
                        {currentSection.viewAll}
                        <ArrowRight size={14} strokeWidth={2} />
                      </Link>
                    </div>

                    {/* Columns grid */}
                    <div
                      className="grid gap-x-12 gap-y-0"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(currentSection.columns.length, 3)}, 1fr)`,
                      }}
                    >
                      {currentSection.columns.map((col) => (
                        <div key={col.heading}>
                          {/* Column heading */}
                          <p
                            className="text-xs font-bold tracking-widest uppercase mb-4"
                            style={{ color: TEXT_MUTED }}
                          >
                            {col.heading}
                          </p>
                          <div className="space-y-5">
                            {col.items.map((item) => (
                              <div key={item.label}>
                                <Link
                                  to={item.href}
                                  onClick={closeMenu}
                                  className="group block"
                                >
                                  <p
                                    className="text-sm font-semibold mb-1 transition-colors group-hover:opacity-80"
                                    style={{ color: TEXT_WHITE }}
                                  >
                                    {item.label}
                                  </p>
                                  <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: TEXT_MUTED }}
                                  >
                                    {item.desc}
                                  </p>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-full"
                  >
                    <p className="text-sm" style={{ color: TEXT_MUTED }}>
                      Select a category to explore
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so page content doesn't hide under fixed header */}
      <div style={{ height: "72px" }} />
    </>
  );
};
