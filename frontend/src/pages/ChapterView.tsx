import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useChapters, ChapterWithExercises } from '../hooks/useChapters'
import { useTheme } from '../context/ThemeContext'

const ChapterView: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>()
  const navigate = useNavigate()
  const { fetchChapterWithExercises, loading } = useChapters()
  const { isDark } = useTheme()
  const [chapter, setChapter] = useState<ChapterWithExercises | null>(null)

  useEffect(() => {
    if (chapterId) {
      fetchChapterWithExercises(chapterId).then(setChapter)
    }
  }, [chapterId, fetchChapterWithExercises])

  const getDifficultyColor = (diff: number) => {
    if (diff === 1) return isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
    if (diff === 2) return isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
    return isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
  }

  const getDifficultyLabel = (diff: number) => {
    if (diff === 1) return 'Easy'
    if (diff === 2) return 'Medium'
    return 'Hard'
  }

  if (loading) {
    return (
      <div className="text-center text-gray-600">Loading chapter...</div>
    )
  }

  if (!chapter) {
    return (
      <div className="text-center text-red-600">Chapter not found</div>
    )
  }

  const exercisesByPart: Record<string, any[]> = {}
  ;(chapter.exercises || []).forEach((ex) => {
    if (!exercisesByPart[ex.part]) {
      exercisesByPart[ex.part] = []
    }
    exercisesByPart[ex.part].push(ex)
  })

  return (
    <div>
      <button
        onClick={() => navigate('/dashboard')}
        className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-primary hover:underline'} font-medium mb-6`}
      >
        ← Back to Dashboard
      </button>

      <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        {chapter.title}
      </h1>
      <p className={isDark ? 'text-gray-400 mb-8' : 'text-gray-600 mb-8'}>{chapter.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Exercises</div>
          <div className="text-2xl font-bold text-primary">{chapter.exercise_count}</div>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Difficulty Range</div>
          <div className="flex gap-2 mt-2">
            <span className="text-green-500">●</span>
            <span className="text-yellow-500">●</span>
            <span className="text-red-500">●</span>
          </div>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Max XP</div>
          <div className="text-2xl font-bold text-orange-500">
            {(chapter.exercises || []).reduce((sum, ex) => sum + ex.xp_reward, 0)}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(exercisesByPart).map(([part, exercises]) => (
          <div key={part} className={`rounded-lg shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`px-6 py-4 border-b ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className={`font-bold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Part {part}</h3>
            </div>
            <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {exercises
                .sort((a, b) => a.order - b.order)
                .map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`p-6 hover:opacity-80 transition-opacity cursor-pointer ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    onClick={() => navigate(`/exercise/${exercise.id}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className={`font-medium text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Question {exercise.order}
                        </div>
                        <h4 className={`font-medium mb-3 line-clamp-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                          {exercise.question}
                        </h4>
                        <div className="flex gap-2 items-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                            {getDifficultyLabel(exercise.difficulty)}
                          </span>
                          <span className={`font-medium text-sm ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                            {exercise.xp_reward} XP
                          </span>
                        </div>
                      </div>
                      <button className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 whitespace-nowrap">
                        Start
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterView
