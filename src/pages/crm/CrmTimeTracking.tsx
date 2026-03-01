import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Clock, DollarSign } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface TimeEntry {
  id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  description: string | null;
  is_billable: boolean;
  is_billed: boolean;
  hourly_rate: number | null;
  ticket_id: string;
  organization_id: string | null;
  ticket_subject?: string;
  org_name?: string;
  created_at: string;
}

interface TicketOption { id: string; subject: string; ticket_number: string; organization_id: string | null; }
interface OrgOption { id: string; name: string; }

export default function CrmTimeTracking() {
  const { crmUser } = useCrmUser();
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [tickets, setTickets] = useState<TicketOption[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    ticket_id: "", description: "", duration_minutes: "", hourly_rate: "150", is_billable: true,
  });

  const fetchData = async () => {
    const [tRes, tkRes, oRes] = await Promise.all([
      supabase.from("crm_time_entries").select("*").order("start_time", { ascending: false }).limit(100),
      supabase.from("crm_tickets").select("id, subject, ticket_number, organization_id").order("created_at", { ascending: false }).limit(200),
      supabase.from("crm_organizations").select("id, name").order("name"),
    ]);
    const orgMap = new Map((oRes.data || []).map((o: any) => [o.id, o.name]));
    const ticketMap = new Map((tkRes.data || []).map((t: any) => [t.id, t]));
    if (tRes.data) {
      setEntries((tRes.data as TimeEntry[]).map(e => {
        const tk = ticketMap.get(e.ticket_id);
        return {
          ...e,
          ticket_subject: tk ? `${tk.ticket_number}: ${tk.subject}` : e.ticket_id,
          org_name: orgMap.get(e.organization_id || "") || (tk ? orgMap.get(tk.organization_id || "") : undefined),
        };
      }));
    }
    if (tkRes.data) setTickets(tkRes.data as TicketOption[]);
    if (oRes.data) setOrgs(oRes.data as OrgOption[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.ticket_id || !form.duration_minutes || !crmUser) return;
    const ticket = tickets.find(t => t.id === form.ticket_id);
    const now = new Date().toISOString();
    const { error } = await supabase.from("crm_time_entries").insert({
      ticket_id: form.ticket_id,
      user_id: crmUser.id,
      organization_id: ticket?.organization_id || null,
      description: form.description || null,
      duration_minutes: Number(form.duration_minutes),
      hourly_rate: Number(form.hourly_rate) || 150,
      is_billable: form.is_billable,
      start_time: now,
      end_time: now,
    });
    if (error) { toast.error("Failed to log time"); return; }
    toast.success("Time logged");
    setForm({ ticket_id: "", description: "", duration_minutes: "", hourly_rate: "150", is_billable: true });
    setDialogOpen(false);
    fetchData();
  };

  const totalHours = entries.reduce((s, e) => s + (e.duration_minutes || 0), 0) / 60;
  const billableHours = entries.filter(e => e.is_billable).reduce((s, e) => s + (e.duration_minutes || 0), 0) / 60;
  const totalRevenue = entries.filter(e => e.is_billable).reduce((s, e) => s + ((e.duration_minutes || 0) / 60) * (e.hourly_rate || 0), 0);

  return (
    <div className="space-y-4">
      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border"><CardContent className="p-4">
          <p className="text-2xl font-bold text-foreground">{totalHours.toFixed(1)}h</p>
          <p className="text-xs text-muted-foreground">Total Hours</p>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <p className="text-2xl font-bold text-foreground">{billableHours.toFixed(1)}h</p>
          <p className="text-xs text-muted-foreground">Billable Hours</p>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Billable Revenue</p>
        </CardContent></Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{entries.length} entries</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Log Time</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Log Time Entry</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div>
                <Label>Ticket *</Label>
                <Select value={form.ticket_id} onValueChange={v => setForm(f => ({ ...f, ticket_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select ticket" /></SelectTrigger>
                  <SelectContent>
                    {tickets.map(t => <SelectItem key={t.id} value={t.id}>{t.ticket_number}: {t.subject}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Duration (minutes) *</Label><Input type="number" value={form.duration_minutes} onChange={e => setForm(f => ({ ...f, duration_minutes: e.target.value }))} /></div>
                <div><Label>Hourly Rate ($)</Label><Input type="number" value={form.hourly_rate} onChange={e => setForm(f => ({ ...f, hourly_rate: e.target.value }))} /></div>
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={form.is_billable} onChange={e => setForm(f => ({ ...f, is_billable: e.target.checked }))} className="rounded" />
                Billable
              </label>
              <Button onClick={handleCreate} className="w-full">Log Time</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No time entries yet.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {entries.map(e => (
            <Card key={e.id} className="border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{e.ticket_subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.org_name || ""} {e.description ? `· ${e.description.slice(0, 60)}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">{e.duration_minutes}m</span>
                  {e.is_billable && <Badge variant="default" className="text-[10px]"><DollarSign className="h-2.5 w-2.5 mr-0.5" />Billable</Badge>}
                  {e.is_billed && <Badge variant="outline" className="text-[10px]">Billed</Badge>}
                  <span className="text-[10px] text-muted-foreground">{new Date(e.start_time).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
