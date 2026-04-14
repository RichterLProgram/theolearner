import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const { isDark } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full rounded-lg shadow-sm border p-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-center mb-6">
          <div className="text-4xl">📚</div>
        </div>
        <h2 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>TheoLearner</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className={`w-full px-3 py-2 border rounded-md transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-3 py-2 border rounded-md transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className={`text-center text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-primary font-medium hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
