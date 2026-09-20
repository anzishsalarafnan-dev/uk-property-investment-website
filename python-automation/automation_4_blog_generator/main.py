"""
Automation 4: Daily Blog Post Generator

Writes one new blog post per day using Google Gemini, grounded ONLY in
real data already in our own database (cities' live avg_price/yield/growth,
which Automation 1 keeps synced from UK Land Registry). This avoids
inventing facts: the model is given real numbers and asked to write
analysis around them, not asked to recall external knowledge.

Run manually:  python -m automation_4_blog_generator.main
"""

import sys
import os
import re
import json
from datetime import date

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import google.generativeai as genai
from loguru import logger
from shared.database import get_supabase_client

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

CATEGORIES = ["Market Updates", "Investment Guides", "First-Time Buyers"]


def slugify(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug.strip())
    return slug[:80]


def build_prompt(cities: list[dict]) -> str:
    data_lines = "\n".join(
        f"- {c['name']}: avg price £{c['avg_price']}, rental yield {c['avg_yield']}%, "
        f"5yr growth {c['growth_rate']}%"
        for c in cities
    )
    today = date.today().isoformat()

    return f"""You are writing one blog post for a UK property investment website, dated {today}.

Use ONLY the following real, current data — do not invent any other statistics:
{data_lines}

Write a blog post (600-900 words) comparing 2-3 of these cities for property investors,
using only the numbers given above. Pick an angle (e.g. best yield, best growth, best for
first-time investors). Do not mention specific street addresses, schools, or facts not
provided above.

Respond ONLY with valid JSON in this exact shape, no markdown fences, no extra text:
{{
  "title": "...",
  "excerpt": "One or two sentence summary, under 200 characters",
  "content": "Full post body, paragraphs separated by \\n\\n",
  "category": "one of: Market Updates, Investment Guides, First-Time Buyers"
}}"""


def run():
    logger.info("Starting Automation 4: Daily blog post generator")

    if not GEMINI_API_KEY:
        logger.error("GEMINI_API_KEY not set — aborting")
        return

    supabase = get_supabase_client()

    cities_result = supabase.table("cities").select("name, avg_price, avg_yield, growth_rate").execute()
    cities = cities_result.data or []

    if not cities:
        logger.warning("No cities found — aborting")
        return

    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-flash-lite-latest")

    prompt = build_prompt(cities)

    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip()
        raw_text = re.sub(r"^```json\s*|\s*```$", "", raw_text.strip())
        post = json.loads(raw_text)
    except Exception as e:
        logger.error(f"Failed to generate or parse post: {e}")
        return

    slug = slugify(post["title"]) + "-" + date.today().isoformat()

    row = {
        "slug": slug,
        "title": post["title"],
        "excerpt": post["excerpt"],
        "content": post["content"],
        "category": post.get("category", "Market Updates"),
        "author": "Investment Team",
        "published_at": date.today().isoformat(),
        "read_time_minutes": max(3, len(post["content"].split()) // 200),
    }

    try:
        supabase.table("blog_posts").insert(row).execute()
        logger.success(f"Published new post: {post['title']}")
    except Exception as e:
        logger.error(f"Failed to save post: {e}")


if __name__ == "__main__":
    run()
