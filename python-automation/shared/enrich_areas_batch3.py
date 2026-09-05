import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client

ENRICHED_CONTENT = {
    "leeds-city-centre": {
        "overview": "Leeds City Centre anchors what has become the largest financial and legal services cluster in the UK outside London, employing tens of thousands across banking, insurance, and professional services firms headquartered or with major offices in the city. This concentration of well-paid, stable employment underpins consistent rental demand from young professionals across the city centre's apartment stock.\n\nWhat distinguishes Leeds from some comparable Northern cities is its unusually strong graduate retention rate — a significant proportion of students from the University of Leeds and Leeds Beckett University remain in the city after graduating, feeding directly into the city centre rental market as they move from student housing into professional lets.\n\nThe South Bank regeneration scheme, one of the largest city centre regeneration projects in Europe, is gradually extending the city centre southward across the river, with new office, residential, and cultural space planned over the next decade. Investors buying in areas close to this expansion have generally seen stronger capital growth than the city centre average.\n\nCompared to Manchester and Liverpool, Leeds has historically had a smaller new-build apartment pipeline relative to demand, which has helped support more stable rental growth with less oversupply risk — though as with any city, specific building and location still matter considerably to individual investment performance.",
        "faqs": [
            {"question": "Is Leeds City Centre good for investment?", "answer": "Yes, it offers strong yields driven by young professional and graduate rental demand, supported by the UK's largest financial and legal sector outside London."},
            {"question": "Why does Leeds have strong graduate retention?", "answer": "A significant proportion of University of Leeds and Leeds Beckett graduates remain in the city after finishing their studies, feeding directly into the professional rental market."},
            {"question": "What is the South Bank regeneration scheme?", "answer": "One of the largest city centre regeneration projects in Europe, extending Leeds city centre south across the river with new office, residential, and cultural development planned over the next decade."},
            {"question": "How does Leeds compare to Manchester for investment?", "answer": "Leeds has historically had a smaller new-build apartment pipeline relative to demand, which has helped support steadier rental growth with less oversupply risk."}
        ]
    },
    "headingley": {
        "overview": "Headingley is Leeds' best-known student and young professional neighbourhood, shaped by its proximity to both the University of Leeds and Leeds Beckett University, alongside Headingley Stadium's cricket and rugby grounds which give the area a distinct identity beyond its student population.\n\nThe area's large, consistent student population — drawn from two universities with a combined enrolment of over 60,000 — makes it one of the highest and most reliable rental yield locations in Leeds. Houses of Multiple Occupation (HMOs) are particularly common here, allowing investors to achieve per-room rental income significantly above standard buy-to-let returns, though this comes with additional licensing and management requirements.\n\nBeyond the immediate student market, Headingley has increasingly attracted young professionals and first-time buyers priced out of the city centre, drawn by its independent café and restaurant scene along Otley Road and its leafy, established residential streets — creating a more diversified tenant base than a purely student-focused area.\n\nFor investors, the key consideration is seasonality: student-focused properties typically operate on academic-year tenancies with a defined turnover period each summer, requiring more active management than standard 12-month lets, but this is offset by consistently strong demand given the area's established reputation with both universities.",
        "faqs": [
            {"question": "Is Headingley good for investment?", "answer": "Its large student population makes it one of the highest-yielding areas in Leeds, particularly for HMO-licensed properties, though it requires more active management than standard buy-to-let."},
            {"question": "Is Headingley only suitable for student lets?", "answer": "No, the area has increasingly attracted young professionals and first-time buyers as well, giving investors flexibility between student HMOs and standard residential lets."},
            {"question": "What licensing is needed for Headingley HMOs?", "answer": "Properties let to three or more unrelated tenants sharing facilities typically require an HMO licence from Leeds City Council, with specific safety and space standards."},
            {"question": "How many students are near Headingley?", "answer": "The University of Leeds and Leeds Beckett University have a combined enrolment of over 60,000 students, supporting consistent rental demand in the area."}
        ]
    },
}


def run():
    logger.info("Starting area content enrichment — batch 3")
    supabase = get_supabase_client()

    for slug, content in ENRICHED_CONTENT.items():
        supabase.table("areas").update({
            "overview": content["overview"],
            "faqs": content["faqs"],
        }).eq("slug", slug).execute()
        logger.success(f"Enriched: {slug}")

    logger.info("Batch 3 complete")


if __name__ == "__main__":
    run()
