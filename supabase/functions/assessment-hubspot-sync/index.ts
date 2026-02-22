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

    // Map assessment session to HubSpot contact properties
    const hubspotProperties: Record<string, any> = {
      email: session.email,
      firstname: session.first_name,
      lastname: session.last_name,
      company: session.company,
      phone: session.phone || "",
      industry: session.industry || "",
      lifecyclestage: "lead",
      // Canonical ManageKube properties
      mk_onb_role: session.role || "",
      mk_onb_org_stage: session.org_stage || "",
      mk_onb_it_situation: session.it_situation || "",
      mk_onb_priority: session.primary_priority || "",
      mk_onb_timeline: session.timeline || "",
      mk_endpoint_count: session.endpoint_count?.toString() || "",
      mk_location_count: session.location_count?.toString() || "",
      mk_remote_workforce_pct: session.remote_workforce_pct || "",
      mk_email_platform: session.email_platform || "",
      mk_recommended_tier: session.recommended_tier || "",
      mk_onb_profile_type: session.profile_type || "",
      mk_compliance_in_scope: (session.compliance_frameworks || []).join(","),
      mk_has_compliance_deadline: session.compliance_deadline || "",
      mk_security_incident_types: session.incident_type || "",
      mk_onb_msp_issues: (session.msp_issues || []).join(","),
      mk_onb_urgency_score: session.urgency_score?.toString() || "0",
      mk_onb_risk_score: session.risk_score?.toString() || "0",
      mk_ems_score: session.ems_score?.toString() || "0",
      mk_cf_infrastructure_maturity: session.cf_infrastructure_maturity?.toString() || "0",
      mk_cf_secops_maturity: session.cf_secops_maturity?.toString() || "0",
      mk_cf_iam_maturity: session.cf_iam_maturity?.toString() || "0",
      mk_cf_cloud_maturity: session.cf_cloud_maturity?.toString() || "0",
      mk_cf_data_protection_maturity: session.cf_data_protection_maturity?.toString() || "0",
      mk_cf_business_gov_maturity: session.cf_business_gov_maturity?.toString() || "0",
      mk_key_gaps_flags: (session.key_gap_flags || []).join(","),
      mk_upsell_ready: session.upsell_ready ? "true" : "false",
      mk_onb_completed_at: session.completed_at || "",
      mk_monthly_price: session.monthly_price?.toString() || "",
      mk_onb_estimated_deal_size: session.estimated_deal_size || "",
    };

    // Check for security escalation flags
    const flags = session.flags || {};
    hubspotProperties.mk_flag_security_remediation = flags.flag_security_remediation ? "true" : "false";
    hubspotProperties.mk_flag_compliance = flags.flag_compliance ? "true" : "false";
    hubspotProperties.mk_flag_infra_assessment = flags.flag_infra_assessment ? "true" : "false";
    hubspotProperties.mk_flag_cloud_strategy = flags.flag_cloud_strategy ? "true" : "false";
    hubspotProperties.mk_flag_cost_optimization = flags.flag_cost_optimization ? "true" : "false";
    hubspotProperties.mk_flag_growth_enablement = flags.flag_growth_enablement ? "true" : "false";

    // Create or update HubSpot contact
    // First try to find existing contact by email
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
      // Update existing contact
      contactId = searchData.results[0].id;
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: hubspotProperties }),
      });
    } else {
      // Create new contact
      const createRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: hubspotProperties }),
      });
      const createData = await createRes.json();
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
