import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, first_name, business_name, role, export_data } = await req.json()

    if (!email || !first_name || !business_name || !role) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Save lead to DB
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    await supabase.from('lead_exports').insert({
      email,
      first_name,
      business_name,
      role,
    })

    // Also save to main leads table for unified pipeline
    await supabase.from('leads').insert({
      email,
      first_name,
      company: business_name,
      source: 'threat-ai-export',
    })

    // Generate CSV
    const headers = ['CVE ID', 'Description', 'CVSS', 'EPSS %', 'Severity', 'Risk Level', 'Published']
    const rows = (export_data || []).map((d: any) => [
      d.id || '',
      `"${(d.description || '').replace(/"/g, '""')}"`,
      d.cvss || '',
      d.epss ? (d.epss * 100).toFixed(2) : '',
      d.severity || '',
      d.epss > 0.7 ? 'Actively Exploited' : d.epss > 0.4 ? 'Likely Exploitable' : 'Low Likelihood',
      d.published || '',
    ].join(','))
    const csv = [headers.join(','), ...rows].join('\n')

    // Try HubSpot (if token exists)
    const hubspotToken = Deno.env.get('HUBSPOT_ACCESS_TOKEN')
    if (hubspotToken) {
      try {
        await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hubspotToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              email,
              firstname: first_name,
              company: business_name,
              jobtitle: role,
              hs_lead_status: 'NEW',
              lifecyclestage: 'lead',
            },
          }),
        })
      } catch (e) {
        console.error('HubSpot push failed (non-blocking):', e)
      }
    }

    return new Response(csv, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="threatai-report.csv"',
      },
    })
  } catch (err) {
    console.error('Export error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
