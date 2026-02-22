
-- Step 10: Lead export table for production-grade lead magnet
CREATE TABLE IF NOT EXISTS public.lead_exports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  first_name text NOT NULL,
  business_name text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lead_exports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public lead capture)
CREATE POLICY "Allow anonymous lead inserts"
  ON public.lead_exports
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only service_role can read leads
CREATE POLICY "Service role can read leads"
  ON public.lead_exports
  FOR SELECT
  TO service_role
  USING (true);
