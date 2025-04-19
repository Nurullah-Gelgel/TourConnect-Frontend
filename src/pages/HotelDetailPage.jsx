import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { hotelService } from '../services/hotelService';

const HotelDetailPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchHotelDetails();
    }, [id]);

    const fetchHotelDetails = async () => {
        try {
            setLoading(true);
            const data = await hotelService.getHotelById(id);
            setHotel(data);
            setError(null);
        } catch (err) {
            console.error('Otel detayları yüklenirken hata:', err);
            setError('Otel detayları yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                    <p className="text-red-500 text-xl">{error}</p>
                    <button 
                        onClick={fetchHotelDetails}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        {t('common.tryAgain')}
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow">
                {/* Hero Section */}
                <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img 
                        src={hotel?.photoUrl || "/hotel-placeholder.jpg"} 
                        alt={hotel?.hotelName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = "/hotel-placeholder.jpg";
                        }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="container mx-auto">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">{hotel?.hotelName}</h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{hotel?.hotelCity}, {hotel?.district}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {'⭐'.repeat(hotel?.starRating || 0)}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 text-white">
                                    <div className="text-center">
                                        <p className="text-base sm:text-lg mb-1">Gecelik Fiyat</p>
                                        <p className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{hotel?.advancePayment} TL</p>
                                        <Link 
                                            to={`/reserve/${hotel?.id}`}
                                            className="block bg-[#00A9FF] hover:bg-[#0098e5] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg 
                                                     transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                        >
                                            Rezervasyon Yap
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto -mt-10 relative z-30 px-4">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Tabs */}
                        <div className="border-b">
                            <div className="flex">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors duration-200 ${
                                        activeTab === 'overview'
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Otel Bilgileri
                                </button>
                                <button
                                    onClick={() => setActiveTab('location')}
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors duration-200 ${
                                        activeTab === 'location'
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Konum
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-4 sm:p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Otel Bilgileri</h3>
                                            <div className="space-y-3 sm:space-y-4">
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="text-sm sm:text-base">{hotel?.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    <span className="text-sm sm:text-base">{hotel?.hotelCity}, {hotel?.district}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    <span className="text-sm sm:text-base">{hotel?.starRating} Yıldızlı</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-800">Rezervasyon Bilgileri</h3>
                                            <div className="space-y-4">
                                                <div className="bg-white rounded-lg p-4">
                                                    <p className="text-sm text-gray-600 mb-1">Gecelik Fiyat</p>
                                                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{hotel?.advancePayment} TL</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'location' && (
                                <div>
                                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Konum Bilgileri</h3>
                                        <div className="flex items-start gap-3 mb-4 sm:mb-6">
                                            <svg className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-sm sm:text-base text-gray-600">{hotel?.hotelAddress}</p>
                                                <p className="text-xs sm:text-sm text-gray-500 mt-1">{hotel?.hotelCity}, {hotel?.district}</p>
                                            </div>
                                        </div>
                                        <div className="aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
                                            {/* Harita buraya eklenebilir */}
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                Harita yakında eklenecek
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HotelDetailPage; 