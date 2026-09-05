"""
One-time migration: copies cities.json and areas.json from the Next.js app
into the new Supabase cities/areas tables.

Run manually:  python -m shared.migrate_content
"""

import sys
import os
import json
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "src", "data")


def load_json(filename):
    with open(os.path.join(DATA_DIR, filename), "r") as f:
        return json.load(f)


def migrate_cities(supabase):
    cities = load_json("cities.json")
    rows = []
    for c in cities:
        rows.append({
            "slug": c["slug"],
            "name": c["name"],
            "tagline": c["tagline"],
            "hero_image": c.get("heroImage"),
            "population": c.get("population"),
            "avg_price": c.get("avgPrice"),
            "avg_yield": c.get("avgYield"),
            "growth_rate": c.get("growthRate"),
            "description": c.get("description"),
            "latitude": c.get("latitude"),
            "longitude": c.get("longitude"),
        })
    supabase.table("cities").upsert(rows, on_conflict="slug").execute()
    logger.success(f"Migrated {len(rows)} cities")


def migrate_areas(supabase):
    areas = load_json("areas.json")
    rows = []
    for a in areas:
        rows.append({
            "slug": a["slug"],
            "city_slug": a["citySlug"],
            "name": a["name"],
            "images": a.get("images", []),
            "investment_score": a.get("investmentScore"),
            "pricing": a.get("pricing"),
            "rental_yield": a.get("rentalYield"),
            "growth_projection": a.get("growthProjection"),
            "last_updated": a.get("lastUpdated"),
            "overview": a.get("overview"),
            "amenities": a.get("amenities"),
            "faqs": a.get("faqs", []),
            "latitude": a.get("latitude"),
            "longitude": a.get("longitude"),
        })
    supabase.table("areas").upsert(rows, on_conflict="slug").execute()
    logger.success(f"Migrated {len(rows)} areas")


def run():
    logger.info("Starting content migration: JSON -> Supabase")
    supabase = get_supabase_client()
    migrate_cities(supabase)
    migrate_areas(supabase)
    migrate_guides(supabase)
    migrate_blog_posts(supabase)
    logger.info("Migration complete")





def migrate_guides(supabase):
    guides = load_json("guides.json")
    rows = []
    for g in guides:
        rows.append({
            "slug": g["slug"],
            "title": g["title"],
            "type": g["type"],
            "city_slug": g.get("citySlug"),
            "description": g.get("description"),
            "preview_images": g.get("previewImages", []),
            "pdf_path": g.get("pdfPath"),
        })
    supabase.table("guides").upsert(rows, on_conflict="slug").execute()
    logger.success(f"Migrated {len(rows)} guides")


def migrate_blog_posts(supabase):
    posts = load_json("blog-posts.json")
    rows = []
    for p in posts:
        rows.append({
            "slug": p["slug"],
            "title": p["title"],
            "excerpt": p["excerpt"],
            "content": p["content"],
            "category": p["category"],
            "author": p["author"],
            "published_at": p["publishedAt"],
            "read_time_minutes": p.get("readTimeMinutes"),
        })
    supabase.table("blog_posts").upsert(rows, on_conflict="slug").execute()
    logger.success(f"Migrated {len(rows)} blog posts")


if __name__ == "__main__":
    run()
