import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("short_links")
      .select("*")
      .eq("hash_code", "gh-repo1");

    res.status(200).json({
      status: "ok",
      supabaseUrlConfigured: !!process.env.SUPABASE_URL,
      supabaseKeyConfigured: !!process.env.SUPABASE_ANON_KEY,
      urlPrefix: process.env.SUPABASE_URL
        ? process.env.SUPABASE_URL.substring(0, 15)
        : null,
      data: data,
      error: error,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
