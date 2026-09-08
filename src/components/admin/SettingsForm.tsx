"use client";

import { useState } from "react";

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [form, setForm] = useState({
    contact_email: settings.contact_email || "",
    contact_phone: settings.contact_phone || "",
    whatsapp_number: settings.whatsapp_number || "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "saved" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <label className="text-sm font-medium text-slate-700">Contact email</label>
        <input
          type="email"
          value={form.contact_email}
          onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Contact phone</label>
        <input
          value={form.contact_phone}
          onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">WhatsApp number</label>
        <input
          value={form.whatsapp_number}
          onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
          placeholder="e.g. 447123456789"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {status === "saving" ? "Saving..." : "Save Settings"}
      </button>
      {status === "saved" && <span className="ml-3 text-sm font-medium text-emerald-600">Saved!</span>}
      {status === "error" && <span className="ml-3 text-sm font-medium text-red-600">Failed to save.</span>}
    </form>
  );
}
