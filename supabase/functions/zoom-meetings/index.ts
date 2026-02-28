import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Zoom S2S OAuth token
async function getZoomToken(): Promise<string> {
  const clientId = Deno.env.get("ZOOM_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOOM_CLIENT_SECRET");
  const accountId = Deno.env.get("ZOOM_ACCOUNT_ID");

  if (!clientId || !clientSecret || !accountId) {
    throw new Error("Missing Zoom credentials (ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_ACCOUNT_ID)");
  }

  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;

  const resp = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Zoom OAuth failed [${resp.status}]: ${err}`);
  }

  const data = await resp.json();
  return data.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, workspace_id, room_id, topic, duration } = await req.json();

    switch (action) {
      case "create": {
        // Create Zoom meeting
        const token = await getZoomToken();
        const meetingResp = await fetch("https://api.zoom.us/v2/users/me/meetings", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic || "REACH Meeting",
            type: 2, // scheduled
            duration: duration || 60,
            settings: {
              join_before_host: true,
              waiting_room: false,
              mute_upon_entry: true,
              auto_recording: "none",
            },
          }),
        });

        if (!meetingResp.ok) {
          const err = await meetingResp.text();
          throw new Error(`Zoom create meeting failed [${meetingResp.status}]: ${err}`);
        }

        const meeting = await meetingResp.json();

        // Save to reach_rooms
        const { data: room, error: roomErr } = await supabase
          .from("reach_rooms")
          .insert({
            workspace_id,
            name: topic || "REACH Meeting",
            zoom_meeting_id: String(meeting.id),
            zoom_join_url: meeting.join_url,
            zoom_password: meeting.password || null,
            is_active: true,
            started_by: user.id,
            started_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (roomErr) throw roomErr;

        return new Response(JSON.stringify({ room, zoom: { join_url: meeting.join_url, id: meeting.id } }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "end": {
        if (!room_id) throw new Error("room_id required");

        // Get room to find zoom meeting id
        const { data: room } = await supabase
          .from("reach_rooms")
          .select("zoom_meeting_id")
          .eq("id", room_id)
          .single();

        if (room?.zoom_meeting_id) {
          try {
            const token = await getZoomToken();
            await fetch(`https://api.zoom.us/v2/meetings/${room.zoom_meeting_id}/status`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ action: "end" }),
            });
          } catch {
            // Meeting may already be ended
          }
        }

        // Mark room inactive
        await supabase
          .from("reach_rooms")
          .update({ is_active: false, ended_at: new Date().toISOString() })
          .eq("id", room_id);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "list": {
        const { data: rooms } = await supabase
          .from("reach_rooms")
          .select("*")
          .eq("workspace_id", workspace_id)
          .order("created_at", { ascending: false })
          .limit(20);

        return new Response(JSON.stringify({ rooms: rooms || [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error: unknown) {
    console.error("zoom-meetings error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
