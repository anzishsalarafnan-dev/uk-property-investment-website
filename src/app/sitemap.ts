import type { MetadataRoute } from "next";
import cities from "@/data/cities.json";
import areas from "@/data/areas.json";
import guides from "@/data/guides.json";
import blogPosts from "@/data/blog-posts.json";
import { SITE_URL } from "@/lib/utils/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/cities",
    "/map",
    "/valuation",
    "/guides",
    "/contact",
    "/about",
    "/blog",
    "/resources",
    "/resources/mortgage-calculator",
    "/resources/rental-yield-calculator",
    "/resources/rent-vs-buy",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/disclaimer",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const cityPages = cities.map((c) => ({
    url: `${SITE_URL}/cities/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const areaPages = areas.map((a) => ({
    url: `${SITE_URL}/cities/${a.citySlug}/${a.slug}`,
    lastModified: new Date(a.lastUpdated),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const guidePages = guides.map((g) => ({
    url: `${SITE_URL}/guides#${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages, ...areaPages, ...guidePages, ...blogPages];
}
