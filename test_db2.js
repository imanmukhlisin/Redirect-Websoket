import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Karena ini file test langsung kita hardcode sementara url-nya dari screenshot
const supabaseUrl =
  process.env.SUPABASE_URL || "https://rpmsvgdtlyqpseghriug.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: latestLinks } = await supabase
    .from("short_links")
    .select(
      "hash_code, target_url, affiliate_url, shopee_title, shopee_image_url",
    )
    .order("created_at", { ascending: false })
    .limit(3);

  console.log("== Latest short_links ==");
  console.log(JSON.stringify(latestLinks, null, 2));

  if (latestLinks && latestLinks.length > 0) {
    for (const link of latestLinks) {
      if (!link.affiliate_url) continue;
      console.log(
        `\n== Looking up product with affiliate_url: ${link.affiliate_url} ==`,
      );

      // Exact match
      const { data: exact } = await supabase
        .from("products")
        .select("id, title, affiliate_link")
        .eq("affiliate_link", link.affiliate_url);
      console.log("Exact match:", exact);

      // Trim match
      const { data: trimMatch } = await supabase
        .from("products")
        .select("id, title, affiliate_link")
        .eq("affiliate_link", link.affiliate_url.trim());
      console.log("Trim match:", trimMatch);
    }
  }
}

check();
