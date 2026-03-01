// github-proxy v2 — repo-scoped GitHub API relay
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GITHUB_API = "https://api.github.com";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function ghFetch(
  method: string,
  path: string,
  token: string,
  body?: unknown
) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${method} ${path} [${res.status}]: ${text}`);
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return json({ error: "Unauthorized" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const token = authHeader.replace("Bearer ", "");
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: Deno.env.get("SUPABASE_ANON_KEY")!,
    },
  });
  if (!userRes.ok) {
    await userRes.text();
    return json({ error: "Invalid token" }, 401);
  }
  await userRes.json();

  const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
  if (!GITHUB_TOKEN) {
    return json({ error: "GITHUB_TOKEN not configured" }, 500);
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const owner = url.searchParams.get("owner");
  const repo = url.searchParams.get("repo");

  if (!action) {
    return json({ error: "Missing action param" }, 400);
  }

  try {
    // ── Global actions (no owner/repo) ──────────
    switch (action) {
      case "repos": {
        const perPage = url.searchParams.get("per_page") || "100";
        const page = url.searchParams.get("page") || "1";
        const sort = url.searchParams.get("sort") || "updated";
        return json(await ghFetch("GET", `/user/repos?per_page=${perPage}&page=${page}&sort=${sort}&affiliation=owner,collaborator,organization_member`, GITHUB_TOKEN));
      }
      case "user":
        return json(await ghFetch("GET", "/user", GITHUB_TOKEN));
    }

    // ── Repo-scoped actions ─────────────────────
    if (!owner || !repo) {
      return json({ error: "Missing owner or repo params" }, 400);
    }

    const base = `/repos/${owner}/${repo}`;

    switch (action) {
      // ── Tree & Files ──────────────────────────
      case "tree": {
        const sha = url.searchParams.get("sha") || "main";
        return json(await ghFetch("GET", `${base}/git/trees/${sha}?recursive=1`, GITHUB_TOKEN));
      }
      case "file": {
        const path = url.searchParams.get("path");
        if (!path) return json({ error: "Missing path param" }, 400);
        const ref = url.searchParams.get("ref") || "main";
        return json(await ghFetch("GET", `${base}/contents/${path}?ref=${ref}`, GITHUB_TOKEN));
      }
      case "delete_file": {
        const path = url.searchParams.get("path");
        if (!path) return json({ error: "Missing path" }, 400);
        const body = await req.json();
        return json(await ghFetch("DELETE", `${base}/contents/${path}`, GITHUB_TOKEN, body));
      }

      // ── Commits ───────────────────────────────
      case "commits": {
        const sha = url.searchParams.get("sha") || "main";
        const perPage = url.searchParams.get("per_page") || "30";
        const page = url.searchParams.get("page") || "1";
        return json(await ghFetch("GET", `${base}/commits?sha=${sha}&per_page=${perPage}&page=${page}`, GITHUB_TOKEN));
      }
      case "commit": {
        const sha = url.searchParams.get("sha");
        if (!sha) return json({ error: "Missing sha param" }, 400);
        return json(await ghFetch("GET", `${base}/commits/${sha}`, GITHUB_TOKEN));
      }

      // ── Branches & Refs ───────────────────────
      case "branches":
        return json(await ghFetch("GET", `${base}/branches?per_page=100`, GITHUB_TOKEN));
      case "get_ref": {
        const ref = url.searchParams.get("ref") || "heads/main";
        return json(await ghFetch("GET", `${base}/git/ref/${ref}`, GITHUB_TOKEN));
      }
      case "create_ref": {
        const ref = url.searchParams.get("ref") || "refs/heads/main";
        const body = await req.json();
        return json(await ghFetch("POST", `${base}/git/refs`, GITHUB_TOKEN, { ref, ...body }));
      }
      case "update_ref": {
        const ref = url.searchParams.get("ref") || "heads/main";
        const body = await req.json();
        return json(await ghFetch("PATCH", `${base}/git/refs/${ref}`, GITHUB_TOKEN, body));
      }

      // ── Git Objects (Commit Workflow) ─────────
      case "create_blob": {
        const body = await req.json();
        return json(await ghFetch("POST", `${base}/git/blobs`, GITHUB_TOKEN, body));
      }
      case "create_tree": {
        const body = await req.json();
        return json(await ghFetch("POST", `${base}/git/trees`, GITHUB_TOKEN, body));
      }
      case "create_commit": {
        const body = await req.json();
        return json(await ghFetch("POST", `${base}/git/commits`, GITHUB_TOKEN, body));
      }

      // ── Issues ────────────────────────────────
      case "issues": {
        const state = url.searchParams.get("state") || "open";
        const perPage = url.searchParams.get("per_page") || "30";
        const milestone = url.searchParams.get("milestone");
        const labels = url.searchParams.get("labels");
        const assignee = url.searchParams.get("assignee");
        let qs = `${base}/issues?state=${state}&per_page=${perPage}`;
        if (milestone) qs += `&milestone=${milestone}`;
        if (labels) qs += `&labels=${labels}`;
        if (assignee) qs += `&assignee=${assignee}`;
        return json(await ghFetch("GET", qs, GITHUB_TOKEN));
      }
      case "issue": {
        const num = url.searchParams.get("issue_number");
        if (!num) return json({ error: "Missing issue_number" }, 400);
        return json(await ghFetch("GET", `${base}/issues/${num}`, GITHUB_TOKEN));
      }
      case "create_issue": {
        const body = await req.json();
        return json(await ghFetch("POST", `${base}/issues`, GITHUB_TOKEN, body));
      }
      case "update_issue": {
        const num = url.searchParams.get("issue_number");
        if (!num) return json({ error: "Missing issue_number" }, 400);
        const body = await req.json();
        return json(await ghFetch("PATCH", `${base}/issues/${num}`, GITHUB_TOKEN, body));
      }
      case "issue_comments": {
        const num = url.searchParams.get("issue_number");
        if (!num) return json({ error: "Missing issue_number" }, 400);
        if (req.method === "POST" || req.headers.get("content-type")?.includes("json")) {
          try {
            const body = await req.json();
            if (body && body.body) {
              return json(await ghFetch("POST", `${base}/issues/${num}/comments`, GITHUB_TOKEN, body));
            }
          } catch { /* fall through to GET */ }
        }
        return json(await ghFetch("GET", `${base}/issues/${num}/comments?per_page=100`, GITHUB_TOKEN));
      }
      case "labels":
        return json(await ghFetch("GET", `${base}/labels?per_page=100`, GITHUB_TOKEN));

      // ── Milestones ────────────────────────────
      case "milestones": {
        const state = url.searchParams.get("state") || "open";
        return json(await ghFetch("GET", `${base}/milestones?state=${state}&per_page=100`, GITHUB_TOKEN));
      }
      case "create_milestone": {
        const body = await req.json();
        return json(await ghFetch("POST", `${base}/milestones`, GITHUB_TOKEN, body));
      }
      case "update_milestone": {
        const num = url.searchParams.get("milestone_number");
        if (!num) return json({ error: "Missing milestone_number" }, 400);
        const body = await req.json();
        return json(await ghFetch("PATCH", `${base}/milestones/${num}`, GITHUB_TOKEN, body));
      }

      // ── Pull Requests ─────────────────────────
      case "pulls": {
        const state = url.searchParams.get("state") || "open";
        const perPage = url.searchParams.get("per_page") || "30";
        return json(await ghFetch("GET", `${base}/pulls?state=${state}&per_page=${perPage}`, GITHUB_TOKEN));
      }
      case "pull": {
        const num = url.searchParams.get("pull_number");
        if (!num) return json({ error: "Missing pull_number" }, 400);
        return json(await ghFetch("GET", `${base}/pulls/${num}`, GITHUB_TOKEN));
      }
      case "pull_files": {
        const num = url.searchParams.get("pull_number");
        if (!num) return json({ error: "Missing pull_number" }, 400);
        return json(await ghFetch("GET", `${base}/pulls/${num}/files?per_page=100`, GITHUB_TOKEN));
      }
      case "pull_reviews": {
        const num = url.searchParams.get("pull_number");
        if (!num) return json({ error: "Missing pull_number" }, 400);
        return json(await ghFetch("GET", `${base}/pulls/${num}/reviews`, GITHUB_TOKEN));
      }
      case "pull_comments": {
        const num = url.searchParams.get("pull_number");
        if (!num) return json({ error: "Missing pull_number" }, 400);
        if (req.method === "POST" || req.headers.get("content-type")?.includes("json")) {
          try {
            const body = await req.json();
            if (body && body.body) {
              return json(await ghFetch("POST", `${base}/issues/${num}/comments`, GITHUB_TOKEN, body));
            }
          } catch { /* fall through to GET */ }
        }
        return json(await ghFetch("GET", `${base}/issues/${num}/comments?per_page=100`, GITHUB_TOKEN));
      }
      case "create_pull": {
        const body = await req.json();
        return json(await ghFetch("POST", `${base}/pulls`, GITHUB_TOKEN, body));
      }
      case "merge_pull": {
        const num = url.searchParams.get("pull_number");
        if (!num) return json({ error: "Missing pull_number" }, 400);
        const body = await req.json();
        return json(await ghFetch("PUT", `${base}/pulls/${num}/merge`, GITHUB_TOKEN, body));
      }
      case "update_pull": {
        const num = url.searchParams.get("pull_number");
        if (!num) return json({ error: "Missing pull_number" }, 400);
        const body = await req.json();
        return json(await ghFetch("PATCH", `${base}/pulls/${num}`, GITHUB_TOKEN, body));
      }

      // ── Search ────────────────────────────────
      case "search_code": {
        const q = url.searchParams.get("q");
        if (!q) return json({ error: "Missing q param" }, 400);
        const perPage = url.searchParams.get("per_page") || "20";
        const fullQ = `${q}+repo:${owner}/${repo}`;
        return json(await ghFetch("GET", `/search/code?q=${encodeURIComponent(fullQ)}&per_page=${perPage}`, GITHUB_TOKEN));
      }

      // ── Collaborators ─────────────────────────
      case "collaborators":
        return json(await ghFetch("GET", `${base}/collaborators?per_page=100`, GITHUB_TOKEN));
      case "assignees":
        return json(await ghFetch("GET", `${base}/assignees?per_page=100`, GITHUB_TOKEN));

      // ── Repo info ─────────────────────────────
      case "repo":
        return json(await ghFetch("GET", base, GITHUB_TOKEN));

      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("github-proxy error:", message);
    return json({ error: message || "GitHub API error" }, 502);
  }
});
