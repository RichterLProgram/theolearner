import { useState, useCallback } from 'react'
import apiClient from '../services/api'

export interface ChapterWithExercises {
  id: string
  week_number: number
  title: string
  description: string
  exercise_count: number
  easy_count: number
  medium_count: number
  hard_count: number
  exercises?: Exercise[]
}

export interface Exercise {
  id: string
  chapter_id: string
  part: string
  order: number
  question: string
  options: string[]
  correct_answer: number
  explanation: string
  difficulty: number
  xp_reward: number
}

export const useChapters = () => {
  const [chapters, setChapters] = useState<ChapterWithExercises[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchChapters = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/chapters')
      setChapters(response.data || [])
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setChapters([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchChapterWithExercises = useCallback(async (chapterId: string) => {
    setLoading(true)
    try {
      const response = await apiClient.get(`/chapters/${chapterId}`)
      return response.data
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { chapters, loading, error, fetchChapters, fetchChapterWithExercises }
}
