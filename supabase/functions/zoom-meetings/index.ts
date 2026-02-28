import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Refresh a user's Zoom token if expired
async function getValidToken(supabaseAdmin: any, userId: string): Promise<{ access_token: string; zoom_email: string | null }> {
  const { data: token, error } = await supabaseAdmin
    .from("reach_zoom_tokens")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !token) {
    throw new Error("ZOOM_NOT_CONNECTED");
  }

  // Check if token is still valid (with 5min buffer)
  const expiresAt = new Date(token.expires_at).getTime();
  const now = Date.now() + 5 * 60 * 1000;

  if (expiresAt > now) {
    return { access_token: token.access_token, zoom_email: token.zoom_email };
  }

  // Refresh the token
  const clientId = Deno.env.get("ZOOM_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOOM_CLIENT_SECRET");
  if (!clientId || !clientSecret) {
    throw new Error("Missing Zoom credentials");
  }

  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const resp = await fetch(
    `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${token.refresh_token}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!resp.ok) {
    const err = await resp.text();
    console.error("Zoom refresh failed:", err);
    // Delete stale token so user can re-auth
    await supabaseAdmin.from("reach_zoom_tokens").delete().eq("user_id", userId);
    throw new Error("ZOOM_TOKEN_EXPIRED");
  }

  const data = await resp.json();
  const newExpiry = new Date(Date.now() + data.expires_in * 1000).toISOString();

  await supabaseAdmin.from("reach_zoom_tokens").update({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: newExpiry,
  }).eq("user_id", userId);

  return { access_token: data.access_token, zoom_email: token.zoom_email };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, workspace_id, room_id, topic, duration } = await req.json();

    switch (action) {
      case "status": {
        // Check if the current user has Zoom connected
        const { data: token } = await supabaseAdmin
          .from("reach_zoom_tokens")
          .select("zoom_email, expires_at")
          .eq("user_id", user.id)
          .single();

        return new Response(JSON.stringify({
          connected: !!token,
          zoom_email: token?.zoom_email || null,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "create": {
        const { access_token } = await getValidToken(supabaseAdmin, user.id);

        const meetingResp = await fetch("https://api.zoom.us/v2/users/me/meetings", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic || "REACH Meeting",
            type: 2,
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

        const { data: room } = await supabase
          .from("reach_rooms")
          .select("zoom_meeting_id")
          .eq("id", room_id)
          .single();

        if (room?.zoom_meeting_id) {
          try {
            const { access_token } = await getValidToken(supabaseAdmin, user.id);
            await fetch(`https://api.zoom.us/v2/meetings/${room.zoom_meeting_id}/status`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ action: "end" }),
            });
          } catch {
            // Meeting may already be ended
          }
        }

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
    const status = msg === "ZOOM_NOT_CONNECTED" || msg === "ZOOM_TOKEN_EXPIRED" ? 403 : 500;
    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
