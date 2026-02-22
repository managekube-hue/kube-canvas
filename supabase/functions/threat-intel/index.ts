import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const EPSS_API_URL = "https://api.first.org/data/v1/epss";
const CVE_ORG_API = "https://cveawg.mitre.org/api/cve";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tab, query, page, pageSize } = await req.json().catch(() => ({
      tab: "trend", query: "", page: 0, pageSize: 50
    }));

    console.log(`Threat intel request: tab=${tab}, query=${query}, page=${page}`);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const offset = (page || 0) * (pageSize || 50);
    const limit = Math.min(pageSize || 50, 100);

    // Get sync status
    const { data: syncMeta } = await supabase
      .from('sync_metadata')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    // Get total count
    const { count: totalCount } = await supabase
      .from('threat_intel')
      .select('*', { count: 'exact', head: true });

    let threats: any[] = [];
    let searchResults: any[] = [];
    let totalSearchResults = 0;

    if (tab === "trend") {
      // Top threats by risk score, then CVSS, showing ALL data
      const { data } = await supabase
        .from('threat_intel')
        .select('*')
        .order('risk_score', { ascending: false, nullsFirst: false })
        .order('cvss_v3_score', { ascending: false, nullsFirst: false })
        .range(offset, offset + limit - 1);
      threats = data || [];

    } else if (tab === "exploits") {
      // CISA KEV entries
      const { data } = await supabase
        .from('threat_intel')
        .select('*')
        .eq('is_kev', true)
        .order('kev_added_date', { ascending: false })
        .range(offset, offset + limit - 1);
      threats = data || [];

    } else if (tab === "map") {
      // All CVEs with both CVSS and EPSS for scatter plot
      const { data } = await supabase
        .from('threat_intel')
        .select('cve_id, cvss_v3_score, epss_score, cvss_severity, vendor, product')
        .not('cvss_v3_score', 'is', null)
        .not('epss_score', 'is', null)
        .order('risk_score', { ascending: false })
        .limit(500);
      threats = data || [];

    } else if (tab === "search" && query) {
      const q = query.trim();
      const isCveId = /^CVE-\d{4}-\d+$/i.test(q);

      if (isCveId) {
        // Exact CVE lookup from DB
        const { data } = await supabase
          .from('threat_intel')
          .select('*')
          .eq('cve_id', q.toUpperCase());

        if (data && data.length > 0) {
          searchResults = data;
          totalSearchResults = data.length;
        } else {
          // Not in DB — try CVE.org
          console.log('CVE not in DB, trying CVE.org...');
          const cveOrgResult = await fetchFromCveOrg(q.toUpperCase());
          if (cveOrgResult) {
            searchResults = [cveOrgResult];
            totalSearchResults = 1;
          }
        }
      } else {
        // Full text search
        const { data, count } = await supabase
          .from('threat_intel')
          .select('*', { count: 'exact' })
          .textSearch('search_vector', q.split(/\s+/).join(' & '))
          .order('risk_score', { ascending: false })
          .range(offset, offset + limit - 1);

        if (data && data.length > 0) {
          searchResults = data;
          totalSearchResults = count || data.length;
        } else {
          // Try ilike fallback
          const { data: ilikeData, count: ilikeCount } = await supabase
            .from('threat_intel')
            .select('*', { count: 'exact' })
            .or(`vendor.ilike.%${q}%,product.ilike.%${q}%,description.ilike.%${q}%`)
            .order('risk_score', { ascending: false })
            .range(offset, offset + limit - 1);

          searchResults = ilikeData || [];
          totalSearchResults = ilikeCount || 0;
        }
      }

    } else if (tab === "recent") {
      // Most recently published CVEs
      const { data } = await supabase
        .from('threat_intel')
        .select('*')
        .not('published_date', 'is', null)
        .order('published_date', { ascending: false })
        .range(offset, offset + limit - 1);
      threats = data || [];
    }

    // Convert DB format to frontend format
    const formatCve = (row: any) => ({
      id: row.cve_id,
      name: row.cve_id,
      description: row.description || '',
      plainEnglish: row.plain_english_summary || row.description || '',
      cvss: row.cvss_v3_score || row.cvss_v2_score || 0,
      epss: row.epss_score || 0,
      severity: row.cvss_severity || (row.cvss_v3_score >= 9 ? 'CRITICAL' : row.cvss_v3_score >= 7 ? 'HIGH' : row.cvss_v3_score >= 4 ? 'MEDIUM' : row.cvss_v3_score > 0 ? 'LOW' : 'UNKNOWN'),
      published: row.published_date || row.kev_added_date || '',
      activelyExploited: row.is_kev || false,
      cisaKev: row.is_kev || false,
      cisaDateAdded: row.kev_added_date,
      cisaDueDate: row.kev_due_date,
      cisaNotes: row.kev_notes || '',
      ransomwareUse: row.kev_known_ransomware || false,
      vendor: row.vendor || 'Unknown',
      product: row.product || 'Unknown',
      riskScore: row.risk_score || 0,
    });

    // Stats
    const { count: kevCount } = await supabase
      .from('threat_intel')
      .select('*', { count: 'exact', head: true })
      .eq('is_kev', true);

    const { count: critCount } = await supabase
      .from('threat_intel')
      .select('*', { count: 'exact', head: true })
      .eq('cvss_severity', 'CRITICAL');

    const { count: highCount } = await supabase
      .from('threat_intel')
      .select('*', { count: 'exact', head: true })
      .eq('cvss_severity', 'HIGH');

    const stats = {
      totalCves: totalCount || 0,
      totalActiveExploits: kevCount || 0,
      newCritical: critCount || 0,
      newHigh: highCount || 0,
      newMedium: (totalCount || 0) - (critCount || 0) - (highCount || 0),
      lastUpdated: syncMeta?.last_sync || new Date().toISOString(),
      syncStatus: syncMeta?.sync_status || 'never_run',
    };

    return new Response(
      JSON.stringify({
        threats: threats.map(formatCve),
        searchResults: searchResults.map(formatCve),
        totalSearchResults,
        stats,
        totalCount: totalCount || 0,
        page: page || 0,
        pageSize: limit,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Threat intel error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/** Fetch a single CVE from CVE.org and enrich with EPSS */
async function fetchFromCveOrg(cveId: string) {
  try {
    const res = await fetch(`${CVE_ORG_API}/${cveId}`);
    if (!res.ok) { await res.text(); return null; }

    const data = await res.json();
    const meta = data.cveMetadata;
    const cna = data.containers?.cna;
    if (!meta?.cveId || !cna) return null;

    const desc = cna.descriptions?.find((d: any) => d.lang === 'en')?.value || '';
    let cvss = 0;
    for (const m of cna.metrics || []) {
      if (m.cvssV3_1?.baseScore) { cvss = m.cvssV3_1.baseScore; break; }
      if (m.cvssV3_0?.baseScore) { cvss = m.cvssV3_0.baseScore; break; }
    }

    const affected = cna.affected?.[0];
    let severity = 'UNKNOWN';
    if (cvss >= 9) severity = 'CRITICAL';
    else if (cvss >= 7) severity = 'HIGH';
    else if (cvss >= 4) severity = 'MEDIUM';
    else if (cvss > 0) severity = 'LOW';

    // Get EPSS
    let epss = 0;
    try {
      const epssRes = await fetch(`${EPSS_API_URL}?cve=${cveId}`);
      if (epssRes.ok) {
        const epssData = await epssRes.json();
        if (epssData.data?.[0]) epss = parseFloat(epssData.data[0].epss);
      }
    } catch {}

    return {
      cve_id: cveId,
      description: desc,
      plain_english_summary: desc.length > 200 ? desc.substring(0, 200) + '...' : desc,
      cvss_v3_score: cvss || null,
      cvss_severity: severity,
      epss_score: epss,
      published_date: meta.datePublished?.split('T')[0] || '',
      vendor: affected?.vendor || 'See description',
      product: affected?.product || 'See description',
      is_kev: false,
      kev_known_ransomware: false,
    };
  } catch (e) {
    console.error('CVE.org fetch error:', e);
    return null;
  }
}
