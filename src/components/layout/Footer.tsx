import Link from "next/link";
import { SITE_NAME } from "@/lib/utils/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{SITE_NAME}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Helping investors find the right UK property, backed by live market data.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Explore</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/cities" className="hover:text-slate-900 dark:hover:text-white">Cities</Link></li>
              <li><Link href="/map" className="hover:text-slate-900 dark:hover:text-white">Map</Link></li>
              <li><Link href="/guides" className="hover:text-slate-900 dark:hover:text-white">Guides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-slate-900 dark:hover:text-white">About</Link></li>
              <li><Link href="/blog" className="hover:text-slate-900 dark:hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900 dark:hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/legal/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-slate-900 dark:hover:text-white">Terms of Use</Link></li>
              <li><Link href="/legal/disclaimer" className="hover:text-slate-900 dark:hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-gray-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Prices and projections are estimates only, not financial advice.
        </p>
      </div>
    </footer>
  );
}
