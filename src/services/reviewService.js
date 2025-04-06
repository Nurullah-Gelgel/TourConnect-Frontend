import api from './api';

export const reviewService = {
    getAllReviews: async () => {
        try {
            const response = await api.get('/api/review/public/getAllReviews');
            return response.data;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    },

    getReviewById: async (id) => {
        try {
            const response = await api.get(`/api/review/public/getReviewById?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching review:', error);
            throw error;
        }
    },

    createReview: async (reviewData) => {
        try {
            const response = await api.post('/api/review/public/createReview', reviewData);
            return response.data;
        } catch (error) {
            console.error('Error creating review:', error);
            throw error;
        }
    },

    updateReview: async (id, reviewData) => {
        try {
            const response = await api.put(`/api/review/public/updateReview?id=${id}`, reviewData);
            return response.data;
        } catch (error) {
            console.error('Error updating review:', error);
            throw error;
        }
    },

    deleteReview: async (id) => {
        try {
            await api.delete(`/api/review/public/deleteReview?id=${id}`);
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    },

    deleteAllReviews: async () => {
        try {
            await api.delete('/api/review/deleteAllReviews');
        } catch (error) {
            console.error('Error deleting all reviews:', error);
            throw error;
        }
    },

    getReviewsByEntityId: async (entityId, entityType) => {
        try {
            const response = await api.get(`/api/review/getReviewsByEntity?entityId=${entityId}&entityType=${entityType}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching entity reviews:', error);
            throw error;
        }
    }
}; 