import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Building2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BulkActions } from "@/components/crm/BulkActions";
import { AdvancedFilters } from "@/components/crm/AdvancedFilters";
import { SkeletonTable } from "@/components/crm/SkeletonLoaders";
import { Checkbox } from "@/components/ui/checkbox";

interface Org {
  id: string;
  name: string;
  type: string;
  status: string;
  industry: string | null;
  health_score: number;
  contract_value_monthly: number;
  created_at: string;
}

export default function CrmOrganizations() {
  const { isAdmin } = useCrmUser();
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "", type: "client" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<any>({});

  const fetchOrgs = async () => {
    const { data, error } = await supabase
      .from("crm_organizations")
      .select("id, name, type, status, industry, health_score, contract_value_monthly, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setOrgs(data as Org[]);
    setLoading(false);
  };

  useEffect(() => { fetchOrgs(); }, []);

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    const { error } = await supabase
      .from("crm_organizations")
      .insert({ name: form.name, industry: form.industry || null, type: form.type });
    if (error) {
      toast.error("Failed to create organization");
      return;
    }
    toast.success("Organization created");
    setForm({ name: "", industry: "", type: "client" });
    setDialogOpen(false);
    fetchOrgs();
  };

  const filtered = orgs.filter(o => {
    const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.industry?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filters.status || o.status === filters.status;
    const matchesType = !filters.type || o.type === filters.type;
    return matchesSearch && matchesStatus && matchesType;
  });

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelected(newSelected);
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(o => o.id)));
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selected.size} organizations?`)) return;
    const { error } = await supabase.from("crm_organizations").delete().in("id", Array.from(selected));
    if (error) toast.error("Bulk delete failed");
    else { toast.success(`Deleted ${selected.size} organizations`); setSelected(new Set()); fetchOrgs(); }
  };

  const handleBulkExport = () => {
    const data = orgs.filter(o => selected.has(o.id));
    const csv = ["Name,Industry,Type,Status,Health Score,MRR",
      ...data.map(o => `${o.name},${o.industry || ""},${o.type},${o.status},${o.health_score},${o.contract_value_monthly}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `organizations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Exported to CSV");
  };

  const healthColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            statusOptions={[
              { label: "Active", value: "active" },
              { label: "Churned", value: "churned" },
              { label: "Onboarding", value: "onboarding" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Organization</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Organization</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Name *</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <Label>Industry</Label>
                <Input value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} />
              </div>
              <Button onClick={handleCreate} className="w-full">Create Organization</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BulkActions
        selectedCount={selected.size}
        onDelete={handleBulkDelete}
        onExport={handleBulkExport}
      />

      {loading ? (
        <SkeletonTable rows={8} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No organizations yet. Create your first one.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
              <Checkbox
                checked={selected.size === filtered.length && filtered.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-xs text-muted-foreground">Select all</span>
            </div>
          )}
          {filtered.map((org) => (
            <Card key={org.id} className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <Checkbox
                  checked={selected.has(org.id)}
                  onCheckedChange={() => toggleSelect(org.id)}
                  onClick={e => e.stopPropagation()}
                />
                <div className="flex-1 flex items-center justify-between cursor-pointer" onClick={() => navigate(`/crm/organizations/${org.id}`)}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{org.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {org.industry || "No industry"} · {org.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-foreground">
                        ${Number(org.contract_value_monthly || 0).toLocaleString()}/mo
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${healthColor(org.health_score)}`} />
                      <span className="text-xs text-muted-foreground">{org.health_score}</span>
                    </div>
                    <Badge variant={org.status === "active" ? "default" : "secondary"} className="text-xs">
                      {org.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
