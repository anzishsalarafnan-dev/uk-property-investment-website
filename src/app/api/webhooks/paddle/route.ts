import { NextResponse } from "next/server";
import { getPaddleClient } from "@/lib/payments/paddle";
import { sendEmail } from "@/lib/email/sender";

export async function POST(request: Request) {
  const signature = request.headers.get("paddle-signature") || "";
  const rawBody = await request.text();

  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("PADDLE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  try {
    const paddle = getPaddleClient();
    const eventData = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);

    if (eventData.eventType === "transaction.completed") {
      const transaction = eventData.data;
      let customerEmail: string | null = null;

      if (transaction.customerId) {
        try {
          const customer = await paddle.customers.get(transaction.customerId);
          customerEmail = customer.email;
        } catch (e) {
          console.error("Failed to fetch customer for email:", e);
        }
      }

      if (customerEmail) {
        await sendEmail({
          to: customerEmail,
          subject: "Your Premium Investment Report",
          html: `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
            <h1 style="font-size: 20px;">Thank you for your purchase!</h1>
            <p style="color: #475569;">Your Premium Investment Report is being prepared and will be sent to you shortly. If you have any questions, feel free to contact us.</p>
          </div>`,
        });
        console.log("Fulfillment email sent to:", customerEmail);
      } else {
        console.warn("No customer email found for transaction:", transaction.id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Paddle webhook verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
