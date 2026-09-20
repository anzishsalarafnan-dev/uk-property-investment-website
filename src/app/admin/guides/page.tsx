import Link from "next/link";
import { getAllGuides } from "@/lib/database/content";

export default async function AdminGuidesPage() {
  const guides = await getAllGuides();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Guides</h1>
      <p className="mt-1 text-sm text-slate-600">{guides.length} guides</p>
      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 font-semibold text-slate-700"></th>
            </tr>
          </thead>
          <tbody>
            {guides.map((g) => (
              <tr key={g.slug} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{g.title}</td>
                <td className="px-4 py-3 text-slate-600">{g.type}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={"/admin/guides/" + g.slug} className="font-medium text-slate-900 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
