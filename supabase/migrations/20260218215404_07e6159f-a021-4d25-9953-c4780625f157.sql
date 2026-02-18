
-- Fix RLS policies: change from RESTRICTIVE to PERMISSIVE so anon users can read pages
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Public read pages" ON public.pages;
DROP POLICY IF EXISTS "Public read modules" ON public.modules;
DROP POLICY IF EXISTS "Public read sync_runs" ON public.sync_runs;

-- Recreate as PERMISSIVE (default) policies
CREATE POLICY "Public read pages"
  ON public.pages
  FOR SELECT
  USING (true);

CREATE POLICY "Public read modules"
  ON public.modules
  FOR SELECT
  USING (true);

CREATE POLICY "Public read sync_runs"
  ON public.sync_runs
  FOR SELECT
  USING (true);
