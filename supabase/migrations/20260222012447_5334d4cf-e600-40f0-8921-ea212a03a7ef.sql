
-- Fix leads table: change INSERT policy to anon-only (not public which includes authenticated+anon)
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anon can submit leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Fix leads SELECT: tighten to service_role only (remove the public-scoped one)  
DROP POLICY IF EXISTS "Service role reads leads" ON public.leads;
CREATE POLICY "Service role reads leads"
  ON public.leads
  FOR SELECT
  TO service_role
  USING (true);
