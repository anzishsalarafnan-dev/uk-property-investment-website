"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Area } from "@/types/area";

export default function AreaEditForm({ area }: { area: Area }) {
  const router = useRouter();
  const [form, setForm] = useState({
    investmentScore: area.investmentScore,
    studio: area.pricing.studio,
    oneBed: area.pricing.oneBed,
    twoBed: area.pricing.twoBed,
    threeBed: area.pricing.threeBed,
    rentalYield: area.rentalYield,
    growthProjection: area.growthProjection,
    overview: area.overview,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await fetch(`/api/admin/areas/${area.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("saved");
      router.refresh();
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Investment score (/10)</label>
          <input
            type="number"
            step="0.1"
            value={form.investmentScore}
            onChange={(e) => setForm({ ...form, investmentScore: Number(e.target.value) })}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Rental yield (%)</label>
          <input
            type="number"
            step="0.1"
            value={form.rentalYield}
            onChange={(e) => setForm({ ...form, rentalYield: Number(e.target.value) })}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">5yr growth projection (%)</label>
        <input
          type="number"
          step="0.1"
          value={form.growthProjection}
          onChange={(e) => setForm({ ...form, growthProjection: Number(e.target.value) })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700">Pricing (£)</p>
        <div className="mt-1 grid grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-slate-600">Studio</label>
            <input
              type="number"
              value={form.studio}
              onChange={(e) => setForm({ ...form, studio: Number(e.target.value) })}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">1-bed</label>
            <input
              type="number"
              value={form.oneBed}
              onChange={(e) => setForm({ ...form, oneBed: Number(e.target.value) })}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">2-bed</label>
            <input
              type="number"
              value={form.twoBed}
              onChange={(e) => setForm({ ...form, twoBed: Number(e.target.value) })}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600">3-bed</label>
            <input
              type="number"
              value={form.threeBed}
              onChange={(e) => setForm({ ...form, threeBed: Number(e.target.value) })}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Overview</label>
        <textarea
          value={form.overview}
          onChange={(e) => setForm({ ...form, overview: e.target.value })}
          rows={8}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {status === "saving" ? "Saving..." : "Save Changes"}
      </button>
      {status === "saved" && <span className="ml-3 text-sm font-medium text-emerald-600">Saved!</span>}
      {status === "error" && <span className="ml-3 text-sm font-medium text-red-600">Failed to save.</span>}
    </form>
  );
}
