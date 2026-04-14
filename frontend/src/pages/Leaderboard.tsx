import React, { useEffect } from 'react'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { useAuth } from '../context/AuthContext'

const Leaderboard: React.FC = () => {
  const { user } = useAuth()
  const { leaderboard, loading, fetchLeaderboard } = useLeaderboard()

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">🏆 Leaderboard</h1>
      <p className="text-gray-600 mb-8">Top players ranked by XP and level</p>

      {loading ? (
        <div className="text-center text-gray-600">Loading leaderboard...</div>
      ) : leaderboard.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-600">
          No players found yet
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Rank</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Player</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Level</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">XP</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = user?.id === entry.user_id
                return (
                  <tr
                    key={entry.user_id}
                    className={isCurrentUser ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {entry.rank === 1 && <span className="text-2xl">🥇</span>}
                        {entry.rank === 2 && <span className="text-2xl">🥈</span>}
                        {entry.rank === 3 && <span className="text-2xl">🥉</span>}
                        {entry.rank > 3 && <span className="font-bold text-gray-900">{entry.rank}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {entry.username}
                        {isCurrentUser && <span className="ml-2 text-blue-600 text-sm">(You)</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary">{entry.current_level}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-orange-600">{entry.total_xp}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{entry.exercises_completed} / 11</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
