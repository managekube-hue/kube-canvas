import { supabase } from "@/integrations/supabase/client";

const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const BASE = `https://${PROJECT_ID}.supabase.co/functions/v1/github-proxy`;

async function ghProxy<T = unknown>(
  params: Record<string, string>,
  options?: { method?: string; body?: unknown }
): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}?${qs}`, {
    method: options?.method || "GET",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `GitHub proxy error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── Types ────────────────────────────────────

export interface GitTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
}

export interface GitRepo {
  id: number;
  full_name: string;
  name: string;
  owner: { login: string; avatar_url: string };
  description: string | null;
  language: string | null;
  default_branch: string;
  private: boolean;
  updated_at: string;
  stargazers_count: number;
}

// ── Global helpers (no owner/repo needed) ────

export function useGitHubGlobal() {
  return {
    listRepos: (perPage = 100, page = 1, sort = "updated") =>
      ghProxy<GitRepo[]>({ action: "repos", per_page: String(perPage), page: String(page), sort }),

    getUser: () =>
      ghProxy<{ login: string; avatar_url: string; name: string }>({ action: "user" }),
  };
}

// ── Repo-scoped helpers ──────────────────────

export function useGitHubProxy(owner: string, repo: string) {
  const p = (action: string, extra?: Record<string, string>) => ({
    action,
    owner,
    repo,
    ...extra,
  });

  return {
    getTree: (sha = "main") =>
      ghProxy<{ tree: GitTreeItem[]; sha: string; truncated: boolean }>(
        p("tree", { sha })
      ),

    getFile: (path: string, ref = "main") =>
      ghProxy<{ content: string; encoding: string; sha: string; name: string }>(
        p("file", { path, ref })
      ),

    getCommits: (sha = "main", perPage = 30, page = 1) =>
      ghProxy<Array<{
        sha: string;
        commit: { message: string; author: { name: string; date: string } };
        author?: { avatar_url: string; login: string };
      }>>(p("commits", { sha, per_page: String(perPage), page: String(page) })),

    getIssues: (state: "open" | "closed" | "all" = "open") =>
      ghProxy<Array<{
        number: number;
        title: string;
        state: string;
        labels: Array<{ name: string; color: string }>;
        user: { login: string; avatar_url: string };
        assignees?: Array<{ login: string; avatar_url: string }>;
        created_at: string;
        body?: string;
        comments: number;
      }>>(p("issues", { state })),

    getBranches: () =>
      ghProxy<Array<{ name: string; commit: { sha: string } }>>(p("branches")),

    getRepo: () =>
      ghProxy<{ default_branch: string; full_name: string; description: string }>(
        p("repo")
      ),

    // ── Commit Workflow (Blob → Tree → Commit → Ref) ──
    createBlob: (content: string, encoding: "utf-8" | "base64" = "utf-8") =>
      ghProxy<{ sha: string }>(p("create_blob"), {
        method: "POST",
        body: { content, encoding },
      }),

    createTree: (baseTree: string, tree: Array<{ path: string; mode: string; type: string; sha: string }>) =>
      ghProxy<{ sha: string }>(p("create_tree"), {
        method: "POST",
        body: { base_tree: baseTree, tree },
      }),

    createCommit: (message: string, treeSha: string, parents: string[]) =>
      ghProxy<{ sha: string }>(p("create_commit"), {
        method: "POST",
        body: { message, tree: treeSha, parents },
      }),

    updateRef: (ref: string, sha: string) =>
      ghProxy<{ ref: string }>(p("update_ref", { ref }), {
        method: "POST",
        body: { sha, force: false },
      }),

    getRef: (ref = "heads/main") =>
      ghProxy<{ object: { sha: string } }>(p("get_ref", { ref })),

    createIssue: (title: string, body?: string, labels?: string[], assignees?: string[]) =>
      ghProxy<{ number: number; html_url: string }>(p("create_issue"), {
        method: "POST",
        body: { title, body, labels, assignees },
      }),

    updateIssue: (issueNumber: number, updates: { title?: string; body?: string; state?: string; labels?: string[]; assignees?: string[] }) =>
      ghProxy<{ number: number }>(p("update_issue", { issue_number: String(issueNumber) }), {
        method: "POST",
        body: updates,
      }),

    deleteFile: (path: string, sha: string, message: string, branch: string) =>
      ghProxy<{ commit: { sha: string } }>(p("delete_file", { path }), {
        method: "POST",
        body: { message, sha, branch },
      }),
  };
}
