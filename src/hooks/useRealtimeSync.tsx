import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useRealtimeSync(table: string, onUpdate: () => void) {
  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        (payload) => {
          console.log(`${table} changed:`, payload);
          onUpdate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, onUpdate]);
}

export function useRealtimeRecord(table: string, id: string, onUpdate: (record: any) => void) {
  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel(`${table}-${id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: table,
          filter: `id=eq.${id}`,
        },
        (payload) => {
          onUpdate(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, id, onUpdate]);
}
