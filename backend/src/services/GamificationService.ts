import { getDb } from '../config/firebase'

export class GamificationService {
  private db = getDb()

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
    
    // Check if "Erste 5 Übungen" achievement should be unlocked
    if (userStats.exercisesCompleted === 5) {
      unlockedAchievements.push('first-five')
    }

    // Check if "100 XP" milestone
    if (userStats.totalXP >= 100 && userStats.totalXP - 25 < 100) {
      unlockedAchievements.push('hundred-xp')
    }

    return unlockedAchievements
  }
}

export const gamificationService = new GamificationService()
