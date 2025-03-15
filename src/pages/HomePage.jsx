import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import TourCard from '../components/TourCard';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { hotelService } from '../services/hotelService';
import { tourService } from '../services/tourService';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [popularHotels, setPopularHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popularTours, setPopularTours] = useState([]);
    const [toursLoading, setToursLoading] = useState(true);
    const [toursError, setToursError] = useState(null);

    useEffect(() => {
        fetchPopularHotels();
        fetchPopularTours();
    }, []);

    const fetchPopularHotels = async () => {
        try {
            setLoading(true);
            const data = await hotelService.getAllHotels();
            // İlk 3 oteli al (veya backend'den popüler otelleri çeken özel bir endpoint kullanılabilir)
            setPopularHotels(data.slice(0, 3));
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
            setPopularTours(data.slice(0, 3));
            setToursError(null);
        } catch (err) {
            console.error('Turlar yüklenirken hata:', err);
            setToursError('Turlar yüklenirken bir hata oluştu');
        } finally {
            setToursLoading(false);
        }
    };

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
                                to="/tours" 
                                className="bg-[#64CCC5] hover:bg-[#53b5af] text-white px-8 py-3 rounded-lg 
                                          text-lg font-semibold transition duration-300 ease-in-out 
                                          transform hover:scale-105 hover:shadow-lg
                                          flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('home.banner.tourButton')}
                            </Link>
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

                {/* Search Bar */}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularHotels.map((hotel) => (
                                <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img 
                                        src={hotel.photoUrl || "/hotel-placeholder.jpg"} 
                                        alt={hotel.hotelName}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
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
                                                Detayları Gör
                                            </Link>
                                            <Link 
                                                to={`/reserve/${hotel.id}`}
                                                className="bg-[#64CCC5] hover:bg-[#53b5af] text-white px-4 py-2 rounded-lg 
                                                         transition-colors duration-300"
                                            >
                                                Rezervasyon
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

                {/* Popular Tours Section */}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </div>

                {/* User Login/Register Buttons */}
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
            </div>
        </Layout>
    );
};

export default HomePage; 