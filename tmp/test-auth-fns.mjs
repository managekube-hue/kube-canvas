/**
 * Authenticated edge function test
 * Usage: node tmp/test-auth-fns.mjs <password>
 */
const SUPABASE_URL = 'https://psxskwerldhfjmanzbpk.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzeHNrd2VybGRoZmptYW56YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDU3NDQsImV4cCI6MjA4NzAyMTc0NH0.gweEX9iktbtIW_En991lHbHhMrf51_V6zqmUB3C7TYI';
const EMAIL = 'managekube@gmail.com';
const PASSWORD = process.argv[2];

if (!PASSWORD) {
  console.error('Usage: node tmp/test-auth-fns.mjs <your-app-password>');
  process.exit(1);
}

async function signIn() {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': ANON_KEY },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  return res.json();
}

async function callFn(name, token, opts = {}) {
  const { method = 'POST', body, params = '' } = opts;
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}${params}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'apikey': ANON_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 200) }; }
  return { status: res.status, json };
}

async function main() {
  console.log('\n═══════════════════════════════════════════════');
  console.log('  AUTHENTICATED EDGE FUNCTION TESTS');
  console.log('═══════════════════════════════════════════════\n');

  // Sign in
  console.log('── Signing in as', EMAIL, '───────────────────');
  const session = await signIn();
  if (!session.access_token) {
    console.error('  ✗ Sign-in failed:', session.error_description || JSON.stringify(session));
    process.exit(1);
  }
  const token = session.access_token;
  console.log('  ✓ Signed in | user_id:', session.user?.id?.slice(0,8) + '...');

  // ── github-proxy ───────────────────────────────────────────────────────────
  console.log('\n── github-proxy ──────────────────────────────');
  const ghUser = await callFn('github-proxy', token, { method: 'GET', params: '?action=user' });
  if (ghUser.json?.login) {
    console.log('  ✓ GITHUB_TOKEN set | GitHub user:', ghUser.json.login);
  } else if (ghUser.json?.error?.includes('GITHUB_TOKEN')) {
    console.log('  ✗ GITHUB_TOKEN NOT SET');
  } else {
    console.log('  HTTP:', ghUser.status, '|', JSON.stringify(ghUser.json).slice(0, 120));
  }

  // Test repo tree
  const ghTree = await callFn('github-proxy', token, {
    method: 'GET',
    params: '?action=tree&owner=managekube-hue&repo=kube-canvas&sha=main'
  });
  if (ghTree.json?.tree?.length) {
    console.log('  ✓ Tree fetch works |', ghTree.json.tree.length, 'files');
  } else {
    console.log('  Tree result:', JSON.stringify(ghTree.json).slice(0, 100));
  }

  // ── ai-chat ────────────────────────────────────────────────────────────────
  console.log('\n── ai-chat (OpenRouter) ──────────────────────');
  const ai = await callFn('ai-chat', token, {
    body: { messages: [{ role: 'user', content: 'Reply with just: PONG' }], stream: false }
  });
  if (ai.status === 200) {
    const content = ai.json?.choices?.[0]?.message?.content;
    console.log('  ✓ OPENROUTER_API_KEY set | response:', content || JSON.stringify(ai.json).slice(0,100));
  } else if (ai.json?.error?.includes('OPENROUTER_API_KEY')) {
    console.log('  ✗ OPENROUTER_API_KEY NOT SET');
  } else {
    console.log('  HTTP:', ai.status, '|', JSON.stringify(ai.json).slice(0, 150));
  }

  // ── cometchat-auth ─────────────────────────────────────────────────────────
  console.log('\n── cometchat-auth ────────────────────────────');
  const cc = await callFn('cometchat-auth', token, { body: { action: 'sync_user' } });
  if (cc.json?.authToken) {
    console.log('  ✓ CometChat secrets set | authToken received');
  } else if (cc.json?.error?.includes('COMETCHAT') || cc.status === 500) {
    console.log('  ✗ CometChat secrets NOT SET |', cc.json?.error);
  } else {
    console.log('  HTTP:', cc.status, '|', JSON.stringify(cc.json).slice(0, 150));
  }

  // ── zoom ───────────────────────────────────────────────────────────────────
  console.log('\n── zoom-meetings ─────────────────────────────');
  const zoom = await callFn('zoom-meetings', token, { body: { action: 'list' } });
  console.log('  HTTP:', zoom.status, '|', JSON.stringify(zoom.json).slice(0, 100));

  console.log('\n═══════════════════════════════════════════════');
  console.log('  DONE');
  console.log('═══════════════════════════════════════════════\n');
}

main().catch(console.error);
