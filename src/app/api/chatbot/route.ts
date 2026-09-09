import { NextResponse } from "next/server";
import { z } from "zod";
import { getGeminiModel } from "@/lib/chatbot/gemini";
import { retrieveContext } from "@/lib/chatbot/retrieval";
import { isRateLimited, getClientIp } from "@/lib/security/rateLimit";

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z
    .array(z.object({ role: z.enum(["user", "model"]), text: z.string() }))
    .optional()
    .default([]),
});

const SYSTEM_INSTRUCTION = `You are a helpful assistant for a UK property investment website. Answer questions about UK cities, areas, prices, rental yields, growth projections, and investment guides using ONLY the context data provided below each question. If the context doesn't contain the answer, say you don't have that specific information and suggest the person use the Valuation tool or Contact page.

Always reply in the same language the user wrote in — if they write in Urdu, reply in Urdu; if English, reply in English; any language, match it.

Keep answers concise (2-4 sentences unless more detail is genuinely needed). Never invent prices, statistics, or facts not present in the provided context. This is not financial advice — for specific investment decisions, remind users to consult a professional when relevant.`;

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

    const { message, history } = parsed.data;
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

    const prompt = `Context data from our website:\n${context}\n\nUser question: ${message}`;
    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
