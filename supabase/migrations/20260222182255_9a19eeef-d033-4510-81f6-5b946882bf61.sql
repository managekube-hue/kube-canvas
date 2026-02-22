
-- Main threat intelligence table
CREATE TABLE IF NOT EXISTS public.threat_intel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cve_id text UNIQUE NOT NULL,
  description text,
  published_date date,
  last_modified_date date,
  cvss_v3_score numeric(3,1),
  cvss_v2_score numeric(3,1),
  cvss_severity text,
  epss_score numeric(7,6),
  epss_percentile numeric(7,6),
  epss_updated_date date,
  is_kev boolean DEFAULT false,
  kev_added_date date,
  kev_due_date date,
  kev_known_ransomware boolean DEFAULT false,
  kev_notes text,
  vendor text,
  product text,
  risk_score numeric(4,2),
  urgency_level text,
  plain_english_summary text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_threat_intel_cve_id ON public.threat_intel(cve_id);
CREATE INDEX idx_threat_intel_is_kev ON public.threat_intel(is_kev) WHERE is_kev = true;
CREATE INDEX idx_threat_intel_severity ON public.threat_intel(cvss_severity);
CREATE INDEX idx_threat_intel_risk ON public.threat_intel(risk_score DESC);
CREATE INDEX idx_threat_intel_epss ON public.threat_intel(epss_score DESC);
CREATE INDEX idx_threat_intel_updated ON public.threat_intel(updated_at DESC);
CREATE INDEX idx_threat_intel_published ON public.threat_intel(published_date DESC);

-- Full text search
ALTER TABLE public.threat_intel ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(cve_id,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(description,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(vendor,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(product,'')), 'B')
  ) STORED;

CREATE INDEX idx_threat_intel_search ON public.threat_intel USING gin(search_vector);

-- Sync metadata table
CREATE TABLE IF NOT EXISTS public.sync_metadata (
  id integer PRIMARY KEY DEFAULT 1,
  last_sync timestamptz,
  sync_status text,
  records_updated integer,
  error_message text,
  sync_duration_ms integer,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO public.sync_metadata (id, last_sync, sync_status)
VALUES (1, NULL, 'never_run')
ON CONFLICT (id) DO NOTHING;

-- RLS
ALTER TABLE public.threat_intel ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view threat intel" ON public.threat_intel FOR SELECT USING (true);
CREATE POLICY "Service role manages threat intel" ON public.threat_intel FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.sync_metadata ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view sync metadata" ON public.sync_metadata FOR SELECT USING (true);
CREATE POLICY "Service role manages sync metadata" ON public.sync_metadata FOR ALL USING (auth.role() = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER update_threat_intel_updated_at
  BEFORE UPDATE ON public.threat_intel
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
