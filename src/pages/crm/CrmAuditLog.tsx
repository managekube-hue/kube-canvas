import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Activity } from "lucide-react";
import { AdvancedFilters } from "@/components/crm/AdvancedFilters";
import { SkeletonTable } from "@/components/crm/SkeletonLoaders";

interface AuditEntry {
  id: string;
  action: string;
  table_name: string;
  record_id: string | null;
  user_id: string | null;
  created_at: string;
  user_email?: string;
}

export default function CrmAuditLog() {
  const { isAdmin } = useCrmUser();
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    fetchAuditLog();
  }, [isAdmin]);

  async function fetchAuditLog() {
    const { data: auditData } = await supabase
      .from("crm_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (auditData) {
      const userIds = [...new Set(auditData.map(a => a.user_id).filter(Boolean))];
      const { data: users } = await supabase
        .from("crm_users")
        .select("id, email")
        .in("id", userIds);

      const userMap = new Map(users?.map(u => [u.id, u.email]) || []);
      setEntries(auditData.map(a => ({
        ...a,
        user_email: a.user_id ? userMap.get(a.user_id) : "System",
      })) as AuditEntry[]);
    }
    setLoading(false);
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">Admin access required</p>
      </div>
    );
  }

  const filtered = entries.filter(e => {
    const matchesSearch = e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.table_name.toLowerCase().includes(search.toLowerCase()) ||
      e.user_email?.toLowerCase().includes(search.toLowerCase());
    const matchesAction = !filters.action || e.action === filters.action;
    const matchesTable = !filters.table || e.table_name === filters.table;
    const matchesDate = (!filters.dateFrom || e.created_at >= filters.dateFrom) &&
                        (!filters.dateTo || e.created_at <= filters.dateTo);
    return matchesSearch && matchesAction && matchesTable && matchesDate;
  });

  const actionColor = (action: string) => {
    if (action === "create") return "bg-green-500/10 text-green-700";
    if (action === "update") return "bg-blue-500/10 text-blue-700";
    if (action === "delete") return "bg-red-500/10 text-red-700";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Audit Log</h2>
        <p className="text-sm text-muted-foreground">Complete history of all CRM actions</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search audit log..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <AdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          statusOptions={[
            { label: "Create", value: "create" },
            { label: "Update", value: "update" },
            { label: "Delete", value: "delete" },
            { label: "Login", value: "login" },
            { label: "Export", value: "export" },
          ]}
        />
      </div>

      {loading ? (
        <SkeletonTable rows={10} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No audit entries found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(entry => (
            <Card key={entry.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={`capitalize ${actionColor(entry.action)}`}>
                      {entry.action}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {entry.table_name.replace("crm_", "").replace("_", " ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {entry.user_email || "System"} • {new Date(entry.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {entry.record_id && (
                    <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {entry.record_id.slice(0, 8)}
                    </code>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
