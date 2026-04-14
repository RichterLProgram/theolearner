import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'

const router = Router()

interface AuthRequest extends Request {
  userId?: string
}

// Middleware: Verify token
const verifyToken = async (req: AuthRequest, res: Response, next: Function) => {
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
    next()
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}

// Get user progress
router.get('/progress', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!

    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError) {
      return res.status(404).json({ error: 'User profile not found' })
    }

    const { data: progressRecords } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    const exercisesCompleted = progressRecords?.filter((p) => p.is_completed).length || 0
    const xpToNextLevel = Math.max(0, (userProfile.current_level + 1) * 100 - userProfile.total_xp)

    res.json({
      userId,
      username: userProfile.username,
      displayName: userProfile.display_name,
      totalXP: userProfile.total_xp,
      currentLevel: userProfile.current_level,
      xpToNextLevel,
      exercisesCompleted,
      streak: userProfile.streak,
      avatarUrl: userProfile.avatar_url,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get user statistics
router.get('/stats', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!

    const { data: progressRecords } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    const exercisesCompleted = progressRecords?.filter((p) => p.is_completed).length || 0
    const totalExercises = progressRecords?.length || 0
    const totalXPEarned = progressRecords?.reduce((sum, p) => sum + (p.xp_earned || 0), 0) || 0
    const accuracy =
      totalExercises > 0
        ? Math.round((exercisesCompleted / totalExercises) * 100)
        : 0

    res.json({
      exercisesCompleted,
      totalExercises,
      accuracy,
      totalXPEarned,
      averageXPPerExercise:
        exercisesCompleted > 0 ? Math.round(totalXPEarned / exercisesCompleted) : 0,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get user achievements
router.get('/achievements', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!

    const { data: userAchievements, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievement:achievements(id, name, description, icon, xp_bonus)
      `)
      .eq('user_id', userId)

    if (error) {
      throw error
    }

    res.json(userAchievements || [])
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get leaderboard
router.get('/leaderboard', async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100)

    const { data: leaderboard, error } = await supabase
      .from('user_profiles')
      .select('username, display_name, total_xp, current_level, avatar_url')
      .order('total_xp', { ascending: false })
      .limit(limit)

    if (error) {
      throw error
    }

    // Add rank
    const withRank = leaderboard?.map((user, index) => ({
      rank: index + 1,
      ...user,
    })) || []

    res.json(withRank)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get user rank
router.get('/rank', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!

    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('total_xp')
      .eq('id', userId)
      .single()

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Count users with higher XP
    const { count } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .gt('total_xp', userProfile.total_xp)

    const rank = (count || 0) + 1

    res.json({ rank, totalXP: userProfile.total_xp })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export { router as default }
