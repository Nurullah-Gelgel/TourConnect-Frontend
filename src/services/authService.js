import api from './api';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/api/auth/login', {
                name: credentials.username,
                password: credentials.password
            });
            
            console.log('Login Response:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return response.data;
            } else {
                throw new Error('Token alınamadı');
            }
        } catch (error) {
            console.error('Login Error:', error);
            throw error.response?.data || { message: 'Giriş başarısız' };
        }
    },

    register: async (userData) => {
        try {
            return await api.post('/api/users/createUser', userData);
        } catch (error) {
            throw error.response?.data || { message: 'Kayıt başarısız' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
}; 