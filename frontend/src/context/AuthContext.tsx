import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient, Session, User } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error: err,
      } = await supabase.auth.getSession()
      
      if (err) {
        setError(err.message)
      } else {
        setSession(session)
        setUser(session?.user || null)
      }
      setLoading(false)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user || null)
      }
    )

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      setSession(data.session)
      setUser(data.user)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const register = async (email: string, password: string, username: string) => {
    try {
      setError(null)
      // Use backend endpoint instead of direct Supabase Auth to avoid rate limits
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Registration failed')

      // Now login with the credentials
      await login(email, password)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export { supabase }
