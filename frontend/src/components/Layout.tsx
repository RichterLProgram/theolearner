import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Layout: React.FC = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} style={{ borderBottom: '1px solid' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="text-2xl font-bold text-primary">📚</div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>TheoLearner</h1>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</span>
              <button
                onClick={() => navigate('/leaderboard')}
                className={`px-4 py-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-primary' : 'text-gray-900 hover:text-primary'}`}
              >
                🏆 Leaderboard
              </button>
              <button
                onClick={() => navigate('/profile')}
                className={`px-4 py-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-primary' : 'text-gray-900 hover:text-primary'}`}
              >
                Profile
              </button>
              <button
                onClick={toggleTheme}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} style={{ borderTop: '1px solid' }}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2026 TheoLearner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
