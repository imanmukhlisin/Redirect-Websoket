import { supabase } from "../lib/supabase.js";

// Basic auth key untuk mengamankan endpoint dari spam
const API_SECRET = process.env.API_SECRET_KEY || "n8n-shopee-secret-2026";

export default async function handler(req, res) {
  // Hanya izinkan POST request
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed - Use POST" });
    return;
  }

  // Cek Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const body = req.body;

    // Terima field nama lama DAN nama baru (dari n8n dengan spasi)
    const affiliate_url =
      body.affiliate_url || body["link affliate"] || body["link affiliate"];
    const target_url =
      body.target_url || body["link github"] || body["link_github"];
    const image_url = body.image_url || body["image url"] || body["image_url"];
    const keterangan = body.keterangan || body.description || "";
    const title = body.title || "GitHub Authenticator";

    // Field baru untuk Shopee Product di Landing Page
    // Fallback: Jika shopee title kosong, ambil dari body.title (yang dikirim n8n)
    const shopee_title =
      body.shopee_title || body["shopee title"] || title || "";

    // Fallback: Support field "image affiliate" atau "image_affiliate" yang dikirim user via n8n
    const shopee_image_url =
      body.image_affiliate || body["image affiliate"] || "";

    if (!target_url || !affiliate_url) {
      res.status(400).json({ error: "Missing target_url or affiliate_url" });
      return;
    }

    // Generate hash code: "gh-repo-" + 5 random karakter alfanumerik
    const randomStr = Math.random().toString(36).substring(2, 7);
    const hashCode = `gh-repo-${randomStr}`;

    // Insert ke database Supabase
    const { error } = await supabase.from("short_links").insert({
      hash_code: hashCode,
      target_url: target_url,
      affiliate_url: affiliate_url,
      title: title,
      image_url: image_url,
      shopee_title: shopee_title,
      shopee_image_url: shopee_image_url,
    });

    if (error) {
      console.error("DB Insert Error:", error);
      res.status(500).json({
        error: "Failed to save link to database",
        details: error.message,
        code: error.code,
      });
      return;
    }

    // Return semua data yang dibutuhkan n8n
    const customDomain =
      req.headers.host || "www.github-repositories.loseyourip.com";

    res.status(200).json({
      success: true,
      short_url: `https://${customDomain}/r/${hashCode}`,
      image_url: image_url || null,
      keterangan: keterangan,
      link_github: target_url,
    });
  } catch (err) {
    console.error("Generate error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
