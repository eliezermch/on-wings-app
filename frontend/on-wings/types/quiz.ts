export interface Choice {
  id: number;
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  text: string;
  testament: 'OLD' | 'NEW';
  language: 'EN' | 'ES';
  level: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  verse_reference?: string;
  question_type: 'SINGLE' | 'MULTIPLE';
  choices: Choice[];
}

export interface UserProgress {
  testament: 'OLD' | 'NEW';
  current_level: number;
  total_score: number;
}
