import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function TicketVolumeChart() {
  const [data, setData] = useState<{ status: string; count: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: tickets } = await supabase.from("crm_tickets").select("status");
      
      const statusCounts: Record<string, number> = {};
      tickets?.forEach(t => {
        statusCounts[t.status] = (statusCounts[t.status] || 0) + 1;
      });

      const statusColors: Record<string, string> = {
        open: "#ef4444",
        in_progress: "#f59e0b",
        escalated: "#dc2626",
        resolved: "#22c55e",
        closed: "#6b7280",
      };

      const chartData = Object.entries(statusCounts).map(([status, count]) => ({
        status: status.replace("_", " ").toUpperCase(),
        count,
        color: statusColors[status] || "#6b7280",
      }));

      setData(chartData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Card className="border-border"><CardContent className="p-6 h-64 flex items-center justify-center"><div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" /></CardContent></Card>;

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="h-4 w-4" /> Ticket Volume by Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{item.status}</span>
                <span className="text-muted-foreground">{item.count} tickets</span>
              </div>
              <div className="h-6 bg-muted rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all"
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
