
-- Leads table for /get-started onboarding and /tools/threat-ai gated access
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  industry TEXT,
  org_size TEXT,
  challenges TEXT[],
  message TEXT,
  source TEXT NOT NULL DEFAULT 'get-started',
  recommended_tier TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (lead capture forms are public)
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read leads (admin/backend only)
CREATE POLICY "Service role reads leads"
  ON public.leads
  FOR SELECT
  USING (auth.role() = 'service_role');
