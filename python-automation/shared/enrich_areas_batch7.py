import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

ENRICHED_CONTENT = {
    "edinburgh-city-centre": {
        "overview": "Edinburgh City Centre benefits from a uniquely diversified demand base: the city's status as Scotland's capital and a major financial services hub provides year-round professional tenant demand, while the world-famous Edinburgh Festival Fringe and steady year-round tourism support a substantial short-let and serviced-apartment market alongside traditional residential lets.\n\nThe city's UNESCO World Heritage Old and New Town status means new development is tightly restricted within the historic core, creating a genuinely supply-constrained market that has supported consistent capital growth and historically low void periods — landlords in the city centre have typically found it straightforward to re-let properties quickly given sustained demand against limited stock.\n\nEdinburgh's universities, including the University of Edinburgh, one of the most internationally renowned in the UK, add a further layer of demand from both students and the substantial number of graduates who remain in the city for its strong graduate job market in finance, technology, and the public sector.\n\nFor investors, Edinburgh City Centre offers a relatively rare combination of heritage-driven supply constraint with genuine economic diversity across finance, tourism, education, and government employment, translating into lower volatility than many single-industry-dependent UK cities, albeit with entry prices reflecting this stability and desirability.",
        "faqs": [
            {"question": "Is Edinburgh City Centre good for investment?", "answer": "Yes, low void periods and strong, diversified demand from finance, tourism, and education sectors make it a stable investment choice, though entry prices reflect this desirability."},
            {"question": "Why is new development limited in Edinburgh City Centre?", "answer": "The Old and New Town areas hold UNESCO World Heritage status, which significantly restricts new development and helps keep the market supply-constrained."},
            {"question": "Does the Edinburgh Festival affect rental demand?", "answer": "Yes, the Festival Fringe and year-round tourism support a substantial short-let and serviced-apartment market alongside traditional residential lets in the city centre."},
            {"question": "What industries support Edinburgh's rental market?", "answer": "Financial services, tourism, education (including the University of Edinburgh), and public sector employment together provide a diversified and relatively stable demand base."}
        ]
    },
    "leith": {
        "overview": "Leith has undergone a dramatic transformation over the past two decades, evolving from Edinburgh's historic and somewhat overlooked docklands into one of the city's most talked-about neighbourhoods, driven substantially by the extension of Edinburgh Trams to Leith Walk and the ongoing waterfront regeneration around the historic port.\n\nThe area has developed a strong independent food and drink scene, with The Shore and surrounding streets home to some of Edinburgh's most acclaimed restaurants, while retaining more affordable property prices than the adjacent New Town, making it increasingly attractive to young professionals and first-time buyers being priced out of the city centre.\n\nOngoing waterfront development, including new residential schemes along the historic docks, means Leith's housing supply is still expanding, though demand has consistently kept pace given the area's improving reputation, transport connectivity, and relative affordability within the wider Edinburgh market.\n\nFor investors, Leith represents one of Edinburgh's stronger growth opportunities, having already delivered substantial capital appreciation as its regeneration has progressed, while continuing to offer better value and marginally stronger yields than the more established, supply-constrained city centre core.",
        "faqs": [
            {"question": "Is Leith good for investment?", "answer": "New tram connectivity and ongoing waterfront regeneration make Leith one of Edinburgh's strongest growth areas, with better value than the adjacent city centre."},
            {"question": "How has the tram extension affected Leith?", "answer": "The Edinburgh Trams extension to Leith Walk significantly improved connectivity to the city centre, contributing to the area's rising popularity and property values."},
            {"question": "What is Leith known for?", "answer": "A strong independent food and drink scene, particularly around The Shore, alongside its historic docklands character now undergoing significant waterfront regeneration."},
            {"question": "Is Leith more affordable than Edinburgh City Centre?", "answer": "Yes, it offers more affordable property prices than the adjacent New Town while still providing good transport links, appealing to young professionals and first-time buyers."}
        ]
    },
}


def run():
    logger.info("Starting area content enrichment — batch 7 (final)")
    supabase = get_supabase_client()

    for slug, content in ENRICHED_CONTENT.items():
        supabase.table("areas").update({
            "overview": content["overview"],
            "faqs": content["faqs"],
        }).eq("slug", slug).execute()
        logger.success(f"Enriched: {slug}")

    logger.info("Batch 7 complete — ALL 14 AREAS ENRICHED")


if __name__ == "__main__":
    run()
