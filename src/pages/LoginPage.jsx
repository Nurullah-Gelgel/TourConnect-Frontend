import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log('Giriş denemesi:', credentials); // Debug için
            await login(credentials);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err); // Debug için
            setError(err.message || 'Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Giriş Yap
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Hesabınıza giriş yapmak için bilgilerinizi girin.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-100 p-4">
                            <div className="text-sm text-red-600">{error}</div>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Kullanıcı Adı</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Kullanıcı Adı"
                                value={credentials.username}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    username: e.target.value
                                })}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="sr-only">Şifre</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Şifre"
                                value={credentials.password}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    password: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Giriş Yap
                        </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="text-center text-gray-500">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                                Şifremi Unuttum?
                            </a>
                        </div>
                        <div className="text-center text-gray-500">
                            <span>Hesabınız yok mu? </span>
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                                Kayıt Olun
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
