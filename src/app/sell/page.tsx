import type { Metadata } from "next";
import { getAllCities } from "@/lib/database/content";
import SellPropertyForm from "@/components/forms/SellPropertyForm";

export const metadata: Metadata = {
  title: "Sell Your Property",
  description: "List your property for sale and connect with interested UK investors.",
};

export default async function SellPage() {
  const cities = await getAllCities();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Sell Your Property</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        List your property and connect with investors actively looking to buy. Your contact
        details stay private — interested buyers reach out through us.
      </p>
      <div className="mt-10">
        <SellPropertyForm cities={cities.map((c) => ({ slug: c.slug, name: c.name }))} />
      </div>
    </div>
  );
}
