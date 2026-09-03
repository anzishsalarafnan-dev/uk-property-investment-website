import type { Metadata } from "next";
import ValuationCalculator from "@/components/valuation/ValuationCalculator";

export const metadata: Metadata = {
  title: "Instant Property Valuation",
  description: "Get an instant, free estimate of your UK property's value based on live market data.",
};

export default function ValuationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Instant Property Valuation</h1>
      <p className="mt-3 max-w-xl text-slate-500">
        Get a free, instant estimate of your property&apos;s value, based on the latest local
        market data. A full report will be emailed to you.
      </p>
      <div className="mt-10">
        <ValuationCalculator />
      </div>
    </div>
  );
}
