"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Guide } from "@/types/guide";

export default function GuideEditForm({ guide }: { guide: Guide }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: guide.title,
    description: guide.description || "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await fetch("/api/admin/guides/" + guide.slug, {
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
      <div>
        <label className="text-sm font-medium text-slate-700">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
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
