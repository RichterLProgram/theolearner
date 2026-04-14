import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExercise } from '../hooks/useExercise';
import { useUserProgress } from '../hooks/useUserProgress';
const ExercisePlayer = () => {
    const { exerciseId } = useParams();
    const navigate = useNavigate();
    const { exercise, loading: exerciseLoading, fetchExercise } = useExercise();
    const { progress, submitAnswer, loading: submitLoading } = useUserProgress();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    useEffect(() => {
        if (exerciseId) {
            fetchExercise(exerciseId);
        }
    }, [exerciseId, fetchExercise]);
    const handleSubmit = async () => {
        if (selectedOption === null || !exerciseId)
            return;
        try {
            const response = await submitAnswer(exerciseId, selectedOption);
            setResult(response);
            setIsSubmitted(true);
            setShowExplanation(false);
        }
        catch (error) {
            console.error('Failed to submit answer:', error);
        }
    };
    if (exerciseLoading) {
        return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsx("div", { className: "text-lg", children: "Loading exercise..." }) }));
    }
    if (!exercise) {
        return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsx("div", { className: "text-lg text-red-600", children: "Exercise not found" }) }));
    }
    const isCorrect = result?.isCorrect;
    const xpGained = result?.xpGained;
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "mb-6 flex justify-between items-center", children: [_jsx("button", { onClick: () => navigate(-1), className: "text-primary hover:underline font-medium", children: "\u2190 Back" }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Current Level" }), _jsx("p", { className: "text-2xl font-bold text-primary", children: progress?.currentLevel || 1 })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4", children: [exercise.part, " - Question ", exercise.order] }), _jsx("h1", { className: "text-3xl font-bold mb-2", children: exercise.question }), _jsxs("div", { className: "flex gap-4 text-sm text-gray-600", children: [_jsxs("span", { children: ["Difficulty: ", exercise.difficulty === 1 ? '⭐ Easy' : exercise.difficulty === 2 ? '⭐⭐ Medium' : '⭐⭐⭐ Hard'] }), _jsxs("span", { className: "text-orange-600 font-medium", children: [exercise.xpReward, " XP"] })] })] }), !isSubmitted ? (_jsxs("div", { className: "space-y-3", children: [exercise.options.map((option, index) => (_jsx("button", { onClick: () => setSelectedOption(index), className: `w-full text-left p-4 rounded-lg border-2 transition-all ${selectedOption === index
                                    ? 'border-primary bg-blue-50'
                                    : 'border-gray-300 hover:border-gray-400'}`, children: _jsxs("div", { className: `font-medium ${selectedOption === index ? 'text-primary' : 'text-gray-900'}`, children: [String.fromCharCode(65 + index), ") ", option] }) }, index))), _jsx("button", { onClick: handleSubmit, disabled: selectedOption === null || submitLoading, className: "w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50", children: submitLoading ? 'Submitting...' : 'Submit Answer' })] })) : (_jsxs("div", { children: [_jsxs("div", { className: `mb-6 p-4 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'}`, children: [_jsx("div", { className: `text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`, children: isCorrect ? '✅ Correct!' : '❌ Incorrect' }), isCorrect && (_jsxs("div", { className: "text-green-800 font-medium mt-1", children: ["+", xpGained, " XP"] }))] }), _jsx("button", { onClick: () => setShowExplanation(!showExplanation), className: "w-full mb-4 text-primary hover:underline font-medium text-left", children: showExplanation ? '▼ Hide Explanation' : '▶ Show Explanation' }), showExplanation && (_jsx("div", { className: "bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6", children: _jsx("p", { className: "text-gray-800", children: exercise.explanation }) })), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => navigate('/topics/' + exercise.topicId), className: "flex-1 bg-secondary text-white py-2 rounded-lg font-medium hover:bg-opacity-90", children: "Next Exercise" }), _jsx("button", { onClick: () => navigate('/dashboard'), className: "flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg font-medium hover:bg-opacity-90", children: "Dashboard" })] })] }))] })] }));
};
export default ExercisePlayer;
