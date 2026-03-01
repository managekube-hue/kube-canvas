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
import { BulkActions } from "@/components/crm/BulkActions";
import { AdvancedFilters } from "@/components/crm/AdvancedFilters";
import { SkeletonTable } from "@/components/crm/SkeletonLoaders";
import { Checkbox } from "@/components/ui/checkbox";
import { SavedFilters } from "@/components/crm/SavedFilters";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

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
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<any>({});

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

  useRealtimeSync("crm_contacts", fetchContacts);

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
    const matchesSearch = c.first_name.toLowerCase().includes(q) ||
      c.last_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q);
    const matchesStage = !filters.lifecycle_stage || c.lifecycle_stage === filters.lifecycle_stage;
    const matchesDate = (!filters.dateFrom || c.created_at >= filters.dateFrom) &&
                        (!filters.dateTo || c.created_at <= filters.dateTo);
    return matchesSearch && matchesStage && matchesDate;
  });

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelected(newSelected);
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(c => c.id)));
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selected.size} contacts?`)) return;
    const { error } = await supabase.from("crm_contacts").delete().in("id", Array.from(selected));
    if (error) toast.error("Bulk delete failed");
    else { toast.success(`Deleted ${selected.size} contacts`); setSelected(new Set()); fetchContacts(); }
  };

  const handleBulkExport = () => {
    const data = contacts.filter(c => selected.has(c.id));
    const csv = ["First Name,Last Name,Email,Phone,Job Title,Stage,Score",
      ...data.map(c => `${c.first_name},${c.last_name || ""},${c.email || ""},${c.phone || ""},${c.job_title || ""},${c.lifecycle_stage},${c.lead_score}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Exported to CSV");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            statusOptions={[
              { label: "Lead", value: "lead" },
              { label: "MQL", value: "mql" },
              { label: "SQL", value: "sql" },
              { label: "Opportunity", value: "opportunity" },
              { label: "Customer", value: "customer" },
              { label: "Churned", value: "churned" },
            ]}
          />
          <SavedFilters
            currentFilters={filters}
            onLoadPreset={setFilters}
            storageKey="crm-contacts-filters"
          />
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

      <BulkActions
        selectedCount={selected.size}
        onDelete={handleBulkDelete}
        onExport={handleBulkExport}
      />

      {loading ? (
        <SkeletonTable rows={8} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No contacts yet.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
              <Checkbox
                checked={selected.size === filtered.length && filtered.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-xs text-muted-foreground">Select all</span>
            </div>
          )}
          {filtered.map((c) => (
            <Card key={c.id} className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <Checkbox
                  checked={selected.has(c.id)}
                  onCheckedChange={() => toggleSelect(c.id)}
                  onClick={e => e.stopPropagation()}
                />
                <div className="flex-1 flex items-center justify-between cursor-pointer" onClick={() => navigate(`/crm/contacts/${c.id}`)}>
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
                <div className="flex items-center gap-2">
                  <select
                    className="text-xs border border-border rounded px-2 py-1 bg-background text-foreground"
                    value={c.lifecycle_stage}
                    onClick={e => e.stopPropagation()}
                    onChange={async (e) => {
                      e.stopPropagation();
                      const newStage = e.target.value;
                      await supabase.from("crm_contacts").update({ lifecycle_stage: newStage }).eq("id", c.id);
                      fetchContacts();
                    }}
                  >
                    <option value="lead">Lead</option>
                    <option value="mql">MQL</option>
                    <option value="sql">SQL</option>
                    <option value="opportunity">Opportunity</option>
                    <option value="customer">Customer</option>
                    <option value="churned">Churned</option>
                  </select>
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
