
-- 1) Add default_branch to reach_workspaces
ALTER TABLE public.reach_workspaces
ADD COLUMN IF NOT EXISTS default_branch text NOT NULL DEFAULT 'main';

-- 2) Create reach_video_rooms table
CREATE TABLE IF NOT EXISTS public.reach_video_rooms (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id uuid NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'Quick Meeting',
  zoom_meeting_id text,
  zoom_join_url text,
  zoom_password text,
  is_active boolean NOT NULL DEFAULT false,
  started_by uuid,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_video_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reach members read video rooms"
  ON public.reach_video_rooms FOR SELECT
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Reach members create video rooms"
  ON public.reach_video_rooms FOR INSERT
  WITH CHECK (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Reach members update video rooms"
  ON public.reach_video_rooms FOR UPDATE
  USING (is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Reach members delete video rooms"
  ON public.reach_video_rooms FOR DELETE
  USING (is_reach_member(auth.uid(), workspace_id));
