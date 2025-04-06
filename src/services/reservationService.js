import api from './api';

export const reservationService = {
    getAllReservations: async () => {
        try {
            const response = await api.get('/api/reservation/getAllReservations');
            return response.data;
        } catch (error) {
            console.error('Error fetching reservations:', error);
            throw error;
        }
    },

    getReservationById: async (id) => {
        try {
            const response = await api.get(`/api/reservation/getReservationById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reservation:', error);
            throw error;
        }
    },

    createReservation: async (reservationData) => {
        try {
            const response = await api.post('/api/reservation/public/createReservation', reservationData);
            return response.data;
        } catch (error) {
            console.error('Error creating reservation:', error);
            throw error;
        }
    },

    updateReservation: async (id, reservationData) => {
        try {
            const response = await api.put(`/api/reservation/updateReservation?id=${id}`, reservationData);
            return response.data;
        } catch (error) {
            console.error('Error updating reservation:', error);
            throw error;
        }
    },

    deleteReservation: async (id) => {
        try {
            await api.delete(`/api/reservation/deleteReservation?id=${id}`);
        } catch (error) {
            console.error('Error deleting reservation:', error);
            throw error;
        }
    },

    deleteAllReservations: async () => {
        try {
            await api.delete('/api/reservation/deleteAllReservations');
        } catch (error) {
            console.error('Error deleting all reservations:', error);
            throw error;
        }
    },

    getUserReservations: async (userId) => {
        try {
            const response = await api.get(`/api/reservation/getUserReservations?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user reservations:', error);
            throw error;
        }
    }
}; 