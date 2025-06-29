import axios from 'axios';
//PRod tamm
//const BASE_URL = 'https://rahvan.onrender.com/'; // Backend URL'inizin doğru olduğundan emin olun
//const BASE_URL = 'http://localhost:8080/'; // 
const BASE_URL = window.location.origin;  // Otomatik olarak doğru URL'i alır
// Axios instance oluşturma
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false

});

// İstek interceptor'ı - Token ekleme
api.interceptors.request.use(
    (config) => {
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