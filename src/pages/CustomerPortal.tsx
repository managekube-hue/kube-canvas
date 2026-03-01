import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Ticket, FileText, DollarSign, Package, Activity } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  health_score: number;
  contract_value_monthly: number;
}

interface TicketRow {
  id: string;
  ticket_number: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
}

interface InvoiceRow {
  id: string;
  invoice_number: string;
  status: string;
  total: number;
  due_date: string;
}

export default function CustomerPortal() {
  const { user } = useAuth();
  const [org, setOrg] = useState<Organization | null>(null);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchPortalData();
  }, [user]);

  async function fetchPortalData() {
    // Find organization linked to this user's email
    const { data: contact } = await supabase
      .from("crm_contacts")
      .select("organization_id")
      .eq("email", user?.email)
      .single();

    if (!contact?.organization_id) {
      setLoading(false);
      return;
    }

    const [orgRes, ticketsRes, invoicesRes] = await Promise.all([
      supabase.from("crm_organizations").select("id, name, health_score, contract_value_monthly").eq("id", contact.organization_id).single(),
      supabase.from("crm_tickets").select("id, ticket_number, subject, status, priority, created_at").eq("organization_id", contact.organization_id).order("created_at", { ascending: false }).limit(20),
      supabase.from("crm_invoices").select("id, invoice_number, status, total, due_date").eq("organization_id", contact.organization_id).order("issue_date", { ascending: false }).limit(20),
    ]);

    if (orgRes.data) setOrg(orgRes.data as Organization);
    if (ticketsRes.data) setTickets(ticketsRes.data as TicketRow[]);
    if (invoicesRes.data) setInvoices(invoicesRes.data as InvoiceRow[]);
    setLoading(false);
  }

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  if (!org) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No organization found for your account</p>
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
            <Badge variant="default">Health Score: {org.health_score}</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Monthly Service</p>
              <p className="text-2xl font-bold text-foreground">${org.contract_value_monthly.toLocaleString()}</p>
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
            {tickets.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No tickets</p>
            ) : (
              tickets.map(t => (
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
              ))
            )}
          </TabsContent>

          <TabsContent value="invoices" className="space-y-3 mt-4">
            {invoices.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No invoices</p>
            ) : (
              invoices.map(inv => (
                <Card key={inv.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{inv.invoice_number}</p>
                        <p className="text-sm text-muted-foreground">Due: {inv.due_date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-foreground">${inv.total.toLocaleString()}</p>
                        <Badge variant={inv.status === "paid" ? "default" : "secondary"} className="capitalize">
                          {inv.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
