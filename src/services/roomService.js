import api from './api';

export const roomService = {
    getAllRooms: async () => {
        try {
            const response = await api.get('/api/room/public/getAllRooms');
            return response.data;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw error;
        }
    },

    getRoomById: async (id) => {
        try {
            const response = await api.get(`/api/room/public/getRoomById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching room:', error);
            throw error;
        }
    },

    createRoom: async (roomData) => {
        try {
            const response = await api.post('/api/room/createRoom', roomData);
            return response.data;
        } catch (error) {
            console.error('Error creating room:', error);
            throw error;
        }
    },

    updateRoom: async (id, roomData) => {
        try {
            const response = await api.put(`/api/room/updateRoom?id=${id}`, roomData);
            return response.data;
        } catch (error) {
            console.error('Error updating room:', error);
            throw error;
        }
    },

    deleteRoom: async (id) => {
        try {
            await api.delete(`/api/room/deleteRoom?id=${id}`);
        } catch (error) {
            console.error('Error deleting room:', error);
            throw error;
        }
    },

    deleteAllRooms: async () => {
        try {
            await api.delete('/api/room/deleteAllRooms');
        } catch (error) {
            console.error('Error deleting all rooms:', error);
            throw error;
        }
    },

    getRoomsByHotelId: async (hotelId) => {
        try {
            const response = await api.get(`/api/room/public/getRoomsByHotelId?hotelId=${hotelId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching rooms by hotel:', error);
            throw error;
        }
    }
}; 