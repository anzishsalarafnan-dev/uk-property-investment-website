"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getCityPhotoUrl } from "@/lib/utils/images";
import { formatGBP, formatPercent } from "@/lib/utils/format";
import type { City } from "@/types/city";

export default function AnimatedCityCard({ city, index }: { city: City; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    >
      <Link
        href={`/cities/${city.slug}`}
        className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-[var(--gold)]"
      >
        <div className="relative h-28 overflow-hidden">
          <Image
            src={getCityPhotoUrl(city.slug, city.heroImage)}
            alt={city.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900">{city.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{city.tagline}</p>
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Avg. price</span>
              <span className="font-semibold text-slate-900">{formatGBP(city.avgPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Rental yield</span>
              <span className="rounded-full bg-[var(--gold)]/10 px-2 py-0.5 font-semibold text-[var(--gold)]">
                {formatPercent(city.avgYield)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
