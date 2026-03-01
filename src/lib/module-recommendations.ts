/**
 * Module Recommendation Engine
 * Maps gap flags, maturity scores, and EMS to recommended ManageKube modules (Kubes)
 * and à la carte professional services.
 */

import type { ScoringResult } from "./assessment-scoring";

export interface RecommendedModule {
  name: string;
  href: string;
  reason: string;
  priority: "critical" | "recommended" | "optional";
  icon: string; // lucide icon name
}

export interface ProfessionalService {
  name: string;
  description: string;
  priceRange: string;
  category: "migration" | "security" | "infrastructure" | "compliance" | "optimization";
  recommended: boolean;
  reason?: string;
}

export interface MilestoneDiscount {
  name: string;
  description: string;
  discountPct: number;
  targetMonth: number;
}

export function getRecommendedModules(
  scores: ScoringResult,
  answers: Record<string, any>,
  flags: Record<string, any>
): RecommendedModule[] {
  const modules: RecommendedModule[] = [];

  // Always recommended
  modules.push({
    name: "Assessment Kube",
    href: "/kubes/assessment-kube",
    reason: "Foundation: discovery, gap analysis, and transformation roadmap",
    priority: "critical",
    icon: "ClipboardCheck",
  });

  // Security-driven modules
  if (flags.flag_security_remediation || scores.risk_score > 30) {
    modules.push({
      name: "MSSP Kube",
      href: "/kubes/mssp-kube",
      reason: "24/7 SOC monitoring, threat detection, and incident response",
      priority: "critical",
      icon: "Shield",
    });
  }

  if (scores.cf_secops_maturity < 4 || flags.no_siem) {
    modules.push({
      name: "SDR Kube",
      href: "/kubes/sdr-kube",
      reason: "SIEM deployment, log correlation, and detection engineering",
      priority: flags.no_siem ? "critical" : "recommended",
      icon: "Eye",
    });
  }

  if (flags.no_edr || scores.cf_secops_maturity < 3) {
    modules.push({
      name: "CDR Kube",
      href: "/kubes/cdr-kube",
      reason: "Endpoint detection and response across all devices",
      priority: flags.no_edr ? "critical" : "recommended",
      icon: "Monitor",
    });
  }

  if (flags.no_mfa || scores.cf_iam_maturity < 3) {
    modules.push({
      name: "ITDR Kube",
      href: "/kubes/itdr-kube",
      reason: "Identity threat detection, MFA enforcement, and access governance",
      priority: flags.no_mfa ? "critical" : "recommended",
      icon: "Fingerprint",
    });
  }

  if (flags.flat_network || scores.cf_infrastructure_maturity < 3) {
    modules.push({
      name: "NDR Kube",
      href: "/kubes/ndr-kube",
      reason: "Network segmentation, traffic analysis, and lateral movement detection",
      priority: flags.flat_network ? "critical" : "recommended",
      icon: "Network",
    });
  }

  if (flags.no_vuln_scanning) {
    modules.push({
      name: "VDR Kube",
      href: "/kubes/vdr-kube",
      reason: "Continuous vulnerability scanning and remediation workflows",
      priority: "critical",
      icon: "Bug",
    });
  }

  // Compliance-driven
  if (flags.flag_compliance || (answers["P0-Q4A_FRAMEWORKS"] && answers["P0-Q4A_FRAMEWORKS"].length > 0)) {
    modules.push({
      name: "Compliance Kube",
      href: "/kubes/compliance-kube",
      reason: `Framework alignment for ${(answers["P0-Q4A_FRAMEWORKS"] || []).length} frameworks`,
      priority: "critical",
      icon: "FileCheck",
    });
    modules.push({
      name: "GRC Kube",
      href: "/kubes/grc-kube",
      reason: "Governance, risk, and compliance automation platform",
      priority: "recommended",
      icon: "Scale",
    });
  }

  // Infrastructure-driven
  if (flags.flag_infra_assessment || scores.cf_infrastructure_maturity < 4) {
    modules.push({
      name: "MSP Kube",
      href: "/kubes/msp-kube",
      reason: "Managed infrastructure operations and proactive maintenance",
      priority: "recommended",
      icon: "Server",
    });
  }

  if (flags.no_backup || flags.no_dr_plan) {
    modules.push({
      name: "BDR Kube",
      href: "/kubes/bdr-kube",
      reason: "Backup, disaster recovery, and business continuity",
      priority: "critical",
      icon: "DatabaseBackup",
    });
  }

  // Cloud-driven
  if (flags.flag_cloud_strategy || scores.cf_cloud_maturity > 0) {
    modules.push({
      name: "CIO Kube",
      href: "/kubes/cio-kube",
      reason: "Cloud infrastructure operations and FinOps optimisation",
      priority: "recommended",
      icon: "Cloud",
    });
  }

  // Growth-driven
  if (flags.flag_growth_enablement) {
    modules.push({
      name: "Innovation Kube",
      href: "/kubes/innovation-kube",
      reason: "Digital transformation enablement and automation strategy",
      priority: "recommended",
      icon: "Lightbulb",
    });
  }

  // Cost-driven
  if (flags.flag_cost_optimization || flags.vendor_consolidation || flags.license_waste) {
    modules.push({
      name: "Advisory Kube",
      href: "/kubes/advisory-kube",
      reason: "Vendor consolidation, licence optimisation, and cost reduction",
      priority: "recommended",
      icon: "Calculator",
    });
  }

  // Threat Intelligence
  if (scores.recommended_tier === "XME" || scores.risk_score > 50) {
    modules.push({
      name: "TI Kube",
      href: "/kubes/ti-kube",
      reason: "Threat intelligence feeds, dark web monitoring, and IOC enrichment",
      priority: "recommended",
      icon: "Radar",
    });
  }

  // APM for larger environments
  if (scores.endpoint_count > 150) {
    modules.push({
      name: "APM Kube",
      href: "/kubes/apm-kube",
      reason: "Application performance monitoring across your stack",
      priority: "optional",
      icon: "Activity",
    });
    modules.push({
      name: "NPM Kube",
      href: "/kubes/npm-kube",
      reason: "Network performance monitoring and capacity planning",
      priority: "optional",
      icon: "Gauge",
    });
  }

  // MDM for mobile devices
  if (answers["IA-Q11_MDM"] === "byod_unmanaged" || answers["IA-Q11_MDM"] === "none") {
    modules.push({
      name: "MDM Kube",
      href: "/kubes/mdm-kube",
      reason: "Mobile device management and endpoint security",
      priority: "recommended",
      icon: "Smartphone",
    });
  }

  // Deduplicate by name
  const seen = new Set<string>();
  return modules.filter((m) => {
    if (seen.has(m.name)) return false;
    seen.add(m.name);
    return true;
  });
}

export function getProfessionalServices(
  scores: ScoringResult,
  answers: Record<string, any>,
  flags: Record<string, any>
): ProfessionalService[] {
  const services: ProfessionalService[] = [];

  // M365 / Email Migration
  const emailPlatform = answers["P0-Q11_EMAIL"];
  if (emailPlatform === "on_prem_exchange" || emailPlatform === "other" || emailPlatform === "none") {
    services.push({
      name: "Microsoft 365 Migration",
      description: "Full tenant setup, mailbox migration, Teams deployment, and user training",
      priceRange: "$5,000 – $25,000",
      category: "migration",
      recommended: true,
      reason: "Your current email platform indicates a migration opportunity",
    });
  }
  if (emailPlatform === "microsoft_365" || emailPlatform === "mixed") {
    services.push({
      name: "Microsoft 365 Management & Optimization",
      description: "Licence right-sizing, security hardening, Intune deployment, and conditional access policies",
      priceRange: "$2,500 – $8,000",
      category: "optimization",
      recommended: flags.license_waste || flags.no_mfa,
      reason: "Optimise your existing M365 investment with proper security and governance",
    });
  }

  // Always available professional services
  services.push(
    {
      name: "Network Design & Buildout",
      description: "VLAN segmentation, firewall deployment, WiFi 6 rollout, and SD-WAN implementation",
      priceRange: "$8,000 – $50,000",
      category: "infrastructure",
      recommended: !!flags.flat_network,
      reason: flags.flat_network ? "Critical: flat network requires immediate segmentation" : undefined,
    },
    {
      name: "Penetration Testing",
      description: "Internal/external pen test, web app testing, social engineering, and remediation report",
      priceRange: "$5,000 – $25,000",
      category: "security",
      recommended: flags.flag_security_remediation || scores.risk_score > 30,
      reason: "Validate your security posture with ethical hacking",
    },
    {
      name: "Compliance Gap Analysis & Remediation",
      description: "Framework-specific gap analysis, control mapping, policy development, and audit preparation",
      priceRange: "$10,000 – $40,000",
      category: "compliance",
      recommended: !!flags.flag_compliance,
      reason: flags.flag_compliance ? "Required for your compliance framework obligations" : undefined,
    },
    {
      name: "Security Awareness Training Programme",
      description: "Custom phishing simulations, monthly training modules, and compliance reporting",
      priceRange: "$2,000 – $8,000/yr",
      category: "security",
      recommended: !!flags.training_recommendation,
      reason: "82% of breaches involve human error — training is your best ROI",
    },
    {
      name: "Cloud Migration & Architecture",
      description: "Azure/AWS/GCP workload migration, architecture design, and cutover planning",
      priceRange: "$15,000 – $75,000",
      category: "migration",
      recommended: !!flags.flag_cloud_strategy,
      reason: flags.flag_cloud_strategy ? "Aligned with your cloud strategy priority" : undefined,
    },
    {
      name: "Infrastructure Audit",
      description: "Complete environment assessment with lifecycle planning and capital budget projections",
      priceRange: "$5,000 – $15,000",
      category: "infrastructure",
      recommended: !!flags.flag_infra_assessment,
    },
    {
      name: "Data Centre Relocation / Consolidation",
      description: "Physical server migration, rack-and-stack, cabling, and project management",
      priceRange: "$20,000 – $100,000",
      category: "infrastructure",
      recommended: false,
    },
    {
      name: "Disaster Recovery Planning & Testing",
      description: "DR plan development, automated failover testing, and tabletop exercises",
      priceRange: "$8,000 – $30,000",
      category: "infrastructure",
      recommended: !!flags.no_dr_plan || !!flags.no_backup,
      reason: flags.no_dr_plan ? "No DR plan identified — critical gap" : undefined,
    },
    {
      name: "Vendor Rationalisation & Contract Negotiation",
      description: "Vendor audit, consolidation roadmap, and renewal negotiation support",
      priceRange: "$5,000 – $15,000",
      category: "optimization",
      recommended: !!flags.vendor_consolidation || !!flags.license_waste,
      reason: "Reduce vendor sprawl and eliminate redundant tools",
    },
    {
      name: "Custom Automation Development",
      description: "Power Automate, scripting, and API integration for operational workflows",
      priceRange: "$5,000 – $25,000",
      category: "optimization",
      recommended: !!flags.flag_growth_enablement && scores.cf_automation_maturity < 3,
    },
    {
      name: "Physical Security Assessment",
      description: "Access control, CCTV, badge systems, and physical security policy review",
      priceRange: "$3,000 – $12,000",
      category: "security",
      recommended: false,
    },
    {
      name: "vCISO / Fractional Security Leadership",
      description: "Part-time CISO engagement for security strategy, board reporting, and programme oversight",
      priceRange: "$3,000 – $8,000/mo",
      category: "security",
      recommended: scores.recommended_tier === "XME" || (flags.flag_security_remediation && scores.risk_score > 40),
    },
  );

  return services;
}

export function getMilestoneDiscounts(scores: ScoringResult): MilestoneDiscount[] {
  const milestones: MilestoneDiscount[] = [
    {
      name: "Onboarding Complete",
      description: "All core modules deployed, agents installed, baseline monitoring active",
      discountPct: 5,
      targetMonth: 3,
    },
    {
      name: "Security Baseline Achieved",
      description: "MFA enforced, EDR deployed, backup verified, patch cadence < 7 days",
      discountPct: 5,
      targetMonth: 6,
    },
    {
      name: "Compliance Alignment",
      description: "Primary framework controls mapped and evidenced; audit-ready state",
      discountPct: 5,
      targetMonth: 9,
    },
    {
      name: "Operational Maturity",
      description: "Automation targets met, MTTR < 4hrs, SLA compliance > 99%, cost optimisation achieved",
      discountPct: 7,
      targetMonth: 12,
    },
  ];

  return milestones;
}

export function calculateMilestonePrice(
  basePrice: number,
  milestones: MilestoneDiscount[],
  achievedMilestoneCount: number
): number {
  let discount = 0;
  for (let i = 0; i < Math.min(achievedMilestoneCount, milestones.length); i++) {
    discount += milestones[i].discountPct;
  }
  return Math.round(basePrice * (1 - discount / 100));
}
