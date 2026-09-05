import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/database/client";
import { getGuideBySlug } from "@/lib/database/content";
import { sendEmail } from "@/lib/email/sender";
import { guideEmailHtml } from "@/lib/email/templates/guide";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";

const downloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  guideSlug: z.string().min(1),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const body = await request.json();

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ success: true });
    }

    const parsed = downloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, whatsapp, guideSlug } = parsed.data;

    const { error } = await supabaseAdmin()
      .from("leads")
      .insert({
        name,
        email,
        whatsapp: whatsapp || null,
        source: "guide-download",
        message: `Downloaded guide: ${guideSlug}`,
        score: 40,
      });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    const guide = await getGuideBySlug(guideSlug);
    await sendEmail({
      to: email,
      subject: "Your Guide is Ready",
      html: guideEmailHtml(guide?.title || guideSlug),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
