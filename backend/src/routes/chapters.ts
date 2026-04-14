import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'

const router = Router()

// Get all chapters with exercise counts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('chapters_with_exercise_count')
      .select('*')
      .order('week_number', { ascending: true })

    if (error) throw error
    res.json(data || [])
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Get single chapter with all exercises
router.get('/:chapterId', async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params

    const { data: chapter, error: chapterError } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', chapterId)
      .single()

    if (chapterError || !chapter) {
      return res.status(404).json({ error: 'Chapter not found' })
    }

    const { data: exercises, error: exercisesError } = await supabase
      .from('exercises')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('part', { ascending: true })
      .order('"order"', { ascending: true })

    if (exercisesError) throw exercisesError

    res.json({
      ...chapter,
      exercises: exercises || [],
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
