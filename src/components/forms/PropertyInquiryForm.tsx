"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRecaptcha } from "@/lib/security/useRecaptcha";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function PropertyInquiryForm({ listingId }: { listingId: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { getToken } = useRecaptcha();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const recaptchaToken = await getToken("property_inquiry");
      const res = await fetch("/inquiries/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sellerListingId: listingId, recaptchaToken }),
      });
      if (res.ok === false) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="mt-3 rounded-md bg-emerald-50 p-3 text-xs font-medium text-emerald-700">Thanks! We\'ll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-2 border-t border-slate-100 pt-4">
      <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />
      <p className="text-xs font-semibold text-slate-700">Interested in this property?</p>
      <input {...register("name")} placeholder="Your name" className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs" />
      {errors.name && <p className="text-[10px] text-red-600">{errors.name.message}</p>}
      <input {...register("email")} type="email" placeholder="Email" className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs" />
      {errors.email && <p className="text-[10px] text-red-600">{errors.email.message}</p>}
      <input {...register("phone")} placeholder="Phone (optional)" className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs" />
      <button type="submit" disabled={status === "loading"} className="w-full rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
        {status === "loading" ? "Sending..." : "I\'m Interested"}
      </button>
      {status === "error" && <p className="text-[10px] text-red-600">Something went wrong.</p>}
    </form>
  );
}
