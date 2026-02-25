import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, DollarSign, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DealStage {
  id: string;
  name: string;
  order_index: number;
  color: string;
  probability: number;
  is_won: boolean;
  is_lost: boolean;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  mrr: number;
  probability: number;
  stage_id: string;
  organization_id: string | null;
  contact_id: string | null;
  expected_close_date: string | null;
  created_at: string;
  org_name?: string;
}

interface OrgOption { id: string; name: string; }

export default function CrmDeals() {
  const { crmUser } = useCrmUser();
  const [stages, setStages] = useState<DealStage[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", value: "", mrr: "", stage_id: "", organization_id: "", expected_close_date: "",
  });

  const fetchData = async () => {
    const [stagesRes, dealsRes, orgsRes] = await Promise.all([
      supabase.from("crm_deal_stages").select("*").order("order_index"),
      supabase.from("crm_deals").select("id, title, value, mrr, probability, stage_id, organization_id, contact_id, expected_close_date, created_at").order("created_at", { ascending: false }),
      supabase.from("crm_organizations").select("id, name").order("name"),
    ]);
    if (stagesRes.data) setStages(stagesRes.data as DealStage[]);
    if (orgsRes.data) setOrgs(orgsRes.data as OrgOption[]);
    if (dealsRes.data) {
      const orgMap = new Map((orgsRes.data || []).map((o: any) => [o.id, o.name]));
      setDeals((dealsRes.data as Deal[]).map(d => ({ ...d, org_name: orgMap.get(d.organization_id || "") || undefined })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.stage_id) return;
    const crmUserId = crmUser?.id;
    const { error } = await supabase.from("crm_deals").insert({
      title: form.title,
      value: Number(form.value) || 0,
      mrr: Number(form.mrr) || 0,
      stage_id: form.stage_id,
      organization_id: form.organization_id || null,
      expected_close_date: form.expected_close_date || null,
      owner_id: crmUserId || null,
    });
    if (error) { toast.error("Failed to create deal"); return; }
    toast.success("Deal created");
    setForm({ title: "", value: "", mrr: "", stage_id: "", organization_id: "", expected_close_date: "" });
    setDialogOpen(false);
    fetchData();
  };

  const moveDeal = async (dealId: string, newStageId: string) => {
    const stage = stages.find(s => s.id === newStageId);
    const { error } = await supabase.from("crm_deals").update({
      stage_id: newStageId,
      probability: stage?.probability || 0,
      actual_close_date: stage?.is_won || stage?.is_lost ? new Date().toISOString().split("T")[0] : null,
    }).eq("id", dealId);
    if (error) toast.error("Move failed");
    else fetchData();
  };

  const stageTotal = (stageId: string) =>
    deals.filter(d => d.stage_id === stageId).reduce((s, d) => s + Number(d.value), 0);

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {deals.length} deals · Pipeline value: ${deals.reduce((s, d) => s + Number(d.value), 0).toLocaleString()}
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Deal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Deal</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Value ($)</Label><Input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} /></div>
                <div><Label>MRR ($)</Label><Input type="number" value={form.mrr} onChange={e => setForm(f => ({ ...f, mrr: e.target.value }))} /></div>
              </div>
              <div>
                <Label>Stage *</Label>
                <Select value={form.stage_id} onValueChange={v => setForm(f => ({ ...f, stage_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
                  <SelectContent>
                    {stages.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Organization</Label>
                <Select value={form.organization_id} onValueChange={v => setForm(f => ({ ...f, organization_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select org" /></SelectTrigger>
                  <SelectContent>
                    {orgs.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Expected Close</Label><Input type="date" value={form.expected_close_date} onChange={e => setForm(f => ({ ...f, expected_close_date: e.target.value }))} /></div>
              <Button onClick={handleCreate} className="w-full">Create Deal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban Board */}
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 min-w-max">
          {stages.map(stage => {
            const stageDeals = deals.filter(d => d.stage_id === stage.id);
            return (
              <div key={stage.id} className="w-72 shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-sm font-semibold text-foreground">{stage.name}</span>
                    <Badge variant="secondary" className="text-[10px] h-5">{stageDeals.length}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">${stageTotal(stage.id).toLocaleString()}</span>
                </div>

                <div className="space-y-2 min-h-[100px] bg-muted/30 rounded-lg p-2">
                  {stageDeals.map(deal => (
                    <Card key={deal.id} className="border-border shadow-sm cursor-grab active:cursor-grabbing">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium text-foreground mb-1">{deal.title}</p>
                        {deal.org_name && <p className="text-xs text-muted-foreground mb-2">{deal.org_name}</p>}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            <DollarSign className="inline h-3 w-3" />{Number(deal.value).toLocaleString()}
                          </span>
                          {deal.expected_close_date && (
                            <span className="text-[10px] text-muted-foreground">{deal.expected_close_date}</span>
                          )}
                        </div>
                        {/* Quick stage move */}
                        <div className="mt-2">
                          <Select value={deal.stage_id} onValueChange={v => moveDeal(deal.id, v)}>
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {stages.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
