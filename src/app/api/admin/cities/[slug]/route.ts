import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/database/client";

const updateSchema = z.object({
  tagline: z.string().min(1),
  avgPrice: z.number().positive(),
  avgYield: z.number().positive(),
  growthRate: z.number(),
  description: z.string().min(1),
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

  const { tagline, avgPrice, avgYield, growthRate, description } = parsed.data;

  const { error } = await supabaseAdmin()
    .from("cities")
    .update({
      tagline,
      avg_price: avgPrice,
      avg_yield: avgYield,
      growth_rate: growthRate,
      description,
    })
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
