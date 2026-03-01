-- Create storage bucket for CRM documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('crm-documents', 'crm-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for CRM documents
CREATE POLICY "Authenticated users upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'crm-documents');

CREATE POLICY "Authenticated users read documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'crm-documents');

CREATE POLICY "Authenticated users delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'crm-documents');

-- Email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  type text NOT NULL DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CRM users read templates"
ON public.email_templates FOR SELECT
TO authenticated
USING (public.is_crm_user(auth.uid()));

CREATE POLICY "CRM admins manage templates"
ON public.email_templates FOR ALL
TO authenticated
USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
