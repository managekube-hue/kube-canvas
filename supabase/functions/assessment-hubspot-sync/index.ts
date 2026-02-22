import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return new Response(JSON.stringify({ error: "session_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const hubspotToken = Deno.env.get("HUBSPOT_ACCESS_TOKEN");

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the assessment session
    const { data: session, error } = await supabase
      .from("assessment_sessions")
      .select("*")
      .eq("id", session_id)
      .single();

    if (error || !session) {
      return new Response(JSON.stringify({ error: "Session not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!hubspotToken) {
      return new Response(JSON.stringify({ error: "HubSpot token not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const answers = (session.answers || {}) as Record<string, any>;
    const flags = (session.flags || {}) as Record<string, any>;

    // ══════════════════════════════════════════════════════
    // Section 10: Complete HubSpot Property Mapping
    // ══════════════════════════════════════════════════════

    const hubspotProperties: Record<string, any> = {
      // ── Native HubSpot properties ──
      email: session.email,
      firstname: session.first_name,
      lastname: session.last_name,
      company: session.company,
      phone: session.phone || "",
      lifecyclestage: "lead",

      // ── 10.1 Core Scoring Properties ──
      mk_ems_score: session.ems_score?.toString() || "0",
      mk_onb_urgency_score: session.urgency_score?.toString() || "0",
      mk_onb_risk_score: session.risk_score?.toString() || "0",
      mk_recommended_tier: session.recommended_tier || "",
      mk_monthly_price: session.monthly_price?.toString() || "",
      mk_onb_profile_type: session.profile_type || "",
      mk_upsell_ready: session.upsell_ready ? "true" : "false",
      mk_onb_completed_at: session.completed_at || "",
      mk_key_gaps_flags: (session.key_gap_flags || []).join(","),
      mk_fast_track: flags.fast_track ? "true" : "false",
      mk_ir_escalation: flags.ir_escalation ? "true" : "false",

      // ── 10.2 Control Family Maturity Properties (CF) ──
      mk_cf_infrastructure_maturity: session.cf_infrastructure_maturity?.toString() || "0",
      mk_cf_secops_maturity: session.cf_secops_maturity?.toString() || "0",
      mk_cf_iam_maturity: session.cf_iam_maturity?.toString() || "0",
      mk_cf_cloud_maturity: session.cf_cloud_maturity?.toString() || "0",
      mk_cf_dataprotection_maturity: session.cf_data_protection_maturity?.toString() || "0",
      mk_cf_automation_maturity: session.cf_automation_maturity?.toString() || "0",
      mk_cf_cost_maturity: session.cf_cost_maturity?.toString() || "0",
      mk_cf_business_gov_maturity: session.cf_business_gov_maturity?.toString() || "0",

      // ── 10.3 Assessment Context Properties ──
      mk_onb_role: session.role || "",
      mk_onb_org_stage: session.org_stage || "",
      mk_onb_it_situation: session.it_situation || "",
      mk_it_team_size: session.it_team_size?.toString() || "",
      mk_onb_msp_issues: (session.msp_issues || []).join(","),
      mk_onb_priority: session.primary_priority || "",
      mk_compliance_in_scope: (session.compliance_frameworks || []).join(","),
      mk_has_compliance_deadline: session.compliance_deadline ? "true" : "false",
      mk_compliance_deadline_date: session.compliance_deadline || "",
      mk_security_incident_types: Array.isArray(answers["P0-Q4B_INCIDENT_TYPE"])
        ? answers["P0-Q4B_INCIDENT_TYPE"].join(",")
        : (session.incident_type || ""),
      mk_security_incident_age: session.incident_age || "",
      mk_onb_timeline: session.timeline || "",
      mk_endpoint_count: session.endpoint_count?.toString() || "",
      mk_location_count: answers["P0-Q8_LOCATIONS"] || "",
      mk_remote_workforce_pct: session.remote_workforce_pct || "",
      mk_email_platform: session.email_platform || "",
      mk_industry_vertical: session.industry || "",
      mk_onb_estimated_deal_size: session.estimated_deal_size || "",

      // ── Routing flags ──
      mk_flag_security_remediation: flags.flag_security_remediation ? "true" : "false",
      mk_flag_infra_assessment: flags.flag_infra_assessment ? "true" : "false",
      mk_flag_cloud_strategy: flags.flag_cloud_strategy ? "true" : "false",
      mk_flag_cost_optimization: flags.flag_cost_optimization ? "true" : "false",
      mk_flag_growth_enablement: flags.flag_growth_enablement ? "true" : "false",
      mk_flag_compliance: flags.flag_compliance ? "true" : "false",
      mk_flag_understaffed_it: flags.understaffed_it ? "true" : "false",
      mk_multisite: flags.mk_multisite ? "true" : "false",

      // ── SR flow properties ──
      mk_sr_incident_status: answers["SR-Q1"] || "",
      mk_sr_network_posture: answers["SR-Q8"] || "",

      // ── CM flow properties ──
      mk_cloud_usage_level: answers["CM-Q1"] || answers["IA-Q22"] || "",
      mk_cloud_drivers: Array.isArray(answers["CM-Q1A"]) ? answers["CM-Q1A"].join(",") : "",
      mk_hosting_state: answers["CM-Q2"] || "",
      mk_migration_scope: Array.isArray(answers["CM-Q3"]) ? answers["CM-Q3"].join(",") : "",
      mk_integration_dependencies: Array.isArray(answers["CM-Q4"]) ? answers["CM-Q4"].join(",") : "",
      mk_cloud_dr_strategy: answers["CM-Q12"] || "",
      mk_rto_requirement: answers["CM-Q13"] || "",
      mk_cloud_skills_level: answers["CM-Q15"] || "",
      mk_cloud_success_metrics: Array.isArray(answers["CM-Q16"]) ? answers["CM-Q16"].join(",") : "",
      mk_cloud_budget: answers["CM-Q17"] || "",

      // ── GE flow properties ──
      mk_growth_trajectory: answers["GE-Q1"] || "",
      mk_headcount_growth: answers["GE-Q2"] || "",
      mk_growth_bottleneck: answers["GE-Q3"] || "",
      mk_automation_targets: Array.isArray(answers["GE-Q5"]) ? answers["GE-Q5"].join(",") : "",
      mk_automation_tools: Array.isArray(answers["GE-Q6"]) ? answers["GE-Q6"].join(",") : "",
      mk_integration_architecture: answers["GE-Q8"] || "",
      mk_scalability_bottlenecks: Array.isArray(answers["GE-Q9"]) ? answers["GE-Q9"].join(",") : "",
      mk_api_maturity: answers["GE-Q10"] || "",
      mk_multisite_expansion: answers["GE-Q12"] || "",

      // ── CO flow properties ──
      mk_annual_it_budget: answers["CO-Q1"] || "",
      mk_budget_distribution: Array.isArray(answers["CO-Q2"]) ? answers["CO-Q2"].join(",") : "",
      mk_vendor_count: answers["CO-Q3"] || "",
      mk_cloud_cost_visibility: answers["CO-Q5"] || "",
      mk_cloud_waste_status: answers["CO-Q6"] || "",
      mk_licence_tracking: answers["CO-Q7"] || "",
      mk_tool_overlap: Array.isArray(answers["CO-Q9"]) ? answers["CO-Q9"].join(",") : "",
      mk_contract_renewals: answers["CO-Q10"] || "",
      mk_unused_contracts: answers["CO-Q11"] || "",
      mk_savings_target: answers["CO-Q14"] || "",
      mk_cyber_insurance: answers["CO-Q_INS"] || "",

      // ── IA flow properties ──
      mk_hyperv_version: answers["IA-Q9B"] || "",
      mk_vmware_version: answers["IA-Q9A"] || "",
      mk_dr_plan_status: answers["IA-Q19"] || "",
    };

    // ── Lifecycle stage based on urgency (per spec Section 12.3) ──
    if (flags.fast_track || flags.ir_escalation) {
      hubspotProperties.lifecyclestage = "salesqualifiedlead";
    } else if (session.urgency_score && session.urgency_score > 10) {
      hubspotProperties.lifecyclestage = "marketingqualifiedlead";
    } else if (answers["P0-Q12_TIMELINE"] === "exploring_6m_plus") {
      hubspotProperties.lifecyclestage = "subscriber";
    }

    // Remove empty string values to avoid HubSpot errors
    for (const key of Object.keys(hubspotProperties)) {
      if (hubspotProperties[key] === "" || hubspotProperties[key] === undefined || hubspotProperties[key] === null) {
        delete hubspotProperties[key];
      }
    }

    // Create or update HubSpot contact
    const searchRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                { propertyName: "email", operator: "EQ", value: session.email },
              ],
            },
          ],
        }),
      }
    );

    const searchData = await searchRes.json();
    let contactId: string;

    if (searchData.total > 0) {
      contactId = searchData.results[0].id;
      const updateRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: hubspotProperties }),
      });
      if (!updateRes.ok) {
        const errText = await updateRes.text();
        console.error("HubSpot update error:", errText);
      }
    } else {
      const createRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: hubspotProperties }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) {
        console.error("HubSpot create error:", JSON.stringify(createData));
      }
      contactId = createData.id;
    }

    // Update Supabase session with HubSpot contact ID
    await supabase
      .from("assessment_sessions")
      .update({
        hubspot_contact_id: contactId,
        hubspot_synced_at: new Date().toISOString(),
      })
      .eq("id", session_id);

    return new Response(
      JSON.stringify({ success: true, hubspot_contact_id: contactId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Assessment sync error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
