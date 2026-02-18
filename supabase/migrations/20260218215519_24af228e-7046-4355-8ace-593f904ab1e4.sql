
-- Fix SECURITY DEFINER views by recreating them with security_invoker=on
CREATE OR REPLACE VIEW public.v_latest_sync_status
WITH (security_invoker = on) AS
  SELECT * FROM public.sync_runs
  ORDER BY started_at DESC
  LIMIT 1;

CREATE OR REPLACE VIEW public.v_module_stats
WITH (security_invoker = on) AS
  SELECT
    m.module_code,
    m.module_name,
    m.display_name,
    m.order_index,
    COUNT(p.id) AS page_count,
    MAX(p.last_synced_at) AS last_synced
  FROM public.modules m
  LEFT JOIN public.pages p ON p.module_code = m.module_code AND p.is_deleted = false
  GROUP BY m.module_code, m.module_name, m.display_name, m.order_index;
