
-- Fix: create only the missing index
CREATE INDEX IF NOT EXISTS idx_threat_intel_updated ON threat_intel(updated_at DESC NULLS LAST);
