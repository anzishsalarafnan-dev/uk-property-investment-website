import type { Metadata } from "next";
import { getAllCities } from "@/lib/database/content";
import BuyRequestForm from "@/components/forms/BuyRequestForm";

export const metadata: Metadata = {
  title: "Looking to Buy?",
  description: "Tell us what you're looking for and we'll help match you with the right property.",
};

export default async function BuyPage() {
  const cities = await getAllCities();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Looking to Buy?</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Tell us what you&apos;re looking for — city, budget, and property type — and we&apos;ll help
        match you with the right opportunity.
      </p>
      <div className="mt-10">
        <BuyRequestForm cities={cities.map((c) => ({ slug: c.slug, name: c.name }))} />
      </div>
    </div>
  );
}
