import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Ticket, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface TicketRow {
  id: string;
  ticket_number: string;
  subject: string;
  description: string | null;
  status: string;
  priority: string;
  type: string;
  organization_id: string;
  created_at: string;
  sla_response_due: string | null;
  sla_response_met: boolean | null;
  org_name?: string;
}

interface OrgOption { id: string; name: string; }

export default function CrmTickets() {
  const { crmUser } = useCrmUser();
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    subject: "", description: "", priority: "medium", type: "incident", organization_id: "",
  });

  const fetchTickets = async () => {
    const [ticketsRes, orgsRes] = await Promise.all([
      supabase.from("crm_tickets")
        .select("id, ticket_number, subject, description, status, priority, type, organization_id, created_at, sla_response_due, sla_response_met")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase.from("crm_organizations").select("id, name").order("name"),
    ]);
    if (orgsRes.data) setOrgs(orgsRes.data as OrgOption[]);
    if (ticketsRes.data) {
      const orgMap = new Map((orgsRes.data || []).map((o: any) => [o.id, o.name]));
      setTickets((ticketsRes.data as TicketRow[]).map(t => ({
        ...t,
        org_name: orgMap.get(t.organization_id) || "Unknown",
      })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleCreate = async () => {
    if (!form.subject.trim() || !form.organization_id) return;
    const insertData: Record<string, any> = {
      subject: form.subject,
      description: form.description || null,
      priority: form.priority,
      type: form.type,
      organization_id: form.organization_id,
    };
    if (crmUser?.id) insertData.created_by = crmUser.id;
    const { error } = await supabase.from("crm_tickets").insert(insertData as any);
    if (error) { toast.error("Failed to create ticket"); return; }
    toast.success("Ticket created");
    setForm({ subject: "", description: "", priority: "medium", type: "incident", organization_id: "" });
    setDialogOpen(false);
    fetchTickets();
  };

  const updateStatus = async (ticketId: string, newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === "closed") updates.closed_at = new Date().toISOString();
    if (newStatus === "resolved") updates.resolved_at = new Date().toISOString();
    const { error } = await supabase.from("crm_tickets").update(updates).eq("id", ticketId);
    if (error) toast.error("Update failed");
    else fetchTickets();
  };

  const filtered = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.ticket_number.toLowerCase().includes(search.toLowerCase()) ||
      t.org_name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const priorityColor: Record<string, string> = {
    critical: "bg-red-500 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-yellow-500 text-black",
    low: "bg-green-500 text-white",
  };

  const statusIcon: Record<string, any> = {
    open: <AlertCircle className="h-3.5 w-3.5 text-red-500" />,
    in_progress: <Clock className="h-3.5 w-3.5 text-yellow-500" />,
    resolved: <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />,
    closed: <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />,
    escalated: <AlertCircle className="h-3.5 w-3.5 text-orange-500" />,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Ticket</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Ticket</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div><Label>Subject *</Label><Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
              <div>
                <Label>Organization *</Label>
                <Select value={form.organization_id} onValueChange={v => setForm(f => ({ ...f, organization_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select org" /></SelectTrigger>
                  <SelectContent>
                    {orgs.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Priority</Label>
                  <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incident">Incident</SelectItem>
                      <SelectItem value="service_request">Service Request</SelectItem>
                      <SelectItem value="problem">Problem</SelectItem>
                      <SelectItem value="change">Change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleCreate} className="w-full">Create Ticket</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Ticket className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No tickets found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(t => (
            <Card key={t.id} className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="shrink-0">{statusIcon[t.status] || statusIcon.open}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-muted-foreground">{t.ticket_number}</span>
                    <Badge className={`text-[10px] h-4 ${priorityColor[t.priority] || ""}`}>{t.priority}</Badge>
                    <Badge variant="outline" className="text-[10px] h-4 capitalize">{t.type.replace("_", " ")}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.org_name} · {new Date(t.created_at).toLocaleDateString()}</p>
                </div>
                <Select value={t.status} onValueChange={v => updateStatus(t.id, v)}>
                  <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
