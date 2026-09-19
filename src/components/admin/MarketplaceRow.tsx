"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarketplaceRow({
  type,
  id,
  name,
  email,
  phone,
  summary,
  isApproved,
}: {
  type: "seller" | "buyer";
  id: string;
  name: string;
  email: string;
  phone: string | null;
  summary: string;
  isApproved: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function update(approve: boolean) {
    setLoading(true);
    await fetch("/api/admin/marketplace/" + type + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_approved: approve }),
    });
    router.refresh();
  }

  async function remove() {
    setLoading(true);
    await fetch("/api/admin/marketplace/" + type + "/" + id, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{email}{phone ? " · " + phone : ""}</p>
        </div>
        {isApproved && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Live</span>}
      </div>
      <p className="mt-2 text-sm text-slate-700">{summary}</p>
      <div className="mt-3 flex gap-2">
        {isApproved === false && (
          <button onClick={() => update(true)} disabled={loading} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">Approve</button>
        )}
        {isApproved === true && (
          <button onClick={() => update(false)} disabled={loading} className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-50">Unpublish</button>
        )}
        <button onClick={remove} disabled={loading} className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50">Delete</button>
      </div>
    </div>
  );
}
