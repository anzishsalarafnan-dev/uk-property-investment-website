import Link from "next/link";
import type { Metadata } from "next";
import posts from "@/data/blog-posts.json";

export const metadata: Metadata = {
  title: "Blog — UK Property Investment Insights",
  description: "Market updates, investment guides, and practical advice for UK property investors.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Market updates, investment guides, and practical advice for UK property investors.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {post.category}
            </span>
            <h2 className="mt-3 text-lg font-bold text-slate-900">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
              <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>•</span>
              <span>{post.readTimeMinutes} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
