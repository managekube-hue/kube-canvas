import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CISA_KEV_URL =
  "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";
const EPSS_API_URL = "https://api.first.org/data/v1/epss";
const NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const CVE_ORG_API = "https://cveawg.mitre.org/api/cve";

interface ThreatCve {
  id: string;
  name: string;
  description: string;
  plainEnglish: string;
  cvss: number;
  epss: number;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  published: string;
  activelyExploited: boolean;
  cisaKev: boolean;
  cisaDateAdded?: string;
  cisaDueDate?: string;
  ransomwareUse: boolean;
  vendor: string;
  product: string;
}

function cvssToSeverity(score: number): "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" {
  if (score >= 9.0) return "CRITICAL";
  if (score >= 7.0) return "HIGH";
  if (score >= 4.0) return "MEDIUM";
  return "LOW";
}

/** Extract CVSS from NVD metrics object */
function extractNvdCvss(metrics: any): number {
  if (metrics?.cvssMetricV31?.[0]) return metrics.cvssMetricV31[0].cvssData?.baseScore || 0;
  if (metrics?.cvssMetricV30?.[0]) return metrics.cvssMetricV30[0].cvssData?.baseScore || 0;
  if (metrics?.cvssMetricV2?.[0]) return metrics.cvssMetricV2[0].cvssData?.baseScore || 0;
  return 0;
}

/** Search CVE.org (MITRE) API — has the latest CVEs before NVD indexes them */
async function searchCveOrg(query: string): Promise<ThreatCve[]> {
  const results: ThreatCve[] = [];
  const isCveId = /^CVE-\d{4}-\d+$/i.test(query.trim());

  if (isCveId) {
    // Direct lookup
    try {
      const res = await fetch(`${CVE_ORG_API}/${query.trim().toUpperCase()}`);
      if (res.ok) {
        const data = await res.json();
        const cve = parseCveOrgEntry(data);
        if (cve) results.push(cve);
      }
    } catch (e) {
      console.error("CVE.org lookup error:", e);
    }
  } else {
    // Keyword search — CVE.org doesn't support keyword search well,
    // so we skip for non-CVE-ID queries
  }

  return results;
}

/** Parse a CVE.org (MITRE CNA) response into our ThreatCve format */
function parseCveOrgEntry(data: any): ThreatCve | null {
  try {
    const meta = data.cveMetadata;
    const cna = data.containers?.cna;
    if (!meta?.cveId || !cna) return null;

    const id = meta.cveId;
    const desc = cna.descriptions?.find((d: any) => d.lang === "en")?.value || "";

    // Extract CVSS from CNA metrics
    let cvss = 0;
    for (const m of cna.metrics || []) {
      if (m.cvssV3_1?.baseScore) { cvss = m.cvssV3_1.baseScore; break; }
      if (m.cvssV3_0?.baseScore) { cvss = m.cvssV3_0.baseScore; break; }
      if (m.cvssV4_0?.baseScore) { cvss = m.cvssV4_0.baseScore; break; }
    }

    // Extract vendor/product from affected
    const affected = cna.affected?.[0];
    const vendor = affected?.vendor || "See description";
    const product = affected?.product || "See description";

    const published = meta.datePublished?.split("T")[0] || meta.dateUpdated?.split("T")[0] || "";

    return {
      id,
      name: id,
      description: desc,
      plainEnglish: desc.length > 200 ? desc.substring(0, 200) + "..." : desc,
      cvss,
      epss: 0,
      severity: cvss > 0 ? cvssToSeverity(cvss) : "MEDIUM",
      published,
      activelyExploited: false,
      cisaKev: false,
      ransomwareUse: false,
      vendor,
      product,
    };
  } catch (e) {
    console.error("Parse CVE.org error:", e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tab, query } = await req.json().catch(() => ({ tab: "trend", query: "" }));
    console.log(`Threat intel request: tab=${tab}, query=${query}`);

    // 1. Fetch CISA KEV
    let kevVulns: any[] = [];
    try {
      const kevRes = await fetch(CISA_KEV_URL);
      if (kevRes.ok) {
        const kevData = await kevRes.json();
        kevVulns = (kevData.vulnerabilities || [])
          .sort((a: any, b: any) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
          .slice(0, 30);
        console.log(`Fetched ${kevVulns.length} KEV entries`);
      }
    } catch (e) {
      console.error("CISA KEV error:", e);
    }

    // 2. EPSS for KEV CVEs
    const cveIds = kevVulns.map((v: any) => v.cveID);
    let epssMap: Record<string, number> = {};
    if (cveIds.length > 0) {
      try {
        const epssRes = await fetch(`${EPSS_API_URL}?cve=${cveIds.join(",")}`);
        if (epssRes.ok) {
          const epssData = await epssRes.json();
          for (const entry of epssData.data || []) {
            epssMap[entry.cve] = parseFloat(entry.epss);
          }
          console.log(`Fetched EPSS for ${Object.keys(epssMap).length} CVEs`);
        }
      } catch (e) {
        console.error("EPSS error:", e);
      }
    }

    // 3. NVD details for top 15 KEV CVEs
    const topCveIds = cveIds.slice(0, 15);
    let nvdMap: Record<string, { description: string; cvss: number }> = {};
    for (const cveId of topCveIds) {
      try {
        const nvdRes = await fetch(`${NVD_API_URL}?cveId=${cveId}`);
        if (nvdRes.ok) {
          const nvdData = await nvdRes.json();
          const vuln = nvdData.vulnerabilities?.[0]?.cve;
          if (vuln) {
            const desc = vuln.descriptions?.find((d: any) => d.lang === "en")?.value || "";
            const cvss = extractNvdCvss(vuln.metrics);
            nvdMap[cveId] = { description: desc, cvss };
          }
        }
        await new Promise((r) => setTimeout(r, 400));
      } catch (e) {
        console.error(`NVD error for ${cveId}:`, e);
      }
    }
    console.log(`Fetched NVD details for ${Object.keys(nvdMap).length} CVEs`);

    // 4. Build threat objects
    const threats: ThreatCve[] = kevVulns.map((kev: any) => {
      const cveId = kev.cveID;
      const nvd = nvdMap[cveId];
      const epss = epssMap[cveId] || 0;
      const cvss = nvd?.cvss || 0;
      const description = nvd?.description || kev.shortDescription || "";
      const plainEnglish = kev.shortDescription || `${kev.vulnerabilityName} — ${kev.requiredAction || "Apply vendor patches"}`;

      return {
        id: cveId,
        name: kev.vulnerabilityName || cveId,
        description,
        plainEnglish,
        cvss,
        epss,
        severity: cvssToSeverity(cvss),
        published: kev.dateAdded || "",
        activelyExploited: true,
        cisaKev: true,
        cisaDateAdded: kev.dateAdded,
        cisaDueDate: kev.dueDate,
        ransomwareUse: kev.knownRansomwareCampaignUse === "Known",
        vendor: kev.vendorProject || "Unknown",
        product: kev.product || "Unknown",
      };
    });

    // 5. Handle search — try NVD first, then CVE.org as fallback
    let searchResults: ThreatCve[] = [];
    if (tab === "search" && query) {
      const isCveId = /^CVE-\d{4}-\d+$/i.test(query.trim());

      // Try NVD first
      try {
        const nvdUrl = isCveId
          ? `${NVD_API_URL}?cveId=${query.trim().toUpperCase()}`
          : `${NVD_API_URL}?keywordSearch=${encodeURIComponent(query)}&resultsPerPage=10`;

        const searchRes = await fetch(nvdUrl);
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          const searchCveIds: string[] = [];

          for (const v of searchData.vulnerabilities || []) {
            const vuln = v.cve;
            const id = vuln.id;
            searchCveIds.push(id);
            const desc = vuln.descriptions?.find((d: any) => d.lang === "en")?.value || "";
            const cvss = extractNvdCvss(vuln.metrics);
            const isKev = cveIds.includes(id);
            const kevEntry = isKev ? kevVulns.find((k: any) => k.cveID === id) : null;

            searchResults.push({
              id,
              name: vuln.id,
              description: desc,
              plainEnglish: desc.length > 150 ? desc.substring(0, 150) + "..." : desc,
              cvss,
              epss: 0,
              severity: cvssToSeverity(cvss),
              published: vuln.published?.split("T")[0] || "",
              activelyExploited: isKev,
              cisaKev: isKev,
              cisaDateAdded: kevEntry?.dateAdded,
              cisaDueDate: kevEntry?.dueDate,
              ransomwareUse: kevEntry?.knownRansomwareCampaignUse === "Known" || false,
              vendor: "See description",
              product: "See description",
            });
          }

          // Fetch EPSS for search results
          if (searchCveIds.length > 0) {
            try {
              const epssRes2 = await fetch(`${EPSS_API_URL}?cve=${searchCveIds.join(",")}`);
              if (epssRes2.ok) {
                const epssData2 = await epssRes2.json();
                for (const entry of epssData2.data || []) {
                  const found = searchResults.find((r) => r.id === entry.cve);
                  if (found) found.epss = parseFloat(entry.epss);
                }
              }
            } catch (e) {
              console.error("EPSS search error:", e);
            }
          }
        }
      } catch (e) {
        console.error("NVD search error:", e);
      }

      // If NVD returned nothing, try CVE.org (MITRE) as fallback
      if (searchResults.length === 0) {
        console.log("NVD returned no results, trying CVE.org...");
        const cveOrgResults = await searchCveOrg(query);

        // Enrich with EPSS
        if (cveOrgResults.length > 0) {
          const ids = cveOrgResults.map(r => r.id);
          try {
            const epssRes = await fetch(`${EPSS_API_URL}?cve=${ids.join(",")}`);
            if (epssRes.ok) {
              const epssData = await epssRes.json();
              for (const entry of epssData.data || []) {
                const found = cveOrgResults.find(r => r.id === entry.cve);
                if (found) found.epss = parseFloat(entry.epss);
              }
            }
          } catch (e) {
            console.error("EPSS fallback error:", e);
          }

          // Check if in KEV
          for (const r of cveOrgResults) {
            const kevEntry = kevVulns.find((k: any) => k.cveID === r.id);
            if (kevEntry) {
              r.activelyExploited = true;
              r.cisaKev = true;
              r.cisaDateAdded = kevEntry.dateAdded;
              r.cisaDueDate = kevEntry.dueDate;
              r.ransomwareUse = kevEntry.knownRansomwareCampaignUse === "Known";
            }
          }

          searchResults = cveOrgResults;
          console.log(`CVE.org returned ${searchResults.length} results`);
        }
      }
    }

    // 6. Stats
    const stats = {
      totalActiveExploits: kevVulns.length > 30 ? kevVulns.length : threats.length,
      newCritical: threats.filter((t) => t.severity === "CRITICAL").length,
      newHigh: threats.filter((t) => t.severity === "HIGH").length,
      newMedium: threats.filter((t) => t.severity === "MEDIUM" || t.severity === "LOW").length,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    return new Response(
      JSON.stringify({ threats, searchResults, stats }),
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
