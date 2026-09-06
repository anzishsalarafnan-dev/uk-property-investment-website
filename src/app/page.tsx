import { getAllCities } from "@/lib/database/content";
import NewsletterForm from "@/components/forms/NewsletterForm";
import AnimatedHero from "@/components/home/AnimatedHero";
import AnimatedCityCard from "@/components/home/AnimatedCityCard";

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
