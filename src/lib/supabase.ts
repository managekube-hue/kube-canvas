// Re-export the already-configured integration client so all hooks work immediately.
// This client uses the hardcoded anon key from integrations/supabase/client.ts
export { supabase } from '@/integrations/supabase/client';
