import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserProgress } from '../hooks/useUserProgress'
import { useChapters } from '../hooks/useChapters'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isDark } = useTheme()
  const { progress, fetchProgress, loading: progressLoading } = useUserProgress()
  const { chapters, fetchChapters, loading: chaptersLoading } = useChapters()

  useEffect(() => {
    fetchProgress()
    fetchChapters()
  }, [fetchProgress, fetchChapters])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Please log in first</div>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Welcome back!</h1>
        {user?.email && <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{user.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={`p-6 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current Level</div>
          <div className="text-4xl font-bold text-primary mt-2">
            {progressLoading ? '...' : progress?.currentLevel || 1}
          </div>
        </div>
        <div className={`p-6 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total XP</div>
          <div className="text-4xl font-bold text-secondary mt-2">
            {progressLoading ? '...' : progress?.totalXP || 0}
          </div>
          {progress?.xpToNextLevel && (
            <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              {progress.xpToNextLevel} XP to level {(progress.currentLevel || 1) + 1}
            </div>
          )}
        </div>
        <div className={`p-6 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Achievements</div>
          <div className="text-4xl font-bold text-accent mt-2">
            {progressLoading ? '...' : progress?.achievements?.length || 0}
          </div>
        </div>
      </div>

      <div>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>📚 Study Chapters</h2>
        {chaptersLoading ? (
          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading chapters...</div>
        ) : chapters.length === 0 ? (
          <div className={`p-6 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'}`}>
            No chapters available yet
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => navigate(`/chapter/${chapter.id}`)}
                className={`p-6 rounded-lg shadow-sm border cursor-pointer transition-all hover:shadow-md ${isDark ? 'bg-gray-800 border-gray-700 hover:border-primary' : 'bg-white border-gray-200 hover:border-primary'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className={`font-semibold text-sm mb-2 ${isDark ? 'text-primary' : 'text-primary'}`}>
                      Week {chapter.week_number}
                    </div>
                    <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                      {chapter.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {chapter.description}
                    </p>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Exercises: </span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{chapter.exercise_count}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium dark:bg-green-900 dark:text-green-200">
                          {chapter.easy_count} Easy
                        </span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium dark:bg-yellow-900 dark:text-yellow-200">
                          {chapter.medium_count} Med
                        </span>
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium dark:bg-red-900 dark:text-red-200">
                          {chapter.hard_count} Hard
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 whitespace-nowrap">
                    Start Week
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
