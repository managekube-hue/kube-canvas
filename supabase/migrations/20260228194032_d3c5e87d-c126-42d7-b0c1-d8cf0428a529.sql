
-- =============================================
-- KUBRIC REACH: Foundation Schema (Phase 1)
-- Multi-tenant workspace for IDE, Chat, Issues
-- =============================================

-- ── WORKSPACES ──────────────────────────────
CREATE TABLE public.reach_workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  github_repo TEXT,
  github_owner TEXT,
  avatar_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_workspaces ENABLE ROW LEVEL SECURITY;

-- ── WORKSPACE MEMBERS ───────────────────────
CREATE TYPE public.reach_role AS ENUM ('owner', 'admin', 'maintainer', 'contributor', 'viewer');

CREATE TABLE public.reach_workspace_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.reach_role NOT NULL DEFAULT 'contributor',
  display_name TEXT,
  avatar_url TEXT,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

ALTER TABLE public.reach_workspace_members ENABLE ROW LEVEL SECURITY;

-- Helper: check if user is a member of a workspace
CREATE OR REPLACE FUNCTION public.is_reach_member(_user_id UUID, _workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.reach_workspace_members
    WHERE user_id = _user_id AND workspace_id = _workspace_id
  )
$$;

-- Helper: get user's role in a workspace
CREATE OR REPLACE FUNCTION public.get_reach_role(_user_id UUID, _workspace_id UUID)
RETURNS public.reach_role
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  SELECT role FROM public.reach_workspace_members
  WHERE user_id = _user_id AND workspace_id = _workspace_id
  LIMIT 1
$$;

-- ── CHANNELS ────────────────────────────────
CREATE TABLE public.reach_channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'channel' CHECK (type IN ('channel', 'direct', 'issue_thread')),
  is_archived BOOLEAN NOT NULL DEFAULT false,
  linked_issue_id UUID,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, name)
);

ALTER TABLE public.reach_channels ENABLE ROW LEVEL SECURITY;

-- ── MESSAGES ────────────────────────────────
CREATE TABLE public.reach_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID NOT NULL REFERENCES public.reach_channels(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  parent_id UUID REFERENCES public.reach_messages(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  body_html TEXT,
  attachments JSONB DEFAULT '[]'::jsonb,
  reactions JSONB DEFAULT '{}'::jsonb,
  is_edited BOOLEAN NOT NULL DEFAULT false,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_messages ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_reach_messages_channel ON public.reach_messages(channel_id, created_at DESC);
CREATE INDEX idx_reach_messages_parent ON public.reach_messages(parent_id) WHERE parent_id IS NOT NULL;

-- ── ISSUES ──────────────────────────────────
CREATE TABLE public.reach_issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  number SERIAL,
  title TEXT NOT NULL,
  body TEXT,
  body_html TEXT,
  status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN ('backlog', 'todo', 'in_progress', 'in_review', 'done', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('urgent', 'high', 'medium', 'low', 'none')),
  labels TEXT[] DEFAULT '{}',
  assigned_to UUID REFERENCES auth.users(id),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  github_issue_number INTEGER,
  github_synced_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_issues ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_reach_issues_workspace_status ON public.reach_issues(workspace_id, status);

-- ── COMMITS (local cache of GitHub commits) ─
CREATE TABLE public.reach_commits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  sha TEXT NOT NULL,
  message TEXT NOT NULL,
  author_name TEXT,
  author_email TEXT,
  author_avatar TEXT,
  committed_at TIMESTAMPTZ,
  files_changed INTEGER DEFAULT 0,
  additions INTEGER DEFAULT 0,
  deletions INTEGER DEFAULT 0,
  github_url TEXT,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, sha)
);

ALTER TABLE public.reach_commits ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_reach_commits_workspace ON public.reach_commits(workspace_id, committed_at DESC);

-- ── NOTIFICATIONS ───────────────────────────
CREATE TABLE public.reach_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  type TEXT NOT NULL CHECK (type IN ('mention', 'assignment', 'review', 'commit', 'message', 'system')),
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  source_type TEXT,
  source_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_notifications ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_reach_notifications_user ON public.reach_notifications(user_id, is_read, created_at DESC);

-- ── ZOOM ROOMS (for video integration) ──────
CREATE TABLE public.reach_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  zoom_meeting_id TEXT,
  zoom_join_url TEXT,
  zoom_password TEXT,
  channel_id UUID REFERENCES public.reach_channels(id),
  is_active BOOLEAN NOT NULL DEFAULT false,
  started_by UUID REFERENCES auth.users(id),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_rooms ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════
-- RLS POLICIES
-- ══════════════════════════════════════════════

-- Workspaces: members can read, owners/admins can manage
CREATE POLICY "Members read workspaces"
  ON public.reach_workspaces FOR SELECT
  USING (is_reach_member(auth.uid(), id));

CREATE POLICY "Authenticated create workspaces"
  ON public.reach_workspaces FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins update workspaces"
  ON public.reach_workspaces FOR UPDATE
  USING (get_reach_role(auth.uid(), id) IN ('owner', 'admin'));

-- Workspace Members: members can read, admins can manage
CREATE POLICY "Members read members"
  ON public.reach_workspace_members FOR SELECT
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Admins manage members"
  ON public.reach_workspace_members FOR INSERT
  WITH CHECK (
    get_reach_role(auth.uid(), workspace_id) IN ('owner', 'admin')
    OR auth.uid() = user_id -- allow self-join via invite
  );

CREATE POLICY "Admins update members"
  ON public.reach_workspace_members FOR UPDATE
  USING (get_reach_role(auth.uid(), workspace_id) IN ('owner', 'admin'));

CREATE POLICY "Admins delete members"
  ON public.reach_workspace_members FOR DELETE
  USING (
    get_reach_role(auth.uid(), workspace_id) IN ('owner', 'admin')
    OR auth.uid() = user_id -- allow self-leave
  );

-- Channels: workspace-scoped
CREATE POLICY "Members read channels"
  ON public.reach_channels FOR SELECT
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Members create channels"
  ON public.reach_channels FOR INSERT
  WITH CHECK (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Admins update channels"
  ON public.reach_channels FOR UPDATE
  USING (get_reach_role(auth.uid(), workspace_id) IN ('owner', 'admin', 'maintainer'));

-- Messages: workspace-scoped, authors can edit own
CREATE POLICY "Members read messages"
  ON public.reach_messages FOR SELECT
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Members create messages"
  ON public.reach_messages FOR INSERT
  WITH CHECK (is_reach_member(auth.uid(), workspace_id) AND auth.uid() = user_id);

CREATE POLICY "Authors update messages"
  ON public.reach_messages FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Authors delete messages"
  ON public.reach_messages FOR DELETE
  USING (
    auth.uid() = user_id
    OR get_reach_role(auth.uid(), workspace_id) IN ('owner', 'admin')
  );

-- Issues: workspace-scoped
CREATE POLICY "Members read issues"
  ON public.reach_issues FOR SELECT
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Members create issues"
  ON public.reach_issues FOR INSERT
  WITH CHECK (is_reach_member(auth.uid(), workspace_id) AND auth.uid() = created_by);

CREATE POLICY "Members update issues"
  ON public.reach_issues FOR UPDATE
  USING (is_reach_member(auth.uid(), workspace_id));

-- Commits: workspace-scoped read-only for members
CREATE POLICY "Members read commits"
  ON public.reach_commits FOR SELECT
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Service role insert commits"
  ON public.reach_commits FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Notifications: user-scoped
CREATE POLICY "Users read own notifications"
  ON public.reach_notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System create notifications"
  ON public.reach_notifications FOR INSERT
  WITH CHECK (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Users update own notifications"
  ON public.reach_notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Rooms: workspace-scoped
CREATE POLICY "Members read rooms"
  ON public.reach_rooms FOR SELECT
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Members create rooms"
  ON public.reach_rooms FOR INSERT
  WITH CHECK (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Members update rooms"
  ON public.reach_rooms FOR UPDATE
  USING (is_reach_member(auth.uid(), workspace_id));

-- ── TRIGGERS ────────────────────────────────
CREATE TRIGGER update_reach_workspaces_updated_at
  BEFORE UPDATE ON public.reach_workspaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reach_channels_updated_at
  BEFORE UPDATE ON public.reach_channels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reach_messages_updated_at
  BEFORE UPDATE ON public.reach_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reach_issues_updated_at
  BEFORE UPDATE ON public.reach_issues
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create #general channel + owner membership on workspace creation
CREATE OR REPLACE FUNCTION public.reach_workspace_bootstrap()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  -- Add creator as owner
  INSERT INTO public.reach_workspace_members (workspace_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'owner');

  -- Create default #general channel
  INSERT INTO public.reach_channels (workspace_id, name, description, created_by)
  VALUES (NEW.id, 'general', 'General discussion', NEW.created_by);

  RETURN NEW;
END;
$$;

CREATE TRIGGER reach_workspace_after_insert
  AFTER INSERT ON public.reach_workspaces
  FOR EACH ROW EXECUTE FUNCTION public.reach_workspace_bootstrap();

-- Auto-create issue thread channel when issue is created
CREATE OR REPLACE FUNCTION public.reach_issue_thread_bootstrap()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.reach_channels (workspace_id, name, type, linked_issue_id, created_by)
  VALUES (
    NEW.workspace_id,
    'issue-' || NEW.number,
    'issue_thread',
    NEW.id,
    NEW.created_by
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER reach_issue_after_insert
  AFTER INSERT ON public.reach_issues
  FOR EACH ROW EXECUTE FUNCTION public.reach_issue_thread_bootstrap();

-- Enable Realtime for messages and notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.reach_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reach_notifications;
