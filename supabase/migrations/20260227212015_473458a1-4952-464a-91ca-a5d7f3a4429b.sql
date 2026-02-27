
-- BOM Submissions table
CREATE TABLE public.bom_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  item_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bom_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a BOM quote
CREATE POLICY "Anyone can submit BOM quotes"
ON public.bom_submissions FOR INSERT
WITH CHECK (true);

-- CRM users can read
CREATE POLICY "CRM users read BOM submissions"
ON public.bom_submissions FOR SELECT
USING (is_crm_user(auth.uid()));

-- CRM admins full access
CREATE POLICY "CRM admins manage BOM submissions"
ON public.bom_submissions FOR ALL
USING (get_crm_role(auth.uid()) = ANY (ARRAY['super_admin'::crm_role, 'admin'::crm_role]));

-- Service role full access
CREATE POLICY "Service role full access bom_submissions"
ON public.bom_submissions FOR ALL
USING (auth.role() = 'service_role'::text);

-- Updated at trigger
CREATE TRIGGER update_bom_submissions_updated_at
BEFORE UPDATE ON public.bom_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
