
-- Guard function that checks if notion-sync cron is active and re-enables it.
-- Does NOT recreate the job (avoids nested dollar-quoting issues).
-- Instead it just re-enables disabled jobs and monitors for failures.
CREATE OR REPLACE FUNCTION public.guard_notion_sync_cron()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_active boolean;
  v_job_count integer;
  v_fail_count integer;
BEGIN
  -- Check if the main sync cron job exists and is active
  SELECT COUNT(*), COALESCE(bool_and(active), false)
  INTO v_job_count, v_active
  FROM cron.job
  WHERE command ILIKE '%notion-sync%'
    AND schedule = '*/5 * * * *';

  -- If job exists but is inactive, re-enable it
  IF v_job_count > 0 AND NOT v_active THEN
    UPDATE cron.job SET active = true
    WHERE command ILIKE '%notion-sync%'
      AND schedule = '*/5 * * * *';
    INSERT INTO sync_runs (status, error_message, started_at, completed_at, duration_ms)
    VALUES ('guard_recovery', 'Cron job was inactive - automatically re-enabled by guard', now(), now(), 0);
  END IF;

  -- If job is completely missing, log an alert
  IF v_job_count = 0 THEN
    INSERT INTO sync_runs (status, error_message, started_at, completed_at, duration_ms)
    VALUES ('guard_alert', 'CRITICAL: notion-sync cron job is missing - manual recreation needed', now(), now(), 0);
  END IF;

  -- Check for 3+ consecutive failures
  SELECT COUNT(*) INTO v_fail_count
  FROM (
    SELECT status FROM sync_runs
    WHERE status NOT IN ('guard_recovery', 'guard_recreated', 'guard_alert')
    ORDER BY started_at DESC LIMIT 3
  ) recent
  WHERE recent.status = 'failed';

  IF v_fail_count >= 3 THEN
    INSERT INTO sync_runs (status, error_message, started_at, completed_at, duration_ms)
    VALUES ('guard_alert', '3+ consecutive sync failures detected', now(), now(), 0);
  END IF;
END;
$$;
