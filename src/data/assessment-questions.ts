/**
 * ManageKube Unified Question Set v2.0
 * Canonical question definitions with scoring weights and branching logic.
 * Question order matches spec: P0-Q1 through P0-Q12, then deep-dive flows.
 * DO NOT MODIFY without updating assessment-scoring.ts
 */

export type QuestionType = "single" | "multi" | "number" | "text";

export interface QuestionOption {
  label: string;
  value: string;
  score?: Record<string, number>; // { scoringField: points }
  flags?: Record<string, boolean | string>;
}

export interface AssessmentQuestion {
  code: string;
  flow: "P0" | "SR" | "IA" | "CM" | "GE" | "CO";
  label: string;
  description?: string;
  type: QuestionType;
  options?: QuestionOption[];
  showIf?: (answers: Record<string, any>, flags: Record<string, any>) => boolean;
  hubspotProperty?: string;
  dbColumn?: string; // direct column on assessment_sessions
}

// ═══════════════════════════════════════════════════════════
// P0 — UNIVERSAL (all prospects) — ordered per spec S-01 through S-11
// ═══════════════════════════════════════════════════════════

export const P0_QUESTIONS: AssessmentQuestion[] = [
  // S-01: P0-Q1_ROLE
  {
    code: "P0-Q1_ROLE",
    flow: "P0",
    label: "What best describes your role?",
    description: "Your role helps us calibrate the technical depth and focus of your assessment results.",
    type: "single",
    hubspotProperty: "mk_onb_role",
    dbColumn: "role",
    options: [
      { label: "CIO / VP Technology", value: "cto_cio_vp_tech", score: { complexity: 2 } },
      { label: "Director / Manager / IT Director", value: "it_manager", score: { complexity: 2 } },
      { label: "CISO / Security / Compliance Lead", value: "ciso_security_compliance", score: { complexity: 2 } },
      { label: "CEO / Owner / Founder", value: "ceo_owner", score: { complexity: 2 } },
      { label: "COO / Operations Lead", value: "coo_ops", score: { complexity: 1 } },
      { label: "CFO / Finance / Procurement", value: "cfo_finance", score: { complexity: 1 } },
      { label: "Other", value: "other", score: { complexity: 0 } },
    ],
  },
  // S-02: P0-Q2_ORG_STAGE
  {
    code: "P0-Q2_ORG_STAGE",
    flow: "P0",
    label: "Which best describes your organisation's stage?",
    description: "Maturity stage shapes which services fit your current trajectory best.",
    type: "single",
    hubspotProperty: "mk_onb_org_stage",
    dbColumn: "org_stage",
    options: [
      { label: "Startup (0–2 years)", value: "startup_0_2y", score: { complexity: 1, growth_modifier: -10 } },
      { label: "Growth stage (2–5 years)", value: "growth_2_5y", score: { complexity: 3, growth_modifier: 4 } },
      { label: "Established (5+ years, single site)", value: "established_5y_plus", score: { complexity: 4, growth_modifier: 0 } },
      { label: "Enterprise / Multi-site", value: "enterprise", score: { complexity: 5, growth_modifier: 10 } },
    ],
  },
  // S-03: P0-Q3_IT_SITUATION
  {
    code: "P0-Q3_IT_SITUATION",
    flow: "P0",
    label: "How is IT managed today?",
    description: "Your IT model determines whether we position as a replacement, co-managed partner, or greenfield build.",
    type: "single",
    hubspotProperty: "mk_onb_it_situation",
    dbColumn: "it_situation",
    options: [
      { label: "No dedicated IT (ad-hoc / self-managed)", value: "no_it", score: { complexity: 3, risk: 2 }, flags: { greenfield: true } },
      { label: "Internal IT team", value: "internal_it", score: { complexity: 2 } },
      { label: "Outsourced to an MSP currently", value: "msp_current", score: { complexity: 3, risk: 2 }, flags: { manage_flag: true } },
      { label: "Hybrid (internal + MSP)", value: "hybrid_it", score: { complexity: 2 } },
    ],
  },
  // S-03 conditional: P0-Q3A_IT_TEAM_SIZE
  {
    code: "P0-Q3A_IT_TEAM_SIZE",
    flow: "P0",
    label: "How large is your internal IT team?",
    description: "Headcount ratio reveals capacity gaps and shapes whether we recommend transition support or co-management.",
    type: "single",
    hubspotProperty: "mk_it_team_size",
    dbColumn: "it_team_size",
    showIf: (answers) => answers["P0-Q3_IT_SITUATION"] === "internal_it" || answers["P0-Q3_IT_SITUATION"] === "hybrid_it",
    options: [
      { label: "1–2 people", value: "1-2", score: { complexity: 2 }, flags: { understaffed_it: true } },
      { label: "3–5 people", value: "3-5", score: { complexity: 1 } },
      { label: "6–10 people", value: "6-10", score: { complexity: 0 } },
      { label: "10+ people", value: "10+", score: { complexity: 0 } },
    ],
  },
  // S-04 conditional: P0-Q3B_MSP_ISSUES
  {
    code: "P0-Q3B_MSP_ISSUES",
    flow: "P0",
    label: "What issues are you experiencing with your current MSP?",
    description: "This helps us understand the gaps in your current provision and position the right transition approach.",
    type: "multi",
    hubspotProperty: "mk_onb_msp_issues",
    dbColumn: "msp_issues",
    showIf: (answers) => answers["P0-Q3_IT_SITUATION"] === "msp_current",
    options: [
      { label: "Slow response times", value: "response_time", score: { urgency: 3 }, flags: { co_managed: true } },
      { label: "Security gaps or incidents under their watch", value: "security_gaps", score: { urgency: 3, risk: 5 }, flags: { co_managed: true } },
      { label: "Cost / value concerns", value: "cost", score: { urgency: 2 }, flags: { co_managed: true } },
      { label: "Limited scope or capabilities", value: "limited_scope", score: { urgency: 2 }, flags: { co_managed: true } },
      { label: "Lack of specialist expertise", value: "lack_expertise", score: { urgency: 3 }, flags: { co_managed: true } },
      { label: "Poor communication / reporting", value: "communication", score: { urgency: 2 }, flags: { co_managed: true } },
      { label: "Other", value: "other", flags: { co_managed: true } },
    ],
  },
  // S-05: P0-Q4_PRIMARY_PRIORITY (ROUTES ENTIRE DEEP-DIVE FLOW)
  {
    code: "P0-Q4_PRIMARY_PRIORITY",
    flow: "P0",
    label: "What is your primary IT challenge right now?",
    description: "CRITICAL — This routes the entire deep-dive assessment flow.",
    type: "single",
    hubspotProperty: "mk_onb_priority",
    dbColumn: "primary_priority",
    options: [
      { label: "We had a security incident or breach", value: "security_incident", score: { urgency: 5, risk: 4 }, flags: { flag_security_remediation: true } },
      { label: "Compliance deadline or audit coming up", value: "compliance_deadline", score: { urgency: 5 }, flags: { flag_compliance: true } },
      { label: "Modernise or stabilise infrastructure", value: "modernize_infra", flags: { flag_infra_assessment: true } },
      { label: "Cloud migration or rearchitecting", value: "cloud_strategy", flags: { flag_cloud_strategy: true } },
      { label: "Reduce IT costs or consolidate vendors", value: "cost_optimization", flags: { flag_cost_optimization: true } },
      { label: "Scale operations for growth", value: "growth_enablement", flags: { flag_growth_enablement: true } },
      { label: "Engage a managed service provider", value: "service_spec", flags: { flag_infra_assessment: true } },
    ],
  },
  // S-06 conditional: P0-Q4A_FRAMEWORKS
  {
    code: "P0-Q4A_FRAMEWORKS",
    flow: "P0",
    label: "Which compliance frameworks are in scope for your organisation?",
    description: "Each framework adds +3 complexity (CMMC/FedRAMP +4), capped at +15 total.",
    type: "multi",
    hubspotProperty: "mk_compliance_in_scope",
    dbColumn: "compliance_frameworks",
    showIf: (_answers, flags) => flags.flag_compliance === true,
    options: [
      { label: "HIPAA (US Healthcare)", value: "hipaa", score: { compliance_complexity: 3 } },
      { label: "PCI DSS (Payment card)", value: "pci_dss", score: { compliance_complexity: 3 } },
      { label: "SOC 2 (Service organisation)", value: "soc2", score: { compliance_complexity: 3 } },
      { label: "CMMC (US Defence supply chain)", value: "cmmc", score: { compliance_complexity: 4 } },
      { label: "NIST CSF (Federal / voluntary)", value: "nist_csf", score: { compliance_complexity: 2 } },
      { label: "GDPR (EU data)", value: "gdpr", score: { compliance_complexity: 3 } },
      { label: "CCPA (California data)", value: "ccpa", score: { compliance_complexity: 3 } },
      { label: "ISO 27001 (International)", value: "iso27001", score: { compliance_complexity: 3 } },
      { label: "FERPA (US Education)", value: "ferpa", score: { compliance_complexity: 3 } },
      { label: "GLBA (US Financial)", value: "glba", score: { compliance_complexity: 3 } },
      { label: "FedRAMP (US Federal cloud)", value: "fedramp", score: { compliance_complexity: 4 } },
      { label: "NIST 800-171", value: "nist_800_171", score: { compliance_complexity: 3 } },
      { label: "NIST 800-53", value: "nist_800_53", score: { compliance_complexity: 3 } },
      { label: "CIS Controls v8.1", value: "cis_controls", score: { compliance_complexity: 2 } },
      { label: "CJIS", value: "cjis", score: { compliance_complexity: 3 } },
      { label: "FISMA", value: "fisma", score: { compliance_complexity: 3 } },
      { label: "Other framework", value: "other", score: { compliance_complexity: 3 } },
    ],
  },
  // S-06 conditional: P0-Q4A_DEADLINE
  {
    code: "P0-Q4A_DEADLINE",
    flow: "P0",
    label: "Do you have a specific compliance deadline?",
    description: "A deadline within 90 days triggers our accelerated compliance programme.",
    type: "single",
    hubspotProperty: "mk_has_compliance_deadline",
    dbColumn: "compliance_deadline",
    showIf: (_answers, flags) => flags.flag_compliance === true,
    options: [
      { label: "Within 30 days", value: "30d", score: { urgency: 10 }, flags: { fast_track: true } },
      { label: "Within 90 days", value: "90d", score: { urgency: 8 }, flags: { fast_track: true } },
      { label: "3–6 months", value: "3-6m", score: { urgency: 4 } },
      { label: "6–12 months", value: "6-12m", score: { urgency: 2 } },
      { label: "No specific deadline", value: "none", score: { urgency: 0 } },
      { label: "Not sure", value: "unknown", score: { urgency: 1 } },
    ],
  },
  // S-07 conditional: P0-Q4B_INCIDENT_TYPE (MULTI-SELECT per spec page 19)
  {
    code: "P0-Q4B_INCIDENT_TYPE",
    flow: "P0",
    label: "What type of incident occurred?",
    description: "Confidential — shapes the exact remediation expertise and tooling we mobilise. Does NOT reduce EMS — increases urgency.",
    type: "multi",
    hubspotProperty: "mk_security_incident_types",
    dbColumn: "incident_type",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Ransomware", value: "ransomware", score: { urgency: 5, risk: 5 } },
      { label: "Data breach / data exfiltration", value: "data_breach", score: { urgency: 5, risk: 5 } },
      { label: "Business email compromise (BEC)", value: "bec", score: { urgency: 5, risk: 5 } },
      { label: "Malware / virus", value: "malware", score: { urgency: 5, risk: 5 } },
      { label: "DDoS attack", value: "ddos", score: { urgency: 5, risk: 5 } },
      { label: "Insider threat", value: "insider", score: { urgency: 5, risk: 5 } },
      { label: "System compromise", value: "system_compromise", score: { urgency: 5, risk: 5 } },
      { label: "Unauthorised access", value: "unauthorised_access", score: { urgency: 5, risk: 5 } },
      { label: "Other", value: "other", score: { urgency: 5, risk: 5 } },
    ],
  },
  // S-07 conditional: P0-Q4B_INCIDENT_AGE
  {
    code: "P0-Q4B_INCIDENT_AGE",
    flow: "P0",
    label: "When did the incident occur?",
    description: "Ongoing incidents are escalated to our IR team immediately — the rest of the assessment can wait.",
    type: "single",
    dbColumn: "incident_age",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "It is ongoing right now", value: "ongoing", score: { urgency: 25 }, flags: { ir_escalation: true, fast_track: true, immediate_escalation: true } },
      { label: "Within the last 30 days", value: "last_30d", score: { urgency: 15 }, flags: { fast_track: true } },
      { label: "31–90 days ago", value: "last_90d", score: { urgency: 10 } },
      { label: "91 days to 1 year ago", value: "last_year", score: { urgency: 5 } },
      { label: "Over a year ago", value: "over_year", score: { urgency: 0 } },
    ],
  },
  // S-08: P0-Q5_EMPLOYEE_COUNT
  {
    code: "P0-Q5_EMPLOYEE_COUNT",
    flow: "P0",
    label: "How many employees does your organisation have?",
    description: "Helps us size the right service tier and endpoint coverage for your organisation.",
    type: "single",
    hubspotProperty: "numberOfEmployees",
    options: [
      { label: "1–25", value: "25" },
      { label: "26–50", value: "50" },
      { label: "51–100", value: "100" },
      { label: "101–200", value: "200" },
      { label: "201–500", value: "500" },
      { label: "501–1,000", value: "1000" },
      { label: "1,000+", value: "1000+" },
    ],
  },
  // S-08: P0-Q6_REVENUE
  {
    code: "P0-Q6_REVENUE",
    flow: "P0",
    label: "What is your approximate annual revenue?",
    description: "Revenue context allows us to frame the financial impact of incidents and the ROI of prevention accurately.",
    type: "single",
    hubspotProperty: "annualrevenue",
    options: [
      { label: "Under $1M", value: "under_1m" },
      { label: "$1M – $5M", value: "1m_5m" },
      { label: "$5M – $25M", value: "5m_25m" },
      { label: "$25M – $100M", value: "25m_100m", score: { complexity: 1 } },
      { label: "$100M – $500M", value: "100m_500m", score: { complexity: 2 } },
      { label: "$500M+", value: "500m_plus", score: { complexity: 3 } },
      { label: "Prefer not to say", value: "prefer_not" },
    ],
  },
  // S-08: P0-Q7_INDUSTRY
  {
    code: "P0-Q7_INDUSTRY",
    flow: "P0",
    label: "What industry is your organisation in?",
    description: "Your industry shapes regulatory requirements, risk profile, and the specialised capabilities we prioritise.",
    type: "single",
    hubspotProperty: "industry",
    dbColumn: "industry",
    options: [
      { label: "Financial Services / Banking / Insurance", value: "financial_services", score: { industry_multiplier: 1.1 } },
      { label: "Healthcare / Life Sciences / Pharma", value: "healthcare", score: { industry_multiplier: 1.1 } },
      { label: "Manufacturing / Industrial", value: "manufacturing", score: { industry_multiplier: 1.1 } },
      { label: "Retail / eCommerce", value: "retail", score: { industry_multiplier: 1.0 } },
      { label: "Technology / Software", value: "technology", score: { industry_multiplier: 0.95 } },
      { label: "Energy / Utilities / Critical Infrastructure", value: "energy_utilities", score: { industry_multiplier: 1.1 } },
      { label: "Legal / Professional Services", value: "legal_professional", score: { industry_multiplier: 1.0 } },
      { label: "Government / Public Sector", value: "public_sector", score: { industry_multiplier: 1.1 } },
      { label: "Education", value: "education", score: { industry_multiplier: 1.0 } },
      { label: "Defence / Aerospace", value: "defence_aerospace", score: { industry_multiplier: 1.1 } },
      { label: "Transportation", value: "transportation", score: { industry_multiplier: 1.0 } },
      { label: "Telecommunications", value: "telecommunications", score: { industry_multiplier: 1.05 } },
      { label: "Mining & Extraction", value: "mining_extraction", score: { industry_multiplier: 1.05 } },
      { label: "Other", value: "other", score: { industry_multiplier: 1.0 } },
    ],
  },
  // S-09: P0-Q8_LOCATIONS
  {
    code: "P0-Q8_LOCATIONS",
    flow: "P0",
    label: "How many physical locations does your organisation operate from?",
    description: "Multi-site environments require different networking, management, and monitoring approaches.",
    type: "single",
    hubspotProperty: "mk_location_count",
    dbColumn: "location_count",
    options: [
      { label: "Single location", value: "single", score: { complexity: 0 } },
      { label: "2–3 locations", value: "two_three", score: { complexity: 2 } },
      { label: "4–10 locations", value: "four_ten", score: { complexity: 4 }, flags: { mk_multisite: true } },
      { label: "11–25 locations", value: "eleven_25", score: { complexity: 6 }, flags: { mk_multisite: true } },
      { label: "25+ locations / Multi-national", value: "over_25", score: { complexity: 8 }, flags: { mk_multisite: true } },
    ],
  },
  // S-09: P0-Q9_ENDPOINTS
  {
    code: "P0-Q9_ENDPOINTS",
    flow: "P0",
    label: "How many total endpoints (desktops, laptops, servers, mobile devices) do you manage?",
    description: "Endpoint count determines your per-seat pricing. Include all managed devices.",
    type: "single",
    hubspotProperty: "mk_endpoint_count",
    dbColumn: "endpoint_count",
    options: [
      { label: "1–50", value: "50", score: { ems_base: 50 } },
      { label: "51–150", value: "150", score: { ems_base: 150 } },
      { label: "151–500", value: "500", score: { ems_base: 350 } },
      { label: "501–1,000", value: "1000", score: { ems_base: 550 } },
      { label: "1,000–5,000", value: "5000", score: { ems_base: 750 } },
      { label: "5,000+", value: "5000+", score: { ems_base: 900 } },
    ],
  },
  // S-10: P0-Q10_REMOTE
  {
    code: "P0-Q10_REMOTE",
    flow: "P0",
    label: "What percentage of your workforce works remotely?",
    description: "Remote workforce percentage affects endpoint management strategy, VPN requirements, and security posture.",
    type: "single",
    hubspotProperty: "mk_remote_workforce_pct",
    dbColumn: "remote_workforce_pct",
    options: [
      { label: "0–20% remote (mostly on-site)", value: "zero_20", score: { complexity: 0 } },
      { label: "21–50% remote (hybrid)", value: "21_50", score: { complexity: 1 } },
      { label: "51–80% remote", value: "51_80", score: { complexity: 2 } },
      { label: "80%+ remote (remote-first)", value: "over_80", score: { complexity: 3 } },
    ],
  },
  // S-10: P0-Q11_EMAIL
  {
    code: "P0-Q11_EMAIL",
    flow: "P0",
    label: "What is your primary email and productivity platform?",
    description: "Your email platform drives licensing approach, backup requirements, and identity management strategy.",
    type: "single",
    hubspotProperty: "mk_email_platform",
    dbColumn: "email_platform",
    options: [
      { label: "Microsoft 365", value: "microsoft_365" },
      { label: "Google Workspace", value: "google_workspace" },
      { label: "On-premises Exchange", value: "on_prem_exchange", score: { complexity: 2 }, flags: { modernisation_recommendation: true } },
      { label: "Mixed (Microsoft + Google)", value: "mixed", score: { complexity: 1 } },
      { label: "Other / Legacy", value: "other" },
      { label: "No formal platform", value: "none" },
    ],
  },
  // S-11: P0-Q12_TIMELINE
  {
    code: "P0-Q12_TIMELINE",
    flow: "P0",
    label: "What is your expected implementation timeline?",
    description: "Timeline helps us assign the right onboarding team and set your deployment schedule.",
    type: "single",
    hubspotProperty: "mk_onb_timeline",
    dbColumn: "timeline",
    options: [
      { label: "Within 30 days (urgent)", value: "urgent_30d", score: { urgency: 5 }, flags: { fast_track: true } },
      { label: "1–3 months", value: "near_term_1_3m", score: { urgency: 3 } },
      { label: "3–6 months", value: "planning_3_6m", score: { urgency: 1 } },
      { label: "Exploring (6 months+)", value: "exploring_6m_plus", score: { urgency: 0 } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// SR — SECURITY REMEDIATION (flag_security_remediation = true)
// ═══════════════════════════════════════════════════════════

export const SR_QUESTIONS: AssessmentQuestion[] = [
  // SR-01: Current incident status
  {
    code: "SR-Q1",
    flow: "SR",
    label: "What is the current status of the incident?",
    description: "If ongoing: we will connect you with our Incident Response team immediately.",
    type: "single",
    hubspotProperty: "mk_sr_incident_status",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Ongoing / active right now", value: "ongoing", flags: { ir_escalation: true, immediate_escalation: true } },
      { label: "Contained but not fully resolved", value: "contained", score: { risk: 10 } },
      { label: "Fully resolved", value: "resolved", score: { risk: 5 } },
      { label: "Unclear / not sure", value: "unclear", score: { risk: 8, urgency: 5 } },
    ],
  },
  // SR-01: External IR support
  {
    code: "SR-Q2",
    flow: "SR",
    label: "Do you currently have external IR support engaged?",
    type: "single",
    hubspotProperty: "mk_sr_ir_support",
    showIf: (answers, flags) => flags.flag_security_remediation === true && answers["SR-Q1"] !== "ongoing",
    options: [
      { label: "Yes, and we have what we need", value: "yes_sufficient" },
      { label: "Yes, but we need additional support", value: "yes_need_more", score: { risk: 5 }, flags: { ir_retainer_recommendation: true } },
      { label: "No", value: "no", score: { risk: 15 }, flags: { ir_retainer_recommendation: true } },
    ],
  },
  // SR-02: Additional IR support needs (conditional)
  {
    code: "SR-Q2A",
    flow: "SR",
    label: "What additional IR support do you need?",
    type: "multi",
    hubspotProperty: "mk_sr_ir_additional_needs",
    showIf: (answers) => answers["SR-Q2"] === "yes_need_more",
    options: [
      { label: "Digital forensics", value: "forensics" },
      { label: "Malware analysis", value: "malware_analysis" },
      { label: "Containment and eradication", value: "containment" },
      { label: "Communications / PR support", value: "communications" },
      { label: "Legal / regulatory counsel", value: "legal" },
      { label: "Recovery and restoration", value: "recovery" },
    ],
  },
  // SR-02: Business impact (MULTI-SELECT per spec page 32)
  {
    code: "SR-Q3",
    flow: "SR",
    label: "What has been the business impact of the incident?",
    description: "Sets context for proposal incident summary section.",
    type: "multi",
    hubspotProperty: "mk_sr_business_impact",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Critical systems down or impaired", value: "systems_down", flags: { impact_severity: "high" } },
      { label: "Customer or employee data compromised", value: "data_compromised", flags: { impact_severity: "high" } },
      { label: "Direct financial loss (ransom, fraud, recovery costs)", value: "financial_loss", flags: { impact_severity: "critical" } },
      { label: "Operational disruption (production, services)", value: "operational_disruption" },
      { label: "Reputational impact or media coverage", value: "reputational" },
      { label: "Ransom demand received or paid", value: "ransom_paid", flags: { impact_severity: "critical" } },
      { label: "No significant business impact yet", value: "none_yet" },
    ],
  },
  // SR-03: Notifications made (MULTI-SELECT per spec page 33)
  {
    code: "SR-Q4",
    flow: "SR",
    label: "Have the following notifications been made?",
    description: "Regulatory notifications are legally required in most breach scenarios.",
    type: "multi",
    hubspotProperty: "mk_sr_notifications_made",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Law enforcement (FBI / local police)", value: "law_enforcement" },
      { label: "Cyber insurance carrier", value: "insurance" },
      { label: "Regulatory body (HHS, FTC, PCI, etc.)", value: "regulators" },
      { label: "Customers or affected individuals", value: "customers" },
      { label: "Board / executive team", value: "board" },
      { label: "None of the above", value: "none_made", flags: { notification_guidance: true } },
    ],
  },
  // SR-04: MFA deployment level
  {
    code: "SR-Q7_MFA",
    flow: "SR",
    label: "What is your current MFA deployment level?",
    description: "MFA is the single highest-impact security control — it prevents 99.9% of automated credential attacks.",
    type: "single",
    hubspotProperty: "mk_cf_iam_maturity",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Enforced for all users on all systems", value: "enforced_all", score: { cf_iam_maturity: 4 } },
      { label: "Enforced for remote access only", value: "enforced_remote", score: { cf_iam_maturity: 2, risk: 5 } },
      { label: "Enforced for admins only", value: "enforced_admin", score: { cf_iam_maturity: 1, risk: 10 } },
      { label: "Deployed but not enforced / partial rollout", value: "partial", score: { risk: 15 }, flags: { no_mfa: true } },
      { label: "No MFA deployed", value: "none", score: { risk: 30 }, flags: { no_mfa: true } },
    ],
  },
  // SR-04: Network architecture
  {
    code: "SR-Q8",
    flow: "SR",
    label: "Describe your network architecture: firewall and segmentation.",
    description: "Flat networks allow a single compromised endpoint to reach all systems — segmentation limits blast radius.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Next-gen firewall with micro-segmentation / zero-trust", value: "ngfw_segmented", score: { cf_infrastructure_maturity: 3 } },
      { label: "Firewall deployed, basic VLAN segmentation", value: "fw_basic", score: { cf_infrastructure_maturity: 1 } },
      { label: "Firewall only, flat network", value: "fw_flat", score: { risk: 10 }, flags: { flat_network: true } },
      { label: "No dedicated firewall", value: "none", score: { risk: 20 }, flags: { flat_network: true } },
    ],
  },
  // SR-05: SIEM / log management
  {
    code: "SR-Q9",
    flow: "SR",
    label: "Do you have a SIEM or centralised log management solution?",
    description: "Without SIEM, average breach dwell time is 197 days. Our SOC MDR service provides immediate visibility.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Full SIEM with alert correlation", value: "siem_full", score: { cf_secops_maturity: 4 } },
      { label: "Log collection only (no correlation)", value: "log_management", score: { cf_secops_maturity: 1, risk: 5 } },
      { label: "Partial — some systems log centrally", value: "partial", score: { risk: 10 }, flags: { no_siem: true } },
      { label: "No centralised logging", value: "none", score: { risk: 20 }, flags: { no_siem: true } },
    ],
  },
  // SR-05: Backup and recovery status
  {
    code: "SR-Q10",
    flow: "SR",
    label: "What is your current backup and recovery status?",
    description: "Untested backups fail in 40% of real recovery events.",
    type: "single",
    hubspotProperty: "mk_cf_dataprotection_maturity",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Automated backups with monthly tested recovery", value: "automated_tested", score: { cf_data_protection_maturity: 4 } },
      { label: "Automated backups, annual recovery test", value: "automated_annual", score: { cf_data_protection_maturity: 2 } },
      { label: "Automated backups, recovery never tested", value: "automated_untested", score: { risk: 15 }, flags: { no_backup: true } },
      { label: "Manual backups", value: "manual", score: { cf_data_protection_maturity: 1, risk: 15 } },
      { label: "No backups", value: "none", score: { risk: 25 }, flags: { no_backup: true } },
    ],
  },
  // SR-06: Endpoint protection
  {
    code: "SR-Q11",
    flow: "SR",
    label: "What endpoint protection is deployed?",
    description: "EDR stops ransomware before encryption. Legacy AV misses the vast majority of modern attacks.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Managed EDR (vendor-managed SOC integration)", value: "edr_managed", score: { cf_secops_maturity: 4 } },
      { label: "EDR deployed, self-managed", value: "edr_self", score: { cf_secops_maturity: 2 } },
      { label: "Modern AV / EPP only", value: "av_modern", score: { cf_secops_maturity: 1, risk: 5 } },
      { label: "Legacy AV (more than 3 years old)", value: "av_legacy", score: { risk: 10 }, flags: { no_edr: true } },
      { label: "No endpoint protection", value: "none", score: { risk: 15 }, flags: { no_edr: true } },
    ],
  },
  // SR-07: Incident response plan
  {
    code: "SR-Q14",
    flow: "SR",
    label: "Do you have a documented incident response plan?",
    description: "A tested IR plan reduces average breach cost by 35% and mean recovery time by 60%.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Documented and tested in the last 12 months", value: "documented_tested", score: { cf_secops_maturity: 3 } },
      { label: "Documented but not tested", value: "documented_untested", score: { cf_secops_maturity: 1, risk: 5 } },
      { label: "Informal / undocumented process", value: "informal", score: { risk: 10 }, flags: { no_ir_plan: true } },
      { label: "No IR plan", value: "none", score: { risk: 10 }, flags: { no_ir_plan: true } },
    ],
  },
  // SR-08: Security awareness training
  {
    code: "SR-Q_T",
    flow: "SR",
    label: "What is your current security awareness training programme?",
    description: "Human error accounts for 82% of breaches. Training is your most cost-effective security investment.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Continuous programme with phishing simulation metrics", value: "continuous", score: { cf_secops_maturity: 3 } },
      { label: "Monthly training with phishing simulations", value: "monthly_phishing", score: { cf_secops_maturity: 2 } },
      { label: "Quarterly training", value: "quarterly", score: { cf_secops_maturity: 1 } },
      { label: "Annual training only", value: "annual", score: { cf_secops_maturity: 1 } },
      { label: "No formal training programme", value: "none", score: { cf_secops_maturity: 0 }, flags: { training_recommendation: true } },
    ],
  },
  // SR-09: Vulnerability scanning
  {
    code: "SR-Q_V",
    flow: "SR",
    label: "How frequently does your organisation perform vulnerability scanning?",
    description: "The average vulnerability-to-exploit window is 15 days. Weekly or continuous scanning is the minimum for regulated environments.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Continuous scanning with auto-remediation workflows", value: "continuous", score: { cf_secops_maturity: 3 } },
      { label: "Weekly scans with SLA-bound remediation", value: "weekly", score: { cf_secops_maturity: 2 } },
      { label: "Monthly scans", value: "monthly", score: { cf_secops_maturity: 1 } },
      { label: "Quarterly scans", value: "quarterly", score: { cf_secops_maturity: 1 } },
      { label: "No vulnerability scanning", value: "none", score: { risk: 10 }, flags: { no_vuln_scanning: true } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// IA — INFRASTRUCTURE ASSESSMENT (flag_infra_assessment = true)
// ═══════════════════════════════════════════════════════════

export const IA_QUESTIONS: AssessmentQuestion[] = [
  // IA-01: Server age
  {
    code: "IA-Q2",
    flow: "IA",
    label: "What is the age profile of your server infrastructure?",
    description: "Server age directly affects support availability, vulnerability exposure, and replacement planning horizon.",
    type: "single",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["CM-Q1"] !== "cloud_first",
    options: [
      { label: "All servers less than 3 years old", value: "all_new", score: { cf_infrastructure_maturity: 4 } },
      { label: "Mostly under 5 years old", value: "mostly_under5", score: { cf_infrastructure_maturity: 2 } },
      { label: "Mixed (some new, some older)", value: "mixed", score: { cf_infrastructure_maturity: 0, risk: 5 } },
      { label: "Mostly over 5 years old", value: "mostly_over5", score: { cf_infrastructure_maturity: -2, risk: 5, complexity: 3 } },
      { label: "Most servers more than 7 years old", value: "over7", score: { cf_infrastructure_maturity: -3, risk: 10, complexity: 5 } },
    ],
  },
  // IA-01: Server OS versions
  {
    code: "IA-Q3",
    flow: "IA",
    label: "Which Windows Server versions are present in your environment?",
    description: "End-of-life server OS receive no security patches and are the most common ransomware entry point.",
    type: "multi",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["CM-Q1"] !== "cloud_first",
    options: [
      { label: "Windows Server 2022", value: "server_2022", score: { cf_infrastructure_maturity: 2 } },
      { label: "Windows Server 2019", value: "server_2019", score: { cf_infrastructure_maturity: 1 } },
      { label: "Windows Server 2016", value: "server_2016", score: { cf_infrastructure_maturity: 0 } },
      { label: "Windows Server 2012 R2 (End of Life)", value: "server_2012r2", score: { risk: 20 }, flags: { unsupported_os: true } },
      { label: "Windows Server 2012 or older (End of Life)", value: "server_2012", score: { risk: 20 }, flags: { unsupported_os: true } },
      { label: "No Windows Servers", value: "not_windows", score: { cf_infrastructure_maturity: 2 } },
    ],
  },
  // IA-01: Server warranty
  {
    code: "IA-Q4",
    flow: "IA",
    label: "What is the warranty / support status of your server hardware?",
    type: "single",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["CM-Q1"] !== "cloud_first",
    options: [
      { label: "All under active warranty / support contract", value: "all_warranty", score: { cf_infrastructure_maturity: 3 } },
      { label: "Mostly under warranty", value: "mostly_warranty", score: { cf_infrastructure_maturity: 2 } },
      { label: "Mixed — some under warranty, some not", value: "mixed_warranty", score: { cf_infrastructure_maturity: 0, risk: 5 } },
      { label: "Most warranty has expired", value: "mostly_expired", score: { cf_infrastructure_maturity: -1, risk: 10 } },
      { label: "No active hardware warranty", value: "none_warranty", score: { cf_infrastructure_maturity: -2, risk: 10 } },
    ],
  },
  // IA-02: Capacity monitoring
  {
    code: "IA-Q7",
    flow: "IA",
    label: "How is server and infrastructure capacity monitored?",
    type: "single",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["CM-Q1"] !== "cloud_first",
    options: [
      { label: "Automated monitoring with alerting and capacity forecasting", value: "automated_alerting", score: { cf_infrastructure_maturity: 3 } },
      { label: "Automated monitoring, no forecasting", value: "automated_basic", score: { cf_infrastructure_maturity: 2 } },
      { label: "Regular manual checks (weekly or more)", value: "manual_regular", score: { cf_infrastructure_maturity: 1 } },
      { label: "Occasional checks", value: "occasional", score: { cf_infrastructure_maturity: 0 } },
      { label: "No monitoring", value: "none", score: { risk: 5 } },
    ],
  },
  // IA-02: Virtualisation ratio
  {
    code: "IA-Q8",
    flow: "IA",
    label: "What is your server virtualisation ratio?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "More than 80% virtualised", value: "over_80", score: { cf_infrastructure_maturity: 3 } },
      { label: "51–80% virtualised", value: "51_80", score: { cf_infrastructure_maturity: 2 } },
      { label: "21–50% virtualised", value: "21_50", score: { cf_infrastructure_maturity: 1 } },
      { label: "Less than 20% virtualised", value: "under_20", score: { cf_infrastructure_maturity: 0 } },
      { label: "All physical, no virtualisation", value: "none", score: { cf_infrastructure_maturity: -1 } },
    ],
  },
  // IA-02 conditional: VMware version
  {
    code: "IA-Q9A",
    flow: "IA",
    label: "Which VMware version are you running?",
    type: "single",
    showIf: (answers) => {
      const virt = answers["IA-Q8"];
      return virt === "over_80" || virt === "51_80" || virt === "21_50";
    },
    options: [
      { label: "vSphere 8.x", value: "vsphere_8", score: { cf_infrastructure_maturity: 2 } },
      { label: "vSphere 7.x", value: "vsphere_7", score: { cf_infrastructure_maturity: 2 } },
      { label: "vSphere 6.7", value: "vsphere_6_7", score: { cf_infrastructure_maturity: -1 } },
      { label: "vSphere 6.5 or older (End of Support)", value: "vsphere_6_5", score: { cf_infrastructure_maturity: -2, risk: 10 } },
      { label: "Not VMware / Not sure", value: "not_vmware" },
    ],
  },
  // IA-02 conditional: Hyper-V version
  {
    code: "IA-Q9B",
    flow: "IA",
    label: "Which Hyper-V version are you running?",
    type: "single",
    showIf: (answers) => {
      const virt = answers["IA-Q8"];
      return virt === "over_80" || virt === "51_80" || virt === "21_50";
    },
    options: [
      { label: "Hyper-V 2022", value: "hyperv_2022", score: { cf_infrastructure_maturity: 2 } },
      { label: "Hyper-V 2019", value: "hyperv_2019", score: { cf_infrastructure_maturity: 1 } },
      { label: "Hyper-V 2016", value: "hyperv_2016", score: { cf_infrastructure_maturity: 0 } },
      { label: "Hyper-V 2012 R2 or older (End of Life)", value: "hyperv_2012", score: { risk: 10 }, flags: { unsupported_os: true } },
      { label: "Not Hyper-V / Not sure", value: "not_hyperv" },
    ],
  },
  // IA-03: Network architecture
  {
    code: "IA-Q14",
    flow: "IA",
    label: "Describe your network architecture: firewall and segmentation.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Next-gen firewall with micro-segmentation", value: "ngfw_segmented", score: { cf_infrastructure_maturity: 3 } },
      { label: "Firewall deployed, basic segmentation", value: "fw_basic", score: { cf_infrastructure_maturity: 1 } },
      { label: "Firewall only, flat network", value: "fw_flat", score: { risk: 10 }, flags: { flat_network: true } },
      { label: "No dedicated firewall", value: "none", score: { risk: 20 }, flags: { flat_network: true } },
    ],
  },
  // IA-04: IAM setup
  {
    code: "IA-Q16",
    flow: "IA",
    label: "What is your identity and access management (IAM) setup?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "SSO + MFA enforced + privileged access management", value: "full", score: { cf_iam_maturity: 4 } },
      { label: "Active Directory + MFA for admins", value: "ad_mfa", score: { cf_iam_maturity: 2 } },
      { label: "Active Directory only, no MFA", value: "ad_only", score: { cf_iam_maturity: 1, risk: 15 }, flags: { no_mfa: true } },
      { label: "Local accounts / no centralised directory", value: "local", score: { risk: 25 }, flags: { no_mfa: true } },
    ],
  },
  // IA-05: Backup verification
  {
    code: "IA-Q18",
    flow: "IA",
    label: "How often are backups verified / recovery tested?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Monthly verified recovery tests", value: "monthly", score: { cf_data_protection_maturity: 4 } },
      { label: "Quarterly tests", value: "quarterly", score: { cf_data_protection_maturity: 2 } },
      { label: "Annual tests", value: "annual", score: { cf_data_protection_maturity: 1 } },
      { label: "Never tested", value: "never", score: { risk: 25 }, flags: { no_backup: true } },
    ],
  },
  // IA-06: DR plan
  {
    code: "IA-Q19",
    flow: "IA",
    label: "Do you have a documented disaster recovery (DR) plan?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Yes — documented, tested annually, and updated", value: "full", score: { cf_dr_bc_maturity: 4 } },
      { label: "Yes — documented but not recently tested", value: "untested", score: { cf_dr_bc_maturity: 2 } },
      { label: "Informal / undocumented", value: "informal", score: { cf_dr_bc_maturity: 1 } },
      { label: "No DR plan", value: "none", score: { risk: 15 }, flags: { no_dr_plan: true } },
    ],
  },
  // IA-07: Cloud workload distribution
  {
    code: "IA-Q22",
    flow: "IA",
    label: "What is your cloud workload distribution?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "100% on-premises", value: "onprem", score: { cf_cloud_maturity: 0 } },
      { label: "Mostly on-premises, some cloud", value: "mostly_onprem", score: { cf_cloud_maturity: 1 } },
      { label: "Hybrid (50/50)", value: "hybrid", score: { cf_cloud_maturity: 2 } },
      { label: "Mostly cloud", value: "mostly_cloud", score: { cf_cloud_maturity: 3 } },
      { label: "100% cloud", value: "all_cloud", score: { cf_cloud_maturity: 4 } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// CM — CLOUD MIGRATION (flag_cloud_strategy = true)
// ═══════════════════════════════════════════════════════════

export const CM_QUESTIONS: AssessmentQuestion[] = [
  {
    code: "CM-Q1",
    flow: "CM",
    label: "How would you describe your current cloud usage level?",
    type: "single",
    hubspotProperty: "mk_cloud_usage_level",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Cloud-first / cloud-native", value: "cloud_first", score: { cf_cloud_maturity: 4 } },
      { label: "Significant cloud adoption (hybrid)", value: "hybrid", score: { cf_cloud_maturity: 2 } },
      { label: "Early cloud (some SaaS/IaaS)", value: "early", score: { cf_cloud_maturity: 1 } },
      { label: "No cloud — fully on-premises", value: "no_cloud", score: { cf_cloud_maturity: 0, complexity: 3 } },
    ],
  },
  {
    code: "CM-Q1A",
    flow: "CM",
    label: "What is driving your cloud strategy?",
    type: "multi",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Cost reduction", value: "cost", score: { complexity: 1 } },
      { label: "Scalability / performance", value: "scalability", score: { complexity: 1 } },
      { label: "Disaster recovery / resilience", value: "dr", score: { complexity: 1 } },
      { label: "Compliance requirements", value: "compliance", score: { complexity: 1 } },
      { label: "Remote workforce enablement", value: "remote", score: { complexity: 1 } },
      { label: "End of life / hardware refresh", value: "eol", score: { complexity: 1 } },
    ],
  },
  {
    code: "CM-Q3",
    flow: "CM",
    label: "How many applications / workloads need to migrate?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "1–5 applications", value: "1-5", score: { complexity: 1 } },
      { label: "6–20 applications", value: "6-20", score: { complexity: 3 } },
      { label: "20–50 applications", value: "20-50", score: { complexity: 5 } },
      { label: "50+ applications", value: "50+", score: { complexity: 7 } },
    ],
  },
  {
    code: "CM-Q7",
    flow: "CM",
    label: "What cloud security controls do you have in place?",
    type: "multi",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "CASB (Cloud Access Security Broker)", value: "casb", score: { cf_cloud_maturity: 2 } },
      { label: "CSPM (Cloud Security Posture Management)", value: "cspm", score: { cf_cloud_maturity: 2 } },
      { label: "Cloud WAF", value: "waf", score: { cf_cloud_maturity: 1 } },
      { label: "Cloud-native IAM + MFA", value: "iam", score: { cf_cloud_maturity: 1 } },
      { label: "None of the above", value: "none", score: { risk: 10 }, flags: { no_cloud_security: true } },
    ],
  },
  {
    code: "CM-Q9",
    flow: "CM",
    label: "What is your data classification maturity?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Fully classified with automated enforcement", value: "full", score: { cf_cloud_maturity: 3, cf_data_protection_maturity: 3 } },
      { label: "Classification policy exists, partially enforced", value: "partial", score: { cf_cloud_maturity: 2, cf_data_protection_maturity: 2 } },
      { label: "Ad hoc classification", value: "adhoc", score: { cf_cloud_maturity: 1, cf_data_protection_maturity: 1 } },
      { label: "No data classification", value: "none", score: { risk: 10 } },
    ],
  },
  {
    code: "CM-Q12",
    flow: "CM",
    label: "What is your cloud disaster recovery strategy?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Multi-region active-active with automated failover", value: "multi_region", score: { cf_dr_bc_maturity: 4 } },
      { label: "Cross-region backup with tested recovery", value: "cross_region", score: { cf_dr_bc_maturity: 3 } },
      { label: "Single-region backups only", value: "single_region", score: { cf_dr_bc_maturity: 1, risk: 5 } },
      { label: "No cloud DR strategy", value: "none", score: { risk: 15 }, flags: { no_cloud_dr: true } },
    ],
  },
  {
    code: "CM-Q13",
    flow: "CM",
    label: "What are your RTO/RPO requirements?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "RTO < 1 hour, RPO < 15 minutes", value: "aggressive", score: { complexity: 4 } },
      { label: "RTO < 4 hours, RPO < 1 hour", value: "standard", score: { complexity: 2 } },
      { label: "RTO < 24 hours, RPO < 4 hours", value: "relaxed", score: { complexity: 1 } },
      { label: "Not defined", value: "undefined", score: { risk: 5 } },
    ],
  },
  {
    code: "CM-Q15",
    flow: "CM",
    label: "What is your team's cloud skills level?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Certified cloud architects on staff", value: "expert", score: { cf_cloud_maturity: 3 } },
      { label: "Intermediate — some cloud experience", value: "intermediate", score: { cf_cloud_maturity: 1 } },
      { label: "Basic — learning", value: "basic", score: { cf_cloud_maturity: 0 }, flags: { training_recommendation: true } },
      { label: "No cloud skills in-house", value: "none", score: { complexity: 2 }, flags: { training_recommendation: true } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// GE — GROWTH ENABLEMENT (flag_growth_enablement = true)
// ═══════════════════════════════════════════════════════════

export const GE_QUESTIONS: AssessmentQuestion[] = [
  {
    code: "GE-Q1",
    flow: "GE",
    label: "What is your revenue growth target for the next 12 months?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "0–10% (steady state)", value: "steady", score: { growth_modifier: 0 } },
      { label: "10–25% growth", value: "moderate", score: { growth_modifier: 2 } },
      { label: "25–50% growth", value: "rapid", score: { growth_modifier: 4 } },
      { label: "50%+ / hyper-growth", value: "hyper", score: { growth_modifier: 6 } },
    ],
  },
  {
    code: "GE-Q3",
    flow: "GE",
    label: "What is the primary growth bottleneck?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "IT infrastructure can't scale", value: "infra", score: { complexity: 3 }, flags: { flag_infra_assessment: true } },
      { label: "Manual processes slowing us down", value: "automation", score: { complexity: 2 }, flags: { automation_recommendation: true } },
      { label: "Security concerns limiting expansion", value: "security", score: { risk: 5 } },
      { label: "Talent / staffing gaps in IT", value: "talent", flags: { understaffed_it: true } },
    ],
  },
  {
    code: "GE-Q4",
    flow: "GE",
    label: "What is your current level of IT automation?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Extensive — IaC, CI/CD, auto-scaling, auto-remediation", value: "extensive", score: { cf_automation_maturity: 4 } },
      { label: "Moderate — some scripting and scheduled tasks", value: "moderate", score: { cf_automation_maturity: 2 } },
      { label: "Minimal — mostly manual processes", value: "minimal", score: { cf_automation_maturity: 1 } },
      { label: "None", value: "none", score: { cf_automation_maturity: 0, complexity: 2 } },
    ],
  },
  {
    code: "GE-Q12",
    flow: "GE",
    label: "Do you have multi-site expansion or M&A plans?",
    type: "single",
    showIf: (answers) => answers["P0-Q8_LOCATIONS"] !== "single",
    options: [
      { label: "Yes — active M&A in progress", value: "active_ma", score: { complexity: 5 }, flags: { sd_wan_recommendation: true } },
      { label: "Yes — expanding to new locations", value: "expanding", score: { complexity: 3 }, flags: { sd_wan_recommendation: true } },
      { label: "Considering it", value: "considering", score: { complexity: 1 } },
      { label: "No", value: "no" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// CO — COST OPTIMISATION (flag_cost_optimization = true)
// ═══════════════════════════════════════════════════════════

export const CO_QUESTIONS: AssessmentQuestion[] = [
  {
    code: "CO-Q1",
    flow: "CO",
    label: "What is your total annual IT budget?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Under $100K", value: "lt100k", score: { cf_cost_maturity: 1 } },
      { label: "$100K – $500K", value: "100-500k", score: { cf_cost_maturity: 2 } },
      { label: "$500K – $2M", value: "500k-2m", score: { cf_cost_maturity: 3 } },
      { label: "$2M – $10M", value: "2-10m", score: { cf_cost_maturity: 4 } },
      { label: "$10M+", value: "10m+", score: { cf_cost_maturity: 4 } },
    ],
  },
  {
    code: "CO-Q3",
    flow: "CO",
    label: "How many IT vendors do you currently manage?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "1–5 vendors", value: "1-5", score: { cf_business_gov_maturity: 3 } },
      { label: "6–10 vendors", value: "6-10", score: { cf_business_gov_maturity: 2 } },
      { label: "11–15 vendors", value: "11-15", score: { cf_business_gov_maturity: 1 } },
      { label: "15+ vendors", value: "15+", score: { cf_business_gov_maturity: 0, complexity: 3 }, flags: { vendor_consolidation: true } },
    ],
  },
  {
    code: "CO-Q5",
    flow: "CO",
    label: "Do you have visibility into your cloud spending?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Yes — real-time dashboards with budget alerts", value: "full", score: { cf_cost_maturity: 4 } },
      { label: "Basic — monthly reports from provider", value: "basic", score: { cf_cost_maturity: 2 } },
      { label: "Limited — invoices only", value: "limited", score: { cf_cost_maturity: 1 } },
      { label: "No cloud cost visibility", value: "none", score: { cf_cost_maturity: 0 }, flags: { no_cost_visibility: true } },
    ],
  },
  {
    code: "CO-Q7",
    flow: "CO",
    label: "Do you track software licence utilisation?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Yes — automated tracking with optimisation", value: "automated", score: { cf_cost_maturity: 3 } },
      { label: "Yes — manual tracking", value: "manual", score: { cf_cost_maturity: 2 } },
      { label: "Partially — some licences tracked", value: "partial", score: { cf_cost_maturity: 1 } },
      { label: "No licence tracking", value: "none", score: { cf_cost_maturity: 0 }, flags: { license_waste: true } },
    ],
  },
  {
    code: "CO-Q9",
    flow: "CO",
    label: "Do you have overlapping tools performing the same function?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Yes — significant overlap across tools", value: "significant", score: { complexity: 3 }, flags: { consolidation_target: true } },
      { label: "Some overlap", value: "some", score: { complexity: 1 } },
      { label: "No — each tool has a unique purpose", value: "no", score: { cf_cost_maturity: 2 } },
      { label: "Not sure", value: "unsure", score: { complexity: 1 } },
    ],
  },
  {
    code: "CO-Q_INSURANCE",
    flow: "CO",
    label: "What is your cyber insurance coverage level?",
    description: "Business governance maturity driver. If none: flag for risk assessment.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Enterprise ($10M+ coverage)", value: "enterprise", score: { cf_business_gov_maturity: 4 } },
      { label: "High ($5–10M)", value: "high", score: { cf_business_gov_maturity: 3 } },
      { label: "Standard ($1–5M)", value: "standard", score: { cf_business_gov_maturity: 2 } },
      { label: "Basic (< $1M)", value: "basic", score: { cf_business_gov_maturity: 1 } },
      { label: "No cyber insurance", value: "none", score: { risk: 5 }, flags: { no_insurance: true } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// CONTACT CAPTURE (always at start)
// Per spec Section 4.1: includes Job Title and Website (optional)
// ═══════════════════════════════════════════════════════════

export const CAPTURE_FIELDS = [
  { key: "first_name", label: "First Name", type: "text", required: true },
  { key: "last_name", label: "Last Name", type: "text", required: true },
  { key: "email", label: "Work Email", type: "email", required: true },
  { key: "company", label: "Company Name", type: "text", required: true },
  { key: "phone", label: "Phone (optional)", type: "tel", required: false },
  { key: "job_title", label: "Job Title (optional)", type: "text", required: false },
  { key: "website", label: "Website (optional)", type: "url", required: false },
];

// ═══════════════════════════════════════════════════════════
// FLOW ROUTING MAP
// ═══════════════════════════════════════════════════════════

export const FLOW_MAP: Record<string, AssessmentQuestion[]> = {
  P0: P0_QUESTIONS,
  SR: SR_QUESTIONS,
  IA: IA_QUESTIONS,
  CM: CM_QUESTIONS,
  GE: GE_QUESTIONS,
  CO: CO_QUESTIONS,
};

export const FLOW_LABELS: Record<string, string> = {
  P0: "Universal Assessment",
  SR: "Security Remediation",
  IA: "Infrastructure Assessment",
  CM: "Cloud Migration",
  GE: "Growth Enablement",
  CO: "Cost Optimisation",
};

// Maps P0-Q4 primary_priority to deep-dive flow
export const PRIORITY_TO_FLOW: Record<string, string> = {
  security_incident: "SR",
  compliance_deadline: "SR", // compliance uses SR flow for security gaps + compliance questions
  modernize_infra: "IA",
  cloud_strategy: "CM",
  cost_optimization: "CO",
  growth_enablement: "GE",
  service_spec: "IA",
};

export const ALL_QUESTIONS = [
  ...P0_QUESTIONS,
  ...SR_QUESTIONS,
  ...IA_QUESTIONS,
  ...CM_QUESTIONS,
  ...GE_QUESTIONS,
  ...CO_QUESTIONS,
];
