import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

ENRICHED_CONTENT = {
    "stratford": {
        "overview": "Stratford's transformation since hosting the 2012 Olympics remains one of the most significant urban regeneration stories in London. What was once a largely industrial part of East London is now anchored by Queen Elizabeth Olympic Park, the Westfield Stratford City shopping centre, and a growing cluster of media and technology employers relocating to the area.\n\nThe single biggest factor for investors is transport: Stratford sits on the Elizabeth Line, Jubilee Line, Central Line, and DLR, putting Canary Wharf, the City, and the West End all within a 15-20 minute commute. This connectivity has made the area increasingly attractive to young professionals priced out of more central London locations, while still offering meaningfully lower entry prices than zones 1-2.\n\nOngoing development around the Olympic Park — including new residential quarters at East Wick and Sweetwater — means the area's housing stock continues to expand, which investors should weigh against the strong underlying demand. Areas closest to the park and international station tend to command a premium and have shown the steadiest capital growth since 2012.\n\nFor investors comparing yield versus growth, Stratford sits closer to the middle of the London spectrum: yields are modest by UK regional standards but the area has delivered stronger capital appreciation than many outer London locations over the past decade, reflecting its ongoing repositioning as a genuine secondary London hub rather than a purely commuter suburb.",
        "faqs": [
            {"question": "Is Stratford good for investment?", "answer": "Yes, Stratford offers relatively affordable London prices with strong transport connectivity and ongoing regeneration, making it attractive for both yield and growth-focused investors."},
            {"question": "What transport links does Stratford have?", "answer": "Elizabeth Line, Jubilee Line, Central Line, and DLR services, giving direct access to Canary Wharf, the City, and the West End within 15-20 minutes."},
            {"question": "Is Stratford still developing?", "answer": "Yes, new residential quarters continue to be built around the Olympic Park, including East Wick and Sweetwater, so the area's housing supply is still expanding."},
            {"question": "How does Stratford compare to central London for investment?", "answer": "It offers significantly lower entry prices than zones 1-2 with comparable transport access, though yields remain modest by UK regional standards."}
        ]
    },
    "canary-wharf": {
        "overview": "Canary Wharf is London's second major financial district, home to the European headquarters of numerous global banks, law firms, and increasingly technology companies. For property investors, this concentration of high-earning corporate tenants has historically been the area's core appeal: a stable, well-paid tenant base with strong demand for quality apartments within walking distance of work.\n\nThe area has diversified considerably over the past decade. What began as a purely commercial district now includes substantial residential development, retail, and leisure space, reducing its historic dependence on office-hours footfall alone. The arrival of the Elizabeth Line has further cemented its connectivity, cutting journey times to Liverpool Street, Paddington, and Heathrow significantly.\n\nFor investors, Canary Wharf sits firmly at the capital-security end of the London market. Yields are lower than outer London or regional UK cities, reflecting the premium tenants pay for the location and building quality, but the area has historically shown resilience during downturns given the concentration of stable financial-sector employment.\n\nThe main consideration for investors is exposure to the financial services sector specifically — while diversification into tech and other sectors has reduced this somewhat, demand and pricing in Canary Wharf remain more closely tied to the health of the City of London's core industries than more residentially-focused London neighbourhoods.",
        "faqs": [
            {"question": "Is Canary Wharf good for investment?", "answer": "It offers stable, high-quality tenant demand from finance and professional-services workers, though yields are lower than emerging areas given the premium on location and building quality."},
            {"question": "Who typically rents in Canary Wharf?", "answer": "Predominantly finance, law, and increasingly technology professionals working in the district, often on corporate relocation packages."},
            {"question": "Has Canary Wharf diversified beyond finance?", "answer": "Yes, significant residential, retail, and leisure development has reduced the area's historic dependence on office-hours financial-sector footfall alone."},
            {"question": "What's the main risk for Canary Wharf investors?", "answer": "Demand remains more closely tied to the health of London's financial services sector than in more residentially-focused neighbourhoods, so it's a more concentrated economic bet."}
        ]
    },
}


def run():
    logger.info("Starting area content enrichment — batch 2")
    supabase = get_supabase_client()

    for slug, content in ENRICHED_CONTENT.items():
        supabase.table("areas").update({
            "overview": content["overview"],
            "faqs": content["faqs"],
        }).eq("slug", slug).execute()
        logger.success(f"Enriched: {slug}")

    logger.info("Batch 2 complete")


if __name__ == "__main__":
    run()
