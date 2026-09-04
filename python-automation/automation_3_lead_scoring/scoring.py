"""
Rule-based lead scoring — transparent and explainable, unlike a black-box
ML model that would need thousands of labeled examples we don't have yet.
"""

SOURCE_BASE_SCORES = {
    "valuation": 60,
    "guide-download": 40,
    "contact": 20,
    "newsletter": 10,
}


def calculate_score(lead: dict) -> int:
    score = SOURCE_BASE_SCORES.get(lead.get("source", ""), 10)

    # Providing a WhatsApp number signals higher intent
    if lead.get("whatsapp"):
        score += 15

    # Interest in a specific area (not just browsing) signals higher intent
    if lead.get("interested_area"):
        score += 10

    # A longer, more detailed message signals genuine interest
    message = lead.get("message") or ""
    if len(message) > 100:
        score += 5

    return min(score, 100)


def priority_label(score: int) -> str:
    if score >= 80:
        return "high"
    if score >= 50:
        return "medium"
    return "low"
