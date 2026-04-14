import { useState, useCallback } from 'react'
import apiClient from '../services/api'

export interface LeaderboardEntry {
  user_id: string
  username: string
  total_xp: number
  current_level: number
  exercises_completed: number
  rank: number
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/user/leaderboard')
      setLeaderboard(response.data || [])
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }, [])

  return { leaderboard, loading, error, fetchLeaderboard }
}
