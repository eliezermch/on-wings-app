import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { actions } from '@/actions';
import { getUserProgress } from '@/actions/quiz';
import { Trophy, Scroll, BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import { LikedStoryCard } from '@/components/liked-story-card';
import { ProfileStatsCard } from '@/components/profile-stats-card';

export default async function MePage() {
  const user = await actions.auth.getUser();
  const likedStories = await actions.stories.getLikedStories();
  
  // If no user, show login prompt (or could redirect)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <main className="max-w-md w-full text-center space-y-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to On Wings
          </h1>
          <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <p className="text-xl text-gray-600">
              Please sign in or create an account to view your profile.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/login" className="w-full">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full">Create Account</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Fetch progress for both testaments
  const oldTestamentProgress = await getUserProgress('OLD').catch(() => null);
  const newTestamentProgress = await getUserProgress('NEW').catch(() => null);

  const totalScore = (oldTestamentProgress?.total_score || 0) + (newTestamentProgress?.total_score || 0);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-card rounded-2xl shadow-sm border p-8 flex flex-col items-center text-center space-y-4">
          <Avatar className="w-24 h-24 border-4 border-primary/10">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="text-2xl bg-primary/5 text-primary">
              {user.first_name?.[0] || user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">
              {user.first_name ? `${user.first_name} ${user.last_name}` : user.username}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <div className="pt-4">
            <form action={actions.auth.logoutUserAction}>
              <Button variant="destructive" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          {/* Total Score */}
          <ProfileStatsCard 
            title="Total Score"
            totalScore={totalScore}
            className='border-none shadow-sm bg-gradient-to-br from-primary/40'
            icon={<Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
            pointsText="Points earned"
          />
          
          {/* Old Testament Progress */}
          <ProfileStatsCard 
            title="Old Testament"
            totalScore={`Level ${oldTestamentProgress?.current_level || 1}`}
            className='border-none shadow-sm bg-gradient-to-br from-secondary/40'
            icon={<Scroll className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
            pointsText={`${oldTestamentProgress?.total_score || 0} points`}
          />

          {/* New Testament Progress */}
          <ProfileStatsCard 
            title="New Testament"
            totalScore={`Level ${newTestamentProgress?.current_level || 1}`}
            className='border-none shadow-sm bg-gradient-to-br from-emerald-900/60'
            icon={<BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
            pointsText={`${newTestamentProgress?.total_score || 0} points`}
          />
          
        </div>

        <div className="container max-w-4xl mx-auto px-0 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Liked Stories</h1>
      
      {likedStories.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>You haven't liked any stories yet.</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Browse Stories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedStories.map((story) => (
            <LikedStoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
      </div>
    </div>
  );
}
