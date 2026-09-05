"""
Checks all leads and sends the next due email in the Day 0/2/5/7/14 sequence.
Designed to be safe to run daily — never re-sends a step already recorded
in the lead's `sequence_sent` array.
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from datetime import datetime, timezone
from loguru import logger
from shared.database import get_supabase_client
from shared.email import send_email
from automation_3_lead_scoring.email_templates import SEQUENCE


def days_since(created_at: str) -> int:
    created = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
    now = datetime.now(timezone.utc)
    return (now - created).days


def run():
    logger.info("Starting follow-up email sequence check")
    supabase = get_supabase_client()

    result = supabase.table("leads").select("*").eq("sequence_paused", False).execute()
    leads = result.data or []
    logger.info(f"Checking {len(leads)} active leads")

    sent_count = 0

    for lead in leads:
        age_days = days_since(lead["created_at"])
        already_sent = set(lead.get("sequence_sent") or [])

        for step_name, step_day, email_fn in SEQUENCE:
            if age_days >= step_day and step_name not in already_sent:
                subject, html = email_fn(lead["name"])
                success = send_email(lead["email"], subject, html)

                if success:
                    already_sent.add(step_name)
                    supabase.table("leads").update(
                        {"sequence_sent": list(already_sent)}
                    ).eq("id", lead["id"]).execute()
                    logger.success(f"{lead['email']}: sent '{step_name}' (day {age_days})")
                    sent_count += 1
                else:
                    logger.warning(f"{lead['email']}: failed to send '{step_name}'")

    logger.info(f"Follow-up check complete — {sent_count} email(s) sent")


if __name__ == "__main__":
    run()
