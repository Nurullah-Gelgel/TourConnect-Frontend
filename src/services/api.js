import axios from 'axios';

const BASE_URL = 'https://rahvan.onrender.com'; // Backend URL'inizin doğru olduğundan emin olun

// Axios instance oluşturma
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// İstek interceptor'ı - Token ekleme
api.interceptors.request.use(
    (config) => {
        console.log('Giden istek:', config);
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('İstek hatası:', error);
        return Promise.reject(error);
    }
);

// Cevap interceptor'ı - Hata yönetimi
api.interceptors.response.use(
    (response) => {
        console.log('Gelen cevap:', response);
        return response;
    },
    (error) => {
        console.error('Cevap hatası:', error.response || error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 