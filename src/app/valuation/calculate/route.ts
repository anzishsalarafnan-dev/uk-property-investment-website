import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateValuation } from "@/lib/market-data/valuation";
import { supabaseAdmin } from "@/lib/database/client";
import { sendEmail } from "@/lib/email/sender";
import { valuationEmailHtml } from "@/lib/email/templates/valuation";
import areasData from "@/data/areas.json";

const valuationSchema = z.object({
  propertyType: z.enum(["studio", "1-bed", "2-bed", "3-bed", "house"]),
  condition: z.enum(["good", "average", "needs-renovation"]),
  areaSlug: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = valuationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { propertyType, condition, areaSlug, email } = parsed.data;
    const result = calculateValuation(areaSlug, propertyType, condition);

    if (!result) {
      return NextResponse.json({ error: "Area not found" }, { status: 404 });
    }

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

    const area = areasData.find((a) => a.slug === areaSlug);
    await sendEmail({
      to: email,
      subject: "Your Property Valuation Estimate",
      html: valuationEmailHtml(area?.name || areaSlug, result),
    });

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
