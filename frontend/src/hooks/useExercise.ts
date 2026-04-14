import { useState, useCallback } from 'react'
import apiClient from '../services/api'

export interface Exercise {
  id: string
  topicId: string
  part: string
  order: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: number
  xpReward: number
}

export const useExercise = () => {
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchExercise = useCallback(async (exerciseId: string) => {
    setLoading(true)
    try {
      const response = await apiClient.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { exercise, loading, error, fetchExercise }
}
