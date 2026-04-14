import { useState, useCallback } from 'react';
import apiClient from '../services/api';
export const useExercise = () => {
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchExercise = useCallback(async (exerciseId) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/exercises/${exerciseId}`);
            setExercise(response.data);
            setError(null);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }, []);
    return { exercise, loading, error, fetchExercise };
};
