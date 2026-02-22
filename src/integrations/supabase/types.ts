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
      lead_exports: {
        Row: {
          business_name: string
          created_at: string | null
          email: string
          first_name: string
          id: string
          role: string
        }
        Insert: {
          business_name: string
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          role: string
        }
        Update: {
          business_name?: string
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          role?: string
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
