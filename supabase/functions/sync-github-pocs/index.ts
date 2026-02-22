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

  const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // Get top CVEs by risk score that haven't been GitHub-checked recently
    const { data: topCVEs } = await supabase
      .from("threat_intel")
      .select("cve_id")
      .not("epss_score", "is", null)
      .order("epss_score", { ascending: false })
      .limit(20);

    if (!topCVEs || topCVEs.length === 0) {
      return new Response(JSON.stringify({ message: "No CVEs to check", count: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let totalFound = 0;

    for (const cve of topCVEs) {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
      };
      if (GITHUB_TOKEN) {
        headers.Authorization = `token ${GITHUB_TOKEN}`;
      }

      try {
        const res = await fetch(
          `https://api.github.com/search/repositories?q=${cve.cve_id}+poc+OR+exploit&sort=stars&per_page=10`,
          { headers }
        );

        if (!res.ok) {
          console.warn(`GitHub search failed for ${cve.cve_id}: ${res.status}`);
          await res.text();
          continue;
        }

        const data = await res.json();
        const repos = data.items || [];
        let pocCount = 0;
        let exploitCount = 0;

        for (const repo of repos) {
          const hasPoc =
            repo.name?.toLowerCase().includes("poc") ||
            repo.description?.toLowerCase()?.includes("poc") ||
            repo.description?.toLowerCase()?.includes("proof of concept");
          const hasExploit =
            repo.name?.toLowerCase().includes("exploit") ||
            repo.description?.toLowerCase()?.includes("exploit");

          if (hasPoc) pocCount++;
          if (hasExploit) exploitCount++;

          await supabase.from("cve_github").upsert(
            {
              cve_id: cve.cve_id,
              repo_name: repo.full_name,
              repo_url: repo.html_url,
              stars: repo.stargazers_count || 0,
              has_poc: hasPoc,
              has_exploit: hasExploit,
              discovered_at: new Date().toISOString(),
            },
            { onConflict: "repo_url" }
          );
          totalFound++;
        }

        // Update main table
        await supabase
          .from("threat_intel")
          .update({
            poc_count: pocCount,
            exploit_count: exploitCount,
            exploit_maturity: exploitCount > 0 ? "active" : pocCount > 0 ? "proof-of-concept" : null,
          })
          .eq("cve_id", cve.cve_id);

        // Rate limit: 10 requests per minute without token, 30 with
        await new Promise((r) => setTimeout(r, GITHUB_TOKEN ? 2100 : 6500));
      } catch (e) {
        console.error(`GitHub check error for ${cve.cve_id}:`, e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, checked: topCVEs.length, repos_found: totalFound }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("GitHub sync error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
