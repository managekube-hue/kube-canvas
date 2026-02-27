
-- Create storage bucket for career application resumes
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Allow anyone to upload resumes (public application form)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Only authenticated CRM users can read resumes
CREATE POLICY "Authenticated users can read resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Only authenticated users can delete resumes
CREATE POLICY "Authenticated users can delete resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');
