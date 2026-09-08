import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/database/client";

const updateSchema = z.object({ is_approved: z.boolean() });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { error } = await supabaseAdmin()
    .from("reviews")
    .update({ is_approved: parsed.data.is_approved })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { error } = await supabaseAdmin().from("reviews").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
