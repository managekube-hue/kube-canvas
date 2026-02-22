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
    notes?: string[];
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
          { label: "Learn more about Managed SOC", href: "/services/managed-soc" },
          { label: "Start with Security Assessment", href: "/get-started" }
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
          { label: "Learn more about Managed SOC", href: "/services/managed-soc" },
          { label: "Calculate your endpoint count", href: "/get-started" }
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
          { label: "Learn more about Managed SOC", href: "/services/managed-soc" },
          { label: "Test your current email security", href: "/get-started" }
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
          { label: "Learn more about Managed SOC", href: "/services/managed-soc" },
          { label: "Schedule a vulnerability assessment", href: "/get-started" }
        ]
      },
      {
        id: "ztna",
        title: "Zero Trust Network Access (ZTNA)",
        whatThisIs: "Zero Trust is a security approach that assumes no user or device should be trusted by default, even if they're inside your network. Instead of a traditional security model where everyone inside the building is trusted, Zero Trust requires continuous verification. Every user must authenticate their identity, every device must prove it's secure, and every access request is evaluated before being granted—regardless of where the user is located or what network they're on.",
        whyYouNeedIt: "The old model of \"castle and moat\" security (hard perimeter, soft interior) doesn't work anymore. With employees working from home, applications moving to the cloud, and attackers increasingly bypassing perimeter defenses, you need security that travels with users and applications. Zero Trust ensures that even if an attacker steals credentials or compromises a device, they can't move freely through your environment.",
        whatYouGet: [
          {
            items: [
              "Identity-based access control where permissions are tied to verified user identities, not network locations",
              "Device health verification that checks whether devices are running current antivirus, have the latest patches, and haven't been compromised before allowing access",
              "Network micro-segmentation that divides your network into small, isolated zones so attackers can't move laterally if they breach one area",
              "Application-level access control where users can only access the specific applications they need for their job, nothing more",
              "Continuous authentication that re-verifies user identity and device health throughout sessions, not just at initial login",
              "Secure remote access that eliminates traditional VPNs, replacing them with application-specific encrypted tunnels"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSSP Kube designs your Zero Trust architecture, implements controls, and manages ongoing operations",
            vendors: [
              { name: "IBM Security Verify", description: "From IBM via TD SYNNEX/Arrow: Enterprise identity and access management with adaptive authentication and zero trust capabilities" },
              { name: "Todyl", description: "From Pax8 for small-to-medium businesses: Unified SASE platform combining ZTNA, secure web gateway, and endpoint security" },
              { name: "Zscaler Private Access", description: "From TD SYNNEX for larger organizations: Cloud-delivered ZTNA platform for application access without VPN" },
              { name: "Palo Alto Networks Prisma Access", description: "From TD SYNNEX: Comprehensive SASE platform with ZTNA and cloud security" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube MSSP Team",
            responsibilities: "Designs Zero Trust architecture, implements network segmentation, configures access policies, integrates with existing identity systems (Active Directory, Azure AD), provides ongoing policy management"
          },
          {
            provider: "IBM Verify/Todyl/Zscaler/Palo Alto",
            responsibilities: "Provides the identity verification platform, access control engine, and encrypted tunnels that enforce Zero Trust policies"
          },
          {
            provider: "ManageKube MSP Team",
            responsibilities: "Implements network segmentation infrastructure, deploys VLANs and firewall rules, coordinates application access policies"
          },
          {
            provider: "Dell PowerSwitch",
            responsibilities: "From TD SYNNEX/Arrow: Provides network switches capable of micro-segmentation and VLAN enforcement for on-premises Zero Trust"
          }
        ],
        typicalEngagement: [
          {
            title: "Initial Implementation (project-based):",
            tiers: [
              { name: "Design and architecture", price: "4-6 weeks, $25,000-$50,000 depending on environment complexity" },
              { name: "Phased rollout", price: "8-12 weeks, $50,000-$100,000 for complete Zero Trust implementation" }
            ],
            notes: ["Includes: Architecture design, network segmentation, identity integration, access policy definition, user migration, training"]
          },
          {
            title: "Ongoing Management (monthly recurring):",
            tiers: [
              { name: "Small deployment (50-150 users)", price: "$4,000-$8,000/month including ZTNA platform and managed service" },
              { name: "Mid-market (150-500 users)", price: "$10,000-$20,000/month including ZTNA platform and managed service" },
              { name: "Enterprise (500+ users, multiple locations)", price: "$25,000-$60,000/month including ZTNA platform and managed service" }
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about Managed SOC", href: "/services/managed-soc" },
          { label: "Assess your Zero Trust readiness", href: "/get-started" }
        ]
      },
      {
        id: "ransomware-protection",
        title: "Ransomware Protection and Cyber Recovery",
        whatThisIs: "Ransomware protection is a multi-layered defense strategy that prevents ransomware attacks from succeeding, detects them when they occur, and enables rapid recovery if your organization is attacked. This goes beyond traditional backups—cyber recovery includes isolated backup copies that attackers can't access even if they completely compromise your network, automated recovery processes that restore operations quickly, and forensic capabilities that help understand what happened.",
        whyYouNeedIt: "Ransomware attacks are increasingly sophisticated and devastating. Attackers don't just encrypt your files anymore—they steal your data first and threaten to publish it if you don't pay. They target backups and try to destroy them before encrypting production systems. Traditional backups alone aren't enough because attackers often compromise them before launching the ransomware. Cyber recovery ensures you have ransomware-immune backups and can restore operations even if attackers control your entire network.",
        whatYouGet: [
          {
            title: "Prevention layers:",
            items: [
              "Endpoint protection (EDR/XDR) that detects and stops ransomware before it can encrypt files",
              "Email security that blocks the phishing messages ransomware gangs use to get initial access",
              "Network segmentation that limits how far ransomware can spread if it gets past other defenses",
              "Privileged access management that restricts administrative credentials attackers need to deploy ransomware at scale"
            ]
          },
          {
            title: "Detection and response:",
            items: [
              "Behavioral analysis using AI to detect ransomware activity even from never-before-seen variants",
              "Automated containment that isolates infected systems within seconds of detection",
              "Forensic investigation to understand attack vectors and prevent recurrence",
              "24/7 SOC monitoring ensuring rapid human response to automated alerts"
            ]
          },
          {
            title: "Recovery capabilities:",
            items: [
              "Immutable backups that can't be deleted or encrypted, even by administrators",
              "Air-gapped recovery vault physically isolated from your production network",
              "Automated recovery orchestration that restores systems in the correct order with proper dependencies",
              "Clean room recovery that scans backups for malware before restoration",
              "Rapid recovery targeting Recovery Time Objectives (RTO) under 4 hours for critical systems"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSSP Kube implements prevention controls, monitors for attacks, and coordinates incident response"
          },
          {
            description: "ManageKube MSP Kube manages backup infrastructure and executes recovery procedures",
            vendors: [
              { name: "Dell PowerProtect Cyber Recovery", description: "From Dell via TD SYNNEX/Arrow: Enterprise-grade cyber vault with machine learning-based anomaly detection and automated recovery orchestration" },
              { name: "Dell PowerProtect Data Domain", description: "From Dell via TD SYNNEX/Arrow: High-performance backup appliance with retention locking preventing deletion" },
              { name: "IBM Storage Sentinel", description: "From IBM via TD SYNNEX/Arrow: AI-powered backup monitoring that detects ransomware in backup data" },
              { name: "Datto SIRIS", description: "From Pax8 for small-to-medium businesses: All-in-one backup and business continuity appliance with ransomware detection" },
              { name: "Veeam with immutability", description: "From Pax8 or TD SYNNEX: Backup software with immutable backup copies and instant recovery capabilities" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube MSSP Team",
            responsibilities: "Implements ransomware prevention controls (EDR, email security, segmentation), monitors for attack indicators, coordinates incident response, performs forensic analysis"
          },
          {
            provider: "ManageKube MSP Team",
            responsibilities: "Manages backup infrastructure, configures retention policies, tests recovery procedures quarterly, executes recovery operations during incidents"
          },
          {
            provider: "Dell PowerProtect/Datto/Veeam",
            responsibilities: "Provides backup software and appliances that create immutable, isolated copies of your data"
          },
          {
            provider: "IBM Storage Sentinel",
            responsibilities: "Analyzes backup data using AI to detect if ransomware encrypted files before they were backed up (corrupted backups)"
          },
          {
            provider: "Dell CyberSense",
            responsibilities: "Provides machine learning analysis of backup data to identify anomalies indicating ransomware activity"
          },
          {
            provider: "ManageKube Advisory Team (vCISO)",
            responsibilities: "Develops incident response plans, coordinates with cyber insurance, manages external communications during ransomware incidents"
          }
        ],
        typicalEngagement: [
          {
            title: "Implementation (project-based):",
            tiers: [
              { name: "Small environment (5-25TB data)", price: "$35,000-$75,000 for cyber recovery vault setup including hardware, software, configuration, testing" },
              { name: "Mid-market (25-100TB data)", price: "$100,000-$250,000 for comprehensive cyber recovery infrastructure" },
              { name: "Enterprise (100TB+ data)", price: "$300,000-$750,000 for multi-site cyber recovery with automated orchestration" }
            ]
          },
          {
            title: "Ongoing Protection (monthly recurring):",
            tiers: [
              { name: "Small deployment", price: "$3,000-$6,000/month including backup management, quarterly recovery testing, monitoring" },
              { name: "Mid-market", price: "$8,000-$18,000/month including backup management, quarterly recovery testing, 24/7 monitoring, incident response readiness" },
              { name: "Enterprise", price: "$25,000-$60,000/month including comprehensive backup management, monthly recovery testing, 24/7 SOC integration, guaranteed RTO/RPO" }
            ]
          },
          {
            title: "Incident Response (when needed):",
            tiers: [
              { name: "Ransomware recovery event", price: "$25,000-$100,000 depending on environment size and recovery complexity" }
            ],
            notes: ["Includes: Forensic analysis, malware eradication, full system recovery from cyber vault, post-incident remediation"]
          }
        ],
        ctaLinks: [
          { label: "Learn more about Cyber Recovery", href: "/services/managed-soc" },
          { label: "Test your ransomware readiness", href: "/get-started" }
        ]
      }
    ]
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Operations Solutions",
    icon: <Server className="w-6 h-6" />,
    description: "Managed service desk, cloud infrastructure, and network operations center",
    services: [
      {
        id: "service-desk",
        title: "Managed Service Desk (Help Desk)",
        whatThisIs: "A managed service desk is an outsourced IT support team that handles technology questions, problems, and requests from your employees. Instead of having employees email your internal IT person (who may be busy with other projects) or struggle through issues on their own, they can call, email, or chat with a dedicated help desk team that specializes in quickly resolving common technology issues.",
        whyYouNeedIt: "Your employees' productivity depends on their technology working properly. When someone can't log in, their email isn't working, or they can't access an important file, every minute of delay costs your business money. A professional service desk ensures employees get help quickly from people who specialize in solving these problems, freeing your internal IT staff to focus on strategic projects instead of constant interruptions.",
        whatYouGet: [
          {
            title: "Support channels:",
            items: [
              "Phone support with dedicated number employees can call for immediate assistance",
              "Email ticketing for non-urgent issues that can be tracked and managed systematically",
              "Chat support through Microsoft Teams, Slack, or web chat for quick questions",
              "Self-service portal where employees can find answers to common questions, track ticket status, and submit requests"
            ]
          },
          {
            title: "Coverage options:",
            items: [
              "Business hours (8x5): Support Monday-Friday during your business hours with after-hours emergency number",
              "Extended hours (12x5 or 8x7): Longer coverage for businesses operating outside traditional hours",
              "24/7/365: Round-the-clock support for organizations that never stop, with overnight staff handling urgent issues and routing non-urgent requests to daytime teams"
            ]
          },
          {
            title: "Tier 1 (First-line support):",
            items: [
              "Password resets and account unlocks",
              "Email and calendar problems (can't send/receive, meeting issues)",
              "Software installation assistance (Microsoft Office, business applications)",
              "Printer and scanner troubleshooting",
              "VPN and remote access help",
              "Basic network connectivity issues (Wi-Fi not working, can't access network drives)",
              "Hardware problems (laptop won't turn on, screen issues, keyboard/mouse problems)",
              "Mobile device support (smartphones, tablets)"
            ]
          },
          {
            title: "Tier 2 (Advanced support):",
            items: [
              "Complex software issues requiring deeper troubleshooting",
              "Server problems affecting multiple users",
              "Network issues beyond basic connectivity",
              "Security incident initial response",
              "Backup and file recovery",
              "Application-specific problems requiring specialized knowledge"
            ]
          },
          {
            title: "Tier 3 (Expert-level support):",
            items: [
              "Escalations from Tier 2 requiring senior engineering expertise",
              "Infrastructure problems (server crashes, storage failures)",
              "Complex security incidents",
              "Performance issues requiring system optimization",
              "Vendor coordination for critical issues",
              "After-hours emergency response for business-critical problems"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSP Kube staffs the service desk with experienced technicians organized into three tiers",
            vendors: [
              { name: "ConnectWise Manage or Autotask PSA", description: "From Pax8: Professional services automation platform for ticket management, time tracking, and customer communications" },
              { name: "TeamViewer or ConnectWise Control", description: "From Pax8: Remote access tools allowing technicians to view and control employee devices to resolve issues faster" },
              { name: "IT Glue or Hudu", description: "From Pax8: Documentation platforms storing network diagrams, passwords, configurations, and troubleshooting procedures" },
              { name: "Microsoft Teams or Slack", description: "From Pax8: Communication platforms for chat support and internal coordination" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube Service Desk Team",
            responsibilities: "Answers calls/emails/chats, troubleshoots issues, escalates to appropriate tiers, coordinates with vendors when needed, provides daily/weekly ticket reports"
          },
          {
            provider: "ManageKube NOC Team",
            responsibilities: "Receives escalations for infrastructure issues requiring server, network, or storage intervention"
          },
          {
            provider: "ManageKube MSSP Team",
            responsibilities: "Receives escalations for security-related incidents requiring immediate investigation"
          },
          {
            provider: "Your employees",
            responsibilities: "Submit tickets, respond to technician questions, follow troubleshooting steps, confirm when issues are resolved"
          }
        ],
        typicalEngagement: [
          {
            title: "Business Hours (8x5):",
            tiers: [
              { name: "Small business (10-50 users)", price: "$3,000-$6,000/month" },
              { name: "Mid-market (50-200 users)", price: "$8,000-$15,000/month" },
              { name: "Enterprise (200+ users)", price: "$18,000-$35,000/month" }
            ]
          },
          {
            title: "Extended Hours (12x5 or 24/7):",
            tiers: [
              { name: "Small business", price: "$5,000-$9,000/month" },
              { name: "Mid-market", price: "$12,000-$22,000/month" },
              { name: "Enterprise", price: "$28,000-$50,000/month" }
            ],
            notes: [
              "Pricing includes: Unlimited tickets within reasonable use (typically 1-3 tickets per user per month average), All three support tiers, Remote support tools, Ticket tracking and reporting, Quarterly service reviews"
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about Managed NOC", href: "/services/managed-noc" },
          { label: "Calculate your service desk needs", href: "/get-started" }
        ]
      },
      {
        id: "cloud-infrastructure",
        title: "Cloud Infrastructure Management (IaaS)",
        whatThisIs: "Cloud Infrastructure Management means we handle the setup, monitoring, security, optimization, and day-to-day operations of your cloud computing resources in Microsoft Azure, Amazon Web Services (AWS), or Google Cloud Platform (GCP). This includes virtual servers (VMs), storage, databases, networking, and any other cloud services you use. Instead of your team managing cloud infrastructure alongside everything else, we take full responsibility for keeping your cloud environment running smoothly, securely, and cost-effectively.",
        whyYouNeedIt: "Moving to the cloud promises flexibility and cost savings, but managing cloud infrastructure is complex and time-consuming. Cloud platforms have thousands of services with complicated pricing, require constant security monitoring, need regular optimization to prevent runaway costs, and demand expertise your team may not have. Managed cloud infrastructure ensures you get the benefits of cloud computing without the operational burden.",
        whatYouGet: [
          {
            title: "Cloud architecture and migration:",
            items: [
              "Assessment of current environment analyzing which applications and workloads are good candidates for cloud migration",
              "Architecture design creating blueprints for how your applications will run in the cloud, including networking, security, high availability, and disaster recovery",
              "Migration planning and execution moving applications, data, and infrastructure to the cloud with minimal disruption",
              "Hybrid cloud integration connecting cloud resources with on-premises systems when you need both"
            ]
          },
          {
            title: "Ongoing management:",
            items: [
              "24/7 monitoring of all cloud resources with alerts for performance issues, outages, or security concerns",
              "Patch management keeping cloud operating systems and platform services current with security updates",
              "Capacity planning ensuring you have enough resources to handle current workloads plus growth",
              "Performance optimization tuning configurations to improve application speed and responsiveness",
              "Cost optimization identifying and eliminating waste (unused resources, over-provisioned VMs, inefficient configurations)"
            ]
          },
          {
            title: "Security and compliance:",
            items: [
              "Security configuration implementing cloud security best practices (firewalls, encryption, access controls)",
              "Identity and access management configuring who can access what resources with appropriate permissions",
              "Compliance management ensuring cloud configurations meet HIPAA, SOC 2, PCI DSS, or other regulatory requirements",
              "Security monitoring watching for suspicious activity, unauthorized access attempts, or misconfigurations",
              "Backup and disaster recovery protecting cloud workloads with appropriate backup frequency and retention"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSP Kube provides the cloud engineering team, processes, and tools to manage your cloud infrastructure",
            vendors: [
              { name: "Microsoft Azure", description: "From Pax8 for Microsoft-centric customers or TD SYNNEX for enterprise: Best for organizations already using Microsoft 365, Active Directory, and Windows applications" },
              { name: "Amazon Web Services (AWS)", description: "From Pax8 for smaller workloads or TD SYNNEX for enterprise: Industry-leading cloud platform with the most services and global reach" },
              { name: "Google Cloud Platform (GCP)", description: "From TD SYNNEX: Strong for data analytics, machine learning, and Kubernetes workloads" },
              { name: "IBM Cloud", description: "From IBM via TD SYNNEX/Arrow: Best for hybrid cloud scenarios integrating with on-premises IBM infrastructure" }
            ]
          },
          {
            description: "Management tools:",
            vendors: [
              { name: "Turbonomic", description: "From IBM via TD SYNNEX/Arrow: AI-powered cloud optimization platform that automatically right-sizes resources and recommends cost savings" },
              { name: "IBM Cloud Pak for AIOps", description: "From IBM via TD SYNNEX/Arrow: AI-driven monitoring and event correlation across multi-cloud environments" },
              { name: "Native cloud tools", description: "Azure Monitor, AWS CloudWatch, Google Cloud Operations for platform-specific monitoring" },
              { name: "Dell CloudIQ", description: "From Dell via TD SYNNEX/Arrow: Unified dashboard providing visibility across Dell on-premises infrastructure and public cloud resources" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube Cloud Engineering Team",
            responsibilities: "Designs cloud architectures, performs migrations, implements security controls, monitors environments 24/7, optimizes costs, coordinates vendor support"
          },
          {
            provider: "Microsoft/Amazon/Google/IBM",
            responsibilities: "Provides the actual cloud infrastructure (compute, storage, networking), platform security features, and underlying service reliability"
          },
          {
            provider: "Turbonomic",
            responsibilities: "Continuously analyzes cloud resource usage and automatically implements or recommends optimization actions"
          },
          {
            provider: "ManageKube FinOps Team (part of Advisory Kube)",
            responsibilities: "Provides monthly cost analysis, budget forecasting, and strategic recommendations for cloud spending"
          }
        ],
        typicalEngagement: [
          {
            title: "Migration Project (one-time):",
            tiers: [
              { name: "Small migration (5-15 servers, 2-5 applications)", price: "$25,000-$75,000 for assessment, architecture, and migration execution" },
              { name: "Mid-market migration (15-50 servers, 5-15 applications)", price: "$100,000-$250,000" },
              { name: "Enterprise migration (50+ servers, complex applications)", price: "$300,000-$1,000,000+" }
            ]
          },
          {
            title: "Ongoing Management (monthly recurring) - based on cloud consumption and management complexity:",
            tiers: [
              { name: "Small deployment ($5K-$15K monthly cloud spend)", price: "$2,000-$4,000/month management fee" },
              { name: "Mid-market ($15K-$50K monthly cloud spend)", price: "$5,000-$12,000/month management fee" },
              { name: "Enterprise ($50K+ monthly cloud spend)", price: "$15,000-$40,000/month management fee" }
            ],
            notes: ["Or consumption-based pricing: 8% of monthly cloud spend for comprehensive managed services including monitoring, security, optimization, and support"]
          }
        ],
        ctaLinks: [
          { label: "Learn more about Managed Cloud", href: "/services/managed-cloud" },
          { label: "Assess your cloud migration readiness", href: "/get-started" }
        ]
      },
      {
        id: "noc",
        title: "Network Operations Center (NOC)",
        whatThisIs: "A Network Operations Center is a centralized team that monitors and manages your entire IT infrastructure 24/7. This includes servers, storage, network equipment (routers, switches, firewalls), backup systems, and any other technology that keeps your business running. The NOC team watches dashboards showing the health of all your systems, responds to alerts when problems occur, performs routine maintenance, and coordinates with other teams when issues need escalation.",
        whyYouNeedIt: "IT infrastructure doesn't fail conveniently during business hours. Servers crash at 2 AM, backups fail on weekends, network equipment has power failures during storms. Without a NOC, these problems go undetected until employees arrive Monday morning and can't work—resulting in lost productivity, frustrated customers, and IT teams scrambling to fix problems under pressure. A NOC catches problems early, often fixing them before anyone even notices.",
        whatYouGet: [
          {
            title: "24/7 infrastructure monitoring:",
            items: [
              "Server monitoring tracking CPU usage, memory, disk space, and service health with alerts when thresholds are exceeded",
              "Network monitoring watching all switches, routers, firewalls, and wireless access points for connectivity issues, performance problems, or failures",
              "Storage monitoring tracking capacity, performance, and health of all storage systems (SAN, NAS, backup appliances)",
              "Backup monitoring verifying all backup jobs complete successfully every night, investigating failures immediately",
              "Application monitoring checking that critical business applications (email, databases, ERP, CRM) are responsive and functioning",
              "Security device monitoring ensuring firewalls, VPNs, and security appliances are operational and processing traffic correctly"
            ]
          },
          {
            title: "Proactive maintenance:",
            items: [
              "Patch management deploying security updates to servers and network devices during maintenance windows",
              "Performance optimization identifying and resolving performance bottlenecks before they impact users",
              "Capacity planning tracking infrastructure utilization trends and alerting when systems approach capacity limits",
              "Configuration management ensuring device configurations remain consistent and compliant with your standards",
              "Firmware updates keeping network equipment and storage systems current with vendor-recommended versions"
            ]
          },
          {
            title: "Incident response:",
            items: [
              "Alert triage analyzing monitoring alerts to determine severity and appropriate response",
              "Problem resolution fixing issues directly when possible (restarting failed services, clearing disk space, adjusting configurations)",
              "Escalation management routing complex problems to appropriate specialists (server team, network team, storage team, MSSP)",
              "Communication notifying stakeholders about issues, expected impact, and resolution timelines",
              "Documentation recording all incidents, actions taken, and resolutions in ticket system for future reference"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSP Kube staffs the NOC with infrastructure engineers working in shifts to provide 24/7 coverage",
            vendors: [
              { name: "NinjaOne", description: "From Pax8: Comprehensive RMM (Remote Monitoring and Management) platform for servers, workstations, and network devices" },
              { name: "Dell OpenManage Enterprise", description: "From Dell via TD SYNNEX/Arrow: Management platform specifically for Dell servers and storage providing deep hardware-level insights" },
              { name: "Dell CloudIQ", description: "From Dell via TD SYNNEX/Arrow: AI-driven monitoring providing predictive analytics about infrastructure health" },
              { name: "IBM Instana", description: "From IBM via TD SYNNEX/Arrow: Application performance monitoring providing visibility into how infrastructure impacts application performance" },
              { name: "IBM Turbonomic", description: "From IBM via TD SYNNEX/Arrow: AI-powered optimization platform automating performance and capacity management" },
              { name: "IBM Cloud Pak for AIOps", description: "From IBM via TD SYNNEX/Arrow: Platform correlating events across hybrid infrastructure to reduce alert noise and speed resolution" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube NOC Team",
            responsibilities: "Monitors all dashboards 24/7, responds to alerts, performs routine maintenance, resolves incidents, coordinates escalations, provides daily/weekly status reports"
          },
          {
            provider: "Dell OpenManage/CloudIQ",
            responsibilities: "Monitors Dell hardware (PowerEdge servers, PowerStore/PowerMax storage, PowerSwitch networking) providing health status, performance metrics, and predictive failure warnings"
          },
          {
            provider: "IBM Instana/Turbonomic/Cloud Pak for AIOps",
            responsibilities: "Provides AI-driven insights correlating infrastructure performance with application behavior, automated optimization recommendations"
          },
          {
            provider: "NinjaOne",
            responsibilities: "Monitors all devices (Dell and non-Dell), manages patches, provides remote access for technicians, integrates with ticketing system"
          },
          {
            provider: "ManageKube Service Desk",
            responsibilities: "Receives escalations from NOC when issues impact users and require end-user communication"
          },
          {
            provider: "ManageKube MSSP Team",
            responsibilities: "Receives escalations from NOC when monitoring detects potential security incidents"
          },
          {
            provider: "Vendor support",
            responsibilities: "ManageKube coordinates with Dell, IBM, Microsoft, and other vendors when hardware failures or complex software issues require manufacturer involvement"
          }
        ],
        typicalEngagement: [
          {
            title: "Business Hours NOC (8x5):",
            tiers: [
              { name: "Small environment (5-25 servers, 2-10 network devices)", price: "$4,000-$7,000/month" },
              { name: "Mid-market (25-100 servers, 10-50 network devices)", price: "$10,000-$18,000/month" },
              { name: "Enterprise (100+ servers, complex infrastructure)", price: "$22,000-$40,000/month" }
            ]
          },
          {
            title: "24/7 NOC:",
            tiers: [
              { name: "Small environment", price: "$8,000-$12,000/month" },
              { name: "Mid-market", price: "$18,000-$32,000/month" },
              { name: "Enterprise", price: "$40,000-$75,000/month" }
            ],
            notes: [
              "Pricing includes: Unlimited monitoring and incident response, Routine maintenance during defined windows, Monthly reporting showing infrastructure health, incidents resolved, trends, Quarterly service reviews with recommendations for improvements, Access to NOC team via phone/email/chat for infrastructure concerns"
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about Managed NOC", href: "/services/managed-noc" },
          { label: "Get infrastructure health check", href: "/get-started" }
        ]
      }
    ]
  },
  {
    id: "workplace",
    title: "Workplace & Productivity Solutions",
    icon: <Users className="w-6 h-6" />,
    description: "Microsoft 365 management, unified communications, and collaboration tools",
    services: [
      {
        id: "microsoft-365",
        title: "Microsoft 365 Management and Optimization",
        whatThisIs: "Microsoft 365 Management means we handle everything related to your Microsoft 365 environment (formerly Office 365)—including email (Exchange Online), file storage (SharePoint and OneDrive), collaboration tools (Microsoft Teams), and productivity applications (Word, Excel, PowerPoint, Outlook). This goes beyond just having Microsoft 365 licenses; it includes proper configuration, security hardening, user lifecycle management, compliance settings, ongoing optimization, and user support.",
        whyYouNeedIt: "Many organizations purchase Microsoft 365 licenses and assume \"it just works,\" but Microsoft 365 is an incredibly complex platform with hundreds of settings that impact security, compliance, performance, and user experience. Default settings often don't align with security best practices or compliance requirements. Without proper management, you're likely overpaying for licenses, leaving security gaps open, and frustrating users with poor configurations.",
        whatYouGet: [
          {
            title: "Initial setup and optimization:",
            items: [
              "Tenant configuration setting up your Microsoft 365 environment with proper naming, domains, and organizational structure",
              "User provisioning creating accounts, assigning licenses, configuring mailboxes, setting up OneDrive and SharePoint access",
              "Email migration moving from on-premises Exchange, Google Workspace, or other email systems to Microsoft 365 with minimal disruption",
              "Security baseline configuration implementing Microsoft's security recommendations plus additional hardening appropriate for your industry",
              "Compliance configuration setting up retention policies, eDiscovery, audit logging, and data loss prevention rules",
              "Teams and SharePoint architecture designing how your organization will use collaboration tools effectively"
            ]
          },
          {
            title: "User lifecycle:",
            items: [
              "New user onboarding creating accounts when employees join, configuring appropriate access and licenses",
              "Role changes adjusting permissions and licenses when employees change positions",
              "Offboarding securely disabling accounts when employees leave, preserving data, reassigning licenses"
            ]
          },
          {
            title: "Security and compliance:",
            items: [
              "Security monitoring watching for compromised accounts, suspicious login attempts, unusual data access patterns",
              "License optimization regularly reviewing license usage, reclaiming unused licenses, right-sizing subscriptions",
              "Policy management adjusting conditional access rules, data loss prevention policies, retention settings as requirements change",
              "Compliance reporting generating reports for auditors showing message retention, eDiscovery capabilities, access controls"
            ]
          },
          {
            title: "Support and training:",
            items: [
              "User support helping employees with Outlook, Teams, OneDrive, SharePoint issues through service desk",
              "Admin support assisting your internal IT team with complex Microsoft 365 questions and changes",
              "Best practices guidance recommending new Microsoft 365 features that could benefit your organization",
              "Training providing resources and sessions to help users get more value from Microsoft 365 tools"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSP Kube provides the Microsoft 365 engineering team that manages your tenant and coordinates with other teams",
            vendors: [
              { name: "Microsoft 365 E3 or E5", description: "From Pax8 or TD SYNNEX via Microsoft CSP program: The actual Microsoft 365 licenses providing email, collaboration, and productivity applications" },
              { name: "Microsoft Entra ID P1/P2", description: "From Pax8 or TD SYNNEX: Identity and access management platform providing conditional access, self-service password reset, privileged identity management" },
              { name: "Microsoft Defender for Office 365", description: "From Pax8 or TD SYNNEX: Advanced email and collaboration security (often included in E5 licenses)" },
              { name: "SkyKick", description: "From Pax8: Migration and backup platform for Microsoft 365 simplifying transitions and providing backup protection" },
              { name: "AvePoint", description: "From Pax8 or TD SYNNEX: Microsoft 365 management and security platform providing policy enforcement, compliance reporting, backup" },
              { name: "CoreView", description: "From Pax8: Microsoft 365 management platform providing usage analytics, license optimization, delegation of admin tasks" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube Microsoft 365 Team",
            responsibilities: "Configures tenant settings, manages user lifecycle, implements security policies, optimizes licenses, provides ongoing recommendations, coordinates migrations"
          },
          {
            provider: "Microsoft",
            responsibilities: "Provides the actual Microsoft 365 services (Exchange, SharePoint, Teams, OneDrive), underlying platform security, service reliability, feature updates"
          },
          {
            provider: "SkyKick/AvePoint/CoreView",
            responsibilities: "Provides management tools that simplify administration, enhance security beyond native Microsoft capabilities, provide backup protection"
          },
          {
            provider: "ManageKube Service Desk",
            responsibilities: "Handles day-to-day user questions about Outlook, Teams, OneDrive, SharePoint through the help desk"
          },
          {
            provider: "ManageKube MSSP Team",
            responsibilities: "Monitors security logs from Microsoft 365, investigates compromised accounts, responds to phishing attacks targeting your users"
          }
        ],
        typicalEngagement: [
          {
            title: "Migration Project (one-time):",
            tiers: [
              { name: "Small business (10-50 users)", price: "$5,000-$15,000 for assessment, migration planning, execution, post-migration cleanup" },
              { name: "Mid-market (50-250 users)", price: "$20,000-$50,000 including complex migration scenarios (multiple domains, hybrid configurations)" },
              { name: "Enterprise (250+ users)", price: "$60,000-$150,000+ for phased migrations with extensive coexistence and testing" }
            ]
          },
          {
            title: "Ongoing Management (monthly recurring):",
            tiers: [
              { name: "Small business (10-50 users)", price: "$1,500-$3,000/month including license management, security monitoring, user lifecycle, optimization" },
              { name: "Mid-market (50-250 users)", price: "$4,000-$8,000/month including comprehensive management, compliance reporting, quarterly optimization reviews" },
              { name: "Enterprise (250+ users)", price: "$10,000-$25,000/month including dedicated Microsoft 365 engineer, advanced security monitoring, monthly optimization" }
            ]
          },
          {
            title: "Microsoft 365 Licenses (monthly per-user):",
            tiers: [
              { name: "Microsoft 365 Business Basic", price: "$6/user/month (web-only apps, no desktop Office)" },
              { name: "Microsoft 365 Business Standard", price: "$12.50/user/month (includes desktop Office apps)" },
              { name: "Microsoft 365 Business Premium", price: "$22/user/month (adds security and device management)" },
              { name: "Microsoft 365 E3", price: "$36/user/month (enterprise-grade compliance and security)" },
              { name: "Microsoft 365 E5", price: "$57/user/month (adds advanced security, compliance, analytics)" }
            ],
            notes: ["Note: ManageKube management fees are in addition to Microsoft license costs"]
          }
        ],
        ctaLinks: [
          { label: "Learn more about Managed IT", href: "/services/managed-it" },
          { label: "Microsoft 365 security assessment", href: "/get-started" }
        ]
      },
      {
        id: "ucaas",
        title: "Unified Communications (UCaaS) - Voice and Collaboration",
        whatThisIs: "Unified Communications as a Service (UCaaS) replaces traditional phone systems with cloud-based voice, video, and messaging platforms. Instead of desk phones connected to an on-premises PBX (phone system), your employees make and receive calls through applications on their computers, desk phones connected to the internet, or mobile apps on their smartphones. This integrates phone calls, video conferencing, instant messaging, presence (seeing if colleagues are available), and voicemail into a single platform that works from anywhere.",
        whyYouNeedIt: "Traditional phone systems are expensive to maintain, difficult to manage, and don't support today's remote and hybrid work models. When employees work from home, they can't use their desk phone extension. With UCaaS, your phone system lives in the cloud and follows your employees wherever they work. It's also significantly cheaper—no more paying for expensive PRI lines or maintaining aging on-premises PBX equipment.",
        whatYouGet: [
          {
            title: "Voice capabilities:",
            items: [
              "Business phone numbers that can ring anywhere (desk phone, computer, mobile app) based on your preferences",
              "Auto attendants (automated menus) that greet callers and route them to appropriate departments or people",
              "Call queues for departments like sales or support where calls are distributed among available agents",
              "Voicemail to email where voicemail messages are transcribed and sent to your email inbox",
              "Call forwarding and find-me/follow-me routing calls to multiple devices until you answer",
              "Conference bridges for audio conference calls accommodating dozens or hundreds of participants",
              "Call recording for training, compliance, or quality assurance purposes"
            ]
          },
          {
            title: "Collaboration features:",
            items: [
              "Video conferencing for face-to-face meetings with colleagues, customers, and partners",
              "Screen sharing for presentations, demonstrations, and collaborative work",
              "Instant messaging for quick questions without interrupting with phone calls",
              "Presence showing whether colleagues are available, busy, in a meeting, or away",
              "File sharing exchanging documents during conversations",
              "Persistent chat rooms (channels/teams) for ongoing group conversations organized by project or department"
            ]
          },
          {
            title: "Integration capabilities:",
            items: [
              "CRM integration with Salesforce, HubSpot, or other CRM systems showing caller information automatically",
              "Microsoft 365 integration for unified contacts, calendars, and presence across all Microsoft tools",
              "Mobile apps providing full phone system functionality on smartphones",
              "Desk phone compatibility supporting existing phones in many cases or providing new desk phones as needed"
            ]
          }
        ],
        howWeDeliverIt: [
          {
            description: "ManageKube MSP Kube manages the UCaaS platform deployment, configuration, user training, and ongoing support",
            vendors: [
              { name: "Microsoft Teams Phone", description: "From Pax8 or TD SYNNEX: Best for organizations already using Microsoft 365, providing tight integration with Teams collaboration" },
              { name: "RingCentral MVP", description: "From Pax8: Industry-leading UCaaS platform with most features and best reliability" },
              { name: "8x8 Work", description: "From Pax8: Cost-effective UCaaS platform with strong international calling capabilities" },
              { name: "Cisco Webex Calling", description: "From TD SYNNEX: Enterprise-grade UCaaS integrated with Cisco collaboration tools" }
            ]
          },
          {
            description: "Desk phone options:",
            vendors: [
              { name: "Yealink", description: "From Pax8 or TD SYNNEX: Cost-effective desk phones compatible with most UCaaS platforms" },
              { name: "Poly", description: "From Pax8 or TD SYNNEX: Premium desk phones and conference room devices" },
              { name: "Cisco", description: "From TD SYNNEX: Enterprise-grade desk phones for Webex Calling" },
              { name: "Microsoft Teams phones", description: "From Pax8 or TD SYNNEX: Certified devices specifically for Teams Phone" }
            ]
          }
        ],
        whoProvides: [
          {
            provider: "ManageKube UCaaS Team",
            responsibilities: "Designs call flows and auto attendants, provisions users, configures integrations, trains employees, provides ongoing support through service desk"
          },
          {
            provider: "RingCentral/8x8/Microsoft/Cisco",
            responsibilities: "Provides the cloud platform handling call routing, voicemail, video conferencing, maintains service reliability and uptime"
          },
          {
            provider: "Your internet service provider",
            responsibilities: "Provides the internet connectivity that carries voice traffic (we recommend business-class internet with QoS for voice)"
          },
          {
            provider: "ManageKube Network Team",
            responsibilities: "Ensures network is properly configured for voice quality (QoS settings, bandwidth allocation, firewall rules)"
          },
          {
            provider: "Desk phone manufacturers",
            responsibilities: "Provides the physical desk phones if you choose to use them (many organizations go computer/mobile-only)"
          }
        ],
        typicalEngagement: [
          {
            title: "Implementation Project (one-time):",
            tiers: [
              { name: "Small business (5-25 users)", price: "$5,000-$12,000 including assessment, system design, configuration, porting phone numbers, training" },
              { name: "Mid-market (25-150 users)", price: "$15,000-$35,000 including complex call flows, CRM integration, department-specific configurations" },
              { name: "Enterprise (150+ users, multiple locations)", price: "$40,000-$100,000+ including staged rollout, extensive testing, change management" }
            ]
          },
          {
            title: "UCaaS Platform Licenses (per user per month):",
            tiers: [
              { name: "Microsoft Teams Phone", price: "$8-$12/user/month (requires Microsoft 365 E3 or E5 license also)" },
              { name: "RingCentral MVP Essentials", price: "$20/user/month (basic features)" },
              { name: "RingCentral MVP Standard", price: "$25/user/month (includes video, unlimited calling)" },
              { name: "RingCentral MVP Premium", price: "$35/user/month (advanced features, analytics)" },
              { name: "8x8 X-Series", price: "$15-$45/user/month depending on feature tier" },
              { name: "Cisco Webex Calling", price: "$25-$35/user/month" }
            ]
          },
          {
            title: "Desk Phones (if purchased):",
            tiers: [
              { name: "Basic models", price: "$75-$150 per phone (one-time cost)" },
              { name: "Mid-range models", price: "$150-$300 per phone" },
              { name: "Executive models", price: "$300-$600 per phone" },
              { name: "Conference room devices", price: "$500-$2,500 per room" }
            ]
          },
          {
            title: "ManageKube Management (monthly):",
            tiers: [
              { name: "Small business", price: "$500-$1,500/month including platform management, user lifecycle, support" },
              { name: "Mid-market", price: "$2,000-$5,000/month including call flow changes, analytics, optimization" },
              { name: "Enterprise", price: "$6,000-$15,000/month including dedicated UCaaS engineer, advanced reporting" }
            ]
          }
        ],
        ctaLinks: [
          { label: "Learn more about Managed IT", href: "/services/managed-it" },
          { label: "Assess your phone system", href: "/get-started" }
        ]
      }
    ]
  },
  {
    id: "compliance",
    title: "Compliance & Governance Solutions",
    icon: <FileCheck className="w-6 h-6" />,
    description: "Framework implementation, audit preparation, and continuous compliance monitoring",
    services: []
  },
  {
    id: "continuity",
    title: "Business Continuity Solutions",
    icon: <RefreshCw className="w-6 h-6" />,
    description: "Backup, disaster recovery, and business resilience planning",
    services: []
  },
  {
    id: "automation",
    title: "Automation & Efficiency Solutions",
    icon: <Zap className="w-6 h-6" />,
    description: "Process automation, integration, and workflow optimization",
    services: []
  },
  {
    id: "cost",
    title: "Cost & Strategy Solutions",
    icon: <DollarSign className="w-6 h-6" />,
    description: "IT strategy, virtual CIO/CISO, and cost optimization",
    services: []
  },
  {
    id: "industry",
    title: "Industry-Specific Solutions",
    icon: <Building2 className="w-6 h-6" />,
    description: "Specialized solutions for manufacturing, healthcare, finance, and more",
    services: []
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
                          <p className="text-brand-orange font-bold text-sm">{tier.price}</p>
                        </div>
                      ))}
                    </div>
                    {engagement.notes && (
                      <div className="mt-3 text-sm text-muted-foreground">
                        {engagement.notes.map((note, nIdx) => (
                          <p key={nIdx}>{note}</p>
                        ))}
                      </div>
                    )}
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

          {/* Coming Soon Notice for empty categories */}
          {activeServices.length === 0 && (
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
              <Link to="/get-started" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Get Started <ArrowRight className="w-4 h-4" />
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
              <h3 className="text-lg font-bold text-foreground mb-2">Browse the Service Layer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore our service modules to see how solutions integrate with managed services.
              </p>
              <Link to="/service-layer" className="text-sm font-semibold text-brand-orange flex items-center gap-1">
                Explore Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default Solutions;
/** END DO NOT TOUCH */
