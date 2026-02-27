import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Search, Package, Monitor, Server, Smartphone, Wifi } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Asset {
  id: string;
  name: string;
  type: string;
  status: string;
  health_status: string;
  manufacturer: string | null;
  model: string | null;
  serial_number: string | null;
  ip_address: string | null;
  os_name: string | null;
  organization_id: string;
  org_name?: string;
  last_seen_at: string | null;
  created_at: string;
}

interface OrgOption { id: string; name: string; }

const typeIcons: Record<string, any> = {
  workstation: Monitor, server: Server, mobile: Smartphone, network: Wifi,
};

export default function CrmAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", type: "workstation", organization_id: "", manufacturer: "", model: "", serial_number: "", ip_address: "",
  });

  const fetchData = async () => {
    const [aRes, oRes] = await Promise.all([
      supabase.from("crm_assets").select("id, name, type, status, health_status, manufacturer, model, serial_number, ip_address, os_name, organization_id, last_seen_at, created_at").order("created_at", { ascending: false }).limit(200),
      supabase.from("crm_organizations").select("id, name").order("name"),
    ]);
    const orgMap = new Map((oRes.data || []).map((o: any) => [o.id, o.name]));
    if (aRes.data) setAssets((aRes.data as Asset[]).map(a => ({ ...a, org_name: orgMap.get(a.organization_id) })));
    if (oRes.data) setOrgs(oRes.data as OrgOption[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.name.trim() || !form.organization_id) return;
    const { error } = await supabase.from("crm_assets").insert({
      name: form.name,
      type: form.type,
      organization_id: form.organization_id,
      manufacturer: form.manufacturer || null,
      model: form.model || null,
      serial_number: form.serial_number || null,
      ip_address: form.ip_address || null,
    });
    if (error) { toast.error("Failed to create asset"); return; }
    toast.success("Asset created");
    setForm({ name: "", type: "workstation", organization_id: "", manufacturer: "", model: "", serial_number: "", ip_address: "" });
    setDialogOpen(false);
    fetchData();
  };

  const healthColor = (h: string) => {
    if (h === "healthy") return "bg-green-500";
    if (h === "warning") return "bg-yellow-500";
    if (h === "critical") return "bg-red-500";
    return "bg-muted-foreground/30";
  };

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.serial_number?.toLowerCase().includes(search.toLowerCase()) ||
    a.ip_address?.toLowerCase().includes(search.toLowerCase()) ||
    a.org_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Asset</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Asset</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workstation">Workstation</SelectItem>
                      <SelectItem value="server">Server</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="printer">Printer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Organization *</Label>
                  <Select value={form.organization_id} onValueChange={v => setForm(f => ({ ...f, organization_id: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select org" /></SelectTrigger>
                    <SelectContent>{orgs.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Manufacturer</Label><Input value={form.manufacturer} onChange={e => setForm(f => ({ ...f, manufacturer: e.target.value }))} /></div>
                <div><Label>Model</Label><Input value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Serial Number</Label><Input value={form.serial_number} onChange={e => setForm(f => ({ ...f, serial_number: e.target.value }))} /></div>
                <div><Label>IP Address</Label><Input value={form.ip_address} onChange={e => setForm(f => ({ ...f, ip_address: e.target.value }))} /></div>
              </div>
              <Button onClick={handleCreate} className="w-full">Create Asset</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No assets tracked yet.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map(a => {
            const Icon = typeIcons[a.type] || Package;
            return (
              <Card key={a.id} className="border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{a.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.org_name} · {a.manufacturer || ""} {a.model || ""} {a.ip_address ? `· ${a.ip_address}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${healthColor(a.health_status)}`} />
                      <span className="text-xs text-muted-foreground capitalize">{a.health_status}</span>
                    </div>
                    <Badge variant={a.status === "active" ? "default" : "secondary"} className="capitalize text-xs">{a.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
