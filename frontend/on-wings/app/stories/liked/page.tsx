'use client'

import { useEffect, useState } from 'react'
import { getLikedStories } from '@/actions/stories'
import { Story } from '@/types/story'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LikedStoryCard } from '@/components/liked-story-card'

export default function LikedStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLikedStories = async () => {
      try {
        const data = await getLikedStories()
        setStories(data)
      } catch (error) {
        console.error('Failed to fetch liked stories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLikedStories()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container max-w-4xl mx-auto px-0 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Liked Stories</h1>
      
      {stories.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>You haven't liked any stories yet.</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Browse Stories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <LikedStoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  )
}
