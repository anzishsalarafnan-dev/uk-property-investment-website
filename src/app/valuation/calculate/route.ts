import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateValuation } from "@/lib/market-data/valuation";
import { supabaseAdmin } from "@/lib/database/client";
import { getAreaBySlugOnly } from "@/lib/database/content";
import { sendEmail } from "@/lib/email/sender";
import { valuationEmailHtml } from "@/lib/email/templates/valuation";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";

const valuationSchema = z.object({
  propertyType: z.enum(["studio", "1-bed", "2-bed", "3-bed", "house"]),
  condition: z.enum(["good", "average", "needs-renovation"]),
  areaSlug: z.string().min(1),
  email: z.string().email(),
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
      return NextResponse.json({ success: true, result: { low: 0, medium: 0, high: 0, areaSlug: "", generatedAt: "" } });
    }

    const parsed = valuationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { propertyType, condition, areaSlug, email } = parsed.data;
    const area = await getAreaBySlugOnly(areaSlug);

    if (!area) {
      return NextResponse.json({ error: "Area not found" }, { status: 404 });
    }

    const result = calculateValuation(area, propertyType, condition);

    const { error } = await supabaseAdmin()
      .from("leads")
      .insert({
        name: email.split("@")[0],
        email,
        interested_area: areaSlug,
        source: "valuation",
        message: `Valuation requested: ${propertyType}, ${condition}. Result: £${result.low}-£${result.high}`,
        score: 60,
      });

    if (error) {
      console.error("Supabase insert error:", error.message);
    }

    await sendEmail({
      to: email,
      subject: "Your Property Valuation Estimate",
      html: valuationEmailHtml(area.name, result),
    });

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
