import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Briefcase, Ticket, FileText, DollarSign } from "lucide-react";

interface DashboardStats {
  organizations: number;
  contacts: number;
  openDeals: number;
  openTickets: number;
  activeContracts: number;
  totalMrr: number;
}

export default function CrmDashboard() {
  const { crmUser } = useCrmUser();
  const [stats, setStats] = useState<DashboardStats>({
    organizations: 0,
    contacts: 0,
    openDeals: 0,
    openTickets: 0,
    activeContracts: 0,
    totalMrr: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [orgs, contacts, deals, tickets, contracts] = await Promise.all([
          supabase.from("crm_organizations").select("*", { count: "exact", head: true }),
          supabase.from("crm_contacts").select("*", { count: "exact", head: true }),
          supabase.from("crm_deals").select("*", { count: "exact", head: true }),
          supabase.from("crm_tickets").select("*", { count: "exact", head: true }).in("status", ["open", "in_progress", "escalated"]),
          supabase.from("crm_contracts").select("mrr", { count: "exact" }).eq("status", "active"),
        ]);

        const totalMrr = contracts.data?.reduce((sum, c) => sum + (Number(c.mrr) || 0), 0) || 0;

        setStats({
          organizations: orgs.count || 0,
          contacts: contacts.count || 0,
          openDeals: deals.count || 0,
          openTickets: tickets.count || 0,
          activeContracts: contracts.count || 0,
          totalMrr,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const kpis = [
    { label: "Organizations", value: stats.organizations, icon: Building2, color: "text-blue-600" },
    { label: "Contacts", value: stats.contacts, icon: Users, color: "text-green-600" },
    { label: "Open Deals", value: stats.openDeals, icon: Briefcase, color: "text-purple-600" },
    { label: "Open Tickets", value: stats.openTickets, icon: Ticket, color: "text-orange-600" },
    { label: "Active Contracts", value: stats.activeContracts, icon: FileText, color: "text-indigo-600" },
    { label: "Monthly MRR", value: `$${stats.totalMrr.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome back, {crmUser?.first_name || "Admin"}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Here's what's happening across your managed services.
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {loading ? "—" : kpi.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* My Day Panel + Recent Activity — placeholders */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">My Tasks Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No tasks due today.</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
