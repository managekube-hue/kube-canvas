import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft, Building2, Users, Briefcase, Ticket, FileText,
  Activity, Save, Plus, Mail, Phone, Globe, MapPin,
} from "lucide-react";
import { toast } from "sonner";

interface OrgData {
  id: string;
  name: string;
  type: string;
  status: string;
  industry: string | null;
  website: string | null;
  phone: string | null;
  address_line1: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  health_score: number;
  nps_score: number | null;
  contract_value_monthly: number;
  sla_tier: string;
  notes: string | null;
  employee_count: number | null;
  annual_revenue: number | null;
  created_at: string;
}

interface ContactRow {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  job_title: string | null;
  is_primary: boolean;
}

interface ActivityRow {
  id: string;
  type: string;
  subject: string | null;
  body: string | null;
  created_at: string;
}

interface DealRow {
  id: string;
  title: string;
  value: number;
  stage_id: string;
  created_at: string;
}

interface TicketRow {
  id: string;
  ticket_number: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
}

export default function CrmOrgDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useCrmUser();
  const [org, setOrg] = useState<OrgData | null>(null);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [deals, setDeals] = useState<DealRow[]>([]);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (!id) return;
    Promise.all([
      supabase.from("crm_organizations").select("*").eq("id", id).single(),
      supabase.from("crm_contacts").select("id, first_name, last_name, email, job_title, is_primary").eq("organization_id", id).order("is_primary", { ascending: false }),
      supabase.from("crm_activities").select("id, type, subject, body, created_at").eq("organization_id", id).order("created_at", { ascending: false }).limit(50),
      supabase.from("crm_deals").select("id, title, value, stage_id, created_at").eq("organization_id", id).order("created_at", { ascending: false }),
      supabase.from("crm_tickets").select("id, ticket_number, subject, status, priority, created_at").eq("organization_id", id).order("created_at", { ascending: false }).limit(50),
    ]).then(([orgRes, contactsRes, activitiesRes, dealsRes, ticketsRes]) => {
      if (orgRes.data) setOrg(orgRes.data as unknown as OrgData);
      if (contactsRes.data) setContacts(contactsRes.data as ContactRow[]);
      if (activitiesRes.data) setActivities(activitiesRes.data as ActivityRow[]);
      if (dealsRes.data) setDeals(dealsRes.data as DealRow[]);
      if (ticketsRes.data) setTickets(ticketsRes.data as TicketRow[]);
      setLoading(false);
    });
  }, [id]);

  const updateField = (field: string, value: any) => {
    if (!org) return;
    setOrg({ ...org, [field]: value } as OrgData);
  };

  const handleSave = async () => {
    if (!org) return;
    setSaving(true);
    const { error } = await supabase.from("crm_organizations").update({
      name: org.name,
      type: org.type,
      status: org.status,
      industry: org.industry,
      website: org.website,
      phone: org.phone,
      address_line1: org.address_line1,
      city: org.city,
      state: org.state,
      zip: org.zip,
      country: org.country,
      sla_tier: org.sla_tier,
      notes: org.notes,
      health_score: org.health_score,
      employee_count: org.employee_count,
    }).eq("id", org.id);
    setSaving(false);
    if (error) toast.error("Save failed");
    else toast.success("Organization updated");
  };

  const addNote = async () => {
    if (!noteText.trim() || !org) return;
    const { error } = await supabase.from("crm_activities").insert({
      type: "note",
      subject: "Note",
      body: noteText,
      organization_id: org.id,
    });
    if (error) toast.error("Failed to add note");
    else {
      toast.success("Note added");
      setNoteText("");
      const { data } = await supabase.from("crm_activities").select("id, type, subject, body, created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(50);
      if (data) setActivities(data as ActivityRow[]);
    }
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;
  if (!org) return <div className="text-center py-12 text-muted-foreground">Organization not found.</div>;

  const healthColor = org.health_score >= 70 ? "text-green-600" : org.health_score >= 40 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/crm/organizations")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">{org.name}</h2>
          <p className="text-sm text-muted-foreground">{org.industry || "No industry"} · {org.type}</p>
        </div>
        <Badge variant={org.status === "active" ? "default" : "secondary"}>{org.status}</Badge>
        <Button size="sm" onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <p className={`text-2xl font-bold ${healthColor}`}>{org.health_score}</p>
            <p className="text-xs text-muted-foreground">Health Score</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-foreground">${Number(org.contract_value_monthly).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">MRR</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{contacts.length}</p>
            <p className="text-xs text-muted-foreground">Contacts</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{tickets.filter(t => t.status !== "closed").length}</p>
            <p className="text-xs text-muted-foreground">Open Tickets</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="details"><Building2 className="h-3.5 w-3.5 mr-1" /> Details</TabsTrigger>
          <TabsTrigger value="contacts"><Users className="h-3.5 w-3.5 mr-1" /> Contacts ({contacts.length})</TabsTrigger>
          <TabsTrigger value="deals"><Briefcase className="h-3.5 w-3.5 mr-1" /> Deals ({deals.length})</TabsTrigger>
          <TabsTrigger value="tickets"><Ticket className="h-3.5 w-3.5 mr-1" /> Tickets ({tickets.length})</TabsTrigger>
          <TabsTrigger value="activity"><Activity className="h-3.5 w-3.5 mr-1" /> Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader><CardTitle className="text-sm">Organization Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><Label>Name</Label><Input value={org.name} onChange={e => updateField("name", e.target.value)} /></div>
                <div><Label>Industry</Label><Input value={org.industry || ""} onChange={e => updateField("industry", e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Type</Label>
                    <Select value={org.type} onValueChange={v => updateField("type", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={org.status} onValueChange={v => updateField("status", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="churned">Churned</SelectItem>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>SLA Tier</Label>
                    <Select value={org.sla_tier} onValueChange={v => updateField("sla_tier", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Employees</Label><Input type="number" value={org.employee_count || ""} onChange={e => updateField("employee_count", e.target.value ? Number(e.target.value) : null)} /></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader><CardTitle className="text-sm">Contact Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><Label><Globe className="inline h-3 w-3 mr-1" />Website</Label><Input value={org.website || ""} onChange={e => updateField("website", e.target.value)} /></div>
                <div><Label><Phone className="inline h-3 w-3 mr-1" />Phone</Label><Input value={org.phone || ""} onChange={e => updateField("phone", e.target.value)} /></div>
                <div><Label><MapPin className="inline h-3 w-3 mr-1" />Address</Label><Input value={org.address_line1 || ""} onChange={e => updateField("address_line1", e.target.value)} /></div>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="City" value={org.city || ""} onChange={e => updateField("city", e.target.value)} />
                  <Input placeholder="State" value={org.state || ""} onChange={e => updateField("state", e.target.value)} />
                  <Input placeholder="ZIP" value={org.zip || ""} onChange={e => updateField("zip", e.target.value)} />
                </div>
                <div><Label>Notes</Label><Textarea value={org.notes || ""} onChange={e => updateField("notes", e.target.value)} rows={3} /></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="mt-4 space-y-3">
          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No contacts linked to this organization.</p>
          ) : contacts.map(c => (
            <Link key={c.id} to={`/crm/contacts/${c.id}`} className="block">
              <Card className="border-border hover:shadow-sm transition-shadow">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{c.first_name[0]}{c.last_name?.[0] || ""}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.first_name} {c.last_name}</p>
                      <p className="text-xs text-muted-foreground">{c.email || "No email"}{c.job_title ? ` · ${c.job_title}` : ""}</p>
                    </div>
                  </div>
                  {c.is_primary && <Badge variant="default" className="text-xs">Primary</Badge>}
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="deals" className="mt-4 space-y-3">
          {deals.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No deals for this organization.</p>
          ) : deals.map(d => (
            <Card key={d.id} className="border-border">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">${Number(d.value).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tickets" className="mt-4 space-y-3">
          {tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No tickets for this organization.</p>
          ) : tickets.map(t => (
            <Card key={t.id} className="border-border">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.ticket_number} — {t.subject}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs capitalize">{t.priority}</Badge>
                  <Badge variant={t.status === "closed" ? "secondary" : "default"} className="text-xs capitalize">{t.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="mt-4 space-y-4">
          {/* Add note */}
          <Card className="border-border">
            <CardContent className="p-3 space-y-2">
              <Textarea placeholder="Add a note..." value={noteText} onChange={e => setNoteText(e.target.value)} rows={2} />
              <Button size="sm" onClick={addNote} disabled={!noteText.trim()}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Note
              </Button>
            </CardContent>
          </Card>
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No activity yet.</p>
          ) : activities.map(a => (
            <div key={a.id} className="flex gap-3 items-start">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="text-sm text-foreground font-medium">{a.subject || a.type}</p>
                {a.body && <p className="text-xs text-muted-foreground mt-0.5">{a.body}</p>}
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{new Date(a.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
