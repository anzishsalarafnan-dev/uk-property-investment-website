import os
import requests

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_FROM = os.getenv("EMAIL_FROM", "onboarding@resend.dev")


def send_email(to: str, subject: str, html: str) -> bool:
    if not RESEND_API_KEY:
        return False

    response = requests.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
        json={"from": EMAIL_FROM, "to": to, "subject": subject, "html": html},
        timeout=15,
    )
    return response.status_code == 200
