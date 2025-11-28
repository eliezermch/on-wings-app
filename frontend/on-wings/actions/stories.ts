'use server'

import { cookies } from 'next/headers'
import { Story } from '@/types/story'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

async function getAuthHeaders() {
  const cookieStore = await cookies()
  const token = cookieStore.get('jwt')
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Token ${token.value}` : '',
  }
}

export async function getStories(): Promise<Story[]> {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/stories/`, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch stories')
  }

  return res.json()
}

export async function getStory(id: string): Promise<Story> {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/stories/${id}/`, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch story')
  }

  return res.json()
}

export async function toggleLikeStory(id: number) {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/stories/${id}/like/`, {
    method: 'POST',
    headers,
  })

  if (!res.ok) {
    throw new Error('Failed to like story')
  }

  return res.json()
}

export async function rateStory(id: number, score: number) {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/stories/${id}/rate/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ score }),
  })

  if (!res.ok) {
    throw new Error('Failed to rate story')
  }

  return res.json()
}

export async function getLikedStories(): Promise<Story[]> {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/stories/liked/`, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch liked stories')
  }

  return res.json()
}
