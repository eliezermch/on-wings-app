export interface Story {
  id: number;
  title: string;
  content: string;
  reference: string;
  created_at: string;
  is_liked: boolean;
  user_rating: number | null;
  average_rating: number;
  category: string;
  read_time: string;
}

export interface Rating {
  id: number;
  user: number;
  story: number;
  score: number;
  created_at: string;
}
