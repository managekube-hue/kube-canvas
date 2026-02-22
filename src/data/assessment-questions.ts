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
    hubspotProperty: "mk_industry_vertical",
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
  // SR-02: Business impact (MULTI-SELECT per spec)
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
  // SR-03: Notifications made (MULTI-SELECT per spec)
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
    hubspotProperty: "mk_sr_network_posture",
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
// Composite questions (IA-Q14, IA-Q16) split into sub-fields
// ═══════════════════════════════════════════════════════════

export const IA_QUESTIONS: AssessmentQuestion[] = [
  // IA-01: Server age
  {
    code: "IA-Q2",
    flow: "IA",
    label: "What is the age profile of your server infrastructure?",
    description: "Server age directly affects support availability, vulnerability exposure, and replacement planning horizon.",
    type: "single",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["IA-Q22"] !== "all_cloud",
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
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["IA-Q22"] !== "all_cloud",
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
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["IA-Q22"] !== "all_cloud",
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
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["IA-Q22"] !== "all_cloud",
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
    hubspotProperty: "mk_vmware_version",
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
  // IA-02 conditional: Hyper-V version (per spec IA-Q9B)
  {
    code: "IA-Q9B",
    flow: "IA",
    label: "Which Hyper-V version are you running?",
    type: "single",
    hubspotProperty: "mk_hyperv_version",
    showIf: (answers) => {
      const virt = answers["IA-Q8"];
      return virt === "over_80" || virt === "51_80" || virt === "21_50";
    },
    options: [
      { label: "Hyper-V 2022", value: "hyperv_2022", score: { cf_infrastructure_maturity: 2 } },
      { label: "Hyper-V 2019", value: "hyperv_2019", score: { cf_infrastructure_maturity: 1 } },
      { label: "Hyper-V 2016", value: "hyperv_2016", score: { cf_infrastructure_maturity: 0 } },
      { label: "Hyper-V 2012 R2 or older (End of Life)", value: "hyperv_2012", score: { risk: 10 }, flags: { unsupported_os: true, infra_refresh: true } },
      { label: "Not Hyper-V / Not sure", value: "not_hyperv" },
    ],
  },
  // IA-03: Network architecture — Firewall type (composite field 1 of 3)
  {
    code: "IA-Q14_FIREWALL",
    flow: "IA",
    label: "What type of firewall do you use?",
    description: "Network segmentation limits blast radius — a flat network allows a single compromised device to reach all systems.",
    type: "single",
    hubspotProperty: "mk_cf_infrastructure_maturity",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Enterprise next-gen firewall (NGFW)", value: "enterprise_ngfw", score: { cf_infrastructure_maturity: 3 } },
      { label: "SMB firewall", value: "smb_firewall", score: { cf_infrastructure_maturity: 1 } },
      { label: "Basic router / ISP-provided", value: "basic_router", score: { risk: 10 } },
      { label: "No firewall", value: "none", score: { risk: 20 } },
    ],
  },
  // IA-03: Network segmentation (composite field 2 of 3)
  {
    code: "IA-Q14_SEGMENTATION",
    flow: "IA",
    label: "What is your network segmentation approach?",
    description: "Segmentation is the most critical control for limiting lateral movement after a breach.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Zero trust / micro-segmentation", value: "zero_trust_microseg", score: { cf_infrastructure_maturity: 3 } },
      { label: "VLAN-segmented network", value: "vlans_segmented", score: { cf_infrastructure_maturity: 1 } },
      { label: "Flat network (no segmentation)", value: "flat_no_segmentation", score: { risk: 10 }, flags: { flat_network: true } },
    ],
  },
  // IA-03: Wide area network (composite field 3 of 3)
  {
    code: "IA-Q14_WAN",
    flow: "IA",
    label: "What is your wide area network connectivity?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "SD-WAN", value: "sd_wan", score: { cf_infrastructure_maturity: 2 } },
      { label: "MPLS", value: "mpls", score: { cf_infrastructure_maturity: 1 } },
      { label: "VPN only", value: "vpn_only", score: { cf_infrastructure_maturity: 0 } },
      { label: "Internet only", value: "internet_only", score: { risk: 5 } },
    ],
  },
  // IA-03: MFA coverage (composite field 1 of 3 for IAM)
  {
    code: "IA-Q16_MFA",
    flow: "IA",
    label: "What is your MFA coverage?",
    description: "Identity and access management posture assessment.",
    type: "single",
    hubspotProperty: "mk_cf_iam_maturity",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Enforced for all users", value: "enforced_all", score: { cf_iam_maturity: 2 } },
      { label: "Enforced for remote users", value: "enforced_remote", score: { cf_iam_maturity: 1 } },
      { label: "Enforced for admins only", value: "enforced_admin", score: { cf_iam_maturity: 0, risk: 5 } },
      { label: "Partial rollout", value: "partial", score: { risk: 15 }, flags: { no_mfa: true } },
      { label: "No MFA deployed", value: "none", score: { risk: 30 }, flags: { no_mfa: true } },
    ],
  },
  // IA-03: Directory service (composite field 2 of 3 for IAM)
  {
    code: "IA-Q16_DIRECTORY",
    flow: "IA",
    label: "What is your directory service?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Azure AD (Entra ID) — fully cloud", value: "azure_ad_full", score: { cf_iam_maturity: 2 } },
      { label: "On-premises Active Directory", value: "active_directory", score: { cf_iam_maturity: 1 } },
      { label: "Hybrid AD (on-prem + Azure AD sync)", value: "hybrid_ad", score: { cf_iam_maturity: 1 } },
      { label: "Local accounts only", value: "local_only", score: { cf_security_ps_maturity: -2 } },
      { label: "No directory service", value: "none", score: { risk: 10 } },
    ],
  },
  // IA-03: Privileged access management (composite field 3 of 3 for IAM)
  {
    code: "IA-Q16_PAM",
    flow: "IA",
    label: "What is your privileged access management approach?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "PAM solution deployed (CyberArk, BeyondTrust, etc.)", value: "pam_solution", score: { cf_iam_maturity: 2 } },
      { label: "Dedicated admin accounts (no PAM tool)", value: "admin_accounts_only", score: { cf_iam_maturity: 0 } },
      { label: "No privileged access controls", value: "no_controls", score: { risk: 10 } },
    ],
  },
  // IA-04: Backup recovery verification (per spec IA-Q18)
  {
    code: "IA-Q18",
    flow: "IA",
    label: "How are backup recovery points verified?",
    description: "Untested backups fail in 40% of real recovery scenarios. Monthly testing is the standard for environments handling sensitive data.",
    type: "single",
    hubspotProperty: "mk_cf_dataprotection_maturity",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Monthly automated recovery test with reporting", value: "monthly_tested", score: { cf_dr_bc_maturity: 4 } },
      { label: "Quarterly recovery test", value: "quarterly_tested", score: { cf_dr_bc_maturity: 3 } },
      { label: "Annual recovery test", value: "annual_tested", score: { cf_dr_bc_maturity: 2 } },
      { label: "Backups exist but recovery never tested", value: "never_tested", score: { risk: 25 }, flags: { no_backup: true } },
      { label: "No backup solution in place", value: "no_backups", score: { risk: 25 }, flags: { no_backup: true } },
    ],
  },
  // IA-04: Disaster recovery plan (per spec IA-Q19)
  {
    code: "IA-Q19",
    flow: "IA",
    label: "Do you have a documented and tested disaster recovery plan?",
    type: "single",
    hubspotProperty: "mk_dr_plan_status",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Yes, documented and tested in the last 12 months", value: "yes_tested", score: { cf_dr_bc_maturity: 3 } },
      { label: "Yes, documented but not recently tested", value: "yes_documented", score: { cf_dr_bc_maturity: 1 } },
      { label: "Informal plan (undocumented)", value: "informal", score: { cf_dr_bc_maturity: -2 } },
      { label: "No DR plan", value: "no", score: { cf_dr_bc_maturity: -2 }, flags: { no_dr_plan: true } },
    ],
  },
  // IA-05: Cloud workload distribution (per spec IA-Q22)
  {
    code: "IA-Q22",
    flow: "IA",
    label: "What is your current cloud workload distribution?",
    type: "single",
    hubspotProperty: "mk_cloud_usage_level",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Cloud-first / cloud-native (no significant on-premises)", value: "cloud_first", score: { cf_cloud_maturity: 4 }, flags: { has_cloud: true } },
      { label: "Mostly cloud (some on-premises)", value: "mostly_cloud", score: { cf_cloud_maturity: 3 }, flags: { has_cloud: true } },
      { label: "True hybrid (roughly equal cloud and on-premises)", value: "hybrid_equal", score: { cf_cloud_maturity: 2 }, flags: { has_cloud: true } },
      { label: "Mostly on-premises (some cloud services)", value: "mostly_onprem", score: { cf_cloud_maturity: 1 }, flags: { has_cloud: true } },
      { label: "All on-premises", value: "all_onprem", score: { cf_cloud_maturity: 0 } },
    ],
  },
  // IA-05: Cloud security controls (per spec IA-Q22A)
  {
    code: "IA-Q22A",
    flow: "IA",
    label: "What cloud security controls are in place?",
    type: "multi",
    hubspotProperty: "mk_cf_cloud_maturity",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true && flags.has_cloud === true,
    options: [
      { label: "Cloud Access Security Broker (CASB)", value: "casb", score: { cf_cloud_maturity: 2 } },
      { label: "Cloud Security Posture Management (CSPM)", value: "cspm", score: { cf_cloud_maturity: 2 } },
      { label: "Cloud provider IAM policies configured", value: "iam_policies", score: { cf_cloud_maturity: 2 } },
      { label: "Native provider security tools only", value: "native_security", score: { cf_cloud_maturity: 1 } },
      { label: "No cloud-specific security controls", value: "none", score: { cf_cloud_maturity: -2 } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// CM — CLOUD MIGRATION (flag_cloud_strategy = true)
// Full spec: CM-Q1 through CM-Q17
// ═══════════════════════════════════════════════════════════

export const CM_QUESTIONS: AssessmentQuestion[] = [
  // CM-01: Current cloud usage level
  {
    code: "CM-Q1",
    flow: "CM",
    label: "What is your current cloud usage level?",
    type: "single",
    hubspotProperty: "mk_cloud_usage_level",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Cloud-first (100% cloud, no on-premises)", value: "cloud_first", score: { cf_cloud_maturity: 4 } },
      { label: "Significant cloud usage (60%+ workloads)", value: "significant", score: { cf_cloud_maturity: 3 } },
      { label: "Moderate (30-60% cloud workloads)", value: "moderate", score: { cf_cloud_maturity: 2 } },
      { label: "Minimal (less than 30% cloud)", value: "minimal", score: { cf_cloud_maturity: 1 } },
      { label: "No cloud usage currently", value: "none", score: { cf_cloud_maturity: 0 } },
    ],
  },
  // CM-01: Cloud strategy drivers
  {
    code: "CM-Q1A",
    flow: "CM",
    label: "What is driving your cloud strategy?",
    type: "multi",
    hubspotProperty: "mk_cloud_drivers",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Cost reduction / infrastructure savings", value: "cost", score: { complexity: 1 } },
      { label: "Scalability / elasticity", value: "scalability", score: { complexity: 1 } },
      { label: "Disaster recovery / business continuity", value: "dr", score: { complexity: 1 } },
      { label: "Compliance requirements", value: "compliance", score: { complexity: 1 } },
      { label: "Development agility / speed to market", value: "agility", score: { complexity: 1 } },
      { label: "Talent attraction (cloud-skilled workforce)", value: "talent", score: { complexity: 1 } },
      { label: "M&A integration or consolidation", value: "m_a", score: { complexity: 1 } },
    ],
  },
  // CM-01: Current hosting state
  {
    code: "CM-Q2",
    flow: "CM",
    label: "What is your current hosting state?",
    type: "single",
    hubspotProperty: "mk_hosting_state",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "All on-premises (no current cloud)", value: "all_onprem", score: { complexity: 3 } },
      { label: "Hybrid (mix of cloud and on-premises)", value: "hybrid", score: { complexity: 2 } },
      { label: "Mostly cloud with some legacy on-premises", value: "mostly_cloud", score: { complexity: 1 } },
      { label: "Entirely cloud", value: "all_cloud", score: { complexity: 0 } },
    ],
  },
  // CM-02: Workloads to migrate
  {
    code: "CM-Q3",
    flow: "CM",
    label: "Which workloads or applications need to migrate?",
    type: "multi",
    hubspotProperty: "mk_migration_scope",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Email and collaboration (M365 / Google)", value: "email", score: { complexity: 1 } },
      { label: "File storage and document management", value: "file_storage", score: { complexity: 1 } },
      { label: "ERP / financial systems", value: "erp", score: { complexity: 2 } },
      { label: "CRM", value: "crm", score: { complexity: 1 } },
      { label: "Custom-developed applications", value: "custom_apps", score: { complexity: 2 } },
      { label: "Databases", value: "databases", score: { complexity: 1 } },
      { label: "Dev / test environments", value: "dev_test", score: { complexity: 1 } },
      { label: "Backup and archive", value: "backup", score: { complexity: 1 } },
    ],
  },
  // CM-02: Integration dependencies
  {
    code: "CM-Q4",
    flow: "CM",
    label: "What integration dependencies exist?",
    type: "multi",
    hubspotProperty: "mk_integration_dependencies",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Modern APIs (REST / GraphQL)", value: "api_modern", score: { complexity: 0 } },
      { label: "EDI / B2B integrations", value: "edi", score: { complexity: 2 } },
      { label: "Legacy / mainframe integrations", value: "legacy_mainframe", score: { complexity: 3 }, flags: { legacy_constraints: true } },
      { label: "Point-to-point integrations", value: "point_to_point", score: { complexity: 1 } },
      { label: "No significant integrations", value: "none", score: { complexity: 0 } },
    ],
  },
  // CM-03: Cloud security controls
  {
    code: "CM-Q7",
    flow: "CM",
    label: "What cloud security controls are currently in place or planned?",
    type: "multi",
    hubspotProperty: "mk_cf_cloud_maturity",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "CASB (Cloud Access Security Broker)", value: "casb", score: { cf_cloud_maturity: 2 } },
      { label: "CSPM (Cloud Security Posture Management)", value: "cspm", score: { cf_cloud_maturity: 2 } },
      { label: "Cloud IAM policies and least-privilege", value: "iam_policies", score: { cf_cloud_maturity: 2 } },
      { label: "Native cloud security tools (AWS Security Hub, Microsoft Defender for Cloud etc.)", value: "native_security", score: { cf_cloud_maturity: 1 } },
      { label: "Zero trust network access (ZTNA)", value: "zero_trust", score: { cf_cloud_maturity: 2 } },
      { label: "None planned yet", value: "none", score: { cf_cloud_maturity: -2 } },
    ],
  },
  // CM-03: Data classification maturity
  {
    code: "CM-Q9",
    flow: "CM",
    label: "What is your data classification maturity?",
    type: "single",
    hubspotProperty: "mk_cf_dataprotection_maturity",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Formal classification with automated data discovery", value: "formal_automated", score: { cf_cloud_maturity: 3, cf_data_protection_maturity: 2 } },
      { label: "Formal classification (manual process)", value: "formal_manual", score: { cf_cloud_maturity: 2, cf_data_protection_maturity: 1 } },
      { label: "Partial classification (some data types only)", value: "partial", score: { cf_cloud_maturity: 1 } },
      { label: "Informal / undocumented classification", value: "informal", score: { cf_cloud_maturity: 0 } },
      { label: "No data classification", value: "none" },
    ],
  },
  // CM-04: Cloud DR strategy
  {
    code: "CM-Q12",
    flow: "CM",
    label: "What is your cloud DR strategy?",
    type: "single",
    hubspotProperty: "mk_cloud_dr_strategy",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Active-active multi-region", value: "active_active", score: { cf_dr_bc_maturity: 4 } },
      { label: "Active-passive (warm standby)", value: "active_passive", score: { cf_dr_bc_maturity: 3 } },
      { label: "Cloud backup only", value: "backup_only", score: { cf_dr_bc_maturity: 1 } },
      { label: "No cloud DR strategy", value: "none", score: { risk: 15 }, flags: { no_cloud_dr: true } },
    ],
  },
  // CM-04: RTO/RPO requirements
  {
    code: "CM-Q13",
    flow: "CM",
    label: "What are your RTO and RPO requirements?",
    description: "RTO = maximum acceptable downtime. RPO = maximum acceptable data loss.",
    type: "single",
    hubspotProperty: "mk_rto_requirement",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "RTO < 1 hour, RPO < 15 minutes", value: "aggressive", score: { complexity: 4 } },
      { label: "RTO < 4 hours, RPO < 1 hour (enterprise DR)", value: "standard", score: { complexity: 2 } },
      { label: "RTO < 24 hours, RPO < 4 hours", value: "relaxed", score: { complexity: 1 } },
      { label: "Not defined", value: "undefined", score: { risk: 5 } },
    ],
  },
  // CM-05: Cloud skills level
  {
    code: "CM-Q15",
    flow: "CM",
    label: "What is your team's cloud skills level?",
    type: "single",
    hubspotProperty: "mk_cloud_skills_level",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Advanced (certified cloud architects on team)", value: "advanced", score: { cf_cloud_maturity: 3 } },
      { label: "Intermediate (working knowledge, some certifications)", value: "intermediate", score: { cf_cloud_maturity: 1 } },
      { label: "Basic (minimal cloud experience)", value: "basic", score: { cf_cloud_maturity: 0 } },
      { label: "No cloud skills currently", value: "none", score: { complexity: 2 } },
    ],
  },
  // CM-05: Success metrics
  {
    code: "CM-Q16",
    flow: "CM",
    label: "What metrics define success for your cloud programme?",
    type: "multi",
    hubspotProperty: "mk_cloud_success_metrics",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Cost reduction vs. on-premises", value: "cost_reduction" },
      { label: "Application performance improvement", value: "performance" },
      { label: "Deployment speed and agility", value: "agility" },
      { label: "DR / uptime improvement", value: "dr_improvement" },
      { label: "Security posture improvement", value: "security" },
      { label: "Compliance achievement", value: "compliance" },
    ],
  },
  // CM-05: Cloud budget
  {
    code: "CM-Q17",
    flow: "CM",
    label: "What is your cloud programme budget band?",
    type: "single",
    hubspotProperty: "mk_cloud_budget",
    showIf: (_answers, flags) => flags.flag_cloud_strategy === true,
    options: [
      { label: "Under $50K", value: "under_50k" },
      { label: "$50K - $150K", value: "50k_150k" },
      { label: "$150K - $500K", value: "150k_500k" },
      { label: "$500K - $1M", value: "500k_1m" },
      { label: "Over $1M", value: "over_1m" },
      { label: "Not yet defined", value: "not_defined" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// GE — GROWTH ENABLEMENT (flag_growth_enablement = true)
// Full spec: GE-Q1 through GE-Q12
// ═══════════════════════════════════════════════════════════

export const GE_QUESTIONS: AssessmentQuestion[] = [
  // GE-01: Revenue growth target
  {
    code: "GE-Q1",
    flow: "GE",
    label: "What is your revenue growth target for the next 12 months?",
    type: "single",
    hubspotProperty: "mk_growth_trajectory",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Aggressive (50%+ growth)", value: "aggressive_50plus", score: { complexity: 3 } },
      { label: "Strong (25-50%)", value: "strong_25_50", score: { complexity: 2 } },
      { label: "Moderate (10-25%)", value: "moderate_10_25", score: { complexity: 1 } },
      { label: "Stable (under 10%)", value: "stable_under10", score: { complexity: 0 } },
      { label: "Reducing / rightsizing", value: "reducing" },
    ],
  },
  // GE-01: Headcount growth plan
  {
    code: "GE-Q2",
    flow: "GE",
    label: "What is your headcount growth plan for the next 12 months?",
    type: "single",
    hubspotProperty: "mk_headcount_growth",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Rapid growth (50%+ headcount increase)", value: "rapid_50plus", score: { complexity: 2 } },
      { label: "Significant (25-50%)", value: "significant_25_50", score: { complexity: 2 } },
      { label: "Moderate (10-25%)", value: "moderate_10_25", score: { complexity: 1 } },
      { label: "Stable (< 10%)", value: "stable" },
      { label: "Reducing", value: "reducing" },
    ],
  },
  // GE-01: Primary growth bottleneck
  {
    code: "GE-Q3",
    flow: "GE",
    label: "What is the primary bottleneck to your growth?",
    type: "single",
    hubspotProperty: "mk_growth_bottleneck",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "IT capacity and infrastructure can't keep up", value: "it_capacity", score: { complexity: 2 } },
      { label: "Manual processes slowing operations", value: "process", score: { complexity: 1 } },
      { label: "Talent and skills gaps", value: "talent", flags: { understaffed_it: true } },
      { label: "Inadequate tools / technology", value: "tools", score: { complexity: 1 } },
      { label: "Poor system integration", value: "integration", score: { complexity: 2 } },
    ],
  },
  // GE-02: Current automation level
  {
    code: "GE-Q4",
    flow: "GE",
    label: "What is your current automation level?",
    type: "single",
    hubspotProperty: "mk_cf_automation_maturity",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Full RPA / hyperautomation (most processes automated)", value: "full_rpa", score: { cf_automation_maturity: 4 } },
      { label: "Partial RPA (some processes automated)", value: "partial_rpa", score: { cf_automation_maturity: 3 } },
      { label: "Script-based automation", value: "scripts", score: { cf_automation_maturity: 2 } },
      { label: "Mostly manual with some tools", value: "manual_some_tools", score: { cf_automation_maturity: 1 } },
      { label: "Fully manual processes", value: "fully_manual", score: { cf_automation_maturity: 0 } },
    ],
  },
  // GE-02: Manual process friction points
  {
    code: "GE-Q5",
    flow: "GE",
    label: "Which manual processes cause the most friction?",
    type: "multi",
    hubspotProperty: "mk_automation_targets",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Employee onboarding / offboarding", value: "onboarding" },
      { label: "IT procurement and provisioning", value: "procurement" },
      { label: "Reporting and analytics", value: "reporting" },
      { label: "Invoicing and billing", value: "invoicing" },
      { label: "Compliance checks and audits", value: "compliance_checks" },
      { label: "Customer communications", value: "customer_comms" },
      { label: "Approval workflows", value: "approvals" },
    ],
  },
  // GE-02: Automation tools in use
  {
    code: "GE-Q6",
    flow: "GE",
    label: "What automation tools are currently in use?",
    type: "multi",
    hubspotProperty: "mk_automation_tools",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Microsoft Power Automate", value: "power_automate" },
      { label: "Zapier", value: "zapier" },
      { label: "Custom scripts / internal tools", value: "custom_scripts" },
      { label: "RPA platform (UiPath, Automation Anywhere, etc.)", value: "rpa_platform" },
      { label: "None", value: "none" },
    ],
  },
  // GE-03: Integration architecture
  {
    code: "GE-Q8",
    flow: "GE",
    label: "How would you describe your integration architecture?",
    type: "single",
    hubspotProperty: "mk_integration_architecture",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "API-first with documented integration layer", value: "api_first", score: { cf_automation_maturity: 2, cf_infrastructure_maturity: 1 } },
      { label: "Point-to-point integrations (custom per system)", value: "point_to_point", score: { cf_automation_maturity: 1 } },
      { label: "Mostly manual data transfers", value: "manual" },
      { label: "No formal integrations", value: "none" },
    ],
  },
  // GE-03: Scalability bottlenecks
  {
    code: "GE-Q9",
    flow: "GE",
    label: "Where are your primary scalability bottlenecks?",
    type: "multi",
    hubspotProperty: "mk_scalability_bottlenecks",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Network capacity and performance", value: "network" },
      { label: "Storage capacity", value: "storage" },
      { label: "Compute / server capacity", value: "compute" },
      { label: "Identity and access management at scale", value: "identity" },
      { label: "Cloud costs growing faster than business", value: "cloud_costs" },
      { label: "No significant bottlenecks", value: "none" },
    ],
  },
  // GE-03: API strategy maturity
  {
    code: "GE-Q10",
    flow: "GE",
    label: "What is your API strategy maturity?",
    type: "single",
    hubspotProperty: "mk_api_maturity",
    showIf: (_answers, flags) => flags.flag_growth_enablement === true,
    options: [
      { label: "Mature (published API catalogue, versioning, governance)", value: "mature", score: { cf_automation_maturity: 2 } },
      { label: "Basic (some APIs, no formal governance)", value: "basic", score: { cf_automation_maturity: 1 } },
      { label: "No API strategy", value: "none" },
    ],
  },
  // GE-03: Multi-site expansion / M&A
  {
    code: "GE-Q12",
    flow: "GE",
    label: "Are you planning multi-site expansion or M&A activity?",
    type: "single",
    hubspotProperty: "mk_multisite_expansion",
    showIf: (_answers, flags) => flags.mk_multisite === true || flags.flag_growth_enablement === true,
    options: [
      { label: "Yes, within 12 months", value: "yes", score: { complexity: 3 }, flags: { sd_wan_recommendation: true } },
      { label: "Planned but not confirmed", value: "planned", score: { complexity: 1 }, flags: { sd_wan_recommendation: true } },
      { label: "No", value: "no" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// CO — COST OPTIMISATION (flag_cost_optimization = true)
// Full spec: CO-Q1 through CO-Q_INS
// ═══════════════════════════════════════════════════════════

export const CO_QUESTIONS: AssessmentQuestion[] = [
  // CO-01: Annual IT budget
  {
    code: "CO-Q1",
    flow: "CO",
    label: "What is your total annual IT budget?",
    type: "single",
    hubspotProperty: "mk_annual_it_budget",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Under $100K", value: "under_100k", score: { cf_cost_maturity: 1 } },
      { label: "$100K - $500K", value: "100k_500k", score: { cf_cost_maturity: 2 } },
      { label: "$500K - $1M", value: "500k_1m", score: { cf_cost_maturity: 3 } },
      { label: "$1M - $5M", value: "1m_5m", score: { cf_cost_maturity: 4 } },
      { label: "Over $5M", value: "over_5m", score: { cf_cost_maturity: 4 } },
      { label: "Not sure", value: "not_sure" },
    ],
  },
  // CO-01: Budget distribution
  {
    code: "CO-Q2",
    flow: "CO",
    label: "How is your IT budget currently distributed?",
    type: "multi",
    hubspotProperty: "mk_budget_distribution",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Cloud services / SaaS subscriptions", value: "cloud" },
      { label: "Hardware and infrastructure", value: "hardware" },
      { label: "Software licences", value: "software_licences" },
      { label: "Internal IT staff", value: "internal_staff" },
      { label: "MSP / outsourced contracts", value: "msp_contracts" },
      { label: "Security tools and services", value: "security_tools" },
    ],
  },
  // CO-01: Vendor count
  {
    code: "CO-Q3",
    flow: "CO",
    label: "How many active IT vendors does your organisation have?",
    description: "More than 15 vendors flags vendor consolidation opportunity. More than 25 adds vendor rationalisation recommendation.",
    type: "single",
    hubspotProperty: "mk_vendor_count",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "1–5 vendors", value: "1-5", score: { cf_business_gov_maturity: 3 } },
      { label: "6–10 vendors", value: "6-10", score: { cf_business_gov_maturity: 2 } },
      { label: "11–15 vendors", value: "11-15", score: { cf_business_gov_maturity: 1 } },
      { label: "16–25 vendors", value: "16-25", score: { cf_business_gov_maturity: 0, complexity: 2 }, flags: { vendor_consolidation: true } },
      { label: "25+ vendors", value: "25+", score: { cf_business_gov_maturity: -1, complexity: 3 }, flags: { vendor_consolidation: true } },
    ],
  },
  // CO-02: Cloud cost visibility
  {
    code: "CO-Q5",
    flow: "CO",
    label: "Do you have visibility into your cloud costs?",
    type: "single",
    hubspotProperty: "mk_cloud_cost_visibility",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Yes, full FinOps tooling with tagging and chargeback", value: "finops_full", score: { cf_cost_maturity: 4 } },
      { label: "Yes, basic tagging and cost dashboards", value: "finops_basic", score: { cf_cost_maturity: 2 } },
      { label: "Manual tracking in spreadsheets", value: "spreadsheet", score: { cf_cost_maturity: 1 } },
      { label: "No visibility into cloud spend breakdown", value: "no_visibility", score: { risk: 5 }, flags: { no_cost_visibility: true } },
      { label: "We do not use cloud services", value: "no_cloud" },
    ],
  },
  // CO-02: Cloud waste
  {
    code: "CO-Q6",
    flow: "CO",
    label: "Have you identified cloud waste in your environment?",
    type: "single",
    hubspotProperty: "mk_cloud_waste_status",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Significant waste identified (idle resources, oversized instances, zombie assets)", value: "significant" },
      { label: "Some waste identified but not fully addressed", value: "some" },
      { label: "Suspected but not quantified", value: "suspected" },
      { label: "No waste identified (or no cloud)", value: "none_found" },
    ],
  },
  // CO-02: Licence tracking
  {
    code: "CO-Q7",
    flow: "CO",
    label: "How do you track software licence utilisation?",
    type: "single",
    hubspotProperty: "mk_licence_tracking",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Automated SAM (Software Asset Management) tooling", value: "automated_sam", score: { cf_cost_maturity: 2 } },
      { label: "Manual tracking, reviewed regularly", value: "manual_regular", score: { cf_cost_maturity: 1 } },
      { label: "Manual tracking, reviewed infrequently", value: "manual_ad_hoc" },
      { label: "No licence tracking", value: "no_tracking", flags: { license_waste: true } },
    ],
  },
  // CO-03: Overlapping tools
  {
    code: "CO-Q9",
    flow: "CO",
    label: "Do you have overlapping or duplicate tools?",
    type: "multi",
    hubspotProperty: "mk_tool_overlap",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Duplicate security tools (multiple AV, overlapping SIEM etc.)", value: "security_tools" },
      { label: "Multiple backup solutions", value: "backup_tools" },
      { label: "Multiple monitoring tools", value: "monitoring" },
      { label: "Overlapping productivity / collaboration tools", value: "productivity" },
      { label: "No significant overlap", value: "none" },
    ],
  },
  // CO-03: Contract renewals
  {
    code: "CO-Q10",
    flow: "CO",
    label: "When do your major IT contracts renew?",
    type: "single",
    hubspotProperty: "mk_contract_renewals",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Within 90 days", value: "within_90d", flags: { leverage_opportunity: true } },
      { label: "Within 6 months", value: "within_6m", flags: { leverage_opportunity: true } },
      { label: "Within 12 months", value: "within_12m" },
      { label: "More than 12 months", value: "over_12m" },
      { label: "Not sure", value: "not_sure" },
    ],
  },
  // CO-03: Unused contracts
  {
    code: "CO-Q11",
    flow: "CO",
    label: "Are you currently paying for vendor contracts you are not fully utilising?",
    type: "single",
    hubspotProperty: "mk_unused_contracts",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Yes", value: "yes", flags: { immediate_savings_flag: true } },
      { label: "No", value: "no" },
      { label: "Not sure", value: "not_sure" },
    ],
  },
  // CO-03: Target cost reduction
  {
    code: "CO-Q14",
    flow: "CO",
    label: "What is your target IT cost reduction?",
    type: "single",
    hubspotProperty: "mk_savings_target",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "10% reduction", value: "ten_pct" },
      { label: "20% reduction", value: "twenty_pct" },
      { label: "30% reduction", value: "thirty_pct" },
      { label: "40% reduction", value: "forty_pct" },
      { label: "50%+ reduction", value: "fifty_plus_pct" },
      { label: "Not sure yet", value: "not_sure" },
    ],
  },
  // CO-03: Cyber insurance
  {
    code: "CO-Q_INS",
    flow: "CO",
    label: "What is your current cyber insurance coverage?",
    description: "Business governance maturity driver. Many cyber insurers now require MFA, EDR, and backup as minimum conditions.",
    type: "single",
    hubspotProperty: "mk_cyber_insurance",
    showIf: (_answers, flags) => flags.flag_cost_optimization === true,
    options: [
      { label: "Enterprise: $10M+ coverage", value: "enterprise_10m_plus", score: { cf_business_gov_maturity: 2 } },
      { label: "High: $5M - $10M coverage", value: "high_5_10m", score: { cf_business_gov_maturity: 2 } },
      { label: "Standard: $1M - $5M coverage", value: "standard_1_5m", score: { cf_business_gov_maturity: 1 } },
      { label: "Basic: under $1M coverage", value: "basic_under1m", score: { cf_business_gov_maturity: 1 } },
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
