import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/database/client";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";
import { verifyRecaptcha } from "@/lib/security/recaptcha";

const reviewSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
  message: z.string().min(10),
  citySlug: z.string().optional(),
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

    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(parsed.data.recaptchaToken || "");
    if (!isHuman) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }

    const { name, email, rating, message, citySlug } = parsed.data;

    const { error } = await supabaseAdmin()
      .from("reviews")
      .insert({
        name,
        email,
        rating,
        message,
        city_slug: citySlug || null,
        is_approved: false,
      });

    if (error) {
      return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
