import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'
import { exerciseService } from '../services/ExerciseService'
import { gamificationService } from '../services/GamificationService'

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

// Get all exercises
router.get('/', async (req: Request, res: Response) => {
  try {
    const exercises = await exerciseService.getAllExercises()
    res.json(exercises)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get exercises by topic
router.get('/topic/:topicId', async (req: Request, res: Response) => {
  try {
    const { topicId } = req.params
    const exercises = await exerciseService.getExercisesByTopic(topicId)
    res.json(exercises)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get single exercise
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const exercise = await exerciseService.getExerciseById(id)
    res.json(exercise)
  } catch (err: any) {
    res.status(404).json({ error: err.message })
  }
})

// Submit answer to exercise
router.post('/:id/submit', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!
    const exerciseId = req.params.id
    const { selectedOption } = req.body

    if (typeof selectedOption !== 'number') {
      return res.status(400).json({ error: 'selectedOption must be a number' })
    }

    // Get exercise to check answer
    const exercise = await exerciseService.getExerciseById(exerciseId)
    const isCorrect = selectedOption === exercise.correct_answer

    // Calculate XP
    const xpEarned = isCorrect
      ? gamificationService.calculateXP(exercise.difficulty, 1, true)
      : 0

    // Save progress
    const { error: progressError } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: userId,
          exercise_id: exerciseId,
          is_completed: isCorrect,
          score: isCorrect ? 1 : 0,
          selected_option: selectedOption,
          xp_earned: xpEarned,
          last_attempt: new Date().toISOString(),
          attempts: (await supabase
            .from('user_progress')
            .select('attempts')
            .eq('user_id', userId)
            .eq('exercise_id', exerciseId)
            .single()
            .catch(() => ({ data: { attempts: 0 } }))).data?.attempts || 0
        },
        { onConflict: 'user_id,exercise_id' }
      )

    if (progressError) {
      throw progressError
    }

    // Update user total XP if correct
    if (isCorrect && xpEarned > 0) {
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('total_xp')
        .eq('id', userId)
        .single()

      const newTotalXP = (userProfile?.total_xp || 0) + xpEarned
      const newLevel = gamificationService.calculateLevel(newTotalXP)

      await supabase
        .from('user_profiles')
        .update({
          total_xp: newTotalXP,
          current_level: newLevel,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      // Check for achievements
      const achievements = await gamificationService.checkAchievements(userId, {
        exercisesCompleted: newTotalXP,
        totalXP: newTotalXP,
      })

      console.log(`User ${userId} earned ${xpEarned} XP. Total: ${newTotalXP}. Level: ${newLevel}`)
    }

    res.json({
      isCorrect,
      xpEarned,
      explanation: exercise.explanation,
      correctAnswer: exercise.correct_answer,
    })
  } catch (err: any) {
    console.error('Submission error:', err)
    res.status(500).json({ error: err.message })
  }
})

export { router as default }
