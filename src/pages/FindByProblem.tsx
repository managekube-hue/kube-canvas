/** DO NOT TOUCH - Solutions by Problem Page - Complete Implementation */
import { PageLayout } from "@/components/PageLayout";
import { PathfinderCTA } from "@/components/PathfinderCTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { 
  ArrowRight, 
  Search,
  Shield, 
  Server, 
  Cloud, 
  Users, 
  Lock, 
  Zap, 
  Building2, 
  Cog,
  AlertTriangle,
  Eye,
  Mail,
  Network,
  HardDrive,
  Laptop,
  Phone,
  Clock,
  Bot,
  Brain,
  Code,
  DollarSign,
  FileCheck,
  Factory,
  Heart,
  Wallet,
  ShoppingCart,
  Truck,
  Mountain,
  Lightbulb,
  Radio,
  Landmark
} from "lucide-react";

/** DO NOT TOUCH - Complete Solutions Data Structure */
const solutionCategories = [
  {
    id: "security-compliance",
    title: "SECURITY & COMPLIANCE",
    icon: Shield,
    problems: [
      {
        problem: "We keep failing audits",
        solution: "Compliance Kube → Gap Remediation Block",
        whatYouGet: "Automated evidence collection, control implementation, audit liaison",
        frameworks: ["SOC 2", "HIPAA", "CMMC", "ISO 27001", "PCI DSS"],
        cta: "Explore Compliance Kube",
        href: "/kubes/compliance-kube"
      },
      {
        problem: "We got hit by ransomware",
        solution: "MSSP Kube → Cyber Recovery Block + EDR/XDR Block",
        whatYouGet: "Immutable backups, ransomware detection, incident response",
        tech: "PowerProtect Cyber Recovery + IBM Storage Sentinel",
        cta: "Explore MSSP Kube",
        href: "/kubes/mssp-kube"
      },
      {
        problem: "We don't have 24/7 security monitoring",
        solution: "MSSP Kube → 24/7 SOC Block",
        whatYouGet: "Always-on threat detection, incident response, threat hunting",
        tech: "IBM QRadar SIEM + X-Force Intelligence",
        cta: "Explore MSSP Kube",
        href: "/kubes/mssp-kube"
      },
      {
        problem: "Employees click on phishing emails",
        solution: "MSSP Kube → Email Security Block + Security Awareness",
        whatYouGet: "Email filtering, anti-phishing, simulated phishing campaigns",
        tech: "Email Security Gateway + Training Platform",
        cta: "Explore MSSP Kube",
        href: "/kubes/mssp-kube"
      },
      {
        problem: "We need Zero Trust architecture",
        solution: "MSSP Kube → Zero Trust Network Access Block",
        whatYouGet: "Identity-centric access, network segmentation, least privilege",
        tech: "IBM Verify + Network Segmentation",
        cta: "Explore MSSP Kube",
        href: "/kubes/mssp-kube"
      },
      {
        problem: "We don't know our security posture",
        solution: "Assessment Kube → Security Assessment Block",
        whatYouGet: "FREE vulnerability scan, risk scoring, remediation roadmap",
        timeline: "4 weeks",
        cta: "Start Free Assessment",
        href: "/assessment"
      }
    ]
  },
  {
    id: "infrastructure-operations",
    title: "INFRASTRUCTURE & OPERATIONS",
    icon: Server,
    problems: [
      {
        problem: "Our servers are old and failing",
        solution: "Product Kube → Infrastructure Refresh Block",
        whatYouGet: "Server replacement, data migration, warranty coverage",
        tech: "Dell PowerEdge servers + Professional installation",
        cta: "Configure Infrastructure",
        href: "/kubes/product-kube"
      },
      {
        problem: "We need to move to the cloud",
        solution: "MSP Kube → Cloud Migration Block",
        whatYouGet: "AWS/Azure migration, hybrid cloud setup, managed operations",
        tech: "Multi-cloud management + APEX consumption model",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "Our network is too slow",
        solution: "Product Kube → Network Upgrade Block",
        whatYouGet: "Switch replacement, WiFi upgrade, cabling services",
        tech: "Dell PowerSwitch + NativeEdge management",
        cta: "Configure Network",
        href: "/kubes/product-kube"
      },
      {
        problem: "We have no disaster recovery plan",
        solution: "MSP Kube → BCDR Block",
        whatYouGet: "Backup automation, disaster recovery testing, RTO <4hr",
        tech: "PowerProtect Data Manager + Cyber Recovery",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "Our IT team is overwhelmed",
        solution: "MSP Kube → Service Desk Block",
        whatYouGet: "24/7 helpdesk, ticket management, L1-L3 support",
        pricing: "Precision Pay™ (consumption-based) or Flex Core™ (tiered)",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "We can't manage hybrid cloud complexity",
        solution: "MSP Kube → Hybrid Infrastructure Block",
        whatYouGet: "Multi-cloud management, cost optimization, unified dashboard",
        tech: "Turbonomic + Cloud Pak for AIOps",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "Our data is growing out of control",
        solution: "Product Kube → Storage Expansion Block",
        whatYouGet: "High-capacity storage, data tiering, deduplication",
        tech: "Dell PowerScale + ObjectScale",
        cta: "Configure Storage",
        href: "/kubes/product-kube"
      }
    ]
  },
  {
    id: "workplace-productivity",
    title: "WORKPLACE & PRODUCTIVITY",
    icon: Laptop,
    problems: [
      {
        problem: "Remote work is chaotic",
        solution: "MSP Kube → Managed Workplace Block",
        whatYouGet: "VDI setup, endpoint security, collaboration tools",
        tech: "Microsoft 365 + Dell APEX PCaaS + MaaS360 UEM",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "We need to upgrade to Microsoft 365",
        solution: "Product Kube → M365 Migration Block",
        whatYouGet: "Tenant setup, email migration, training, security policies",
        tech: "Microsoft 365 E3/E5 + SkyKick migration",
        cta: "Configure M365 Migration",
        href: "/kubes/product-kube"
      },
      {
        problem: "Our phone system is outdated",
        solution: "Product Kube → UCaaS Deployment Block",
        whatYouGet: "VoIP phones, Microsoft Teams integration, call routing",
        tech: "RingCentral or Microsoft Teams Phone",
        cta: "Configure UCaaS",
        href: "/kubes/product-kube"
      },
      {
        problem: "We need a contact center",
        solution: "Product Kube → CCaaS Deployment Block",
        whatYouGet: "Cloud contact center, call recording, analytics",
        tech: "RingCentral Contact Center or Five9",
        cta: "Configure CCaaS",
        href: "/kubes/product-kube"
      },
      {
        problem: "Employees have too many devices to manage",
        solution: "MSP Kube → Unified Endpoint Management Block",
        whatYouGet: "MDM/UEM, security policies, app deployment",
        tech: "Microsoft Intune or IBM MaaS360",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "We need endpoint refresh",
        solution: "Advisory Kube → Hardware as a Service Block",
        whatYouGet: "APEX PCaaS subscription, device lifecycle, zero CapEx",
        tech: "Dell Latitude/OptiPlex fleet",
        cta: "Explore Advisory Kube",
        href: "/kubes/advisory-kube"
      }
    ]
  },
  {
    id: "compliance-governance",
    title: "COMPLIANCE & GOVERNANCE",
    icon: FileCheck,
    problems: [
      {
        problem: "We need HIPAA compliance",
        solution: "Compliance Kube → HIPAA Block + Healthcare H2BLOCK",
        whatYouGet: "HIPAA gap remediation, BAAs, audit support",
        frameworks: ["HIPAA Security Rule", "Privacy Rule"],
        cta: "Explore Healthcare Solutions",
        href: "/industries/healthcare"
      },
      {
        problem: "We need SOC 2 certification",
        solution: "Compliance Kube → SOC 2 Block",
        whatYouGet: "Control implementation, evidence automation, Type II audit",
        timeline: "12-16 weeks to audit-ready",
        cta: "Explore Compliance Kube",
        href: "/kubes/compliance-kube"
      },
      {
        problem: "We need CMMC for defense contracts",
        solution: "Compliance Kube → CMMC Block + Manufacturing M2BLOCK",
        whatYouGet: "CMMC Level 2/3 assessment, POA&M, CUI protection",
        frameworks: ["NIST 800-171", "CMMC 2.0"],
        cta: "Explore Manufacturing Solutions",
        href: "/industries/manufacturing"
      },
      {
        problem: "We need PCI DSS for credit cards",
        solution: "Compliance Kube → PCI DSS Block + Financial F2BLOCK",
        whatYouGet: "PCI Level 1 certification, ASV scans, tokenization",
        frameworks: ["PCI DSS v4.0"],
        cta: "Explore Financial Solutions",
        href: "/industries/financial-services"
      },
      {
        problem: "We need FedRAMP for government",
        solution: "Compliance Kube → FedRAMP Block + Public Sector PS2KUBE",
        whatYouGet: "FedRAMP Moderate/High, 3PAO audit, continuous ATO",
        tech: "APEX Multi-Cloud FedRAMP-authorized",
        cta: "Explore Public Sector Solutions",
        href: "/industries/public-sector"
      }
    ]
  },
  {
    id: "business-continuity",
    title: "BUSINESS CONTINUITY",
    icon: Clock,
    problems: [
      {
        problem: "We have no backup system",
        solution: "MSP Kube → Backup & Recovery Block",
        whatYouGet: "Automated backups, retention policies, recovery testing",
        tech: "PowerProtect Data Manager + Avamar",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "We need ransomware protection",
        solution: "MSSP Kube → Cyber Recovery Block",
        whatYouGet: "Immutable backups, air-gapped vault, recovery orchestration",
        tech: "PowerProtect Cyber Recovery + Storage Sentinel",
        cta: "Explore MSSP Kube",
        href: "/kubes/mssp-kube"
      },
      {
        problem: "Our RTO is too long",
        solution: "MSP Kube → DRaaS Block",
        whatYouGet: "Hot/warm DR site, failover automation, RTO <4hr",
        tech: "PowerProtect DD + Cyber Recovery",
        cta: "Explore MSP Kube",
        href: "/kubes/msp-kube"
      },
      {
        problem: "We lost data and can't recover it",
        solution: "Advisory Kube → Data Recovery Services Block",
        whatYouGet: "Emergency recovery services, forensic analysis",
        engagement: "Fixed-fee emergency engagement",
        cta: "Contact Emergency Services",
        href: "/contact"
      }
    ]
  },
  {
    id: "automation-efficiency",
    title: "AUTOMATION & EFFICIENCY",
    icon: Bot,
    problems: [
      {
        problem: "We waste time on manual tasks",
        solution: "Innovation Kube → RPA Block",
        whatYouGet: "Process mining, bot development, workflow automation",
        tech: "IBM RPA + Process Mining + UiPath",
        cta: "Explore Innovation Kube",
        href: "/kubes/innovation-kube"
      },
      {
        problem: "We need AI capabilities",
        solution: "Innovation Kube → AI & Analytics Block",
        whatYouGet: "AI model training, watsonx platform, custom AI apps",
        tech: "IBM watsonx + Dell PowerEdge XE GPU servers",
        cta: "Explore Innovation Kube",
        href: "/kubes/innovation-kube"
      },
      {
        problem: "Our development is too slow",
        solution: "Innovation Kube → DevSecOps Block",
        whatYouGet: "CI/CD pipelines, GitOps, automated testing",
        tech: "Red Hat OpenShift + IBM Continuous Delivery",
        cta: "Explore Innovation Kube",
        href: "/kubes/innovation-kube"
      },
      {
        problem: "We can't integrate our systems",
        solution: "Innovation Kube → Systems Integration Block",
        whatYouGet: "API development, iPaaS platform, data integration",
        tech: "IBM Cloud Pak for Integration + MQ",
        cta: "Explore Innovation Kube",
        href: "/kubes/innovation-kube"
      },
      {
        problem: "We need custom software development",
        solution: "Innovation Kube → Custom Development Block",
        whatYouGet: "Agile development, MVP delivery, application modernization",
        tech: "IBM watsonx Code Assistant + Cloud-native stack",
        cta: "Explore Innovation Kube",
        href: "/kubes/innovation-kube"
      }
    ]
  },
  {
    id: "cost-strategy",
    title: "COST & STRATEGY",
    icon: DollarSign,
    problems: [
      {
        problem: "Our cloud bill is out of control",
        solution: "Advisory Kube → FinOps Block",
        whatYouGet: "Cost optimization, right-sizing, budget forecasting",
        tech: "Turbonomic + IBM Cloud Pak for AIOps",
        cta: "Explore Advisory Kube",
        href: "/kubes/advisory-kube"
      },
      {
        problem: "We don't have an IT strategy",
        solution: "Advisory Kube → vCIO Block",
        whatYouGet: "Technology roadmap, budget planning, vendor management",
        engagement: "Monthly retainer or Fractional™ on-demand",
        cta: "Explore Advisory Kube",
        href: "/kubes/advisory-kube"
      },
      {
        problem: "We don't have security leadership",
        solution: "Advisory Kube → vCISO Block",
        whatYouGet: "Security program governance, risk assessment, policy development",
        engagement: "Monthly retainer or Fractional™ on-demand",
        cta: "Explore Advisory Kube",
        href: "/kubes/advisory-kube"
      },
      {
        problem: "We need M&A due diligence",
        solution: "Advisory Kube → M&A Advisory Block",
        whatYouGet: "IT assessment, integration planning, risk analysis",
        timeline: "4-6 week engagement",
        cta: "Explore Advisory Kube",
        href: "/kubes/advisory-kube"
      }
    ]
  },
  {
    id: "industry-specific",
    title: "INDUSTRY-SPECIFIC",
    icon: Building2,
    problems: [
      {
        problem: "We need manufacturing OT security",
        solution: "Manufacturing M2BLOCK",
        whatYouGet: "OT/IT convergence, CMMC compliance, predictive maintenance",
        tech: "Dell PowerEdge XR + IBM Maximo",
        cta: "Explore M2BLOCK",
        href: "/industries/manufacturing"
      },
      {
        problem: "We need healthcare EHR resilience",
        solution: "Healthcare H2BLOCK",
        whatYouGet: "HIPAA automation, ransomware immunity, clinical uptime",
        tech: "Dell PowerMax + IBM Maximo Healthcare",
        cta: "Explore H2BLOCK",
        href: "/industries/healthcare"
      },
      {
        problem: "We need financial fraud detection",
        solution: "Financial Services F2BLOCK",
        whatYouGet: "Real-time fraud AI, SOC 2 compliance, zero-trust",
        tech: "IBM Safer Payments + Dell PowerMax",
        cta: "Explore F2BLOCK",
        href: "/industries/financial-services"
      },
      {
        problem: "We need retail omnichannel",
        solution: "Retail R2BLOCK",
        whatYouGet: "Unified commerce, inventory sync, store operations",
        tech: "Dell NativeEdge Retail + IBM Sterling",
        cta: "Explore R2BLOCK",
        href: "/industries/retail"
      },
      {
        problem: "We need fleet management",
        solution: "Transportation T2BLOCK",
        whatYouGet: "Predictive maintenance, route optimization, fleet visibility",
        tech: "Dell PowerEdge XR Rugged + IBM Maximo",
        cta: "Explore T2BLOCK",
        href: "/industries/transportation"
      },
      {
        problem: "We need remote mine operations",
        solution: "Mining & Extraction ME2BLOCK",
        whatYouGet: "OT security, asset management, environmental compliance",
        tech: "Dell PowerEdge XR + IBM Maximo + OSDU",
        cta: "Explore ME2BLOCK",
        href: "/industries/mining-extraction"
      },
      {
        problem: "We need grid resilience",
        solution: "Energy & Utilities EU2BLOCK",
        whatYouGet: "NERC-CIP compliance, smart grid, renewable integration",
        tech: "Dell NativeEdge Energy + IBM Maximo",
        cta: "Explore EU2BLOCK",
        href: "/industries/energy-utilities"
      },
      {
        problem: "We need 5G infrastructure",
        solution: "Telecommunications TC2KUBE",
        whatYouGet: "5G core network, Open RAN, edge compute",
        tech: "Dell PowerEdge 17G + IBM Telecom Automation",
        cta: "Explore TC2KUBE",
        href: "/industries/telecommunications"
      },
      {
        problem: "We need FedRAMP cloud",
        solution: "Public Sector PS2KUBE",
        whatYouGet: "FedRAMP infrastructure, CJIS compliance, smart city",
        tech: "Dell APEX FedRAMP + IBM watsonx Government",
        cta: "Explore PS2KUBE",
        href: "/industries/public-sector"
      }
    ]
  }
];
/** END DO NOT TOUCH - Solutions Data */

/** DO NOT TOUCH - Solution Card Component */
interface SolutionProblem {
  problem: string;
  solution: string;
  whatYouGet: string;
  tech?: string;
  frameworks?: string[];
  timeline?: string;
  pricing?: string;
  engagement?: string;
  cta: string;
  href: string;
}

const SolutionCard = ({ item, index }: { item: SolutionProblem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="border border-border bg-white p-6 hover:border-foreground transition-all group"
    >
      <div className="mb-4">
        <h4 className="text-lg font-bold text-foreground mb-1">
          "{item.problem}"
        </h4>
        <p className="text-sm font-semibold text-brand-orange">
          {item.solution}
        </p>
      </div>
      
      <div className="space-y-3 mb-6">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What you get:</span>
          <p className="text-sm text-foreground mt-1">{item.whatYouGet}</p>
        </div>
        
        {item.tech && (
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tech:</span>
            <p className="text-sm text-foreground mt-1">{item.tech}</p>
          </div>
        )}
        
        {item.frameworks && item.frameworks.length > 0 && (
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Frameworks:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {item.frameworks.map((fw) => (
                <span key={fw} className="text-xs bg-secondary px-2 py-1 text-muted-foreground">
                  {fw}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {item.timeline && (
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Timeline:</span>
            <p className="text-sm text-foreground mt-1">{item.timeline}</p>
          </div>
        )}
        
        {item.pricing && (
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pricing:</span>
            <p className="text-sm text-foreground mt-1">{item.pricing}</p>
          </div>
        )}
        
        {item.engagement && (
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Engagement:</span>
            <p className="text-sm text-foreground mt-1">{item.engagement}</p>
          </div>
        )}
      </div>
      
      <Link
        to={item.href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-brand-orange transition-colors"
      >
        {item.cta}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};
/** END DO NOT TOUCH - Solution Card */

/** DO NOT TOUCH - Main Page Component */
const FindByProblem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Real-time filtering as user types
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return solutionCategories;
    
    const query = searchQuery.toLowerCase();
    
    return solutionCategories
      .map(category => ({
        ...category,
        problems: category.problems.filter(problem => 
          problem.problem.toLowerCase().includes(query) ||
          problem.solution.toLowerCase().includes(query) ||
          problem.whatYouGet.toLowerCase().includes(query) ||
          (problem.tech && problem.tech.toLowerCase().includes(query)) ||
          ('frameworks' in problem && problem.frameworks && problem.frameworks.some(fw => fw.toLowerCase().includes(query)))
        )
      }))
      .filter(category => category.problems.length > 0);
  }, [searchQuery]);
  
  const totalProblems = solutionCategories.reduce((acc, cat) => acc + cat.problems.length, 0);
  const filteredProblems = filteredCategories.reduce((acc, cat) => acc + cat.problems.length, 0);

  return (
    <PageLayout>
      {/* Hero Section with Gradient Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(24 95% 40%) 50%, hsl(var(--muted)) 100%)",
          }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-label text-white/70 mb-6"
            >
              SOLUTIONS BY PROBLEM
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Find the exact solution for your{" "}
              <span className="text-brand-orange">IT challenge</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-white/80 max-w-2xl mb-8"
            >
              Every IT problem has a proven solution. Search or browse {totalProblems} mapped problems across 8 categories to find the right Kube, Block, and technology stack for your needs.
            </motion.p>
            
            {/* Smart Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="What problem are you trying to solve?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              {searchQuery && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {filteredProblems} of {totalProblems} solutions
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3">
            {solutionCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-foreground hover:text-white transition-colors text-sm font-medium"
              >
                <category.icon className="w-4 h-4" />
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Categories */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-foreground mb-4">No solutions found</h3>
              <p className="text-muted-foreground mb-6">Try a different search term or browse all categories below.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredCategories.map((category) => (
                <div key={category.id} id={category.id}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-foreground flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                      {category.title}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {category.problems.length} solutions
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.problems.map((problem, index) => (
                      <SolutionCard key={problem.problem} item={problem} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Not Sure CTA */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Not sure which problem to prioritize?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Our free assessment analyzes your entire environment and prioritizes 
            recommendations based on risk and business impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Onboard Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-foreground px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Other Ways to Find Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/find-by-size" className="group border border-border p-8 hover:border-foreground transition-all">
              <Users className="w-10 h-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">
                Find by Business Size
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Solutions tailored for small business, mid-market, and enterprise organizations.
              </p>
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link to="/kubes/industry-kube" className="group border border-border p-8 hover:border-foreground transition-all">
              <Building2 className="w-10 h-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">
                Find by Industry
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Pre-configured BLOCKs for healthcare, manufacturing, finance, and 6 more industries.
              </p>
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link to="/kubes" className="group border border-border p-8 hover:border-foreground transition-all">
              <Cog className="w-10 h-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">
                Explore All Kubes
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Browse all 8 Kubes to understand our complete service portfolio.
              </p>
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};
/** END DO NOT TOUCH - Main Page Component */

export default FindByProblem;
