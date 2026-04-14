import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, error: err, } = await supabase.auth.getSession();
            if (err) {
                setError(err.message);
            }
            else {
                setSession(session);
                setUser(session?.user || null);
            }
            setLoading(false);
        };
        getSession();
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user || null);
        });
        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);
    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            setSession(null);
        }
        catch (err) {
            setError(err.message);
        }
    };
    const login = async (email, password) => {
        try {
            setError(null);
            const { data, error: err } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (err)
                throw err;
            setSession(data.session);
            setUser(data.user);
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    };
    const register = async (email, password, username) => {
        try {
            setError(null);
            // Use backend endpoint instead of direct Supabase Auth to avoid rate limits
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            });
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error || 'Registration failed');
            // Now login with the credentials
            await login(email, password);
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    };
    return (_jsx(AuthContext.Provider, { value: { user, session, loading, error, login, register, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
export { supabase };
