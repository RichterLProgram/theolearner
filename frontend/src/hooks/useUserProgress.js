import { useState, useCallback } from 'react';
import apiClient from '../services/api';
export const useUserProgress = () => {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchProgress = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/user/progress');
            setProgress(response.data);
            setError(null);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }, []);
    const submitAnswer = useCallback(async (exerciseId, selectedOption) => {
        try {
            const response = await apiClient.post(`/exercises/${exerciseId}/submit`, { selectedOption });
            await fetchProgress(); // Refresh progress
            return response.data;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    }, [fetchProgress]);
    return { progress, loading, error, fetchProgress, submitAnswer };
};
