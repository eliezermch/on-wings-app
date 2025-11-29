import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DailyVerseCard } from '@/components/daily-verse-card';
import { actions} from '@/actions/index'
import { StoryCard } from '@/components/story-card';
import { Story } from '@/types/story';

export default async function Home() {
  const user = await actions.auth.getUser();

  let stories: Story[] = [];
  try {
    stories = await actions.stories.getStories();
  } catch (error) {
    console.error('Failed to fetch stories:', error);
  }

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
          {stories.map((story: Story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
      
    </main>
  );
}
