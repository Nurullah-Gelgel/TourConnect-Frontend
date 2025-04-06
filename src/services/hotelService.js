import api from './api';

export const hotelService = {
    getAllHotels: async () => {
        try {
            const response = await api.get('/api/hotel/public/getAllHotels');
            return response.data;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            throw error;
        }
    },

    getHotelById: async (id) => {
        try {
            const response = await api.get(`/api/hotel/public/getHotelById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching hotel:', error);
            throw error;
        }
    },

    searchHotels: async (searchParams) => {
        return await api.get('/hotels/search', { params: searchParams });
    },

    createReservation: async (reservationData) => {
        return await api.post('/reservations', reservationData);
    },

    createHotel: async (hotelData) => {
        try {
            const response = await api.post('/api/hotel/createHotel', hotelData);
            return response.data;
        } catch (error) {
            console.error('Error creating hotel:', error);
            throw error;
        }
    },

    updateHotel: async (id, hotelData) => {
        try {
            const response = await api.put(`/api/hotel/updateHotel?id=${id}`, hotelData);
            return response.data;
        } catch (error) {
            console.error('Error updating hotel:', error);
            throw error;
        }
    },

    deleteHotel: async (id) => {
        try {
            await api.delete(`/api/hotel/deleteHotel?id=${id}`);
        } catch (error) {
            console.error('Error deleting hotel:', error);
            throw error;
        }
    }
}; 