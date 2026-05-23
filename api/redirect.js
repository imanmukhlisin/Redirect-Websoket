/**
 * Vercel Serverless Function — GET /api/redirect?code=xxx
 * ────────────────────────────────────────────────────────
 * Single-file handler tanpa dynamic file naming [].
 * Vercel rewrite: /r/:hash_code → /api/redirect?code=:hash_code
 */
import { supabase } from "../lib/supabase.js";
import { renderInterstitial } from "../lib/template.js";

/** Halaman 404 minimalis */
function render404(hashCode) {
  return `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>404 · Link Tidak Ditemukan</title>
<meta name="robots" content="noindex,nofollow">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0d1117;color:#e6edf3;
min-height:100vh;display:flex;align-items:center;justify-content:center}
.card{background:#161b22;border:1px solid #21262d;
border-radius:12px;padding:48px 40px;max-width:420px;width:90vw;text-align:center}
.code{font-size:56px;font-weight:700;color:#f85149;margin-bottom:16px}
.msg{font-size:15px;color:#8b949e;line-height:1.6}
.hash{color:#f0883e;font-family:monospace;font-weight:600}
</style></head>
<body><div class="card">
<div class="code">404</div>
<p class="msg">Link <span class="hash">${hashCode || "unknown"}</span> tidak ditemukan.</p>
</div></body></html>`;
}

export default async function handler(req, res) {
  try {
    const hashCode = req.query?.code;

    if (!hashCode) {
      res.status(400).send(render404("missing"));
      return;
    }

    // 3. Ambil data dari tabel short_links
    const { data, error } = await supabase
      .from("short_links")
      .select(
        "target_url, affiliate_url, title, image_url, shopee_title, shopee_image_url",
      )
      .eq("hash_code", hashCode)
      .single();

    // 4. Update click_count di background (tidak diblok)
    if (data) {
      supabase.rpc("increment_clicks", { row_id: hashCode }).then().catch();
    }

    if (error || !data) {
      console.error("Supabase Error:", error);
      res.status(404).send("Link not found or expired.");
      return;
    }

    // Render interstitial page
    const html = renderInterstitial({
      title: data.title,
      targetUrl: data.target_url,
      affiliateUrl: data.affiliate_url,
      shopeeTitle: data.shopee_title,
      shopeeImageUrl: data.shopee_image_url,
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).send(html);
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).send("Internal Server Error");
  }
}
