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
        solution: "GRC Module → Managed Compliance Service",
        whatYouGet: "Automated evidence collection, control implementation, audit liaison",
        frameworks: ["SOC 2", "HIPAA", "CMMC", "ISO 27001", "PCI DSS"],
        cta: "Explore GRC Module",
        href: "/service-layer/grc"
      },
      {
        problem: "We got hit by ransomware",
        solution: "BDR Module + Managed SOC Service",
        whatYouGet: "Immutable backups, ransomware detection, incident response",
        tech: "Backup & Disaster Recovery + 24/7 SOC",
        cta: "Explore BDR Module",
        href: "/service-layer/bdr"
      },
      {
        problem: "We don't have 24/7 security monitoring",
        solution: "Managed SOC Service",
        whatYouGet: "Always-on threat detection, incident response, threat hunting",
        tech: "ITDR + NDR + CDR Modules",
        cta: "Managed SOC",
        href: "/services/managed-soc"
      },
      {
        problem: "Employees click on phishing emails",
        solution: "ITDR Module → Identity Threat Detection",
        whatYouGet: "Email filtering, anti-phishing, simulated phishing campaigns",
        tech: "Identity Threat Detection & Response",
        cta: "Explore ITDR Module",
        href: "/service-layer/itdr"
      },
      {
        problem: "We need Zero Trust architecture",
        solution: "ITDR + NDR Modules",
        whatYouGet: "Identity-centric access, network segmentation, least privilege",
        tech: "Identity + Network Detection & Response",
        cta: "Explore ITDR Module",
        href: "/service-layer/itdr"
      },
      {
        problem: "We don't know our security posture",
        solution: "Security Assessment Service",
        whatYouGet: "FREE vulnerability scan, risk scoring, remediation roadmap",
        timeline: "4 weeks",
        cta: "Get Started",
        href: "/get-started"
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
        solution: "CIO Module → Infrastructure Refresh",
        whatYouGet: "Server replacement, data migration, warranty coverage",
        tech: "Infrastructure Orchestration",
        cta: "Explore CIO Module",
        href: "/service-layer/cio"
      },
      {
        problem: "We need to move to the cloud",
        solution: "CDR Module + Managed Cloud Service",
        whatYouGet: "AWS/Azure migration, hybrid cloud setup, managed operations",
        tech: "Cloud Detection & Response + Managed Cloud",
        cta: "Managed Cloud",
        href: "/services/managed-cloud"
      },
      {
        problem: "Our network is too slow",
        solution: "NPM Module → Network Performance Monitoring",
        whatYouGet: "Switch replacement, WiFi upgrade, network optimisation",
        tech: "Network Performance Management",
        cta: "Explore NPM Module",
        href: "/service-layer/npm"
      },
      {
        problem: "We have no disaster recovery plan",
        solution: "BDR Module → Backup & Disaster Recovery",
        whatYouGet: "Backup automation, disaster recovery testing, RTO <4hr",
        tech: "Backup & Disaster Recovery",
        cta: "Explore BDR Module",
        href: "/service-layer/bdr"
      },
      {
        problem: "Our IT team is overwhelmed",
        solution: "Managed NOC Service",
        whatYouGet: "24/7 helpdesk, ticket management, L1-L3 support",
        pricing: "Consumption-based or tiered pricing",
        cta: "Managed NOC",
        href: "/services/managed-noc"
      },
      {
        problem: "Our data is growing out of control",
        solution: "CIO + BDR Modules",
        whatYouGet: "High-capacity storage, data tiering, deduplication",
        tech: "Infrastructure Orchestration + Backup & DR",
        cta: "Explore CIO Module",
        href: "/service-layer/cio"
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
        solution: "MDM + CIO Modules",
        whatYouGet: "VDI setup, endpoint security, collaboration tools",
        tech: "Mobile Device Management + Infrastructure",
        cta: "Explore MDM Module",
        href: "/service-layer/mdm"
      },
      {
        problem: "We need to upgrade to Microsoft 365",
        solution: "CIO Module → M365 Management",
        whatYouGet: "Tenant setup, email migration, training, security policies",
        tech: "Infrastructure Orchestration Platform",
        cta: "Explore CIO Module",
        href: "/service-layer/cio"
      },
      {
        problem: "Employees have too many devices to manage",
        solution: "MDM Module → Mobile Device Management",
        whatYouGet: "MDM/UEM, security policies, app deployment",
        tech: "Mobile Device Management",
        cta: "Explore MDM Module",
        href: "/service-layer/mdm"
      },
      {
        problem: "Applications are slow",
        solution: "APM Module → Application Performance Monitoring",
        whatYouGet: "Full-stack observability, distributed tracing, anomaly detection",
        tech: "Application Performance Management",
        cta: "Explore APM Module",
        href: "/service-layer/apm"
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
        solution: "GRC Module + Managed Compliance + Healthcare Solution",
        whatYouGet: "HIPAA gap remediation, BAAs, audit support",
        frameworks: ["HIPAA Security Rule", "Privacy Rule"],
        cta: "Explore Healthcare Solutions",
        href: "/solutions/healthcare"
      },
      {
        problem: "We need SOC 2 certification",
        solution: "GRC Module → SOC 2 Track",
        whatYouGet: "Control implementation, evidence automation, Type II audit",
        timeline: "12-16 weeks to audit-ready",
        cta: "Explore GRC Module",
        href: "/service-layer/grc"
      },
      {
        problem: "We need CMMC for defense contracts",
        solution: "GRC Module + Managed Compliance + Manufacturing Solution",
        whatYouGet: "CMMC Level 2/3 assessment, POA&M, CUI protection",
        frameworks: ["NIST 800-171", "CMMC 2.0"],
        cta: "Explore Manufacturing Solutions",
        href: "/solutions/manufacturing"
      },
      {
        problem: "We need PCI DSS for credit cards",
        solution: "GRC Module + VDR Module + Financial Services Solution",
        whatYouGet: "PCI Level 1 certification, ASV scans, tokenization",
        frameworks: ["PCI DSS v4.0"],
        cta: "Explore Financial Solutions",
        href: "/solutions/financial-services"
      },
      {
        problem: "We need FedRAMP for government",
        solution: "GRC Module + Public Sector Solution",
        whatYouGet: "FedRAMP Moderate/High, 3PAO audit, continuous ATO",
        tech: "Multi-cloud FedRAMP-authorized",
        cta: "Explore Public Sector Solutions",
        href: "/solutions/public-sector"
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
        solution: "BDR Module → Backup & Recovery",
        whatYouGet: "Automated backups, retention policies, recovery testing",
        tech: "Backup & Disaster Recovery",
        cta: "Explore BDR Module",
        href: "/service-layer/bdr"
      },
      {
        problem: "We need ransomware protection",
        solution: "BDR + NDR Modules",
        whatYouGet: "Immutable backups, air-gapped vault, recovery orchestration",
        tech: "Backup & DR + Network Detection",
        cta: "Explore BDR Module",
        href: "/service-layer/bdr"
      },
      {
        problem: "Our RTO is too long",
        solution: "BDR Module → DRaaS",
        whatYouGet: "Hot/warm DR site, failover automation, RTO <4hr",
        tech: "Backup & Disaster Recovery",
        cta: "Explore BDR Module",
        href: "/service-layer/bdr"
      },
      {
        problem: "We lost data and can't recover it",
        solution: "Emergency Recovery Services",
        whatYouGet: "Emergency recovery services, forensic analysis",
        engagement: "Fixed-fee emergency engagement",
        cta: "Contact Emergency Services",
        href: "/contact"
      }
    ]
  },
  {
    id: "threat-detection",
    title: "THREAT DETECTION",
    icon: Bot,
    problems: [
      {
        problem: "We can't see what's on our network",
        solution: "NDR Module → Network Detection & Response",
        whatYouGet: "Deep packet inspection, behavioural analytics, threat detection",
        tech: "Network Detection & Response",
        cta: "Explore NDR Module",
        href: "/service-layer/ndr"
      },
      {
        problem: "Our cloud is being attacked",
        solution: "CDR Module → Cloud Detection & Response",
        whatYouGet: "Multi-cloud security monitoring, CSPM, threat response",
        tech: "Cloud Detection & Response",
        cta: "Explore CDR Module",
        href: "/service-layer/cdr"
      },
      {
        problem: "We're worried about software supply chain",
        solution: "SDR Module → Supply Chain Detection & Response",
        whatYouGet: "SBOM analysis, supply chain risk management",
        tech: "Supply Chain Detection & Response",
        cta: "Explore SDR Module",
        href: "/service-layer/sdr"
      },
      {
        problem: "Vulnerabilities pile up faster than we fix them",
        solution: "VDR Module → Vulnerability Detection & Response",
        whatYouGet: "Risk-prioritised vulnerability management, automated patching",
        tech: "Vulnerability Detection & Response",
        cta: "Explore VDR Module",
        href: "/service-layer/vdr"
      },
      {
        problem: "We need threat intelligence",
        solution: "TI Module → Threat Intelligence",
        whatYouGet: "Operationalised threat intelligence, adversary tracking",
        tech: "Threat Intelligence",
        cta: "Explore TI Module",
        href: "/service-layer/ti"
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
        solution: "Managed Cloud Service + Right-Sizing",
        whatYouGet: "Cost optimisation, right-sizing, budget forecasting",
        tech: "Managed Cloud + Professional Services",
        cta: "Right-Sizing Service",
        href: "/services/right-sizing"
      },
      {
        problem: "We don't have an IT strategy",
        solution: "Security Assessment + CIO Module",
        whatYouGet: "Technology roadmap, budget planning, vendor management",
        engagement: "Monthly retainer or on-demand",
        cta: "Security Assessments",
        href: "/services/security-assessments"
      },
      {
        problem: "We need M&A due diligence",
        solution: "Infrastructure Audit Service",
        whatYouGet: "IT assessment, integration planning, risk analysis",
        timeline: "4-6 week engagement",
        cta: "Infrastructure Audits",
        href: "/services/infrastructure-audits"
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
        solution: "Manufacturing Solution (M2BLOCK)",
        whatYouGet: "OT/IT convergence, CMMC compliance, predictive maintenance",
        tech: "NDR + GRC + CIO Modules",
        cta: "Explore Manufacturing",
        href: "/solutions/manufacturing"
      },
      {
        problem: "We need healthcare EHR resilience",
        solution: "Healthcare Solution (H2BLOCK)",
        whatYouGet: "HIPAA automation, ransomware immunity, clinical uptime",
        tech: "BDR + ITDR + GRC Modules",
        cta: "Explore Healthcare",
        href: "/solutions/healthcare"
      },
      {
        problem: "We need financial fraud detection",
        solution: "Financial Services Solution (F2BLOCK)",
        whatYouGet: "Real-time fraud detection, SOC 2 compliance, zero-trust",
        tech: "DDR + VDR + GRC Modules",
        cta: "Explore Financial Services",
        href: "/solutions/financial-services"
      },
      {
        problem: "We need FedRAMP cloud",
        solution: "Public Sector Solution",
        whatYouGet: "FedRAMP infrastructure, CJIS compliance",
        tech: "CDR + GRC + CIO Modules",
        cta: "Explore Public Sector",
        href: "/solutions/public-sector"
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
        problems: category.problems.filter(
          p =>
            p.problem.toLowerCase().includes(query) ||
            p.solution.toLowerCase().includes(query) ||
            p.whatYouGet.toLowerCase().includes(query) ||
            (p.tech && p.tech.toLowerCase().includes(query)) ||
            ('frameworks' in p && p.frameworks && p.frameworks.some((f: string) => f.toLowerCase().includes(query))) ||
            p.cta.toLowerCase().includes(query)
        ),
      }))
      .filter(category => category.problems.length > 0);
  }, [searchQuery]);

  const totalProblems = solutionCategories.reduce((sum, c) => sum + c.problems.length, 0);
  const filteredProblems = filteredCategories.reduce((sum, c) => sum + c.problems.length, 0);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-label text-brand-orange mb-4">FIND YOUR SOLUTION</p>
            <h1 className="text-headline text-white mb-6">
              What problem are you trying to solve?
            </h1>
            <p className="text-body-lg text-white/70 mb-10 max-w-2xl">
              Search {totalProblems} real-world IT and security challenges mapped to specific ManageKube solutions. Every problem has a clear answer.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search problems... (e.g., ransomware, HIPAA, cloud)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-brand-orange transition-colors"
              />
              {searchQuery && (
                <p className="text-sm text-white/50 mt-2">
                  Showing {filteredProblems} of {totalProblems} solutions
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {filteredCategories.map((category) => (
        <section key={category.id} className="py-16 bg-white border-b border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10">
              <category.icon className="w-6 h-6 text-brand-orange" />
              <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              <span className="text-sm text-muted-foreground ml-2">
                {category.problems.length} solution{category.problems.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.problems.map((item, index) => (
                <SolutionCard key={item.problem} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* No results */}
      {filteredCategories.length === 0 && (
        <section className="py-32 bg-white text-center">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-bold text-foreground mb-4">No matching solutions</h3>
            <p className="text-muted-foreground mb-6">Try different keywords or browse all categories.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-brand-orange font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        </section>
      )}

      <PathfinderCTA />
    </PageLayout>
  );
};

export default FindByProblem;
