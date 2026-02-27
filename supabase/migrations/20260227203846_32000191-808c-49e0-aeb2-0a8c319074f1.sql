-- Ensure pg_net is available for HTTP calls from cron
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Schedule crm-sync-monitor to run every 15 minutes
SELECT cron.schedule(
  'crm-sync-monitor-15min',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://psxskwerldhfjmanzbpk.supabase.co/functions/v1/crm-sync-monitor',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzeHNrd2VybGRoZmptYW56YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDU3NDQsImV4cCI6MjA4NzAyMTc0NH0.gweEX9iktbtIW_En991lHbHhMrf51_V6zqmUB3C7TYI"}'::jsonb,
    body := concat('{"triggered_at": "', now(), '"}')::jsonb
  ) AS request_id;
  $$
);
