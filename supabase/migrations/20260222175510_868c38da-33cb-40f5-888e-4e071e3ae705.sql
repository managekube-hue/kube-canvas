
-- Add HubSpot sync and tracking columns to lead_exports
ALTER TABLE public.lead_exports
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS csv_exported boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS hubspot_synced boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS hubspot_synced_at timestamptz,
  ADD COLUMN IF NOT EXISTS hubspot_contact_id text,
  ADD COLUMN IF NOT EXISTS error_message text,
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS user_agent text;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_lead_exports_email ON public.lead_exports(email);
CREATE INDEX IF NOT EXISTS idx_lead_exports_created ON public.lead_exports(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_exports_hubspot_synced ON public.lead_exports(hubspot_synced) WHERE hubspot_synced = false;
