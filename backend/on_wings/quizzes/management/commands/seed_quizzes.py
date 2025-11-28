from django.core.management.base import BaseCommand
from quizzes.models import Question, Choice
from quizzes.management.commands.bible_questions import bible_questions
import math

class Command(BaseCommand):
    help = 'Seeds the database with quiz questions from bible_questions.py, grouped by 3 per level'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding quiz questions...')
        
        # Clear existing questions
        Question.objects.all().delete()
        
        # Group questions by Testament and Language
        questions_by_group = {
            ('OLD', 'EN'): [],
            ('OLD', 'ES'): [],
            ('NEW', 'EN'): [],
            ('NEW', 'ES'): [],
        }
        
        for q_data in bible_questions:
            key = (q_data['testament'], q_data['language'])
            if key in questions_by_group:
                questions_by_group[key].append(q_data)
        
        # Seed questions
        QUESTIONS_PER_LEVEL = 3
        
        for (testament, language), questions in questions_by_group.items():
            self.stdout.write(f'Seeding {testament} {language}...')
            
            # Calculate total levels needed
            total_questions = len(questions)
            total_levels = math.ceil(total_questions / QUESTIONS_PER_LEVEL)
            
            for index, q_data in enumerate(questions):
                # Calculate level: 0-2 -> Level 1, 3-5 -> Level 2, etc.
                level = (index // QUESTIONS_PER_LEVEL) + 1
                
                question = Question.objects.create(
                    text=q_data['text'],
                    testament=q_data['testament'],
                    language=q_data['language'],
                    level=level,
                    difficulty=q_data.get('difficulty', 'EASY'),
                    verse_reference=q_data.get('verse_reference', '') # Handle if missing
                )
                
                for c_data in q_data['choices']:
                    Choice.objects.create(
                        question=question,
                        text=c_data['text'],
                        is_correct=c_data['is_correct']
                    )
                    
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(questions)} questions into {total_levels} levels for {testament} {language}'))
            
        self.stdout.write(self.style.SUCCESS('Successfully seeded all questions'))