import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExercises } from '../hooks/useExercises';
const TopicView = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { exercises, fetchAllExercises, loading } = useExercises();
    useEffect(() => {
        fetchAllExercises();
    }, [fetchAllExercises]);
    const topicExercises = exercises.filter((ex) => ex.topic_id === topicId);
    const getDifficultyColor = (diff) => {
        if (diff === 1)
            return 'bg-green-100 text-green-800';
        if (diff === 2)
            return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };
    const getDifficultyLabel = (diff) => {
        if (diff === 1)
            return 'Easy';
        if (diff === 2)
            return 'Medium';
        return 'Hard';
    };
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => navigate('/dashboard'), className: "text-primary hover:underline font-medium mb-6", children: "\u2190 Back to Dashboard" }), _jsx("h1", { className: "text-4xl font-bold mb-2", children: "Formale Sprachen" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Challenge 2.2 \u2013 Practice exercises on formal languages" }), loading ? (_jsx("div", { className: "text-center text-gray-600", children: "Loading exercises..." })) : topicExercises.length === 0 ? (_jsx("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-600", children: "No exercises found for this topic" })) : (_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200", children: topicExercises
                    .sort((a, b) => a.order - b.order)
                    .map((exercise) => (_jsx("div", { className: "p-6 hover:bg-gray-50 transition-colors", onClick: () => navigate(`/exercise/${exercise.id}`), children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "font-medium text-gray-600 text-sm mb-2", children: ["Part ", exercise.part, " \u2013 Question ", exercise.order] }), _jsx("h3", { className: "font-medium text-gray-900 mb-3 line-clamp-2", children: exercise.question }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("span", { className: `px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`, children: getDifficultyLabel(exercise.difficulty) }), _jsxs("span", { className: "text-orange-600 font-medium text-sm", children: [exercise.xp_reward, " XP"] })] })] }), _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    navigate(`/exercise/${exercise.id}`);
                                }, className: "bg-primary text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 whitespace-nowrap", children: "Start" })] }) }, exercise.id))) }))] }));
};
export default TopicView;
