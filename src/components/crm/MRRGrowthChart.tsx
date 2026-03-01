import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export function MRRGrowthChart() {
  const [data, setData] = useState<{ month: string; mrr: number }[]>([]);
  const [growth, setGrowth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: contracts } = await supabase
        .from("crm_contracts")
        .select("mrr, start_date")
        .eq("status", "active")
        .order("start_date");

      const monthlyMRR: Record<string, number> = {};
      
      contracts?.forEach(c => {
        const month = new Date(c.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
        monthlyMRR[month] = (monthlyMRR[month] || 0) + (Number(c.mrr) || 0);
      });

      const chartData = Object.entries(monthlyMRR).map(([month, mrr]) => ({
        month,
        mrr,
      })).slice(-6);

      if (chartData.length >= 2) {
        const current = chartData[chartData.length - 1].mrr;
        const previous = chartData[chartData.length - 2].mrr;
        setGrowth(previous > 0 ? ((current - previous) / previous) * 100 : 0);
      }

      setData(chartData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Card className="border-border"><CardContent className="p-6 h-64 flex items-center justify-center"><div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" /></CardContent></Card>;

  const maxMRR = Math.max(...data.map(d => d.mrr), 1);
  const currentMRR = data[data.length - 1]?.mrr || 0;

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> MRR Growth
          </span>
          <div className="flex items-center gap-1 text-sm">
            {growth >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className={growth >= 0 ? "text-green-600" : "text-red-600"}>
              {growth.toFixed(1)}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold text-foreground">${currentMRR.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Current Monthly Recurring Revenue</p>
        </div>
        <div className="space-y-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-20">{item.month}</span>
              <div className="flex-1 h-6 bg-muted rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded transition-all"
                  style={{ width: `${(item.mrr / maxMRR) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground w-24 text-right">
                ${item.mrr.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
