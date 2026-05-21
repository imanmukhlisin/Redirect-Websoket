/**
 * Supabase Client Singleton
 * Lightweight — hanya satu instance untuk seluruh app
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("❌ SUPABASE_URL dan SUPABASE_ANON_KEY wajib diisi di .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
