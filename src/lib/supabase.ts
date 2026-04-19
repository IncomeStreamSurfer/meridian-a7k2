import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn('[meridian] Supabase env vars missing — waitlist will 500 until PUBLIC_SUPABASE_URL + PUBLIC_SUPABASE_ANON_KEY are set in Vercel.');
}

export const supabase = createClient(url ?? 'http://missing', anonKey ?? 'missing', {
  auth: { persistSession: false },
});
