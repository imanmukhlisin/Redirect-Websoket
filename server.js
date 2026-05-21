/**
 * Express Standalone Server
 * ─────────────────────────
 * Alternatif deployment jika tidak pakai Vercel.
 * Bisa dideploy ke Railway, VPS, atau lokal.
 *
 * Cara pakai:
 *   1. cp .env.example .env  → isi SUPABASE_URL & SUPABASE_ANON_KEY
 *   2. npm install
 *   3. npm run dev
 *   4. Buka http://localhost:3001/r/gh-repo1
 */
import "dotenv/config";
import express from "express";
import handler from "./api/r/[hash_code].js";

const app = express();
const PORT = process.env.PORT || 3001;

// ── Landing / health check ──
app.get("/", (_req, res) => {
    res.json({
        service: "Shopee Redirect Engine",
        status: "running",
        usage: "GET /r/:hash_code",
    });
});

// ── Dynamic redirect route ──
// Bridge Express params → Vercel-style query so handler works for both
app.get("/r/:hash_code", (req, res) => {
    req.query.hash_code = req.params.hash_code;
    return handler(req, res);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚡ Redirect Engine running → http://localhost:${PORT}`);
    console.log(`   Test: http://localhost:${PORT}/r/gh-repo1`);
});
