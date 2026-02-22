/**
 * ManageKube Unified Question Set v2.0
 * Canonical question definitions with scoring weights and branching logic.
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
// P0 — UNIVERSAL (all prospects)
// ═══════════════════════════════════════════════════════════

export const P0_QUESTIONS: AssessmentQuestion[] = [
  {
    code: "P0-Q0C_INDUSTRY",
    flow: "P0",
    label: "What industry is your organization in?",
    description: "This determines your industry multiplier and compliance framework recommendations.",
    type: "single",
    hubspotProperty: "industry",
    dbColumn: "industry",
    options: [
      { label: "Manufacturing", value: "manufacturing", score: { industry_multiplier: 1.1 } },
      { label: "Healthcare", value: "healthcare", score: { industry_multiplier: 1.1 } },
      { label: "Financial Services", value: "financial_services", score: { industry_multiplier: 1.1 } },
      { label: "Retail", value: "retail", score: { industry_multiplier: 1.0 } },
      { label: "Transportation", value: "transportation", score: { industry_multiplier: 1.0 } },
      { label: "Mining & Extraction", value: "mining_extraction", score: { industry_multiplier: 1.05 } },
      { label: "Energy & Utilities", value: "energy_utilities", score: { industry_multiplier: 1.1 } },
      { label: "Public Sector", value: "public_sector", score: { industry_multiplier: 1.1 } },
      { label: "Telecommunications", value: "telecommunications", score: { industry_multiplier: 1.05 } },
      { label: "Technology / MSP / MSSP", value: "technology", score: { industry_multiplier: 0.95 } },
      { label: "Other", value: "other", score: { industry_multiplier: 1.0 } },
    ],
  },
  {
    code: "P0-Q0D_LOCATIONS",
    flow: "P0",
    label: "How many locations does your organization operate?",
    description: "Multi-site environments require SD-WAN and edge gateway considerations.",
    type: "single",
    hubspotProperty: "mk_location_count",
    dbColumn: "location_count",
    options: [
      { label: "1 location", value: "1", score: { complexity: 0 } },
      { label: "2–5 locations", value: "2-5", score: { complexity: 2 }, flags: { mk_multisite: true } },
      { label: "6–20 locations", value: "6-20", score: { complexity: 4 }, flags: { mk_multisite: true } },
      { label: "20+ locations", value: "20+", score: { complexity: 6 }, flags: { mk_multisite: true } },
    ],
  },
  {
    code: "P0-Q0E_ENDPOINTS",
    flow: "P0",
    label: "How many total endpoints (desktops, laptops, servers, mobile devices) do you manage?",
    description: "This is the pricing denominator for per-endpoint calculations.",
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
  {
    code: "P0-Q0F_WORKFORCE_REMOTE",
    flow: "P0",
    label: "What percentage of your workforce is remote?",
    description: "Remote workforce drives endpoint management cost multipliers.",
    type: "single",
    hubspotProperty: "mk_remote_workforce_pct",
    dbColumn: "remote_workforce_pct",
    options: [
      { label: "0–20%", value: "0-20", score: { complexity: 0 } },
      { label: "21–50%", value: "21-50", score: { complexity: 1 } },
      { label: "51–80%", value: "51-80", score: { complexity: 2 } },
      { label: "80%+", value: "80+", score: { complexity: 3 } },
    ],
  },
  {
    code: "P0-Q0G_EMAIL_PLATFORM",
    flow: "P0",
    label: "What is your primary email / productivity platform?",
    description: "Drives licensing cost, M365 upsell path, and modernisation recommendations.",
    type: "single",
    hubspotProperty: "mk_email_platform",
    dbColumn: "email_platform",
    options: [
      { label: "Microsoft 365", value: "m365" },
      { label: "Google Workspace", value: "google" },
      { label: "On-prem Exchange", value: "onprem_exchange", flags: { modernisation_recommendation: true } },
      { label: "Mixed", value: "mixed", score: { complexity: 1 } },
      { label: "None / Other", value: "other" },
    ],
  },
  {
    code: "P0-Q1_ROLE",
    flow: "P0",
    label: "What best describes your role?",
    description: "Helps us tailor the assessment language and recommendations.",
    type: "single",
    hubspotProperty: "mk_onb_role",
    dbColumn: "role",
    options: [
      { label: "C-Suite / Owner", value: "c_suite", score: { complexity: 2 } },
      { label: "VP / Director of IT", value: "vp_it", score: { complexity: 2 } },
      { label: "IT Manager / Sysadmin", value: "it_manager", score: { complexity: 1 } },
      { label: "Security / CISO", value: "ciso", score: { complexity: 2 } },
      { label: "Finance / Operations", value: "finance_ops", score: { complexity: 1 } },
      { label: "Other", value: "other", score: { complexity: 0 } },
    ],
  },
  {
    code: "P0-Q2_ORG_STAGE",
    flow: "P0",
    label: "What stage is your organisation in?",
    description: "Growth stage affects service delivery scope and scaling requirements.",
    type: "single",
    hubspotProperty: "mk_onb_org_stage",
    dbColumn: "org_stage",
    options: [
      { label: "Startup / Early Stage", value: "startup", score: { complexity: 1, growth_modifier: 2 } },
      { label: "Growth (scaling rapidly)", value: "growth", score: { complexity: 3, growth_modifier: 4 } },
      { label: "Established / Mature", value: "established", score: { complexity: 4, growth_modifier: 0 } },
      { label: "Enterprise (1,000+ employees)", value: "enterprise", score: { complexity: 5, growth_modifier: 1 } },
    ],
  },
  {
    code: "P0-Q3_IT_SITUATION",
    flow: "P0",
    label: "How is IT managed today?",
    description: "This routes the assessment flow and shapes transition vs co-managed recommendations.",
    type: "single",
    hubspotProperty: "mk_onb_it_situation",
    dbColumn: "it_situation",
    options: [
      { label: "No dedicated IT staff", value: "no_it", score: { complexity: 3, risk: 2 }, flags: { greenfield: true } },
      { label: "Internal IT team only", value: "internal", score: { complexity: 2 } },
      { label: "Internal IT + outsourced some functions", value: "hybrid", score: { complexity: 2 } },
      { label: "Currently using an MSP", value: "msp_current", score: { complexity: 3, risk: 2 }, flags: { manage_flag: true } },
    ],
  },
  {
    code: "P0-Q3A_IT_TEAM_SIZE",
    flow: "P0",
    label: "How many people are on your IT team?",
    type: "single",
    hubspotProperty: "mk_it_team_size",
    dbColumn: "it_team_size",
    showIf: (answers) => answers["P0-Q3_IT_SITUATION"] === "internal" || answers["P0-Q3_IT_SITUATION"] === "hybrid",
    options: [
      { label: "1–2 people", value: "1-2", score: { complexity: 2 }, flags: { understaffed_it: true } },
      { label: "3–5 people", value: "3-5", score: { complexity: 1 } },
      { label: "6–10 people", value: "6-10", score: { complexity: 0 } },
      { label: "10+ people", value: "10+", score: { complexity: 0 } },
    ],
  },
  {
    code: "P0-Q3B_MSP_ISSUES",
    flow: "P0",
    label: "What issues are you experiencing with your current MSP?",
    description: "This shapes incumbent displacement messaging and co-managed flag.",
    type: "multi",
    hubspotProperty: "mk_onb_msp_issues",
    dbColumn: "msp_issues",
    showIf: (answers) => answers["P0-Q3_IT_SITUATION"] === "msp_current",
    options: [
      { label: "Slow response times", value: "response_time", score: { urgency: 3 }, flags: { co_managed: true } },
      { label: "Security gaps / blind spots", value: "security_gaps", score: { urgency: 3, risk: 5 }, flags: { co_managed: true } },
      { label: "Cost too high for value", value: "cost", score: { urgency: 2 }, flags: { co_managed: true } },
      { label: "Limited scope of services", value: "limited_scope", score: { urgency: 2 }, flags: { co_managed: true } },
      { label: "Lack of expertise / talent", value: "lack_expertise", score: { urgency: 3 }, flags: { co_managed: true } },
      { label: "Other", value: "other", flags: { co_managed: true } },
    ],
  },
  {
    code: "P0-Q4_PRIMARY_PRIORITY",
    flow: "P0",
    label: "What is your primary challenge today?",
    description: "CRITICAL — This routes the entire deep-dive assessment flow.",
    type: "single",
    hubspotProperty: "mk_onb_priority",
    dbColumn: "primary_priority",
    options: [
      { label: "We had a security incident or breach", value: "security_incident", flags: { flag_security_remediation: true } },
      { label: "Compliance deadline approaching", value: "compliance_deadline", flags: { flag_compliance: true } },
      { label: "Modernize aging infrastructure", value: "modernize_infra", flags: { flag_infra_assessment: true } },
      { label: "Cloud migration or strategy", value: "cloud_strategy", flags: { flag_cloud_strategy: true } },
      { label: "Reduce IT costs and optimise spend", value: "cost_optimization", flags: { flag_cost_optimization: true } },
      { label: "Scale operations for growth", value: "growth_enablement", flags: { flag_growth_enablement: true } },
    ],
  },
  {
    code: "P0-Q4A_FRAMEWORKS",
    flow: "P0",
    label: "Which compliance frameworks are you required to meet?",
    description: "Each framework adds +3 complexity (CMMC/FedRAMP +4), capped at +15 total.",
    type: "multi",
    hubspotProperty: "mk_compliance_in_scope",
    dbColumn: "compliance_frameworks",
    showIf: (_answers, flags) => flags.flag_compliance === true,
    options: [
      { label: "HIPAA", value: "hipaa", score: { compliance_complexity: 3 } },
      { label: "PCI DSS", value: "pci_dss", score: { compliance_complexity: 3 } },
      { label: "SOC 2", value: "soc2", score: { compliance_complexity: 3 } },
      { label: "ISO 27001", value: "iso27001", score: { compliance_complexity: 3 } },
      { label: "CMMC", value: "cmmc", score: { compliance_complexity: 4 } },
      { label: "FedRAMP", value: "fedramp", score: { compliance_complexity: 4 } },
      { label: "NIST CSF", value: "nist_csf", score: { compliance_complexity: 2 } },
      { label: "NIST 800-171", value: "nist_800_171", score: { compliance_complexity: 3 } },
      { label: "NIST 800-53", value: "nist_800_53", score: { compliance_complexity: 3 } },
      { label: "GDPR / CCPA", value: "gdpr_ccpa", score: { compliance_complexity: 3 } },
      { label: "CIS Controls v8.1", value: "cis_controls", score: { compliance_complexity: 2 } },
      { label: "CJIS", value: "cjis", score: { compliance_complexity: 3 } },
      { label: "FISMA", value: "fisma", score: { compliance_complexity: 3 } },
    ],
  },
  {
    code: "P0-Q4A_DEADLINE",
    flow: "P0",
    label: "When is your compliance deadline?",
    description: "Urgency +8 if less than 90 days; triggers fast track.",
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
    ],
  },
  {
    code: "P0-Q4B_INCIDENT_TYPE",
    flow: "P0",
    label: "What type of security incident occurred?",
    description: "Urgency flag — NOT an EMS score modifier.",
    type: "single",
    hubspotProperty: "mk_security_incident_types",
    dbColumn: "incident_type",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Ransomware attack", value: "ransomware", score: { urgency: 15, risk: 20 }, flags: { fast_track: true, sr_escalation: true } },
      { label: "Data breach / exfiltration", value: "data_breach", score: { urgency: 15, risk: 20 }, flags: { fast_track: true, sr_escalation: true } },
      { label: "Business email compromise", value: "bec", score: { urgency: 10, risk: 10 } },
      { label: "Phishing / social engineering", value: "phishing", score: { urgency: 5, risk: 5 } },
      { label: "Malware infection", value: "malware", score: { urgency: 10, risk: 10 } },
      { label: "Insider threat", value: "insider", score: { urgency: 10, risk: 15 } },
      { label: "DDoS attack", value: "ddos", score: { urgency: 8, risk: 5 } },
      { label: "Unknown / investigating", value: "unknown", score: { urgency: 15, risk: 15 }, flags: { ir_escalation: true } },
    ],
  },
  {
    code: "P0-Q4B_INCIDENT_AGE",
    flow: "P0",
    label: "When did this incident occur?",
    description: "Ongoing = immediate escalation, end assessment early. Recent = fast track to SR flow.",
    type: "single",
    dbColumn: "incident_age",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Currently ongoing", value: "ongoing", score: { urgency: 25 }, flags: { ir_escalation: true, fast_track: true, immediate_escalation: true } },
      { label: "Within last 30 days", value: "last_30d", score: { urgency: 15 }, flags: { fast_track: true } },
      { label: "Within last 90 days", value: "last_90d", score: { urgency: 10 } },
      { label: "3–12 months ago", value: "3-12m", score: { urgency: 5 } },
      { label: "Over a year ago", value: "over_1y", score: { urgency: 0 } },
    ],
  },
  {
    code: "P0-Q5_EMPLOYEE_COUNT",
    flow: "P0",
    label: "How many employees does your organisation have?",
    description: "Feeds deal size derivation and IT ratio calculation.",
    type: "single",
    hubspotProperty: "numberOfEmployees",
    options: [
      { label: "1–25", value: "25", score: { ems_base: 0 } },
      { label: "26–50", value: "50", score: { ems_base: 10 } },
      { label: "51–100", value: "100", score: { ems_base: 20 } },
      { label: "101–200", value: "200", score: { ems_base: 30 } },
      { label: "201–500", value: "500", score: { ems_base: 40 } },
      { label: "501–1,000", value: "1000", score: { ems_base: 50 } },
      { label: "1,000+", value: "1000+", score: { ems_base: 60 } },
    ],
  },
  {
    code: "P0-Q6_REVENUE",
    flow: "P0",
    label: "What is your approximate annual revenue?",
    description: "Feeds deal size derivation and proposal ROI framing.",
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
  {
    code: "P0-Q7_TIMELINE",
    flow: "P0",
    label: "What is your expected implementation timeline?",
    description: "Urgency +5 if within 30 days. Shapes proposal urgency and resource allocation.",
    type: "single",
    hubspotProperty: "mk_onb_timeline",
    dbColumn: "timeline",
    options: [
      { label: "Within 30 days (urgent)", value: "urgent_30d", score: { urgency: 5 }, flags: { fast_track: true } },
      { label: "1–3 months", value: "1-3m", score: { urgency: 3 } },
      { label: "3–6 months", value: "3-6m", score: { urgency: 1 } },
      { label: "Exploring options (6+ months)", value: "exploring", score: { urgency: 0 } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// SR — SECURITY REMEDIATION (flag_security_remediation = true)
// ═══════════════════════════════════════════════════════════

export const SR_QUESTIONS: AssessmentQuestion[] = [
  {
    code: "SR-Q1",
    flow: "SR",
    label: "What is the current status of the incident?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Ongoing — we need immediate help", value: "ongoing", flags: { ir_escalation: true, immediate_escalation: true } },
      { label: "Contained but not fully remediated", value: "contained", score: { risk: 10 } },
      { label: "Resolved — we need to prevent recurrence", value: "resolved", score: { risk: 5 } },
      { label: "We suspect something but haven't confirmed", value: "suspected", score: { risk: 8, urgency: 5 } },
    ],
  },
  {
    code: "SR-Q2",
    flow: "SR",
    label: "Do you have incident response support in place?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Yes — internal IR team", value: "internal_ir" },
      { label: "Yes — we have an IR retainer with a vendor", value: "vendor_ir" },
      { label: "No — we need IR support", value: "need_ir", score: { risk: 15 }, flags: { ir_retainer_recommendation: true } },
      { label: "Not sure", value: "unsure", score: { risk: 10 } },
    ],
  },
  {
    code: "SR-Q3",
    flow: "SR",
    label: "What was the business impact?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Operations halted / significant downtime", value: "major", score: { risk: 20 }, flags: { impact_severity: "critical" } },
      { label: "Data was compromised or exfiltrated", value: "data_loss", score: { risk: 20 }, flags: { impact_severity: "critical" } },
      { label: "Limited impact — caught early", value: "limited", score: { risk: 5 }, flags: { impact_severity: "moderate" } },
      { label: "Still assessing impact", value: "assessing", score: { risk: 10 }, flags: { impact_severity: "unknown" } },
    ],
  },
  {
    code: "SR-Q4",
    flow: "SR",
    label: "Have required notifications been made (legal, regulatory, affected parties)?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Yes — all notifications completed", value: "completed" },
      { label: "In progress", value: "in_progress" },
      { label: "No — we need guidance on notification requirements", value: "need_guidance", flags: { notification_guidance: true } },
      { label: "Not applicable", value: "na" },
    ],
  },
  {
    code: "SR-Q7_MFA",
    flow: "SR",
    label: "What is your MFA (Multi-Factor Authentication) deployment level?",
    description: "No MFA = risk +30. Critical gap flag.",
    type: "single",
    hubspotProperty: "mk_cf_iam_maturity",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "MFA enforced for all users and admins", value: "full_mfa", score: { cf_iam_maturity: 3 } },
      { label: "MFA for admins only", value: "admin_only", score: { cf_iam_maturity: 1, risk: 10 } },
      { label: "MFA available but not enforced", value: "optional", score: { risk: 20 }, flags: { no_mfa: true } },
      { label: "No MFA deployed", value: "none", score: { risk: 30 }, flags: { no_mfa: true } },
    ],
  },
  {
    code: "SR-Q8",
    flow: "SR",
    label: "Describe your network security: firewall and segmentation.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Next-gen firewall with micro-segmentation", value: "ngfw_segmented", score: { cf_infrastructure_maturity: 3 } },
      { label: "Firewall deployed, basic segmentation", value: "fw_basic", score: { cf_infrastructure_maturity: 1 } },
      { label: "Firewall only, flat network", value: "fw_flat", score: { risk: 10 }, flags: { flat_network: true } },
      { label: "No dedicated firewall", value: "none", score: { risk: 20 }, flags: { flat_network: true } },
    ],
  },
  {
    code: "SR-Q9",
    flow: "SR",
    label: "Do you have a SIEM or centralized log management?",
    description: "No SIEM = risk +20. Critical gap flag.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Yes — fully operational SIEM with 24/7 monitoring", value: "siem_247", score: { cf_secops_maturity: 4 } },
      { label: "Yes — SIEM deployed but limited monitoring", value: "siem_limited", score: { cf_secops_maturity: 2 } },
      { label: "Basic log collection only", value: "basic_logs", score: { cf_secops_maturity: 1, risk: 10 }, flags: { no_siem: true } },
      { label: "No centralized logging", value: "none", score: { risk: 20 }, flags: { no_siem: true } },
    ],
  },
  {
    code: "SR-Q10",
    flow: "SR",
    label: "What is your backup status and recovery testing cadence?",
    description: "No backup = risk +25.",
    type: "single",
    hubspotProperty: "mk_cf_dataprotection_maturity",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Automated backups + tested monthly", value: "automated_monthly", score: { cf_data_protection_maturity: 4 } },
      { label: "Automated backups + tested annually", value: "automated_annual", score: { cf_data_protection_maturity: 2 } },
      { label: "Manual backups", value: "manual", score: { cf_data_protection_maturity: 1, risk: 10 } },
      { label: "Backups exist but never tested", value: "untested", score: { risk: 15 }, flags: { no_backup: true } },
      { label: "No backups", value: "none", score: { risk: 25 }, flags: { no_backup: true } },
    ],
  },
  {
    code: "SR-Q11",
    flow: "SR",
    label: "What endpoint protection (EDR) do you have?",
    description: "No EDR = risk +15.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "EDR deployed with 24/7 MDR service", value: "edr_mdr", score: { cf_secops_maturity: 4 } },
      { label: "EDR deployed, managed internally", value: "edr_internal", score: { cf_secops_maturity: 2 } },
      { label: "Traditional antivirus only", value: "av_only", score: { cf_secops_maturity: 1, risk: 10 }, flags: { no_edr: true } },
      { label: "No endpoint protection", value: "none", score: { risk: 15 }, flags: { no_edr: true } },
    ],
  },
  {
    code: "SR-Q14",
    flow: "SR",
    label: "Do you have a documented incident response plan?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Yes — documented, tested, and updated regularly", value: "full", score: { cf_secops_maturity: 3 } },
      { label: "Yes — documented but not tested", value: "untested", score: { cf_secops_maturity: 1 } },
      { label: "Informal / undocumented", value: "informal", score: { risk: 5 }, flags: { no_ir_plan: true } },
      { label: "No IR plan", value: "none", score: { risk: 10 }, flags: { no_ir_plan: true } },
    ],
  },
  {
    code: "SR-Q2A",
    flow: "SR",
    label: "What additional IR support do you need?",
    type: "multi",
    showIf: (answers) => answers["SR-Q2"] === "need_ir",
    options: [
      { label: "Digital forensics", value: "forensics" },
      { label: "Malware analysis", value: "malware_analysis" },
      { label: "Containment and eradication", value: "containment" },
      { label: "Communications / PR support", value: "communications" },
      { label: "Legal / regulatory counsel", value: "legal" },
      { label: "Recovery and restoration", value: "recovery" },
    ],
  },
  {
    code: "SR-Q_NEW_TRAINING",
    flow: "SR",
    label: "Does your organisation have a security awareness training program?",
    description: "If none: add training recommendation. SecOps maturity +2 per level.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Continuous with metrics and reporting", value: "continuous", score: { cf_secops_maturity: 4 } },
      { label: "Monthly + phishing simulations", value: "monthly_phishing", score: { cf_secops_maturity: 3 } },
      { label: "Quarterly training", value: "quarterly", score: { cf_secops_maturity: 2 } },
      { label: "Annual training only", value: "annual", score: { cf_secops_maturity: 1 } },
      { label: "No training program", value: "none", score: { cf_secops_maturity: 0 }, flags: { training_recommendation: true } },
    ],
  },
  {
    code: "SR-Q_NEW_VULN",
    flow: "SR",
    label: "What is your vulnerability scanning cadence?",
    description: "No scanning = risk +10.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_security_remediation === true,
    options: [
      { label: "Continuous with auto-remediation", value: "continuous", score: { cf_secops_maturity: 4 } },
      { label: "Weekly with SLA-based remediation", value: "weekly", score: { cf_secops_maturity: 3 } },
      { label: "Monthly scans", value: "monthly", score: { cf_secops_maturity: 2 } },
      { label: "Quarterly scans", value: "quarterly", score: { cf_secops_maturity: 1 } },
      { label: "No vulnerability scanning", value: "none", score: { risk: 10 }, flags: { no_vuln_scanning: true } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// IA — INFRASTRUCTURE ASSESSMENT (flag_infra_assessment = true)
// ═══════════════════════════════════════════════════════════

export const IA_QUESTIONS: AssessmentQuestion[] = [
  {
    code: "IA-Q2",
    flow: "IA",
    label: "What is the average age of your server infrastructure?",
    description: "Infra maturity base score. Skipped for cloud-native.",
    type: "single",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["CM-Q1"] !== "cloud_first",
    options: [
      { label: "Less than 2 years", value: "lt2", score: { cf_infrastructure_maturity: 4 } },
      { label: "2–4 years", value: "2-4", score: { cf_infrastructure_maturity: 2 } },
      { label: "5–7 years", value: "5-7", score: { cf_infrastructure_maturity: 0, risk: 5 } },
      { label: "7+ years", value: "7+", score: { cf_infrastructure_maturity: -3, risk: 10 } },
    ],
  },
  {
    code: "IA-Q3_SERVER_OS",
    flow: "IA",
    label: "What Windows Server versions are in your environment?",
    description: "EOL OS = critical infrastructure risk. Risk +20 for 2012R2.",
    type: "multi",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Windows Server 2022", value: "2022", score: { cf_infrastructure_maturity: 2 } },
      { label: "Windows Server 2019", value: "2019", score: { cf_infrastructure_maturity: 1 } },
      { label: "Windows Server 2016", value: "2016", score: { cf_infrastructure_maturity: 0 } },
      { label: "Windows Server 2012 R2 (EOL)", value: "2012r2", score: { risk: 20 }, flags: { unsupported_os: true } },
      { label: "Linux only", value: "linux", score: { cf_infrastructure_maturity: 2 } },
      { label: "No servers (cloud only)", value: "cloud_only", score: { cf_infrastructure_maturity: 2 } },
    ],
  },
  {
    code: "IA-Q4",
    flow: "IA",
    label: "What is the warranty / support status of your servers?",
    type: "single",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["CM-Q1"] !== "cloud_first",
    options: [
      { label: "All under warranty / active support", value: "all_warranty", score: { cf_infrastructure_maturity: 3 } },
      { label: "Most under warranty", value: "most", score: { cf_infrastructure_maturity: 1 } },
      { label: "Mixed — some expired", value: "mixed", score: { cf_infrastructure_maturity: 0, risk: 5 } },
      { label: "Most or all out of warranty", value: "expired", score: { cf_infrastructure_maturity: -2, risk: 10 } },
    ],
  },
  {
    code: "IA-Q7",
    flow: "IA",
    label: "Do you have capacity monitoring for your infrastructure?",
    type: "single",
    showIf: (answers, flags) => flags.flag_infra_assessment === true && answers["CM-Q1"] !== "cloud_first",
    options: [
      { label: "Yes — real-time monitoring with alerting", value: "realtime", score: { cf_infrastructure_maturity: 2 } },
      { label: "Basic monitoring (CPU/RAM/disk)", value: "basic", score: { cf_infrastructure_maturity: 1 } },
      { label: "Manual checks only", value: "manual", score: { cf_infrastructure_maturity: 0 } },
      { label: "No capacity monitoring", value: "none", score: { risk: 5 } },
    ],
  },
  {
    code: "IA-Q8",
    flow: "IA",
    label: "What percentage of your servers are virtualised?",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "80%+ virtualised", value: "80+", score: { cf_infrastructure_maturity: 2 } },
      { label: "50–80% virtualised", value: "50-80", score: { cf_infrastructure_maturity: 1 } },
      { label: "Less than 50%", value: "lt50", score: { cf_infrastructure_maturity: 0 } },
      { label: "No virtualisation", value: "none", score: { cf_infrastructure_maturity: -1 } },
    ],
  },
  {
    code: "IA-Q14",
    flow: "IA",
    label: "Describe your network security: firewall and segmentation.",
    type: "single",
    showIf: (_answers, flags) => flags.flag_infra_assessment === true,
    options: [
      { label: "Next-gen firewall with micro-segmentation", value: "ngfw_segmented", score: { cf_infrastructure_maturity: 3 } },
      { label: "Firewall deployed, basic segmentation", value: "fw_basic", score: { cf_infrastructure_maturity: 1 } },
      { label: "Firewall only, flat network", value: "fw_flat", score: { risk: 10 }, flags: { flat_network: true } },
      { label: "No dedicated firewall", value: "none", score: { risk: 20 }, flags: { flat_network: true } },
    ],
  },
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
  {
    code: "IA-Q9A",
    flow: "IA",
    label: "Which VMware version are you running?",
    type: "single",
    showIf: (answers) => {
      const virt = answers["IA-Q8"];
      return virt === "80+" || virt === "50-80";
    },
    options: [
      { label: "vSphere 8.x", value: "vsphere_8", score: { cf_infrastructure_maturity: 2 } },
      { label: "vSphere 7.x", value: "vsphere_7", score: { cf_infrastructure_maturity: 2 } },
      { label: "vSphere 6.7", value: "vsphere_67", score: { cf_infrastructure_maturity: -1 } },
      { label: "vSphere 6.5 or older (End of Support)", value: "vsphere_65", score: { cf_infrastructure_maturity: -2, risk: 10 } },
      { label: "Not VMware / Not sure", value: "not_vmware" },
    ],
  },
  {
    code: "IA-Q9B",
    flow: "IA",
    label: "Which Hyper-V version are you running?",
    type: "single",
    showIf: (answers) => {
      const virt = answers["IA-Q8"];
      return virt === "80+" || virt === "50-80";
    },
    options: [
      { label: "Hyper-V 2022", value: "hyperv_2022", score: { cf_infrastructure_maturity: 2 } },
      { label: "Hyper-V 2019", value: "hyperv_2019", score: { cf_infrastructure_maturity: 1 } },
      { label: "Hyper-V 2016", value: "hyperv_2016", score: { cf_infrastructure_maturity: 0 } },
      { label: "Hyper-V 2012 R2 or older (End of Life)", value: "hyperv_2012", score: { risk: 10 }, flags: { unsupported_os: true } },
      { label: "Not Hyper-V / Not sure", value: "not_hyperv" },
    ],
  },
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
    showIf: (answers) => answers["P0-Q0D_LOCATIONS"] !== "1",
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
    code: "CO-Q_NEW_INSURANCE",
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
// ═══════════════════════════════════════════════════════════

export const CAPTURE_FIELDS = [
  { key: "first_name", label: "First Name", type: "text", required: true },
  { key: "last_name", label: "Last Name", type: "text", required: true },
  { key: "email", label: "Work Email", type: "email", required: true },
  { key: "company", label: "Company Name", type: "text", required: true },
  { key: "phone", label: "Phone (optional)", type: "tel", required: false },
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
};

export const ALL_QUESTIONS = [
  ...P0_QUESTIONS,
  ...SR_QUESTIONS,
  ...IA_QUESTIONS,
  ...CM_QUESTIONS,
  ...GE_QUESTIONS,
  ...CO_QUESTIONS,
];
