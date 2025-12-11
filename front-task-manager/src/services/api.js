import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    guest: (guestData) => api.post('/auth/guest', guestData),
    logout: () => api.post('/auth/logout'),
};

export const tasksAPI = {
    getAll: () => api.get('/tasks'),
    create: (taskData) => api.post('/tasks', taskData),
    update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
    delete: (id) => api.delete(`/tasks/${id}`),
};

export const tasksGuestAPI = {
    getAll: (guestId) => api.get(`/guest/tasks?guest_id=${guestId}`),
    create: (taskData, guestId) => api.post(`/guest/tasks?guest_id=${guestId}`, taskData),
    update: (id, taskData, guestId) => api.put(`/guest/tasks/${id}?guest_id=${guestId}`, taskData),
    delete: (id, guestId) => api.delete(`/guest/tasks/${id}?guest_id=${guestId}`),
};

export default api;