import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/database/client";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files allowed" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = crypto.randomUUID() + "." + ext;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin().storage
    .from("property-photos")
    .upload(fileName, buffer, { contentType: file.type });

  if (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin().storage.from("property-photos").getPublicUrl(fileName);

  return NextResponse.json({ url: urlData.publicUrl });
}
