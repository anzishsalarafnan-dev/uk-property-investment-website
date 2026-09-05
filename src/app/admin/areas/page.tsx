import Link from "next/link";
import { getAllAreas } from "@/lib/database/content";
import { formatGBP, formatPercent } from "@/lib/utils/format";

export default async function AdminAreasPage() {
  const areas = await getAllAreas();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Areas</h1>
      <p className="mt-1 text-sm text-slate-600">{areas.length} areas</p>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 font-semibold text-slate-700">City</th>
              <th className="px-4 py-3 font-semibold text-slate-700">1-bed</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Yield</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Score</th>
              <th className="px-4 py-3 font-semibold text-slate-700"></th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.slug} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{area.name}</td>
                <td className="px-4 py-3 text-slate-600 capitalize">{area.citySlug}</td>
                <td className="px-4 py-3 text-slate-600">{formatGBP(area.pricing.oneBed)}</td>
                <td className="px-4 py-3 text-slate-600">{formatPercent(area.rentalYield)}</td>
                <td className="px-4 py-3 text-slate-600">{area.investmentScore}/10</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/areas/${area.slug}`} className="font-medium text-slate-900 hover:underline">
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
