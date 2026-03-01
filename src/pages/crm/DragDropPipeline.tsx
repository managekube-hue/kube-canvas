import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface DealStage {
  id: string;
  name: string;
  order_index: number;
  color: string;
  probability: number;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage_id: string;
  organization_id: string | null;
  org_name?: string;
}

export default function DragDropPipeline() {
  const [stages, setStages] = useState<DealStage[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [stagesRes, dealsRes, orgsRes] = await Promise.all([
      supabase.from("crm_deal_stages").select("*").order("order_index"),
      supabase.from("crm_deals").select("*"),
      supabase.from("crm_organizations").select("id, name"),
    ]);

    if (stagesRes.data) setStages(stagesRes.data as DealStage[]);
    if (dealsRes.data && orgsRes.data) {
      const orgMap = new Map(orgsRes.data.map((o: any) => [o.id, o.name]));
      setDeals(dealsRes.data.map((d: any) => ({ ...d, org_name: orgMap.get(d.organization_id) })) as Deal[]);
    }
  }

  async function handleDrop(stageId: string) {
    if (!draggedDeal) return;
    
    const stage = stages.find(s => s.id === stageId);
    const { error } = await supabase
      .from("crm_deals")
      .update({ stage_id: stageId, probability: stage?.probability || 0 })
      .eq("id", draggedDeal);

    if (error) toast.error("Move failed");
    else {
      toast.success("Deal moved");
      fetchData();
    }
    setDraggedDeal(null);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map(stage => {
        const stageDeals = deals.filter(d => d.stage_id === stage.id);
        const stageTotal = stageDeals.reduce((s, d) => s + Number(d.value), 0);

        return (
          <div
            key={stage.id}
            className="w-72 shrink-0"
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(stage.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                <span className="text-sm font-semibold text-foreground">{stage.name}</span>
                <Badge variant="secondary" className="text-[10px] h-5">{stageDeals.length}</Badge>
              </div>
              <span className="text-xs text-muted-foreground">${stageTotal.toLocaleString()}</span>
            </div>

            <div className="space-y-2 min-h-[200px] bg-muted/30 rounded-lg p-2">
              {stageDeals.map(deal => (
                <Card
                  key={deal.id}
                  draggable
                  onDragStart={() => setDraggedDeal(deal.id)}
                  onDragEnd={() => setDraggedDeal(null)}
                  className={`border-border cursor-grab active:cursor-grabbing ${
                    draggedDeal === deal.id ? "opacity-50" : ""
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">{deal.title}</p>
                        {deal.org_name && <p className="text-xs text-muted-foreground mb-2">{deal.org_name}</p>}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            <DollarSign className="inline h-3 w-3" />{Number(deal.value).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
