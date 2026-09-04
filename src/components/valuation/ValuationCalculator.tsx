"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import areasData from "@/data/areas.json";
import { formatGBP } from "@/lib/utils/format";
import type { ValuationResult } from "@/types/property";

const valuationSchema = z.object({
  propertyType: z.enum(["studio", "1-bed", "2-bed", "3-bed", "house"]),
  condition: z.enum(["good", "average", "needs-renovation"]),
  areaSlug: z.string().min(1, "Please select an area"),
  email: z.string().email("Enter a valid email"),
  website: z.string().optional(),
});

type FormData = z.infer<typeof valuationSchema>;

export default function ValuationCalculator() {
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(valuationSchema) });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    setResult(null);
    try {
      const res = await fetch("/valuation/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setResult(json.result);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        {...register("website")}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
        <div>
          <label className="text-sm font-medium text-slate-700">Property type</label>
          <select
            {...register("propertyType")}
            defaultValue=""
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
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
          <label className="text-sm font-medium text-slate-700">Condition</label>
          <select
            {...register("condition")}
            defaultValue=""
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="" disabled>Select condition</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="needs-renovation">Needs renovation</option>
          </select>
          {errors.condition && <p className="mt-1 text-xs text-red-600">{errors.condition.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Area</label>
          <select
            {...register("areaSlug")}
            defaultValue=""
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="" disabled>Select area</option>
            {areasData.map((a) => (
              <option key={a.slug} value={a.slug}>{a.name}</option>
            ))}
          </select>
          {errors.areaSlug && <p className="mt-1 text-xs text-red-600">{errors.areaSlug.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {status === "loading" ? "Calculating..." : "Get Instant Valuation"}
        </button>
        {status === "error" && (
          <p className="text-sm font-medium text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>

      <div className="rounded-xl bg-slate-50 p-8">
        {!result ? (
          <p className="text-sm text-slate-600">
            Fill in the form to see your estimated property value based on live area data.
          </p>
        ) : (
          <div>
            <p className="text-sm text-slate-600">Estimated value</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{formatGBP(result.medium)}</p>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-slate-600">Low estimate</span>
              <span className="font-medium text-slate-900">{formatGBP(result.low)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-slate-600">High estimate</span>
              <span className="font-medium text-slate-900">{formatGBP(result.high)}</span>
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Estimate only, not a formal valuation. A detailed report has been sent to your email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
