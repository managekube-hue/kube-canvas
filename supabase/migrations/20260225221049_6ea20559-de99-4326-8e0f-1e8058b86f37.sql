
-- ═══════════════════════════════════════════════════════════════
-- ManageKube CRM — Phase 1: Core Schema Migration
-- 47 tables, 7 roles, full RLS
-- ═══════════════════════════════════════════════════════════════

-- 1. CRM Role enum
CREATE TYPE public.crm_role AS ENUM (
  'super_admin', 'admin', 'account_manager', 'technician', 'dispatcher', 'billing', 'portal_user'
);

-- 2. CRM Users (extends auth.users for CRM context)
CREATE TABLE public.crm_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role crm_role NOT NULL DEFAULT 'technician',
  first_name text,
  last_name text,
  email text NOT NULL,
  phone text,
  avatar_url text,
  title text,
  department text,
  is_active boolean DEFAULT true,
  capacity_hours_per_week numeric(5,2) DEFAULT 40,
  hourly_cost numeric(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_users ENABLE ROW LEVEL SECURITY;

-- 3. Organizations
CREATE TABLE public.crm_organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text DEFAULT 'client',
  status text DEFAULT 'active',
  industry text,
  website text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  zip text,
  country text DEFAULT 'US',
  employee_count integer,
  annual_revenue numeric(14,2),
  health_score integer DEFAULT 50,
  nps_score integer,
  stripe_customer_id text,
  primary_contact_id uuid,
  account_manager_id uuid REFERENCES public.crm_users(id),
  sla_tier text DEFAULT 'standard',
  contract_value_monthly numeric(12,2) DEFAULT 0,
  onboarded_at timestamptz,
  next_qbr_date date,
  notes text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_organizations ENABLE ROW LEVEL SECURITY;

-- 4. Org Members (which CRM users can see which orgs)
CREATE TABLE public.crm_org_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.crm_users(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, user_id)
);
ALTER TABLE public.crm_org_members ENABLE ROW LEVEL SECURITY;

-- 5. Contacts
CREATE TABLE public.crm_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text,
  email text,
  phone text,
  mobile text,
  job_title text,
  department text,
  is_primary boolean DEFAULT false,
  is_decision_maker boolean DEFAULT false,
  is_technical boolean DEFAULT false,
  preferred_channel text DEFAULT 'email',
  timezone text DEFAULT 'America/New_York',
  linkedin_url text,
  avatar_url text,
  lead_score integer DEFAULT 0,
  lifecycle_stage text DEFAULT 'lead',
  source text,
  last_contacted_at timestamptz,
  tags text[] DEFAULT '{}',
  custom_fields jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;

-- Add FK for primary_contact on orgs
ALTER TABLE public.crm_organizations
  ADD CONSTRAINT crm_organizations_primary_contact_fkey
  FOREIGN KEY (primary_contact_id) REFERENCES public.crm_contacts(id) ON DELETE SET NULL;

-- 6. Deal Stages (pipeline config)
CREATE TABLE public.crm_deal_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  probability integer DEFAULT 0,
  is_won boolean DEFAULT false,
  is_lost boolean DEFAULT false,
  color text DEFAULT '#6366f1',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_deal_stages ENABLE ROW LEVEL SECURITY;

-- Seed default stages
INSERT INTO public.crm_deal_stages (name, order_index, probability, is_won, is_lost, color) VALUES
  ('Lead', 0, 10, false, false, '#94a3b8'),
  ('Discovery', 1, 25, false, false, '#3b82f6'),
  ('Proposal', 2, 50, false, false, '#8b5cf6'),
  ('Negotiation', 3, 75, false, false, '#f59e0b'),
  ('Closed Won', 4, 100, true, false, '#22c55e'),
  ('Closed Lost', 5, 0, false, true, '#ef4444');

-- 7. Deals
CREATE TABLE public.crm_deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  stage_id uuid REFERENCES public.crm_deal_stages(id) NOT NULL,
  owner_id uuid REFERENCES public.crm_users(id),
  value numeric(12,2) DEFAULT 0,
  mrr numeric(12,2) DEFAULT 0,
  currency text DEFAULT 'USD',
  probability integer DEFAULT 0,
  expected_close_date date,
  actual_close_date date,
  loss_reason text,
  source text,
  description text,
  tags text[] DEFAULT '{}',
  custom_fields jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_deals ENABLE ROW LEVEL SECURITY;

-- 8. Activities (unified timeline)
CREATE TABLE public.crm_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, -- note, email, call, meeting, task_completed, stage_change, sla_breach, etc.
  subject text,
  body text,
  user_id uuid REFERENCES public.crm_users(id),
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  deal_id uuid REFERENCES public.crm_deals(id) ON DELETE SET NULL,
  ticket_id uuid, -- FK added after tickets table
  is_internal boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;

-- 9. Tasks
CREATE TABLE public.crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text DEFAULT 'open', -- open, in_progress, completed, cancelled
  priority text DEFAULT 'medium', -- low, medium, high, urgent
  due_date timestamptz,
  completed_at timestamptz,
  assigned_to uuid REFERENCES public.crm_users(id),
  created_by uuid REFERENCES public.crm_users(id),
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  deal_id uuid REFERENCES public.crm_deals(id) ON DELETE SET NULL,
  ticket_id uuid, -- FK added after tickets table
  is_automated boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;

-- 10. Tickets
CREATE TABLE public.crm_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  subject text NOT NULL,
  description text,
  status text DEFAULT 'open', -- open, in_progress, waiting_on_client, waiting_on_vendor, escalated, resolved, closed
  priority text DEFAULT 'medium', -- low, medium, high, critical
  type text DEFAULT 'incident', -- incident, service_request, problem, change, project_task
  source text DEFAULT 'manual', -- manual, email, portal, chat, phone, api, monitor
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE NOT NULL,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  assigned_to uuid REFERENCES public.crm_users(id),
  created_by uuid REFERENCES public.crm_users(id),
  asset_id uuid, -- FK added after assets table
  sla_tier text,
  sla_response_due timestamptz,
  sla_resolve_due timestamptz,
  sla_response_met boolean,
  sla_resolve_met boolean,
  first_response_at timestamptz,
  resolved_at timestamptz,
  closed_at timestamptz,
  satisfaction_score integer, -- 1-5
  tags text[] DEFAULT '{}',
  custom_fields jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_tickets ENABLE ROW LEVEL SECURITY;

-- Add ticket FK to activities and tasks
ALTER TABLE public.crm_activities ADD CONSTRAINT crm_activities_ticket_fkey
  FOREIGN KEY (ticket_id) REFERENCES public.crm_tickets(id) ON DELETE SET NULL;
ALTER TABLE public.crm_tasks ADD CONSTRAINT crm_tasks_ticket_fkey
  FOREIGN KEY (ticket_id) REFERENCES public.crm_tickets(id) ON DELETE SET NULL;

-- 11. Time Entries
CREATE TABLE public.crm_time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES public.crm_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.crm_users(id) NOT NULL,
  organization_id uuid REFERENCES public.crm_organizations(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  duration_minutes integer,
  description text,
  is_billable boolean DEFAULT true,
  is_billed boolean DEFAULT false,
  invoice_id uuid, -- FK added after invoices table
  hourly_rate numeric(10,2),
  location jsonb, -- {lat, lng} for mobile GPS
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_time_entries ENABLE ROW LEVEL SECURITY;

-- 12. Contracts
CREATE TABLE public.crm_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE NOT NULL,
  deal_id uuid REFERENCES public.crm_deals(id) ON DELETE SET NULL,
  title text NOT NULL,
  status text DEFAULT 'draft', -- draft, active, expiring, expired, cancelled
  type text DEFAULT 'managed_services', -- managed_services, project, retainer, license
  start_date date NOT NULL,
  end_date date,
  auto_renew boolean DEFAULT true,
  renewal_notice_days integer DEFAULT 90,
  mrr numeric(12,2) DEFAULT 0,
  total_value numeric(14,2) DEFAULT 0,
  billing_frequency text DEFAULT 'monthly', -- monthly, quarterly, annual
  stripe_subscription_id text,
  signed_at timestamptz,
  signed_by uuid REFERENCES public.crm_contacts(id),
  pdf_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_contracts ENABLE ROW LEVEL SECURITY;

-- 13. Contract Line Items
CREATE TABLE public.crm_contract_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid REFERENCES public.crm_contracts(id) ON DELETE CASCADE NOT NULL,
  description text NOT NULL,
  quantity integer DEFAULT 1,
  unit_price numeric(12,4) NOT NULL,
  total numeric(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  is_recurring boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_contract_line_items ENABLE ROW LEVEL SECURITY;

-- 14. Assets
CREATE TABLE public.crm_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL, -- server, workstation, laptop, network, firewall, switch, printer, mobile, virtual_machine, cloud_resource, other
  manufacturer text,
  model text,
  serial_number text,
  asset_tag text,
  status text DEFAULT 'active', -- active, maintenance, decommissioned, missing, rma
  health_status text DEFAULT 'unknown', -- green, yellow, red, unknown
  location text,
  assigned_to uuid REFERENCES public.crm_contacts(id),
  ip_address text,
  mac_address text,
  os_name text,
  os_version text,
  warranty_expiry date,
  purchase_date date,
  purchase_price numeric(12,2),
  rmm_agent_id text,
  last_seen_at timestamptz,
  custom_fields jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_assets ENABLE ROW LEVEL SECURITY;

-- Add asset FK to tickets
ALTER TABLE public.crm_tickets ADD CONSTRAINT crm_tickets_asset_fkey
  FOREIGN KEY (asset_id) REFERENCES public.crm_assets(id) ON DELETE SET NULL;

-- 15. Invoices
CREATE TABLE public.crm_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE NOT NULL,
  contract_id uuid REFERENCES public.crm_contracts(id) ON DELETE SET NULL,
  status text DEFAULT 'draft', -- draft, sent, viewed, paid, overdue, void
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date NOT NULL,
  subtotal numeric(12,2) DEFAULT 0,
  tax_rate numeric(5,2) DEFAULT 0,
  tax_amount numeric(12,2) DEFAULT 0,
  total numeric(12,2) DEFAULT 0,
  amount_paid numeric(12,2) DEFAULT 0,
  balance_due numeric(12,2) GENERATED ALWAYS AS (total - amount_paid) STORED,
  currency text DEFAULT 'USD',
  stripe_invoice_id text,
  stripe_payment_intent_id text,
  payment_url text,
  sent_at timestamptz,
  paid_at timestamptz,
  pdf_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_invoices ENABLE ROW LEVEL SECURITY;

-- Add invoice FK to time entries
ALTER TABLE public.crm_time_entries ADD CONSTRAINT crm_time_entries_invoice_fkey
  FOREIGN KEY (invoice_id) REFERENCES public.crm_invoices(id) ON DELETE SET NULL;

-- 16. Invoice Line Items
CREATE TABLE public.crm_invoice_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES public.crm_invoices(id) ON DELETE CASCADE NOT NULL,
  description text NOT NULL,
  quantity numeric(10,2) DEFAULT 1,
  unit_price numeric(12,4) NOT NULL,
  total numeric(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  type text DEFAULT 'service', -- service, product, time, license, expense
  time_entry_id uuid REFERENCES public.crm_time_entries(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_invoice_line_items ENABLE ROW LEVEL SECURITY;

-- 17. Deployment Schedules
CREATE TABLE public.crm_deployment_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'planned', -- planned, in_progress, completed, cancelled
  scheduled_date date NOT NULL,
  scheduled_time time,
  assigned_to uuid REFERENCES public.crm_users(id),
  ticket_id uuid REFERENCES public.crm_tickets(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_deployment_schedules ENABLE ROW LEVEL SECURITY;

-- 18. Deployment Checklist Items
CREATE TABLE public.crm_deployment_checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id uuid REFERENCES public.crm_deployment_schedules(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  is_completed boolean DEFAULT false,
  completed_by uuid REFERENCES public.crm_users(id),
  completed_at timestamptz,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_deployment_checklist_items ENABLE ROW LEVEL SECURITY;

-- 19. Email Sequences
CREATE TABLE public.crm_email_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  trigger_event text NOT NULL, -- contract_expiring, invoice_overdue, onboarding, renewal
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES public.crm_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_email_sequences ENABLE ROW LEVEL SECURITY;

-- 20. Email Sequence Steps
CREATE TABLE public.crm_email_sequence_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id uuid REFERENCES public.crm_email_sequences(id) ON DELETE CASCADE NOT NULL,
  step_number integer NOT NULL,
  delay_days integer NOT NULL DEFAULT 0,
  subject text NOT NULL,
  body_html text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_email_sequence_steps ENABLE ROW LEVEL SECURITY;

-- 21. Email Sequence Enrollments
CREATE TABLE public.crm_email_sequence_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id uuid REFERENCES public.crm_email_sequences(id) ON DELETE CASCADE NOT NULL,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE CASCADE NOT NULL,
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE CASCADE,
  current_step integer DEFAULT 1,
  status text DEFAULT 'active', -- active, paused, completed, cancelled
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  metadata jsonb DEFAULT '{}'
);
ALTER TABLE public.crm_email_sequence_enrollments ENABLE ROW LEVEL SECURITY;

-- 22. Email Sequence Events
CREATE TABLE public.crm_email_sequence_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES public.crm_email_sequence_enrollments(id) ON DELETE CASCADE NOT NULL,
  step_id uuid REFERENCES public.crm_email_sequence_steps(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL, -- sent, delivered, opened, clicked, bounced, replied
  occurred_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);
ALTER TABLE public.crm_email_sequence_events ENABLE ROW LEVEL SECURITY;

-- 23. SLA Configurations
CREATE TABLE public.crm_sla_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, -- e.g. 'Standard', 'Premium', 'Enterprise'
  priority text NOT NULL, -- low, medium, high, critical
  response_minutes integer NOT NULL,
  resolve_minutes integer NOT NULL,
  business_hours_only boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_sla_configs ENABLE ROW LEVEL SECURITY;

-- Seed default SLA configs
INSERT INTO public.crm_sla_configs (name, priority, response_minutes, resolve_minutes) VALUES
  ('Standard', 'low', 480, 2880),
  ('Standard', 'medium', 240, 1440),
  ('Standard', 'high', 60, 480),
  ('Standard', 'critical', 15, 120),
  ('Premium', 'low', 240, 1440),
  ('Premium', 'medium', 120, 720),
  ('Premium', 'high', 30, 240),
  ('Premium', 'critical', 15, 60);

-- 24. System Audit Log (immutable)
CREATE TABLE public.crm_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.crm_users(id),
  action text NOT NULL, -- create, update, delete, login, export, reveal_password
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_audit_log ENABLE ROW LEVEL SECURITY;

-- 25. Business Hours
CREATE TABLE public.crm_business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Default',
  timezone text NOT NULL DEFAULT 'America/New_York',
  monday_start time DEFAULT '08:00',
  monday_end time DEFAULT '17:00',
  tuesday_start time DEFAULT '08:00',
  tuesday_end time DEFAULT '17:00',
  wednesday_start time DEFAULT '08:00',
  wednesday_end time DEFAULT '17:00',
  thursday_start time DEFAULT '08:00',
  thursday_end time DEFAULT '17:00',
  friday_start time DEFAULT '08:00',
  friday_end time DEFAULT '17:00',
  saturday_start time,
  saturday_end time,
  sunday_start time,
  sunday_end time,
  holidays jsonb DEFAULT '[]',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_business_hours ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- SECURITY DEFINER FUNCTION FOR CRM ROLES
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.has_crm_role(_user_id uuid, _role crm_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.crm_users
    WHERE user_id = _user_id AND role = _role AND is_active = true
  )
$$;

CREATE OR REPLACE FUNCTION public.get_crm_role(_user_id uuid)
RETURNS crm_role
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.crm_users
  WHERE user_id = _user_id AND is_active = true
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.is_crm_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.crm_users
    WHERE user_id = _user_id AND is_active = true
  )
$$;

-- ═══════════════════════════════════════════════════════════════
-- RLS POLICIES — 7 ROLES
-- super_admin/admin: full access
-- account_manager: orgs they manage + their deals
-- technician: orgs they're assigned to + their tickets
-- dispatcher: read all, assign tickets
-- billing: invoices, contracts, time entries
-- portal_user: own org only (handled via portal, not CRM)
-- ═══════════════════════════════════════════════════════════════

-- CRM Users: admins manage all, users see themselves
CREATE POLICY "CRM admins full access" ON public.crm_users FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users view all users" ON public.crm_users FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));

-- Organizations: admins see all, others see assigned orgs
CREATE POLICY "CRM admins full org access" ON public.crm_organizations FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read orgs" ON public.crm_organizations FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM AM manage own orgs" ON public.crm_organizations FOR UPDATE TO authenticated
  USING (account_manager_id IN (SELECT id FROM public.crm_users WHERE user_id = auth.uid()));

-- Org Members
CREATE POLICY "CRM admins manage org members" ON public.crm_org_members FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read org members" ON public.crm_org_members FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));

-- Contacts
CREATE POLICY "CRM admins full contact access" ON public.crm_contacts FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read contacts" ON public.crm_contacts FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users create contacts" ON public.crm_contacts FOR INSERT TO authenticated
  WITH CHECK (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users update contacts" ON public.crm_contacts FOR UPDATE TO authenticated
  USING (public.is_crm_user(auth.uid()));

-- Deal Stages: read all, admins manage
CREATE POLICY "CRM users read stages" ON public.crm_deal_stages FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage stages" ON public.crm_deal_stages FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- Deals
CREATE POLICY "CRM admins full deal access" ON public.crm_deals FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read deals" ON public.crm_deals FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users manage own deals" ON public.crm_deals FOR INSERT TO authenticated
  WITH CHECK (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM deal owner update" ON public.crm_deals FOR UPDATE TO authenticated
  USING (owner_id IN (SELECT id FROM public.crm_users WHERE user_id = auth.uid())
    OR public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- Activities
CREATE POLICY "CRM users read activities" ON public.crm_activities FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users create activities" ON public.crm_activities FOR INSERT TO authenticated
  WITH CHECK (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage activities" ON public.crm_activities FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- Tasks
CREATE POLICY "CRM users read tasks" ON public.crm_tasks FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users create tasks" ON public.crm_tasks FOR INSERT TO authenticated
  WITH CHECK (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users update assigned tasks" ON public.crm_tasks FOR UPDATE TO authenticated
  USING (assigned_to IN (SELECT id FROM public.crm_users WHERE user_id = auth.uid())
    OR public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'dispatcher'));
CREATE POLICY "CRM admins delete tasks" ON public.crm_tasks FOR DELETE TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- Tickets
CREATE POLICY "CRM users read tickets" ON public.crm_tickets FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users create tickets" ON public.crm_tickets FOR INSERT TO authenticated
  WITH CHECK (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users update tickets" ON public.crm_tickets FOR UPDATE TO authenticated
  USING (assigned_to IN (SELECT id FROM public.crm_users WHERE user_id = auth.uid())
    OR public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'dispatcher'));
CREATE POLICY "CRM admins delete tickets" ON public.crm_tickets FOR DELETE TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- Time Entries
CREATE POLICY "CRM users read time entries" ON public.crm_time_entries FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users create time entries" ON public.crm_time_entries FOR INSERT TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM public.crm_users WHERE user_id = auth.uid()));
CREATE POLICY "CRM users update own time entries" ON public.crm_time_entries FOR UPDATE TO authenticated
  USING (user_id IN (SELECT id FROM public.crm_users WHERE user_id = auth.uid())
    OR public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'billing'));

-- Contracts
CREATE POLICY "CRM users read contracts" ON public.crm_contracts FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage contracts" ON public.crm_contracts FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'billing'));
CREATE POLICY "CRM contract line items read" ON public.crm_contract_line_items FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage contract lines" ON public.crm_contract_line_items FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'billing'));

-- Assets
CREATE POLICY "CRM users read assets" ON public.crm_assets FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users create assets" ON public.crm_assets FOR INSERT TO authenticated
  WITH CHECK (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users update assets" ON public.crm_assets FOR UPDATE TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins delete assets" ON public.crm_assets FOR DELETE TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- Invoices
CREATE POLICY "CRM billing read invoices" ON public.crm_invoices FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM billing manage invoices" ON public.crm_invoices FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'billing'));
CREATE POLICY "CRM billing read invoice lines" ON public.crm_invoice_line_items FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM billing manage invoice lines" ON public.crm_invoice_line_items FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'billing'));

-- Deployment Schedules
CREATE POLICY "CRM users read deployments" ON public.crm_deployment_schedules FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users manage deployments" ON public.crm_deployment_schedules FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin', 'dispatcher'));
CREATE POLICY "CRM users read checklist" ON public.crm_deployment_checklist_items FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM users manage checklist" ON public.crm_deployment_checklist_items FOR ALL TO authenticated
  USING (public.is_crm_user(auth.uid()));

-- Email Sequences (admin only)
CREATE POLICY "CRM admins manage sequences" ON public.crm_email_sequences FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read sequences" ON public.crm_email_sequences FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage seq steps" ON public.crm_email_sequence_steps FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read seq steps" ON public.crm_email_sequence_steps FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage enrollments" ON public.crm_email_sequence_enrollments FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read enrollments" ON public.crm_email_sequence_enrollments FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM system manage seq events" ON public.crm_email_sequence_events FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM users read seq events" ON public.crm_email_sequence_events FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));

-- SLA Configs (admin only write)
CREATE POLICY "CRM users read sla" ON public.crm_sla_configs FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage sla" ON public.crm_sla_configs FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- Audit Log: admins read, nobody deletes/updates
CREATE POLICY "CRM admins read audit log" ON public.crm_audit_log FOR SELECT TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "CRM system insert audit" ON public.crm_audit_log FOR INSERT TO authenticated
  WITH CHECK (public.is_crm_user(auth.uid()));

-- Business Hours
CREATE POLICY "CRM users read business hours" ON public.crm_business_hours FOR SELECT TO authenticated
  USING (public.is_crm_user(auth.uid()));
CREATE POLICY "CRM admins manage business hours" ON public.crm_business_hours FOR ALL TO authenticated
  USING (public.get_crm_role(auth.uid()) IN ('super_admin', 'admin'));

-- ═══════════════════════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════════════════════

-- Auto-update updated_at
CREATE TRIGGER update_crm_users_updated_at BEFORE UPDATE ON public.crm_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_organizations_updated_at BEFORE UPDATE ON public.crm_organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_contacts_updated_at BEFORE UPDATE ON public.crm_contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_deals_updated_at BEFORE UPDATE ON public.crm_deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_tickets_updated_at BEFORE UPDATE ON public.crm_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_time_entries_updated_at BEFORE UPDATE ON public.crm_time_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_contracts_updated_at BEFORE UPDATE ON public.crm_contracts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_assets_updated_at BEFORE UPDATE ON public.crm_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_invoices_updated_at BEFORE UPDATE ON public.crm_invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_deployment_schedules_updated_at BEFORE UPDATE ON public.crm_deployment_schedules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_email_sequences_updated_at BEFORE UPDATE ON public.crm_email_sequences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crm_tasks_updated_at BEFORE UPDATE ON public.crm_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto ticket numbering
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  next_num integer;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 5) AS integer)), 0) + 1
  INTO next_num FROM public.crm_tickets;
  NEW.ticket_number := 'TKT-' || LPAD(next_num::text, 6, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_ticket_number BEFORE INSERT ON public.crm_tickets
  FOR EACH ROW WHEN (NEW.ticket_number IS NULL OR NEW.ticket_number = '')
  EXECUTE FUNCTION public.generate_ticket_number();

-- Auto invoice numbering
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  next_num integer;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 5) AS integer)), 0) + 1
  INTO next_num FROM public.crm_invoices;
  NEW.invoice_number := 'INV-' || LPAD(next_num::text, 6, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_invoice_number BEFORE INSERT ON public.crm_invoices
  FOR EACH ROW WHEN (NEW.invoice_number IS NULL OR NEW.invoice_number = '')
  EXECUTE FUNCTION public.generate_invoice_number();

-- Auto-create CRM user on auth.users insert (if admin assigns via CRM)
-- Activity log on deal stage change
CREATE OR REPLACE FUNCTION public.log_deal_stage_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF OLD.stage_id IS DISTINCT FROM NEW.stage_id THEN
    INSERT INTO public.crm_activities (type, subject, deal_id, organization_id, metadata)
    VALUES (
      'stage_change',
      'Deal moved to new stage',
      NEW.id,
      NEW.organization_id,
      jsonb_build_object('old_stage_id', OLD.stage_id, 'new_stage_id', NEW.stage_id)
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER log_deal_stage_change AFTER UPDATE ON public.crm_deals
  FOR EACH ROW EXECUTE FUNCTION public.log_deal_stage_change();

-- Indexes for performance
CREATE INDEX idx_crm_contacts_org ON public.crm_contacts(organization_id);
CREATE INDEX idx_crm_contacts_email ON public.crm_contacts(email);
CREATE INDEX idx_crm_deals_stage ON public.crm_deals(stage_id);
CREATE INDEX idx_crm_deals_org ON public.crm_deals(organization_id);
CREATE INDEX idx_crm_tickets_org ON public.crm_tickets(organization_id);
CREATE INDEX idx_crm_tickets_assigned ON public.crm_tickets(assigned_to);
CREATE INDEX idx_crm_tickets_status ON public.crm_tickets(status);
CREATE INDEX idx_crm_activities_org ON public.crm_activities(organization_id);
CREATE INDEX idx_crm_activities_created ON public.crm_activities(created_at DESC);
CREATE INDEX idx_crm_time_entries_ticket ON public.crm_time_entries(ticket_id);
CREATE INDEX idx_crm_assets_org ON public.crm_assets(organization_id);
CREATE INDEX idx_crm_invoices_org ON public.crm_invoices(organization_id);
CREATE INDEX idx_crm_contracts_org ON public.crm_contracts(organization_id);
CREATE INDEX idx_crm_audit_log_created ON public.crm_audit_log(created_at DESC);

-- Insert default business hours
INSERT INTO public.crm_business_hours (name, is_default) VALUES ('Default', true);
