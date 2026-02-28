import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Simple DB read to keep project active
  const { count, error } = await supabase
    .from("cms_contacts")
    .select("id", { count: "exact", head: true });

  const timestamp = new Date().toISOString();

  console.log(`[keep-alive] ${timestamp} — contacts: ${count ?? "n/a"}, error: ${error?.message ?? "none"}`);

  return new Response(
    JSON.stringify({ status: "alive", timestamp, contacts: count }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
