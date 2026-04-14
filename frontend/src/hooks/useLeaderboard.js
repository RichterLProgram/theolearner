import { useState, useCallback } from 'react';
import apiClient from '../services/api';
export const useLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchLeaderboard = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/user/leaderboard');
            setLeaderboard(response.data || []);
            setError(null);
        }
        catch (err) {
            setError(err.message);
            setLeaderboard([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    return { leaderboard, loading, error, fetchLeaderboard };
};
