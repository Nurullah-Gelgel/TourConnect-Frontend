import api from './api';

export const tourService = {
    getAllTours: async () => {
        try {
            console.log('Turlar çekiliyor...');
            const response = await api.get('/api/tour/public/getAllTours');
            console.log('Gelen turlar:', response.data);
            return response.data;
        } catch (error) {
            console.error('Turlar getirilirken hata oluştu:', error.response || error);
            throw error;
        }
    },

    getTourById: async (id) => {
        try {
            const response = await api.get(`/api/tour/public/getTourById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Tur detayı getirilirken hata oluştu:', error);
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
            console.error('Tur oluşturulurken hata oluştu:', error);
            throw error;
        }
    }
}; 