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

  // Auth check: require Bearer token (JWT verified by Supabase gateway via config)
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return json({ error: "Unauthorized" }, 401);
  }

  // Validate the JWT via Supabase auth API
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const token = authHeader.replace("Bearer ", "");
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: Deno.env.get("SUPABASE_ANON_KEY")!,
    },
  });
  if (!userRes.ok) {
    await userRes.text(); // consume body
    return json({ error: "Invalid token" }, 401);
  }
  await userRes.json(); // consume body

  const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
  if (!GITHUB_TOKEN) {
    return json({ error: "GITHUB_TOKEN not configured" }, 500);
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const owner = url.searchParams.get("owner");
  const repo = url.searchParams.get("repo");

  if (!action || !owner || !repo) {
    return json({ error: "Missing action, owner, or repo params" }, 400);
  }

  const base = `/repos/${owner}/${repo}`;

  try {
    switch (action) {
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
      case "issues": {
        const state = url.searchParams.get("state") || "open";
        const perPage = url.searchParams.get("per_page") || "30";
        return json(await ghFetch("GET", `${base}/issues?state=${state}&per_page=${perPage}`, GITHUB_TOKEN));
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
      case "branches":
        return json(await ghFetch("GET", `${base}/branches`, GITHUB_TOKEN));
      case "get_ref": {
        const ref = url.searchParams.get("ref") || "heads/main";
        return json(await ghFetch("GET", `${base}/git/ref/${ref}`, GITHUB_TOKEN));
      }
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
      case "update_ref": {
        const ref = url.searchParams.get("ref") || "heads/main";
        const body = await req.json();
        return json(await ghFetch("PATCH", `${base}/git/refs/${ref}`, GITHUB_TOKEN, body));
      }
      case "repo":
        return json(await ghFetch("GET", base, GITHUB_TOKEN));
      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (err) {
    console.error("github-proxy error:", err);
    return json({ error: err.message || "GitHub API error" }, 502);
  }
});
