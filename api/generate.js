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
    const { target_url, affiliate_url, title } = req.body;

    if (!target_url || !affiliate_url) {
      res.status(400).json({ error: "Missing target_url or affiliate_url" });
      return;
    }

    // Generate hash code: "gh-repo-" + 5 random karakter alfanumerik
    const randomStr = Math.random().toString(36).substring(2, 7);
    const hashCode = `gh-repo-${randomStr}`;

    const repoTitle = title || "GitHub Authenticator";

    // Insert ke database Supabase
    const { error } = await supabase.from("short_links").insert({
      hash_code: hashCode,
      target_url: target_url,
      affiliate_url: affiliate_url,
      title: repoTitle,
    });

    if (error) {
      console.error("DB Insert Error:", error);
      res.status(500).json({ error: "Failed to save link to database" });
      return;
    }

    // Return generated link dengan custom domain user
    const customDomain =
      req.headers.host || "www.github-repositories.loseyourip.com";
    const protocol = "https://"; // Vercel 100% https

    res.status(200).json({
      success: true,
      hash_code: hashCode,
      short_url: `${protocol}${customDomain}/r/${hashCode}`,
    });
  } catch (err) {
    console.error("Generate error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
