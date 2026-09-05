"""
Follow-up email sequence content, matching the original spec's cadence:
Day 0, 2, 5, 7, 14. Each function returns (subject, html_body).
"""

SITE_URL = "https://uk-property-investment-website.vercel.app"


def day0_email(name: str) -> tuple[str, str]:
    subject = "Thanks for reaching out"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
      <h1 style="font-size: 20px;">Thanks, {name}!</h1>
      <p style="color: #475569;">We've received your request and our team is reviewing it.
      In the meantime, feel free to browse more UK cities and areas.</p>
      <a href="{SITE_URL}/cities" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-top:12px;">Browse Cities</a>
    </div>"""
    return subject, html


def day2_email(name: str) -> tuple[str, str]:
    subject = "3 mistakes UK property investors make (and how to avoid them)"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
      <h1 style="font-size: 20px;">Hi {name}, quick tip</h1>
      <p style="color: #475569;">Many first-time investors underestimate total costs, chase yield
      without checking demand, and skip a proper survey. We've written a full guide on this.</p>
      <a href="{SITE_URL}/blog/first-time-investor-mistakes-to-avoid" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-top:12px;">Read the Guide</a>
    </div>"""
    return subject, html


def day5_email(name: str) -> tuple[str, str]:
    subject = "Which UK city fits your investment goals?"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
      <h1 style="font-size: 20px;">Hi {name}</h1>
      <p style="color: #475569;">Manchester and Liverpool lead on rental yield. London and Bristol
      lead on long-term capital growth. Explore the numbers for each city on our map.</p>
      <a href="{SITE_URL}/map" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-top:12px;">Explore the Map</a>
    </div>"""
    return subject, html


def day7_email(name: str) -> tuple[str, str]:
    subject = "Would you like a free 15-minute consultation?"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
      <h1 style="font-size: 20px;">Hi {name}</h1>
      <p style="color: #475569;">If you'd like to talk through your options with our team, we offer
      a free, no-obligation 15-minute call.</p>
      <a href="{SITE_URL}/contact" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-top:12px;">Book a Call</a>
    </div>"""
    return subject, html


def day14_email(name: str) -> tuple[str, str]:
    subject = "Last update from us for now"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
      <h1 style="font-size: 20px;">Hi {name}</h1>
      <p style="color: #475569;">The UK market moves fast. If you'd still like an instant valuation
      or a fresh area report, we're here whenever you're ready.</p>
      <a href="{SITE_URL}/valuation" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-top:12px;">Get a Valuation</a>
    </div>"""
    return subject, html


SEQUENCE = [
    ("day0", 0, day0_email),
    ("day2", 2, day2_email),
    ("day5", 5, day5_email),
    ("day7", 7, day7_email),
    ("day14", 14, day14_email),
]
