import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Provider endpoint + header factories
const PROVIDERS: Record<string, {
  url: (model: string, key: string, stream: boolean) => string;
  headers: (key: string) => Record<string, string>;
  buildBody: (messages: any[], model: string, stream: boolean) => Record<string, unknown>;
  parseStream?: boolean; // if true, response is already SSE-compatible
}> = {
  openai: {
    url: () => "https://api.openai.com/v1/chat/completions",
    headers: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
    buildBody: (messages, model, stream) => ({ model: model || "gpt-4o", messages, stream }),
  },
  anthropic: {
    url: () => "https://api.anthropic.com/v1/messages",
    headers: (k) => ({ "x-api-key": k, "Content-Type": "application/json", "anthropic-version": "2023-06-01" }),
    buildBody: (messages, model, stream) => {
      const systemMsg = messages.find((m: any) => m.role === "system");
      const nonSystem = messages.filter((m: any) => m.role !== "system");
      return {
        model: model || "claude-sonnet-4-20250514",
        max_tokens: 8192,
        system: systemMsg?.content || "You are a helpful AI assistant.",
        messages: nonSystem,
        stream,
      };
    },
  },
  google: {
    url: (model, key, stream) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${model || "gemini-2.0-flash"}:${stream ? "streamGenerateContent" : "generateContent"}?key=${key}`,
    headers: () => ({ "Content-Type": "application/json" }),
    buildBody: (messages, _model, _stream) => {
      const systemContent = messages.find((m: any) => m.role === "system")?.content || "You are a helpful AI assistant.";
      return {
        contents: messages
          .filter((m: any) => m.role !== "system")
          .map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        systemInstruction: { parts: [{ text: systemContent }] },
      };
    },
  },
  mistral: {
    url: () => "https://api.mistral.ai/v1/chat/completions",
    headers: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
    buildBody: (messages, model, stream) => ({ model: model || "mistral-large-latest", messages, stream }),
  },
  groq: {
    url: () => "https://api.groq.com/openai/v1/chat/completions",
    headers: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
    buildBody: (messages, model, stream) => ({ model: model || "llama-3.3-70b-versatile", messages, stream }),
  },
  deepseek: {
    url: () => "https://api.deepseek.com/chat/completions",
    headers: (k) => ({ Authorization: `Bearer ${k}`, "Content-Type": "application/json" }),
    buildBody: (messages, model, stream) => ({ model: model || "deepseek-chat", messages, stream }),
  },
};

// Map well-known model prefixes to providers
function inferProvider(model: string): string | null {
  const m = model.toLowerCase();
  if (m.startsWith("gpt-") || m.startsWith("o1") || m.startsWith("o3") || m.startsWith("o4")) return "openai";
  if (m.startsWith("claude-")) return "anthropic";
  if (m.startsWith("gemini-")) return "google";
  if (m.startsWith("mistral-") || m.startsWith("codestral")) return "mistral";
  if (m.startsWith("llama-") || m.startsWith("mixtral")) return "groq";
  if (m.startsWith("deepseek")) return "deepseek";
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // --- Auth ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = user.id;

    // --- Parse request (OpenAI-compatible format) ---
    const body = await req.json();
    const { messages, model: requestedModel, stream = true } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Lookup user's BYOK config ---
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // If model given, infer provider. Otherwise use default config.
    let providerName: string | null = null;
    let apiKey: string | null = null;
    let modelName = requestedModel;

    if (requestedModel) {
      providerName = inferProvider(requestedModel);
    }

    if (providerName) {
      // Look up key for this specific provider
      const { data: config } = await adminClient
        .from("developer_ai_configs")
        .select("api_key_encrypted, model_preference")
        .eq("user_id", userId)
        .eq("provider", providerName)
        .maybeSingle();

      if (!config) {
        return new Response(
          JSON.stringify({ error: `No API key configured for provider "${providerName}". Add one in IDE Settings.` }),
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
        return new Response(
          JSON.stringify({ error: "No default AI provider configured. Add your API key in IDE Settings." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      providerName = config.provider;
      apiKey = config.api_key_encrypted;
      if (!modelName) modelName = config.model_preference;
    }

    const provider = PROVIDERS[providerName!];
    if (!provider) {
      return new Response(
        JSON.stringify({ error: `Unsupported provider: ${providerName}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Build & forward request ---
    const targetUrl = provider.url(modelName, apiKey!, stream);
    const targetHeaders = provider.headers(apiKey!);
    const targetBody = provider.buildBody(messages, modelName, stream);

    const upstream = await fetch(targetUrl, {
      method: "POST",
      headers: targetHeaders,
      body: JSON.stringify(targetBody),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error(`[litellm] ${providerName} error ${upstream.status}:`, errText);
      return new Response(
        JSON.stringify({ error: `${providerName} API error: ${upstream.status}`, detail: errText }),
        { status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Stream response back ---
    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": stream ? "text/event-stream" : "application/json",
      },
    });
  } catch (e) {
    console.error("[litellm] error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
