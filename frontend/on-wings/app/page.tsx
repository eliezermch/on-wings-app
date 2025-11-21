'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import api from '@/api/api';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('logout/');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      router.push('/login');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
            <Button onClick={handleLogout} variant="outline" className="w-auto mx-auto">
              Sign out
            </Button>
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
