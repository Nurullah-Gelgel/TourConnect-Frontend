import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Layout from '../components/Layout';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            navigate('/login');
        } catch (error) {
            setError(error.message || 'Kayıt başarısız.');
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="text-center text-3xl font-bold text-gray-900">Kayıt Ol</h2>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <input
                            type="text"
                            required
                            placeholder="Kullanıcı Adı"
                            className="w-full p-2 border rounded"
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <input
                            type="email"
                            required
                            placeholder="E-posta"
                            className="w-full p-2 border rounded"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Şifre"
                            className="w-full p-2 border rounded"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                        >
                            Kayıt Ol
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default RegisterPage; 