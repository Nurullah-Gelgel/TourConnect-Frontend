import api from './api';

export const reservationService = {
    createReservation: async (reservationData) => {
        try {
            console.log('Gönderilen veri:', reservationData);
            
            const response = await api.post('/api/reservation/public/createReservation', 
                reservationData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log('Backend yanıtı:', response.data);
            return response.data;
        } catch (error) {
            console.error('Rezervasyon hatası:', error);
            console.error('Hata detayı:', error.response?.data);
            throw new Error(error.response?.data?.message || 'Rezervasyon oluşturulamadı');
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