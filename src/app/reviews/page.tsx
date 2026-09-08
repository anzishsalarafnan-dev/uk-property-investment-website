import type { Metadata } from "next";
import ReviewForm from "@/components/forms/ReviewForm";

export const metadata: Metadata = {
  title: "Share Your Review",
  description: "Tell us about your experience investing in UK property with us.",
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Share Your Review</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        We'd love to hear about your experience. Reviews are checked by our team before appearing on the site.
      </p>
      <div className="mt-10">
        <ReviewForm />
      </div>
    </div>
  );
}
