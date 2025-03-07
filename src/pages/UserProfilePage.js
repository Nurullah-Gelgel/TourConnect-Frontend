import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserInfo from '../components/profile/UserInfo';
import ReservationHistory from '../components/profile/ReservationHistory';
import Favorites from '../components/profile/Favorites';
import PaymentMethods from '../components/profile/PaymentMethods';
import PasswordUpdate from '../components/profile/PasswordUpdate';
import Layout from '../components/Layout';
const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Çıkış işlemleri burada yapılacak
        navigate('/');
    };

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Profil Başlığı */}
                    <div className="p-4 border-b">
                        <h1 className="text-2xl font-bold">Profil Sayfası</h1>
                    </div>

                    {/* Tab Menüsü */}
                    <div className="flex border-b">
                        <button
                            className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profil Bilgileri
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'reservations' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('reservations')}
                        >
                            Rezervasyonlar
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'favorites' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            Favoriler
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'payments' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('payments')}
                        >
                            Ödeme Yöntemleri
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'password' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('password')}
                        >
                            Şifre Değiştir
                        </button>
                    </div>

                    {/* Tab İçerikleri */}
                    <div className="p-4">
                        {activeTab === 'profile' && <UserInfo />}
                        {activeTab === 'reservations' && <ReservationHistory />}
                        {activeTab === 'favorites' && <Favorites />}
                        {activeTab === 'payments' && <PaymentMethods />}
                        {activeTab === 'password' && <PasswordUpdate />}
                    </div>

                    {/* Çıkış Yap Butonu */}
                    <div className="p-4 border-t">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default UserProfilePage; 