import { supabase } from '../config/supabase'

export class GamificationService {
  calculateXP(difficulty: number, attempts: number, isCorrect: boolean): number {
    if (!isCorrect) return 0
    
    const baseXP = difficulty === 1 ? 15 : difficulty === 2 ? 25 : 40
    const attemptPenalty = Math.max(0.5, 1 - (attempts - 1) * 0.25)
    return Math.round(baseXP * attemptPenalty)
  }

  calculateLevel(totalXP: number): number {
    return Math.floor(totalXP / 100) + 1
  }

  getXPToNextLevel(totalXP: number): number {
    const currentLevel = this.calculateLevel(totalXP)
    const nextLevelXP = currentLevel * 100
    return nextLevelXP - totalXP
  }

  async checkAchievements(userId: string, userStats: any): Promise<string[]> {
    const unlockedAchievements: string[] = []
    
    try {
      // Get all achievements
      const { data: achievements } = await supabase
        .from('achievements')
        .select('*')

      // Get user's already unlocked achievements
      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', userId)

      const unlockedIds = new Set(userAchievements?.map((ua) => ua.achievement_id) || [])

      for (const achievement of achievements || []) {
        if (unlockedIds.has(achievement.id)) continue

        const shouldUnlock = this.checkAchievementCondition(achievement, userStats)
        if (shouldUnlock) {
          // Unlock achievement
          const { error } = await supabase
            .from('user_achievements')
            .insert({ user_id: userId, achievement_id: achievement.id })

          if (!error) {
            unlockedAchievements.push(achievement.name)
          }
        }
      }
    } catch (err) {
      console.error('Error checking achievements:', err)
    }

    return unlockedAchievements
  }

  private checkAchievementCondition(achievement: any, userStats: any): boolean {
    const condition = achievement.unlock_condition

    if (condition.type === 'exercises_completed') {
      // Count completed exercises
      return userStats.exercisesCompleted >= condition.count
    }

    if (condition.type === 'total_xp') {
      return userStats.totalXP >= condition.amount
    }

    if (condition.type === 'streak') {
      return userStats.streak >= condition.count
    }

    if (condition.type === 'topic_completed') {
      // More complex - would need to check if all exercises in topic are done
      return false
    }

    return false
  }
}

export const gamificationService = new GamificationService()
