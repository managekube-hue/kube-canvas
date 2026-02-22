/**
 * ManageKube Assessment Scoring Engine v2.0
 * Implements EMS scoring per spec:
 *   EMS = complexity_score (0-500) + risk_score (0-500)
 *   Industry multiplier applied after.
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
  monthly_price: number;
  base_rate: number;
  per_endpoint_rate: number;
  endpoint_count: number;
  estimated_deal_size: string;
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
        const result = applyOptionScores(opt, cf, { complexity, urgency, risk, industry_multiplier, growth_modifier }, allFlags);
        complexity = result.complexity;
        urgency = result.urgency;
        risk = result.risk;
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
      const result = applyOptionScores(opt, cf, { complexity, urgency, risk, industry_multiplier, growth_modifier }, allFlags);
      complexity = result.complexity;
      urgency = result.urgency;
      risk = result.risk;
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

  // ── EMS CALCULATION (per spec Section 3.1) ──
  // EMS = complexity_score (0-500) + risk_score (0-500)
  // Cap each stream, apply industry multiplier to composite
  const cappedComplexity = Math.min(complexity, 500);
  const cappedRisk = Math.min(risk, 500);
  const rawEms = cappedComplexity + cappedRisk;
  const ems_score = Math.round(Math.min(rawEms * industry_multiplier, 1000));

  // Tier determination: XRO 0-400 | XMX 401-700 | XME 701-1000
  let recommended_tier: "XRO" | "XMX" | "XME" = "XRO";
  if (ems_score > 700) recommended_tier = "XME";
  else if (ems_score > 400) recommended_tier = "XMX";

  // Profile type (per spec Section 3.4)
  const endpoints = answers["P0-Q9_ENDPOINTS"] || answers["P0-Q0E_ENDPOINTS"];
  const employees = answers["P0-Q5_EMPLOYEE_COUNT"];
  const revenue = answers["P0-Q6_REVENUE"];
  let profile_type: "smb" | "mid_market" | "enterprise" = "smb";

  // Employee-based: <50 SMB, 50-200 mid_market, >200 enterprise
  const empNum = parseInt(employees) || 0;
  if (empNum > 200 || endpoints === "5000" || endpoints === "5000+") profile_type = "enterprise";
  else if (empNum > 50 || endpoints === "500" || endpoints === "1000") profile_type = "mid_market";

  // Revenue override: $25M+ = enterprise, $5M-$25M = mid_market
  if (revenue === "25m_100m" || revenue === "100m_500m" || revenue === "500m_plus") profile_type = "enterprise";
  else if (revenue === "5m_25m" && profile_type === "smb") profile_type = "mid_market";

  // Upsell triggers (per spec Section 2)
  // From XRO: EMS > 350 OR endpoints > 75 OR compliance framework added
  // From XMX: EMS > 650 OR compliance frameworks > 2 OR security incident flag
  const endpointNum = parseInt(endpoints) || 50;
  const frameworks = answers["P0-Q4A_FRAMEWORKS"] || [];
  const upsell_ready =
    (recommended_tier === "XRO" && (ems_score > 350 || endpointNum > 75 || frameworks.length > 0)) ||
    (recommended_tier === "XMX" && (ems_score > 650 || frameworks.length > 2 || allFlags.flag_security_remediation));

  // Deep-dive flow routing
  const priority = answers["P0-Q4_PRIMARY_PRIORITY"];
  const deep_dive_flow = priority ? (PRIORITY_TO_FLOW[priority] || "SR") : "SR";

  // ── Pricing Calculation ──
  // Base rates: XRO $2,800 | XMX $7,500 | XME $18,000
  // Per-endpoint: XRO $18 | XMX $12 | XME $8
  const TIER_PRICING: Record<string, { base: number; perEndpoint: number }> = {
    XRO: { base: 2800, perEndpoint: 18 },
    XMX: { base: 7500, perEndpoint: 12 },
    XME: { base: 18000, perEndpoint: 8 },
  };
  const tierPricing = TIER_PRICING[recommended_tier];
  const monthly_price = tierPricing.base + (endpointNum * tierPricing.perEndpoint);

  // Deal size classification
  let estimated_deal_size = "smb";
  if (profile_type === "enterprise") estimated_deal_size = "enterprise";
  else if (profile_type === "mid_market") estimated_deal_size = "mid_market";

  return {
    ems_score,
    complexity_score: cappedComplexity,
    urgency_score: urgency,
    risk_score: cappedRisk,
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
    monthly_price,
    base_rate: tierPricing.base,
    per_endpoint_rate: tierPricing.perEndpoint,
    endpoint_count: endpointNum,
    estimated_deal_size,
  };
}

function applyOptionScores(
  opt: QuestionOption,
  cf: Record<string, number>,
  accum: { complexity: number; urgency: number; risk: number; industry_multiplier: number; growth_modifier: number },
  flags: Record<string, any>
) {
  const result = { ...accum };

  if (opt.score) {
    for (const [key, value] of Object.entries(opt.score)) {
      if (key === "complexity") result.complexity += value;
      else if (key === "urgency") result.urgency += value;
      else if (key === "risk") result.risk += value;
      else if (key === "industry_multiplier") result.industry_multiplier = value;
      else if (key === "growth_modifier") result.growth_modifier += value;
      else if (key === "compliance_complexity") {
        // Handled separately in multi-select with cap
      } else if (key === "ems_base") {
        // ems_base feeds into complexity per spec
        result.complexity += value;
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
