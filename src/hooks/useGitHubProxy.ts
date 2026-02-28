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

export interface GitIssue {
  number: number;
  title: string;
  body: string | null;
  state: string;
  labels: Array<{ name: string; color: string }>;
  user: { login: string; avatar_url: string };
  assignees: Array<{ login: string; avatar_url: string }>;
  milestone: { number: number; title: string } | null;
  created_at: string;
  updated_at: string;
  comments: number;
  html_url: string;
}

export interface GitComment {
  id: number;
  body: string;
  user: { login: string; avatar_url: string };
  created_at: string;
  updated_at: string;
}

export interface GitMilestone {
  number: number;
  title: string;
  description: string | null;
  state: string;
  open_issues: number;
  closed_issues: number;
  due_on: string | null;
  created_at: string;
}

export interface GitPullRequest {
  number: number;
  title: string;
  body: string | null;
  state: string;
  user: { login: string; avatar_url: string };
  head: { ref: string; sha: string; label: string };
  base: { ref: string; sha: string; label: string };
  mergeable: boolean | null;
  merged: boolean;
  merged_at: string | null;
  created_at: string;
  updated_at: string;
  additions: number;
  deletions: number;
  changed_files: number;
  comments: number;
  review_comments: number;
  html_url: string;
  labels: Array<{ name: string; color: string }>;
  assignees: Array<{ login: string; avatar_url: string }>;
  requested_reviewers: Array<{ login: string; avatar_url: string }>;
}

export interface GitPrFile {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
}

export interface GitCommitDetail {
  sha: string;
  commit: { message: string; author: { name: string; date: string } };
  author?: { avatar_url: string; login: string };
  files?: Array<{ filename: string; status: string; additions: number; deletions: number; patch?: string }>;
  stats?: { total: number; additions: number; deletions: number };
}

export interface GitCollaborator {
  login: string;
  avatar_url: string;
  permissions: { admin: boolean; push: boolean; pull: boolean };
}

export interface GitLabel {
  name: string;
  color: string;
  description: string | null;
}

export interface GitSearchResult {
  total_count: number;
  items: Array<{
    name: string;
    path: string;
    sha: string;
    html_url: string;
    text_matches?: Array<{ fragment: string; matches: Array<{ text: string }> }>;
  }>;
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
    action, owner, repo, ...extra,
  });

  return {
    // ── Tree & Files ──────────────────────────
    getTree: (sha = "main") =>
      ghProxy<{ tree: GitTreeItem[]; sha: string; truncated: boolean }>(p("tree", { sha })),
    getFile: (path: string, ref = "main") =>
      ghProxy<{ content: string; encoding: string; sha: string; name: string }>(p("file", { path, ref })),
    deleteFile: (path: string, sha: string, message: string, branch: string) =>
      ghProxy<{ commit: { sha: string } }>(p("delete_file", { path }), {
        method: "POST", body: { message, sha, branch },
      }),

    // ── Commits ───────────────────────────────
    getCommits: (sha = "main", perPage = 30, page = 1) =>
      ghProxy<Array<{
        sha: string;
        commit: { message: string; author: { name: string; date: string } };
        author?: { avatar_url: string; login: string };
      }>>(p("commits", { sha, per_page: String(perPage), page: String(page) })),
    getCommitDetail: (sha: string) =>
      ghProxy<GitCommitDetail>(p("commit", { sha })),

    // ── Branches ──────────────────────────────
    getBranches: () =>
      ghProxy<Array<{ name: string; commit: { sha: string } }>>(p("branches")),
    getRef: (ref = "heads/main") =>
      ghProxy<{ object: { sha: string } }>(p("get_ref", { ref })),
    getRepo: () =>
      ghProxy<{ default_branch: string; full_name: string; description: string }>(p("repo")),

    // ── Git Objects (Commit Workflow) ─────────
    createBlob: (content: string, encoding: "utf-8" | "base64" = "utf-8") =>
      ghProxy<{ sha: string }>(p("create_blob"), { method: "POST", body: { content, encoding } }),
    createTree: (baseTree: string, tree: Array<{ path: string; mode: string; type: string; sha: string }>) =>
      ghProxy<{ sha: string }>(p("create_tree"), { method: "POST", body: { base_tree: baseTree, tree } }),
    createCommit: (message: string, treeSha: string, parents: string[]) =>
      ghProxy<{ sha: string }>(p("create_commit"), { method: "POST", body: { message, tree: treeSha, parents } }),
    updateRef: (ref: string, sha: string) =>
      ghProxy<{ ref: string }>(p("update_ref", { ref }), { method: "POST", body: { sha, force: false } }),
    createRef: (ref: string, sha: string) =>
      ghProxy<{ ref: string }>(p("create_ref", { ref }), { method: "POST", body: { sha } }),

    // ── Issues ────────────────────────────────
    getIssues: (state: "open" | "closed" | "all" = "open", filters?: { milestone?: string; labels?: string; assignee?: string }) =>
      ghProxy<GitIssue[]>(p("issues", { state, ...(filters?.milestone ? { milestone: filters.milestone } : {}), ...(filters?.labels ? { labels: filters.labels } : {}), ...(filters?.assignee ? { assignee: filters.assignee } : {}) })),
    getIssue: (issueNumber: number) =>
      ghProxy<GitIssue>(p("issue", { issue_number: String(issueNumber) })),
    createIssue: (title: string, body?: string, labels?: string[], assignees?: string[], milestone?: number) =>
      ghProxy<GitIssue>(p("create_issue"), { method: "POST", body: { title, body, labels, assignees, milestone } }),
    updateIssue: (issueNumber: number, updates: { title?: string; body?: string; state?: string; labels?: string[]; assignees?: string[]; milestone?: number | null }) =>
      ghProxy<GitIssue>(p("update_issue", { issue_number: String(issueNumber) }), { method: "POST", body: updates }),
    getIssueComments: (issueNumber: number) =>
      ghProxy<GitComment[]>(p("issue_comments", { issue_number: String(issueNumber) })),
    createIssueComment: (issueNumber: number, body: string) =>
      ghProxy<GitComment>(p("issue_comments", { issue_number: String(issueNumber) }), { method: "POST", body: { body } }),
    getLabels: () =>
      ghProxy<GitLabel[]>(p("labels")),

    // ── Milestones ────────────────────────────
    getMilestones: (state: "open" | "closed" = "open") =>
      ghProxy<GitMilestone[]>(p("milestones", { state })),
    createMilestone: (title: string, description?: string, due_on?: string) =>
      ghProxy<GitMilestone>(p("create_milestone"), { method: "POST", body: { title, description, due_on } }),
    updateMilestone: (number: number, updates: { title?: string; description?: string; state?: string; due_on?: string | null }) =>
      ghProxy<GitMilestone>(p("update_milestone", { milestone_number: String(number) }), { method: "POST", body: updates }),

    // ── Pull Requests ─────────────────────────
    getPulls: (state: "open" | "closed" | "all" = "open") =>
      ghProxy<GitPullRequest[]>(p("pulls", { state })),
    getPull: (pullNumber: number) =>
      ghProxy<GitPullRequest>(p("pull", { pull_number: String(pullNumber) })),
    getPullFiles: (pullNumber: number) =>
      ghProxy<GitPrFile[]>(p("pull_files", { pull_number: String(pullNumber) })),
    getPullReviews: (pullNumber: number) =>
      ghProxy<Array<{ id: number; user: { login: string; avatar_url: string }; state: string; body: string; submitted_at: string }>>(p("pull_reviews", { pull_number: String(pullNumber) })),
    getPullComments: (pullNumber: number) =>
      ghProxy<GitComment[]>(p("pull_comments", { pull_number: String(pullNumber) })),
    createPullComment: (pullNumber: number, body: string) =>
      ghProxy<GitComment>(p("pull_comments", { pull_number: String(pullNumber) }), { method: "POST", body: { body } }),
    createPull: (title: string, head: string, base: string, body?: string) =>
      ghProxy<GitPullRequest>(p("create_pull"), { method: "POST", body: { title, head, base, body } }),
    mergePull: (pullNumber: number, commitTitle?: string, mergeMethod: "merge" | "squash" | "rebase" = "merge") =>
      ghProxy<{ sha: string; merged: boolean; message: string }>(p("merge_pull", { pull_number: String(pullNumber) }), { method: "POST", body: { commit_title: commitTitle, merge_method: mergeMethod } }),
    updatePull: (pullNumber: number, updates: { title?: string; body?: string; state?: string }) =>
      ghProxy<GitPullRequest>(p("update_pull", { pull_number: String(pullNumber) }), { method: "POST", body: updates }),

    // ── Search ────────────────────────────────
    searchCode: (query: string, perPage = 20) =>
      ghProxy<GitSearchResult>(p("search_code", { q: query, per_page: String(perPage) })),

    // ── Collaborators ─────────────────────────
    getCollaborators: () =>
      ghProxy<GitCollaborator[]>(p("collaborators")),
    getAssignees: () =>
      ghProxy<Array<{ login: string; avatar_url: string }>>(p("assignees")),
  };
}
