import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxurious British Red-Brick Residential Property in Birmingham"
          fill
          priority
          className="object-cover object-center opacity-40 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            UK Property Investment Specialists
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            High-Yield Residential <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Investments in Birmingham
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 font-light leading-relaxed">
            Data-backed buy-to-let opportunities, off-market deals, and tailored portfolio management designed for high-net-worth investors and institutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/listings/buy"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-950 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-all shadow-lg hover:shadow-emerald-400/20"
            >
              Explore Off-Market Deals
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border border-slate-700 bg-slate-800/60 backdrop-blur-md rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              Submit Your Property
            </Link>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">8.4%</div>
              <div className="text-xs sm:text-sm text-slate-400">Avg. Gross Yield</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">£45M+</div>
              <div className="text-xs sm:text-sm text-slate-400">Transactions Managed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
              <div className="text-xs sm:text-sm text-slate-400">Fully Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
