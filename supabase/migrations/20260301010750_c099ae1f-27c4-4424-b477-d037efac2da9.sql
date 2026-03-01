-- Fix: workspace creator can't read their own workspace after INSERT...RETURNING
-- because the AFTER trigger (reach_workspace_bootstrap) hasn't fired yet when RETURNING evaluates.
-- Add a SELECT policy allowing the creator to always see their own workspaces.

CREATE POLICY "Creators read own workspaces"
ON public.reach_workspaces
FOR SELECT
USING (auth.uid() = created_by);
