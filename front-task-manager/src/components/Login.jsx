import React, { useState } from 'react';
import { authAPI } from '../services/api';

const Login = ({ onLogin, switchToRegister, onGuestLogin}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authAPI.login(formData);
            localStorage.setItem('token', response.data.token.split('|')[1]);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            onLogin(response.data.user);
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
                >
                    Login
                </button>
            </form>
            <button
                onClick={switchToRegister}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition duration-200"
            >
                Switch to Register
            </button>
            <button
                onClick={onGuestLogin}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg mt-4 transition duration-200"
            >
                Login as a guest
            </button>
        </div>
    );
};

export default Login;