import { Paddle, Environment } from "@paddle/paddle-node-sdk";

const apiKey = process.env.PADDLE_API_KEY;
const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
  ? Environment.production
  : Environment.sandbox;

export function getPaddleClient(): Paddle {
  if (!apiKey) {
    throw new Error("PADDLE_API_KEY is not configured");
  }
  return new Paddle(apiKey, { environment });
}
