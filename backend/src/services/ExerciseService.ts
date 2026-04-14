import { supabase } from '../config/supabase'

export class ExerciseService {
  async getAllExercises() {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) throw new Error(`Failed to fetch exercises: ${error.message}`)
    return data || []
  }

  async getExercisesByTopic(topicId: string) {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('topic_id', topicId)
      .order('order', { ascending: true })
    
    if (error) throw new Error(`Failed to fetch topic exercises: ${error.message}`)
    return data || []
  }

  async getExerciseById(exerciseId: string) {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', exerciseId)
      .single()
    
    if (error) throw new Error(`Exercise not found: ${error.message}`)
    return data
  }

  async submitAnswer(userId: string, exerciseId: string, selectedOptionId: number, isCorrect: boolean) {
    const xpEarned = isCorrect ? 15 : 0
    
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        exercise_id: exerciseId,
        is_completed: isCorrect,
        score: isCorrect ? 1 : 0,
        attempts: 1,
        selected_option: selectedOptionId,
        xp_earned: xpEarned,
        last_attempt: new Date().toISOString()
      }, {
        onConflict: 'user_id,exercise_id'
      })
    
    if (error) throw new Error(`Failed to save progress: ${error.message}`)
    return { isCorrect, xpEarned }
  }
}

export const exerciseService = new ExerciseService()
