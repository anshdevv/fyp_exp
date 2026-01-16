import os

import google.generativeai as genai
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

# Supabase connection
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
# GOOGLE_API_KEY=os.getenv("GOOGLE_API_KEY")
OPENROUTER_API_KEY = "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"


supabase = create_client(url, key)
