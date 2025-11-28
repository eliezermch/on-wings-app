'use client'

import { useEffect, useState, use } from 'react'
import { getQuestions, completeLevel } from '@/actions/quiz'
import { Question } from '@/types/quiz'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Heart, BookOpen } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { useSearchParams, useRouter } from 'next/navigation'

export default function QuizLevelPage({
  params,
}: {
  params: Promise<{ testament: string; level: string }>
}) {
  const { testament, level } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const language = (searchParams.get('lang') as 'EN' | 'ES') || 'EN'
  
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [loading, setLoading] = useState(true)
  const [gameFinished, setGameFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(testament as 'OLD' | 'NEW', language, parseInt(level))
        setQuestions(data)
      } catch (error) {
        console.error('Failed to fetch questions:', error)
        toast.error('Failed to load quiz')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [testament, language, level])

  const handleCheck = () => {
    if (selectedChoice === null) return

    const currentQuestion = questions[currentQuestionIndex]
    const choice = currentQuestion.choices.find(c => c.id === selectedChoice)
    
    if (choice?.is_correct) {
      setIsCorrect(true)
      setScore(prev => prev + 1)
      const audio = new Audio('/sounds/correct.mp3')
      audio.play().catch(e => console.log('Audio play failed', e))
    } else {
      setIsCorrect(false)
      setLives(prev => prev - 1)
      const audio = new Audio('/sounds/wrong.mp3')
      audio.play().catch(e => console.log('Audio play failed', e))
    }
    
    setIsChecked(true)
  }

  const handleNext = async () => {
    if (lives === 0) {
      setGameFinished(true)
      return
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedChoice(null)
      setIsChecked(false)
      setIsCorrect(false)
    } else {
      setGameFinished(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      // Complete level if passed (e.g., > 50% score AND lives > 0)
      if (score >= questions.length / 2 && lives > 0) {
        try {
          setSubmitting(true)
          await completeLevel(testament as 'OLD' | 'NEW', score * 10) // 10 points per correct answer
          toast.success('Level Completed!')
        } catch (error) {
          console.error('Failed to save progress:', error)
          toast.error('Failed to save progress')
        } finally {
          setSubmitting(false)
        }
      }
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-xl">No questions found for Level {level}.</p>
        <Link href={`/quiz/${testament}?lang=${language}`}>
          <Button>Go Back</Button>
        </Link>
      </div>
    )
  }

  if (gameFinished || lives === 0) {
    const passed = score >= questions.length / 2 && lives > 0
    
    return (
      <div className="container mx-auto px-4 py-8 mt-20 max-w-2xl text-center">
        <Card className="p-8">
          <div className="flex justify-center mb-6">
            {passed ? (
              <div className="bg-yellow-100 p-6 rounded-full">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
            ) : (
              <div className="bg-red-100 p-6 rounded-full">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-primary">
            {passed ? 'Level Complete!' : 'Level Failed'}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {passed ? 'You unlocked the next level!' : lives === 0 ? 'You ran out of lives.' : 'Try again to unlock the next level.'}
          </p>
          
          <div className="text-6xl font-bold mb-8">{score} / {questions.length}</div>
          
          <div className="flex justify-center gap-4">
            <Link href={`/quiz/${testament}?lang=${language}`}>
              <Button variant="outline" className="gap-2">
                Back to Levels
              </Button>
            </Link>
            {passed && (
              <Link href={`/quiz/${testament}/${parseInt(level) + 1}?lang=${language}`}>
                <Button className="gap-2">
                  Next Level <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
            {!passed && (
              <Button onClick={() => window.location.reload()} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex) / questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-muted-foreground">Level {level}</span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i} 
              className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <Progress value={progress} className="h-4" />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{currentQuestion.text}</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.choices.map((choice) => {
            let variant = "outline"
            let className = "justify-start text-lg p-6 h-auto hover:bg-accent hover:text-accent-foreground"
            
            if (isChecked) {
              if (choice.is_correct && isCorrect) {
                className += " bg-green-100 border-green-500 text-green-900 dark:bg-green-900/30 dark:text-green-100"
              } else if (selectedChoice === choice.id && !choice.is_correct) {
                className += " bg-red-100 border-red-500 text-red-900 dark:bg-red-900/30 dark:text-red-100"
              }
            } else if (selectedChoice === choice.id) {
              className += " border-primary bg-primary/10 text-primary"
            }

            return (
              <Button
                key={choice.id}
                variant="outline"
                className={className}
                onClick={() => !isChecked && setSelectedChoice(choice.id)}
                disabled={isChecked}
              >
                <div className="flex items-center w-full">
                  <span className="flex-1 text-left">{choice.text}</span>
                  {isChecked && choice.is_correct && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  )}
                  {isChecked && selectedChoice === choice.id && !choice.is_correct && (
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </Button>
            )
          })}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 p-4 border-t bg-background transition-colors duration-300 ${
        isChecked 
          ? isCorrect 
            ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900' 
            : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900'
          : ''
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {isChecked && !isCorrect && currentQuestion.verse_reference && (
            <div className="flex items-center gap-2 text-muted-foreground bg-background/50 p-2 rounded-md">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Read more: {currentQuestion.verse_reference}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center w-full">
            {isChecked ? (
              <>
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleNext}
                  size="lg"
                  className={isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                >
                  {lives === 0 ? 'See Results' : 'Continue'} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="flex justify-end w-full">
                <Button 
                  onClick={handleCheck} 
                  disabled={selectedChoice === null}
                  size="lg"
                  className="w-full md:w-auto px-8"
                >
                  Check
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
