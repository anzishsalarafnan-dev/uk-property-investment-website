import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/database/client";
import { sendEmail } from "@/lib/email/sender";
import { contactConfirmationHtml } from "@/lib/email/templates/contact";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";
import { verifyRecaptcha } from "@/lib/security/recaptcha";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
  website: z.string().optional(), // honeypot field
  recaptchaToken: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const body = await request.json();

    if (isHoneypotTriggered(body.website)) {
      // Silently pretend success so bots don't learn they were caught.
      return NextResponse.json({ success: true });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const isHuman = await verifyRecaptcha(parsed.data.recaptchaToken || "");
    if (!isHuman) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }

    const { name, email, subject, message } = parsed.data;

    const { error } = await supabaseAdmin()
      .from("leads")
      .insert({
        name,
        email,
        source: "contact",
        message: `[${subject}] ${message}`,
        score: 20,
      });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }

    await sendEmail({
      to: email,
      subject: "We've received your message",
      html: contactConfirmationHtml(name),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
