-- ============================================
-- Migration: Tabel short_links untuk Dynamic Interstitial Page
-- Jalankan di Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS short_links (
    id SERIAL PRIMARY KEY,
    hash_code VARCHAR(16) NOT NULL UNIQUE,
    target_url TEXT NOT NULL,
    affiliate_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT 'Repository',
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk lookup cepat berdasarkan hash_code
CREATE UNIQUE INDEX IF NOT EXISTS idx_short_links_hash ON short_links(hash_code);

-- Contoh data seed untuk testing
INSERT INTO short_links (hash_code, target_url, affiliate_url, title) VALUES
    ('gh-repo1', 'https://github.com/torvalds/linux', 'https://shope.ee/example1', 'GitHub Authenticator'),
    ('gdrive01', 'https://drive.google.com/file/d/example', 'https://shope.ee/example2', 'GDrive File Access'),
    ('ai-tool1', 'https://chat.openai.com', 'https://shope.ee/example3', 'OpenAI Connector')
ON CONFLICT (hash_code) DO NOTHING;

-- Verifikasi
SELECT * FROM short_links;
