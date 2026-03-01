import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: string;
  created_at: string;
}

export default function EmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", subject: "", body: "", type: "general" });

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    const { data } = await supabase
      .from("email_templates")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setTemplates(data as EmailTemplate[]);
  }

  async function handleSave() {
    if (!form.name || !form.subject) return;
    
    if (editingId) {
      const { error } = await supabase
        .from("email_templates")
        .update({ name: form.name, subject: form.subject, body: form.body, type: form.type })
        .eq("id", editingId);
      if (error) toast.error("Update failed");
      else toast.success("Template updated");
    } else {
      const { error } = await supabase
        .from("email_templates")
        .insert({ name: form.name, subject: form.subject, body: form.body, type: form.type });
      if (error) toast.error("Create failed");
      else toast.success("Template created");
    }
    
    setForm({ name: "", subject: "", body: "", type: "general" });
    setEditingId(null);
    setDialogOpen(false);
    fetchTemplates();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this template?")) return;
    const { error } = await supabase.from("email_templates").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Template deleted"); fetchTemplates(); }
  }

  function handleEdit(template: EmailTemplate) {
    setForm({ name: template.name, subject: template.subject, body: template.body, type: template.type });
    setEditingId(template.id);
    setDialogOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Email Templates</h2>
          <p className="text-sm text-muted-foreground">Manage reusable email templates</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={o => { setDialogOpen(o); if (!o) { setEditingId(null); setForm({ name: "", subject: "", body: "", type: "general" }); } }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Template</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editingId ? "Edit" : "New"} Email Template</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Welcome Email" /></div>
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="ticket">Ticket</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Subject *</Label><Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Welcome to {{company_name}}" /></div>
              <div><Label>Body</Label><Textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={8} placeholder="Hi {{contact_name}},&#10;&#10;Welcome to our service..." /></div>
              <p className="text-xs text-muted-foreground">Variables: {"{"}{"{"}}contact_name{"}"}{"}"}, {"{"}{"{"}}company_name{"}"}{"}"}, {"{"}{"{"}}ticket_number{"}"}{"}"}</p>
              <Button onClick={handleSave} className="w-full">{editingId ? "Update" : "Create"} Template</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No templates yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {templates.map(t => (
            <Card key={t.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{t.name}</p>
                      <Badge variant="outline" className="capitalize text-xs">{t.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Subject: {t.subject}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{t.body}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(t)}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(t.id)}><Trash2 className="h-3.5 w-3.5 text-red-600" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
