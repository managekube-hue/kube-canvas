import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { toast } from "sonner";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

interface Lead {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  lifecycle_stage: string;
  lead_score: number;
  last_contacted_at: string | null;
}

export default function LeadNurturing() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  useRealtimeSync("crm_contacts", fetchLeads);

  async function fetchLeads() {
    const { data } = await supabase
      .from("crm_contacts")
      .select("*")
      .in("lifecycle_stage", ["lead", "mql", "sql"])
      .order("lead_score", { ascending: false });
    if (data) setLeads(data as Lead[]);
    setLoading(false);
  }

  async function progressLead(id: string, currentStage: string) {
    const progression: Record<string, string> = {
      lead: "mql",
      mql: "sql",
      sql: "opportunity",
    };
    
    const newStage = progression[currentStage];
    if (!newStage) return;

    const { error } = await supabase
      .from("crm_contacts")
      .update({ lifecycle_stage: newStage })
      .eq("id", id);

    if (error) toast.error("Update failed");
    else {
      toast.success(`Moved to ${newStage.toUpperCase()}`);
      fetchLeads();
    }
  }

  async function autoScoreLeads() {
    const updates = leads.map(async (lead) => {
      let score = lead.lead_score;
      
      // Scoring rules
      if (lead.email) score += 10;
      if (lead.last_contacted_at) {
        const daysSince = Math.floor((Date.now() - new Date(lead.last_contacted_at).getTime()) / (1000 * 60 * 60 * 24));
        if (daysSince < 7) score += 20;
        else if (daysSince < 30) score += 10;
      }

      if (score !== lead.lead_score) {
        await supabase
          .from("crm_contacts")
          .update({ lead_score: Math.min(score, 100) })
          .eq("id", lead.id);
      }
    });

    await Promise.all(updates);
    toast.success("Lead scores updated");
    fetchLeads();
  }

  const byStage = {
    lead: leads.filter(l => l.lifecycle_stage === "lead"),
    mql: leads.filter(l => l.lifecycle_stage === "mql"),
    sql: leads.filter(l => l.lifecycle_stage === "sql"),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Lead Nurturing</h2>
          <p className="text-sm text-muted-foreground">Manage lead progression and scoring</p>
        </div>
        <Button onClick={autoScoreLeads}>
          <TrendingUp className="h-4 w-4 mr-1" /> Auto-Score Leads
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{byStage.lead.length}</p>
            <p className="text-xs text-muted-foreground">Leads</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-600">{byStage.mql.length}</p>
            <p className="text-xs text-muted-foreground">MQLs</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600">{byStage.sql.length}</p>
            <p className="text-xs text-muted-foreground">SQLs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(byStage).map(([stage, stageLeads]) => (
          <div key={stage} className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground uppercase">{stage}</h3>
            {stageLeads.slice(0, 10).map(lead => (
              <Card key={lead.id} className="border-border">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">
                      {lead.first_name} {lead.last_name}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {lead.lead_score}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{lead.email}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => progressLead(lead.id, stage)}
                  >
                    <ArrowRight className="h-3 w-3 mr-1" /> Progress
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
