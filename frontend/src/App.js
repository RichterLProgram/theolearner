import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ChapterView from './pages/ChapterView';
import TopicView from './pages/TopicView';
import ExercisePlayer from './pages/ExercisePlayer';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
function ProtectedRoute({ element }) {
    const { user, loading } = useAuth();
    if (loading) {
        return _jsx("div", { className: "flex items-center justify-center h-screen", children: "Loading..." });
    }
    return user ? element : _jsx(Navigate, { to: "/login", replace: true });
}
function App() {
    return (_jsx(Router, { children: _jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { element: _jsx(Dashboard, {}) }) }), "            ", _jsx(Route, { path: "/chapter/:chapterId", element: _jsx(ProtectedRoute, { element: _jsx(ChapterView, {}) }) }), "              ", _jsx(Route, { path: "/topic/:topicId", element: _jsx(ProtectedRoute, { element: _jsx(TopicView, {}) }) }), _jsx(Route, { path: "/exercise/:exerciseId", element: _jsx(ProtectedRoute, { element: _jsx(ExercisePlayer, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { element: _jsx(Profile, {}) }) }), _jsx(Route, { path: "/leaderboard", element: _jsx(ProtectedRoute, { element: _jsx(Leaderboard, {}) }) })] })] }) }) }) }));
}
export default App;
