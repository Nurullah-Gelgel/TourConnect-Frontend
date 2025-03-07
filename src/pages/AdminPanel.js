import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomManagement from '../components/admin/RoomManagement';
import ReservationManagement from '../components/admin/ReservationManagement';
import ReviewManagement from '../components/admin/ReviewManagement';
import Statistics from '../components/admin/Statistics';
import Layout from '../components/Layout';
const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('rooms');

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-4 border-b">
                        <h1 className="text-2xl font-bold">Otel Yönetim Paneli</h1>
                    </div>

                    {/* Tab Menüsü */}
                    <div className="flex border-b">
                        <button
                            className={`px-6 py-3 ${activeTab === 'rooms' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('rooms')}
                        >
                            Oda Yönetimi
                        </button>
                        <button
                            className={`px-6 py-3 ${activeTab === 'reservations' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('reservations')}
                        >
                            Rezervasyonlar
                        </button>
                        <button
                            className={`px-6 py-3 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Yorumlar
                        </button>
                        <button
                            className={`px-6 py-3 ${activeTab === 'statistics' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('statistics')}
                        >
                            İstatistikler
                        </button>
                    </div>

                    {/* Tab İçerikleri */}
                    <div className="p-4">
                        {activeTab === 'rooms' && <RoomManagement />}
                        {activeTab === 'reservations' && <ReservationManagement />}
                        {activeTab === 'reviews' && <ReviewManagement />}
                        {activeTab === 'statistics' && <Statistics />}
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default AdminPanel; 