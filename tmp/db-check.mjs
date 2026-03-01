import pg from 'pg';
const { Client } = pg;
const DB = 'postgresql://postgres.psxskwerldhfjmanzbpk:Managedit2026!@aws-1-us-east-1.pooler.supabase.com:5432/postgres';

const client = new Client({ connectionString: DB, ssl: { rejectUnauthorized: false } });
await client.connect();

// RLS policies on reach tables
const policies = await client.query(`
  SELECT tablename, policyname, cmd
  FROM pg_policies
  WHERE schemaname = 'public' AND tablename LIKE 'reach_%'
  ORDER BY tablename, policyname
`);
console.log('\n=== RLS POLICIES ===');
if (policies.rows.length === 0) {
  console.log('NO POLICIES FOUND — RLS may be disabled or tables have no policies');
} else {
  policies.rows.forEach(r => console.log(`${r.tablename} | ${r.cmd} | ${r.policyname}`));
}

// Check RLS enabled
const rlsCheck = await client.query(`
  SELECT relname, relrowsecurity
  FROM pg_class
  WHERE relname LIKE 'reach_%' AND relkind = 'r'
  ORDER BY relname
`);
console.log('\n=== RLS ENABLED? ===');
rlsCheck.rows.forEach(r => console.log(`${r.relname}: RLS=${r.relrowsecurity}`));

await client.end();
