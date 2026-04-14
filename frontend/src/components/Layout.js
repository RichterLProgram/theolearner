import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
const Layout = () => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (_jsxs("div", { className: `flex flex-col min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`, children: [_jsx("header", { className: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200', style: { borderBottom: '1px solid' }, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", onClick: () => navigate('/'), style: { cursor: 'pointer' }, children: [_jsx("div", { className: "text-2xl font-bold text-primary", children: "\uD83D\uDCDA" }), _jsx("h1", { className: `text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`, children: "TheoLearner" })] }), user && (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: `text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`, children: user.email }), _jsx("button", { onClick: () => navigate('/leaderboard'), className: `px-4 py-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-primary' : 'text-gray-900 hover:text-primary'}`, children: "\uD83C\uDFC6 Leaderboard" }), _jsx("button", { onClick: () => navigate('/profile'), className: `px-4 py-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-primary' : 'text-gray-900 hover:text-primary'}`, children: "Profile" }), _jsx("button", { onClick: toggleTheme, className: `px-4 py-2 text-sm font-medium rounded transition-colors ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`, children: isDark ? '☀️' : '🌙' }), _jsx("button", { onClick: handleLogout, className: "px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600", children: "Logout" })] }))] }) }), _jsx("main", { className: `flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full`, children: _jsx(Outlet, {}) }), _jsx("footer", { className: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200', style: { borderTop: '1px solid' }, children: _jsx("div", { className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`, children: _jsx("p", { children: "\u00A9 2026 TheoLearner. All rights reserved." }) }) })] }));
};
export default Layout;
