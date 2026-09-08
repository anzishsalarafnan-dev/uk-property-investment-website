import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/utils/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          {SITE_NAME}
        </Link>
        <div className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <Link
          href="/valuation"
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--navy-deep)] hover:shadow-lg dark:bg-[var(--gold)] dark:text-slate-900"
        >
          Get Valuation
        </Link>
      </nav>
    </header>
  );
}
