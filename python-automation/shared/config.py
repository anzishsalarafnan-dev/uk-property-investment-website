import os
from pathlib import Path
from dotenv import load_dotenv

# Load from .env.local if it exists (local development).
# In GitHub Actions, env vars are injected directly, so this is skipped gracefully.
env_path = Path(__file__).resolve().parent.parent.parent / ".env.local"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("Missing Supabase credentials — check .env.local or GitHub Secrets")
