import { useState, useCallback } from 'react';
import apiClient from '../services/api';
export const useExercises = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAllExercises = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/exercises');
            setExercises(response.data || []);
            setError(null);
        }
        catch (err) {
            setError(err.message);
            setExercises([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    return { exercises, loading, error, fetchAllExercises };
};
