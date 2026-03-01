import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const GITHUB_API = "https://api.github.com";

export function useGitHub() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setToken(session?.provider_token ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setToken(session?.provider_token ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const gh = useCallback(
    async <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> => {
      if (!token) throw new Error("No GitHub token — please sign in with GitHub");
      const res = await fetch(`${GITHUB_API}${endpoint}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...options.headers,
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? `GitHub ${res.status}`);
      }
      return res.json() as Promise<T>;
    },
    [token]
  );

  const forceReAuth = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { scopes: "repo read:user" },
    });
  }, []);

  return {
    token,
    loading,
    forceReAuth,

    // User repos
    listRepos: () =>
      gh<GitRepo[]>("/user/repos?sort=updated&per_page=100"),

    // User info
    getUser: () =>
      gh<{ login: string; avatar_url: string; name: string }>("/user"),

    // File tree
    getTree: (owner: string, repo: string, branch = "main") =>
      gh<{ tree: GitTreeItem[]; sha: string; truncated: boolean }>(
        `/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
      ),

    // File content
    getFile: (owner: string, repo: string, path: string, ref = "main") =>
      gh<{ content: string; encoding: string; sha: string; name: string }>(
        `/repos/${owner}/${repo}/contents/${path}?ref=${ref}`
      ),

    // Delete file
    deleteFile: (owner: string, repo: string, path: string, sha: string, message: string, branch: string) =>
      gh<{ commit: { sha: string } }>(
        `/repos/${owner}/${repo}/contents/${path}`,
        { method: "DELETE", body: JSON.stringify({ message, sha, branch }) }
      ),

    // Commits
    listCommits: (owner: string, repo: string, branch = "main", perPage = 30, page = 1) =>
      gh<Array<{
        sha: string;
        commit: { message: string; author: { name: string; date: string } };
        author?: { avatar_url: string; login: string };
      }>>(`/repos/${owner}/${repo}/commits?sha=${branch}&per_page=${perPage}&page=${page}`),

    getCommitDetail: (owner: string, repo: string, sha: string) =>
      gh<GitCommitDetail>(`/repos/${owner}/${repo}/git/commits/${sha}`),

    // Branches
    listBranches: (owner: string, repo: string) =>
      gh<Array<{ name: string; commit: { sha: string } }>>(`/repos/${owner}/${repo}/branches`),

    getRef: (owner: string, repo: string, ref = "heads/main") =>
      gh<{ object: { sha: string } }>(`/repos/${owner}/${repo}/git/ref/${ref}`),

    getRepo: (owner: string, repo: string) =>
      gh<{ default_branch: string; full_name: string; description: string }>(`/repos/${owner}/${repo}`),

    // Git Objects (Commit Workflow)
    createBlob: (owner: string, repo: string, content: string, encoding: "utf-8" | "base64" = "utf-8") =>
      gh<{ sha: string }>(`/repos/${owner}/${repo}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content, encoding }),
      }),

    createTree: (owner: string, repo: string, baseTree: string, tree: Array<{ path: string; mode: string; type: string; sha: string }>) =>
      gh<{ sha: string }>(`/repos/${owner}/${repo}/git/trees`, {
        method: "POST",
        body: JSON.stringify({ base_tree: baseTree, tree }),
      }),

    createCommit: (owner: string, repo: string, message: string, treeSha: string, parents: string[]) =>
      gh<{ sha: string }>(`/repos/${owner}/${repo}/git/commits`, {
        method: "POST",
        body: JSON.stringify({ message, tree: treeSha, parents }),
      }),

    updateRef: (owner: string, repo: string, ref: string, sha: string) =>
      gh<{ ref: string }>(`/repos/${owner}/${repo}/git/refs/${ref}`, {
        method: "PATCH",
        body: JSON.stringify({ sha, force: false }),
      }),

    createRef: (owner: string, repo: string, ref: string, sha: string) =>
      gh<{ ref: string }>(`/repos/${owner}/${repo}/git/refs`, {
        method: "POST",
        body: JSON.stringify({ ref, sha }),
      }),

    // Issues
    listIssues: (owner: string, repo: string, state: "open" | "closed" | "all" = "open", filters?: { milestone?: string; labels?: string; assignee?: string }) => {
      const params = new URLSearchParams({ state, per_page: "50" });
      if (filters?.milestone) params.set("milestone", filters.milestone);
      if (filters?.labels) params.set("labels", filters.labels);
      if (filters?.assignee) params.set("assignee", filters.assignee);
      return gh<GitIssue[]>(`/repos/${owner}/${repo}/issues?${params}`);
    },

    getIssue: (owner: string, repo: string, issueNumber: number) =>
      gh<GitIssue>(`/repos/${owner}/${repo}/issues/${issueNumber}`),

    createIssue: (owner: string, repo: string, title: string, body?: string, labels?: string[], assignees?: string[], milestone?: number) =>
      gh<GitIssue>(`/repos/${owner}/${repo}/issues`, {
        method: "POST",
        body: JSON.stringify({ title, body, labels, assignees, milestone }),
      }),

    updateIssue: (owner: string, repo: string, issueNumber: number, updates: { title?: string; body?: string; state?: string; labels?: string[]; assignees?: string[]; milestone?: number | null }) =>
      gh<GitIssue>(`/repos/${owner}/${repo}/issues/${issueNumber}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      }),

    getIssueComments: (owner: string, repo: string, issueNumber: number) =>
      gh<GitComment[]>(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`),

    createIssueComment: (owner: string, repo: string, issueNumber: number, body: string) =>
      gh<GitComment>(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
        method: "POST",
        body: JSON.stringify({ body }),
      }),

    getLabels: (owner: string, repo: string) =>
      gh<GitLabel[]>(`/repos/${owner}/${repo}/labels`),

    // Milestones
    listMilestones: (owner: string, repo: string, state: "open" | "closed" = "open") =>
      gh<GitMilestone[]>(`/repos/${owner}/${repo}/milestones?state=${state}`),

    createMilestone: (owner: string, repo: string, title: string, description?: string, due_on?: string) =>
      gh<GitMilestone>(`/repos/${owner}/${repo}/milestones`, {
        method: "POST",
        body: JSON.stringify({ title, description, due_on }),
      }),

    updateMilestone: (owner: string, repo: string, number: number, updates: { title?: string; description?: string; state?: string; due_on?: string | null }) =>
      gh<GitMilestone>(`/repos/${owner}/${repo}/milestones/${number}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      }),

    // Pull Requests
    listPRs: (owner: string, repo: string, state: "open" | "closed" | "all" = "open") =>
      gh<GitPullRequest[]>(`/repos/${owner}/${repo}/pulls?state=${state}`),

    getPR: (owner: string, repo: string, pullNumber: number) =>
      gh<GitPullRequest>(`/repos/${owner}/${repo}/pulls/${pullNumber}`),

    getPRFiles: (owner: string, repo: string, pullNumber: number) =>
      gh<GitPrFile[]>(`/repos/${owner}/${repo}/pulls/${pullNumber}/files`),

    getPRReviews: (owner: string, repo: string, pullNumber: number) =>
      gh<Array<{ id: number; user: { login: string; avatar_url: string }; state: string; body: string; submitted_at: string }>>(
        `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`
      ),

    getPRComments: (owner: string, repo: string, pullNumber: number) =>
      gh<GitComment[]>(`/repos/${owner}/${repo}/pulls/${pullNumber}/comments`),

    createPRComment: (owner: string, repo: string, pullNumber: number, body: string) =>
      gh<GitComment>(`/repos/${owner}/${repo}/issues/${pullNumber}/comments`, {
        method: "POST",
        body: JSON.stringify({ body }),
      }),

    createPR: (owner: string, repo: string, title: string, head: string, base: string, body?: string) =>
      gh<GitPullRequest>(`/repos/${owner}/${repo}/pulls`, {
        method: "POST",
        body: JSON.stringify({ title, head, base, body }),
      }),

    mergePR: (owner: string, repo: string, pullNumber: number, commitTitle?: string, mergeMethod: "merge" | "squash" | "rebase" = "merge") =>
      gh<{ sha: string; merged: boolean; message: string }>(
        `/repos/${owner}/${repo}/pulls/${pullNumber}/merge`,
        { method: "PUT", body: JSON.stringify({ commit_title: commitTitle, merge_method: mergeMethod }) }
      ),

    updatePR: (owner: string, repo: string, pullNumber: number, updates: { title?: string; body?: string; state?: string }) =>
      gh<GitPullRequest>(`/repos/${owner}/${repo}/pulls/${pullNumber}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      }),

    // Search
    searchCode: (owner: string, repo: string, query: string, perPage = 20) =>
      gh<GitSearchResult>(`/search/code?q=${encodeURIComponent(query)}+repo:${owner}/${repo}&per_page=${perPage}`),

    // Collaborators
    listCollaborators: (owner: string, repo: string) =>
      gh<GitCollaborator[]>(`/repos/${owner}/${repo}/collaborators`),

    getAssignees: (owner: string, repo: string) =>
      gh<Array<{ login: string; avatar_url: string }>>(`/repos/${owner}/${repo}/assignees`),

    // Raw call
    raw: gh,
  };
}

// ── Re-export types (same as useGitHubProxy for compatibility) ──

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
