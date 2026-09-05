import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

ENRICHED_CONTENT = {
    "glasgow-city-centre": {
        "overview": "Glasgow City Centre combines Scotland's largest concentration of retail, hospitality, and office space with a rapidly growing technology and financial services sector, anchored by firms that have relocated or expanded operations to the city in recent years, drawn by lower costs than Edinburgh or London alongside strong graduate talent from the city's universities.\n\nThe city centre's rental market benefits from proximity to the University of Strathclyde and University of Glasgow's city centre campus, alongside Glasgow Caledonian University, together enrolling tens of thousands of students who feed into both the student housing and, after graduation, the young professional rental markets.\n\nUnlike some UK cities where city centre living is a relatively recent phenomenon, Glasgow has a longer-established tradition of city centre residential tenements, meaning investors can choose between traditional converted flats and newer purpose-built developments, each appealing to somewhat different tenant profiles.\n\nFor investors, Glasgow City Centre offers a favourable combination of Scottish property market dynamics — including a different, generally faster conveyancing process than England and Wales — with yields that compare favourably to many English regional cities, reflecting entry prices that remain below the UK city average despite the city's economic scale.",
        "faqs": [
            {"question": "Is Glasgow City Centre good for investment?", "answer": "Yes, strong university and young professional demand supports consistently high rental yields, with entry prices remaining below the UK city average."},
            {"question": "How is buying property in Glasgow different from England?", "answer": "Scotland uses a different legal and conveyancing system, generally regarded as faster than the English process, with offers typically made through a solicitor via a formal 'note of interest' system."},
            {"question": "What universities support Glasgow City Centre's rental market?", "answer": "The University of Strathclyde, University of Glasgow's city centre campus, and Glasgow Caledonian University together enrol tens of thousands of students in and around the city centre."},
            {"question": "Are there both traditional and new-build options in Glasgow City Centre?", "answer": "Yes, investors can choose between traditional converted tenement flats and newer purpose-built developments, appealing to different tenant profiles."}
        ]
    },
    "west-end-glasgow": {
        "overview": "Glasgow's West End is widely regarded as the city's most desirable residential neighbourhood, characterised by tree-lined Victorian terraces, the Botanic Gardens, and a well-established café and restaurant scene along Byres Road and Great Western Road that has earned comparisons to similar affluent university-adjacent neighbourhoods in other UK cities.\n\nThe area's identity is closely tied to the University of Glasgow's main campus, located in the heart of the West End, which brings a substantial and consistent student population alongside academic staff, creating strong demand for both traditional student HMOs and family-sized tenement flats favoured by academic and professional households.\n\nCompared to Glasgow City Centre, the West End offers a distinctly more residential, less commercially-driven character, which has historically supported steadier long-term capital growth as an established, land-constrained neighbourhood rather than a rapidly developing district. Tenement conversions here tend to hold their value well given the limited scope for significant new supply.\n\nFor investors, the West End suits those prioritising long-term tenant stability and capital preservation over maximum yield — rental returns are typically more modest than the city centre's purpose-built stock, but the area's enduring desirability and constrained supply have made it one of Glasgow's more resilient property markets through economic cycles.",
        "faqs": [
            {"question": "Is the West End good for investment?", "answer": "It offers a good balance of stable long-term tenants and steady capital growth in a desirable location, though yields are typically more modest than Glasgow City Centre."},
            {"question": "What makes the West End different from Glasgow City Centre?", "answer": "It has a distinctly more residential character with tree-lined Victorian terraces, tied closely to the University of Glasgow's main campus, versus the City Centre's more commercially-driven core."},
            {"question": "Who lives in the West End?", "answer": "A mix of students and academic staff connected to the University of Glasgow, alongside professional households drawn to the area's established character and amenities."},
            {"question": "Why does the West End hold its value well?", "answer": "Limited scope for significant new residential supply in this established, land-constrained neighbourhood has historically supported steady long-term capital growth."}
        ]
    },
}


def run():
    logger.info("Starting area content enrichment — batch 5")
    supabase = get_supabase_client()

    for slug, content in ENRICHED_CONTENT.items():
        supabase.table("areas").update({
            "overview": content["overview"],
            "faqs": content["faqs"],
        }).eq("slug", slug).execute()
        logger.success(f"Enriched: {slug}")

    logger.info("Batch 5 complete")


if __name__ == "__main__":
    run()
