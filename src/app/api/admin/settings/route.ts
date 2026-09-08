import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/database/client";

const settingsSchema = z.object({
  contact_email: z.string().email().or(z.literal("")),
  contact_phone: z.string(),
  whatsapp_number: z.string(),
  theme_mode: z.enum(["light", "dark"]),
});

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const entries = Object.entries(parsed.data);

  for (const [key, value] of entries) {
    await admin.from("site_settings").upsert({ key, value }, { onConflict: "key" });
  }

  return NextResponse.json({ success: true });
}
