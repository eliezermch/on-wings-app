'use server'

import { cookies } from 'next/headers'
import { Question, UserProgress } from '@/types/quiz'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

async function getAuthHeaders() {
  const cookieStore = await cookies()
  const token = cookieStore.get('jwt')
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Token ${token.value}` : '',
  }
}

export async function getQuestions(testament: 'OLD' | 'NEW', language: 'EN' | 'ES' = 'EN', level: number = 1): Promise<Question[]> {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/quizzes/questions/random/?testament=${testament}&language=${language}&level=${level}`, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch questions')
  }

  return res.json()
}

export async function getUserProgress(testament: 'OLD' | 'NEW'): Promise<UserProgress> {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/quizzes/progress/my_progress/?testament=${testament}`, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch progress')
  }

  return res.json()
}

export async function completeLevel(testament: 'OLD' | 'NEW', score: number): Promise<UserProgress> {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/quizzes/progress/complete_level/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ testament, score }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to complete level')
  }

  return res.json()
}
