import { getAllCities } from "@/lib/database/content";
import NewsletterForm from "@/components/forms/NewsletterForm";
import AnimatedHero from "@/components/home/AnimatedHero";
import AnimatedCityCard from "@/components/home/AnimatedCityCard";
import ReviewsSection from "@/components/home/ReviewsSection";

export const revalidate = 3600;

export default async function HomePage() {
  const cities = await getAllCities();

  return (
    <div>
      <AnimatedHero />

      <section className="mx-auto max-w-7xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Featured Cities</h2>
        <p className="mt-2 text-slate-600">
          Live pricing and yield data across 8 major UK investment cities.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city, i) => (
            <AnimatedCityCard key={city.slug} city={city} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <a href="/listings/sell" className="group rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-bold">Browse Properties for Sale</h3>
            <p className="mt-2 text-sm text-slate-300">See listings from sellers across the UK, with photos and pricing.</p>
            <span className="mt-4 inline-block text-sm font-semibold text-[var(--gold-light)] group-hover:underline">View Listings &rarr;</span>
          </a>
          <a href="/sell" className="group rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-slate-900">List Your Property</h3>
            <p className="mt-2 text-sm text-slate-600">Sell your property and connect with interested investors. Your contact details stay private.</p>
            <span className="mt-4 inline-block text-sm font-semibold text-slate-900 group-hover:underline">Get Started &rarr;</span>
          </a>
        </div>
      </section>

      <ReviewsSection />

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Get Monthly UK Market Updates</h2>
        <p className="mt-2 text-slate-600">
          New area reports and market trends, straight to your inbox. No spam.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
