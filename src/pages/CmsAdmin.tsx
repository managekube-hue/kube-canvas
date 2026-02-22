import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Users, Briefcase, Plus, Trash2, Eye, EyeOff, Loader2, RefreshCw, Search } from "lucide-react";

/* ── Contacts Tab ─────────────────────────────────────── */

const ContactsTab = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 25;

  const load = async (p = 0) => {
    setLoading(true);
    let query = supabase
      .from("cms_contacts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(p * pageSize, (p + 1) * pageSize - 1);

    if (search.trim()) {
      query = query.or(
        `email.ilike.%${search.trim()}%,first_name.ilike.%${search.trim()}%,last_name.ilike.%${search.trim()}%,company.ilike.%${search.trim()}%`
      );
    }

    const { data, count, error } = await query;
    if (error) console.error(error);
    setContacts(data || []);
    setPage(p);
    setLoading(false);
  };

  useEffect(() => { load(0); }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Input
          placeholder="Search contacts by name, email, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load(0)}
          className="flex-1"
        />
        <Button variant="outline" size="sm" onClick={() => load(0)} className="gap-2">
          <Search className="w-4 h-4" /> Search
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(""); load(0); }} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Reset
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : contacts.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No contacts found.</p>
      ) : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Name", "Email", "Company", "Source", "Tier", "EMS", "Created"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contacts.map(c => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{[c.first_name, c.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.company || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 border border-border bg-muted text-muted-foreground">
                      {c.source || "website"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.mk_recommended_tier || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.mk_ems_score ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Page {page + 1}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => load(page - 1)}>Previous</Button>
          <Button variant="outline" size="sm" disabled={contacts.length < pageSize} onClick={() => load(page + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
};

/* ── Careers Tab ──────────────────────────────────────── */

const CareersTab = () => {
  const [postings, setPostings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", department: "", location: "Remote / Hybrid", description: "",
    employment_type: "Full-time", salary_range: "", requirements: "",
    nice_to_haves: "", application_email: "careers@managekube.com",
  });

  const load = async () => {
    setLoading(true);
    // Use service role via edge function or just read all (RLS allows public read of published only)
    // For admin, we read all — note: RLS only allows published for anon. 
    // We'll show what we can see and rely on service_role for management.
    const { data } = await supabase.from("cms_career_postings").select("*").order("sort_order");
    setPostings(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("cms_career_postings").update({
      is_published: !current,
      published_at: !current ? new Date().toISOString() : null,
    }).eq("id", id);
    load();
  };

  const deletePosting = async (id: string) => {
    if (!confirm("Delete this posting?")) return;
    await supabase.from("cms_career_postings").delete().eq("id", id);
    load();
  };

  const savePosting = async () => {
    const payload = {
      title: form.title,
      department: form.department,
      location: form.location,
      description: form.description,
      employment_type: form.employment_type,
      salary_range: form.salary_range || null,
      requirements: form.requirements ? form.requirements.split("\n").filter(Boolean) : null,
      nice_to_haves: form.nice_to_haves ? form.nice_to_haves.split("\n").filter(Boolean) : null,
      application_email: form.application_email,
    };

    if (editId) {
      await supabase.from("cms_career_postings").update(payload).eq("id", editId);
    } else {
      await supabase.from("cms_career_postings").insert(payload);
    }
    setEditId(null);
    setForm({ title: "", department: "", location: "Remote / Hybrid", description: "", employment_type: "Full-time", salary_range: "", requirements: "", nice_to_haves: "", application_email: "careers@managekube.com" });
    load();
  };

  const startEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      title: p.title,
      department: p.department,
      location: p.location || "",
      description: p.description,
      employment_type: p.employment_type || "Full-time",
      salary_range: p.salary_range || "",
      requirements: (p.requirements || []).join("\n"),
      nice_to_haves: (p.nice_to_haves || []).join("\n"),
      application_email: p.application_email || "careers@managekube.com",
    });
  };

  return (
    <div className="space-y-6">
      {/* Posting form */}
      <div className="border border-border p-6 bg-card space-y-4">
        <h3 className="font-bold text-foreground">{editId ? "Edit Posting" : "New Career Posting"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Job Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <Input placeholder="Department *" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
          <Input placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          <Input placeholder="Employment Type" value={form.employment_type} onChange={e => setForm(f => ({ ...f, employment_type: e.target.value }))} />
          <Input placeholder="Salary Range" value={form.salary_range} onChange={e => setForm(f => ({ ...f, salary_range: e.target.value }))} />
          <Input placeholder="Application Email" value={form.application_email} onChange={e => setForm(f => ({ ...f, application_email: e.target.value }))} />
        </div>
        <textarea
          placeholder="Job Description *"
          className="w-full h-24 px-3 py-2 border border-border bg-background text-foreground text-sm"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <textarea
          placeholder="Requirements (one per line)"
          className="w-full h-20 px-3 py-2 border border-border bg-background text-foreground text-sm"
          value={form.requirements}
          onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
        />
        <textarea
          placeholder="Nice to Haves (one per line)"
          className="w-full h-16 px-3 py-2 border border-border bg-background text-foreground text-sm"
          value={form.nice_to_haves}
          onChange={e => setForm(f => ({ ...f, nice_to_haves: e.target.value }))}
        />
        <div className="flex gap-3">
          <Button onClick={savePosting} disabled={!form.title || !form.department || !form.description}>
            {editId ? "Update" : "Create"} Posting
          </Button>
          {editId && (
            <Button variant="ghost" onClick={() => {
              setEditId(null);
              setForm({ title: "", department: "", location: "Remote / Hybrid", description: "", employment_type: "Full-time", salary_range: "", requirements: "", nice_to_haves: "", application_email: "careers@managekube.com" });
            }}>Cancel</Button>
          )}
        </div>
      </div>

      {/* Postings list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : postings.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No career postings yet.</p>
      ) : (
        <div className="space-y-3">
          {postings.map(p => (
            <div key={p.id} className="flex items-center justify-between gap-4 border border-border p-4 bg-card">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-foreground truncate">{p.title}</h4>
                  <span className={`text-xs px-2 py-0.5 border ${p.is_published ? "border-green-700 bg-green-950/30 text-green-500" : "border-border bg-muted text-muted-foreground"}`}>
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{p.department} · {p.location} · {p.employment_type}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => togglePublish(p.id, p.is_published)} title={p.is_published ? "Unpublish" : "Publish"}>
                  {p.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => startEdit(p)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => deletePosting(p.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Applications Tab ─────────────────────────────────── */

const ApplicationsTab = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("cms_career_applications").select("*").order("created_at", { ascending: false });
      setApps(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;
  if (apps.length === 0) return <p className="text-muted-foreground text-center py-12">No applications yet.</p>;

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {["Name", "Email", "Phone", "Status", "Applied"].map(h => (
              <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {apps.map(a => (
            <tr key={a.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-medium text-foreground">{a.first_name} {a.last_name}</td>
              <td className="px-4 py-3 text-muted-foreground">{a.email}</td>
              <td className="px-4 py-3 text-muted-foreground">{a.phone || "—"}</td>
              <td className="px-4 py-3">
                <span className="text-xs px-2 py-0.5 border border-border bg-muted text-muted-foreground">{a.status}</span>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── Main CMS Page ────────────────────────────────────── */

const CmsAdmin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBanner title="Content Management" subtitle="Manage contacts, career postings, and applications" />

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border mb-8 h-auto flex-wrap">
              <TabsTrigger value="contacts" className="gap-2">
                <Users className="w-4 h-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="careers" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Career Postings
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <Plus className="w-4 h-4" />
                Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacts"><ContactsTab /></TabsContent>
            <TabsContent value="careers"><CareersTab /></TabsContent>
            <TabsContent value="applications"><ApplicationsTab /></TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CmsAdmin;
