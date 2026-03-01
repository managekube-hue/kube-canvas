import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function DealPipelineFunnel() {
  const [data, setData] = useState<{ stage: string; count: number; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [stagesRes, dealsRes] = await Promise.all([
        supabase.from("crm_deal_stages").select("*").order("order_index"),
        supabase.from("crm_deals").select("stage_id, value"),
      ]);

      const stageMap = new Map(stagesRes.data?.map(s => [s.id, s]) || []);
      const stageCounts: Record<string, { count: number; value: number }> = {};

      dealsRes.data?.forEach(d => {
        const stage = stageMap.get(d.stage_id);
        if (stage) {
          if (!stageCounts[stage.name]) stageCounts[stage.name] = { count: 0, value: 0 };
          stageCounts[stage.name].count++;
          stageCounts[stage.name].value += Number(d.value) || 0;
        }
      });

      const chartData = stagesRes.data?.map(s => ({
        stage: s.name,
        count: stageCounts[s.name]?.count || 0,
        value: stageCounts[s.name]?.value || 0,
        color: s.color,
      })) || [];

      setData(chartData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Card className="border-border"><CardContent className="p-6 h-64 flex items-center justify-center"><div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" /></CardContent></Card>;

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Deal Pipeline Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{item.stage}</span>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">{item.count} deals</span>
                  <span className="text-foreground font-semibold">${item.value.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-8 bg-muted rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all flex items-center justify-center text-white text-xs font-medium"
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                    backgroundColor: item.color,
                    minWidth: item.count > 0 ? "40px" : "0",
                  }}
                >
                  {item.count > 0 && item.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
