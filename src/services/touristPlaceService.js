import api from './api';

export const touristPlaceService = {
    getAllPlaces: async () => {
        try {
            const response = await api.get('/api/tour/public/getAllPlaces');
            return response.data;
        } catch (error) {
            console.error('Error fetching places:', error);
            throw error;
        }
    },
    
    getPlaceById: async (id) => {
        try {
            const response = await api.get(`/api/tour/public/getPlaceById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching place:', error);
            throw error;
        }
    },

    createPlace: async (placeData) => {
        try {
            const response = await api.post('/api/tour/createPlace', placeData);
            return response.data;
        } catch (error) {
            console.error('Error creating place:', error);
            throw error;
        }
    },

    updatePlace: async (id, placeData) => {
        try {
            const response = await api.put(`/api/tour/updatePlace?id=${id}`, placeData);
            return response.data;
        } catch (error) {
            console.error('Error updating place:', error);
            throw error;
        }
    },

    deletePlace: async (id) => {
        try {
            await api.delete(`/api/tour/deletePlace?id=${id}`);
        } catch (error) {
            console.error('Error deleting place:', error);
            throw error;
        }
    },

    deleteAllPlaces: async () => {
        try {
            await api.delete('/api/tour/deleteAllPlaces');
        } catch (error) {
            console.error('Error deleting all places:', error);
            throw error;
        }
    }
}; 