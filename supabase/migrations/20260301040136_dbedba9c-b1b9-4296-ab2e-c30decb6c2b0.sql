
-- ═══════════════════════════════════════════════════════
-- REACH: Local-first tables — everything originates here
-- ═══════════════════════════════════════════════════════

-- 1. Milestones (local-first, optional GitHub sync)
CREATE TABLE public.reach_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date date,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  closed_at timestamptz,
  created_by uuid NOT NULL,
  github_milestone_number integer,
  github_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read milestones" ON public.reach_milestones
  FOR SELECT USING (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members create milestones" ON public.reach_milestones
  FOR INSERT WITH CHECK (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members update milestones" ON public.reach_milestones
  FOR UPDATE USING (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members delete milestones" ON public.reach_milestones
  FOR DELETE USING (is_reach_member(auth.uid(), workspace_id));

CREATE TRIGGER update_reach_milestones_updated_at
  BEFORE UPDATE ON public.reach_milestones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Activity log (all platform actions logged here)
CREATE TABLE public.reach_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  actor_id uuid NOT NULL,
  action text NOT NULL,           -- issue_created, issue_updated, milestone_created, file_uploaded, pr_created, pr_merged, comment_added, member_joined, etc.
  entity_type text NOT NULL,      -- issue, milestone, file, pull_request, channel, member
  entity_id uuid,
  entity_title text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read activity" ON public.reach_activity
  FOR SELECT USING (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members create activity" ON public.reach_activity
  FOR INSERT WITH CHECK (is_reach_member(auth.uid(), workspace_id));

CREATE INDEX idx_reach_activity_workspace ON public.reach_activity(workspace_id, created_at DESC);

-- 3. Pull requests (local-first, sync to GitHub)
CREATE TABLE public.reach_pull_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  number serial,
  title text NOT NULL,
  body text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'merged', 'closed')),
  source_branch text NOT NULL,
  target_branch text NOT NULL DEFAULT 'main',
  created_by uuid NOT NULL,
  assigned_to uuid,
  merged_at timestamptz,
  closed_at timestamptz,
  github_pr_number integer,
  github_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_pull_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read PRs" ON public.reach_pull_requests
  FOR SELECT USING (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members create PRs" ON public.reach_pull_requests
  FOR INSERT WITH CHECK (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members update PRs" ON public.reach_pull_requests
  FOR UPDATE USING (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members delete PRs" ON public.reach_pull_requests
  FOR DELETE USING (is_reach_member(auth.uid(), workspace_id));

CREATE TRIGGER update_reach_prs_updated_at
  BEFORE UPDATE ON public.reach_pull_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Files / documents (metadata — actual files in Supabase storage)
CREATE TABLE public.reach_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  path text NOT NULL,              -- virtual path like "docs/architecture.pdf"
  mime_type text,
  size_bytes bigint,
  storage_path text,               -- Supabase storage object path
  uploaded_by uuid NOT NULL,
  folder boolean NOT NULL DEFAULT false,
  parent_id uuid REFERENCES public.reach_files(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read files" ON public.reach_files
  FOR SELECT USING (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members create files" ON public.reach_files
  FOR INSERT WITH CHECK (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members update files" ON public.reach_files
  FOR UPDATE USING (is_reach_member(auth.uid(), workspace_id));
CREATE POLICY "Members delete files" ON public.reach_files
  FOR DELETE USING (is_reach_member(auth.uid(), workspace_id));

CREATE INDEX idx_reach_files_workspace ON public.reach_files(workspace_id, path);

CREATE TRIGGER update_reach_files_updated_at
  BEFORE UPDATE ON public.reach_files
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Link issues to milestones
ALTER TABLE public.reach_issues ADD COLUMN IF NOT EXISTS milestone_id uuid REFERENCES public.reach_milestones(id) ON DELETE SET NULL;

-- 6. Storage bucket for workspace files
INSERT INTO storage.buckets (id, name, public) VALUES ('reach-files', 'reach-files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Workspace members upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'reach-files' AND auth.role() = 'authenticated');

CREATE POLICY "Workspace members read files" ON storage.objects
  FOR SELECT USING (bucket_id = 'reach-files' AND auth.role() = 'authenticated');

CREATE POLICY "Workspace members delete files" ON storage.objects
  FOR DELETE USING (bucket_id = 'reach-files' AND auth.role() = 'authenticated');
