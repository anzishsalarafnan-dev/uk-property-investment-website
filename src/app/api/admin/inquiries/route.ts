import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/database/client";

export async function GET() {
  const session = await getSession();
  if (session.isAdmin !== true) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin()
    .from("property_inquiries")
    .select("*, seller_listings(property_type, asking_price, city_slug)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Failed" }, { status: 500 });
  return NextResponse.json({ inquiries: data });
}
