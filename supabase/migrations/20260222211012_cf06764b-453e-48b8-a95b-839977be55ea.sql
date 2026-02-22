
-- ══════════════════════════════════════════════════════════
-- 1. Auth: user_roles + profiles
-- ══════════════════════════════════════════════════════════

-- App role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- User roles table (separate from profiles per security guidelines)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'viewer',
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: only admins can manage roles, users can read their own
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text,
  email text,
  avatar_url text,
  access_areas text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ══════════════════════════════════════════════════════════
-- 2. Threat Intel: cve_github, cve_exploits, cve_social, cve_history
-- ══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.cve_github (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cve_id text NOT NULL,
  repo_name text NOT NULL,
  repo_url text NOT NULL UNIQUE,
  stars integer DEFAULT 0,
  has_poc boolean DEFAULT false,
  has_exploit boolean DEFAULT false,
  discovered_at timestamptz DEFAULT now()
);
ALTER TABLE public.cve_github ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view cve_github" ON public.cve_github FOR SELECT USING (true);
CREATE POLICY "Service role manages cve_github" ON public.cve_github FOR ALL USING (auth.role() = 'service_role');
CREATE INDEX idx_cve_github_cve_id ON public.cve_github(cve_id);

CREATE TABLE IF NOT EXISTS public.cve_exploits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cve_id text NOT NULL,
  exploit_type text NOT NULL DEFAULT 'exploitdb',
  title text,
  source_url text,
  verified boolean DEFAULT false,
  discovered_at timestamptz DEFAULT now()
);
ALTER TABLE public.cve_exploits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view cve_exploits" ON public.cve_exploits FOR SELECT USING (true);
CREATE POLICY "Service role manages cve_exploits" ON public.cve_exploits FOR ALL USING (auth.role() = 'service_role');
CREATE INDEX idx_cve_exploits_cve_id ON public.cve_exploits(cve_id);

CREATE TABLE IF NOT EXISTS public.cve_social (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cve_id text NOT NULL,
  platform text NOT NULL DEFAULT 'twitter',
  author text,
  content text,
  url text,
  posted_at timestamptz,
  discovered_at timestamptz DEFAULT now()
);
ALTER TABLE public.cve_social ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view cve_social" ON public.cve_social FOR SELECT USING (true);
CREATE POLICY "Service role manages cve_social" ON public.cve_social FOR ALL USING (auth.role() = 'service_role');
CREATE INDEX idx_cve_social_cve_id ON public.cve_social(cve_id);

CREATE TABLE IF NOT EXISTS public.cve_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cve_id text NOT NULL,
  score_type text NOT NULL,
  score_value numeric,
  recorded_at timestamptz DEFAULT now()
);
ALTER TABLE public.cve_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view cve_history" ON public.cve_history FOR SELECT USING (true);
CREATE POLICY "Service role manages cve_history" ON public.cve_history FOR ALL USING (auth.role() = 'service_role');
CREATE INDEX idx_cve_history_cve_id ON public.cve_history(cve_id);

-- Add exploit columns to threat_intel if missing
DO $$ BEGIN
  ALTER TABLE public.threat_intel ADD COLUMN IF NOT EXISTS cvss_vector text;
  ALTER TABLE public.threat_intel ADD COLUMN IF NOT EXISTS exploit_maturity text;
  ALTER TABLE public.threat_intel ADD COLUMN IF NOT EXISTS exploit_count integer DEFAULT 0;
  ALTER TABLE public.threat_intel ADD COLUMN IF NOT EXISTS poc_count integer DEFAULT 0;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Allow deleting leads (was missing)
CREATE POLICY "Authenticated can delete leads"
  ON public.leads FOR DELETE TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete lead_exports"
  ON public.lead_exports FOR DELETE TO authenticated
  USING (true);
