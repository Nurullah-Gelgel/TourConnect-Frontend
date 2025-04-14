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
    },

    uploadReceipt: async (file, paymentId) => {
        try {
            // Create FormData object for file upload
            const formData = new FormData();
            formData.append('file', file);
            
            console.log(`Uploading file ${file.name} for payment ID ${paymentId}`);
            
            // Upload the file to the server
            const uploadResponse = await api.post('/api/files/upload', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            console.log('File upload response:', uploadResponse.data);
            
            // Extract filename from response text
            const responseText = uploadResponse.data;
            const filename = responseText.replace('Dosya yüklendi: ', '');
            
            console.log('Extracted filename:', filename);
            
            try {
                // Update payment with receipt filename
                console.log(`Updating payment ${paymentId} with receipt ${filename}`);
                
                // Check if the backend endpoint exists and has the correct format
                // This might need to be adjusted based on your backend API
                const paymentUpdateResponse = await api.post(`/api/payments/${paymentId}/update-receipt`, 
                    { receipt: filename },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                console.log('Payment update response:', paymentUpdateResponse.data);
                return filename;
            } catch (updateError) {
                console.error('Error updating payment with receipt:', updateError);
                console.error('Update error details:', updateError.response?.data || updateError.message);
                
                // Even if updating payment fails, return the filename since the file was uploaded
                // This avoids showing error to the user if file was successfully uploaded
                return filename;
            }
        } catch (error) {
            console.error('Receipt upload error:', error);
            console.error('Upload error details:', error.response?.data || error.message);
            throw error;
        }
    }
}; 