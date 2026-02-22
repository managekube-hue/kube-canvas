import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const EPSS_API = 'https://api.first.org/data/v1/epss'
const CISA_KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'
const NVD_API = 'https://services.nvd.nist.gov/rest/json/cves/2.0'
const CVE_ORG_API = 'https://cveawg.mitre.org/api/cve'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const startTime = Date.now()
  console.log('🚀 Starting threat feed sync...')

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    let totalUpserted = 0

    // ========================================
    // STEP 1: Sync CISA KEV (all actively exploited vulns)
    // ========================================
    console.log('📥 Syncing CISA KEV...')
    let kevCount = 0
    try {
      const kevRes = await fetch(CISA_KEV_URL)
      if (!kevRes.ok) throw new Error(`KEV HTTP ${kevRes.status}`)
      const kevData = await kevRes.json()
      const kevVulns = kevData.vulnerabilities || []
      console.log(`  Found ${kevVulns.length} KEV entries`)

      // Batch upsert in chunks of 50
      for (let i = 0; i < kevVulns.length; i += 50) {
        const batch = kevVulns.slice(i, i + 50).map((kev: any) => ({
          cve_id: kev.cveID,
          description: kev.shortDescription || `Known exploited vulnerability in ${kev.product} by ${kev.vendorProject}`,
          published_date: kev.dateAdded || null,
          vendor: kev.vendorProject || 'Unknown',
          product: kev.product || 'Unknown',
          is_kev: true,
          kev_added_date: kev.dateAdded || null,
          kev_due_date: kev.dueDate || null,
          kev_known_ransomware: kev.knownRansomwareCampaignUse === 'Known',
          kev_notes: kev.notes || kev.requiredAction || null,
          urgency_level: 'Critical',
          plain_english_summary: kev.shortDescription || `${kev.vendorProject} ${kev.product} has an actively exploited vulnerability. ${kev.requiredAction || 'Patch immediately.'}`,
        }))

        const { error } = await supabase
          .from('threat_intel')
          .upsert(batch, { onConflict: 'cve_id', ignoreDuplicates: false })

        if (error) console.error(`  KEV batch error:`, error.message)
        else kevCount += batch.length
      }
      console.log(`  ✅ KEV: ${kevCount} upserted`)
    } catch (e) {
      console.error('  ❌ KEV sync failed:', e.message)
    }
    totalUpserted += kevCount

    // ========================================
    // STEP 2: Fetch recent CVEs from NVD API (last 30 days)
    // ========================================
    console.log('📥 Syncing NVD recent CVEs...')
    let nvdCount = 0
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const pubStartDate = thirtyDaysAgo.toISOString().replace('Z', '')
      const pubEndDate = new Date().toISOString().replace('Z', '')

      let startIndex = 0
      const resultsPerPage = 200
      let totalResults = 1 // will be set from response

      while (startIndex < totalResults && startIndex < 2000) {
        const url = `${NVD_API}?pubStartDate=${pubStartDate}&pubEndDate=${pubEndDate}&resultsPerPage=${resultsPerPage}&startIndex=${startIndex}`
        console.log(`  Fetching NVD page at index ${startIndex}...`)

        const nvdRes = await fetch(url)
        if (!nvdRes.ok) {
          console.error(`  NVD HTTP ${nvdRes.status}`)
          break
        }

        const nvdData = await nvdRes.json()
        totalResults = nvdData.totalResults || 0
        const vulns = nvdData.vulnerabilities || []

        if (vulns.length === 0) break

        const batch = vulns.map((v: any) => {
          const cve = v.cve
          const desc = cve.descriptions?.find((d: any) => d.lang === 'en')?.value || ''
          let cvssV3 = null, cvssV2 = null, severity = 'UNKNOWN'

          const metrics = cve.metrics
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

          // Extract vendor/product from CPE
          let vendor = 'Unknown', product = 'Unknown'
          try {
            const cpeMatch = cve.configurations?.[0]?.nodes?.[0]?.cpeMatch?.[0]?.criteria || ''
            const parts = cpeMatch.split(':')
            if (parts.length > 3) vendor = parts[3]
            if (parts.length > 4) product = parts[4]
          } catch {}

          return {
            cve_id: cve.id,
            description: desc,
            published_date: cve.published?.split('T')[0] || null,
            last_modified_date: cve.lastModified?.split('T')[0] || null,
            cvss_v3_score: cvssV3,
            cvss_v2_score: cvssV2,
            cvss_severity: severity.toUpperCase(),
            vendor,
            product,
            plain_english_summary: desc.length > 200 ? desc.substring(0, 200) + '...' : desc,
          }
        })

        const { error } = await supabase
          .from('threat_intel')
          .upsert(batch, { onConflict: 'cve_id', ignoreDuplicates: false })

        if (error) console.error(`  NVD batch error:`, error.message)
        else nvdCount += batch.length

        startIndex += resultsPerPage

        // Respect NVD rate limit (5 req / 30s without API key)
        await new Promise(r => setTimeout(r, 6500))
      }
      console.log(`  ✅ NVD: ${nvdCount} CVEs synced`)
    } catch (e) {
      console.error('  ❌ NVD sync failed:', e.message)
    }
    totalUpserted += nvdCount

    // ========================================
    // STEP 3: Enrich with EPSS scores (bulk)
    // ========================================
    console.log('📥 Syncing EPSS scores...')
    let epssCount = 0
    try {
      // Get all CVE IDs from our DB that lack EPSS
      const { data: missingEpss } = await supabase
        .from('threat_intel')
        .select('cve_id')
        .is('epss_score', null)
        .limit(1000)

      if (missingEpss && missingEpss.length > 0) {
        // Batch EPSS lookups in groups of 100
        for (let i = 0; i < missingEpss.length; i += 100) {
          const batch = missingEpss.slice(i, i + 100)
          const ids = batch.map(r => r.cve_id).join(',')

          try {
            const epssRes = await fetch(`${EPSS_API}?cve=${ids}`)
            if (epssRes.ok) {
              const epssData = await epssRes.json()
              for (const entry of epssData.data || []) {
                const epssScore = parseFloat(entry.epss)
                const percentile = parseFloat(entry.percentile)

                // Calculate risk score
                const { data: existing } = await supabase
                  .from('threat_intel')
                  .select('cvss_v3_score, is_kev')
                  .eq('cve_id', entry.cve)
                  .maybeSingle()

                const cvss = existing?.cvss_v3_score || 5
                let riskScore = (epssScore * 10 * 0.4) + (cvss * 0.6)
                if (existing?.is_kev) riskScore = Math.min(10, riskScore * 1.3)

                await supabase
                  .from('threat_intel')
                  .update({
                    epss_score: epssScore,
                    epss_percentile: percentile,
                    epss_updated_date: new Date().toISOString().split('T')[0],
                    risk_score: Math.round(riskScore * 100) / 100,
                  })
                  .eq('cve_id', entry.cve)

                epssCount++
              }
            }
          } catch (e) {
            console.error(`  EPSS batch error:`, e.message)
          }

          await new Promise(r => setTimeout(r, 200))
        }
      }

      // Also fetch top EPSS CVEs that might not be in our DB yet
      try {
        const topEpssRes = await fetch(`${EPSS_API}?order=!epss&limit=200`)
        if (topEpssRes.ok) {
          const topEpssData = await topEpssRes.json()
          for (const entry of topEpssData.data || []) {
            const { data: exists } = await supabase
              .from('threat_intel')
              .select('id')
              .eq('cve_id', entry.cve)
              .maybeSingle()

            if (!exists) {
              // Insert with EPSS data, fetch description from CVE.org
              let desc = '', vendor = 'Unknown', product = 'Unknown', cvss = 0
              try {
                const cveRes = await fetch(`${CVE_ORG_API}/${entry.cve}`)
                if (cveRes.ok) {
                  const cveData = await cveRes.json()
                  const cna = cveData.containers?.cna
                  desc = cna?.descriptions?.find((d: any) => d.lang === 'en')?.value || ''
                  const affected = cna?.affected?.[0]
                  vendor = affected?.vendor || 'Unknown'
                  product = affected?.product || 'Unknown'
                  for (const m of cna?.metrics || []) {
                    if (m.cvssV3_1?.baseScore) { cvss = m.cvssV3_1.baseScore; break }
                    if (m.cvssV3_0?.baseScore) { cvss = m.cvssV3_0.baseScore; break }
                  }
                } else {
                  await cveRes.text() // consume body
                }
              } catch {}

              const epssScore = parseFloat(entry.epss)
              let riskScore = (epssScore * 10 * 0.4) + ((cvss || 5) * 0.6)
              let severity = 'UNKNOWN'
              if (cvss >= 9) severity = 'CRITICAL'
              else if (cvss >= 7) severity = 'HIGH'
              else if (cvss >= 4) severity = 'MEDIUM'
              else if (cvss > 0) severity = 'LOW'

              await supabase.from('threat_intel').upsert({
                cve_id: entry.cve,
                description: desc,
                epss_score: epssScore,
                epss_percentile: parseFloat(entry.percentile),
                epss_updated_date: new Date().toISOString().split('T')[0],
                cvss_v3_score: cvss || null,
                cvss_severity: severity,
                risk_score: Math.round(riskScore * 100) / 100,
                vendor,
                product,
                plain_english_summary: desc.length > 200 ? desc.substring(0, 200) + '...' : desc,
              }, { onConflict: 'cve_id' })

              epssCount++
              // Rate limit CVE.org calls
              await new Promise(r => setTimeout(r, 300))
            }
          }
        }
      } catch (e) {
        console.error('  Top EPSS fetch error:', e.message)
      }

      console.log(`  ✅ EPSS: ${epssCount} scores updated/added`)
    } catch (e) {
      console.error('  ❌ EPSS sync failed:', e.message)
    }
    totalUpserted += epssCount

    // ========================================
    // STEP 4: Update sync metadata
    // ========================================
    const duration = Date.now() - startTime
    await supabase
      .from('sync_metadata')
      .update({
        last_sync: new Date().toISOString(),
        sync_status: 'success',
        records_updated: totalUpserted,
        sync_duration_ms: duration,
        error_message: null,
      })
      .eq('id', 1)

    console.log(`✅ Sync complete in ${duration}ms — ${totalUpserted} records`)

    return new Response(JSON.stringify({
      success: true,
      stats: { kev: kevCount, nvd: nvdCount, epss: epssCount, total: totalUpserted, duration_ms: duration },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('❌ Fatal sync error:', error)
    try {
      await supabase.from('sync_metadata').update({
        last_sync: new Date().toISOString(),
        sync_status: 'failed',
        error_message: error.message,
        sync_duration_ms: Date.now() - startTime,
      }).eq('id', 1)
    } catch {}

    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
