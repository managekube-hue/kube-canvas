import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * HubSpot Retry Sync — retries failed/unsynced assessment sessions.
 * Called on a cron schedule (every 15 minutes).
 * Finds completed sessions without hubspot_synced_at and calls assessment-hubspot-sync.
 */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find completed/escalated sessions not yet synced to HubSpot
    const { data: unsyncedSessions, error } = await supabase
      .from("assessment_sessions")
      .select("id")
      .in("status", ["completed", "escalated"])
      .is("hubspot_synced_at", null)
      .not("email", "is", null)
      .order("completed_at", { ascending: true })
      .limit(20);

    if (error) {
      console.error("Query error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!unsyncedSessions || unsyncedSessions.length === 0) {
      return new Response(
        JSON.stringify({ success: true, synced: 0, message: "No unsynced sessions" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let syncedCount = 0;
    let failedCount = 0;

    for (const session of unsyncedSessions) {
      try {
        const res = await fetch(`${supabaseUrl}/functions/v1/assessment-hubspot-sync`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: session.id }),
        });

        if (res.ok) {
          syncedCount++;
        } else {
          failedCount++;
          const errBody = await res.text();
          console.error(`Sync failed for ${session.id}: ${errBody}`);
        }
      } catch (err) {
        failedCount++;
        console.error(`Sync error for ${session.id}:`, err);
      }
    }

    console.log(`HubSpot retry: ${syncedCount} synced, ${failedCount} failed out of ${unsyncedSessions.length}`);

    return new Response(
      JSON.stringify({ success: true, synced: syncedCount, failed: failedCount, total: unsyncedSessions.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("HubSpot retry error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
