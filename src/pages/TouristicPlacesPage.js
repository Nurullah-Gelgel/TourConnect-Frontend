import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { touristPlaceService } from '../services/touristPlaceService';

const TouristicPlacesPage = () => {
    const { t } = useTranslation();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTouristicPlaces();
    }, []);

    const fetchTouristicPlaces = async () => {
        try {
            setLoading(true);
            const data = await touristPlaceService.getAllPlaces();
            setPlaces(data);
            setError(null);
        } catch (err) {
            console.error('Turistik yerler yüklenirken hata:', err);
            setError('Turistik yerler yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-red-500 text-xl">{error}</p>
                    <button 
                        onClick={fetchTouristicPlaces}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        {t('common.tryAgain')}
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-semibold mb-6">{t('places.title')}</h1>

                    {/* Turistik Yerler Listesi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {places.map(place => (
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
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {place.name}
                                    </h3>
                                    <p className="text-gray-600 mb-3 line-clamp-2">
                                        {place.description}
                                    </p>
                                    <div className="flex items-center text-gray-500 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm">{place.location}</span>
                                    </div>
                                    <Link 
                                        to={`/place/${place.id}`}
                                        className="w-full bg-[#176B87] hover:bg-[#145e75] text-white px-4 py-2 rounded-lg 
                                                 transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {t('places.details')}
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {places.length === 0 && (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500">{t('places.noResults')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TouristicPlacesPage;