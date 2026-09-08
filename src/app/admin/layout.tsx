import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.isAdmin) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap gap-6">
          <Link href="/admin" className="text-sm font-semibold text-slate-900">Dashboard</Link>
          <Link href="/admin/leads" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Leads</Link>
          <Link href="/admin/cities" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Cities</Link>
          <Link href="/admin/areas" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Areas</Link>
          <Link href="/admin/reviews" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Reviews</Link>
          <Link href="/admin/settings" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Settings</Link>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            formAction={async () => {
              "use server";
              const s = await getSession();
              s.destroy();
              redirect("/login");
            }}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Sign out
          </button>
        </form>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
