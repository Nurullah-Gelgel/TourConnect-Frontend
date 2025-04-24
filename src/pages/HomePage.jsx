import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import TourCard from '../components/TourCard';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { hotelService } from '../services/hotelService';
import { tourService } from '../services/tourService';
import { touristPlaceService } from '../services/touristPlaceService';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { reservationService } from '../services/reservationService';

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [popularHotels, setPopularHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popularTours, setPopularTours] = useState([]);
    const [toursLoading, setToursLoading] = useState(true);
    const [toursError, setToursError] = useState(null);
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [placesLoading, setPlacesLoading] = useState(true);
    const [placesError, setPlacesError] = useState(null);
    const { isAuthenticated } = useAuth();
    const [pnrCode, setPnrCode] = useState('');
    const [pnrReservation, setPnrReservation] = useState(null);
    const [pnrLoading, setPnrLoading] = useState(false);
    const [pnrError, setPnrError] = useState(null);

    useEffect(() => {
        fetchPopularHotels();
        fetchPopularTours();
        fetchPopularPlaces();
    }, []);

    const fetchPopularHotels = async () => {
        try {
            setLoading(true);
            const data = await hotelService.getAllHotels();
            // İlk 3 oteli al (veya backend'den popüler otelleri çeken özel bir endpoint kullanılabilir)
            setPopularHotels(data.slice(0, 4));
            setError(null);
        } catch (err) {
            console.error('Oteller yüklenirken hata:', err);
            setError('Oteller yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const fetchPopularTours = async () => {
        try {
            setToursLoading(true);
            const data = await tourService.getAllTours();
            // İlk 3 turu al
            setPopularTours(data.slice(0, 4));
            setToursError(null);
        } catch (err) {
            console.error('Turlar yüklenirken hata:', err);
            setToursError('Turlar yüklenirken bir hata oluştu');
        } finally {
            setToursLoading(false);
        }
    };

    const fetchPopularPlaces = async () => {
        try {
            setPlacesLoading(true);
            const data = await touristPlaceService.getAllPlaces();
            // İlk 4 turistik yeri al
            setPopularPlaces(data.slice(0, 4));
            setPlacesError(null);
        } catch (err) {
            console.error('Turistik yerler yüklenirken hata:', err);
            setPlacesError('Turistik yerler yüklenirken bir hata oluştu');
        } finally {
            setPlacesLoading(false);
        }
    };

    const handlePnrSearch = async (e) => {
        e.preventDefault();
        if (!pnrCode.trim()) {
            setPnrError(t('home.pnr.errorEmpty'));
            return;
        }

        try {
            setPnrLoading(true);
            setPnrError(null);
            const response = await reservationService.getReservationByPnr(pnrCode);
            setPnrReservation(response);
        } catch (error) {
            console.error('PNR arama hatası:', error);
            setPnrError(t('home.pnr.errorNotFound'));
            setPnrReservation(null);
        } finally {
            setPnrLoading(false);
        }
    };

    const renderPnrSection = () => (
        <div className="max-w-4xl mx-auto p-8 -mt-8 relative z-20">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                    {t('home.pnr.title')}
                </h2>
                <form onSubmit={handlePnrSearch} className="flex flex-col items-center gap-4">
                    <div className="w-full max-w-md">
                        <input
                            type="text"
                            value={pnrCode}
                            onChange={(e) => setPnrCode(e.target.value.toUpperCase())}
                            placeholder={t('home.pnr.placeholder')}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#00A9FF] hover:bg-[#0098e5] text-white px-6 py-3 rounded-lg 
                                 transition-colors duration-300 flex items-center gap-2"
                        disabled={pnrLoading}
                    >
                        {pnrLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : null}
                        {t('home.pnr.searchButton')}
                    </button>
                </form>

                {pnrError && (
                    <div className="mt-4 text-center text-red-500">
                        {pnrError}
                    </div>
                )}

                {pnrReservation && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">{t('home.pnr.reservationDetails')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">{t('home.pnr.hotelName')}</p>
                                <p className="font-semibold">{pnrReservation.hotelName}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">{t('home.pnr.guestName')}</p>
                                <p className="font-semibold">{pnrReservation.guestName}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">{t('home.pnr.checkIn')}</p>
                                <p className="font-semibold">{pnrReservation.checkIn}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">{t('home.pnr.checkOut')}</p>
                                <p className="font-semibold">{pnrReservation.checkOut}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">{t('home.pnr.status')}</p>
                                <p className="font-semibold">{pnrReservation.status}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">{t('home.pnr.totalAmount')}</p>
                                <p className="font-semibold">{pnrReservation.totalAmount} TL</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                {/* Banner Area */}
                <div className="relative h-[600px]">
                    <img 
                        src="/VanManzara.jpg" 
                        alt="Van Manzarası" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f2d]/90 to-[#2a3142]/90 flex flex-col items-center justify-center">
                        {/* Logo */}
                        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
                            <img 
                                src="/logo.png"
                                alt="Van Tour Logo"
                                className="w-32 h-32 object-contain"
                            />
                        </div>

                        {/* Başlık */}
                        <h1 className="text-white text-5xl font-bold mb-4 text-center">
                            {t('home.banner.title')}
                            <span className="block mt-2 text-green-400">{t('home.banner.subtitle')}</span>
                        </h1>

                        {/* Alt Başlık */}
                        <p className="text-gray-100 text-xl mb-8 text-center max-w-2xl">
                            {t('home.banner.description')}
                        </p>

                        {/* Butonlar */}
                        <div className="flex flex-wrap gap-4 justify-center relative z-20">
                            <Link 
                                to="/hotels" 
                                className="bg-[#00A9FF] hover:bg-[#0098e5] text-white px-8 py-3 rounded-lg 
                                          text-lg font-semibold transition duration-300 ease-in-out 
                                          transform hover:scale-105 hover:shadow-lg
                                          flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {t('home.banner.hotelButton')}
                            </Link>
                            <Link 
                                to="/touristic-places" 
                                className="bg-[#64CCC5] hover:bg-[#53b5af] text-white px-8 py-3 rounded-lg 
                                          text-lg font-semibold transition duration-300 ease-in-out 
                                          transform hover:scale-105 hover:shadow-lg
                                          flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {t('home.banner.placesButton')}
                            </Link>
                            {/* PNR Sorgulama Butonu */}
                            <button
                                onClick={() => document.getElementById('pnrModal').showModal()}
                                className="bg-[#176B87] hover:bg-[#145e75] text-white px-8 py-3 rounded-lg 
                                          text-lg font-semibold transition duration-300 ease-in-out 
                                          transform hover:scale-105 hover:shadow-lg
                                          flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {t('home.pnr.checkReservation')}
                            </button>
                        </div>

                        {/* Scroll Down İndikatörü */}
                        <div className="absolute bottom-8 animate-bounce">
                            <svg 
                                className="w-6 h-6 text-white" 
                                fill="none" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Dalga Efekti */}
                    <div className="absolute bottom-0 left-0 right-0 z-10">
                        <svg 
                            className="waves" 
                            xmlns="http://www.w3.org/2000/svg" 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 24 150 28" 
                            preserveAspectRatio="none" 
                            shapeRendering="auto"
                        >
                            <defs>
                                <path 
                                    id="gentle-wave" 
                                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                />
                            </defs>
                            <g className="parallax">
                                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(243, 244, 246, 0.7)" />
                                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(243, 244, 246, 0.5)" />
                                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(243, 244, 246, 0.3)" />
                                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#f3f4f6" />
                            </g>
                        </svg>
                    </div>
                </div>

                {/* PNR Modal */}
                <dialog id="pnrModal" className="modal rounded-lg shadow-xl p-0 w-full max-w-md">
                    <div className="bg-white p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                {t('home.pnr.title')}
                            </h3>
                            <button 
                                onClick={() => document.getElementById('pnrModal').close()}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handlePnrSearch} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={pnrCode}
                                    onChange={(e) => setPnrCode(e.target.value.toUpperCase())}
                                    placeholder={t('home.pnr.placeholder')}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#00A9FF] hover:bg-[#0098e5] text-white px-6 py-3 rounded-lg 
                                         transition-colors duration-300 flex items-center justify-center gap-2"
                                disabled={pnrLoading}
                            >
                                {pnrLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                ) : null}
                                {t('home.pnr.searchButton')}
                            </button>
                        </form>

                        {pnrError && (
                            <div className="mt-4 text-center text-red-500">
                                {pnrError}
                            </div>
                        )}

                        {pnrReservation && (
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">{t('home.pnr.reservationDetails')}</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <p className="text-gray-600">{t('home.pnr.hotelName')}</p>
                                        <p className="font-semibold">{pnrReservation.hotelName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">{t('home.pnr.guestName')}</p>
                                        <p className="font-semibold">{pnrReservation.guestName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">{t('home.pnr.checkIn')}</p>
                                            <p className="font-semibold">{pnrReservation.checkIn}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">{t('home.pnr.checkOut')}</p>
                                            <p className="font-semibold">{pnrReservation.checkOut}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">{t('home.pnr.status')}</p>
                                        <p className="font-semibold">{pnrReservation.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">{t('home.pnr.totalAmount')}</p>
                                        <p className="font-semibold">{pnrReservation.totalAmount} TL</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </dialog>

                {/* Search Bar 
                <div className="p-4 bg-white shadow-md rounded-lg mx-4 -mt-8 relative z-20">
                    <SearchBar />
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <input type="text" placeholder={t('home.search.city')} className="border border-gray-300 rounded-lg p-2 flex-1 min-w-[200px]" />
                        <input type="date" className="border border-gray-300 rounded-lg p-2 flex-1 min-w-[200px]" />
                        <input type="date" className="border border-gray-300 rounded-lg p-2 flex-1 min-w-[200px]" />
                        <input type="number" placeholder={t('home.search.guests')} className="border border-gray-300 rounded-lg p-2 flex-1 min-w-[200px]" />
                        <button className="bg-[#00A9FF] hover:bg-[#0098e5] text-white rounded-lg px-6 py-2 transition-colors">
                            {t('home.search.searchButton')}
                        </button>
                    </div>
                </div>
                */}
                {/* Popular Hotels Section */}
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('home.sections.popularHotels')}</h2>
                    
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <p className="text-red-500">{t('home.sections.error')}</p>
                            <button 
                                onClick={fetchPopularHotels}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {t('home.sections.tryAgain')}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularHotels.map((hotel) => (
                                <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img 
                                        src={Array.isArray(hotel.photoUrls) && hotel.photoUrls.length > 0 
                                            ? hotel.photoUrls[0] 
                                            : "/hotel-placeholder.jpg"} 
                                        alt={hotel.hotelName}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            console.log('Image load error:', hotel.photoUrls?.[0]);
                                            e.target.src = "/hotel-placeholder.jpg";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {hotel.hotelName}
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {hotel.hotelCity}, {hotel.district}
                                        </p>
                                        <div className="mt-2">
                                            {hotel.starRating && (
                                                <div className="flex items-center text-yellow-400">
                                                    {'⭐'.repeat(hotel.starRating)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <Link 
                                                to={`/hotel/${hotel.id}`}
                                                className="bg-[#00A9FF] hover:bg-[#0098e5] text-white px-4 py-2 rounded-lg 
                                                         transition-colors duration-300"
                                            >
                                                {t('hotels.details')}
                                            </Link>
                                            <Link 
                                                to={`/reserve/${hotel.id}`}
                                                className="bg-[#64CCC5] hover:bg-[#53b5af] text-white px-4 py-2 rounded-lg 
                                                         transition-colors duration-300"
                                            >
                                             {t('hotels.book')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!loading && !error && popularHotels.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">{t('home.sections.noHotels')}</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <Link 
                            to="/hotels"
                            className="inline-block bg-[#00A9FF] hover:bg-[#0098e5] text-white px-6 py-3 rounded-lg 
                                     transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            {t('home.sections.viewAllHotels')}
                        </Link>
                    </div>
                </div>

                {/* {/* Popular Tours Section 
                <div className="p-8 bg-gray-50">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('home.sections.popularTours')}</h2>
                    
                    {toursLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : toursError ? (
                        <div className="text-center py-10">
                            <p className="text-red-500">{toursError}</p>
                            <button 
                                onClick={fetchPopularTours}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {t('home.sections.tryAgain')}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularTours.map((tour) => (
                                <TourCard key={tour.id} tour={tour} />
                            ))}
                        </div>
                    )}

                    {!toursLoading && !toursError && popularTours.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">{t('home.sections.noTours')}</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <Link 
                            to="/tours"
                            className="inline-block bg-[#00A9FF] hover:bg-[#0098e5] text-white px-6 py-3 rounded-lg 
                                     transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            {t('home.sections.viewAllTours')}
                        </Link>
                    </div>
                </div>*/}

                {/* Popular Tourist Places Section */}
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('home.sections.popularPlaces')}</h2>
                    
                    {placesLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : placesError ? (
                        <div className="text-center py-10">
                            <p className="text-red-500">{placesError}</p>
                            <button 
                                onClick={fetchPopularPlaces}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {t('home.sections.tryAgain')}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularPlaces.map((place) => (
                                <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img 
                                        src={place.image || "/place-placeholder.jpg"} 
                                        alt={place.name}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = "/place-placeholder.jpg";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {place.name}
                                        </h3>
                                    {   /* <p className="text-gray-600 mt-2 line-clamp-2">
                                            {place.description}
                                        </p>
                                        <div className="mt-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {place.visitOpenTime} - {place.visitCloseTime}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {place.location}
                                            </div>
                                        </div>*/}
                                        <div className="mt-4 flex justify-between items-center">
                                            
                                            <Link 
                                                to={`/place/${place.id}`}
                                                className="bg-[#176B87] hover:bg-[#145e75] text-white px-4 py-2 rounded-lg 
                                                         transition-colors duration-300"
                                            >
                                                {t('places.details')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!placesLoading && !placesError && popularPlaces.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">{t('home.sections.noPlaces')}</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <Link 
                            to="/touristic-places"
                            className="inline-block bg-[#176B87] hover:bg-[#145e75] text-white px-6 py-3 rounded-lg 
                                     transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            {t('home.sections.viewAllPlaces')}
                        </Link>
                    </div>
                </div>

                {/* User Login/Register Buttons - Sadece giriş yapmamış kullanıcılara göster */}
                {!isAuthenticated && (
                    <div className="p-8 text-center">
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mr-4 
                                     transition-colors shadow-md hover:shadow-lg"
                        >
                            {t('home.auth.login')}
                        </button>
                        <button 
                            onClick={() => navigate('/register')}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg 
                                     transition-colors shadow-md hover:shadow-lg"
                        >
                            {t('home.auth.register')}
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default HomePage; 