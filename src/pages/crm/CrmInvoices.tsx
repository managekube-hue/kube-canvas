import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, Search, FileText, DollarSign, Send, Download } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoice_number: string;
  status: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_amount: number;
  total: number;
  balance_due: number | null;
  amount_paid: number;
  organization_id: string;
  contract_id: string | null;
  currency: string;
  org_name?: string;
  created_at: string;
}

interface OrgOption { id: string; name: string; }
interface ContractOption { id: string; title: string; organization_id: string; }

export default function CrmInvoices() {
  const { isBilling } = useCrmUser();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [contracts, setContracts] = useState<ContractOption[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    organization_id: "", contract_id: "", due_date: "", subtotal: "", tax_rate: "0",
  });

  const fetchData = async () => {
    const [invRes, oRes, cRes] = await Promise.all([
      supabase.from("crm_invoices")
        .select("id, invoice_number, status, issue_date, due_date, subtotal, tax_amount, total, balance_due, amount_paid, organization_id, contract_id, currency, created_at")
        .order("created_at", { ascending: false }).limit(200),
      supabase.from("crm_organizations").select("id, name").order("name"),
      supabase.from("crm_contracts").select("id, title, organization_id").eq("status", "active"),
    ]);
    const orgMap = new Map((oRes.data || []).map((o: any) => [o.id, o.name]));
    if (invRes.data) setInvoices((invRes.data as Invoice[]).map(i => ({ ...i, org_name: orgMap.get(i.organization_id) })));
    if (oRes.data) setOrgs(oRes.data as OrgOption[]);
    if (cRes.data) setContracts(cRes.data as ContractOption[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.organization_id || !form.due_date) return;
    const subtotal = Number(form.subtotal) || 0;
    const taxRate = Number(form.tax_rate) || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;
    const { error } = await supabase.from("crm_invoices").insert({
      organization_id: form.organization_id,
      contract_id: form.contract_id || null,
      due_date: form.due_date,
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total,
      balance_due: total,
    } as any);
    if (error) { toast.error("Failed to create invoice"); return; }
    toast.success("Invoice created");
    setForm({ organization_id: "", contract_id: "", due_date: "", subtotal: "", tax_rate: "0" });
    setDialogOpen(false);
    fetchData();
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === "sent") updates.sent_at = new Date().toISOString();
    if (newStatus === "paid") {
      updates.paid_at = new Date().toISOString();
      const inv = invoices.find(i => i.id === id);
      if (inv) {
        updates.amount_paid = inv.total;
        updates.balance_due = 0;
      }
    }
    const { error } = await supabase.from("crm_invoices").update(updates).eq("id", id);
    if (error) toast.error("Update failed");
    else { toast.success(`Invoice marked ${newStatus}`); fetchData(); }
  };

  const filtered = invoices.filter(i => {
    const matchSearch = i.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      i.org_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalOutstanding = invoices.filter(i => i.status !== "paid" && i.status !== "void").reduce((s, i) => s + (Number(i.balance_due) || Number(i.total)), 0);
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + Number(i.total), 0);

  const statusColor = (s: string) => {
    switch (s) {
      case "paid": return "bg-green-500/10 text-green-700 border-green-200";
      case "sent": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "overdue": return "bg-red-500/10 text-red-700 border-red-200";
      case "draft": return "bg-muted text-muted-foreground";
      case "void": return "bg-muted text-muted-foreground line-through";
      default: return "";
    }
  };

  return (
    <div className="space-y-4">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border"><CardContent className="p-4">
          <p className="text-2xl font-bold text-foreground">{invoices.length}</p>
          <p className="text-xs text-muted-foreground">Total Invoices</p>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <p className="text-2xl font-bold text-foreground">${totalOutstanding.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Outstanding</p>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <p className="text-2xl font-bold text-foreground">${totalPaid.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Collected</p>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <p className="text-2xl font-bold text-foreground">{invoices.filter(i => i.status === "overdue").length}</p>
          <p className="text-xs text-muted-foreground">Overdue</p>
        </CardContent></Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="void">Void</SelectItem>
          </SelectContent>
        </Select>
        {isBilling && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Invoice</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Invoice</DialogTitle></DialogHeader>
              <div className="space-y-3 pt-2">
                <div>
                  <Label>Organization *</Label>
                  <Select value={form.organization_id} onValueChange={v => setForm(f => ({ ...f, organization_id: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select org" /></SelectTrigger>
                    <SelectContent>{orgs.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Contract (optional)</Label>
                  <Select value={form.contract_id} onValueChange={v => setForm(f => ({ ...f, contract_id: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select contract" /></SelectTrigger>
                    <SelectContent>
                      {contracts.filter(c => !form.organization_id || c.organization_id === form.organization_id).map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Due Date *</Label><Input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Subtotal ($)</Label><Input type="number" value={form.subtotal} onChange={e => setForm(f => ({ ...f, subtotal: e.target.value }))} /></div>
                  <div><Label>Tax Rate (%)</Label><Input type="number" value={form.tax_rate} onChange={e => setForm(f => ({ ...f, tax_rate: e.target.value }))} /></div>
                </div>
                <Button onClick={handleCreate} className="w-full">Create Invoice</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No invoices found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(inv => (
            <Card key={inv.id} className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-muted-foreground">{inv.invoice_number}</span>
                    <Badge variant="outline" className={`text-[10px] h-4 capitalize ${statusColor(inv.status)}`}>{inv.status}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{inv.org_name || "Unknown Org"}</p>
                  <p className="text-xs text-muted-foreground">Due: {inv.due_date} · Issued: {inv.issue_date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">${Number(inv.total).toLocaleString()}</p>
                  {inv.status !== "paid" && inv.status !== "void" && (
                    <p className="text-[10px] text-muted-foreground">Balance: ${(Number(inv.balance_due) || Number(inv.total)).toLocaleString()}</p>
                  )}
                </div>
                {isBilling && inv.status === "draft" && (
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); updateStatus(inv.id, "sent"); }}>
                    <Send className="h-3 w-3 mr-1" /> Send
                  </Button>
                )}
                {isBilling && inv.status === "sent" && (
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); updateStatus(inv.id, "paid"); }}>
                    <DollarSign className="h-3 w-3 mr-1" /> Mark Paid
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
