import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmUser } from "@/hooks/useCrmUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Square, Clock } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ActiveTimer {
  id: string;
  ticket_id: string;
  start_time: string;
  ticket_number?: string;
}

export function TimerWidget() {
  const { crmUser } = useCrmUser();
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState("");

  useEffect(() => {
    if (!crmUser) return;
    loadActiveTimer();
    loadOpenTickets();
  }, [crmUser]);

  useEffect(() => {
    if (!activeTimer) return;
    const interval = setInterval(() => {
      const start = new Date(activeTimer.start_time).getTime();
      const now = Date.now();
      setElapsed(Math.floor((now - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTimer]);

  async function loadActiveTimer() {
    const { data } = await supabase
      .from("crm_time_entries")
      .select("id, ticket_id, start_time")
      .eq("user_id", crmUser?.id)
      .is("end_time", null)
      .single();
    
    if (data) {
      const { data: ticket } = await supabase
        .from("crm_tickets")
        .select("ticket_number")
        .eq("id", data.ticket_id)
        .single();
      setActiveTimer({ ...data, ticket_number: ticket?.ticket_number });
    }
  }

  async function loadOpenTickets() {
    const { data } = await supabase
      .from("crm_tickets")
      .select("id, ticket_number, subject")
      .in("status", ["open", "in_progress"])
      .limit(20);
    if (data) setTickets(data);
  }

  async function startTimer() {
    if (!selectedTicket || !crmUser) return;
    
    const { data, error } = await supabase
      .from("crm_time_entries")
      .insert({
        ticket_id: selectedTicket,
        user_id: crmUser.id,
        start_time: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to start timer");
      return;
    }

    const ticket = tickets.find(t => t.id === selectedTicket);
    setActiveTimer({ ...data, ticket_number: ticket?.ticket_number });
    toast.success("Timer started");
  }

  async function stopTimer() {
    if (!activeTimer) return;

    const endTime = new Date().toISOString();
    const durationMinutes = Math.floor(elapsed / 60);

    const { error } = await supabase
      .from("crm_time_entries")
      .update({
        end_time: endTime,
        duration_minutes: durationMinutes,
      })
      .eq("id", activeTimer.id);

    if (error) {
      toast.error("Failed to stop timer");
      return;
    }

    setActiveTimer(null);
    setElapsed(0);
    toast.success(`Logged ${durationMinutes} minutes`);
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="border-border fixed bottom-4 right-4 w-80 shadow-lg z-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Time Tracker</span>
        </div>

        {activeTimer ? (
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-3xl font-mono font-bold text-foreground">{formatTime(elapsed)}</p>
              <p className="text-xs text-muted-foreground mt-1">{activeTimer.ticket_number}</p>
            </div>
            <Button onClick={stopTimer} variant="destructive" className="w-full">
              <Square className="h-4 w-4 mr-1" /> Stop Timer
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Select value={selectedTicket} onValueChange={setSelectedTicket}>
              <SelectTrigger>
                <SelectValue placeholder="Select ticket" />
              </SelectTrigger>
              <SelectContent>
                {tickets.map(t => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.ticket_number}: {t.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={startTimer} disabled={!selectedTicket} className="w-full">
              <Play className="h-4 w-4 mr-1" /> Start Timer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
