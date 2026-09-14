import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/database/client";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";
import { verifyRecaptcha } from "@/lib/security/recaptcha";

const buyerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  citySlug: z.string().optional(),
  propertyType: z.string().min(1),
  budgetMax: z.number().positive(),
  bedroomsWanted: z.number().optional(),
  requirements: z.string().optional(),
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

    const parsed = buyerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(parsed.data.recaptchaToken || "");
    if (!isHuman) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }

    const { name, email, phone, citySlug, propertyType, budgetMax, bedroomsWanted, requirements } = parsed.data;

    const { error } = await supabaseAdmin().from("buyer_requests").insert({
      name,
      email,
      phone: phone || null,
      city_slug: citySlug || null,
      property_type: propertyType,
      budget_max: budgetMax,
      bedrooms_wanted: bedroomsWanted || null,
      requirements: requirements || null,
      is_approved: false,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
