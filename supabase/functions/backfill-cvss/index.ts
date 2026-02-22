import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const NVD_API = 'https://services.nvd.nist.gov/rest/json/cves/2.0'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    // Get KEV entries missing CVSS scores (small batch to avoid timeout)
    const { data: missing } = await supabase
      .from('threat_intel')
      .select('cve_id')
      .eq('is_kev', true)
      .is('cvss_v3_score', null)
      .is('cvss_v2_score', null)
      .limit(8)

    if (!missing || missing.length === 0) {
      return new Response(JSON.stringify({ message: 'All KEV entries have CVSS scores', updated: 0, remaining: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Check how many total are missing
    const { count: totalMissing } = await supabase
      .from('threat_intel')
      .select('*', { count: 'exact', head: true })
      .eq('is_kev', true)
      .is('cvss_v3_score', null)
      .is('cvss_v2_score', null)

    let updated = 0

    for (const row of missing) {
      try {
        const nvdRes = await fetch(`${NVD_API}?cveId=${row.cve_id}`)
        if (nvdRes.ok) {
          const nvdData = await nvdRes.json()
          const vuln = nvdData.vulnerabilities?.[0]?.cve
          if (vuln) {
            let cvssV3: number | null = null, cvssV2: number | null = null, severity = 'UNKNOWN'
            const metrics = vuln.metrics
            if (metrics?.cvssMetricV31?.[0]) {
              cvssV3 = metrics.cvssMetricV31[0].cvssData?.baseScore
              severity = metrics.cvssMetricV31[0].cvssData?.baseSeverity || 'UNKNOWN'
            } else if (metrics?.cvssMetricV30?.[0]) {
              cvssV3 = metrics.cvssMetricV30[0].cvssData?.baseScore
              severity = metrics.cvssMetricV30[0].cvssData?.baseSeverity || 'UNKNOWN'
            } else if (metrics?.cvssMetricV2?.[0]) {
              cvssV2 = metrics.cvssMetricV2[0].cvssData?.baseScore
              const s = cvssV2 || 0
              if (s >= 7) severity = 'HIGH'
              else if (s >= 4) severity = 'MEDIUM'
              else if (s > 0) severity = 'LOW'
            }

            // Get NVD description too
            const desc = vuln.descriptions?.find((d: any) => d.lang === 'en')?.value || ''

            // Extract vendor/product from CPE
            let vendor = null, product = null
            try {
              const cpeMatch = vuln.configurations?.[0]?.nodes?.[0]?.cpeMatch?.[0]?.criteria || ''
              const parts = cpeMatch.split(':')
              if (parts.length > 3 && parts[3] !== '*') vendor = parts[3]
              if (parts.length > 4 && parts[4] !== '*') product = parts[4]
            } catch {}

            const updateData: Record<string, any> = {}
            if (cvssV3) { updateData.cvss_v3_score = cvssV3 }
            if (cvssV2) { updateData.cvss_v2_score = cvssV2 }
            if (severity !== 'UNKNOWN') { updateData.cvss_severity = severity.toUpperCase() }
            if (desc) { updateData.description = desc }
            if (vendor) { updateData.vendor = vendor }
            if (product) { updateData.product = product }

            // Recalculate risk score
            const cvss = cvssV3 || cvssV2 || 5
            const { data: existing } = await supabase
              .from('threat_intel')
              .select('epss_score')
              .eq('cve_id', row.cve_id)
              .maybeSingle()
            const epss = existing?.epss_score || 0.5
            updateData.risk_score = Math.round(Math.min(10, ((epss * 10 * 0.4) + (cvss * 0.6)) * 1.3) * 100) / 100

            if (Object.keys(updateData).length > 0) {
              await supabase.from('threat_intel').update(updateData).eq('cve_id', row.cve_id)
              updated++
              console.log(`✅ ${row.cve_id}: CVSS ${cvssV3 || cvssV2} (${severity})`)
            }
          }
        } else {
          await nvdRes.text()
          console.log(`⚠️ ${row.cve_id}: NVD returned ${nvdRes.status}`)
        }
      } catch (e) {
        console.error(`❌ ${row.cve_id}:`, e.message)
      }
      // NVD rate limit
      await new Promise(r => setTimeout(r, 6500))
    }

    const remaining = (totalMissing || 0) - updated
    console.log(`Done: ${updated} updated, ~${remaining} remaining`)

    return new Response(JSON.stringify({ 
      updated, 
      remaining,
      message: remaining > 0 ? `Call again to continue backfilling (${remaining} remaining)` : 'All done!'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Fatal error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
