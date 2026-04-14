import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useExercise } from '../hooks/useExercise'
import { useUserProgress } from '../hooks/useUserProgress'

const ExercisePlayer: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>()
  const navigate = useNavigate()
  const { exercise, loading: exerciseLoading, fetchExercise } = useExercise()
  const { progress, submitAnswer, loading: submitLoading } = useUserProgress()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (exerciseId) {
      fetchExercise(exerciseId)
    }
  }, [exerciseId, fetchExercise])

  const handleSubmit = async () => {
    if (selectedOption === null || !exerciseId) return

    try {
      const response = await submitAnswer(exerciseId, selectedOption)
      setResult(response)
      setIsSubmitted(true)
      setShowExplanation(false)
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  if (exerciseLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading exercise...</div>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-600">Exercise not found</div>
      </div>
    )
  }

  const isCorrect = result?.isCorrect
  const xpGained = result?.xpGained

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:underline font-medium"
        >
          ← Back
        </button>
        <div className="text-right">
          <p className="text-sm text-gray-600">Current Level</p>
          <p className="text-2xl font-bold text-primary">{progress?.currentLevel || 1}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {exercise.part} - Question {exercise.order}
          </div>
          <h1 className="text-3xl font-bold mb-2">{exercise.question}</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Difficulty: {exercise.difficulty === 1 ? '⭐ Easy' : exercise.difficulty === 2 ? '⭐⭐ Medium' : '⭐⭐⭐ Hard'}</span>
            <span className="text-orange-600 font-medium">{exercise.xpReward} XP</span>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="space-y-3">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedOption === index
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className={`font-medium ${selectedOption === index ? 'text-primary' : 'text-gray-900'}`}>
                  {String.fromCharCode(65 + index)}) {option}
                </div>
              </button>
            ))}
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || submitLoading}
              className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
            >
              {submitLoading ? 'Submitting...' : 'Submit Answer'}
            </button>
          </div>
        ) : (
          <div>
            <div className={`mb-6 p-4 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'}`}>
              <div className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              {isCorrect && (
                <div className="text-green-800 font-medium mt-1">+{xpGained} XP</div>
              )}
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full mb-4 text-primary hover:underline font-medium text-left"
            >
              {showExplanation ? '▼ Hide Explanation' : '▶ Show Explanation'}
            </button>

            {showExplanation && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <p className="text-gray-800">{exercise.explanation}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/topics/' + exercise.topicId)}
                className="flex-1 bg-secondary text-white py-2 rounded-lg font-medium hover:bg-opacity-90"
              >
                Next Exercise
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg font-medium hover:bg-opacity-90"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExercisePlayer
