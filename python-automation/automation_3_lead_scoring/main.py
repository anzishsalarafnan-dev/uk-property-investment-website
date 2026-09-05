"""
Automation 3: Lead Scoring & Follow-up

Re-scores recent leads using explainable rules, and sends a follow-up
email to high-priority leads that haven't been contacted recently.

Run manually:  python -m automation_3_lead_scoring.main
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from loguru import logger
from shared.database import get_supabase_client
from shared.email import send_email
from automation_3_lead_scoring.scoring import calculate_score, priority_label
from automation_3_lead_scoring.followup import run as run_followup


def run():
    logger.info("Starting Automation 3: Lead Scoring & Follow-up")
    supabase = get_supabase_client()

    result = supabase.table("leads").select("*").order("created_at", desc=True).limit(100).execute()
    leads = result.data or []
    logger.info(f"Loaded {len(leads)} recent leads")

    high_priority = []

    for lead in leads:
        new_score = calculate_score(lead)
        priority = priority_label(new_score)

        if new_score != lead.get("score"):
            supabase.table("leads").update({"score": new_score}).eq("id", lead["id"]).execute()
            logger.info(f"{lead['email']}: score updated to {new_score} ({priority})")

        if priority == "high":
            high_priority.append({**lead, "score": new_score})

    if high_priority:
        logger.warning(f"{len(high_priority)} high-priority lead(s) found:")
        for lead in high_priority:
            logger.warning(f"  - {lead['name']} <{lead['email']}> — score {lead['score']} — source: {lead['source']}")
    else:
        logger.info("No high-priority leads in this batch")

    run_followup()

    logger.info("Automation 3 complete")


if __name__ == "__main__":
    run()
