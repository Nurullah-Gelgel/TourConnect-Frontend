import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { hotelService } from '../services/hotelService';
import { FiMapPin, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HotelDetailPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [showLightbox, setShowLightbox] = useState(false);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    useEffect(() => {
        fetchHotelDetails();
    }, [id]);

    const fetchHotelDetails = async () => {
        try {
            setLoading(true);
            const data = await hotelService.getHotelById(id);
            // Ensure photoUrls is an array
            data.photoUrls = Array.isArray(data.photoUrls) ? data.photoUrls : [];
            setHotel(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching hotel details:', err);
            setError(t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppClick = (phone) => {
        // Remove any non-numeric characters from phone number
        const cleanPhone = phone.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

    const handlePrevPhoto = () => {
        setActivePhotoIndex((prev) => 
            prev === 0 ? hotel.photoUrls.length - 1 : prev - 1
        );
    };

    const handleNextPhoto = () => {
        setActivePhotoIndex((prev) => 
            prev === hotel.photoUrls.length - 1 ? 0 : prev + 1
        );
    };

    const openLightbox = (index) => {
        setActivePhotoIndex(index);
        setShowLightbox(true);
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
                <div className="relative">
                    {/* Main Image */}
                    <div className="h-[70vh] relative overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <img
                            src={hotel?.photoUrls?.[0] || "/hotel-placeholder.jpg"}
                            alt={hotel?.hotelName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                console.log('Main image load error:', hotel?.photoUrls?.[0]);
                                e.target.src = "/hotel-placeholder.jpg";
                            }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="container mx-auto">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{hotel?.hotelName}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-white">
                                    <div className="flex items-center gap-2">
                                        <FiMapPin className="w-5 h-5" />
                                        <span>{hotel?.hotelCity}, {hotel?.district}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {'⭐'.repeat(hotel?.starRating || 0)}
                                        <span>{t('hotels.starRating')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{hotel?.advancePayment} TL</span>
                                        <span className="text-sm opacity-75">{t('hotels.perNight')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Photo Gallery Grid */}
                    {hotel?.photoUrls && hotel.photoUrls.length > 1 && (
                        <div className="container mx-auto px-4 -mt-16 relative z-30 mb-8">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('hotels.photos')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {hotel.photoUrls.map((url, index) => (
                                        <div 
                                            key={index} 
                                            className="relative rounded-lg overflow-hidden group cursor-pointer"
                                            onClick={() => openLightbox(index)}
                                        >
                                            <div className="aspect-[4/3]">
                                                <img
                                                    src={url}
                                                    alt={`${hotel.hotelName} - ${t('hotels.photo')} ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    onError={(e) => {
                                                        console.log('Gallery image load error:', url);
                                                        e.target.src = "/hotel-placeholder.jpg";
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <span className="text-white text-sm">
                                                        {t('hotels.photo')} {index + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lightbox */}
                {showLightbox && hotel?.photoUrls && (
                    <div className="fixed inset-0 bg-black/95 z-50">
                        <button 
                            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50"
                            onClick={() => setShowLightbox(false)}
                        >
                            <FiX size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-4 rounded-full bg-black/50 hover:bg-black/70 z-50"
                            onClick={handlePrevPhoto}
                        >
                            <FiChevronLeft size={40} />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-4 rounded-full bg-black/50 hover:bg-black/70 z-50"
                            onClick={handleNextPhoto}
                        >
                            <FiChevronRight size={40} />
                        </button>

                        {/* Main Image Container */}
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={hotel.photoUrls[activePhotoIndex]}
                                    alt={`${hotel.hotelName} - ${t('hotels.photo')} ${activePhotoIndex + 1}`}
                                    className="max-w-full max-h-full h-auto w-auto object-contain"
                                    style={{ minHeight: '70vh' }}
                                    onError={(e) => {
                                        e.target.src = "/hotel-placeholder.jpg";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Photo Counter and Navigation Dots */}
                        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 z-50">
                            <div className="flex gap-2 bg-black/50 px-4 py-2 rounded-full">
                                {hotel.photoUrls.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActivePhotoIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            index === activePhotoIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                            <div className="bg-black/50 px-4 py-2 rounded-full text-white text-lg">
                                {activePhotoIndex + 1} / {hotel.photoUrls.length}
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Section */}
                <div className="container mx-auto -mt-10 relative z-30 px-4">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Tabs */}
                        <div className="border-b">
                            <div className="flex">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors duration-200 ${activeTab === 'overview'
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {t('hotels.hotelInfo')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('location')}
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors duration-200 ${activeTab === 'location'
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {t('hotels.location')}
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-4 sm:p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('hotels.hotelInfo')}</h3>
                                            <div className="space-y-3 sm:space-y-4">
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    {hotel.phone && (
                                                        <div className="flex items-center text-gray-600">
                                                            <span className="font-medium mr-1">{t('hotels.phone')}:</span>
                                                            <span>{hotel.phone}</span>
                                                            <button
                                                                onClick={() => handleWhatsAppClick(hotel.phone)}
                                                                className="ml-2 text-green-500 hover:text-green-600"
                                                                title={t('hotels.contact')}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )}                                                </div>
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
                                                    <span className="text-sm sm:text-base">{hotel?.starRating} {t('hotels.starRating')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-800">{t('hotels.reservationCard.title')}</h3>
                                            <div className="space-y-4">
                                                <div className="bg-white rounded-lg p-4">
                                                    <p className="text-sm text-gray-600 mb-1">{t('hotels.perNight')}</p>
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
                                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('hotels.location')}</h3>
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
                                                {t('hotels.mapComingSoon')}
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