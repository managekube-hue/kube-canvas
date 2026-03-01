import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Provider endpoint mapping
const PROVIDERS: Record<string, { url: string; header: (key: string) => Record<string, string> }> = {
  openai: {
    url: "https://api.openai.com/v1/chat/completions",
    header: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
  },
  anthropic: {
    url: "https://api.anthropic.com/v1/messages",
    header: (k) => ({ "x-api-key": k, "Content-Type": "application/json", "anthropic-version": "2023-06-01" }),
  },
  google: {
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    header: (k) => ({ "Content-Type": "application/json" }),
  },
  mistral: {
    url: "https://api.mistral.ai/v1/chat/completions",
    header: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
  },
  groq: {
    url: "https://api.groq.com/openai/v1/chat/completions",
    header: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
  },
  cohere: {
    url: "https://api.cohere.com/v2/chat",
    header: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
  },
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
    const { messages, provider: requestedProvider, model: requestedModel, stream = true } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch user's BYOK config
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let providerName = requestedProvider;
    let apiKey: string | null = null;
    let modelName = requestedModel;

    if (providerName) {
      // Use specific provider requested
      const { data: config } = await adminClient
        .from("developer_ai_configs")
        .select("api_key_encrypted, model_preference")
        .eq("user_id", userId)
        .eq("provider", providerName)
        .maybeSingle();

      if (!config) {
        return new Response(
          JSON.stringify({ error: `No API key configured for ${providerName}. Add one in Settings.` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      apiKey = config.api_key_encrypted;
      if (!modelName) modelName = config.model_preference;
    } else {
      // Use default provider
      const { data: config } = await adminClient
        .from("developer_ai_configs")
        .select("provider, api_key_encrypted, model_preference")
        .eq("user_id", userId)
        .eq("is_default", true)
        .maybeSingle();

      if (!config) {
        // Fallback to Lovable AI gateway
        const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
        if (!LOVABLE_API_KEY) {
          return new Response(
            JSON.stringify({ error: "No AI provider configured. Add your API key in Settings or use the default." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        // Use Lovable AI gateway as fallback
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: modelName || "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: "You are an AI coding assistant embedded in a developer IDE. Be concise, technical, and helpful. Format code with markdown." },
              ...messages,
            ],
            stream,
          }),
        });

        if (!response.ok) {
          const status = response.status;
          if (status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }), {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          if (status === 402) {
            return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up." }), {
              status: 402,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          const t = await response.text();
          console.error("Lovable AI error:", status, t);
          return new Response(JSON.stringify({ error: "AI gateway error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(response.body, {
          headers: {
            ...corsHeaders,
            "Content-Type": stream ? "text/event-stream" : "application/json",
          },
        });
      }

      providerName = config.provider;
      apiKey = config.api_key_encrypted;
      if (!modelName) modelName = config.model_preference;
    }

    // Route to the user's chosen provider
    const provider = PROVIDERS[providerName!];
    if (!provider) {
      return new Response(
        JSON.stringify({ error: `Unsupported provider: ${providerName}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build provider-specific request
    let url = provider.url;
    const headers = provider.header(apiKey!);

    let body: Record<string, unknown>;

    if (providerName === "anthropic") {
      const systemMsg = messages.find((m: any) => m.role === "system");
      const nonSystem = messages.filter((m: any) => m.role !== "system");
      body = {
        model: modelName || "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemMsg?.content || "You are an AI coding assistant. Be concise and technical.",
        messages: nonSystem,
        stream,
      };
    } else if (providerName === "google") {
      url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName || "gemini-2.0-flash"}:${stream ? "streamGenerateContent" : "generateContent"}?key=${apiKey}`;
      body = {
        contents: messages
          .filter((m: any) => m.role !== "system")
          .map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        systemInstruction: {
          parts: [{ text: messages.find((m: any) => m.role === "system")?.content || "You are an AI coding assistant." }],
        },
      };
    } else {
      // OpenAI-compatible (openai, mistral, groq)
      body = {
        model: modelName || (providerName === "openai" ? "gpt-4o" : providerName === "mistral" ? "mistral-large-latest" : "llama-3.3-70b-versatile"),
        messages: [
          { role: "system", content: "You are an AI coding assistant embedded in a developer IDE. Be concise and technical." },
          ...messages,
        ],
        stream,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`${providerName} error:`, response.status, errText);
      return new Response(
        JSON.stringify({ error: `${providerName} API error: ${response.status}` }),
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
