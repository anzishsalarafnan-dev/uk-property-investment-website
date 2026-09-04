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
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex gap-6">
          <Link href="/admin" className="text-sm font-semibold text-slate-900">Leads</Link>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            formAction={async () => {
              "use server";
              const s = await getSession();
              s.destroy();
              redirect("/login");
            }}
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            Sign out
          </button>
        </form>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
