import Link from "next/link";
import { supabaseAdmin } from "@/lib/database/client";
import { getAllCities, getAllAreas, getAllGuides, getAllBlogPosts } from "@/lib/database/content";

export default async function AdminOverviewPage() {
  const [leadsResult, cities, areas, guides, blogPosts] = await Promise.all([
    supabaseAdmin().from("leads").select("*", { count: "exact", head: true }),
    getAllCities(),
    getAllAreas(),
    getAllGuides(),
    getAllBlogPosts(),
  ]);

  const stats = [
    { label: "Total Leads", value: leadsResult.count ?? 0, href: "/admin/leads" },
    { label: "Cities", value: cities.length, href: "/admin/cities" },
    { label: "Areas", value: areas.length, href: "/admin/areas" },
    { label: "Guides", value: guides.length, href: "/admin/guides" },
    { label: "Blog Posts", value: blogPosts.length, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-600">Overview of your site content and activity.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl bg-slate-50 p-6">
        <h2 className="font-semibold text-slate-900">Quick Links</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/leads" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100">
            View Leads
          </Link>
          <Link href="/admin/settings" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100">
            Site Settings
          </Link>
          <Link href="/" target="_blank" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100">
            View Live Site
          </Link>
        </div>
      </div>
    </div>
  );
}
