import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import {authAPI} from "./services/api";

function App() {
    const [user, setUser] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [guestId, setGuestId] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        const currentGuestId = document.cookie
            .split('; ')
            .find(row => row.startsWith('guest_id='))
            ?.split('=')[1];

        setGuestId(currentGuestId)
        if (userData && (token || currentGuestId)) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        document.cookie = "guest_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    const handleGuestLogin = async () => {
        try {
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('guest_id='))
                ?.split('=')[1];

            const response = await authAPI.guest({ guest_id: cookieValue });

            const data = await response.data;

            const guestUser = data.user;

            setUser(guestUser);

            localStorage.setItem('user', JSON.stringify(guestUser));

            if (data.user.guest_id) {
                setGuestId(data.user.guest_id);
                const date = new Date();
                date.setFullYear(date.getFullYear() + 1);
                document.cookie = `guest_id=${data.user.guest_id}; expires=${date.toUTCString()}; path=/`;
            }
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleLogout = () => {
        setUser(null);
        document.cookie = "guest_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    if (!user) {
        return isRegistering ? (
            <Register
                onRegister={handleLogin}
                switchToLogin={() => setIsRegistering(false)}
                onGuestLogin={handleGuestLogin}
            />
        ) : (
            <Login
                onLogin={handleLogin}
                switchToRegister={() => setIsRegistering(true)}
                onGuestLogin={handleGuestLogin}
            />
        );
    }

    return <TaskList user={user} guestId={guestId} onLogout={handleLogout} />;
}

export default App;