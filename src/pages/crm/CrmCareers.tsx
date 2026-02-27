import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Eye, EyeOff, Briefcase, Users, FileText, Download } from "lucide-react";
import { toast } from "sonner";

interface Posting {
  id: string;
  title: string;
  department: string;
  location: string | null;
  employment_type: string | null;
  description: string;
  requirements: string[] | null;
  nice_to_haves: string[] | null;
  salary_range: string | null;
  application_email: string;
  is_published: boolean | null;
  sort_order: number | null;
  created_at: string;
}

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  cover_letter: string | null;
  resume_url: string | null;
  status: string | null;
  posting_id: string | null;
  created_at: string;
  notes: string | null;
}

const emptyForm = {
  title: "", department: "", location: "Remote / Hybrid", employment_type: "Full-time",
  description: "", requirements: "", nice_to_haves: "", salary_range: "",
  application_email: "careers@managekube.com", sort_order: "0",
};

export default function CrmCareers() {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchAll = async () => {
    const [pRes, aRes] = await Promise.all([
      supabase.from("cms_career_postings").select("*").order("sort_order"),
      supabase.from("cms_career_applications").select("*").order("created_at", { ascending: false }),
    ]);
    if (pRes.data) setPostings(pRes.data as Posting[]);
    if (aRes.data) setApplications(aRes.data as Application[]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (p: Posting) => {
    setEditId(p.id);
    setForm({
      title: p.title, department: p.department, location: p.location || "",
      employment_type: p.employment_type || "Full-time", description: p.description,
      requirements: (p.requirements || []).join("\n"), nice_to_haves: (p.nice_to_haves || []).join("\n"),
      salary_range: p.salary_range || "", application_email: p.application_email,
      sort_order: String(p.sort_order || 0),
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.department.trim() || !form.description.trim()) {
      toast.error("Title, department, and description are required");
      return;
    }
    const payload = {
      title: form.title, department: form.department, location: form.location || null,
      employment_type: form.employment_type, description: form.description,
      requirements: form.requirements.split("\n").filter(Boolean),
      nice_to_haves: form.nice_to_haves.split("\n").filter(Boolean),
      salary_range: form.salary_range || null, application_email: form.application_email,
      sort_order: Number(form.sort_order) || 0,
    };

    const { error } = editId
      ? await supabase.from("cms_career_postings").update(payload).eq("id", editId)
      : await supabase.from("cms_career_postings").insert(payload);

    if (error) { toast.error(error.message); return; }
    toast.success(editId ? "Posting updated" : "Posting created");
    setFormOpen(false);
    fetchAll();
  };

  const togglePublish = async (id: string, current: boolean) => {
    const update: any = { is_published: !current };
    if (!current) update.published_at = new Date().toISOString();
    const { error } = await supabase.from("cms_career_postings").update(update).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success(current ? "Unpublished" : "Published to careers page"); fetchAll(); }
  };

  const deletePosting = async (id: string) => {
    if (!confirm("Delete this posting?")) return;
    const { error } = await supabase.from("cms_career_postings").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchAll(); }
  };

  const updateAppStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("cms_career_applications").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Status updated"); fetchAll(); }
  };

  const getResumeUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage.from("resumes").getPublicUrl(path);
    return data?.publicUrl || null;
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="postings">
        <TabsList>
          <TabsTrigger value="postings"><Briefcase className="h-3.5 w-3.5 mr-1" /> Postings ({postings.length})</TabsTrigger>
          <TabsTrigger value="applications"><Users className="h-3.5 w-3.5 mr-1" /> Applications ({applications.length})</TabsTrigger>
        </TabsList>

        {/* ── POSTINGS TAB ── */}
        <TabsContent value="postings" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Manage job postings — published ones appear on /careers</p>
            <Button size="sm" onClick={openNew}><Plus className="h-4 w-4 mr-1" /> New Posting</Button>
          </div>

          {postings.map(p => (
            <Card key={p.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground truncate">{p.title}</h3>
                      <Badge variant={p.is_published ? "default" : "secondary"} className="text-[10px]">
                        {p.is_published ? "Live" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.department} · {p.location} · {p.employment_type}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePublish(p.id, !!p.is_published)}>
                      {p.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deletePosting(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ── APPLICATIONS TAB ── */}
        <TabsContent value="applications" className="mt-4 space-y-3">
          <p className="text-sm text-muted-foreground">Incoming applications from the public careers page</p>
          {applications.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No applications yet.</p>
          ) : applications.map(a => {
            const posting = postings.find(p => p.id === a.posting_id);
            return (
              <Card key={a.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{a.first_name} {a.last_name}</p>
                      <p className="text-xs text-muted-foreground">{a.email} {a.phone && `· ${a.phone}`}</p>
                      {posting && <p className="text-xs text-primary mt-0.5">Applied for: {posting.title}</p>}
                      {a.linkedin_url && <p className="text-xs text-muted-foreground mt-0.5">LinkedIn: {a.linkedin_url}</p>}
                      {a.cover_letter && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.cover_letter}</p>}
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(a.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {a.resume_url && (
                        <a href={getResumeUrl(a.resume_url) || "#"} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                            <Download className="h-3 w-3" /> Resume
                          </Button>
                        </a>
                      )}
                      <Select value={a.status || "new"} onValueChange={v => updateAppStatus(a.id, v)}>
                        <SelectTrigger className="w-28 h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewing">Reviewing</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* ── CREATE/EDIT DIALOG ── */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editId ? "Edit Posting" : "New Job Posting"}</DialogTitle></DialogHeader>
          <div className="space-y-3 pt-2">
            <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Department *</Label><Input value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Employment Type</Label>
                <Select value={form.employment_type} onValueChange={v => setForm(f => ({ ...f, employment_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Salary Range</Label><Input value={form.salary_range} onChange={e => setForm(f => ({ ...f, salary_range: e.target.value }))} placeholder="e.g. $80k–$120k" /></div>
            </div>
            <div><Label>Description *</Label><Textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div><Label>Requirements (one per line)</Label><Textarea rows={4} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} /></div>
            <div><Label>Nice to Have (one per line)</Label><Textarea rows={3} value={form.nice_to_haves} onChange={e => setForm(f => ({ ...f, nice_to_haves: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: e.target.value }))} /></div>
              <div><Label>Application Email</Label><Input value={form.application_email} onChange={e => setForm(f => ({ ...f, application_email: e.target.value }))} /></div>
            </div>
            <Button onClick={handleSave} className="w-full">{editId ? "Update Posting" : "Create Posting"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
