import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GITHUB_API = "https://api.github.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // ── Auth ──────────────────────────────────
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return json({ error: "Unauthorized" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) {
    return json({ error: "Invalid token" }, 401);
  }

  // ── GitHub token ──────────────────────────
  const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
  if (!GITHUB_TOKEN) {
    return json({ error: "GITHUB_TOKEN not configured" }, 500);
  }

  // ── Route ─────────────────────────────────
  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const owner = url.searchParams.get("owner");
  const repo = url.searchParams.get("repo");

  if (!action || !owner || !repo) {
    return json({ error: "Missing action, owner, or repo params" }, 400);
  }

  try {
    switch (action) {
      // ── File Tree ───────────────────────────
      case "tree": {
        const sha = url.searchParams.get("sha") || "main";
        const data = await ghGet(`/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`);
        return json(data);
      }

      // ── File Content ────────────────────────
      case "file": {
        const path = url.searchParams.get("path");
        if (!path) return json({ error: "Missing path param" }, 400);
        const ref = url.searchParams.get("ref") || "main";
        const data = await ghGet(`/repos/${owner}/${repo}/contents/${path}?ref=${ref}`);
        return json(data);
      }

      // ── Commits List ────────────────────────
      case "commits": {
        const perPage = url.searchParams.get("per_page") || "30";
        const page = url.searchParams.get("page") || "1";
        const sha = url.searchParams.get("sha") || "main";
        const data = await ghGet(
          `/repos/${owner}/${repo}/commits?sha=${sha}&per_page=${perPage}&page=${page}`
        );
        return json(data);
      }

      // ── Single Commit ───────────────────────
      case "commit": {
        const sha = url.searchParams.get("sha");
        if (!sha) return json({ error: "Missing sha param" }, 400);
        const data = await ghGet(`/repos/${owner}/${repo}/commits/${sha}`);
        return json(data);
      }

      // ── Issues List ─────────────────────────
      case "issues": {
        const state = url.searchParams.get("state") || "open";
        const perPage = url.searchParams.get("per_page") || "30";
        const data = await ghGet(
          `/repos/${owner}/${repo}/issues?state=${state}&per_page=${perPage}`
        );
        return json(data);
      }

      // ── Create Issue ────────────────────────
      case "create_issue": {
        const body = await req.json();
        const data = await ghPost(`/repos/${owner}/${repo}/issues`, body);
        return json(data);
      }

      // ── Update Issue ────────────────────────
      case "update_issue": {
        const issueNumber = url.searchParams.get("issue_number");
        if (!issueNumber) return json({ error: "Missing issue_number" }, 400);
        const body = await req.json();
        const data = await ghPatch(`/repos/${owner}/${repo}/issues/${issueNumber}`, body);
        return json(data);
      }

      // ── Branches ────────────────────────────
      case "branches": {
        const data = await ghGet(`/repos/${owner}/${repo}/branches`);
        return json(data);
      }

      // ── Get Ref (for commit workflow) ───────
      case "get_ref": {
        const ref = url.searchParams.get("ref") || "heads/main";
        const data = await ghGet(`/repos/${owner}/${repo}/git/ref/${ref}`);
        return json(data);
      }

      // ── Create Blob ─────────────────────────
      case "create_blob": {
        const body = await req.json();
        const data = await ghPost(`/repos/${owner}/${repo}/git/blobs`, body);
        return json(data);
      }

      // ── Create Tree ─────────────────────────
      case "create_tree": {
        const body = await req.json();
        const data = await ghPost(`/repos/${owner}/${repo}/git/trees`, body);
        return json(data);
      }

      // ── Create Commit ───────────────────────
      case "create_commit": {
        const body = await req.json();
        const data = await ghPost(`/repos/${owner}/${repo}/git/commits`, body);
        return json(data);
      }

      // ── Update Ref ──────────────────────────
      case "update_ref": {
        const ref = url.searchParams.get("ref") || "heads/main";
        const body = await req.json();
        const data = await ghPatch(`/repos/${owner}/${repo}/git/refs/${ref}`, body);
        return json(data);
      }

      // ── Repo Info ───────────────────────────
      case "repo": {
        const data = await ghGet(`/repos/${owner}/${repo}`);
        return json(data);
      }

      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (err) {
    console.error("github-proxy error:", err);
    return json({ error: err.message || "GitHub API error" }, 502);
  }

  // ── Helpers ─────────────────────────────────
  async function ghGet(path: string) {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub GET ${path} failed [${res.status}]: ${text}`);
    }
    return res.json();
  }

  async function ghPost(path: string, body: unknown) {
    const res = await fetch(`${GITHUB_API}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub POST ${path} failed [${res.status}]: ${text}`);
    }
    return res.json();
  }

  async function ghPatch(path: string, body: unknown) {
    const res = await fetch(`${GITHUB_API}${path}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub PATCH ${path} failed [${res.status}]: ${text}`);
    }
    return res.json();
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
