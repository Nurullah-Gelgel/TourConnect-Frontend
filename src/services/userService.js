import api from './api';

export const userService = {
    getAllUsers: async () => {
        try {
            const response = await api.get('/api/users/getAllUsers');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await api.get(`/api/users/getUserById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            const response = await api.post('/api/users/createUser', {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: userData.role,
                languagePreference: userData.languagePreference,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    updateUser: async (id, userData) => {
        try {
            // Include both the ID and the update data in the request body
            const updateData = {
                id: id,
                name: userData.name || '',
                email: userData.email || '',
                role: userData.role || 'USER',
                languagePreference: userData.languagePreference || 'TR',
                updatedAt: new Date().toISOString()
            };

            if (userData.password) {
                updateData.password = userData.password;
            }

            const response = await api.put('/api/users/updateUser', updateData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            await api.delete(`/api/users/deleteUser?id=${id}`);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    deleteAllUsers: async () => {
        try {
            await api.delete('/api/users/deleteAllUsers');
        } catch (error) {
            console.error('Error deleting all users:', error);
            throw error;
        }
    }
}; 