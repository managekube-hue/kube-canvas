import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve((_req) => {
  // Redirect to the main site while serving required OWASP headers
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "https://managekube.com",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co https://api.zoom.us; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self' https://*.zoom.us; object-src 'none'; base-uri 'self'; form-action 'self' https://zoom.us",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    },
  });
});
