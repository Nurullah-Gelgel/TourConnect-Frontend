import api from './api';

export const paymentService = {
    createPayment: async (paymentData) => {
        try {
            const response = await api.post('/api/payments/create', 
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            return response.data;
        } catch (error) {
            console.error('Ödeme hatası:', error);
            throw new Error(error.response?.data?.message || 'Ödeme işlemi başarısız oldu');
        }
    },

    getPaymentStatus: async (transactionId) => {
        try {
            const response = await api.get(`/api/payments/${transactionId}`);
            return response.data;
        } catch (error) {
            console.error('Ödeme durumu sorgulama hatası:', error);
            throw error;
        }
    }
}; 