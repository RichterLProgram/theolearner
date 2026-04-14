import { getDb } from '../config/firebase'

export class ExerciseService {
  private db = getDb()

  async getAllExercises() {
    const snapshot = await this.db.collection('exercises').get()
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  async getExercisesByTopic(topicId: string) {
    const snapshot = await this.db
      .collection('exercises')
      .where('topicId', '==', topicId)
      .orderBy('order', 'asc')
      .get()
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  async getExerciseById(exerciseId: string) {
    const doc = await this.db.collection('exercises').doc(exerciseId).get()
    if (!doc.exists) throw new Error('Exercise not found')
    return { id: doc.id, ...doc.data() }
  }

  async submitAnswer(userId: string, exerciseId: string, selectedOptionId: number, isCorrect: boolean) {
    const batch = this.db.batch()
    
    const progressRef = this.db.collection('userProgress').doc(`${userId}_${exerciseId}`)
    batch.set(progressRef, {
      userId,
      exerciseId,
      isCompleted: isCorrect,
      score: isCorrect ? 1 : 0,
      attempts: 1,
      selectedOption: selectedOptionId,
      lastAttempt: new Date(),
      xpEarned: isCorrect ? 15 : 0
    }, { merge: true })

    await batch.commit()
    return { isCorrect, xpEarned: isCorrect ? 15 : 0 }
  }
}

export const exerciseService = new ExerciseService()
