import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

ENRICHED_CONTENT = {
    "bristol-city-centre": {
        "overview": "Bristol City Centre sits at the core of what has become one of the UK's most dynamic regional tech economies, with the area benefiting directly from the growth of companies in aerospace, creative media, and software that have made Bristol one of the highest-earning cities outside London on average salary measures.\n\nThe city's harbourside redevelopment, including the Wapping Wharf and Finzels Reach schemes, has brought substantial new residential stock to the city centre over the past decade, appealing to the young professionals drawn to Bristol's tech and creative sector employers, alongside the university-adjacent population from the University of Bristol and University of the West of England.\n\nBristol's reputation for quality of life — consistently ranking among the UK's most liveable cities in independent surveys — has supported strong tenant demand and contributed to some of the strongest capital growth of any UK city outside London over the past decade, a trend that has continued even as the wider UK market has cooled in various periods.\n\nFor investors, the main consideration is that Bristol's strong reputation and consistent demand have pushed entry prices up correspondingly, meaning yields are more modest than comparable Northern cities. Bristol suits investors prioritising capital growth and tenant quality over maximum immediate rental return.",
        "faqs": [
            {"question": "Is Bristol City Centre good for investment?", "answer": "It offers strong capital growth potential thanks to Bristol's thriving tech and creative sectors, though yields are moderate reflecting higher entry prices than comparable Northern cities."},
            {"question": "What industries drive Bristol's economy?", "answer": "Aerospace, creative media, and software/technology are major employment sectors, contributing to Bristol having some of the highest average salaries of any UK city outside London."},
            {"question": "What new developments are in Bristol City Centre?", "answer": "Harbourside schemes including Wapping Wharf and Finzels Reach have brought substantial new residential stock to the city centre over the past decade."},
            {"question": "Is Bristol good for yield or growth?", "answer": "Bristol has historically favoured investors prioritising capital growth and tenant quality — yields are more modest than Northern cities given higher entry prices."}
        ]
    },
    "clifton": {
        "overview": "Clifton is Bristol's most prestigious residential neighbourhood, known for its Georgian and Regency terraces, the iconic Clifton Suspension Bridge, and a village-like high street atmosphere that has made it consistently one of the most sought-after addresses in the South West of England.\n\nThe area's appeal rests on a combination of architectural heritage, some of the best-performing schools in Bristol (a significant driver of demand from professional families), and an established, low-turnover residential character quite distinct from Bristol's more transient city centre rental market.\n\nClifton's tenant base skews toward professional families and established professionals seeking long-term homes rather than short-stay young renters, which typically means longer average tenancies and lower void periods, though at correspondingly lower gross yields than areas catering to a more transient population.\n\nFor investors, Clifton represents a capital-preservation and steady-growth proposition rather than a high-yield opportunity. Property values have historically shown resilience during broader market downturns given the area's constrained supply — very little new development is possible within its conservation area status — and consistent demand from buyers and tenants who specifically want to live in Clifton rather than Bristol more generally.",
        "faqs": [
            {"question": "Is Clifton good for investment?", "answer": "Clifton suits investors prioritising capital security and long-term tenants over high rental yield, given its established, low-turnover residential character."},
            {"question": "Why is Clifton popular with families?", "answer": "The area has some of the best-performing schools in Bristol, along with Georgian architecture and a village-like atmosphere that appeals strongly to professional families."},
            {"question": "Can new properties be built in Clifton?", "answer": "Very limited — much of Clifton falls within a conservation area, which significantly restricts new development and helps protect existing property values."},
            {"question": "What kind of tenants does Clifton attract?", "answer": "Predominantly professional families and established professionals seeking long-term homes, resulting in longer average tenancies than more transient rental markets."}
        ]
    },
}


def run():
    logger.info("Starting area content enrichment — batch 6")
    supabase = get_supabase_client()

    for slug, content in ENRICHED_CONTENT.items():
        supabase.table("areas").update({
            "overview": content["overview"],
            "faqs": content["faqs"],
        }).eq("slug", slug).execute()
        logger.success(f"Enriched: {slug}")

    logger.info("Batch 6 complete")


if __name__ == "__main__":
    run()
