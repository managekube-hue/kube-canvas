
-- ============================================
-- STEP 1: EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- STEP 2: TABLES
-- ============================================

-- Main pages table with full hierarchy
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon TEXT,
  path TEXT NOT NULL DEFAULT '',
  content TEXT,
  page_type TEXT CHECK (page_type IN ('root', 'module', 'group', 'subgroup', 'leaf')),
  module_code TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  notion_created_time TIMESTAMPTZ,
  notion_last_edited_time TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'B')
  ) STORED
);

CREATE INDEX IF NOT EXISTS idx_pages_parent_id ON pages(parent_id);
CREATE INDEX IF NOT EXISTS idx_pages_notion_id ON pages(notion_id);
CREATE INDEX IF NOT EXISTS idx_pages_module_code ON pages(module_code);
CREATE INDEX IF NOT EXISTS idx_pages_path_gin ON pages USING gin(path gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_pages_search_vector ON pages USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_pages_last_synced ON pages(last_synced_at DESC);
CREATE INDEX IF NOT EXISTS idx_pages_is_deleted ON pages(is_deleted);

-- Modules
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  module_code TEXT UNIQUE NOT NULL,
  module_name TEXT NOT NULL,
  display_name TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_modules_module_code ON modules(module_code);

-- Sync runs log
CREATE TABLE IF NOT EXISTS sync_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('running', 'completed', 'failed', 'partial')) DEFAULT 'running',
  pages_synced INTEGER DEFAULT 0,
  pages_created INTEGER DEFAULT 0,
  pages_updated INTEGER DEFAULT 0,
  pages_deleted INTEGER DEFAULT 0,
  error_message TEXT,
  duration_ms INTEGER
);

CREATE INDEX IF NOT EXISTS idx_sync_runs_started_at ON sync_runs(started_at DESC);

-- ============================================
-- STEP 3: TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 4: VIEWS
-- ============================================

CREATE OR REPLACE VIEW v_module_stats AS
SELECT 
  m.module_code,
  m.module_name,
  m.display_name,
  m.order_index,
  COUNT(p.id) AS page_count,
  MAX(p.last_synced_at) AS last_synced
FROM modules m
LEFT JOIN pages p ON p.module_code = m.module_code AND (p.is_deleted = FALSE OR p.id IS NULL)
GROUP BY m.id, m.module_code, m.module_name, m.display_name, m.order_index
ORDER BY m.order_index;

CREATE OR REPLACE VIEW v_latest_sync_status AS
SELECT *
FROM sync_runs
ORDER BY started_at DESC
LIMIT 1;

-- ============================================
-- STEP 5: RLS
-- ============================================

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_runs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read pages" ON pages;
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role write pages" ON pages;
CREATE POLICY "Service role write pages" ON pages FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public read modules" ON modules;
CREATE POLICY "Public read modules" ON modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role write modules" ON modules;
CREATE POLICY "Service role write modules" ON modules FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public read sync_runs" ON sync_runs;
CREATE POLICY "Public read sync_runs" ON sync_runs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role write sync_runs" ON sync_runs;
CREATE POLICY "Service role write sync_runs" ON sync_runs FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- STEP 6: SEED MODULES
-- ============================================

INSERT INTO modules (module_code, module_name, display_name, order_index) VALUES
('K-VENDOR-00', 'K-VENDOR-00_DETECTION_ASSETS', 'Detection Assets', 0),
('01_PLATFORM_CORE', '01_PLATFORM_CORE', 'Platform Core', 1),
('02_XRO_SUPER_AGENT', '02_XRO_SUPER_AGENT', 'XRO Super Agent', 2),
('03_KAI_ORCHESTRATION', '03_KAI_ORCHESTRATION', 'KAI Orchestration', 3),
('04_SOC', '04_SOC', 'Security Operations', 4),
('05_NOC', '05_NOC', 'Network Operations', 5),
('06_GRC', '06_GRC', 'Governance & Compliance', 6),
('07_PSA', '07_PSA', 'Business Operations', 7),
('08_DEVELOPMENT', '08_DEVELOPMENT', 'Development', 8),
('09_API', '09_API', 'API Reference', 9),
('10_ITIL', '10_ITIL', 'ITIL Framework', 10),
('K-MAP-11', 'K-MAP-11_DR_MODULE_MAPPING', 'DR Module Mapping', 11),
('K-DEPLOY-12', 'K-DEPLOY-12_TOPOLOGIES', 'Deployment Topologies', 12)
ON CONFLICT (module_code) DO NOTHING;
