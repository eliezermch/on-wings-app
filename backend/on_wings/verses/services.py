import google.generativeai as genai
import os
import json
from django.conf import settings
from datetime import date
from .models import DailyVerse

class VerseGenerator:
    def __init__(self):
        api_key = os.environ.get('GEMINI_API_KEY')
        if not api_key:
            # Fallback for development if not in env, though it should be
            print("WARNING: GEMINI_API_KEY not found in environment variables.")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    def get_daily_verse(self):
        today = date.today()
        
        # Check if verse already exists for today
        existing_verse = DailyVerse.objects.filter(date=today).first()
        if existing_verse:
            return existing_verse

        # Generate new verse
        return self.generate_verse(today)

    def generate_verse(self, verse_date):
        prompt = """
        Generate a random, encouraging Bible verse for a daily devotional in both English and Spanish.
        Return ONLY a JSON object with the following structure:
        {
            "en": {
                "content": "The text of the verse in English",
                "reference": "The book, chapter, and verse (e.g., 'Isaiah 40:31')",
                "version": "NIV",
                "theme": "A short theme or topic (e.g., 'Hope')"
            },
            "es": {
                "content": "The text of the verse in Spanish",
                "reference": "The book, chapter, and verse in Spanish (e.g., 'Isaías 40:31')",
                "version": "RVR1960",
                "theme": "A short theme or topic in Spanish (e.g., 'Esperanza')"
            }
        }
        
        Do not include markdown formatting or code blocks. Just the raw JSON string.
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text.strip()
            
            # Clean up potential markdown code blocks if the model ignores instructions
            if text.startswith('```json'):
                text = text[7:]
            if text.startswith('```'):
                text = text[3:]
            if text.endswith('```'):
                text = text[:-3]
            
            data = json.loads(text)
            
            verse = DailyVerse.objects.create(
                date=verse_date,
                content=data['en']['content'],
                reference=data['en']['reference'],
                version=data['en'].get('version', 'NIV'),
                theme=data['en'].get('theme', 'General'),
                content_es=data['es']['content'],
                reference_es=data['es']['reference'],
                version_es=data['es'].get('version', 'RVR1960'),
                theme_es=data['es'].get('theme', 'General')
            )
            return verse
            
        except Exception as e:
            print(f"Error generating verse: {e}")
            # Fallback to a hardcoded verse if generation fails
            return DailyVerse.objects.create(
                date=verse_date,
                content="But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
                reference="Isaiah 40:31",
                version="NIV",
                theme="Hope",
                content_es="Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
                reference_es="Isaías 40:31",
                version_es="RVR1960",
                theme_es="Esperanza"
            )
