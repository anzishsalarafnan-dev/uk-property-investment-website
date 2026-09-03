import Link from "next/link";
import { SITE_NAME } from "@/lib/utils/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{SITE_NAME}</h3>
            <p className="mt-2 text-sm text-slate-500">
              Helping investors find the right UK property, backed by live market data.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Explore</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-500">
              <li><Link href="/cities" className="hover:text-slate-900">Cities</Link></li>
              <li><Link href="/map" className="hover:text-slate-900">Map</Link></li>
              <li><Link href="/guides" className="hover:text-slate-900">Guides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Company</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-slate-900">About</Link></li>
              <li><Link href="/blog" className="hover:text-slate-900">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-500">
              <li><Link href="/legal/privacy" className="hover:text-slate-900">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-slate-900">Terms of Use</Link></li>
              <li><Link href="/legal/disclaimer" className="hover:text-slate-900">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-gray-200 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Prices and projections are estimates only, not financial advice.
        </p>
      </div>
    </footer>
  );
}
