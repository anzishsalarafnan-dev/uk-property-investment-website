import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/database/client";
import { sendEmail } from "@/lib/email/sender";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";
import { verifyRecaptcha } from "@/lib/security/recaptcha";

const schema = z.object({
  sellerListingId: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(),
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
      return NextResponse.json({ success: true });
    }

    const parsed = schema.safeParse(body);
    if (parsed.success === false) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(parsed.data.recaptchaToken || "");
    if (isHuman === false) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }

    const { sellerListingId, name, email, phone, message } = parsed.data;

    const { error } = await supabaseAdmin().from("property_inquiries").insert({
      seller_listing_id: sellerListingId,
      name,
      email,
      phone: phone || null,
      message: message || null,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    await sendEmail({
      to: email,
      subject: "We\'ve received your enquiry",
      html: "<div style=\"font-family: Arial, sans-serif;\"><p>Hi " + name + ", thanks for your interest — our team will be in touch shortly with more details about this property.</p></div>",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
