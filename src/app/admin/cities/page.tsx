import Link from "next/link";
import { getAllCities } from "@/lib/database/content";
import { formatGBP, formatPercent } from "@/lib/utils/format";

export default async function AdminCitiesPage() {
  const cities = await getAllCities();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Cities</h1>
      <p className="mt-1 text-sm text-slate-600">{cities.length} cities</p>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Avg. Price</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Yield</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Growth</th>
              <th className="px-4 py-3 font-semibold text-slate-700"></th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.slug} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{city.name}</td>
                <td className="px-4 py-3 text-slate-600">{formatGBP(city.avgPrice)}</td>
                <td className="px-4 py-3 text-slate-600">{formatPercent(city.avgYield)}</td>
                <td className="px-4 py-3 text-slate-600">{formatPercent(city.growthRate)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/cities/${city.slug}`} className="font-medium text-slate-900 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
