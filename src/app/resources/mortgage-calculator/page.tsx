import type { Metadata } from "next";
import MortgageCalculator from "@/components/resources/MortgageCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Calculate your monthly mortgage payment for a UK property investment.",
};

export default function MortgageCalculatorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Mortgage Calculator</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Estimate your monthly mortgage payment based on property price, deposit, interest rate, and term.
      </p>
      <div className="mt-10">
        <MortgageCalculator />
      </div>
    </div>
  );
}
