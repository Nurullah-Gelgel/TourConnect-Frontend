import api from './api';

export const reservationService = {
    createReservation: async (reservationData) => {
        try {
            const response = await api.post('/api/reservation/create', reservationData);
            return response.data;
        } catch (error) {
            console.error('Error creating reservation:', error);
            throw error;
        }
    },
    
    getReservations: async () => {
        try {
            const response = await api.get('/api/reservation/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching reservations:', error);
            throw error;
        }
    }
}; 