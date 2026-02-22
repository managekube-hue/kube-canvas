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
        solution: "GRC KUBE → Managed Compliance Service",
        whatYouGet: "Automated evidence collection, control implementation, audit liaison",
        frameworks: ["SOC 2", "HIPAA", "CMMC", "ISO 27001", "PCI DSS"],
        cta: "Explore GRC Kube",
        href: "/kubes/grc-kube"
      },
      {
        problem: "We got hit by ransomware",
        solution: "BDR KUBE + Managed SOC Service",
        whatYouGet: "Immutable backups, ransomware detection, incident response",
        tech: "Backup & Disaster Recovery + 24/7 SOC",
        cta: "Explore BDR Kube",
        href: "/kubes/bdr-kube"
      },
      {
        problem: "We don't have 24/7 security monitoring",
        solution: "Managed SOC Service",
        whatYouGet: "Always-on threat detection, incident response, threat hunting",
        tech: "ITDR KUBE + NDR KUBE + CDR KUBE",
        cta: "Managed SOC",
        href: "/services/managed-soc"
      },
      {
        problem: "Employees click on phishing emails",
        solution: "ITDR KUBE → Identity Threat Detection",
        whatYouGet: "Email filtering, anti-phishing, simulated phishing campaigns",
        tech: "Identity Threat Detection & Response",
        cta: "Explore ITDR Kube",
        href: "/kubes/itdr-kube"
      },
      {
        problem: "We need Zero Trust architecture",
        solution: "ITDR KUBE + NDR KUBE",
        whatYouGet: "Identity-centric access, network segmentation, least privilege",
        tech: "Identity + Network Detection & Response",
        cta: "Explore ITDR Kube",
        href: "/kubes/itdr-kube"
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
        solution: "CIO KUBE → Infrastructure Refresh",
        whatYouGet: "Server replacement, data migration, warranty coverage",
        tech: "Infrastructure Orchestration",
        cta: "Explore CIO Kube",
        href: "/kubes/cio-kube"
      },
      {
        problem: "We need to move to the cloud",
        solution: "CDR KUBE + Managed Cloud Service",
        whatYouGet: "AWS/Azure migration, hybrid cloud setup, managed operations",
        tech: "Cloud Detection & Response + Managed Cloud",
        cta: "Managed Cloud",
        href: "/services/managed-cloud"
      },
      {
        problem: "Our network is too slow",
        solution: "NPM KUBE → Network Performance Monitoring",
        whatYouGet: "Switch replacement, WiFi upgrade, network optimisation",
        tech: "Network Performance Management",
        cta: "Explore NPM Kube",
        href: "/kubes/npm-kube"
      },
      {
        problem: "We have no disaster recovery plan",
        solution: "BDR KUBE → Backup & Disaster Recovery",
        whatYouGet: "Backup automation, disaster recovery testing, RTO <4hr",
        tech: "Backup & Disaster Recovery",
        cta: "Explore BDR Kube",
        href: "/kubes/bdr-kube"
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
        solution: "CIO KUBE + BDR KUBE",
        whatYouGet: "High-capacity storage, data tiering, deduplication",
        tech: "Infrastructure Orchestration + Backup & DR",
        cta: "Explore CIO Kube",
        href: "/kubes/cio-kube"
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
        solution: "MDM KUBE + CIO KUBE",
        whatYouGet: "VDI setup, endpoint security, collaboration tools",
        tech: "Mobile Device Management + Infrastructure",
        cta: "Explore MDM Kube",
        href: "/kubes/mdm-kube"
      },
      {
        problem: "We need to upgrade to Microsoft 365",
        solution: "CIO KUBE → M365 Management",
        whatYouGet: "Tenant setup, email migration, training, security policies",
        tech: "Infrastructure Orchestration Platform",
        cta: "Explore CIO Kube",
        href: "/kubes/cio-kube"
      },
      {
        problem: "Employees have too many devices to manage",
        solution: "MDM KUBE → Mobile Device Management",
        whatYouGet: "MDM/UEM, security policies, app deployment",
        tech: "Mobile Device Management",
        cta: "Explore MDM Kube",
        href: "/kubes/mdm-kube"
      },
      {
        problem: "Applications are slow",
        solution: "APM KUBE → Application Performance Monitoring",
        whatYouGet: "Full-stack observability, distributed tracing, anomaly detection",
        tech: "Application Performance Management",
        cta: "Explore APM Kube",
        href: "/kubes/apm-kube"
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
        solution: "GRC KUBE + Managed Compliance + Healthcare Solution",
        whatYouGet: "HIPAA gap remediation, BAAs, audit support",
        frameworks: ["HIPAA Security Rule", "Privacy Rule"],
        cta: "Explore Healthcare Solutions",
        href: "/solutions/healthcare"
      },
      {
        problem: "We need SOC 2 certification",
        solution: "GRC KUBE → SOC 2 Track",
        whatYouGet: "Control implementation, evidence automation, Type II audit",
        timeline: "12-16 weeks to audit-ready",
        cta: "Explore GRC Kube",
        href: "/kubes/grc-kube"
      },
      {
        problem: "We need CMMC for defense contracts",
        solution: "GRC KUBE + Managed Compliance + Manufacturing Solution",
        whatYouGet: "CMMC Level 2/3 assessment, POA&M, CUI protection",
        frameworks: ["NIST 800-171", "CMMC 2.0"],
        cta: "Explore Manufacturing Solutions",
        href: "/solutions/manufacturing"
      },
      {
        problem: "We need PCI DSS for credit cards",
        solution: "GRC KUBE + VDR KUBE + Financial Services Solution",
        whatYouGet: "PCI Level 1 certification, ASV scans, tokenization",
        frameworks: ["PCI DSS v4.0"],
        cta: "Explore Financial Solutions",
        href: "/solutions/financial-services"
      },
      {
        problem: "We need FedRAMP for government",
        solution: "GRC KUBE + Public Sector Solution",
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
        solution: "BDR KUBE → Backup & Recovery",
        whatYouGet: "Automated backups, retention policies, recovery testing",
        tech: "Backup & Disaster Recovery",
        cta: "Explore BDR Kube",
        href: "/kubes/bdr-kube"
      },
      {
        problem: "We need ransomware protection",
        solution: "BDR KUBE + NDR KUBE",
        whatYouGet: "Immutable backups, air-gapped vault, recovery orchestration",
        tech: "Backup & DR + Network Detection",
        cta: "Explore BDR Kube",
        href: "/kubes/bdr-kube"
      },
      {
        problem: "Our RTO is too long",
        solution: "BDR KUBE → DRaaS",
        whatYouGet: "Hot/warm DR site, failover automation, RTO <4hr",
        tech: "Backup & Disaster Recovery",
        cta: "Explore BDR Kube",
        href: "/kubes/bdr-kube"
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
        solution: "NDR KUBE → Network Detection & Response",
        whatYouGet: "Deep packet inspection, behavioural analytics, threat detection",
        tech: "Network Detection & Response",
        cta: "Explore NDR Kube",
        href: "/kubes/ndr-kube"
      },
      {
        problem: "Our cloud is being attacked",
        solution: "CDR KUBE → Cloud Detection & Response",
        whatYouGet: "Multi-cloud security monitoring, CSPM, threat response",
        tech: "Cloud Detection & Response",
        cta: "Explore CDR Kube",
        href: "/kubes/cdr-kube"
      },
      {
        problem: "We're worried about software supply chain",
        solution: "SDR KUBE → Supply Chain Detection & Response",
        whatYouGet: "SBOM analysis, supply chain risk management",
        tech: "Supply Chain Detection & Response",
        cta: "Explore SDR Kube",
        href: "/kubes/sdr-kube"
      },
      {
        problem: "Vulnerabilities pile up faster than we fix them",
        solution: "VDR KUBE → Vulnerability Detection & Response",
        whatYouGet: "Risk-prioritised vulnerability management, automated patching",
        tech: "Vulnerability Detection & Response",
        cta: "Explore VDR Kube",
        href: "/kubes/vdr-kube"
      },
      {
        problem: "We need threat intelligence",
        solution: "TI KUBE → Threat Intelligence",
        whatYouGet: "Operationalised threat intelligence, adversary tracking",
        tech: "Threat Intelligence",
        cta: "Explore TI Kube",
        href: "/kubes/ti-kube"
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
        solution: "Security Assessment + CIO KUBE",
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
        tech: "NDR KUBE + GRC KUBE + CIO KUBE",
        cta: "Explore Manufacturing",
        href: "/solutions/manufacturing"
      },
      {
        problem: "We need healthcare EHR resilience",
        solution: "Healthcare Solution (H2BLOCK)",
        whatYouGet: "HIPAA automation, ransomware immunity, clinical uptime",
        tech: "BDR KUBE + ITDR KUBE + GRC KUBE",
        cta: "Explore Healthcare",
        href: "/solutions/healthcare"
      },
      {
        problem: "We need financial fraud detection",
        solution: "Financial Services Solution (F2BLOCK)",
        whatYouGet: "Real-time fraud detection, SOC 2 compliance, zero-trust",
        tech: "DDR KUBE + VDR KUBE + GRC KUBE",
        cta: "Explore Financial Services",
        href: "/solutions/financial-services"
      },
      {
        problem: "We need FedRAMP cloud",
        solution: "Public Sector Solution",
        whatYouGet: "FedRAMP infrastructure, CJIS compliance",
        tech: "CDR KUBE + GRC KUBE + CIO KUBE",
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
              Every IT problem has a proven solution. Search or browse {totalProblems} mapped problems across 8 categories to find the right Kube, service, and technology stack for your needs.
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
              to="/get-started"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-5 font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started
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
            
            <Link to="/solutions/hub" className="group border border-border p-8 hover:border-foreground transition-all">
              <Building2 className="w-10 h-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">
                Find by Industry
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Pre-configured solutions for healthcare, manufacturing, finance, and more.
              </p>
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link to="/service-layer" className="group border border-border p-8 hover:border-foreground transition-all">
              <Cog className="w-10 h-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-orange transition-colors">
                Explore All 18 Modules
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Browse all 18 detection and response modules across three pillars.
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
