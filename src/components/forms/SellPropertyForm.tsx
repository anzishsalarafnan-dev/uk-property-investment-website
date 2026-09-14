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
  citySlug: z.string().min(1, "Please select a city"),
  propertyType: z.string().min(1, "Please select a type"),
  askingPrice: z.number().positive("Enter a valid price"),
  bedrooms: z.number().optional(),
  description: z.string().optional(),
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function SellPropertyForm({ cities }: { cities: { slug: string; name: string }[] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { getToken } = useRecaptcha();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const recaptchaToken = await getToken("sell_submit");
      const res = await fetch("/sell/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-md bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
        Thanks! Your listing will appear on the site once reviewed by our team.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

      <div>
        <label className="text-sm font-medium text-slate-700">Your name</label>
        <input {...register("name")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input {...register("email")} type="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Phone (optional)</label>
        <input {...register("phone")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">City</label>
        <select {...register("citySlug")} defaultValue="" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="" disabled>Select city</option>
          {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        {errors.citySlug && <p className="mt-1 text-xs text-red-600">{errors.citySlug.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Property type</label>
        <select {...register("propertyType")} defaultValue="" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="" disabled>Select type</option>
          <option value="studio">Studio</option>
          <option value="1-bed">1 Bedroom</option>
          <option value="2-bed">2 Bedroom</option>
          <option value="3-bed">3 Bedroom</option>
          <option value="house">House</option>
        </select>
        {errors.propertyType && <p className="mt-1 text-xs text-red-600">{errors.propertyType.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Asking price (£)</label>
        <input {...register("askingPrice", { valueAsNumber: true })} type="number" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.askingPrice && <p className="mt-1 text-xs text-red-600">{errors.askingPrice.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Bedrooms (optional)</label>
        <input {...register("bedrooms", { valueAsNumber: true })} type="number" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Description (optional)</label>
        <textarea {...register("description")} rows={4} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <button type="submit" disabled={status === "loading"} className="rounded-md bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
        {status === "loading" ? "Submitting..." : "Submit Listing"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}
