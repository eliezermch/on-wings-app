import Link from 'next/link';
import { Button } from '@/components/ui/button';
import api from '@/api/api';
import { actions } from '@/actions';
import Image from 'next/image';

async function getUser() {
  try {
    const response = await api.get('me/');
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center justify-center max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-0">
          Welcome to On Wings
        </h1>
        <Image src="/on-wings-logo-text_transparent_trimmed.png" alt="On Wings Logo" className="w-[400px] h-[400px] object-contain mb-0" width={400} height={400} />
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
      </main>
    </div>
  );
}
