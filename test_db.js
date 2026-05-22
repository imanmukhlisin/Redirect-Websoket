import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
  console.log("Fetching gh-repo1 using anon key...");
  const { data, error } = await supabase
    .from("short_links")
    .select("*")
    .eq("hash_code", "gh-repo1")
    .single();

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Success! Data:", data);
  }
}

check();
