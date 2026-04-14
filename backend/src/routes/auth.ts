import { Router, Request, Response, NextFunction } from 'express'
import { supabase } from '../config/supabase'

const router = Router()

interface AuthRequest extends Request {
  userId?: string
  token?: string
}

// Middleware: Verify JWT token
export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' })
    }

    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    req.userId = data.user.id
    req.token = token
    next()
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    // Create admin supabase client for registration (avoids rate limits)
    const adminSupabase = await import('@supabase/supabase-js').then((m) =>
      m.createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    )

    // Sign up user with admin client (no rate limiting)
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email to skip verification
    })

    if (authError) {
      return res.status(400).json({ error: authError.message })
    }

    const userId = authData.user?.id
    if (!userId) {
      return res.status(500).json({ error: 'Failed to create user' })
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        username: username || email.split('@')[0],
        display_name: username || email,
        total_xp: 0,
        current_level: 1,
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
    }

    res.status(201).json({
      message: 'User created successfully',
      user: authData.user,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return res.status(401).json({ error: error.message })
    }

    res.json({
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
      user: data.user,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get current user
router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return res.status(404).json({ error: 'User profile not found' })
    }

    res.json(data)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Refresh token
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body

    if (!refresh_token) {
      return res.status(400).json({ error: 'Refresh token required' })
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token,
    })

    if (error) {
      return res.status(401).json({ error: error.message })
    }

    res.json({
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export { router as default }
