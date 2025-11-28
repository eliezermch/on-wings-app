'use client'

import { useEffect, useState, use } from 'react'
import { Story } from '@/types/story'
import { Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { actions } from '@/actions/index'

export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await actions.stories.getStory(id)
        console.log(data)
        setStory(data)
      } catch (error) {
        console.error('Failed to fetch story:', error)
        toast.error('Failed to load story')
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [id])

  const handleLike = async () => {
    if (!story) return

    try {
      const result = await actions.stories.toggleLikeStory(story.id)
      setStory((prev) => prev ? { ...prev, is_liked: result.liked } : null)
      toast.success(result.liked ? 'Story added to your favorites' : 'Story removed from your favorites')
    } catch (error) {
      console.error('Failed to toggle like:', error)
      toast.error('Failed to update like status')
    }
  }

  const handleRate = async (score: number) => {
    if (!story) return

    try {
      const result = await actions.stories.rateStory(story.id, score)
      setStory((prev) => prev ? { ...prev, user_rating: result.score } : null)
      toast.success(`You rated this story ${score} stars`)
    } catch (error) {
      console.error('Failed to rate:', error)
      toast.error('Failed to submit rating')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!story) {
    return <div className="flex justify-center items-center h-screen">Story not found</div>
  }

  return (
    <div className="container mx-auto px-0 py-10 mt-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">{story.title}</h1>
        <p className="text-muted-foreground text-md">{story.reference}</p>
      </div>

      <div className="flex items-center justify-between mb-8 p-4 bg-card rounded-lg shadow-sm border">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={story.is_liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground'}
          >
            <Heart className={`h-6 w-6 ${story.is_liked ? 'fill-current' : ''}`} />
          </Button>
          <span className="text-md font-medium">
            {story.is_liked ? 'Liked' : 'Like'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className={`focus:outline-none transition-colors ${
                (story.user_rating || 0) >= star
                  ? 'text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            >
              <Star className={`h-6 w-6 ${(story.user_rating || 0) >= star ? 'fill-current' : ''}`} />
            </button>
          ))}
          <span className="text-lg text-primary text-center ml-6 font-semibold">
            <Star className="h-6 w-6" />
            {story.average_rating || 0}
          </span>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
        {story.content}
      </div>
    </div>
  )
}