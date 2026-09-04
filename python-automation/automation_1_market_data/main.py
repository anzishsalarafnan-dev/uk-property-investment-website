"""
Automation 1: Market Data Fetcher

Fetches real, recent house-sale price averages from the UK Land Registry's
free, public Price Paid Data API (legal, official government source), then
updates each city's average price in the market_snapshots table.

Note: The Land Registry only covers England and Wales. Scottish cities
(Glasgow, Edinburgh) are not available through this source and are
intentionally skipped rather than filled with inaccurate data.

Run manually:  python -m automation_1_market_data.main
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import requests
from loguru import logger
from tenacity import retry, stop_after_attempt, wait_exponential
from shared.database import get_supabase_client

LAND_REGISTRY_ENDPOINT = "https://landregistry.data.gov.uk/landregistry/query"

# City name -> exact county name as stored in the Land Registry (must be UPPERCASE)
# Glasgow and Edinburgh are excluded: Land Registry only covers England & Wales.
CITY_REGIONS = {
    "london": "GREATER LONDON",
    "manchester": "GREATER MANCHESTER",
    "birmingham": "WEST MIDLANDS",
    "leeds": "WEST YORKSHIRE",
    "liverpool": "MERSEYSIDE",
    "bristol": "CITY OF BRISTOL",
}


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def fetch_average_price(region: str) -> float | None:
    query = f"""
    PREFIX lrppi: <http://landregistry.data.gov.uk/def/ppi/>
    PREFIX lrcommon: <http://landregistry.data.gov.uk/def/common/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT (AVG(?amount) AS ?avgPrice) WHERE {{
      ?transx lrppi:pricePaid ?amount ;
              lrppi:propertyAddress ?addr ;
              lrppi:transactionDate ?date .
      ?addr lrcommon:county "{region}" .
      FILTER (?date >= "2025-09-01"^^xsd:date)
    }}
    """

    response = requests.get(
        LAND_REGISTRY_ENDPOINT,
        params={"query": query, "output": "json"},
        headers={"Accept": "application/sparql-results+json"},
        timeout=30,
    )
    response.raise_for_status()
    data = response.json()

    bindings = data.get("results", {}).get("bindings", [])
    if not bindings or "avgPrice" not in bindings[0]:
        return None

    value = float(bindings[0]["avgPrice"]["value"])
    return value if value > 0 else None


def run():
    logger.info("Starting Automation 1: Market Data Fetcher")
    supabase = get_supabase_client()

    results = []
    for city_slug, region in CITY_REGIONS.items():
        logger.info(f"Fetching average price for {city_slug} ({region})...")
        try:
            avg_price = fetch_average_price(region)
            if avg_price:
                logger.success(f"{city_slug}: £{avg_price:,.0f}")
                results.append({"city_slug": city_slug, "avg_price": round(avg_price)})
            else:
                logger.warning(f"{city_slug}: no data returned for this period")
        except Exception as e:
            logger.error(f"{city_slug}: failed — {e}")

    if results:
        try:
            supabase.table("market_snapshots").upsert(results, on_conflict="city_slug").execute()
            logger.success(f"Saved {len(results)} snapshots to Supabase")
        except Exception as e:
            logger.error(f"Failed to save to Supabase: {e}")
    else:
        logger.warning("No results to save")

    logger.info("Automation 1 complete")


if __name__ == "__main__":
    run()
