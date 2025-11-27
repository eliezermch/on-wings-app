import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DailyVerseCard } from '@/components/daily-verse-card';
import { getUser } from '@/actions/auth';

export default async function Home() {
  const user = await getUser();

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Good Day, {user?.first_name} Here is your daily verse</h1>
      <div className="flex flex-col max-w-4xl w-full space-y-8">
        {user ? (
          <DailyVerseCard />
        ) : (
          <div className="space-y-6">
            <p className="text-xl font-medium text-gray-600">
              Please sign in or create an account to continue.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signin">
                <Button className="w-32 font-semibold">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" className="w-32 font-semibold">Register</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
