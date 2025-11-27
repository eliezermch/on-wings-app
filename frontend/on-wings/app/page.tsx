import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DailyVerseCard } from '@/components/daily-verse-card';
import { getUser } from '@/actions/auth';
import { StoryCard } from '@/components/story-card';

const BIBLE_STORIES = [
  {
    id: 1,
    title: "David & Goliath",
    snippet: "A young shepherd faces a giant warrior with nothing but a sling and his faith.",
    category: "Courage",
    readTime: "3 min"
  },
  {
    id: 2,
    title: "The Walls of Jericho",
    snippet: "Joshua follows a strange command to march around a city for seven days.",
    category: "Faith",
    readTime: "5 min"
  },
  {
    id: 3,
    title: "Daniel in the Lions' Den",
    snippet: "Despite a royal decree, Daniel continues to pray and faces the consequences.",
    category: "Protection",
    readTime: "4 min"
  }
];

export default async function Home() {
  const user = await getUser();

  return (
    <main className="min-h-screen bg-background flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Buen día, {user?.first_name} Aquí está tu versículo del día</h1>
      <div className="flex flex-col max-w-4xl w-full space-y-8">
        {user ? (
          <DailyVerseCard />
        ) : (
          <div className="space-y-6">
            <p className="text-xl font-medium text-gray-600">
              Por favor, inicia sesión o crea una cuenta para continuar.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signin">
                <Button className="w-32 font-semibold">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" className="w-32 font-semibold">Registrarse</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-between items-center max-w-4xl w-full mb-4">
          <h2 className="text-xl font-bold text-foreground">Stories</h2>
          <button className="text-sm font-bold hover:underline" style={{ color: "#D4AF37" }}>View All</button>
        </div>
        <div className="flex flex-col max-w-4xl w-full space-y-8">
          {BIBLE_STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
      
    </main>
  );
}
