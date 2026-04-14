import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useExercises } from '../hooks/useExercises'

const TopicView: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const { exercises, fetchAllExercises, loading } = useExercises()

  useEffect(() => {
    fetchAllExercises()
  }, [fetchAllExercises])

  const topicExercises = exercises.filter((ex) => ex.topic_id === topicId)

  const getDifficultyColor = (diff: number) => {
    if (diff === 1) return 'bg-green-100 text-green-800'
    if (diff === 2) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getDifficultyLabel = (diff: number) => {
    if (diff === 1) return 'Easy'
    if (diff === 2) return 'Medium'
    return 'Hard'
  }

  return (
    <div>
      <button
        onClick={() => navigate('/dashboard')}
        className="text-primary hover:underline font-medium mb-6"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-2">Formale Sprachen</h1>
      <p className="text-gray-600 mb-8">Challenge 2.2 – Practice exercises on formal languages</p>

      {loading ? (
        <div className="text-center text-gray-600">Loading exercises...</div>
      ) : topicExercises.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-600">
          No exercises found for this topic
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          {topicExercises
            .sort((a, b) => a.order - b.order)
            .map((exercise) => (
              <div
                key={exercise.id}
                className="p-6 hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/exercise/${exercise.id}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-medium text-gray-600 text-sm mb-2">
                      Part {exercise.part} – Question {exercise.order}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-3 line-clamp-2">
                      {exercise.question}
                    </h3>
                    <div className="flex gap-2 items-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyLabel(exercise.difficulty)}
                      </span>
                      <span className="text-orange-600 font-medium text-sm">
                        {exercise.xp_reward} XP
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/exercise/${exercise.id}`)
                    }}
                    className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 whitespace-nowrap"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default TopicView
