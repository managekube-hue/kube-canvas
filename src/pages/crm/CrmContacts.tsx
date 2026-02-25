import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Contact {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  job_title: string | null;
  organization_id: string | null;
  lifecycle_stage: string;
  lead_score: number;
  created_at: string;
}

export default function CrmContacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", job_title: "" });

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("crm_contacts")
      .select("id, first_name, last_name, email, phone, job_title, organization_id, lifecycle_stage, lead_score, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (!error && data) setContacts(data as Contact[]);
    setLoading(false);
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleCreate = async () => {
    if (!form.first_name.trim()) return;
    const { error } = await supabase
      .from("crm_contacts")
      .insert({
        first_name: form.first_name,
        last_name: form.last_name || null,
        email: form.email || null,
        phone: form.phone || null,
        job_title: form.job_title || null,
      });
    if (error) {
      toast.error("Failed to create contact");
      return;
    }
    toast.success("Contact created");
    setForm({ first_name: "", last_name: "", email: "", phone: "", job_title: "" });
    setDialogOpen(false);
    fetchContacts();
  };

  const filtered = contacts.filter(c => {
    const q = search.toLowerCase();
    return c.first_name.toLowerCase().includes(q) ||
      c.last_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Contact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Contact</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>First Name *</Label><Input value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} /></div>
                <div><Label>Last Name</Label><Input value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} /></div>
              </div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div><Label>Job Title</Label><Input value={form.job_title} onChange={e => setForm(f => ({ ...f, job_title: e.target.value }))} /></div>
              <Button onClick={handleCreate} className="w-full">Create Contact</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No contacts yet.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map((c) => (
            <Card key={c.id} className="border-border hover:shadow-sm transition-shadow cursor-pointer" onClick={() => navigate(`/crm/contacts/${c.id}`)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {c.first_name[0]}{c.last_name?.[0] || ""}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{c.first_name} {c.last_name}</p>
                    <p className="text-xs text-muted-foreground">{c.email || "No email"} {c.job_title ? `· ${c.job_title}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs capitalize">{c.lifecycle_stage}</Badge>
                  <span className="text-xs text-muted-foreground">Score: {c.lead_score}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
