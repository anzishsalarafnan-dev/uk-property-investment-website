import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/database/client";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

export async function POST(req: Request) {
  try {
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // Strict MIME type validation
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed" }, { status: 400 });
    }

    // Generate safe unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const cleanExt = ext.replace(/[^a-zA-Z0-9]/g, "");
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${cleanExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const client = supabaseAdmin();
    const { data, error } = await client.storage
      .from("property-photos")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("[UPLOAD_ERROR]", error.message);
      return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
    }

    const { data: publicUrlData } = client.storage
      .from("property-photos")
      .getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (err) {
    console.error("[UPLOAD_EXCEPTION]", err);
    return NextResponse.json({ error: "Server error processing upload" }, { status: 500 });
  }
}
