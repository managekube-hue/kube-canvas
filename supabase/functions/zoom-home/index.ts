import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ManageKube - IT Transformation. Methodically Delivered.</title>
  <meta name="description" content="ManageKube replaces IT complexity with a systematic methodology." />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .container { text-align: center; max-width: 600px; padding: 2rem; }
    img { width: 120px; margin-bottom: 1.5rem; }
    h1 { font-size: 1.8rem; margin-bottom: 0.75rem; }
    p { color: #aaa; margin-bottom: 1.5rem; line-height: 1.6; }
    a { display: inline-block; padding: 0.75rem 2rem; background: #993619; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }
    a:hover { background: #b8431e; }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://managekube.com/logo.png" alt="ManageKube" />
    <h1>ManageKube</h1>
    <p>IT Transformation. Methodically Delivered.</p>
    <a href="https://managekube.com">Visit ManageKube.com</a>
  </div>
</body>
</html>`;

serve((_req) => {
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co https://api.zoom.us; img-src 'self' data: https:; font-src 'self' data:; frame-src 'self' https://*.zoom.us; object-src 'none'; base-uri 'self'; form-action 'self' https://zoom.us",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "X-XSS-Protection": "1; mode=block",
      "Cache-Control": "no-store",
    },
  });
});
