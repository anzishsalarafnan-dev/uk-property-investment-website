import type { Metadata } from "next";
import RentalYieldCalculator from "@/components/resources/RentalYieldCalculator";

export const metadata: Metadata = {
  title: "Rental Yield Calculator",
  description: "Calculate the gross and net rental yield for a UK property investment.",
};

export default function RentalYieldCalculatorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Rental Yield Calculator</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Work out your gross and net rental yield based on property price, rent, and expenses.
      </p>
      <div className="mt-10">
        <RentalYieldCalculator />
      </div>
    </div>
  );
}
