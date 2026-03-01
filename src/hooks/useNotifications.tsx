import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "sla_breach" | "overdue_invoice" | "ticket_assigned" | "deal_won" | "contract_expiring";
  title: string;
  message: string;
  created_at: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    checkSLABreaches();
    checkOverdueInvoices();
    checkExpiringContracts();

    const interval = setInterval(() => {
      checkSLABreaches();
      checkOverdueInvoices();
      checkExpiringContracts();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  async function checkSLABreaches() {
    const { data: tickets } = await supabase
      .from("crm_tickets")
      .select("id, ticket_number, subject, sla_response_due, sla_response_met")
      .in("status", ["open", "in_progress"])
      .eq("sla_response_met", false);

    tickets?.forEach(t => {
      if (t.sla_response_due && new Date(t.sla_response_due) < new Date()) {
        toast.error(`SLA Breach: ${t.ticket_number}`, {
          description: t.subject,
          duration: 10000,
        });
      }
    });
  }

  async function checkOverdueInvoices() {
    const { data: invoices } = await supabase
      .from("crm_invoices")
      .select("id, invoice_number, total, due_date")
      .eq("status", "sent")
      .lt("due_date", new Date().toISOString().split("T")[0]);

    if (invoices && invoices.length > 0) {
      toast.warning(`${invoices.length} Overdue Invoices`, {
        description: `Total: $${invoices.reduce((s, i) => s + Number(i.total), 0).toLocaleString()}`,
        duration: 8000,
      });
    }
  }

  async function checkExpiringContracts() {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const { data: contracts } = await supabase
      .from("crm_contracts")
      .select("id, title, end_date")
      .eq("status", "active")
      .lte("end_date", thirtyDaysFromNow.toISOString().split("T")[0]);

    contracts?.forEach(c => {
      toast.info(`Contract Expiring: ${c.title}`, {
        description: `Expires: ${c.end_date}`,
        duration: 8000,
      });
    });
  }

  return { notifications };
}
