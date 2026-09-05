import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/database/content";
import CityEditForm from "@/components/admin/CityEditForm";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminCityEditPage({ params }: Props) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Edit {city.name}</h1>
      <div className="mt-6 max-w-2xl">
        <CityEditForm city={city} />
      </div>
    </div>
  );
}
