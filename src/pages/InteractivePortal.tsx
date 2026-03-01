import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Ticket, DollarSign, Plus, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

export default function InteractivePortal() {
  const { user } = useAuth();
  const [org, setOrg] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", description: "", priority: "medium" });

  useEffect(() => {
    if (!user) return;
    fetchPortalData();
  }, [user]);

  useRealtimeSync("crm_tickets", () => fetchTickets());
  useRealtimeSync("crm_invoices", () => fetchInvoices());

  async function fetchPortalData() {
    const { data: contact } = await supabase
      .from("crm_contacts")
      .select("organization_id")
      .eq("email", user?.email)
      .single();

    if (!contact?.organization_id) return;

    const [orgRes, ticketsRes, invoicesRes] = await Promise.all([
      supabase.from("crm_organizations").select("*").eq("id", contact.organization_id).single(),
      supabase.from("crm_tickets").select("*").eq("organization_id", contact.organization_id).order("created_at", { ascending: false }),
      supabase.from("crm_invoices").select("*").eq("organization_id", contact.organization_id).order("issue_date", { ascending: false }),
    ]);

    if (orgRes.data) setOrg(orgRes.data);
    if (ticketsRes.data) setTickets(ticketsRes.data);
    if (invoicesRes.data) setInvoices(invoicesRes.data);
  }

  async function fetchTickets() {
    if (!org) return;
    const { data } = await supabase
      .from("crm_tickets")
      .select("*")
      .eq("organization_id", org.id)
      .order("created_at", { ascending: false });
    if (data) setTickets(data);
  }

  async function fetchInvoices() {
    if (!org) return;
    const { data } = await supabase
      .from("crm_invoices")
      .select("*")
      .eq("organization_id", org.id)
      .order("issue_date", { ascending: false });
    if (data) setInvoices(data);
  }

  async function createTicket() {
    if (!form.subject || !org) return;

    const { error } = await supabase.from("crm_tickets").insert({
      subject: form.subject,
      description: form.description,
      priority: form.priority,
      organization_id: org.id,
      source: "portal",
    });

    if (error) {
      toast.error("Failed to create ticket");
      return;
    }

    toast.success("Ticket created");
    setForm({ subject: "", description: "", priority: "medium" });
    setDialogOpen(false);
    fetchTickets();
  }

  async function payInvoice(invoiceId: string) {
    // Simulate payment - in production, integrate with Stripe
    const { error } = await supabase
      .from("crm_invoices")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", invoiceId);

    if (error) {
      toast.error("Payment failed");
      return;
    }

    toast.success("Payment processed");
    fetchInvoices();
  }

  if (!org) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No organization found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{org.name}</h1>
              <p className="text-sm text-muted-foreground">Customer Portal</p>
            </div>
            <Badge variant="default">Health: {org.health_score}</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Monthly Service</p>
              <p className="text-2xl font-bold text-foreground">${org.contract_value_monthly?.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Open Tickets</p>
              <p className="text-2xl font-bold text-foreground">{tickets.filter(t => t.status !== "closed").length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Pending Invoices</p>
              <p className="text-2xl font-bold text-foreground">{invoices.filter(i => i.status !== "paid").length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets">
          <TabsList>
            <TabsTrigger value="tickets"><Ticket className="h-4 w-4 mr-1" /> Tickets</TabsTrigger>
            <TabsTrigger value="invoices"><DollarSign className="h-4 w-4 mr-1" /> Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-3 mt-4">
            <div className="flex justify-end">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Ticket</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Create Support Ticket</DialogTitle></DialogHeader>
                  <div className="space-y-3 pt-2">
                    <div><Label>Subject *</Label><Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} /></div>
                    <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} /></div>
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
                    <Button onClick={createTicket} className="w-full">Create Ticket</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {tickets.map(t => (
              <Card key={t.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{t.ticket_number}</p>
                      <p className="text-sm text-muted-foreground">{t.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">{t.priority}</Badge>
                      <Badge className="capitalize">{t.status.replace("_", " ")}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="invoices" className="space-y-3 mt-4">
            {invoices.map(inv => (
              <Card key={inv.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{inv.invoice_number}</p>
                      <p className="text-sm text-muted-foreground">Due: {inv.due_date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-foreground">${inv.total?.toLocaleString()}</p>
                      {inv.status === "paid" ? (
                        <Badge variant="default">Paid</Badge>
                      ) : (
                        <Button size="sm" onClick={() => payInvoice(inv.id)}>
                          <CreditCard className="h-3.5 w-3.5 mr-1" /> Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
