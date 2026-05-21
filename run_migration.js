/**
 * Migration via Supabase REST API (anon key)
 * Tidak perlu DATABASE_URL — cukup SUPABASE_URL + SUPABASE_ANON_KEY
 *
 * Jalankan:
 *   $env:SUPABASE_URL="https://xxx.supabase.co"
 *   $env:SUPABASE_ANON_KEY="eyJ..."
 *   node run_migration.js
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("❌ Set SUPABASE_URL dan SUPABASE_ANON_KEY dulu.");
  process.exit(1);
}

const supabase = createClient(url, key);

console.log("📡 Connecting to Supabase...");

// Test connection
const { data: test, error: testErr } = await supabase
  .from("short_links")
  .select("count")
  .limit(1);

if (testErr && testErr.code === "42P01") {
  // Table doesn't exist yet — user needs to run SQL in Supabase SQL Editor
  console.log("");
  console.log("⚠️  Tabel 'short_links' BELUM ADA di Supabase.");
  console.log("");
  console.log("Karena Supabase anon key tidak bisa CREATE TABLE,");
  console.log("kamu perlu jalankan SQL ini MANUAL di Supabase SQL Editor:");
  console.log("─────────────────────────────────────────────");
  console.log(`
CREATE TABLE IF NOT EXISTS short_links (
    id SERIAL PRIMARY KEY,
    hash_code VARCHAR(16) NOT NULL UNIQUE,
    target_url TEXT NOT NULL,
    affiliate_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT 'Repository',
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_short_links_hash ON short_links(hash_code);

INSERT INTO short_links (hash_code, target_url, affiliate_url, title) VALUES
    ('gh-repo1', 'https://github.com/torvalds/linux', 'https://shope.ee/example1', 'GitHub Authenticator'),
    ('gdrive01', 'https://drive.google.com/file/d/example', 'https://shope.ee/example2', 'GDrive File Access'),
    ('ai-tool1', 'https://chat.openai.com', 'https://shope.ee/example3', 'OpenAI Connector')
ON CONFLICT (hash_code) DO NOTHING;
    `);
  console.log("─────────────────────────────────────────────");
  console.log(
    "Buka: https://supabase.com/dashboard → SQL Editor → paste → Run",
  );
  process.exit(1);
} else if (testErr) {
  console.error("❌ Error:", testErr.message);
  process.exit(1);
} else {
  console.log("✅ Tabel 'short_links' sudah ada!");
  const { data } = await supabase
    .from("short_links")
    .select("hash_code, title");
  console.log("📊 Data saat ini:");
  for (const r of data || []) {
    console.log(`   • ${r.hash_code} → ${r.title}`);
  }
  if (!data || data.length === 0) {
    console.log("   (kosong — belum ada data)");
  }
  console.log("\n✅ Semua OK! Vercel siap dipakai.");
}

process.exit(0);
