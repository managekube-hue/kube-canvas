/**
 * ManageKube Assessment Scoring Engine v2.0
 * Implements EMS scoring, CF maturity scores, urgency/risk flags,
 * tier thresholds, and industry multipliers.
 *
 * Tier thresholds: XRO 0-400 | XMX 401-700 | XME 701-1000
 * Compliance framework cap: +15 max
 * Incident history: urgency flag only (NOT EMS modifier)
 */

import { ALL_QUESTIONS, PRIORITY_TO_FLOW, type QuestionOption } from "@/data/assessment-questions";

export interface ScoringResult {
  ems_score: number;
  complexity_score: number;
  urgency_score: number;
  risk_score: number;
  cf_infrastructure_maturity: number;
  cf_security_ps_maturity: number;
  cf_iam_maturity: number;
  cf_secops_maturity: number;
  cf_cloud_maturity: number;
  cf_data_protection_maturity: number;
  cf_business_gov_maturity: number;
  cf_dr_bc_maturity: number;
  cf_automation_maturity: number;
  cf_cost_maturity: number;
  recommended_tier: "XRO" | "XMX" | "XME";
  profile_type: "smb" | "mid_market" | "enterprise";
  upsell_ready: boolean;
  flags: Record<string, any>;
  key_gap_flags: string[];
  deep_dive_flow: string;
  industry_multiplier: number;
}

const CF_FIELDS = [
  "cf_infrastructure_maturity",
  "cf_security_ps_maturity",
  "cf_iam_maturity",
  "cf_secops_maturity",
  "cf_cloud_maturity",
  "cf_data_protection_maturity",
  "cf_business_gov_maturity",
  "cf_dr_bc_maturity",
  "cf_automation_maturity",
  "cf_cost_maturity",
] as const;

export function calculateScores(
  answers: Record<string, any>,
  flags: Record<string, any>
): ScoringResult {
  let complexity = 0;
  let urgency = 0;
  let risk = 0;
  let ems_base = 0;
  let industry_multiplier = 1.0;
  let growth_modifier = 0;

  // CF maturity accumulators
  const cf: Record<string, number> = {};
  for (const f of CF_FIELDS) cf[f] = 0;

  const allFlags: Record<string, any> = { ...flags };
  const gapFlags: string[] = [];

  // Process each answered question
  for (const question of ALL_QUESTIONS) {
    const answer = answers[question.code];
    if (answer === undefined || answer === null) continue;

    if (question.type === "multi" && Array.isArray(answer)) {
      // Multi-select: accumulate scores from all selected options
      for (const val of answer) {
        const opt = question.options?.find((o) => o.value === val);
        if (!opt) continue;
        applyOptionScores(opt, cf, { complexity, urgency, risk, ems_base, industry_multiplier, growth_modifier }, allFlags);
        const result = applyOptionScores(opt, cf, { complexity, urgency, risk, ems_base, industry_multiplier, growth_modifier }, allFlags);
        complexity = result.complexity;
        urgency = result.urgency;
        risk = result.risk;
        ems_base = result.ems_base;
        industry_multiplier = result.industry_multiplier;
        growth_modifier = result.growth_modifier;
      }

      // Special handling: compliance framework cap at +15
      if (question.code === "P0-Q4A_FRAMEWORKS") {
        const frameworkCount = answer.length;
        const hasCmmcFedramp = answer.some((v: string) => v === "cmmc" || v === "fedramp");
        let complianceComplexity = Math.min(frameworkCount * 3, 15);
        if (hasCmmcFedramp) complianceComplexity = Math.min(complianceComplexity + 1, 15);
        complexity += complianceComplexity;
        allFlags.flag_compliance = true;
      }
    } else {
      // Single-select
      const opt = question.options?.find((o) => o.value === answer);
      if (!opt) continue;
      const result = applyOptionScores(opt, cf, { complexity, urgency, risk, ems_base, industry_multiplier, growth_modifier }, allFlags);
      complexity = result.complexity;
      urgency = result.urgency;
      risk = result.risk;
      ems_base = result.ems_base;
      industry_multiplier = result.industry_multiplier;
      growth_modifier = result.growth_modifier;
    }
  }

  // Collect gap flags
  const gapFlagKeys = [
    "no_mfa", "no_siem", "no_edr", "no_backup", "flat_network",
    "unsupported_os", "no_ir_plan", "no_vuln_scanning", "no_cloud_security",
    "no_cloud_dr", "no_insurance", "no_cost_visibility", "understaffed_it",
    "no_dr_plan", "license_waste", "vendor_consolidation",
  ];
  for (const k of gapFlagKeys) {
    if (allFlags[k]) gapFlags.push(k);
  }

  // Cap CF scores at 10
  for (const f of CF_FIELDS) {
    cf[f] = Math.min(Math.max(cf[f], 0), 10);
  }

  // Calculate EMS score
  // EMS = ems_base + (sum of CF scores * weight) + complexity + growth_modifier
  // Apply industry multiplier
  const cfSum = CF_FIELDS.reduce((sum, f) => sum + cf[f], 0);
  const rawEms = ems_base + (cfSum * 5) + (complexity * 3) + (growth_modifier * 5);
  const ems_score = Math.round(Math.min(rawEms * industry_multiplier, 1000));

  // Tier determination: XRO 0-400 | XMX 401-700 | XME 701-1000
  let recommended_tier: "XRO" | "XMX" | "XME" = "XRO";
  if (ems_score > 700) recommended_tier = "XME";
  else if (ems_score > 400) recommended_tier = "XMX";

  // Profile type based on endpoint count
  const endpoints = answers["P0-Q0E_ENDPOINTS"];
  let profile_type: "smb" | "mid_market" | "enterprise" = "smb";
  if (endpoints === "5000" || endpoints === "5000+") profile_type = "enterprise";
  else if (endpoints === "500" || endpoints === "1000") profile_type = "mid_market";

  // Upsell trigger: EMS > 350 (from XRO) or > 650 (from XMX)
  const upsell_ready = (recommended_tier === "XRO" && ems_score > 350) ||
    (recommended_tier === "XMX" && ems_score > 650);

  // Deep-dive flow routing
  const priority = answers["P0-Q4_PRIMARY_PRIORITY"];
  const deep_dive_flow = priority ? (PRIORITY_TO_FLOW[priority] || "SR") : "SR";

  return {
    ems_score,
    complexity_score: complexity,
    urgency_score: urgency,
    risk_score: Math.min(risk, 100),
    cf_infrastructure_maturity: cf.cf_infrastructure_maturity,
    cf_security_ps_maturity: cf.cf_security_ps_maturity,
    cf_iam_maturity: cf.cf_iam_maturity,
    cf_secops_maturity: cf.cf_secops_maturity,
    cf_cloud_maturity: cf.cf_cloud_maturity,
    cf_data_protection_maturity: cf.cf_data_protection_maturity,
    cf_business_gov_maturity: cf.cf_business_gov_maturity,
    cf_dr_bc_maturity: cf.cf_dr_bc_maturity,
    cf_automation_maturity: cf.cf_automation_maturity,
    cf_cost_maturity: cf.cf_cost_maturity,
    recommended_tier,
    profile_type,
    upsell_ready,
    flags: allFlags,
    key_gap_flags: gapFlags,
    deep_dive_flow,
    industry_multiplier,
  };
}

function applyOptionScores(
  opt: QuestionOption,
  cf: Record<string, number>,
  accum: { complexity: number; urgency: number; risk: number; ems_base: number; industry_multiplier: number; growth_modifier: number },
  flags: Record<string, any>
) {
  const result = { ...accum };

  if (opt.score) {
    for (const [key, value] of Object.entries(opt.score)) {
      if (key === "complexity") result.complexity += value;
      else if (key === "urgency") result.urgency += value;
      else if (key === "risk") result.risk += value;
      else if (key === "ems_base") result.ems_base += value;
      else if (key === "industry_multiplier") result.industry_multiplier = value;
      else if (key === "growth_modifier") result.growth_modifier += value;
      else if (key === "compliance_complexity") {
        // Handled separately in multi-select with cap
      } else if (key.startsWith("cf_")) {
        cf[key] = (cf[key] || 0) + value;
      }
    }
  }

  if (opt.flags) {
    for (const [key, value] of Object.entries(opt.flags)) {
      flags[key] = value;
    }
  }

  return result;
}

/**
 * Determine if the assessment should be immediately escalated
 * (ongoing incident = same-day IR escalation, end assessment early)
 */
export function shouldEscalate(answers: Record<string, any>, flags: Record<string, any>): boolean {
  return flags.ir_escalation === true ||
    flags.immediate_escalation === true ||
    answers["P0-Q4B_INCIDENT_AGE"] === "ongoing" ||
    answers["SR-Q1"] === "ongoing";
}
