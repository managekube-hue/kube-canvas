import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    
    // Build email content based on alert type
    let subject = "";
    let html = "";

    switch (type) {
      case "new_contact":
        subject = `🔔 New Contact: ${data.first_name || ""} ${data.last_name || ""} — ${data.company || "Unknown"}`;
        html = `
          <h2>New Contact Submission</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.first_name || ""} ${data.last_name || ""}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${data.company || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Source</td><td style="padding:8px;border:1px solid #ddd">${data.source || "website"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message || "—"}</td></tr>
          </table>
        `;
        break;
      case "new_assessment":
        subject = `📊 New Assessment: ${data.first_name || ""} ${data.last_name || ""} — Tier: ${data.recommended_tier || "TBD"}`;
        html = `
          <h2>New Assessment Completed</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.first_name || ""} ${data.last_name || ""}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${data.company || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Tier</td><td style="padding:8px;border:1px solid #ddd">${data.recommended_tier || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">EMS Score</td><td style="padding:8px;border:1px solid #ddd">${data.ems_score ?? "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Monthly Price</td><td style="padding:8px;border:1px solid #ddd">$${data.monthly_price || "—"}</td></tr>
          </table>
        `;
        break;
      case "new_lead":
        subject = `🚀 New Lead: ${data.first_name || ""} — ${data.business_name || data.company || "Unknown"}`;
        html = `
          <h2>New Lead Captured</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.first_name || ""} ${data.last_name || ""}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Business</td><td style="padding:8px;border:1px solid #ddd">${data.business_name || data.company || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Role</td><td style="padding:8px;border:1px solid #ddd">${data.role || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Inquiry Type</td><td style="padding:8px;border:1px solid #ddd">${data.inquiry_type || "—"}</td></tr>
          </table>
        `;
        break;
      case "contributor_request":
        subject = `🧑‍💻 Contributor Application: ${data.name || ""} — ${data.area_of_interest || "General"}`;
        html = `
          <h2>New Contributor Application</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">GitHub</td><td style="padding:8px;border:1px solid #ddd">${data.github || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Area of Interest</td><td style="padding:8px;border:1px solid #ddd">${data.area_of_interest || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Motivation</td><td style="padding:8px;border:1px solid #ddd">${data.motivation || "—"}</td></tr>
          </table>
        `;
        break;
      default:
        subject = `ManageKube Alert`;
        html = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    // Send via Supabase Auth's built-in SMTP (Resend)
    // Since Resend is configured as SMTP in Supabase Auth, we call Resend API directly
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — alert not sent");
      return new Response(
        JSON.stringify({ success: false, message: "RESEND_API_KEY not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ManageKube Alerts <alerts@updates.managekube.com>",
        to: ["sunny@managekube.com"],
        subject,
        html,
      }),
    });

    const result = await res.json();
    console.log("Resend result:", result);

    return new Response(
      JSON.stringify({ success: res.ok, result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Alert error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
