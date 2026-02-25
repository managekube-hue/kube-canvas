import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type CrmRole = "super_admin" | "admin" | "account_manager" | "technician" | "dispatcher" | "billing" | "portal_user";

export interface CrmUser {
  id: string;
  user_id: string;
  role: CrmRole;
  first_name: string | null;
  last_name: string | null;
  email: string;
  is_active: boolean;
}

export function useCrmUser() {
  const { user, loading: authLoading } = useAuth();
  const [crmUser, setCrmUser] = useState<CrmUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCrmUser = useCallback(async () => {
    if (!user) {
      setCrmUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("crm_users")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        setCrmUser(data as unknown as CrmUser);
      } else {
        // First authenticated user becomes super_admin
        const { count } = await supabase
          .from("crm_users")
          .select("*", { count: "exact", head: true });

        if (count === 0) {
          const { data: newUser, error: insertError } = await supabase
            .from("crm_users")
            .insert({
              user_id: user.id,
              email: user.email || "",
              role: "super_admin",
              first_name: user.user_metadata?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "Admin",
              last_name: user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || null,
            })
            .select()
            .single();

          if (insertError) throw insertError;
          setCrmUser(newUser as unknown as CrmUser);
        } else {
          setError("no_access");
        }
      }
    } catch (err: any) {
      console.error("CRM user fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      fetchCrmUser();
    }
  }, [authLoading, fetchCrmUser]);

  const isAdmin = crmUser?.role === "super_admin" || crmUser?.role === "admin";
  const isBilling = isAdmin || crmUser?.role === "billing";
  const isDispatcher = isAdmin || crmUser?.role === "dispatcher";

  return {
    crmUser,
    loading: authLoading || loading,
    error,
    isAdmin,
    isBilling,
    isDispatcher,
    refetch: fetchCrmUser,
  };
}
