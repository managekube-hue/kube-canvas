import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Shield } from "lucide-react";

interface AuditEntry {
  id: string;
  action: string;
  table_name: string;
  record_id: string | null;
  user_id: string | null;
  old_values: any;
  new_values: any;
  ip_address: string | null;
  created_at: string;
}

export default function CrmAuditLog() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("crm_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (data) setEntries(data as AuditEntry[]);
        setLoading(false);
      });
  }, []);

  const actionColor = (a: string) => {
    if (a === "INSERT" || a === "create") return "default" as const;
    if (a === "UPDATE" || a === "update") return "secondary" as const;
    if (a === "DELETE" || a === "delete") return "destructive" as const;
    return "outline" as const;
  };

  const filtered = entries.filter(e =>
    e.table_name.toLowerCase().includes(search.toLowerCase()) ||
    e.action.toLowerCase().includes(search.toLowerCase()) ||
    e.record_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search audit log..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No audit entries found.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map(e => (
            <Card key={e.id} className="border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={actionColor(e.action)} className="text-[10px] uppercase w-16 justify-center">{e.action}</Badge>
                  <div>
                    <p className="font-medium text-foreground text-sm">{e.table_name.replace("crm_", "")}</p>
                    <p className="text-xs text-muted-foreground">
                      Record: {e.record_id?.slice(0, 8) || "—"}
                      {e.ip_address ? ` · IP: ${e.ip_address}` : ""}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString()}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
