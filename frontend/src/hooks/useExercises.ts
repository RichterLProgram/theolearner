import { useState, useCallback } from 'react'
import apiClient from '../services/api'

export interface Exercise {
  id: string
  topic_id: string
  part: string
  order: number
  question: string
  options: string[]
  correct_answer: number
  explanation: string
  difficulty: number
  xp_reward: number
}

export const useExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAllExercises = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/exercises')
      setExercises(response.data || [])
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setExercises([])
    } finally {
      setLoading(false)
    }
  }, [])

  return { exercises, loading, error, fetchAllExercises }
}
