import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
import { ArrowLeft, Save, Activity, User, Plus, Building2 } from "lucide-react";
import { toast } from "sonner";

interface ContactData {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  job_title: string | null;
  department: string | null;
  organization_id: string | null;
  lifecycle_stage: string;
  lead_score: number;
  is_primary: boolean;
  is_decision_maker: boolean;
  is_technical: boolean;
  preferred_channel: string;
  timezone: string;
  linkedin_url: string | null;
  tags: string[];
  created_at: string;
}

interface ActivityRow {
  id: string;
  type: string;
  subject: string | null;
  body: string | null;
  created_at: string;
}

interface OrgName {
  id: string;
  name: string;
}

export default function CrmContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<ContactData | null>(null);
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [orgs, setOrgs] = useState<OrgName[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (!id) return;
    Promise.all([
      supabase.from("crm_contacts").select("*").eq("id", id).single(),
      supabase.from("crm_activities").select("id, type, subject, body, created_at").eq("contact_id", id).order("created_at", { ascending: false }).limit(50),
      supabase.from("crm_organizations").select("id, name").order("name"),
    ]).then(([cRes, aRes, oRes]) => {
      if (cRes.data) {
        const c = cRes.data as unknown as ContactData;
        setContact(c);
        if (c.organization_id && oRes.data) {
          const found = (oRes.data as OrgName[]).find(o => o.id === c.organization_id);
          if (found) setOrgName(found.name);
        }
      }
      if (aRes.data) setActivities(aRes.data as ActivityRow[]);
      if (oRes.data) setOrgs(oRes.data as OrgName[]);
      setLoading(false);
    });
  }, [id]);

  const updateField = (field: string, value: any) => {
    if (!contact) return;
    setContact({ ...contact, [field]: value } as ContactData);
  };

  const handleSave = async () => {
    if (!contact) return;
    setSaving(true);
    const { error } = await supabase.from("crm_contacts").update({
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile,
      job_title: contact.job_title,
      department: contact.department,
      organization_id: contact.organization_id,
      lifecycle_stage: contact.lifecycle_stage,
      is_primary: contact.is_primary,
      is_decision_maker: contact.is_decision_maker,
      is_technical: contact.is_technical,
      preferred_channel: contact.preferred_channel,
      linkedin_url: contact.linkedin_url,
    }).eq("id", contact.id);
    setSaving(false);
    if (error) toast.error("Save failed");
    else toast.success("Contact updated");
  };

  const addNote = async () => {
    if (!noteText.trim() || !contact) return;
    const { error } = await supabase.from("crm_activities").insert({
      type: "note",
      subject: "Note",
      body: noteText,
      contact_id: contact.id,
      organization_id: contact.organization_id,
    });
    if (error) toast.error("Failed to add note");
    else {
      toast.success("Note added");
      setNoteText("");
      const { data } = await supabase.from("crm_activities").select("id, type, subject, body, created_at").eq("contact_id", contact.id).order("created_at", { ascending: false }).limit(50);
      if (data) setActivities(data as ActivityRow[]);
    }
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;
  if (!contact) return <div className="text-center py-12 text-muted-foreground">Contact not found.</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/crm/contacts")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">{contact.first_name} {contact.last_name}</h2>
          <p className="text-sm text-muted-foreground">
            {contact.job_title || "No title"}{orgName ? ` at ${orgName}` : ""}
          </p>
        </div>
        <Badge variant="outline" className="capitalize">{contact.lifecycle_stage}</Badge>
        <Button size="sm" onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details"><User className="h-3.5 w-3.5 mr-1" /> Details</TabsTrigger>
          <TabsTrigger value="activity"><Activity className="h-3.5 w-3.5 mr-1" /> Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader><CardTitle className="text-sm">Personal Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>First Name</Label><Input value={contact.first_name} onChange={e => updateField("first_name", e.target.value)} /></div>
                  <div><Label>Last Name</Label><Input value={contact.last_name || ""} onChange={e => updateField("last_name", e.target.value)} /></div>
                </div>
                <div><Label>Email</Label><Input type="email" value={contact.email || ""} onChange={e => updateField("email", e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Phone</Label><Input value={contact.phone || ""} onChange={e => updateField("phone", e.target.value)} /></div>
                  <div><Label>Mobile</Label><Input value={contact.mobile || ""} onChange={e => updateField("mobile", e.target.value)} /></div>
                </div>
                <div><Label>LinkedIn</Label><Input value={contact.linkedin_url || ""} onChange={e => updateField("linkedin_url", e.target.value)} /></div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader><CardTitle className="text-sm">Work Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><Label>Job Title</Label><Input value={contact.job_title || ""} onChange={e => updateField("job_title", e.target.value)} /></div>
                <div><Label>Department</Label><Input value={contact.department || ""} onChange={e => updateField("department", e.target.value)} /></div>
                <div>
                  <Label>Organization</Label>
                  <Select value={contact.organization_id || "none"} onValueChange={v => updateField("organization_id", v === "none" ? null : v)}>
                    <SelectTrigger><SelectValue placeholder="Select organization" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— None —</SelectItem>
                      {orgs.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Lifecycle Stage</Label>
                  <Select value={contact.lifecycle_stage} onValueChange={v => updateField("lifecycle_stage", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="mql">MQL</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="opportunity">Opportunity</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="churned">Churned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" checked={contact.is_primary} onChange={e => updateField("is_primary", e.target.checked)} className="rounded" />
                    Primary Contact
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" checked={contact.is_decision_maker} onChange={e => updateField("is_decision_maker", e.target.checked)} className="rounded" />
                    Decision Maker
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" checked={contact.is_technical} onChange={e => updateField("is_technical", e.target.checked)} className="rounded" />
                    Technical
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-4 space-y-4">
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
