import { useState, useCallback } from 'react';
import apiClient from '../services/api';
export const useChapters = () => {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchChapters = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/chapters');
            setChapters(response.data || []);
            setError(null);
        }
        catch (err) {
            setError(err.message);
            setChapters([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    const fetchChapterWithExercises = useCallback(async (chapterId) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/chapters/${chapterId}`);
            return response.data;
        }
        catch (err) {
            setError(err.message);
            return null;
        }
        finally {
            setLoading(false);
        }
    }, []);
    return { chapters, loading, error, fetchChapters, fetchChapterWithExercises };
};
