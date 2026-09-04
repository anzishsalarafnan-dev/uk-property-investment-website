import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/database/client";
import { sendEmail } from "@/lib/email/sender";
import { contactConfirmationHtml } from "@/lib/email/templates/contact";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    const { error } = await supabaseAdmin()
      .from("leads")
      .insert({
        name,
        email,
        source: "contact",
        message: `[${subject}] ${message}`,
        score: 20,
      });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }

    await sendEmail({
      to: email,
      subject: "We've received your message",
      html: contactConfirmationHtml(name),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
