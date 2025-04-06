import api from './api';

export const tourService = {
    getAllTours: async () => {
        try {
            const response = await api.get('/api/tour/public/getAllTours');
            return response.data;
        } catch (error) {
            console.error('Error fetching tours:', error);
            throw error;
        }
    },

    getTourById: async (id) => {
        try {
            const response = await api.get(`/api/tour/public/getTourById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tour:', error);
            throw error;
        }
    },

    searchTours: async (searchParams) => {
        return await api.get('/tours/search', { params: searchParams });
    },

    createTourReservation: async (reservationData) => {
        return await api.post('/tour-reservations', reservationData);
    },

    createTour: async (tourData) => {
        try {
            const response = await api.post('/api/tour/createTour', tourData);
            return response.data;
        } catch (error) {
            console.error('Error creating tour:', error);
            throw error;
        }
    },

    updateTour: async (id, tourData) => {
        try {
            const response = await api.put(`/api/tour/updateTour?id=${id}`, tourData);
            return response.data;
        } catch (error) {
            console.error('Error updating tour:', error);
            throw error;
        }
    },

    deleteTour: async (id) => {
        try {
            await api.delete(`/api/tour/deleteTour?id=${id}`);
        } catch (error) {
            console.error('Error deleting tour:', error);
            throw error;
        }
    },

    deleteAllTours: async () => {
        try {
            await api.delete('/api/tour/deleteAllTours');
        } catch (error) {
            console.error('Error deleting all tours:', error);
            throw error;
        }
    }
}; 