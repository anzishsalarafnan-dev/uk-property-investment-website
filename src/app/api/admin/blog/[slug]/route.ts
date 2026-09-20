import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/database/client";

const schema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession();
  if (session.isAdmin !== true) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (parsed.success === false) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const { title, excerpt, content } = parsed.data;
  const { error } = await supabaseAdmin().from("blog_posts").update({ title, excerpt, content }).eq("slug", slug);
  if (error) return NextResponse.json({ error: "Failed" }, { status: 500 });

  return NextResponse.json({ success: true });
}
