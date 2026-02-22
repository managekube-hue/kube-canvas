import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { email, first_name, last_name, business_name, role, phone, export_data } = body

    // Validate required fields
    const errors: string[] = []
    if (!email) errors.push('email')
    if (!first_name) errors.push('first_name')
    if (!business_name) errors.push('business_name')
    if (!role) errors.push('role')
    if (!export_data) errors.push('export_data')

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields', fields: errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Save lead to DB
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const ip_address = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip')
    const user_agent = req.headers.get('user-agent')

    const { data: lead, error: dbError } = await supabase
      .from('lead_exports')
      .insert({
        email,
        first_name,
        business_name,
        role,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
    }

    // Also save to main leads table for unified pipeline
    await supabase.from('leads').insert({
      email,
      first_name,
      last_name: last_name || null,
      company: business_name,
      phone: phone || null,
      source: 'threat-ai-export',
    })

    // Validate export_data
    if (!Array.isArray(export_data) || export_data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No data to export' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate CSV
    const headers = ['CVE ID', 'Description', 'CVSS', 'EPSS %', 'Severity', 'Risk Level', 'Published']
    const rows = export_data.map((d: any) => {
      const fields = [
        d.id || d.cve_id || '',
        (d.description || '').replace(/"/g, '""'),
        d.cvss || d.cvss_v3_score || '',
        d.epss ? (d.epss * 100).toFixed(2) : d.epss_score ? (d.epss_score * 100).toFixed(2) : '',
        d.severity || '',
        (d.epss || d.epss_score || 0) > 0.7 ? 'Actively Exploited' : (d.epss || d.epss_score || 0) > 0.4 ? 'Likely Exploitable' : 'Low Likelihood',
        d.published || '',
      ]
      return fields.map(f => {
        const s = String(f)
        if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s}"`
        return s
      }).join(',')
    })
    const csv = [headers.join(','), ...rows].join('\n')

    // Background HubSpot sync
    const hubspotToken = Deno.env.get('HUBSPOT_ACCESS_TOKEN')
    if (hubspotToken && lead) {
      EdgeRuntime.waitUntil(
        (async () => {
          try {
            // Search for existing contact
            const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${hubspotToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
              }),
            })
            const searchData = await searchRes.json()
            let contactId: string | undefined

            if (searchData.results && searchData.results.length > 0) {
              contactId = searchData.results[0].id
              await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${hubspotToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  properties: {
                    firstname: first_name,
                    lastname: last_name || '',
                    company: business_name,
                    jobtitle: role,
                    phone: phone || '',
                  },
                }),
              })
            } else {
              const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${hubspotToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  properties: {
                    email,
                    firstname: first_name,
                    lastname: last_name || '',
                    company: business_name,
                    jobtitle: role,
                    phone: phone || '',
                    hs_lead_status: 'NEW',
                    lifecyclestage: 'lead',
                  },
                }),
              })
              const createData = await createRes.json()
              contactId = createData.id
            }

            // Update DB with HubSpot ID
            if (contactId) {
              await supabase.from('lead_exports').update({
                hubspot_synced: true,
                hubspot_synced_at: new Date().toISOString(),
                hubspot_contact_id: contactId,
              }).eq('id', lead.id)
            }
          } catch (e) {
            console.error('HubSpot sync error:', e)
            await supabase.from('lead_exports').update({
              error_message: (e as Error).message,
            }).eq('id', lead.id)
          }
        })()
      )
    }

    // Return CSV
    const filename = `vulnerability_export_${new Date().toISOString().split('T')[0]}.csv`
    return new Response(csv, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    console.error('Export error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
