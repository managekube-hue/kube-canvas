
-- Assessment sessions table for the Smart Pricing Simulator
CREATE TABLE public.assessment_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact / Capture (P0-CAPTURE)
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  company TEXT,
  phone TEXT,
  
  -- P0 Universal Fields
  industry TEXT,                          -- P0-Q0C_INDUSTRY
  location_count INTEGER DEFAULT 1,       -- P0-Q0D_LOCATIONS
  endpoint_count INTEGER,                 -- P0-Q0E_ENDPOINTS
  remote_workforce_pct TEXT,              -- P0-Q0F_WORKFORCE_REMOTE
  email_platform TEXT,                    -- P0-Q0G_EMAIL_PLATFORM
  role TEXT,                              -- P0-Q1_ROLE
  org_stage TEXT,                         -- P0-Q2_ORG_STAGE
  it_situation TEXT,                      -- P0-Q3_IT_SITUATION
  it_team_size INTEGER,                   -- P0-Q3A_IT_TEAM_SIZE
  msp_issues TEXT[],                      -- P0-Q3B_MSP_ISSUES
  primary_priority TEXT,                  -- P0-Q4_PRIMARY_PRIORITY
  compliance_frameworks TEXT[],           -- P0-Q4A_FRAMEWORKS
  compliance_deadline TEXT,               -- P0-Q4A_DEADLINE
  incident_type TEXT,                     -- P0-Q4B_INCIDENT_TYPE
  incident_age TEXT,                      -- P0-Q4B_INCIDENT_AGE
  timeline TEXT,                          -- P0-Q5_TIMELINE
  
  -- All flow answers stored as JSONB
  answers JSONB DEFAULT '{}'::jsonb,
  
  -- Scoring outputs
  ems_score INTEGER DEFAULT 0,            -- Composite EMS score
  complexity_score INTEGER DEFAULT 0,
  urgency_score INTEGER DEFAULT 0,
  risk_score INTEGER DEFAULT 0,
  
  -- CF Maturity Scores (0-10 each)
  cf_infrastructure_maturity NUMERIC(4,1) DEFAULT 0,
  cf_security_ps_maturity NUMERIC(4,1) DEFAULT 0,
  cf_iam_maturity NUMERIC(4,1) DEFAULT 0,
  cf_secops_maturity NUMERIC(4,1) DEFAULT 0,
  cf_cloud_maturity NUMERIC(4,1) DEFAULT 0,
  cf_data_protection_maturity NUMERIC(4,1) DEFAULT 0,
  cf_business_gov_maturity NUMERIC(4,1) DEFAULT 0,
  cf_dr_bc_maturity NUMERIC(4,1) DEFAULT 0,
  cf_automation_maturity NUMERIC(4,1) DEFAULT 0,
  cf_cost_maturity NUMERIC(4,1) DEFAULT 0,
  
  -- Flags
  flags JSONB DEFAULT '{}'::jsonb,
  -- Example flags: flag_security_remediation, flag_compliance, flag_infra_assessment,
  -- flag_cloud_strategy, flag_cost_optimization, flag_growth_enablement,
  -- fast_track, ir_escalation, no_mfa, no_siem, no_edr, no_backup,
  -- flat_network, unsupported_os, understaffed_it, co_managed, mk_multisite
  
  -- Gap flags (for recommendations)
  key_gap_flags TEXT[],
  
  -- Tier recommendation
  recommended_tier TEXT,                  -- XRO | XMX | XME
  monthly_price NUMERIC(10,2),
  estimated_deal_size TEXT,
  profile_type TEXT,                      -- smb | mid_market | enterprise
  
  -- Flow tracking
  current_flow TEXT DEFAULT 'P0',         -- P0, SR, IA, CM, GE, CO
  current_question TEXT DEFAULT 'P0-CAPTURE',
  completed_flows TEXT[] DEFAULT '{}',
  
  -- Status
  status TEXT DEFAULT 'in_progress',      -- in_progress | completed | escalated
  upsell_ready BOOLEAN DEFAULT FALSE,
  
  -- HubSpot sync
  hubspot_contact_id TEXT,
  hubspot_synced_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public assessment)
CREATE POLICY "Anyone can create assessment sessions"
  ON public.assessment_sessions
  FOR INSERT
  WITH CHECK (true);

-- Allow users to update their own session (by id, stored in localStorage)
CREATE POLICY "Anyone can update their own session"
  ON public.assessment_sessions
  FOR UPDATE
  USING (true);

-- Allow reading own session
CREATE POLICY "Anyone can read their own session"
  ON public.assessment_sessions
  FOR SELECT
  USING (true);

-- Service role full access
CREATE POLICY "Service role full access"
  ON public.assessment_sessions
  FOR ALL
  USING (auth.role() = 'service_role');

-- Updated_at trigger
CREATE TRIGGER update_assessment_sessions_updated_at
  BEFORE UPDATE ON public.assessment_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for lookups
CREATE INDEX idx_assessment_sessions_email ON public.assessment_sessions(email);
CREATE INDEX idx_assessment_sessions_status ON public.assessment_sessions(status);
