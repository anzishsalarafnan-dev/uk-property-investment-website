import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

ENRICHED_CONTENT = {
    "liverpool-city-centre": {
        "overview": "Liverpool City Centre consistently ranks among the highest rental yield locations anywhere in the UK, a combination of two structural factors: entry prices that remain well below most comparable UK cities, and rental demand supported by a large student population, a growing digital and creative economy, and the city's status as a major tourism and events destination.\n\nThe city's ongoing regeneration extends across several distinct quarters — the Commercial District around the business core, the Ropewalks entertainment and creative quarter, and the waterfront around the historic docks — giving investors meaningfully different micro-markets to choose from within the same broad city centre designation.\n\nLiverpool John Moores University and the University of Liverpool together enrol over 45,000 students, a significant share of whom seek city centre accommodation, supporting both traditional student lets and the broader young-professional rental market as graduates transition into employment locally.\n\nFor investors, the main trade-off is that Liverpool's higher yields come with historically lower capital growth than cities like Manchester or Bristol, reflecting the city's different economic profile. Investors prioritising cash flow over capital appreciation have consistently found Liverpool City Centre among the strongest UK options on a pure yield basis.",
        "faqs": [
            {"question": "Is Liverpool City Centre good for investment?", "answer": "Yes, it consistently ranks among the UK's top yield locations with affordable entry prices and strong demand from students, young professionals, and the tourism sector."},
            {"question": "Why are yields so high in Liverpool?", "answer": "A combination of relatively low property prices compared to other major UK cities and strong, consistent rental demand keeps gross yields significantly above the UK average."},
            {"question": "What areas make up Liverpool City Centre?", "answer": "Distinct micro-markets including the Commercial District business core, the Ropewalks entertainment quarter, and the historic waterfront docks area."},
            {"question": "Is capital growth strong in Liverpool?", "answer": "Historically more modest than cities like Manchester or Bristol — Liverpool tends to suit investors prioritising rental yield and cash flow over rapid capital appreciation."}
        ]
    },
    "baltic-triangle": {
        "overview": "The Baltic Triangle has undergone one of the most rapid transformations of any UK neighbourhood over the past decade, evolving from a largely disused industrial district into Liverpool's creative and digital quarter, now home to a dense cluster of tech startups, independent breweries, creative studios, and some of the city's most talked-about hospitality venues.\n\nThis regeneration has been driven substantially by grassroots creative and business investment rather than a single large-scale masterplan, giving the area a distinctly independent character that has proven attractive to young professionals working in Liverpool's growing creative and digital economy, alongside remote workers drawn by the area's affordability and character relative to comparable creative quarters in larger UK cities.\n\nFor investors, the Baltic Triangle represents one of the more growth-oriented options within Liverpool, with property values having risen substantially as the area's reputation has solidified, though from a lower base than the established city centre core. Converted warehouse apartments and new-build schemes both feature in the local market, appealing to slightly different tenant profiles.\n\nAs with any rapidly regenerating neighbourhood, investors should weigh the area's strong recent growth trajectory against the reality that much of the most dramatic appreciation may already be reflected in current prices — due diligence on specific streets and buildings matters more here than in more established, slower-moving markets.",
        "faqs": [
            {"question": "Is Baltic Triangle good for investment?", "answer": "It has one of the fastest growth projections in Liverpool due to ongoing regeneration and creative-sector demand, suiting investors comfortable with a more dynamic, less established market."},
            {"question": "What kind of businesses are in the Baltic Triangle?", "answer": "A dense cluster of tech startups, independent breweries, creative studios, and hospitality venues, driven largely by grassroots business investment rather than a single masterplan."},
            {"question": "Who lives in the Baltic Triangle?", "answer": "Predominantly young professionals working in Liverpool's creative and digital economy, along with remote workers attracted by the area's affordability and character."},
            {"question": "Is the Baltic Triangle still undervalued?", "answer": "Property values have risen substantially as the area's reputation has grown, so investors should research specific streets and buildings carefully rather than assuming uniform upside across the whole district."}
        ]
    },
}


def run():
    logger.info("Starting area content enrichment — batch 4")
    supabase = get_supabase_client()

    for slug, content in ENRICHED_CONTENT.items():
        supabase.table("areas").update({
            "overview": content["overview"],
            "faqs": content["faqs"],
        }).eq("slug", slug).execute()
        logger.success(f"Enriched: {slug}")

    logger.info("Batch 4 complete")


if __name__ == "__main__":
    run()
