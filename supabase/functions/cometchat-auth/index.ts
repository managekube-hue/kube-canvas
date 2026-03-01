import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const COMETCHAT_APP_ID = Deno.env.get("COMETCHAT_APP_ID")!;
const COMETCHAT_AUTH_KEY = Deno.env.get("COMETCHAT_AUTH_KEY")!;
const COMETCHAT_REGION = Deno.env.get("COMETCHAT_REGION") || "us";

const ccBase = `https://${COMETCHAT_APP_ID}.api-${COMETCHAT_REGION}.cometchat.io/v3`;

async function ccFetch(path: string, method = "GET", body?: Record<string, unknown>) {
  const res = await fetch(`${ccBase}${path}`, {
    method,
    headers: {
      apikey: COMETCHAT_AUTH_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;
    const email = (claimsData.claims as any).email as string;
    const { action, ...params } = await req.json();

    switch (action) {
      // Sync user to CometChat on first login
      case "sync_user": {
        const name = params.name || email.split("@")[0];
        // Try to get existing user first
        const existing = await ccFetch(`/users/${userId}`);
        if (existing.data) {
          // User exists, generate auth token
          const tokenRes = await ccFetch(`/users/${userId}/auth_tokens`, "POST");
          return new Response(
            JSON.stringify({ authToken: tokenRes.data?.authToken, uid: userId }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        // Create user
        await ccFetch("/users", "POST", { uid: userId, name, metadata: { email } });
        const tokenRes = await ccFetch(`/users/${userId}/auth_tokens`, "POST");
        return new Response(
          JSON.stringify({ authToken: tokenRes.data?.authToken, uid: userId }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Create a group channel mapped to workspace
      case "create_group": {
        const { workspace_id, group_name, group_type = "public" } = params;
        const guid = `ws-${workspace_id}-${group_name}`.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 100);
        const res = await ccFetch("/groups", "POST", {
          guid,
          name: group_name,
          type: group_type,
        });
        // Save mapping to Supabase
        const adminClient = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await adminClient.from("reach_cometchat_channels").upsert({
          workspace_id,
          cometchat_guid: guid,
          channel_name: group_name,
          channel_type: "group",
        }, { onConflict: "cometchat_guid" });

        return new Response(JSON.stringify({ guid, group: res.data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get auth token for existing user
      case "get_token": {
        const tokenRes = await ccFetch(`/users/${userId}/auth_tokens`, "POST");
        return new Response(
          JSON.stringify({ authToken: tokenRes.data?.authToken, uid: userId }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // List channels for a workspace
      case "list_channels": {
        const { workspace_id } = params;
        const adminClient = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        const { data: channels } = await adminClient
          .from("reach_cometchat_channels")
          .select("*")
          .eq("workspace_id", workspace_id);
        return new Response(JSON.stringify({ channels: channels || [] }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Initiate a call session
      case "initiate_call": {
        const { session_id, receiver_uid, call_type = "video" } = params;
        const callRes = await ccFetch("/calls", "POST", {
          receiverUid: receiver_uid,
          callType: call_type,
          receiverType: "user",
          sessionId: session_id || `call-${Date.now()}`,
        });
        return new Response(JSON.stringify({ call: callRes.data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (e) {
    console.error("cometchat-auth error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
