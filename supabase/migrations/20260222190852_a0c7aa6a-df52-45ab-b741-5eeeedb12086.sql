-- Add status column to leads table for active/inactive management
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Add status column to lead_exports for same
ALTER TABLE public.lead_exports ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Allow public to update leads status (for CMS admin)
CREATE POLICY "Public can update leads" ON public.leads FOR UPDATE USING (true);

-- Allow public to update lead_exports status
CREATE POLICY "Public can update lead_exports" ON public.lead_exports FOR UPDATE USING (true);