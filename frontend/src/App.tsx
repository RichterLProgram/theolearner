import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ChapterView from './pages/ChapterView'
import TopicView from './pages/TopicView'
import ExercisePlayer from './pages/ExercisePlayer'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'

interface ProtectedRouteProps {
  element: React.ReactNode
}

function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return user ? element : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />            <Route path="/chapter/:chapterId" element={<ProtectedRoute element={<ChapterView />} />} />              <Route path="/topic/:topicId" element={<ProtectedRoute element={<TopicView />} />} />
              <Route path="/exercise/:exerciseId" element={<ProtectedRoute element={<ExercisePlayer />} />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
