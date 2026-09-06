"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy-deep)] py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-deep)] via-slate-900 to-black opacity-95" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--gold)] opacity-10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[var(--gold)] opacity-5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[var(--gold-light)]"
        >
          UK Property Investment
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
        >
          Cities, Areas & Live Valuations for 2026
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300"
        >
          Choose your city, explore areas, see prices, schools, hospitals, and 5-year growth. Get an instant PDF valuation for your property.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/cities"
            className="rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-[var(--gold-light)] hover:shadow-xl"
          >
            Browse Cities
          </Link>
          <Link
            href="/guides"
            className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Get Free Area Guide
          </Link>
          <Link
            href="/map"
            className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Explore Map
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
