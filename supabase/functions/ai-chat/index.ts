import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    // Validate user token
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, model, stream = true } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LITELLM_BASE_URL = Deno.env.get("LITELLM_BASE_URL");
    const LITELLM_API_KEY = Deno.env.get("LITELLM_API_KEY");

    if (!LITELLM_BASE_URL || !LITELLM_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LiteLLM not configured. Set LITELLM_BASE_URL and LITELLM_API_KEY." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user has a BYOK config override
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: userConfig } = await adminClient
      .from("developer_ai_configs")
      .select("provider, model_preference")
      .eq("user_id", user.id)
      .eq("is_default", true)
      .maybeSingle();

    const selectedModel = model || userConfig?.model_preference || "gpt-4o";

    // Route everything through LiteLLM
    const litellmUrl = `${LITELLM_BASE_URL.replace(/\/$/, "")}/chat/completions`;

    const response = await fetch(litellmUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LITELLM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: "You are an AI coding assistant embedded in a developer IDE. Be concise, technical, and helpful. Format code with markdown." },
          ...messages,
        ],
        stream,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("LiteLLM error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: `AI provider error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": stream ? "text/event-stream" : "application/json",
      },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
