import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function RevenueTrendsChart() {
  const [data, setData] = useState<{ month: string; mrr: number; invoices: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const [contractsRes, invoicesRes] = await Promise.all([
        supabase.from("crm_contracts").select("mrr, created_at").eq("status", "active"),
        supabase.from("crm_invoices").select("total, issue_date").gte("issue_date", sixMonthsAgo.toISOString().split("T")[0]),
      ]);

      const monthlyData: Record<string, { mrr: number; invoices: number }> = {};
      
      // Aggregate MRR
      contractsRes.data?.forEach(c => {
        const month = new Date(c.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" });
        if (!monthlyData[month]) monthlyData[month] = { mrr: 0, invoices: 0 };
        monthlyData[month].mrr += Number(c.mrr) || 0;
      });

      // Aggregate invoices
      invoicesRes.data?.forEach(i => {
        const month = new Date(i.issue_date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
        if (!monthlyData[month]) monthlyData[month] = { mrr: 0, invoices: 0 };
        monthlyData[month].invoices += Number(i.total) || 0;
      });

      const chartData = Object.entries(monthlyData).map(([month, values]) => ({
        month,
        ...values,
      })).slice(-6);

      setData(chartData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Card className="border-border"><CardContent className="p-6 h-64 flex items-center justify-center"><div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" /></CardContent></Card>;

  const maxValue = Math.max(...data.map(d => Math.max(d.mrr, d.invoices)));

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Revenue Trends (Last 6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.month}</span>
                <div className="flex gap-4">
                  <span className="text-blue-600">MRR: ${item.mrr.toLocaleString()}</span>
                  <span className="text-green-600">Invoiced: ${item.invoices.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-1 h-6">
                <div className="bg-blue-500 rounded" style={{ width: `${(item.mrr / maxValue) * 100}%` }} />
                <div className="bg-green-500 rounded" style={{ width: `${(item.invoices / maxValue) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
