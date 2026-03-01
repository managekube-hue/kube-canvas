import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const results = {
    cms_contacts_synced: 0,
    assessment_leads_synced: 0,
    lead_exports_synced: 0,
    orgs_created: 0,
    errors: [] as string[],
  }

  try {
    // ── 1. Sync cms_contacts → crm_contacts ──────────────────────
    // Get all CRM contact emails for dedup
    const { data: crmEmails } = await supabase
      .from('crm_contacts')
      .select('email')
    const existingEmails = new Set(
      (crmEmails || []).map((c: any) => c.email?.toLowerCase()).filter(Boolean)
    )

    // Get recent cms_contacts not yet imported (last 24h to avoid full table scan)
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: cmsContacts } = await supabase
      .from('cms_contacts')
      .select('id, first_name, last_name, email, phone, company, job_title, source, lifecycle_stage, mk_recommended_tier, mk_ems_score, mk_monthly_price, created_at')
      .gte('created_at', cutoff)
      .order('created_at', { ascending: false })
      .limit(200)

    for (const lead of (cmsContacts || [])) {
      if (!lead.email || existingEmails.has(lead.email.toLowerCase())) continue

      // Create org if company provided
      let orgId: string | null = null
      if (lead.company) {
        const { data: existingOrg } = await supabase
          .from('crm_organizations')
          .select('id')
          .ilike('name', lead.company)
          .maybeSingle()

        if (existingOrg) {
          orgId = existingOrg.id
        } else {
          const { data: newOrg } = await supabase
            .from('crm_organizations')
            .insert({ name: lead.company, type: 'prospect', status: 'active' })
            .select('id')
            .single()
          if (newOrg) {
            orgId = newOrg.id
            results.orgs_created++
          }
        }
      }

      const { error } = await supabase.from('crm_contacts').insert({
        first_name: lead.first_name || lead.email.split('@')[0],
        last_name: lead.last_name || null,
        email: lead.email,
        phone: lead.phone || null,
        job_title: lead.job_title || null,
        organization_id: orgId,
        source: lead.source || 'website',
        lifecycle_stage: lead.lifecycle_stage || 'lead',
        lead_score: lead.mk_ems_score || 0,
      })

      if (error) {
        results.errors.push(`cms_contact ${lead.email}: ${error.message}`)
      } else {
        results.cms_contacts_synced++
        existingEmails.add(lead.email.toLowerCase())
      }
    }

    // ── 2. Sync assessment_sessions → crm_contacts ───────────────
    const { data: sessions } = await supabase
      .from('assessment_sessions')
      .select('id, first_name, last_name, email, phone, company, industry, recommended_tier, ems_score, status')
      .eq('status', 'completed')
      .gte('completed_at', cutoff)
      .limit(100)

    for (const session of (sessions || [])) {
      if (!session.email || existingEmails.has(session.email.toLowerCase())) continue

      let orgId: string | null = null
      if (session.company) {
        const { data: existingOrg } = await supabase
          .from('crm_organizations')
          .select('id')
          .ilike('name', session.company)
          .maybeSingle()

        if (existingOrg) {
          orgId = existingOrg.id
        } else {
          const { data: newOrg } = await supabase
            .from('crm_organizations')
            .insert({
              name: session.company,
              type: 'prospect',
              status: 'active',
              industry: session.industry || null,
            })
            .select('id')
            .single()
          if (newOrg) {
            orgId = newOrg.id
            results.orgs_created++
          }
        }
      }

      const { error } = await supabase.from('crm_contacts').insert({
        first_name: session.first_name || session.email.split('@')[0],
        last_name: session.last_name || null,
        email: session.email,
        phone: session.phone || null,
        organization_id: orgId,
        source: 'assessment',
        lifecycle_stage: 'mql', // assessments auto-qualify
        lead_score: session.ems_score || 0,
      })

      if (error) {
        results.errors.push(`assessment ${session.email}: ${error.message}`)
      } else {
        results.assessment_leads_synced++
        existingEmails.add(session.email.toLowerCase())
      }
    }

    // ── 3. Sync lead_exports (ThreatAI exports) → crm_contacts ──
    const { data: leadExports } = await supabase
      .from('lead_exports')
      .select('id, email, first_name, business_name, role, created_at')
      .gte('created_at', cutoff)
      .limit(100)

    for (const le of (leadExports || [])) {
      if (!le.email || existingEmails.has(le.email.toLowerCase())) continue

      let orgId: string | null = null
      if (le.business_name) {
        const { data: existingOrg } = await supabase
          .from('crm_organizations')
          .select('id')
          .ilike('name', le.business_name)
          .maybeSingle()

        if (existingOrg) {
          orgId = existingOrg.id
        } else {
          const { data: newOrg } = await supabase
            .from('crm_organizations')
            .insert({ name: le.business_name, type: 'prospect', status: 'active' })
            .select('id')
            .single()
          if (newOrg) {
            orgId = newOrg.id
            results.orgs_created++
          }
        }
      }

      const { error } = await supabase.from('crm_contacts').insert({
        first_name: le.first_name || le.email.split('@')[0],
        email: le.email,
        job_title: le.role || null,
        organization_id: orgId,
        source: 'threat-ai-export',
        lifecycle_stage: 'lead',
      })

      if (error) {
        results.errors.push(`lead_export ${le.email}: ${error.message}`)
      } else {
        results.lead_exports_synced++
        existingEmails.add(le.email.toLowerCase())
      }
    }

    // ── 4. Log a CRM activity for the sync run ──────────────────
    const totalSynced = results.cms_contacts_synced + results.assessment_leads_synced + results.lead_exports_synced
    if (totalSynced > 0) {
      await supabase.from('crm_activities').insert({
        type: 'system',
        subject: `Auto-sync: ${totalSynced} new contacts imported`,
        body: JSON.stringify(results),
        is_internal: true,
      })
    }

    console.log('CRM sync monitor complete:', results)

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('CRM sync monitor error:', err)
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
