import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChapters } from '../hooks/useChapters';
import { useTheme } from '../context/ThemeContext';
const ChapterView = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const { fetchChapterWithExercises, loading } = useChapters();
    const { isDark } = useTheme();
    const [chapter, setChapter] = useState(null);
    useEffect(() => {
        if (chapterId) {
            fetchChapterWithExercises(chapterId).then(setChapter);
        }
    }, [chapterId, fetchChapterWithExercises]);
    const getDifficultyColor = (diff) => {
        if (diff === 1)
            return isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
        if (diff === 2)
            return isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
        return isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800';
    };
    const getDifficultyLabel = (diff) => {
        if (diff === 1)
            return 'Easy';
        if (diff === 2)
            return 'Medium';
        return 'Hard';
    };
    if (loading) {
        return (_jsx("div", { className: "text-center text-gray-600", children: "Loading chapter..." }));
    }
    if (!chapter) {
        return (_jsx("div", { className: "text-center text-red-600", children: "Chapter not found" }));
    }
    const exercisesByPart = {};
    (chapter.exercises || []).forEach((ex) => {
        if (!exercisesByPart[ex.part]) {
            exercisesByPart[ex.part] = [];
        }
        exercisesByPart[ex.part].push(ex);
    });
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => navigate('/dashboard'), className: `${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-primary hover:underline'} font-medium mb-6`, children: "\u2190 Back to Dashboard" }), _jsx("h1", { className: `text-4xl font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`, children: chapter.title }), _jsx("p", { className: isDark ? 'text-gray-400 mb-8' : 'text-gray-600 mb-8', children: chapter.description }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-8", children: [_jsxs("div", { className: `p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`, children: [_jsx("div", { className: `text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`, children: "Total Exercises" }), _jsx("div", { className: "text-2xl font-bold text-primary", children: chapter.exercise_count })] }), _jsxs("div", { className: `p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`, children: [_jsx("div", { className: `text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`, children: "Difficulty Range" }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx("span", { className: "text-green-500", children: "\u25CF" }), _jsx("span", { className: "text-yellow-500", children: "\u25CF" }), _jsx("span", { className: "text-red-500", children: "\u25CF" })] })] }), _jsxs("div", { className: `p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`, children: [_jsx("div", { className: `text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`, children: "Max XP" }), _jsx("div", { className: "text-2xl font-bold text-orange-500", children: (chapter.exercises || []).reduce((sum, ex) => sum + ex.xp_reward, 0) })] })] }), _jsx("div", { className: "space-y-6", children: Object.entries(exercisesByPart).map(([part, exercises]) => (_jsxs("div", { className: `rounded-lg shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`, children: [_jsx("div", { className: `px-6 py-4 border-b ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`, children: _jsxs("h3", { className: `font-bold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`, children: ["Part ", part] }) }), _jsx("div", { className: `divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`, children: exercises
                                .sort((a, b) => a.order - b.order)
                                .map((exercise) => (_jsx("div", { className: `p-6 hover:opacity-80 transition-opacity cursor-pointer ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`, onClick: () => navigate(`/exercise/${exercise.id}`), children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: `font-medium text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`, children: ["Question ", exercise.order] }), _jsx("h4", { className: `font-medium mb-3 line-clamp-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`, children: exercise.question }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("span", { className: `px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`, children: getDifficultyLabel(exercise.difficulty) }), _jsxs("span", { className: `font-medium text-sm ${isDark ? 'text-orange-400' : 'text-orange-600'}`, children: [exercise.xp_reward, " XP"] })] })] }), _jsx("button", { className: "bg-primary text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 whitespace-nowrap", children: "Start" })] }) }, exercise.id))) })] }, part))) })] }));
};
export default ChapterView;
