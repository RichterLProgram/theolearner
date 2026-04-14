import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center mb-6">
          <div className="text-4xl">📚</div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">TheoLearner</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full" />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
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
