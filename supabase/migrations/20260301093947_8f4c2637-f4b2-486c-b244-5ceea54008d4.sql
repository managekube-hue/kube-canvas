
-- Developer AI configs for BYOK model
CREATE TABLE public.developer_ai_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('anthropic','openai','google','mistral','groq','cohere')),
  api_key_encrypted TEXT NOT NULL,
  model_preference TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

ALTER TABLE public.developer_ai_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own AI configs"
  ON public.developer_ai_configs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- CometChat channel mapping
CREATE TABLE public.reach_cometchat_channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.reach_workspaces(id) ON DELETE CASCADE,
  cometchat_guid TEXT NOT NULL UNIQUE,
  channel_name TEXT NOT NULL,
  channel_type TEXT NOT NULL DEFAULT 'group' CHECK (channel_type IN ('group','direct','issue_thread')),
  linked_issue_id UUID REFERENCES public.reach_issues(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reach_cometchat_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members see channels"
  ON public.reach_cometchat_channels FOR SELECT
  USING (public.is_reach_member(auth.uid(), workspace_id));

CREATE POLICY "Owners/admins manage channels"
  ON public.reach_cometchat_channels FOR ALL
  USING (public.get_reach_role(auth.uid(), workspace_id) IN ('owner','admin'))
  WITH CHECK (public.get_reach_role(auth.uid(), workspace_id) IN ('owner','admin'));

-- Trigger for updated_at
CREATE TRIGGER update_developer_ai_configs_updated_at
  BEFORE UPDATE ON public.developer_ai_configs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reach_cometchat_channels_updated_at
  BEFORE UPDATE ON public.reach_cometchat_channels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
