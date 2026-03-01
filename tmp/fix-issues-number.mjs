import pg from 'pg';
const { Client } = pg;
const DB = 'postgresql://postgres.psxskwerldhfjmanzbpk:Managedit2026!@aws-1-us-east-1.pooler.supabase.com:5432/postgres';
const client = new Client({ connectionString: DB, ssl: { rejectUnauthorized: false } });
await client.connect();

// Create a sequence and trigger so reach_issues.number auto-increments per workspace
await client.query(`
  -- Create a sequence for issue numbers (global, workspace-scoped via trigger)
  CREATE SEQUENCE IF NOT EXISTS reach_issues_number_seq;

  -- Add default using trigger instead of sequence directly (workspace-scoped numbers)
  CREATE OR REPLACE FUNCTION reach_issues_set_number()
  RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.number IS NULL OR NEW.number = 0 THEN
      SELECT COALESCE(MAX(number), 0) + 1
        INTO NEW.number
        FROM reach_issues
       WHERE workspace_id = NEW.workspace_id;
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS reach_issues_number_trigger ON reach_issues;
  CREATE TRIGGER reach_issues_number_trigger
    BEFORE INSERT ON reach_issues
    FOR EACH ROW EXECUTE FUNCTION reach_issues_set_number();
`);

console.log('✓ reach_issues number trigger created');

// Also fix reach_pull_requests number field same way
await client.query(`
  CREATE OR REPLACE FUNCTION reach_pull_requests_set_number()
  RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.number IS NULL OR NEW.number = 0 THEN
      SELECT COALESCE(MAX(number), 0) + 1
        INTO NEW.number
        FROM reach_pull_requests
       WHERE workspace_id = NEW.workspace_id;
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS reach_prs_number_trigger ON reach_pull_requests;
  CREATE TRIGGER reach_prs_number_trigger
    BEFORE INSERT ON reach_pull_requests
    FOR EACH ROW EXECUTE FUNCTION reach_pull_requests_set_number();
`);

console.log('✓ reach_pull_requests number trigger created');

// Add sprint support to issues table
const cols = await client.query(`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'reach_issues' AND table_schema = 'public'
`);
const existing = cols.rows.map(r => r.column_name);

const toAdd = [];
if (!existing.includes('story_points')) toAdd.push(`ALTER TABLE reach_issues ADD COLUMN story_points integer DEFAULT 0`);
if (!existing.includes('sprint_id')) toAdd.push(`ALTER TABLE reach_issues ADD COLUMN sprint_id uuid REFERENCES reach_sprints(id) ON DELETE SET NULL`);
if (!existing.includes('epic_id')) toAdd.push(`ALTER TABLE reach_issues ADD COLUMN epic_id uuid`);
if (!existing.includes('estimate')) toAdd.push(`ALTER TABLE reach_issues ADD COLUMN estimate text`);
if (!existing.includes('due_date')) toAdd.push(`ALTER TABLE reach_issues ADD COLUMN due_date date`);
if (!existing.includes('parent_id')) toAdd.push(`ALTER TABLE reach_issues ADD COLUMN parent_id uuid REFERENCES reach_issues(id) ON DELETE SET NULL`);

// Create sprints table first
await client.query(`
  CREATE TABLE IF NOT EXISTS reach_sprints (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id uuid NOT NULL REFERENCES reach_workspaces(id) ON DELETE CASCADE,
    name text NOT NULL,
    goal text,
    status text NOT NULL DEFAULT 'planned', -- planned | active | completed
    start_date date,
    end_date date,
    velocity integer DEFAULT 0,
    created_by uuid NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  );

  ALTER TABLE reach_sprints ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS "Members read sprints" ON reach_sprints;
  CREATE POLICY "Members read sprints" ON reach_sprints FOR SELECT
    USING (EXISTS (
      SELECT 1 FROM reach_workspace_members m
      WHERE m.workspace_id = reach_sprints.workspace_id AND m.user_id = auth.uid()
    ) OR auth.uid() IN (SELECT created_by FROM reach_workspaces WHERE id = reach_sprints.workspace_id));

  DROP POLICY IF EXISTS "Members create sprints" ON reach_sprints;
  CREATE POLICY "Members create sprints" ON reach_sprints FOR INSERT
    WITH CHECK (auth.uid() = created_by);

  DROP POLICY IF EXISTS "Members update sprints" ON reach_sprints;
  CREATE POLICY "Members update sprints" ON reach_sprints FOR UPDATE
    USING (auth.uid() = created_by OR EXISTS (
      SELECT 1 FROM reach_workspace_members m
      WHERE m.workspace_id = reach_sprints.workspace_id AND m.user_id = auth.uid() AND m.role IN ('admin','owner')
    ));
`);
console.log('✓ reach_sprints table created');

// Add issue columns now that sprints table exists
if (!existing.includes('story_points')) {
  await client.query(`ALTER TABLE reach_issues ADD COLUMN IF NOT EXISTS story_points integer DEFAULT 0`);
  console.log('✓ Added story_points to reach_issues');
}
if (!existing.includes('sprint_id')) {
  await client.query(`ALTER TABLE reach_issues ADD COLUMN IF NOT EXISTS sprint_id uuid REFERENCES reach_sprints(id) ON DELETE SET NULL`);
  console.log('✓ Added sprint_id to reach_issues');
}
if (!existing.includes('epic_id')) {
  await client.query(`ALTER TABLE reach_issues ADD COLUMN IF NOT EXISTS epic_id uuid`);
  console.log('✓ Added epic_id to reach_issues');
}
if (!existing.includes('due_date')) {
  await client.query(`ALTER TABLE reach_issues ADD COLUMN IF NOT EXISTS due_date date`);
  console.log('✓ Added due_date to reach_issues');
}
if (!existing.includes('parent_id')) {
  await client.query(`ALTER TABLE reach_issues ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES reach_issues(id) ON DELETE SET NULL`);
  console.log('✓ Added parent_id to reach_issues');
}

// Verify by doing a test insert
const testResult = await client.query(`
  INSERT INTO reach_issues (workspace_id, title, status, priority, labels, created_by)
  VALUES ('865f7095-673d-4275-8965-b9b9caf76251', 'TEST ISSUE - AUTO NUMBER', 'todo', 'medium', '{}', '8d42a6d2-c2c6-4d83-b6d3-08e6c7fb3a1a')
  RETURNING id, number, title
`);
console.log('✓ Test issue created:', testResult.rows[0]);

// Clean it up
await client.query(`DELETE FROM reach_issues WHERE title = 'TEST ISSUE - AUTO NUMBER'`);
console.log('✓ Test issue cleaned up');

await client.end();
console.log('\n✅ All DB fixes applied');
