import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';

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
            await login(credentials);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00A9FF] via-[#A0E9FF] to-[#CDF5FD] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8">
                {/* Logo veya Site İsmi */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Rahvan Admin
                    </h1>
                    <div className="h-1 w-20 bg-[#00A9FF] mx-auto rounded-full mb-6"></div>
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Hoş Geldiniz
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Hesabınıza giriş yaparak devam edin
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                            <div className="flex items-center text-sm text-red-600">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-lg block w-full pl-10 pr-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00A9FF] focus:border-[#00A9FF] transition-all duration-300"
                                placeholder="Kullanıcı Adı"
                                value={credentials.username}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    username: e.target.value
                                })}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg block w-full pl-10 pr-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00A9FF] focus:border-[#00A9FF] transition-all duration-300"
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
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#00A9FF] hover:bg-[#0098e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A9FF] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FiLogIn className="h-5 w-5 text-white group-hover:text-white/90" />
                            </span>
                            Giriş Yap
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                        <Link to="/forgot-password" className="text-[#00A9FF] hover:text-[#0098e5] transition-colors duration-300">
                            Şifremi Unuttum
                        </Link>
                        <div className="text-gray-600">
                            Hesabınız yok mu?{' '}
                            <Link to="/register" className="text-[#00A9FF] hover:text-[#0098e5] font-medium transition-colors duration-300">
                                Kayıt Olun
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
