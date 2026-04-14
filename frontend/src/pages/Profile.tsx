import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useUserProgress } from '../hooks/useUserProgress'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const { progress, fetchProgress, loading } = useUserProgress()

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Your Profile</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="text-lg font-medium text-gray-900">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">User ID</label>
            <p className="text-lg font-medium text-gray-900 font-mono text-sm">{user?.id || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-600 text-sm font-medium">Current Level</div>
          <div className="text-4xl font-bold text-primary mt-2">
            {loading ? '...' : progress?.currentLevel || 1}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-600 text-sm font-medium">Total XP</div>
          <div className="text-4xl font-bold text-secondary mt-2">
            {loading ? '...' : progress?.totalXP || 0}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-600 text-sm font-medium">Exercises Completed</div>
          <div className="text-4xl font-bold text-accent mt-2">
            {loading ? '...' : progress?.exercisesCompleted || 0}
          </div>
        </div>
      </div>

      {progress?.achievements && progress.achievements.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progress.achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-medium text-yellow-900">🏆 {achievement}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!progress?.achievements || progress.achievements.length === 0) && !loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-gray-600">No achievements yet. Start completing exercises to earn achievements!</p>
        </div>
      )}
    </div>
  )
}

export default Profile
