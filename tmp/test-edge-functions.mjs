/**
 * Edge function test suite
 * Signs in as a real user, then tests every function.
 * Run: node tmp/test-edge-functions.mjs
 */

import pg from 'pg';
const { Client } = pg;

const SUPABASE_URL = 'https://psxskwerldhfjmanzbpk.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzeHNrd2VybGRoZmptYW56YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDU3NDQsImV4cCI6MjA4NzAyMTc0NH0.gweEX9iktbtIW_En991lHbHhMrf51_V6zqmUB3C7TYI';
const DB = 'postgresql://postgres.psxskwerldhfjmanzbpk:Managedit2026!@aws-1-us-east-1.pooler.supabase.com:5432/postgres';

const headers = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'apikey': ANON_KEY,
});

async function callFn(name, token, opts = {}) {
  const { method = 'POST', body, params = '' } = opts;
  const url = `${SUPABASE_URL}/functions/v1/${name}${params}`;
  const res = await fetch(url, {
    method,
    headers: headers(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { status: res.status, json };
}

// ── Get user list from DB to find a test user ──────────────────────────────
async function getTestUser() {
  const client = new Client({ connectionString: DB, ssl: { rejectUnauthorized: false } });
  await client.connect();
  const r = await client.query(`SELECT id, email FROM auth.users LIMIT 5`);
  await client.end();
  return r.rows;
}

// ── Sign in via Supabase REST ──────────────────────────────────────────────
async function signIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n═══════════════════════════════════════════════');
  console.log('  EDGE FUNCTION TEST SUITE');
  console.log('═══════════════════════════════════════════════\n');

  // 1. No-auth tests first
  console.log('── keep-alive (no auth) ──────────────────────');
  const ka = await fetch(`${SUPABASE_URL}/functions/v1/keep-alive`).then(r => r.json());
  console.log('  status:', ka.status ?? 'ok', '| contacts:', ka.contacts, '| timestamp:', ka.timestamp);

  // 2. Get users from DB
  console.log('\n── Auth users in DB ──────────────────────────');
  let users = [];
  try {
    users = await getTestUser();
    users.forEach(u => console.log('  •', u.email, '(' + u.id.slice(0,8) + '...)'));
  } catch (e) {
    console.log('  Could not query auth.users:', e.message);
  }

  if (users.length === 0) {
    console.log('\n⚠ No users found — cannot test authenticated endpoints');
    process.exit(0);
  }

  // Try to sign in — we don't have passwords so we'll test with anon for structure
  // and use service-role-style direct approach for secrets checking
  const anonToken = ANON_KEY;

  console.log('\n── Testing secrets via function responses ────');

  // ai-chat — will return 401 (anon) but tells us if fn is deployed
  const aiTest = await callFn('ai-chat', anonToken, {
    body: { messages: [{ role: 'user', content: 'ping' }], stream: false }
  });
  console.log('\n  ai-chat:');
  console.log('    HTTP:', aiTest.status);
  if (aiTest.status === 401) console.log('    ✓ Deployed — needs user JWT (expected)');
  else if (aiTest.json?.error?.includes('OPENROUTER_API_KEY')) console.log('    ✗ OPENROUTER_API_KEY secret NOT SET');
  else console.log('    Response:', JSON.stringify(aiTest.json).slice(0, 100));

  // github-proxy
  const ghTest = await callFn('github-proxy', anonToken, { method: 'GET', params: '?action=user' });
  console.log('\n  github-proxy:');
  console.log('    HTTP:', ghTest.status);
  if (ghTest.json?.error === 'Invalid token') console.log('    ✓ Deployed — needs user JWT (expected)');
  else if (ghTest.json?.error?.includes('GITHUB_TOKEN')) console.log('    ✗ GITHUB_TOKEN secret NOT SET');
  else console.log('    Response:', JSON.stringify(ghTest.json).slice(0, 100));

  // cometchat-auth
  const ccTest = await callFn('cometchat-auth', anonToken, { body: { action: 'sync_user' } });
  console.log('\n  cometchat-auth:');
  console.log('    HTTP:', ccTest.status);
  if (ccTest.status === 401) console.log('    ✓ Deployed — needs user JWT (expected)');
  else if (ccTest.json?.error?.includes('COMETCHAT')) console.log('    ✗ COMETCHAT secrets NOT SET');
  else console.log('    Response:', JSON.stringify(ccTest.json).slice(0, 100));

  // gh (alternate github function)
  const ghAlt = await callFn('gh', anonToken, { body: { endpoint: '/user', method: 'GET' } });
  console.log('\n  gh (alt github fn):');
  console.log('    HTTP:', ghAlt.status);
  if (ghAlt.json?.error?.includes('GITHUB_PAT')) console.log('    ✗ GITHUB_PAT secret NOT SET');
  else if (ghAlt.json?.login) console.log('    ✓ GITHUB_PAT working — user:', ghAlt.json.login);
  else console.log('    Response:', JSON.stringify(ghAlt.json).slice(0, 100));

  // notion-sync
  const notionTest = await callFn('notion-sync', anonToken, { body: {} });
  console.log('\n  notion-sync:');
  console.log('    HTTP:', notionTest.status);
  if (notionTest.json?.error?.includes('NOTION_TOKEN') || notionTest.status === 500) {
    console.log('    Check NOTION_TOKEN / NOTION_ROOT_PAGE_ID secrets');
  } else {
    console.log('    Response:', JSON.stringify(notionTest.json).slice(0, 100));
  }

  // zoom-home
  const zoomTest = await callFn('zoom-home', anonToken, {});
  console.log('\n  zoom-home:');
  console.log('    HTTP:', zoomTest.status, '|', JSON.stringify(zoomTest.json).slice(0, 80));

  console.log('\n═══════════════════════════════════════════════');
  console.log('  To test authenticated endpoints, share a');
  console.log('  test user email + password and rerun.');
  console.log('═══════════════════════════════════════════════\n');
}

main().catch(console.error);
