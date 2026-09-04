import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from the Next.js app's .env.local file
env_path = Path(__file__).resolve().parent.parent.parent / ".env.local"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("Missing Supabase credentials in .env.local")
