/**
 * Vercel Serverless Function — GET /r/:hash_code
 * ────────────────────────────────────────────────
 * 1. Ambil hash_code dari URL
 * 2. Query Supabase → tabel short_links
 * 3. Jika ditemukan → render halaman interstitial
 * 4. Jika tidak → tampilkan 404 yang tetap estetik
 * 5. Increment click_count (fire-and-forget, non-blocking)
 */
import { supabase } from "../../lib/supabase.js";
import { renderInterstitial } from "../../lib/template.js";

/** Halaman 404 minimalis yang tetap on-brand */
function render404(hashCode) {
  return `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>404 · Link Tidak Ditemukan</title>
<meta name="robots" content="noindex,nofollow">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f0f0f0;
min-height:100vh;display:flex;align-items:center;justify-content:center}
.card{background:rgba(18,18,18,.85);border:1px solid rgba(255,255,255,.06);
border-radius:20px;padding:48px 40px;max-width:420px;width:90vw;text-align:center;
backdrop-filter:blur(20px);box-shadow:0 20px 60px rgba(0,0,0,.5)}
.code{font-size:64px;font-weight:700;
background:linear-gradient(135deg,#ff4444,#ff8800);
-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px}
.msg{font-size:16px;color:#6b6b6b;line-height:1.6}
.hash{color:#ff8800;font-family:monospace;font-weight:600}
</style></head>
<body><div class="card">
<div class="code">404</div>
<p class="msg">Link <span class="hash">${hashCode}</span> tidak ditemukan atau sudah kadaluarsa.</p>
</div></body></html>`;
}

export default async function handler(req, res) {
  try {
    // Ambil hash_code — support Vercel (req.query) dan Express (req.params)
    const hashCode = req.query?.hash_code || req.params?.hash_code;

    if (!hashCode) {
      res.status(400).send("Missing hash_code");
      return;
    }

    // Query Supabase untuk mendapatkan data short_link
    const { data, error } = await supabase
      .from("short_links")
      .select("*")
      .eq("hash_code", hashCode)
      .single();

    if (error || !data) {
      res.status(404).send(render404(hashCode));
      return;
    }

    // Fire-and-forget: increment click counter (non-blocking)
    supabase.rpc("increment_click", { code: hashCode }).catch(() => {});
    // Fallback jika RPC belum dibuat — langsung update
    supabase
      .from("short_links")
      .update({ click_count: (data.click_count || 0) + 1 })
      .eq("hash_code", hashCode)
      .then(() => {});

    // Jika shopee_title/image kosong, fallback ke tabel products berdasarkan affiliate_url
    let finalShopeeTitle = data.shopee_title;
    let finalShopeeImage = data.shopee_image_url;

    if ((!finalShopeeTitle || !finalShopeeImage) && data.affiliate_url) {
      const { data: prodData } = await supabase
        .from("products")
        .select("title, image_url")
        .eq("affiliate_link", data.affiliate_url)
        .maybeSingle();

      if (prodData) {
        if (!finalShopeeTitle) finalShopeeTitle = prodData.title;
        if (!finalShopeeImage) finalShopeeImage = prodData.image_url;
      }
    }

    // Render interstitial page
    const html = renderInterstitial({
      title: data.title,
      targetUrl: data.target_url,
      affiliateUrl: data.affiliate_url,
      shopeeTitle: finalShopeeTitle,
      shopeeImageUrl: finalShopeeImage,
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).send(html);
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).send("Internal Server Error");
  }
}
