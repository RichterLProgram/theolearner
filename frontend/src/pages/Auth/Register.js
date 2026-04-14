import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
const Register = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const { isDark } = useTheme();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        try {
            await register(email, password, username);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.message || 'Registration failed');
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "text-4xl", children: "\uD83D\uDCDA" }) }), _jsx("h2", { className: "text-2xl font-bold text-center mb-8", children: "Create Account" }), error && (_jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error })), _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Username" }), _jsx("input", { type: "text", placeholder: "your_username", className: "w-full px-3 py-2 border border-gray-300 rounded-md", value: username, onChange: (e) => setUsername(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsx("input", { type: "email", placeholder: "your@email.com", className: "w-full px-3 py-2 border border-gray-300 rounded-md", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-3 py-2 border border-gray-300 rounded-md", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm Password" }), _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-3 py-2 border border-gray-300 rounded-md", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: "w-full bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90 disabled:opacity-50", disabled: loading, children: loading ? 'Creating Account...' : 'Register' })] }), _jsxs("p", { className: "text-center text-sm text-gray-600 mt-4", children: ["Already have an account?", ' ', _jsx("button", { onClick: () => navigate('/login'), className: "text-primary font-medium hover:underline", children: "Login" })] })] }) }));
};
export default Register;
