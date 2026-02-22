-- Allow public to read ALL career postings (not just published) for CMS admin
DROP POLICY IF EXISTS "Public can view published careers" ON public.cms_career_postings;
CREATE POLICY "Public can view all careers"
ON public.cms_career_postings
FOR SELECT
USING (true);

-- Allow public to update career postings (for CMS admin toggle publish/edit)
CREATE POLICY "Public can update careers"
ON public.cms_career_postings
FOR UPDATE
USING (true);

-- Allow public to insert career postings
CREATE POLICY "Public can insert careers"
ON public.cms_career_postings
FOR INSERT
WITH CHECK (true);

-- Allow public to delete career postings
CREATE POLICY "Public can delete careers"
ON public.cms_career_postings
FOR DELETE
USING (true);