
-- Store per-user Zoom OAuth tokens (user-managed OAuth flow)
CREATE TABLE public.reach_zoom_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  zoom_email TEXT,
  zoom_user_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.reach_zoom_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only see/manage their own tokens
CREATE POLICY "Users can read own zoom tokens"
  ON public.reach_zoom_tokens FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own zoom tokens"
  ON public.reach_zoom_tokens FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own zoom tokens"
  ON public.reach_zoom_tokens FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own zoom tokens"
  ON public.reach_zoom_tokens FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Auto-update timestamp
CREATE TRIGGER update_reach_zoom_tokens_updated_at
  BEFORE UPDATE ON public.reach_zoom_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
