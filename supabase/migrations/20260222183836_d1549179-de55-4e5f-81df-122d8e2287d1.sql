
-- ============================================
-- CMS CONTACTS TABLE — mirrors HubSpot mk_* properties
-- Parallel path: all forms write here AND to HubSpot
-- ============================================
CREATE TABLE public.cms_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Core contact info (mirrors HubSpot native)
  email text NOT NULL,
  first_name text,
  last_name text,
  company text,
  phone text,
  job_title text,
  website text,
  lifecycle_stage text DEFAULT 'lead',
  
  -- Source tracking
  source text NOT NULL DEFAULT 'website',  -- 'assessment', 'get-started', 'contact', 'threat-ai', 'careers'
  source_detail text,  -- e.g. 'quick-contact', 'full-assessment', 'csv-export'
  
  -- Assessment scoring (mk_* mirror)
  mk_ems_score integer,
  mk_onb_urgency_score integer,
  mk_onb_risk_score integer,
  mk_recommended_tier text,
  mk_monthly_price numeric,
  mk_onb_profile_type text,
  mk_upsell_ready boolean DEFAULT false,
  mk_onb_completed_at timestamptz,
  mk_key_gaps_flags text[],
  mk_fast_track boolean DEFAULT false,
  mk_ir_escalation boolean DEFAULT false,
  
  -- Control family maturity
  mk_cf_infrastructure_maturity numeric DEFAULT 0,
  mk_cf_secops_maturity numeric DEFAULT 0,
  mk_cf_iam_maturity numeric DEFAULT 0,
  mk_cf_cloud_maturity numeric DEFAULT 0,
  mk_cf_dataprotection_maturity numeric DEFAULT 0,
  mk_cf_automation_maturity numeric DEFAULT 0,
  mk_cf_cost_maturity numeric DEFAULT 0,
  mk_cf_business_gov_maturity numeric DEFAULT 0,
  
  -- Assessment context
  mk_onb_role text,
  mk_onb_org_stage text,
  mk_onb_it_situation text,
  mk_it_team_size text,
  mk_onb_msp_issues text,
  mk_onb_priority text,
  mk_compliance_in_scope text,
  mk_has_compliance_deadline boolean DEFAULT false,
  mk_compliance_deadline_date text,
  mk_security_incident_types text,
  mk_security_incident_age text,
  mk_onb_timeline text,
  mk_endpoint_count text,
  mk_location_count text,
  mk_remote_workforce_pct text,
  mk_email_platform text,
  mk_industry_vertical text,
  mk_onb_estimated_deal_size text,
  
  -- Routing flags
  mk_flag_security_remediation boolean DEFAULT false,
  mk_flag_infra_assessment boolean DEFAULT false,
  mk_flag_cloud_strategy boolean DEFAULT false,
  mk_flag_cost_optimization boolean DEFAULT false,
  mk_flag_growth_enablement boolean DEFAULT false,
  mk_flag_compliance boolean DEFAULT false,
  mk_flag_understaffed_it boolean DEFAULT false,
  mk_multisite boolean DEFAULT false,
  
  -- Deep-dive flow properties (SR, CM, GE, CO, IA)
  mk_sr_incident_status text,
  mk_sr_network_posture text,
  mk_cloud_usage_level text,
  mk_cloud_drivers text,
  mk_hosting_state text,
  mk_migration_scope text,
  mk_integration_dependencies text,
  mk_cloud_dr_strategy text,
  mk_rto_requirement text,
  mk_cloud_skills_level text,
  mk_cloud_success_metrics text,
  mk_cloud_budget text,
  mk_growth_trajectory text,
  mk_headcount_growth text,
  mk_growth_bottleneck text,
  mk_automation_targets text,
  mk_automation_tools text,
  mk_integration_architecture text,
  mk_scalability_bottlenecks text,
  mk_api_maturity text,
  mk_multisite_expansion text,
  mk_annual_it_budget text,
  mk_budget_distribution text,
  mk_vendor_count text,
  mk_cloud_cost_visibility text,
  mk_cloud_waste_status text,
  mk_licence_tracking text,
  mk_tool_overlap text,
  mk_contract_renewals text,
  mk_unused_contracts text,
  mk_savings_target text,
  mk_cyber_insurance text,
  mk_hyperv_version text,
  mk_vmware_version text,
  mk_dr_plan_status text,
  
  -- Free-form message (for contact/get-started forms)
  message text,
  challenges text[],
  org_size text,
  industry text,
  
  -- HubSpot sync status
  hubspot_contact_id text,
  hubspot_synced boolean DEFAULT false,
  hubspot_synced_at timestamptz,
  hubspot_error text,
  
  -- Assessment session link
  assessment_session_id uuid,
  
  -- Metadata
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_cms_contacts_email ON public.cms_contacts(email);
CREATE INDEX idx_cms_contacts_source ON public.cms_contacts(source);
CREATE INDEX idx_cms_contacts_created ON public.cms_contacts(created_at DESC);
CREATE INDEX idx_cms_contacts_hubspot ON public.cms_contacts(hubspot_synced) WHERE hubspot_synced = false;
CREATE INDEX idx_cms_contacts_lifecycle ON public.cms_contacts(lifecycle_stage);

-- RLS
ALTER TABLE public.cms_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contacts"
  ON public.cms_contacts FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access cms_contacts"
  ON public.cms_contacts FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public can read own contact by email"
  ON public.cms_contacts FOR SELECT USING (true);

-- Updated_at trigger
CREATE TRIGGER update_cms_contacts_updated_at
  BEFORE UPDATE ON public.cms_contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ============================================
-- CMS CAREER POSTINGS TABLE
-- ============================================
CREATE TABLE public.cms_career_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,  -- 'SOC', 'NOC', 'Engineering', 'Sales', 'Customer Success'
  location text DEFAULT 'Remote / Hybrid',
  employment_type text DEFAULT 'Full-time',  -- 'Full-time', 'Part-time', 'Contract'
  description text NOT NULL,
  requirements text[],
  nice_to_haves text[],
  salary_range text,
  application_email text NOT NULL DEFAULT 'careers@managekube.com',
  is_published boolean DEFAULT false,
  published_at timestamptz,
  expires_at timestamptz,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.cms_career_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published careers"
  ON public.cms_career_postings FOR SELECT USING (is_published = true);

CREATE POLICY "Service role manages careers"
  ON public.cms_career_postings FOR ALL USING (auth.role() = 'service_role');

-- Updated_at trigger  
CREATE TRIGGER update_cms_career_postings_updated_at
  BEFORE UPDATE ON public.cms_career_postings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ============================================
-- CMS CAREER APPLICATIONS TABLE
-- ============================================
CREATE TABLE public.cms_career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  posting_id uuid REFERENCES public.cms_career_postings(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  resume_url text,
  cover_letter text,
  linkedin_url text,
  status text DEFAULT 'new',  -- 'new', 'reviewed', 'interviewing', 'offered', 'rejected'
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.cms_career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit career applications"
  ON public.cms_career_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role manages applications"
  ON public.cms_career_applications FOR ALL USING (auth.role() = 'service_role');

-- Updated_at trigger
CREATE TRIGGER update_cms_career_applications_updated_at
  BEFORE UPDATE ON public.cms_career_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ============================================
-- SEED INITIAL CAREER POSTINGS
-- ============================================
INSERT INTO public.cms_career_postings (title, department, location, description, requirements, nice_to_haves, application_email, is_published, published_at, sort_order) VALUES
('SOC Analyst', 'Security Operations', 'Remote / Memphis, TN', 'Join our 24/7 Security Operations Center monitoring client environments, triaging alerts, and executing incident response procedures using our KUBRIC platform.', 
  ARRAY['2+ years SOC/SIEM experience', 'CompTIA Security+ or equivalent', 'Experience with EDR/XDR platforms', 'Strong analytical and communication skills'],
  ARRAY['GCIA, GCIH, or OSCP certifications', 'Experience with Wazuh, Elastic, or Splunk', 'Scripting skills (Python, PowerShell)'],
  'careers@managekube.com', true, now(), 1),

('NOC Engineer', 'Network Operations', 'Remote / Memphis, TN', 'Monitor and maintain client network infrastructure, respond to alerts, perform maintenance windows, and ensure SLA compliance across managed environments.',
  ARRAY['3+ years network operations experience', 'CCNA or equivalent certification', 'Experience with monitoring platforms (PRTG, Zabbix, LibreNMS)', 'Understanding of TCP/IP, routing, switching, firewalls'],
  ARRAY['CCNP or equivalent', 'Experience with SD-WAN', 'Cloud networking (AWS VPC, Azure VNet)'],
  'careers@managekube.com', true, now(), 2),

('Detection Engineer', 'Engineering', 'Remote', 'Build and tune detection rules, develop SIEM correlation logic, create automated response playbooks, and continuously improve our detection coverage across the MITRE ATT&CK framework.',
  ARRAY['3+ years detection engineering or threat hunting', 'Proficiency in SIEM rule languages (Sigma, KQL, SPL)', 'Strong understanding of MITRE ATT&CK', 'Experience building automated detection pipelines'],
  ARRAY['Malware analysis experience', 'Threat intelligence background', 'Open-source tool contributions'],
  'careers@managekube.com', true, now(), 3),

('Platform Engineer', 'Engineering', 'Remote', 'Design, build, and maintain the KUBRIC platform infrastructure. Work with Kubernetes, NATS, PostgreSQL, and our microservices architecture to deliver reliable security services at scale.',
  ARRAY['4+ years platform/infrastructure engineering', 'Strong Kubernetes experience', 'CI/CD pipeline design and management', 'Infrastructure as Code (Terraform, Ansible)'],
  ARRAY['Experience with NATS or similar messaging', 'Rust, Go, or TypeScript expertise', 'Open-source project contributions'],
  'careers@managekube.com', true, now(), 4),

('Customer Success Manager', 'Customer Success', 'Remote / Memphis, TN', 'Own the post-onboarding client relationship. Drive adoption, manage QBRs, identify expansion opportunities, and ensure clients achieve their security and IT operations goals.',
  ARRAY['3+ years customer success in B2B SaaS or MSP', 'Strong understanding of IT/security services', 'Excellent presentation and relationship skills', 'Experience with CRM tools (HubSpot preferred)'],
  ARRAY['MSP or MSSP industry experience', 'Technical certifications', 'Experience with compliance frameworks'],
  'careers@managekube.com', true, now(), 5),

('Sales Development Representative', 'Sales', 'Remote / Memphis, TN', 'Generate qualified pipeline through outbound prospecting, inbound lead qualification, and strategic account research. First point of contact for prospects entering our sales funnel.',
  ARRAY['1+ years SDR or inside sales experience', 'Strong written and verbal communication', 'Experience with HubSpot or similar CRM', 'Self-motivated with strong work ethic'],
  ARRAY['IT/cybersecurity industry knowledge', 'Experience selling to mid-market or enterprise', 'Familiarity with MEDDIC or similar frameworks'],
  'careers@managekube.com', true, now(), 6);
