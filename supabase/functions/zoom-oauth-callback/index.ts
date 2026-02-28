import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get("ZOOM_CLIENT_ID");
    const clientSecret = Deno.env.get("ZOOM_CLIENT_SECRET");
    if (!clientId || !clientSecret) {
      throw new Error("Missing ZOOM_CLIENT_ID or ZOOM_CLIENT_SECRET");
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // Action: generate the OAuth authorize URL for the frontend to redirect to
    if (action === "authorize_url") {
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

      // The redirect_uri points back to this edge function with action=callback
      const redirectUri = `${supabaseUrl}/functions/v1/zoom-oauth-callback?action=callback`;

      // State contains user_id so we can link the token after callback
      const state = btoa(JSON.stringify({ user_id: user.id }));

      const authorizeUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;

      return new Response(JSON.stringify({ authorize_url: authorizeUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Action: handle the OAuth callback from Zoom
    if (action === "callback") {
      const code = url.searchParams.get("code");
      const stateParam = url.searchParams.get("state");

      if (!code || !stateParam) {
        return new Response("Missing code or state", { status: 400 });
      }

      let userId: string;
      try {
        const parsed = JSON.parse(atob(stateParam));
        userId = parsed.user_id;
      } catch {
        return new Response("Invalid state parameter", { status: 400 });
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, serviceRoleKey);

      const redirectUri = `${supabaseUrl}/functions/v1/zoom-oauth-callback?action=callback`;

      // Exchange authorization code for tokens
      const basicAuth = btoa(`${clientId}:${clientSecret}`);
      const tokenResp = await fetch(
        `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (!tokenResp.ok) {
        const err = await tokenResp.text();
        console.error("Zoom token exchange failed:", err);
        return new Response(`Zoom authorization failed: ${err}`, { status: 500 });
      }

      const tokenData = await tokenResp.json();

      // Get Zoom user info
      let zoomEmail = null;
      let zoomUserId = null;
      try {
        const userResp = await fetch("https://api.zoom.us/v2/users/me", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        if (userResp.ok) {
          const zoomUser = await userResp.json();
          zoomEmail = zoomUser.email;
          zoomUserId = zoomUser.id;
        }
      } catch {
        // Non-critical
      }

      const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

      // Upsert the token
      const { error: upsertErr } = await supabase
        .from("reach_zoom_tokens")
        .upsert(
          {
            user_id: userId,
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            expires_at: expiresAt,
            zoom_email: zoomEmail,
            zoom_user_id: zoomUserId,
          },
          { onConflict: "user_id" }
        );

      if (upsertErr) {
        console.error("Token upsert error:", upsertErr);
        return new Response("Failed to save Zoom tokens", { status: 500 });
      }

      // Redirect user back to the IDE
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/uidr/ide?zoom=connected",
          ...corsHeaders,
        },
      });
    }

    // Action: disconnect / revoke
    if (action === "disconnect") {
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

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await supabase.from("reach_zoom_tokens").delete().eq("user_id", user.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("zoom-oauth-callback error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
