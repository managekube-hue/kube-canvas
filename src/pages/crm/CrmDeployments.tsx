import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Calendar, Search } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Deployment {
  id: string;
  title: string;
  description: string | null;
  scheduled_date: string;
  scheduled_time: string | null;
  status: string;
  organization_id: string;
  org_name?: string;
  created_at: string;
}

interface OrgOption { id: string; name: string; }

export default function CrmDeployments() {
  const { crmUser } = useCrmUser();
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", scheduled_date: "", scheduled_time: "", organization_id: "",
  });

  const fetchData = async () => {
    const [dRes, oRes] = await Promise.all([
      supabase.from("crm_deployment_schedules").select("id, title, description, scheduled_date, scheduled_time, status, organization_id, created_at").order("scheduled_date", { ascending: true }),
      supabase.from("crm_organizations").select("id, name").order("name"),
    ]);
    const orgMap = new Map((oRes.data || []).map((o: any) => [o.id, o.name]));
    if (dRes.data) setDeployments((dRes.data as Deployment[]).map(d => ({ ...d, org_name: orgMap.get(d.organization_id) })));
    if (oRes.data) setOrgs(oRes.data as OrgOption[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.organization_id || !form.scheduled_date) return;
    const { error } = await supabase.from("crm_deployment_schedules").insert({
      title: form.title,
      description: form.description || null,
      scheduled_date: form.scheduled_date,
      scheduled_time: form.scheduled_time || null,
      organization_id: form.organization_id,
      assigned_to: crmUser?.id || null,
    });
    if (error) { toast.error("Failed to create deployment"); return; }
    toast.success("Deployment scheduled");
    setForm({ title: "", description: "", scheduled_date: "", scheduled_time: "", organization_id: "" });
    setDialogOpen(false);
    fetchData();
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("crm_deployment_schedules").update({ status }).eq("id", id);
    if (error) toast.error("Update failed");
    else fetchData();
  };

  const statusColor = (s: string) => {
    if (s === "completed") return "default" as const;
    if (s === "in_progress") return "secondary" as const;
    if (s === "cancelled") return "destructive" as const;
    return "outline" as const;
  };

  const filtered = deployments.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.org_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search deployments..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Schedule Deployment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Schedule Deployment</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} /></div>
              <div>
                <Label>Organization *</Label>
                <Select value={form.organization_id} onValueChange={v => setForm(f => ({ ...f, organization_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select org" /></SelectTrigger>
                  <SelectContent>{orgs.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Date *</Label><Input type="date" value={form.scheduled_date} onChange={e => setForm(f => ({ ...f, scheduled_date: e.target.value }))} /></div>
                <div><Label>Time</Label><Input type="time" value={form.scheduled_time} onChange={e => setForm(f => ({ ...f, scheduled_time: e.target.value }))} /></div>
              </div>
              <Button onClick={handleCreate} className="w-full">Schedule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No deployments scheduled.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map(d => (
            <Card key={d.id} className="border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.org_name} · {d.scheduled_date} {d.scheduled_time || ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={d.status} onValueChange={v => updateStatus(d.id, v)}>
                    <SelectTrigger className="h-7 w-32 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
