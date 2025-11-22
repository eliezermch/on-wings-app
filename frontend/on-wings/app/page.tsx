import Link from 'next/link';
import { Button } from '@/components/ui/button';
import api from '@/api/api';
import { actions } from '@/actions';

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
      <main className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to On Wings
        </h1>
        
        {user ? (
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <p className="text-xl text-gray-700">
              Hello, <span className="font-semibold">{user.username}</span>!
            </p>
            <form action={actions.auth.logoutUserAction}>
                <Button type="submit" variant="outline" className="w-auto mx-auto">
                Sign out
                </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xl text-gray-600">
              Please sign in or create an account to continue.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button className="w-32">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="w-32">Register</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
