import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(process.cwd() + "/.env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx), l.slice(idx + 1)];
    })
);

const adminClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const publicClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// First, insert a test row using admin key
await adminClient.from("property_inquiries").insert({
  name: "RLS Test",
  email: "rlstest@example.com",
  message: "test row for RLS verification",
});

// Now try to read it with the public key
const { data, error } = await publicClient.from("property_inquiries").select("*");

if (error) {
  console.log("✅ CONFIRMED — public key correctly BLOCKED:", error.message);
} else if (data.length === 0) {
  console.log("✅ CONFIRMED — public key sees 0 rows even though data exists. RLS working.");
} else {
  console.log("❌ SECURITY RISK — public key can read inquiries, data.length, "rows:", data);
}

// Clean up the test row
const adminCheck = await adminClient.from("property_inquiries").select("id").eq("email", "rlstest@example.com");
if (adminCheck.data && adminCheck.data.length > 0) {
  await adminClient.from("property_inquiries").delete().eq("email", "rlstest@example.com");
  console.log("Test row cleaned up.");
}
