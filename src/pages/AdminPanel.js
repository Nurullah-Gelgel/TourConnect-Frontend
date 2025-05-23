import React, { useState } from 'react';
import { FiUsers, FiMapPin, FiCompass, FiBox, FiCalendar, FiStar, FiPieChart, FiHome, FiCreditCard, FiMenu, FiX } from 'react-icons/fi';
import UserManagement from '../components/admin/UserManagement';
import TouristPlaceManagement from '../components/admin/TouristPlaceManagement';
import TourManagement from '../components/admin/TourManagement';
import RoomManagement from '../components/admin/RoomManagement';
import ReservationManagement from '../components/admin/ReservationManagement';
import ReviewManagement from '../components/admin/ReviewManagement';
import Statistics from '../components/admin/Statistics';
import HotelManagement from '../components/admin/HotelManagement';
import PaymentVerification from '../components/admin/PaymentVerification';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: <FiPieChart className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'users', name: 'Users', icon: <FiUsers className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'places', name: 'Tourist Places', icon: <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'tours', name: 'Tours', icon: <FiCompass className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'hotels', name: 'Hotels', icon: <FiHome className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'rooms', name: 'Room Types', icon: <FiBox className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'reservations', name: 'Reservations', icon: <FiCalendar className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'reviews', name: 'Reviews', icon: <FiStar className="w-5 h-5 sm:w-6 sm:h-6" /> },
        { id: 'payments', name: 'Payments', icon: <FiCreditCard className="w-5 h-5 sm:w-6 sm:h-6" /> },
    ];

    const handleMenuItemClick = (id) => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
            >
                {isMobileMenuOpen ? (
                    <FiX className="w-6 h-6" />
                ) : (
                    <FiMenu className="w-6 h-6" />
                )}
            </button>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
                isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
                <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="flex items-center h-16 px-4 bg-gray-900">
                        <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
                    </div>
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMenuItemClick(item.id)}
                                className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                                    activeTab === item.id
                                        ? 'bg-gray-700 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 bg-gray-800">
                    <div className="flex items-center h-16 px-4 bg-gray-900">
                        <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                                        activeTab === item.id
                                            ? 'bg-gray-700 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="container mx-auto">
                        {/* Quick Stats */}
                        {activeTab === 'dashboard' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                                            <FiUsers className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
                                            <p className="text-lg sm:text-2xl font-semibold text-gray-700">1,234</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                                            <FiCalendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-xs sm:text-sm text-gray-500">Reservations</p>
                                            <p className="text-lg sm:text-2xl font-semibold text-gray-700">567</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                                            <FiStar className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-xs sm:text-sm text-gray-500">Reviews</p>
                                            <p className="text-lg sm:text-2xl font-semibold text-gray-700">4.8</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                                            <FiCreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-xs sm:text-sm text-gray-500">Revenue</p>
                                            <p className="text-lg sm:text-2xl font-semibold text-gray-700">$12,345</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 sm:p-6">
                                {activeTab === 'dashboard' && <Statistics />}
                                {activeTab === 'users' && <UserManagement />}
                                {activeTab === 'places' && <TouristPlaceManagement />}
                                {activeTab === 'tours' && <TourManagement />}
                                {activeTab === 'hotels' && <HotelManagement />}
                                {activeTab === 'rooms' && <RoomManagement />}
                                {activeTab === 'reservations' && <ReservationManagement />}
                                {activeTab === 'reviews' && <ReviewManagement />}
                                {activeTab === 'payments' && <PaymentVerification />}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPanel; 