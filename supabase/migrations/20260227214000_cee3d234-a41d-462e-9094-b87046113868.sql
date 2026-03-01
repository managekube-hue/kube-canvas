
-- Allow the first authenticated user to self-provision as super_admin when crm_users is empty
CREATE OR REPLACE FUNCTION public.crm_users_is_empty()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (SELECT 1 FROM public.crm_users LIMIT 1)
$$;

-- Bootstrap policy: first user can insert themselves
CREATE POLICY "First user bootstrap insert"
ON public.crm_users
FOR INSERT
TO authenticated
WITH CHECK (
  public.crm_users_is_empty()
  AND auth.uid() = user_id
);

-- Allow CRM users to read the count (needed for bootstrap check)
CREATE POLICY "Authenticated users can count crm_users"
ON public.crm_users
FOR SELECT
TO authenticated
USING (
  is_crm_user(auth.uid()) OR crm_users_is_empty()
);

-- Drop the old narrower SELECT policy since new one covers it
DROP POLICY IF EXISTS "CRM users view all users" ON public.crm_users;
