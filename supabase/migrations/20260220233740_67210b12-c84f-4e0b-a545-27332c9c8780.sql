SELECT cron.schedule(
  'notion-sync-every-5min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://psxskwerldhfjmanzbpk.supabase.co/functions/v1/notion-sync',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzeHNrd2VybGRoZmptYW56YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDU3NDQsImV4cCI6MjA4NzAyMTc0NH0.gweEX9iktbtIW_En991lHbHhMrf51_V6zqmUB3C7TYI"}'::jsonb,
    body := '{"mode": "sync_changed", "batch_size": 20}'::jsonb
  ) AS request_id;
  $$
);