import type { Metadata } from "next";
import RentVsBuyCalculator from "@/components/resources/RentVsBuyCalculator";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator",
  description: "Compare the total cost of renting versus buying a UK property over time.",
};

export default function RentVsBuyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Rent vs Buy Calculator</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Compare the total cost of renting versus buying over your chosen time period.
      </p>
      <div className="mt-10">
        <RentVsBuyCalculator />
      </div>
    </div>
  );
}
