"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRecaptcha } from "@/lib/security/useRecaptcha";

const reviewSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Please write at least 10 characters"),
  website: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { getToken } = useRecaptcha();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 5 } });

  async function onSubmit(data: ReviewFormData) {
    setStatus("loading");
    try {
      const recaptchaToken = await getToken("review_submit");
      const res = await fetch("/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-md bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
        Thanks for your review! It will appear on the site once approved by our team.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <input
        type="text"
        {...register("website")}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div>
        <label className="text-sm font-medium text-slate-700">Name</label>
        <input {...register("name")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input {...register("email")} type="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Rating</label>
        <select {...register("rating", { valueAsNumber: true })} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value={5}>5 — Excellent</option>
          <option value={4}>4 — Good</option>
          <option value={3}>3 — Average</option>
          <option value={2}>2 — Poor</option>
          <option value={1}>1 — Very Poor</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Your review</label>
        <textarea {...register("message")} rows={5} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {status === "loading" ? "Submitting..." : "Submit Review"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}
