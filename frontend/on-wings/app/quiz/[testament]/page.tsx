'use client'

import { useEffect, useState, use } from 'react'
import { getUserProgress } from '@/actions/quiz'
import { UserProgress } from '@/types/quiz'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function LevelSelectionPage({
  params,
}: {
  params: Promise<{ testament: string }>
}) {
  const { testament } = use(params)
  const searchParams = useSearchParams()
  const language = (searchParams.get('lang') as 'EN' | 'ES') || 'EN'
  
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getUserProgress(testament as 'OLD' | 'NEW')
        setProgress(data)
      } catch (error) {
        console.error('Failed to fetch progress:', error)
        // If fail (e.g. first time), assume level 1
        setProgress({ testament: testament as 'OLD' | 'NEW', current_level: 1, total_score: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [testament])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const currentLevel = progress?.current_level || 1
  const levels = Array.from({ length: 50 }, (_, i) => i + 1)

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          {testament === 'OLD' 
            ? (language === 'EN' ? 'Old Testament' : 'Antiguo Testamento')
            : (language === 'EN' ? 'New Testament' : 'Nuevo Testamento')
          }
        </h1>
        <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-lg">{progress?.total_score || 0}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {levels.map((level) => {
          const isLocked = level > currentLevel
          const isCompleted = level < currentLevel
          const isCurrent = level === currentLevel

          return (
            <Link 
              key={level} 
              href={isLocked ? '#' : `/quiz/${testament}/${level}?lang=${language}`}
              className={isLocked ? 'cursor-not-allowed' : ''}
            >
              <Card className={`
                h-24 flex flex-col items-center justify-center transition-all duration-200
                ${isLocked ? 'bg-muted opacity-50' : 'hover:scale-105 cursor-pointer'}
                ${isCurrent ? 'border-primary border-2 shadow-lg scale-105' : ''}
                ${isCompleted ? 'bg-primary/10 border-primary/50' : ''}
              `}>
                {isLocked ? (
                  <Lock className="w-8 h-8 text-muted-foreground" />
                ) : isCompleted ? (
                  <div className="relative">
                    <span className="text-2xl font-bold text-primary">{level}</span>
                    <CheckCircle className="w-4 h-4 text-green-500 absolute -top-2 -right-4" />
                  </div>
                ) : (
                  <span className={`text-2xl font-bold ${isCurrent ? 'text-primary' : ''}`}>
                    {level}
                  </span>
                )}
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
