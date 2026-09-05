import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/database/client";

const updateSchema = z.object({
  investmentScore: z.number().min(0).max(10),
  studio: z.number().positive(),
  oneBed: z.number().positive(),
  twoBed: z.number().positive(),
  threeBed: z.number().positive(),
  rentalYield: z.number().positive(),
  growthProjection: z.number(),
  overview: z.string().min(1),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { investmentScore, studio, oneBed, twoBed, threeBed, rentalYield, growthProjection, overview } = parsed.data;

  const { error } = await supabaseAdmin()
    .from("areas")
    .update({
      investment_score: investmentScore,
      pricing: { studio, oneBed, twoBed, threeBed },
      rental_yield: rentalYield,
      growth_projection: growthProjection,
      overview,
    })
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
