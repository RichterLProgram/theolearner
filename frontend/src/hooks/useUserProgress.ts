import { useState, useCallback } from 'react'
import apiClient from '../services/api'

export interface UserProgress {
  exercisesCompleted: number
  totalXP: number
  currentLevel: number
  xpToNextLevel: number
  achievements: string[]
  streak: number
}

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProgress = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/user/progress')
      setProgress(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const submitAnswer = useCallback(
    async (exerciseId: string, selectedOption: number) => {
      try {
        const response = await apiClient.post(
          `/exercises/${exerciseId}/submit`,
          { selectedOption }
        )
        await fetchProgress() // Refresh progress
        return response.data
      } catch (err: any) {
        setError(err.message)
        throw err
      }
    },
    [fetchProgress]
  )

  return { progress, loading, error, fetchProgress, submitAnswer }
}
