import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Search, FileText } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Contract {
  id: string;
  title: string;
  status: string;
  type: string;
  start_date: string;
  end_date: string | null;
  mrr: number;
  total_value: number;
  billing_frequency: string;
  auto_renew: boolean;
  organization_id: string;
  org_name?: string;
  created_at: string;
}

interface OrgOption { id: string; name: string; }

export default function CrmContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", organization_id: "", type: "managed_services",
    start_date: "", end_date: "", mrr: "", billing_frequency: "monthly",
  });

  const fetchData = async () => {
    const [cRes, oRes] = await Promise.all([
      supabase.from("crm_contracts").select("id, title, status, type, start_date, end_date, mrr, total_value, billing_frequency, auto_renew, organization_id, created_at").order("created_at", { ascending: false }),
      supabase.from("crm_organizations").select("id, name").order("name"),
    ]);
    const orgMap = new Map((oRes.data || []).map((o: any) => [o.id, o.name]));
    if (cRes.data) setContracts((cRes.data as Contract[]).map(c => ({ ...c, org_name: orgMap.get(c.organization_id) })));
    if (oRes.data) setOrgs(oRes.data as OrgOption[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.organization_id || !form.start_date) return;
    const { error } = await supabase.from("crm_contracts").insert({
      title: form.title,
      organization_id: form.organization_id,
      type: form.type,
      start_date: form.start_date,
      end_date: form.end_date || null,
      mrr: Number(form.mrr) || 0,
      billing_frequency: form.billing_frequency,
    });
    if (error) { toast.error("Failed to create contract"); return; }
    toast.success("Contract created");
    setForm({ title: "", organization_id: "", type: "managed_services", start_date: "", end_date: "", mrr: "", billing_frequency: "monthly" });
    setDialogOpen(false);
    fetchData();
  };

  const statusColor = (s: string) => {
    if (s === "active") return "default" as const;
    if (s === "draft") return "secondary" as const;
    return "outline" as const;
  };

  const filtered = contracts.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.org_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contracts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Contract</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Contract</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div>
                <Label>Organization *</Label>
                <Select value={form.organization_id} onValueChange={v => setForm(f => ({ ...f, organization_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select org" /></SelectTrigger>
                  <SelectContent>{orgs.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Start Date *</Label><Input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} /></div>
                <div><Label>End Date</Label><Input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>MRR ($)</Label><Input type="number" value={form.mrr} onChange={e => setForm(f => ({ ...f, mrr: e.target.value }))} /></div>
                <div>
                  <Label>Billing</Label>
                  <Select value={form.billing_frequency} onValueChange={v => setForm(f => ({ ...f, billing_frequency: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleCreate} className="w-full">Create Contract</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No contracts yet.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map(c => (
            <Card key={c.id} className="border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.org_name || "No org"} · {c.type?.replace("_", " ")} · {c.billing_frequency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-foreground">${Number(c.mrr).toLocaleString()}/mo</p>
                    <p className="text-[10px] text-muted-foreground">{c.start_date} → {c.end_date || "Ongoing"}</p>
                  </div>
                  <Badge variant={statusColor(c.status)} className="capitalize text-xs">{c.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
