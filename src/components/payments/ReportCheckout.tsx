"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type EmailForm = z.infer<typeof emailSchema>;

const PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!;
const CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!;
const PADDLE_ENV = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production" ? "production" : "sandbox";

export default function ReportCheckout() {
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema) });

  useEffect(() => {
    if (!CLIENT_TOKEN) return;
    initializePaddle({
      environment: PADDLE_ENV,
      token: CLIENT_TOKEN,
    }).then((instance) => {
      if (instance) setPaddle(instance);
    });
  }, []);

  function onSubmit(data: EmailForm) {
    if (!paddle || !PRICE_ID) return;

    paddle.Checkout.open({
      items: [{ priceId: PRICE_ID, quantity: 1 }],
      customer: { email: data.email },
      settings: {
        displayMode: "overlay",
        variant: "one-page",
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700">Your email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!paddle}
        className="w-full rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {paddle ? "Buy Report — £29.00" : "Loading..."}
      </button>

      <p className="text-center text-xs text-slate-500">
        Secure checkout powered by Paddle. Report delivered instantly by email.
      </p>
    </form>
  );
}
