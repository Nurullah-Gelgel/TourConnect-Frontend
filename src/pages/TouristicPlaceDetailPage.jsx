import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { touristPlaceService } from '../services/touristPlaceService';

const TouristicPlaceDetailPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlaceDetails();
    }, [id]);

    const fetchPlaceDetails = async () => {
        try {
            setLoading(true);
            const data = await touristPlaceService.getPlaceById(id);
            setPlace(data);
            setError(null);
        } catch (err) {
            console.error('Yer detayları yüklenirken hata:', err);
            setError('Yer detayları yüklenirken bir hata oluştu');
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
                        onClick={fetchPlaceDetails}
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
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <Link 
                        to="/touristic-places" 
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        {t('common.backToList')}
                    </Link>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto">
                        {/* Hero Image */}
                        <div className="relative h-[400px]">
                            <img 
                                src={place?.image || "/place-placeholder.jpg"} 
                                alt={place?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "/place-placeholder.jpg";
                                }}
                            />
                        </div>

                        <div className="p-8 sm:p-10">
                            <div className="max-w-4xl mx-auto">
                                {/* Title */}
                                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                                    {place?.name}
                                </h1>

                                {/* Location */}
                                <div className="flex items-center text-gray-600 mb-10 bg-gray-50 p-5 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#176B87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-xl">{place?.location}</span>
                                </div>

                                {/* Description */}
                                <div className="prose prose-lg max-w-none">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                        {t('places.about')}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {place?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TouristicPlaceDetailPage; 