
-- Schedule the guard to run every 15 minutes
SELECT cron.schedule(
  'notion-sync-guard',
  '*/15 * * * *',
  'SELECT public.guard_notion_sync_cron()'
);
