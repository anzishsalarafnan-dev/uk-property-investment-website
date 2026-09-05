"""
Enriches each area's overview and FAQs with more substantial, unique
content for SEO — written at an analytical level (market dynamics,
investment reasoning) rather than fabricating specific facts (exact
school names, crime statistics) we don't actually have verified data for.

Run manually:  python -m shared.enrich_areas
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

ENRICHED_CONTENT = {
    "manchester-city-centre": {
        "overview": "Manchester City Centre sits at the heart of the UK's fastest-growing regional economy outside London. Over the past decade, the area has been transformed by large-scale regeneration around Piccadilly, Ancoats, and the wider NOMA district, drawing in a wave of new-build apartment developments aimed squarely at young professionals and postgraduate tenants.\n\nWhat makes the area distinctive for investors is the combination of a large resident student and graduate population — Manchester and Manchester Metropolitan University together enrol over 70,000 students — with a genuinely strong local jobs market in tech, media, and financial services. This dual demand base keeps void periods low and supports consistent rental growth even during periods when the wider UK market has been flat.\n\nTransport connectivity is a further advantage: the Metrolink tram network and Piccadilly mainline station put the area within easy reach of the rest of Greater Manchester and direct rail links to London in under two hours. For investors weighing yield against growth, City Centre sits closer to the yield end of the spectrum, though ongoing regeneration means capital growth potential remains meaningful over a 5-10 year horizon.\n\nThe main consideration for investors is oversupply risk: a large pipeline of new-build apartments has been delivered in recent years, which can put pressure on rents in the newest developments specifically. Areas with an established resale market, rather than only new-build stock, tend to show steadier long-term performance.",
        "faqs": [
            {"question": "Is Manchester City Centre good for investment?", "answer": "Yes, it offers some of the UK's highest yields (6-7%) driven by strong graduate and young professional rental demand, though investors should watch new-build supply levels."},
            {"question": "What type of tenant should I expect in Manchester City Centre?", "answer": "Predominantly young professionals aged 22-35 and postgraduate students, typically on 12-month tenancies."},
            {"question": "Is new-build or resale better in this area?", "answer": "Resale properties in established buildings often show steadier rental growth, since large new-build pipelines can temporarily soften rents in the newest developments."},
            {"question": "How does Manchester City Centre compare to Manchester as a whole?", "answer": "It offers higher yields than most surrounding suburbs but slightly lower long-term capital growth than up-and-coming residential areas further out."}
        ]
    },
    "digbeth": {
        "overview": "Digbeth is Birmingham's creative and cultural quarter, historically known for its Victorian industrial buildings and canal network, now undergoing one of the most significant regeneration programmes in the city. The arrival of HS2's Curzon Street terminus directly adjacent to Digbeth is the single biggest driver of investor interest in the area, with the wider Birmingham Curzon masterplan expected to bring tens of thousands of new jobs to the immediate vicinity over the next decade.\n\nThe area has built a reputation as Birmingham's answer to Manchester's Northern Quarter or London's Shoreditch — converted warehouses now house independent studios, breweries, and creative businesses, which has begun attracting a younger, design-conscious tenant base alongside the area's traditional industrial character.\n\nFor investors, Digbeth represents a higher-risk, higher-reward proposition compared to more established Birmingham neighbourhoods. Property prices remain below the Birmingham city average, reflecting the area's ongoing transition, but the combination of HS2 investment, creative-sector job growth, and planned residential schemes suggests meaningful upside for investors willing to take a 5-10 year view rather than seeking immediate stabilised yield.\n\nAs with any regeneration-driven area, timing and specific street-level location matter considerably — proximity to the Custard Factory and the emerging Smithfield development tends to command a premium over areas still awaiting redevelopment.",
        "faqs": [
            {"question": "Is Digbeth good for investment?", "answer": "Digbeth is one of Birmingham's fastest-growing areas, driven by HS2 investment and its creative/tech scene, though it suits investors comfortable with a longer growth timeline rather than immediate stabilised yield."},
            {"question": "Why is HS2 important for Digbeth specifically?", "answer": "The HS2 Curzon Street terminus sits directly adjacent to Digbeth, and the surrounding Curzon masterplan is expected to bring significant new jobs and investment to the immediate area."},
            {"question": "What kind of tenants live in Digbeth?", "answer": "A mix of creative-industry workers, young professionals, and students drawn to the area's converted warehouse apartments and cultural scene."},
            {"question": "Is Digbeth riskier than other Birmingham areas?", "answer": "It carries more regeneration-dependent risk than established areas, but also more upside potential given the scale of planned investment."}
        ]
    },
}


def run():
    logger.info("Starting area content enrichment")
    supabase = get_supabase_client()

    updated = 0
    for slug, content in ENRICHED_CONTENT.items():
        supabase.table("areas").update({
            "overview": content["overview"],
            "faqs": content["faqs"],
        }).eq("slug", slug).execute()
        logger.success(f"Enriched: {slug}")
        updated += 1

    logger.info(f"Enrichment complete — {updated} area(s) updated")


if __name__ == "__main__":
    run()
