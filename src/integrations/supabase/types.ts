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
          description: string | null
          epss_percentile: number | null
          epss_score: number | null
          epss_updated_date: string | null
          id: string
          is_kev: boolean | null
          kev_added_date: string | null
          kev_due_date: string | null
          kev_known_ransomware: boolean | null
          kev_notes: string | null
          last_modified_date: string | null
          plain_english_summary: string | null
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
          description?: string | null
          epss_percentile?: number | null
          epss_score?: number | null
          epss_updated_date?: string | null
          id?: string
          is_kev?: boolean | null
          kev_added_date?: string | null
          kev_due_date?: string | null
          kev_known_ransomware?: boolean | null
          kev_notes?: string | null
          last_modified_date?: string | null
          plain_english_summary?: string | null
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
          description?: string | null
          epss_percentile?: number | null
          epss_score?: number | null
          epss_updated_date?: string | null
          id?: string
          is_kev?: boolean | null
          kev_added_date?: string | null
          kev_due_date?: string | null
          kev_known_ransomware?: boolean | null
          kev_notes?: string | null
          last_modified_date?: string | null
          plain_english_summary?: string | null
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
      guard_notion_sync_cron: { Args: never; Returns: undefined }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
