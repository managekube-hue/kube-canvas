export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      assessment_sessions: {
        Row: {
          answers: Json | null
          cf_automation_maturity: number | null
          cf_business_gov_maturity: number | null
          cf_cloud_maturity: number | null
          cf_cost_maturity: number | null
          cf_data_protection_maturity: number | null
          cf_dr_bc_maturity: number | null
          cf_iam_maturity: number | null
          cf_infrastructure_maturity: number | null
          cf_secops_maturity: number | null
          cf_security_ps_maturity: number | null
          company: string | null
          completed_at: string | null
          completed_flows: string[] | null
          complexity_score: number | null
          compliance_deadline: string | null
          compliance_frameworks: string[] | null
          created_at: string
          current_flow: string | null
          current_question: string | null
          email: string | null
          email_platform: string | null
          ems_score: number | null
          endpoint_count: number | null
          estimated_deal_size: string | null
          first_name: string | null
          flags: Json | null
          hubspot_contact_id: string | null
          hubspot_synced_at: string | null
          id: string
          incident_age: string | null
          incident_type: string | null
          industry: string | null
          it_situation: string | null
          it_team_size: number | null
          key_gap_flags: string[] | null
          last_name: string | null
          location_count: number | null
          monthly_price: number | null
          msp_issues: string[] | null
          org_stage: string | null
          phone: string | null
          primary_priority: string | null
          profile_type: string | null
          recommended_tier: string | null
          remote_workforce_pct: string | null
          risk_score: number | null
          role: string | null
          status: string | null
          timeline: string | null
          updated_at: string
          upsell_ready: boolean | null
          urgency_score: number | null
        }
        Insert: {
          answers?: Json | null
          cf_automation_maturity?: number | null
          cf_business_gov_maturity?: number | null
          cf_cloud_maturity?: number | null
          cf_cost_maturity?: number | null
          cf_data_protection_maturity?: number | null
          cf_dr_bc_maturity?: number | null
          cf_iam_maturity?: number | null
          cf_infrastructure_maturity?: number | null
          cf_secops_maturity?: number | null
          cf_security_ps_maturity?: number | null
          company?: string | null
          completed_at?: string | null
          completed_flows?: string[] | null
          complexity_score?: number | null
          compliance_deadline?: string | null
          compliance_frameworks?: string[] | null
          created_at?: string
          current_flow?: string | null
          current_question?: string | null
          email?: string | null
          email_platform?: string | null
          ems_score?: number | null
          endpoint_count?: number | null
          estimated_deal_size?: string | null
          first_name?: string | null
          flags?: Json | null
          hubspot_contact_id?: string | null
          hubspot_synced_at?: string | null
          id?: string
          incident_age?: string | null
          incident_type?: string | null
          industry?: string | null
          it_situation?: string | null
          it_team_size?: number | null
          key_gap_flags?: string[] | null
          last_name?: string | null
          location_count?: number | null
          monthly_price?: number | null
          msp_issues?: string[] | null
          org_stage?: string | null
          phone?: string | null
          primary_priority?: string | null
          profile_type?: string | null
          recommended_tier?: string | null
          remote_workforce_pct?: string | null
          risk_score?: number | null
          role?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
          upsell_ready?: boolean | null
          urgency_score?: number | null
        }
        Update: {
          answers?: Json | null
          cf_automation_maturity?: number | null
          cf_business_gov_maturity?: number | null
          cf_cloud_maturity?: number | null
          cf_cost_maturity?: number | null
          cf_data_protection_maturity?: number | null
          cf_dr_bc_maturity?: number | null
          cf_iam_maturity?: number | null
          cf_infrastructure_maturity?: number | null
          cf_secops_maturity?: number | null
          cf_security_ps_maturity?: number | null
          company?: string | null
          completed_at?: string | null
          completed_flows?: string[] | null
          complexity_score?: number | null
          compliance_deadline?: string | null
          compliance_frameworks?: string[] | null
          created_at?: string
          current_flow?: string | null
          current_question?: string | null
          email?: string | null
          email_platform?: string | null
          ems_score?: number | null
          endpoint_count?: number | null
          estimated_deal_size?: string | null
          first_name?: string | null
          flags?: Json | null
          hubspot_contact_id?: string | null
          hubspot_synced_at?: string | null
          id?: string
          incident_age?: string | null
          incident_type?: string | null
          industry?: string | null
          it_situation?: string | null
          it_team_size?: number | null
          key_gap_flags?: string[] | null
          last_name?: string | null
          location_count?: number | null
          monthly_price?: number | null
          msp_issues?: string[] | null
          org_stage?: string | null
          phone?: string | null
          primary_priority?: string | null
          profile_type?: string | null
          recommended_tier?: string | null
          remote_workforce_pct?: string | null
          risk_score?: number | null
          role?: string | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
          upsell_ready?: boolean | null
          urgency_score?: number | null
        }
        Relationships: []
      }
      cms_career_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          linkedin_url: string | null
          notes: string | null
          phone: string | null
          posting_id: string | null
          resume_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          posting_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          posting_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_career_applications_posting_id_fkey"
            columns: ["posting_id"]
            isOneToOne: false
            referencedRelation: "cms_career_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_career_postings: {
        Row: {
          application_email: string
          created_at: string
          department: string
          description: string
          employment_type: string | null
          expires_at: string | null
          id: string
          is_published: boolean | null
          location: string | null
          nice_to_haves: string[] | null
          published_at: string | null
          requirements: string[] | null
          salary_range: string | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          application_email?: string
          created_at?: string
          department: string
          description: string
          employment_type?: string | null
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          nice_to_haves?: string[] | null
          published_at?: string | null
          requirements?: string[] | null
          salary_range?: string | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          application_email?: string
          created_at?: string
          department?: string
          description?: string
          employment_type?: string | null
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          nice_to_haves?: string[] | null
          published_at?: string | null
          requirements?: string[] | null
          salary_range?: string | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_contacts: {
        Row: {
          assessment_session_id: string | null
          challenges: string[] | null
          company: string | null
          created_at: string
          email: string
          first_name: string | null
          hubspot_contact_id: string | null
          hubspot_error: string | null
          hubspot_synced: boolean | null
          hubspot_synced_at: string | null
          id: string
          industry: string | null
          ip_address: string | null
          job_title: string | null
          last_name: string | null
          lifecycle_stage: string | null
          message: string | null
          mk_annual_it_budget: string | null
          mk_api_maturity: string | null
          mk_automation_targets: string | null
          mk_automation_tools: string | null
          mk_budget_distribution: string | null
          mk_cf_automation_maturity: number | null
          mk_cf_business_gov_maturity: number | null
          mk_cf_cloud_maturity: number | null
          mk_cf_cost_maturity: number | null
          mk_cf_dataprotection_maturity: number | null
          mk_cf_iam_maturity: number | null
          mk_cf_infrastructure_maturity: number | null
          mk_cf_secops_maturity: number | null
          mk_cloud_budget: string | null
          mk_cloud_cost_visibility: string | null
          mk_cloud_dr_strategy: string | null
          mk_cloud_drivers: string | null
          mk_cloud_skills_level: string | null
          mk_cloud_success_metrics: string | null
          mk_cloud_usage_level: string | null
          mk_cloud_waste_status: string | null
          mk_compliance_deadline_date: string | null
          mk_compliance_in_scope: string | null
          mk_contract_renewals: string | null
          mk_cyber_insurance: string | null
          mk_dr_plan_status: string | null
          mk_email_platform: string | null
          mk_ems_score: number | null
          mk_endpoint_count: string | null
          mk_fast_track: boolean | null
          mk_flag_cloud_strategy: boolean | null
          mk_flag_compliance: boolean | null
          mk_flag_cost_optimization: boolean | null
          mk_flag_growth_enablement: boolean | null
          mk_flag_infra_assessment: boolean | null
          mk_flag_security_remediation: boolean | null
          mk_flag_understaffed_it: boolean | null
          mk_growth_bottleneck: string | null
          mk_growth_trajectory: string | null
          mk_has_compliance_deadline: boolean | null
          mk_headcount_growth: string | null
          mk_hosting_state: string | null
          mk_hyperv_version: string | null
          mk_industry_vertical: string | null
          mk_integration_architecture: string | null
          mk_integration_dependencies: string | null
          mk_ir_escalation: boolean | null
          mk_it_team_size: string | null
          mk_key_gaps_flags: string[] | null
          mk_licence_tracking: string | null
          mk_location_count: string | null
          mk_migration_scope: string | null
          mk_monthly_price: number | null
          mk_multisite: boolean | null
          mk_multisite_expansion: string | null
          mk_onb_completed_at: string | null
          mk_onb_estimated_deal_size: string | null
          mk_onb_it_situation: string | null
          mk_onb_msp_issues: string | null
          mk_onb_org_stage: string | null
          mk_onb_priority: string | null
          mk_onb_profile_type: string | null
          mk_onb_risk_score: number | null
          mk_onb_role: string | null
          mk_onb_timeline: string | null
          mk_onb_urgency_score: number | null
          mk_recommended_tier: string | null
          mk_remote_workforce_pct: string | null
          mk_rto_requirement: string | null
          mk_savings_target: string | null
          mk_scalability_bottlenecks: string | null
          mk_security_incident_age: string | null
          mk_security_incident_types: string | null
          mk_sr_incident_status: string | null
          mk_sr_network_posture: string | null
          mk_tool_overlap: string | null
          mk_unused_contracts: string | null
          mk_upsell_ready: boolean | null
          mk_vendor_count: string | null
          mk_vmware_version: string | null
          org_size: string | null
          phone: string | null
          source: string
          source_detail: string | null
          updated_at: string
          user_agent: string | null
          website: string | null
        }
        Insert: {
          assessment_session_id?: string | null
          challenges?: string[] | null
          company?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          hubspot_contact_id?: string | null
          hubspot_error?: string | null
          hubspot_synced?: boolean | null
          hubspot_synced_at?: string | null
          id?: string
          industry?: string | null
          ip_address?: string | null
          job_title?: string | null
          last_name?: string | null
          lifecycle_stage?: string | null
          message?: string | null
          mk_annual_it_budget?: string | null
          mk_api_maturity?: string | null
          mk_automation_targets?: string | null
          mk_automation_tools?: string | null
          mk_budget_distribution?: string | null
          mk_cf_automation_maturity?: number | null
          mk_cf_business_gov_maturity?: number | null
          mk_cf_cloud_maturity?: number | null
          mk_cf_cost_maturity?: number | null
          mk_cf_dataprotection_maturity?: number | null
          mk_cf_iam_maturity?: number | null
          mk_cf_infrastructure_maturity?: number | null
          mk_cf_secops_maturity?: number | null
          mk_cloud_budget?: string | null
          mk_cloud_cost_visibility?: string | null
          mk_cloud_dr_strategy?: string | null
          mk_cloud_drivers?: string | null
          mk_cloud_skills_level?: string | null
          mk_cloud_success_metrics?: string | null
          mk_cloud_usage_level?: string | null
          mk_cloud_waste_status?: string | null
          mk_compliance_deadline_date?: string | null
          mk_compliance_in_scope?: string | null
          mk_contract_renewals?: string | null
          mk_cyber_insurance?: string | null
          mk_dr_plan_status?: string | null
          mk_email_platform?: string | null
          mk_ems_score?: number | null
          mk_endpoint_count?: string | null
          mk_fast_track?: boolean | null
          mk_flag_cloud_strategy?: boolean | null
          mk_flag_compliance?: boolean | null
          mk_flag_cost_optimization?: boolean | null
          mk_flag_growth_enablement?: boolean | null
          mk_flag_infra_assessment?: boolean | null
          mk_flag_security_remediation?: boolean | null
          mk_flag_understaffed_it?: boolean | null
          mk_growth_bottleneck?: string | null
          mk_growth_trajectory?: string | null
          mk_has_compliance_deadline?: boolean | null
          mk_headcount_growth?: string | null
          mk_hosting_state?: string | null
          mk_hyperv_version?: string | null
          mk_industry_vertical?: string | null
          mk_integration_architecture?: string | null
          mk_integration_dependencies?: string | null
          mk_ir_escalation?: boolean | null
          mk_it_team_size?: string | null
          mk_key_gaps_flags?: string[] | null
          mk_licence_tracking?: string | null
          mk_location_count?: string | null
          mk_migration_scope?: string | null
          mk_monthly_price?: number | null
          mk_multisite?: boolean | null
          mk_multisite_expansion?: string | null
          mk_onb_completed_at?: string | null
          mk_onb_estimated_deal_size?: string | null
          mk_onb_it_situation?: string | null
          mk_onb_msp_issues?: string | null
          mk_onb_org_stage?: string | null
          mk_onb_priority?: string | null
          mk_onb_profile_type?: string | null
          mk_onb_risk_score?: number | null
          mk_onb_role?: string | null
          mk_onb_timeline?: string | null
          mk_onb_urgency_score?: number | null
          mk_recommended_tier?: string | null
          mk_remote_workforce_pct?: string | null
          mk_rto_requirement?: string | null
          mk_savings_target?: string | null
          mk_scalability_bottlenecks?: string | null
          mk_security_incident_age?: string | null
          mk_security_incident_types?: string | null
          mk_sr_incident_status?: string | null
          mk_sr_network_posture?: string | null
          mk_tool_overlap?: string | null
          mk_unused_contracts?: string | null
          mk_upsell_ready?: boolean | null
          mk_vendor_count?: string | null
          mk_vmware_version?: string | null
          org_size?: string | null
          phone?: string | null
          source?: string
          source_detail?: string | null
          updated_at?: string
          user_agent?: string | null
          website?: string | null
        }
        Update: {
          assessment_session_id?: string | null
          challenges?: string[] | null
          company?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          hubspot_contact_id?: string | null
          hubspot_error?: string | null
          hubspot_synced?: boolean | null
          hubspot_synced_at?: string | null
          id?: string
          industry?: string | null
          ip_address?: string | null
          job_title?: string | null
          last_name?: string | null
          lifecycle_stage?: string | null
          message?: string | null
          mk_annual_it_budget?: string | null
          mk_api_maturity?: string | null
          mk_automation_targets?: string | null
          mk_automation_tools?: string | null
          mk_budget_distribution?: string | null
          mk_cf_automation_maturity?: number | null
          mk_cf_business_gov_maturity?: number | null
          mk_cf_cloud_maturity?: number | null
          mk_cf_cost_maturity?: number | null
          mk_cf_dataprotection_maturity?: number | null
          mk_cf_iam_maturity?: number | null
          mk_cf_infrastructure_maturity?: number | null
          mk_cf_secops_maturity?: number | null
          mk_cloud_budget?: string | null
          mk_cloud_cost_visibility?: string | null
          mk_cloud_dr_strategy?: string | null
          mk_cloud_drivers?: string | null
          mk_cloud_skills_level?: string | null
          mk_cloud_success_metrics?: string | null
          mk_cloud_usage_level?: string | null
          mk_cloud_waste_status?: string | null
          mk_compliance_deadline_date?: string | null
          mk_compliance_in_scope?: string | null
          mk_contract_renewals?: string | null
          mk_cyber_insurance?: string | null
          mk_dr_plan_status?: string | null
          mk_email_platform?: string | null
          mk_ems_score?: number | null
          mk_endpoint_count?: string | null
          mk_fast_track?: boolean | null
          mk_flag_cloud_strategy?: boolean | null
          mk_flag_compliance?: boolean | null
          mk_flag_cost_optimization?: boolean | null
          mk_flag_growth_enablement?: boolean | null
          mk_flag_infra_assessment?: boolean | null
          mk_flag_security_remediation?: boolean | null
          mk_flag_understaffed_it?: boolean | null
          mk_growth_bottleneck?: string | null
          mk_growth_trajectory?: string | null
          mk_has_compliance_deadline?: boolean | null
          mk_headcount_growth?: string | null
          mk_hosting_state?: string | null
          mk_hyperv_version?: string | null
          mk_industry_vertical?: string | null
          mk_integration_architecture?: string | null
          mk_integration_dependencies?: string | null
          mk_ir_escalation?: boolean | null
          mk_it_team_size?: string | null
          mk_key_gaps_flags?: string[] | null
          mk_licence_tracking?: string | null
          mk_location_count?: string | null
          mk_migration_scope?: string | null
          mk_monthly_price?: number | null
          mk_multisite?: boolean | null
          mk_multisite_expansion?: string | null
          mk_onb_completed_at?: string | null
          mk_onb_estimated_deal_size?: string | null
          mk_onb_it_situation?: string | null
          mk_onb_msp_issues?: string | null
          mk_onb_org_stage?: string | null
          mk_onb_priority?: string | null
          mk_onb_profile_type?: string | null
          mk_onb_risk_score?: number | null
          mk_onb_role?: string | null
          mk_onb_timeline?: string | null
          mk_onb_urgency_score?: number | null
          mk_recommended_tier?: string | null
          mk_remote_workforce_pct?: string | null
          mk_rto_requirement?: string | null
          mk_savings_target?: string | null
          mk_scalability_bottlenecks?: string | null
          mk_security_incident_age?: string | null
          mk_security_incident_types?: string | null
          mk_sr_incident_status?: string | null
          mk_sr_network_posture?: string | null
          mk_tool_overlap?: string | null
          mk_unused_contracts?: string | null
          mk_upsell_ready?: boolean | null
          mk_vendor_count?: string | null
          mk_vmware_version?: string | null
          org_size?: string | null
          phone?: string | null
          source?: string
          source_detail?: string | null
          updated_at?: string
          user_agent?: string | null
          website?: string | null
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          body: string | null
          contact_id: string | null
          created_at: string | null
          deal_id: string | null
          id: string
          is_internal: boolean | null
          metadata: Json | null
          organization_id: string | null
          subject: string | null
          ticket_id: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          body?: string | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          is_internal?: boolean | null
          metadata?: Json | null
          organization_id?: string | null
          subject?: string | null
          ticket_id?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          body?: string | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          is_internal?: boolean | null
          metadata?: Json | null
          organization_id?: string | null
          subject?: string | null
          ticket_id?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_ticket_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "crm_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_assets: {
        Row: {
          asset_tag: string | null
          assigned_to: string | null
          created_at: string | null
          custom_fields: Json | null
          health_status: string | null
          id: string
          ip_address: string | null
          last_seen_at: string | null
          location: string | null
          mac_address: string | null
          manufacturer: string | null
          model: string | null
          name: string
          organization_id: string
          os_name: string | null
          os_version: string | null
          purchase_date: string | null
          purchase_price: number | null
          rmm_agent_id: string | null
          serial_number: string | null
          status: string | null
          type: string
          updated_at: string | null
          warranty_expiry: string | null
        }
        Insert: {
          asset_tag?: string | null
          assigned_to?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          health_status?: string | null
          id?: string
          ip_address?: string | null
          last_seen_at?: string | null
          location?: string | null
          mac_address?: string | null
          manufacturer?: string | null
          model?: string | null
          name: string
          organization_id: string
          os_name?: string | null
          os_version?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          rmm_agent_id?: string | null
          serial_number?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
          warranty_expiry?: string | null
        }
        Update: {
          asset_tag?: string | null
          assigned_to?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          health_status?: string | null
          id?: string
          ip_address?: string | null
          last_seen_at?: string | null
          location?: string | null
          mac_address?: string | null
          manufacturer?: string | null
          model?: string | null
          name?: string
          organization_id?: string
          os_name?: string | null
          os_version?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          rmm_agent_id?: string | null
          serial_number?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
          warranty_expiry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_assets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_assets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_business_hours: {
        Row: {
          created_at: string | null
          friday_end: string | null
          friday_start: string | null
          holidays: Json | null
          id: string
          is_default: boolean | null
          monday_end: string | null
          monday_start: string | null
          name: string
          saturday_end: string | null
          saturday_start: string | null
          sunday_end: string | null
          sunday_start: string | null
          thursday_end: string | null
          thursday_start: string | null
          timezone: string
          tuesday_end: string | null
          tuesday_start: string | null
          wednesday_end: string | null
          wednesday_start: string | null
        }
        Insert: {
          created_at?: string | null
          friday_end?: string | null
          friday_start?: string | null
          holidays?: Json | null
          id?: string
          is_default?: boolean | null
          monday_end?: string | null
          monday_start?: string | null
          name?: string
          saturday_end?: string | null
          saturday_start?: string | null
          sunday_end?: string | null
          sunday_start?: string | null
          thursday_end?: string | null
          thursday_start?: string | null
          timezone?: string
          tuesday_end?: string | null
          tuesday_start?: string | null
          wednesday_end?: string | null
          wednesday_start?: string | null
        }
        Update: {
          created_at?: string | null
          friday_end?: string | null
          friday_start?: string | null
          holidays?: Json | null
          id?: string
          is_default?: boolean | null
          monday_end?: string | null
          monday_start?: string | null
          name?: string
          saturday_end?: string | null
          saturday_start?: string | null
          sunday_end?: string | null
          sunday_start?: string | null
          thursday_end?: string | null
          thursday_start?: string | null
          timezone?: string
          tuesday_end?: string | null
          tuesday_start?: string | null
          wednesday_end?: string | null
          wednesday_start?: string | null
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          custom_fields: Json | null
          department: string | null
          email: string | null
          first_name: string
          id: string
          is_decision_maker: boolean | null
          is_primary: boolean | null
          is_technical: boolean | null
          job_title: string | null
          last_contacted_at: string | null
          last_name: string | null
          lead_score: number | null
          lifecycle_stage: string | null
          linkedin_url: string | null
          mobile: string | null
          organization_id: string | null
          phone: string | null
          preferred_channel: string | null
          source: string | null
          tags: string[] | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          department?: string | null
          email?: string | null
          first_name: string
          id?: string
          is_decision_maker?: boolean | null
          is_primary?: boolean | null
          is_technical?: boolean | null
          job_title?: string | null
          last_contacted_at?: string | null
          last_name?: string | null
          lead_score?: number | null
          lifecycle_stage?: string | null
          linkedin_url?: string | null
          mobile?: string | null
          organization_id?: string | null
          phone?: string | null
          preferred_channel?: string | null
          source?: string | null
          tags?: string[] | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          department?: string | null
          email?: string | null
          first_name?: string
          id?: string
          is_decision_maker?: boolean | null
          is_primary?: boolean | null
          is_technical?: boolean | null
          job_title?: string | null
          last_contacted_at?: string | null
          last_name?: string | null
          lead_score?: number | null
          lifecycle_stage?: string | null
          linkedin_url?: string | null
          mobile?: string | null
          organization_id?: string | null
          phone?: string | null
          preferred_channel?: string | null
          source?: string | null
          tags?: string[] | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contract_line_items: {
        Row: {
          contract_id: string
          created_at: string | null
          description: string
          id: string
          is_recurring: boolean | null
          quantity: number | null
          total: number | null
          unit_price: number
        }
        Insert: {
          contract_id: string
          created_at?: string | null
          description: string
          id?: string
          is_recurring?: boolean | null
          quantity?: number | null
          total?: number | null
          unit_price: number
        }
        Update: {
          contract_id?: string
          created_at?: string | null
          description?: string
          id?: string
          is_recurring?: boolean | null
          quantity?: number | null
          total?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "crm_contract_line_items_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "crm_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contracts: {
        Row: {
          auto_renew: boolean | null
          billing_frequency: string | null
          created_at: string | null
          deal_id: string | null
          end_date: string | null
          id: string
          mrr: number | null
          notes: string | null
          organization_id: string
          pdf_url: string | null
          renewal_notice_days: number | null
          signed_at: string | null
          signed_by: string | null
          start_date: string
          status: string | null
          stripe_subscription_id: string | null
          title: string
          total_value: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          auto_renew?: boolean | null
          billing_frequency?: string | null
          created_at?: string | null
          deal_id?: string | null
          end_date?: string | null
          id?: string
          mrr?: number | null
          notes?: string | null
          organization_id: string
          pdf_url?: string | null
          renewal_notice_days?: number | null
          signed_at?: string | null
          signed_by?: string | null
          start_date: string
          status?: string | null
          stripe_subscription_id?: string | null
          title: string
          total_value?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_renew?: boolean | null
          billing_frequency?: string | null
          created_at?: string | null
          deal_id?: string | null
          end_date?: string | null
          id?: string
          mrr?: number | null
          notes?: string | null
          organization_id?: string
          pdf_url?: string | null
          renewal_notice_days?: number | null
          signed_at?: string | null
          signed_by?: string | null
          start_date?: string
          status?: string | null
          stripe_subscription_id?: string | null
          title?: string
          total_value?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_contracts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_contracts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_contracts_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deal_stages: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          is_lost: boolean | null
          is_won: boolean | null
          name: string
          order_index: number
          probability: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_lost?: boolean | null
          is_won?: boolean | null
          name: string
          order_index?: number
          probability?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_lost?: boolean | null
          is_won?: boolean | null
          name?: string
          order_index?: number
          probability?: number | null
        }
        Relationships: []
      }
      crm_deals: {
        Row: {
          actual_close_date: string | null
          contact_id: string | null
          created_at: string | null
          currency: string | null
          custom_fields: Json | null
          description: string | null
          expected_close_date: string | null
          id: string
          loss_reason: string | null
          mrr: number | null
          organization_id: string | null
          owner_id: string | null
          probability: number | null
          source: string | null
          stage_id: string
          tags: string[] | null
          title: string
          updated_at: string | null
          value: number | null
        }
        Insert: {
          actual_close_date?: string | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          description?: string | null
          expected_close_date?: string | null
          id?: string
          loss_reason?: string | null
          mrr?: number | null
          organization_id?: string | null
          owner_id?: string | null
          probability?: number | null
          source?: string | null
          stage_id: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          actual_close_date?: string | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          description?: string | null
          expected_close_date?: string | null
          id?: string
          loss_reason?: string | null
          mrr?: number | null
          organization_id?: string | null
          owner_id?: string | null
          probability?: number | null
          source?: string | null
          stage_id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "crm_deal_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deployment_checklist_items: {
        Row: {
          completed_at: string | null
          completed_by: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          order_index: number | null
          schedule_id: string
          title: string
        }
        Insert: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          schedule_id: string
          title: string
        }
        Update: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          schedule_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_deployment_checklist_items_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deployment_checklist_items_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "crm_deployment_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deployment_schedules: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string | null
          id: string
          organization_id: string
          scheduled_date: string
          scheduled_time: string | null
          status: string | null
          ticket_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          organization_id: string
          scheduled_date: string
          scheduled_time?: string | null
          status?: string | null
          ticket_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          organization_id?: string
          scheduled_date?: string
          scheduled_time?: string | null
          status?: string | null
          ticket_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deployment_schedules_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deployment_schedules_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deployment_schedules_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "crm_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_email_sequence_enrollments: {
        Row: {
          completed_at: string | null
          contact_id: string
          current_step: number | null
          enrolled_at: string | null
          id: string
          metadata: Json | null
          organization_id: string | null
          sequence_id: string
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          contact_id: string
          current_step?: number | null
          enrolled_at?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          sequence_id: string
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          contact_id?: string
          current_step?: number | null
          enrolled_at?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          sequence_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_email_sequence_enrollments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_sequence_enrollments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_sequence_enrollments_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "crm_email_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_email_sequence_events: {
        Row: {
          enrollment_id: string
          event_type: string
          id: string
          metadata: Json | null
          occurred_at: string | null
          step_id: string
        }
        Insert: {
          enrollment_id: string
          event_type: string
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          step_id: string
        }
        Update: {
          enrollment_id?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_email_sequence_events_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "crm_email_sequence_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_email_sequence_events_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "crm_email_sequence_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_email_sequence_steps: {
        Row: {
          body_html: string
          created_at: string | null
          delay_days: number
          id: string
          is_active: boolean | null
          sequence_id: string
          step_number: number
          subject: string
        }
        Insert: {
          body_html: string
          created_at?: string | null
          delay_days?: number
          id?: string
          is_active?: boolean | null
          sequence_id: string
          step_number: number
          subject: string
        }
        Update: {
          body_html?: string
          created_at?: string | null
          delay_days?: number
          id?: string
          is_active?: boolean | null
          sequence_id?: string
          step_number?: number
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_email_sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "crm_email_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_email_sequences: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          trigger_event: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          trigger_event: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          trigger_event?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_email_sequences_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_invoice_line_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          invoice_id: string
          quantity: number | null
          time_entry_id: string | null
          total: number | null
          type: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          invoice_id: string
          quantity?: number | null
          time_entry_id?: string | null
          total?: number | null
          type?: string | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number | null
          time_entry_id?: string | null
          total?: number | null
          type?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "crm_invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "crm_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_invoice_line_items_time_entry_id_fkey"
            columns: ["time_entry_id"]
            isOneToOne: false
            referencedRelation: "crm_time_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_invoices: {
        Row: {
          amount_paid: number | null
          balance_due: number | null
          contract_id: string | null
          created_at: string | null
          currency: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          notes: string | null
          organization_id: string
          paid_at: string | null
          payment_url: string | null
          pdf_url: string | null
          sent_at: string | null
          status: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          subtotal: number | null
          tax_amount: number | null
          tax_rate: number | null
          total: number | null
          updated_at: string | null
        }
        Insert: {
          amount_paid?: number | null
          balance_due?: number | null
          contract_id?: string | null
          created_at?: string | null
          currency?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          notes?: string | null
          organization_id: string
          paid_at?: string | null
          payment_url?: string | null
          pdf_url?: string | null
          sent_at?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Update: {
          amount_paid?: number | null
          balance_due?: number | null
          contract_id?: string | null
          created_at?: string | null
          currency?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          notes?: string | null
          organization_id?: string
          paid_at?: string | null
          payment_url?: string | null
          pdf_url?: string | null
          sent_at?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_invoices_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "crm_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_invoices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_org_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_org_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_org_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_organizations: {
        Row: {
          account_manager_id: string | null
          address_line1: string | null
          address_line2: string | null
          annual_revenue: number | null
          city: string | null
          contract_value_monthly: number | null
          country: string | null
          created_at: string | null
          employee_count: number | null
          health_score: number | null
          id: string
          industry: string | null
          name: string
          next_qbr_date: string | null
          notes: string | null
          nps_score: number | null
          onboarded_at: string | null
          phone: string | null
          primary_contact_id: string | null
          sla_tier: string | null
          state: string | null
          status: string | null
          stripe_customer_id: string | null
          tags: string[] | null
          type: string | null
          updated_at: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          account_manager_id?: string | null
          address_line1?: string | null
          address_line2?: string | null
          annual_revenue?: number | null
          city?: string | null
          contract_value_monthly?: number | null
          country?: string | null
          created_at?: string | null
          employee_count?: number | null
          health_score?: number | null
          id?: string
          industry?: string | null
          name: string
          next_qbr_date?: string | null
          notes?: string | null
          nps_score?: number | null
          onboarded_at?: string | null
          phone?: string | null
          primary_contact_id?: string | null
          sla_tier?: string | null
          state?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          account_manager_id?: string | null
          address_line1?: string | null
          address_line2?: string | null
          annual_revenue?: number | null
          city?: string | null
          contract_value_monthly?: number | null
          country?: string | null
          created_at?: string | null
          employee_count?: number | null
          health_score?: number | null
          id?: string
          industry?: string | null
          name?: string
          next_qbr_date?: string | null
          notes?: string | null
          nps_score?: number | null
          onboarded_at?: string | null
          phone?: string | null
          primary_contact_id?: string | null
          sla_tier?: string | null
          state?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_organizations_account_manager_id_fkey"
            columns: ["account_manager_id"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_organizations_primary_contact_fkey"
            columns: ["primary_contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_sla_configs: {
        Row: {
          business_hours_only: boolean | null
          created_at: string | null
          id: string
          name: string
          priority: string
          resolve_minutes: number
          response_minutes: number
        }
        Insert: {
          business_hours_only?: boolean | null
          created_at?: string | null
          id?: string
          name: string
          priority: string
          resolve_minutes: number
          response_minutes: number
        }
        Update: {
          business_hours_only?: boolean | null
          created_at?: string | null
          id?: string
          name?: string
          priority?: string
          resolve_minutes?: number
          response_minutes?: number
        }
        Relationships: []
      }
      crm_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          description: string | null
          due_date: string | null
          id: string
          is_automated: boolean | null
          organization_id: string | null
          priority: string | null
          status: string | null
          tags: string[] | null
          ticket_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_automated?: boolean | null
          organization_id?: string | null
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          ticket_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_automated?: boolean | null
          organization_id?: string | null
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          ticket_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_ticket_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "crm_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_tickets: {
        Row: {
          asset_id: string | null
          assigned_to: string | null
          closed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          custom_fields: Json | null
          description: string | null
          first_response_at: string | null
          id: string
          organization_id: string
          priority: string | null
          resolved_at: string | null
          satisfaction_score: number | null
          sla_resolve_due: string | null
          sla_resolve_met: boolean | null
          sla_response_due: string | null
          sla_response_met: boolean | null
          sla_tier: string | null
          source: string | null
          status: string | null
          subject: string
          tags: string[] | null
          ticket_number: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          asset_id?: string | null
          assigned_to?: string | null
          closed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_fields?: Json | null
          description?: string | null
          first_response_at?: string | null
          id?: string
          organization_id: string
          priority?: string | null
          resolved_at?: string | null
          satisfaction_score?: number | null
          sla_resolve_due?: string | null
          sla_resolve_met?: boolean | null
          sla_response_due?: string | null
          sla_response_met?: boolean | null
          sla_tier?: string | null
          source?: string | null
          status?: string | null
          subject: string
          tags?: string[] | null
          ticket_number: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          asset_id?: string | null
          assigned_to?: string | null
          closed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_fields?: Json | null
          description?: string | null
          first_response_at?: string | null
          id?: string
          organization_id?: string
          priority?: string | null
          resolved_at?: string | null
          satisfaction_score?: number | null
          sla_resolve_due?: string | null
          sla_resolve_met?: boolean | null
          sla_response_due?: string | null
          sla_response_met?: boolean | null
          sla_tier?: string | null
          source?: string | null
          status?: string | null
          subject?: string
          tags?: string[] | null
          ticket_number?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_tickets_asset_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "crm_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tickets_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tickets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_time_entries: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          end_time: string | null
          hourly_rate: number | null
          id: string
          invoice_id: string | null
          is_billable: boolean | null
          is_billed: boolean | null
          location: Json | null
          organization_id: string | null
          start_time: string
          ticket_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          hourly_rate?: number | null
          id?: string
          invoice_id?: string | null
          is_billable?: boolean | null
          is_billed?: boolean | null
          location?: Json | null
          organization_id?: string | null
          start_time: string
          ticket_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          hourly_rate?: number | null
          id?: string
          invoice_id?: string | null
          is_billable?: boolean | null
          is_billed?: boolean | null
          location?: Json | null
          organization_id?: string | null
          start_time?: string
          ticket_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_time_entries_invoice_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "crm_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_time_entries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_time_entries_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "crm_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_time_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_users: {
        Row: {
          avatar_url: string | null
          capacity_hours_per_week: number | null
          created_at: string | null
          department: string | null
          email: string
          first_name: string | null
          hourly_cost: number | null
          id: string
          is_active: boolean | null
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["crm_role"]
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          capacity_hours_per_week?: number | null
          created_at?: string | null
          department?: string | null
          email: string
          first_name?: string | null
          hourly_cost?: number | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["crm_role"]
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          capacity_hours_per_week?: number | null
          created_at?: string | null
          department?: string | null
          email?: string
          first_name?: string | null
          hourly_cost?: number | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["crm_role"]
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cve_exploits: {
        Row: {
          cve_id: string
          discovered_at: string | null
          exploit_type: string
          id: string
          source_url: string | null
          title: string | null
          verified: boolean | null
        }
        Insert: {
          cve_id: string
          discovered_at?: string | null
          exploit_type?: string
          id?: string
          source_url?: string | null
          title?: string | null
          verified?: boolean | null
        }
        Update: {
          cve_id?: string
          discovered_at?: string | null
          exploit_type?: string
          id?: string
          source_url?: string | null
          title?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      cve_github: {
        Row: {
          cve_id: string
          discovered_at: string | null
          has_exploit: boolean | null
          has_poc: boolean | null
          id: string
          repo_name: string
          repo_url: string
          stars: number | null
        }
        Insert: {
          cve_id: string
          discovered_at?: string | null
          has_exploit?: boolean | null
          has_poc?: boolean | null
          id?: string
          repo_name: string
          repo_url: string
          stars?: number | null
        }
        Update: {
          cve_id?: string
          discovered_at?: string | null
          has_exploit?: boolean | null
          has_poc?: boolean | null
          id?: string
          repo_name?: string
          repo_url?: string
          stars?: number | null
        }
        Relationships: []
      }
      cve_history: {
        Row: {
          cve_id: string
          id: string
          recorded_at: string | null
          score_type: string
          score_value: number | null
        }
        Insert: {
          cve_id: string
          id?: string
          recorded_at?: string | null
          score_type: string
          score_value?: number | null
        }
        Update: {
          cve_id?: string
          id?: string
          recorded_at?: string | null
          score_type?: string
          score_value?: number | null
        }
        Relationships: []
      }
      cve_social: {
        Row: {
          author: string | null
          content: string | null
          cve_id: string
          discovered_at: string | null
          id: string
          platform: string
          posted_at: string | null
          url: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          cve_id: string
          discovered_at?: string | null
          id?: string
          platform?: string
          posted_at?: string | null
          url?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          cve_id?: string
          discovered_at?: string | null
          id?: string
          platform?: string
          posted_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      lead_exports: {
        Row: {
          business_name: string
          created_at: string | null
          csv_exported: boolean | null
          email: string
          error_message: string | null
          first_name: string
          hubspot_contact_id: string | null
          hubspot_synced: boolean | null
          hubspot_synced_at: string | null
          id: string
          ip_address: string | null
          last_name: string | null
          phone: string | null
          role: string
          status: string | null
          user_agent: string | null
        }
        Insert: {
          business_name: string
          created_at?: string | null
          csv_exported?: boolean | null
          email: string
          error_message?: string | null
          first_name: string
          hubspot_contact_id?: string | null
          hubspot_synced?: boolean | null
          hubspot_synced_at?: string | null
          id?: string
          ip_address?: string | null
          last_name?: string | null
          phone?: string | null
          role: string
          status?: string | null
          user_agent?: string | null
        }
        Update: {
          business_name?: string
          created_at?: string | null
          csv_exported?: boolean | null
          email?: string
          error_message?: string | null
          first_name?: string
          hubspot_contact_id?: string | null
          hubspot_synced?: boolean | null
          hubspot_synced_at?: string | null
          id?: string
          ip_address?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          status?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          challenges: string[] | null
          company: string
          created_at: string
          email: string
          first_name: string | null
          id: string
          industry: string | null
          last_name: string | null
          message: string | null
          org_size: string | null
          phone: string | null
          recommended_tier: string | null
          source: string
          status: string | null
        }
        Insert: {
          challenges?: string[] | null
          company: string
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          industry?: string | null
          last_name?: string | null
          message?: string | null
          org_size?: string | null
          phone?: string | null
          recommended_tier?: string | null
          source?: string
          status?: string | null
        }
        Update: {
          challenges?: string[] | null
          company?: string
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          industry?: string | null
          last_name?: string | null
          message?: string | null
          org_size?: string | null
          phone?: string | null
          recommended_tier?: string | null
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      modules: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string | null
          icon: string | null
          id: string
          module_code: string
          module_name: string
          order_index: number | null
          page_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          icon?: string | null
          id?: string
          module_code: string
          module_name: string
          order_index?: number | null
          page_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          icon?: string | null
          id?: string
          module_code?: string
          module_name?: string
          order_index?: number | null
          page_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content: string | null
          created_at: string | null
          icon: string | null
          id: string
          is_deleted: boolean | null
          last_synced_at: string | null
          module_code: string | null
          notion_created_time: string | null
          notion_id: string
          notion_last_edited_time: string | null
          order_index: number | null
          page_type: string | null
          parent_id: string | null
          path: string
          search_vector: unknown
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_deleted?: boolean | null
          last_synced_at?: string | null
          module_code?: string | null
          notion_created_time?: string | null
          notion_id: string
          notion_last_edited_time?: string | null
          order_index?: number | null
          page_type?: string | null
          parent_id?: string | null
          path?: string
          search_vector?: unknown
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_deleted?: boolean | null
          last_synced_at?: string | null
          module_code?: string | null
          notion_created_time?: string | null
          notion_id?: string
          notion_last_edited_time?: string | null
          order_index?: number | null
          page_type?: string | null
          parent_id?: string | null
          path?: string
          search_vector?: unknown
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          access_areas: string[] | null
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_areas?: string[] | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_areas?: string[] | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sync_metadata: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: number
          last_sync: string | null
          records_updated: number | null
          sync_duration_ms: number | null
          sync_status: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: number
          last_sync?: string | null
          records_updated?: number | null
          sync_duration_ms?: number | null
          sync_status?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: number
          last_sync?: string | null
          records_updated?: number | null
          sync_duration_ms?: number | null
          sync_status?: string | null
        }
        Relationships: []
      }
      sync_runs: {
        Row: {
          completed_at: string | null
          duration_ms: number | null
          error_message: string | null
          id: string
          pages_created: number | null
          pages_deleted: number | null
          pages_synced: number | null
          pages_updated: number | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          pages_created?: number | null
          pages_deleted?: number | null
          pages_synced?: number | null
          pages_updated?: number | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          pages_created?: number | null
          pages_deleted?: number | null
          pages_synced?: number | null
          pages_updated?: number | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      threat_intel: {
        Row: {
          created_at: string | null
          cve_id: string
          cvss_severity: string | null
          cvss_v2_score: number | null
          cvss_v3_score: number | null
          cvss_vector: string | null
          description: string | null
          epss_percentile: number | null
          epss_score: number | null
          epss_updated_date: string | null
          exploit_count: number | null
          exploit_maturity: string | null
          id: string
          is_kev: boolean | null
          kev_added_date: string | null
          kev_due_date: string | null
          kev_known_ransomware: boolean | null
          kev_notes: string | null
          last_modified_date: string | null
          plain_english_summary: string | null
          poc_count: number | null
          product: string | null
          published_date: string | null
          risk_score: number | null
          search_vector: unknown
          updated_at: string | null
          urgency_level: string | null
          vendor: string | null
        }
        Insert: {
          created_at?: string | null
          cve_id: string
          cvss_severity?: string | null
          cvss_v2_score?: number | null
          cvss_v3_score?: number | null
          cvss_vector?: string | null
          description?: string | null
          epss_percentile?: number | null
          epss_score?: number | null
          epss_updated_date?: string | null
          exploit_count?: number | null
          exploit_maturity?: string | null
          id?: string
          is_kev?: boolean | null
          kev_added_date?: string | null
          kev_due_date?: string | null
          kev_known_ransomware?: boolean | null
          kev_notes?: string | null
          last_modified_date?: string | null
          plain_english_summary?: string | null
          poc_count?: number | null
          product?: string | null
          published_date?: string | null
          risk_score?: number | null
          search_vector?: unknown
          updated_at?: string | null
          urgency_level?: string | null
          vendor?: string | null
        }
        Update: {
          created_at?: string | null
          cve_id?: string
          cvss_severity?: string | null
          cvss_v2_score?: number | null
          cvss_v3_score?: number | null
          cvss_vector?: string | null
          description?: string | null
          epss_percentile?: number | null
          epss_score?: number | null
          epss_updated_date?: string | null
          exploit_count?: number | null
          exploit_maturity?: string | null
          id?: string
          is_kev?: boolean | null
          kev_added_date?: string | null
          kev_due_date?: string | null
          kev_known_ransomware?: boolean | null
          kev_notes?: string | null
          last_modified_date?: string | null
          plain_english_summary?: string | null
          poc_count?: number | null
          product?: string | null
          published_date?: string | null
          risk_score?: number | null
          search_vector?: unknown
          updated_at?: string | null
          urgency_level?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_latest_sync_status: {
        Row: {
          completed_at: string | null
          duration_ms: number | null
          error_message: string | null
          id: string | null
          pages_created: number | null
          pages_deleted: number | null
          pages_synced: number | null
          pages_updated: number | null
          started_at: string | null
          status: string | null
        }
        Relationships: []
      }
      v_module_stats: {
        Row: {
          display_name: string | null
          last_synced: string | null
          module_code: string | null
          module_name: string | null
          order_index: number | null
          page_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_crm_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["crm_role"]
      }
      guard_notion_sync_cron: { Args: never; Returns: undefined }
      has_crm_role: {
        Args: {
          _role: Database["public"]["Enums"]["crm_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_crm_user: { Args: { _user_id: string }; Returns: boolean }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
      crm_role:
        | "super_admin"
        | "admin"
        | "account_manager"
        | "technician"
        | "dispatcher"
        | "billing"
        | "portal_user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
      crm_role: [
        "super_admin",
        "admin",
        "account_manager",
        "technician",
        "dispatcher",
        "billing",
        "portal_user",
      ],
    },
  },
} as const
