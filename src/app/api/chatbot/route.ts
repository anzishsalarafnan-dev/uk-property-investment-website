import { NextResponse } from "next/server";
import { z } from "zod";
import { getGeminiModel } from "@/lib/chatbot/gemini";
import { retrieveContext } from "@/lib/chatbot/retrieval";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
  language: z.string().optional(),
  history: z
    .array(z.object({ role: z.enum(["user", "model"]), text: z.string() }))
    .optional()
    .default([]),
});

const SYSTEM_INSTRUCTION = `You are a concise assistant for a UK property investment site. Answer ONLY from the provided context. If unknown, say so briefly and point to the Valuation tool or Contact page. Match the user's language. Keep replies to 1-3 short sentences. Never invent facts. Not financial advice.`;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
    }

    const body = await request.json();
    const parsed = chatSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { message, history, language } = parsed.data;
    const context = await retrieveContext(message);

    const model = getGeminiModel();

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I'll answer using only the provided context and match the user's language." }],
        },
        ...history.map((h) => ({
          role: h.role,
          parts: [{ text: h.text }],
        })),
      ],
    });

    const languageNote = language ? `\n\n(Respond in this language: ${language})` : "";
    const prompt = `Context data from our website:\n${context}\n\nUser question: ${message}${languageNote}`;
    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
