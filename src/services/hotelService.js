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
    },

    getRoomTypesByHotelId: async (hotelId) => {
        try {
            const response = await api.get(`/api/hotel/public/${hotelId}/room-types`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching room types:', error);
            throw error;
        }
    },
    
    createRoomType: async (roomTypeData) => {
        try {
            const response = await api.post('/api/roomType/createRoomType', roomTypeData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating room type:', error);
            throw error;
        }
    },
    
    deleteRoomType: async (roomTypeId) => {
        try {
            await api.delete(`/api/roomType/deleteRoomType?id=${roomTypeId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            console.error('Error deleting room type:', error);
            throw error;
        }
    }


    
}; 