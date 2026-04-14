import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
        }
        else {
            html.classList.remove('dark');
        }
    }, [isDark]);
    const toggleTheme = () => setIsDark(!isDark);
    return (_jsx(ThemeContext.Provider, { value: { isDark, toggleTheme }, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
