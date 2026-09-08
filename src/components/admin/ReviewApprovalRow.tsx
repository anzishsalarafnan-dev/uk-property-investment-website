"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  is_approved: boolean;
  created_at: string;
}

export default function ReviewApprovalRow({ review }: { review: Review }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(approve: boolean) {
    setLoading(true);
    await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_approved: approve }),
    });
    router.refresh();
  }

  async function deleteReview() {
    setLoading(true);
    await fetch(`/api/admin/reviews/${review.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-900">{review.name} — {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
          <p className="text-xs text-slate-500">{review.email} · {new Date(review.created_at).toLocaleDateString("en-GB")}</p>
        </div>
        {review.is_approved && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Live</span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-700">{review.message}</p>
      <div className="mt-3 flex gap-2">
        {!review.is_approved && (
          <button
            onClick={() => updateStatus(true)}
            disabled={loading}
            className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Approve
          </button>
        )}
        {review.is_approved && (
          <button
            onClick={() => updateStatus(false)}
            disabled={loading}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-50"
          >
            Unpublish
          </button>
        )}
        <button
          onClick={deleteReview}
          disabled={loading}
          className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
