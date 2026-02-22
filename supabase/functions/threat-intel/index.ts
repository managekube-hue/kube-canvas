import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// CISA Known Exploited Vulnerabilities feed (free, no key)
const CISA_KEV_URL =
  "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";

// FIRST EPSS API (free, no key)
const EPSS_API_URL = "https://api.first.org/data/v1/epss";

// NVD CVE API 2.0 (free, rate-limited to ~5 req/30s without key)
const NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tab, query } = await req.json().catch(() => ({ tab: "trend", query: "" }));

    console.log(`Threat intel request: tab=${tab}, query=${query}`);

    // 1. Fetch CISA KEV (always needed for trend + exploits tabs)
    let kevVulns: any[] = [];
    try {
      const kevRes = await fetch(CISA_KEV_URL);
      if (kevRes.ok) {
        const kevData = await kevRes.json();
        // Get the most recent 30 KEV entries
        kevVulns = (kevData.vulnerabilities || [])
          .sort((a: any, b: any) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
          .slice(0, 30);
        console.log(`Fetched ${kevVulns.length} KEV entries`);
      } else {
        console.error("CISA KEV fetch failed:", kevRes.status);
      }
    } catch (e) {
      console.error("CISA KEV error:", e);
    }

    // 2. Get CVE IDs for EPSS lookup
    const cveIds = kevVulns.map((v: any) => v.cveID);

    // 3. Fetch EPSS scores for these CVEs
    let epssMap: Record<string, number> = {};
    if (cveIds.length > 0) {
      try {
        // EPSS API accepts comma-separated CVE IDs
        const epssRes = await fetch(
          `${EPSS_API_URL}?cve=${cveIds.join(",")}`
        );
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

    // 4. Fetch NVD details for top CVEs (rate-limited, so batch carefully)
    // We'll fetch details for the top 15 to stay within rate limits
    const topCveIds = cveIds.slice(0, 15);
    let nvdMap: Record<string, { description: string; cvss: number }> = {};

    for (const cveId of topCveIds) {
      try {
        const nvdRes = await fetch(`${NVD_API_URL}?cveId=${cveId}`);
        if (nvdRes.ok) {
          const nvdData = await nvdRes.json();
          const vuln = nvdData.vulnerabilities?.[0]?.cve;
          if (vuln) {
            const desc =
              vuln.descriptions?.find((d: any) => d.lang === "en")?.value || "";

            // Extract CVSS score (try v3.1 first, then v3.0, then v2)
            let cvss = 0;
            const metrics = vuln.metrics;
            if (metrics?.cvssMetricV31?.[0]) {
              cvss = metrics.cvssMetricV31[0].cvssData?.baseScore || 0;
            } else if (metrics?.cvssMetricV30?.[0]) {
              cvss = metrics.cvssMetricV30[0].cvssData?.baseScore || 0;
            } else if (metrics?.cvssMetricV2?.[0]) {
              cvss = metrics.cvssMetricV2[0].cvssData?.baseScore || 0;
            }

            nvdMap[cveId] = { description: desc, cvss };
          }
        }
        // Small delay to respect NVD rate limits
        await new Promise((r) => setTimeout(r, 400));
      } catch (e) {
        console.error(`NVD error for ${cveId}:`, e);
      }
    }

    console.log(`Fetched NVD details for ${Object.keys(nvdMap).length} CVEs`);

    // 5. Combine into ThreatCve objects
    const threats: ThreatCve[] = kevVulns.map((kev: any) => {
      const cveId = kev.cveID;
      const nvd = nvdMap[cveId];
      const epss = epssMap[cveId] || 0;
      const cvss = nvd?.cvss || 0;
      const description = nvd?.description || kev.shortDescription || "";

      // Generate a plain-English summary from the KEV data
      const action = kev.requiredAction || "Apply vendor patches";
      const plainEnglish = kev.shortDescription
        ? kev.shortDescription
        : `${kev.vulnerabilityName} — ${action}`;

      return {
        id: cveId,
        name: kev.vulnerabilityName || cveId,
        description,
        plainEnglish,
        cvss,
        epss,
        severity: cvssToSeverity(cvss),
        published: kev.dateAdded || "",
        activelyExploited: true, // All KEV entries are actively exploited
        cisaKev: true,
        cisaDateAdded: kev.dateAdded,
        cisaDueDate: kev.dueDate,
        ransomwareUse: kev.knownRansomwareCampaignUse === "Known",
        vendor: kev.vendorProject || "Unknown",
        product: kev.product || "Unknown",
      };
    });

    // 6. Handle search tab — query NVD directly
    let searchResults: ThreatCve[] = [];
    if (tab === "search" && query) {
      try {
        // Check if query is a CVE ID
        const isCveId = /^CVE-\d{4}-\d+$/i.test(query.trim());
        let nvdUrl = isCveId
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

            const desc =
              vuln.descriptions?.find((d: any) => d.lang === "en")?.value || "";
            let cvss = 0;
            const metrics = vuln.metrics;
            if (metrics?.cvssMetricV31?.[0]) {
              cvss = metrics.cvssMetricV31[0].cvssData?.baseScore || 0;
            } else if (metrics?.cvssMetricV30?.[0]) {
              cvss = metrics.cvssMetricV30[0].cvssData?.baseScore || 0;
            } else if (metrics?.cvssMetricV2?.[0]) {
              cvss = metrics.cvssMetricV2[0].cvssData?.baseScore || 0;
            }

            const isKev = cveIds.includes(id);
            const kevEntry = isKev
              ? kevVulns.find((k: any) => k.cveID === id)
              : null;

            searchResults.push({
              id,
              name: vuln.id,
              description: desc,
              plainEnglish: desc.length > 150 ? desc.substring(0, 150) + "..." : desc,
              cvss,
              epss: 0, // will fill below
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
              const epssRes2 = await fetch(
                `${EPSS_API_URL}?cve=${searchCveIds.join(",")}`
              );
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
    }

    // 7. Compute stats
    const stats = {
      totalActiveExploits: kevVulns.length > 30 ? kevVulns.length : threats.length,
      newCritical: threats.filter((t) => t.severity === "CRITICAL").length,
      newHigh: threats.filter((t) => t.severity === "HIGH").length,
      newMedium: threats.filter((t) => t.severity === "MEDIUM" || t.severity === "LOW").length,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    return new Response(
      JSON.stringify({
        threats,
        searchResults,
        stats,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Threat intel error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
