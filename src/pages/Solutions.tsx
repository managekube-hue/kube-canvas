/** DO NOT TOUCH - Comprehensive Solutions Page with Full Service Mapping */
import { PageLayout } from "@/components/PageLayout";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Shield, 
  Server, 
  Users, 
  FileCheck, 
  RefreshCw, 
  Zap, 
  DollarSign, 
  Building2,
  ArrowRight
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  whatThisIs: string;
  whyYouNeedIt: string;
  whatYouGet: {
    title?: string;
    items: string[];
  }[];
  howWeDeliverIt: {
    description: string;
    vendors?: {
      name: string;
      description: string;
    }[];
  }[];
  whoProvides: {
    provider: string;
    responsibilities: string;
  }[];
  typicalEngagement: {
    title?: string;
    tiers: {
      name: string;
      price: string;
    }[];
  }[];
  ctaLinks: {
    label: string;
    href: string;
  }[];
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  services: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "security",
    title: "Security & Cyber Defense Solutions",
    icon: <Shield className="w-6 h-6" />,
    description: "24/7 protection, threat detection, and security operations",
    services: [
      {
        id: "soc",
        title: "24/7 Security Operations Center (SOC)",
        whatThisIs: "A Security Operations Center is a dedicated team that watches your technology environment around the clock, looking for threats, unusual activity, or security incidents. Think of it like having security guards monitoring your building 24/7, except they're monitoring your digital infrastructure instead of physical doors and windows.",
        whyYouNeedIt: "Cyber attacks don't happen only during business hours. Hackers often strike at night or on weekends when they know your team isn't watching. A 24/7 SOC ensures someone is always paying attention, ready to respond the moment something suspicious happens.",
        whatYouGet: [
          {
            items: [
              "Continuous monitoring of all your systems, networks, and applications",
              "Real-time threat detection using advanced security tools that identify unusual patterns",
              "Immediate incident response when threats are detected, containing problems before they spread",
              "Threat hunting where security analysts proactively search for hidden threats in your environment",
              "Monthly security reports showing what threats were detected and how they were handled"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSSP Kube provides the dedicated SOC team and processes"
          },
          {
            description: "IBM QRadar SIEM (from IBM via TD SYNNEX/Arrow) acts as the \"brain\" that collects and analyzes security data from across your environment"
          },
          {
            description: "IBM X-Force Threat Intelligence (from IBM via TD SYNNEX/Arrow) provides up-to-date information about new threats and attacker techniques"
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube",
            responsibilities: "Staffs the SOC with certified security analysts, creates response playbooks, manages escalations, provides reporting"
          },
          {
            provider: "IBM QRadar",
            responsibilities: "Aggregates logs from all your systems, correlates events to detect threats, automates initial response actions"
          },
          {
            provider: "IBM X-Force",
            responsibilities: "Delivers threat intelligence feeds that help the SOC team stay ahead of emerging threats"
          }
        ],
        typicalEngagement: [
          {
            tiers: [
              { name: "Business Hours SOC (8x5 coverage)", price: "$12,000-$18,000/month depending on environment size" },
              { name: "Extended Hours SOC (12x5 coverage)", price: "$18,000-$25,000/month" },
              { name: "24/7/365 SOC (continuous coverage)", price: "$28,000-$42,000/month" }
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about MSSP Kube", href: "/kubes/mssp-kube" },
          { label: "Start with Security Assessment", href: "/assessment" }
        ]
      },
      {
        id: "edr-xdr",
        title: "Endpoint Detection and Response (EDR/XDR)",
        whatThisIs: "EDR/XDR is security software installed on every computer, laptop, and server in your organization that watches for malicious behavior. EDR focuses on endpoints (individual devices), while XDR extends this visibility across your entire technology environment including networks, cloud applications, and email systems.",
        whyYouNeedIt: "Traditional antivirus software only catches known viruses using signature matching—like having a wanted poster for bad guys. Modern attacks use techniques that avoid detection by traditional antivirus. EDR/XDR watches for suspicious behaviors instead, catching even brand-new attacks that have never been seen before.",
        whatYouGet: [
          {
            items: [
              "Behavioral monitoring that detects ransomware, malware, and hacking attempts based on what they do, not what they look like",
              "Automatic threat containment that can isolate infected devices from your network within seconds",
              "Forensic investigation tools that help understand how an attack happened and what data was accessed",
              "Managed response where security experts investigate alerts and take action on your behalf",
              "Ransomware rollback capabilities that can restore encrypted files without paying ransom"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSSP Kube manages the EDR/XDR platform, tunes detection rules, investigates alerts, and coordinates response",
            vendors: [
              { name: "Huntress", description: "From Pax8 for small-to-medium environments: Focused EDR with strong ransomware protection" },
              { name: "SentinelOne", description: "From Pax8 or TD SYNNEX: AI-driven EDR/XDR with autonomous response capabilities" },
              { name: "CrowdStrike Falcon", description: "From TD SYNNEX for larger environments: Enterprise-grade XDR with extensive threat intelligence" },
              { name: "IBM QRadar EDR", description: "From IBM via TD SYNNEX/Arrow: Integrated with QRadar SIEM for unified security operations" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube",
            responsibilities: "Deploys agents to all devices, configures detection policies, triages alerts, coordinates incident response, provides monthly threat reports"
          },
          {
            provider: "Huntress/SentinelOne/CrowdStrike/IBM",
            responsibilities: "Provides the detection software, threat intelligence, and cloud backend that analyzes behavior across all your devices"
          },
          {
            provider: "ManageKube NOC",
            responsibilities: "Coordinates with MSSP team when EDR detects threats requiring immediate infrastructure changes (network isolation, server shutdowns)"
          }
        ],
        typicalEngagement: [
          {
            title: "Pricing based on number of protected endpoints (computers, laptops, servers):",
            tiers: [
              { name: "Small deployment (25-100 endpoints)", price: "$4,000-$8,000/month including managed service" },
              { name: "Mid-market (100-500 endpoints)", price: "$12,000-$25,000/month including managed service" },
              { name: "Enterprise (500+ endpoints)", price: "$35,000-$75,000/month including managed service and 24/7 SOC integration" }
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about MSSP Kube", href: "/kubes/mssp-kube" },
          { label: "Calculate your endpoint count", href: "/assessment" }
        ]
      },
      {
        id: "email-security",
        title: "Email Security and Anti-Phishing",
        whatThisIs: "Email security solutions analyze every message coming into and going out of your organization, blocking malicious emails before they reach employees' inboxes. This includes scanning for viruses, blocking phishing attempts (fake emails trying to steal passwords), and preventing sensitive data from being accidentally or maliciously sent outside your organization.",
        whyYouNeedIt: "Email remains the number one way hackers break into organizations. Over 90% of successful cyber attacks start with a phishing email that tricks an employee into clicking a malicious link or providing their password. Email security provides multiple layers of defense that catch these attacks before they reach users.",
        whatYouGet: [
          {
            items: [
              "Advanced spam filtering that blocks junk mail and malicious messages",
              "Phishing protection using AI to detect fake emails impersonating trusted brands or colleagues",
              "Malware scanning that analyzes attachments in isolated environments before delivering them",
              "Data loss prevention that stops employees from accidentally emailing sensitive information like social security numbers or credit cards",
              "Email encryption for sending confidential information securely",
              "Impersonation protection that detects when hackers try to impersonate executives (CEO fraud)"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSSP Kube manages the email security platform, fine-tunes filters, investigates quarantined messages, and provides security awareness training",
            vendors: [
              { name: "Proofpoint Essentials", description: "From Pax8 for small-to-medium businesses: Comprehensive email security with strong phishing protection" },
              { name: "Mimecast", description: "From TD SYNNEX for larger organizations: Enterprise email security with archiving and continuity features" },
              { name: "Avanan", description: "From Pax8 for Microsoft 365 users: Cloud-native security that integrates deeply with Microsoft 365" },
              { name: "Barracuda Email Security", description: "From TD SYNNEX: Cost-effective email security with strong anti-phishing capabilities" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube",
            responsibilities: "Deploys and configures email security, manages quarantine and whitelist policies, provides user training on spotting phishing, investigates suspicious emails reported by users"
          },
          {
            provider: "Proofpoint/Mimecast/Avanan/Barracuda",
            responsibilities: "Provides the scanning engines, threat intelligence feeds, and cloud infrastructure that analyzes all email traffic"
          },
          {
            provider: "Your existing email system",
            responsibilities: "Continues to handle email delivery (Microsoft 365, Google Workspace, on-premises Exchange)—the security solution sits in front and filters messages before delivery"
          }
        ],
        typicalEngagement: [
          {
            title: "Pricing based on number of email users (mailboxes protected):",
            tiers: [
              { name: "Small business (10-100 users)", price: "$500-$2,000/month including managed service" },
              { name: "Mid-market (100-500 users)", price: "$2,500-$7,500/month including managed service" },
              { name: "Enterprise (500+ users)", price: "$8,000-$20,000/month including managed service and advanced threat response" }
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about MSSP Kube", href: "/kubes/mssp-kube" },
          { label: "Test your current email security", href: "/assessment" }
        ]
      },
      {
        id: "vulnerability-management",
        title: "Vulnerability Management and Penetration Testing",
        whatThisIs: "Vulnerability management is the continuous process of finding security weaknesses in your systems before hackers do. This involves automated scanning tools that check for missing patches, configuration errors, and known vulnerabilities. Penetration testing goes further—ethical hackers attempt to break into your systems using the same techniques real attackers would use, identifying weaknesses that automated scans might miss.",
        whyYouNeedIt: "New security vulnerabilities are discovered every day in common software like Windows, Microsoft Office, and web browsers. Hackers use automated tools to scan the internet looking for organizations with these vulnerabilities. You need to find and fix these weaknesses faster than attackers can find and exploit them. Many compliance frameworks (SOC 2, HIPAA, PCI DSS) also require regular vulnerability assessments and penetration testing.",
        whatYouGet: [
          {
            title: "Vulnerability Management (continuous):",
            items: [
              "Monthly automated scans of all systems, identifying security weaknesses",
              "Prioritized remediation roadmaps that rank vulnerabilities by severity and exploitability",
              "Patch management coordination working with your MSP team to deploy critical security updates",
              "Compliance-ready reports formatted for auditors showing your security posture over time",
              "Vulnerability dashboards giving real-time visibility into security gaps across your environment"
            ]
          },
          {
            title: "Penetration Testing (periodic):",
            items: [
              "Annual comprehensive penetration tests simulating real-world attacks against your networks, applications, and systems",
              "Quarterly focused tests targeting specific high-risk areas like external-facing web applications or VPN access",
              "Social engineering assessments testing whether employees fall for phishing, pretexting, or other manipulation techniques",
              "Detailed findings reports explaining each vulnerability discovered, its potential impact, and remediation steps",
              "Executive summaries translating technical findings into business risk language for leadership"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "Vulnerability Management:",
            vendors: [
              { name: "ManageKube MSSP Kube", description: "Coordinates the vulnerability management program and remediation efforts" },
              { name: "Tenable Nessus/Tenable.io", description: "From TD SYNNEX: Industry-standard vulnerability scanner with extensive coverage" },
              { name: "Qualys VMDR", description: "From TD SYNNEX: Cloud-based vulnerability management with continuous monitoring" },
              { name: "Rapid7 InsightVM", description: "From TD SYNNEX: Vulnerability management integrated with threat intelligence" },
              { name: "ManageKube MSP Kube", description: "Executes the patching and remediation work identified by scans" }
            ]
          },
          {
            description: "Penetration Testing:",
            vendors: [
              { name: "ManageKube MSSP Kube", description: "Coordinates testing schedules and remediation verification" },
              { name: "Vonahi vPenTest", description: "From Pax8: Automated penetration testing platform with expert validation" },
              { name: "Horizon3.ai NodeZero", description: "From TD SYNNEX: Autonomous penetration testing simulating advanced attackers" },
              { name: "Rapid7 InsightAppSec", description: "From TD SYNNEX: Application security testing for web applications and APIs" },
              { name: "Third-party specialists", description: "For complex environments requiring manual testing and social engineering" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube MSSP Team",
            responsibilities: "Schedules scans, analyzes results, creates prioritized remediation plans, coordinates with infrastructure teams, tracks remediation progress, provides executive reporting"
          },
          {
            provider: "Tenable/Qualys/Rapid7",
            responsibilities: "Provides scanning engines, vulnerability databases, threat intelligence, and risk scoring that identify weaknesses"
          },
          {
            provider: "ManageKube MSP Team",
            responsibilities: "Executes the actual patching, configuration changes, and infrastructure updates to remediate vulnerabilities"
          },
          {
            provider: "Penetration testing vendors",
            responsibilities: "Execute simulated attacks, document findings, provide remediation guidance"
          },
          {
            provider: "ManageKube Advisory Team (vCISO)",
            responsibilities: "Translates findings into strategic risk decisions and resource prioritization"
          }
        ],
        typicalEngagement: [
          {
            title: "Vulnerability Management (monthly recurring):",
            tiers: [
              { name: "Small environment (25-100 assets)", price: "$2,000-$4,000/month including scanning and remediation coordination" },
              { name: "Mid-market (100-500 assets)", price: "$5,000-$12,000/month including scanning and remediation coordination" },
              { name: "Enterprise (500+ assets)", price: "$15,000-$35,000/month including scanning and remediation coordination" }
            ]
          },
          {
            title: "Penetration Testing (periodic projects):",
            tiers: [
              { name: "Small scope test (single application or network segment)", price: "$8,000-$15,000 per test" },
              { name: "Comprehensive annual test (full external and internal)", price: "$25,000-$50,000 per year" },
              { name: "Enterprise testing program (quarterly tests + social engineering)", price: "$75,000-$150,000 per year" }
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about MSSP Kube", href: "/kubes/mssp-kube" },
          { label: "Schedule a vulnerability assessment", href: "/assessment" }
        ]
      }
    ]
  }
];

const categoryNavItems = [
  { id: "security", label: "Security & Cyber Defense", icon: <Shield className="w-4 h-4" /> },
  { id: "infrastructure", label: "Infrastructure & Operations", icon: <Server className="w-4 h-4" /> },
  { id: "workplace", label: "Workplace & Productivity", icon: <Users className="w-4 h-4" /> },
  { id: "compliance", label: "Compliance & Governance", icon: <FileCheck className="w-4 h-4" /> },
  { id: "continuity", label: "Business Continuity", icon: <RefreshCw className="w-4 h-4" /> },
  { id: "automation", label: "Automation & Efficiency", icon: <Zap className="w-4 h-4" /> },
  { id: "cost", label: "Cost & Strategy", icon: <DollarSign className="w-4 h-4" /> },
  { id: "industry", label: "Industry-Specific", icon: <Building2 className="w-4 h-4" /> },
];

const ServiceCard = ({ service }: { service: ServiceItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border bg-white">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 lg:p-8 text-left flex items-start justify-between gap-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
            {service.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {service.whatThisIs.substring(0, 150)}...
          </p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isExpanded ? (
            <ChevronDown className="w-6 h-6 text-brand-orange" />
          ) : (
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 lg:px-8 pb-8 space-y-8 border-t border-border pt-8">
              {/* What This Is */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-3">
                  What This Is
                </h4>
                <p className="text-foreground leading-relaxed">
                  {service.whatThisIs}
                </p>
              </div>

              {/* Why You Need It */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-3">
                  Why You Need It
                </h4>
                <p className="text-foreground leading-relaxed">
                  {service.whyYouNeedIt}
                </p>
              </div>

              {/* What You Get */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-3">
                  What You Get
                </h4>
                {service.whatYouGet.map((section, idx) => (
                  <div key={idx} className="mb-4">
                    {section.title && (
                      <p className="font-semibold text-foreground mb-2">{section.title}</p>
                    )}
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* How We Deliver It */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-3">
                  How We Deliver It
                </h4>
                {service.howWeDeliverIt.map((delivery, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-foreground font-medium mb-2">{delivery.description}</p>
                    {delivery.vendors && (
                      <div className="pl-4 space-y-2">
                        {delivery.vendors.map((vendor, vIdx) => (
                          <div key={vIdx} className="flex items-start gap-2">
                            <span className="text-brand-orange font-semibold">{vendor.name}:</span>
                            <span className="text-muted-foreground">{vendor.description}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Who Provides What */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-3">
                  Who Provides What
                </h4>
                <div className="space-y-3">
                  {service.whoProvides.map((provider, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="font-semibold text-foreground">{provider.provider}:</span>
                      <span className="text-muted-foreground">{provider.responsibilities}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Engagement */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-3">
                  Typical Engagement
                </h4>
                {service.typicalEngagement.map((engagement, idx) => (
                  <div key={idx} className="mb-4">
                    {engagement.title && (
                      <p className="font-medium text-foreground mb-2">{engagement.title}</p>
                    )}
                    <div className="grid sm:grid-cols-3 gap-3">
                      {engagement.tiers.map((tier, tIdx) => (
                        <div key={tIdx} className="bg-secondary p-4">
                          <p className="font-semibold text-foreground text-sm mb-1">{tier.name}</p>
                          <p className="text-brand-orange font-bold">{tier.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Links */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                {service.ctaLinks.map((cta, idx) => (
                  <Link
                    key={idx}
                    to={cta.href}
                    className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:underline"
                  >
                    {cta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Solutions = () => {
  const [activeCategory, setActiveCategory] = useState("security");
  const [searchQuery, setSearchQuery] = useState("");

  const activeServices = serviceCategories.find(cat => cat.id === activeCategory)?.services || [];

  const filteredServices = searchQuery 
    ? activeServices.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.whatThisIs.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeServices;

  return (
    <PageLayout>
      {/* Hero Banner */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            hsl(0 0% 6%) 0%, 
            hsl(0 0% 12%) 35%, 
            hsl(24 95% 35%) 65%, 
            hsl(24 95% 45%) 85%, 
            hsl(0 0% 50%) 100%
          )`,
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(0 0% 100% / 0.05) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 100% / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold uppercase tracking-widest text-white/70 mb-6"
            >
              SOLUTIONS BY CAPABILITY
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Complete IT Transformation{" "}
              <span className="block text-brand-orange">From Assessment to Optimization</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-white/80 max-w-3xl"
            >
              Every service. Every vendor. One accountability point.
            </motion.p>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Search and Category Navigation */}
      <section className="sticky top-20 lg:top-24 z-30 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Search Bar */}
          <div className="py-4 border-b border-border">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
              />
            </div>
          </div>

          {/* Category Navigation */}
          <div className="py-3 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {categoryNavItems.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-foreground text-white"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Active Category Section */}
      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Category Header */}
          {serviceCategories.filter(cat => cat.id === activeCategory).map((category) => (
            <div key={category.id} className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-brand-orange text-white">
                  {category.icon}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {category.description}
              </p>
            </div>
          ))}

          {/* Services List */}
          <div className="space-y-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            ) : (
              <div className="text-center py-12 bg-white border border-border">
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `No services found matching "${searchQuery}"`
                    : "More services coming soon for this category."
                  }
                </p>
              </div>
            )}
          </div>

          {/* Coming Soon Notice for other categories */}
          {activeCategory !== "security" && (
            <div className="mt-8 p-8 bg-white border border-border text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Additional Services Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                We're adding detailed service documentation for this category. 
                In the meantime, contact us to discuss your specific needs.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
              >
                Contact Our Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="border-t-2 border-foreground pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Need Guidance?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our assessment helps identify the right solutions for your specific needs.
              </p>
              <Link to="/assessment" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Take Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border-t-2 border-foreground pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Complex Project?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For data center builds, migrations, or enterprise deployments, talk to our experts.
              </p>
              <Link to="/contact" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border-t-2 border-foreground pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Browse by Kube</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore our service Kubes to see how solutions integrate with managed services.
              </p>
              <Link to="/kubes" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Explore Kubes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PathfinderCTA />
    </PageLayout>
  );
};

export default Solutions;
/** END DO NOT TOUCH */
