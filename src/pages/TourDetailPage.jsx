import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { tourService } from '../services/tourService';

const TourDetailPage = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTourDetails();
    }, [id]);

    const fetchTourDetails = async () => {
        try {
            setLoading(true);
            const data = await tourService.getTourById(id);
            setTour(data);
            setError(null);
        } catch (err) {
            console.error('Tur detayları yüklenirken hata:', err);
            setError('Tur detayları yüklenirken bir hata oluştu');
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
                        onClick={fetchTourDetails}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-100">
                <div className="container mx-auto p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Tur Resmi */}
                        <div className="relative h-96">
                            <img 
                                src={tour?.photoUrl || "/tour-placeholder.jpg"} 
                                alt={tour?.tourName} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "/tour-placeholder.jpg";
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                <h1 className="text-4xl font-bold text-white">{tour?.tourName}</h1>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Temel Bilgiler */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold mb-2">Tur Bilgileri</h2>
                                        <div className="space-y-2 text-gray-600">
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Başlangıç:</span>
                                                {tour?.tourStartAddress}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Bitiş:</span>
                                                {tour?.tourEndAddress}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Tarih:</span>
                                                {new Date(tour?.startDate).toLocaleDateString('tr-TR')} - {new Date(tour?.endDate).toLocaleDateString('tr-TR')}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Katılımcı:</span>
                                                {tour?.participantCount} kişi
                                            </p>
                                            {tour?.starRating && (
                                                <p className="flex items-center">
                                                    <span className="w-32 font-medium">Değerlendirme:</span>
                                                    <span className="text-yellow-400">
                                                        {'⭐'.repeat(tour.starRating)}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold mb-2">İletişim</h2>
                                        <p className="text-gray-600">
                                            {tour?.phone}
                                        </p>
                                    </div>
                                </div>

                                {/* Rezervasyon Kartı */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="text-center">
                                        <p className="text-gray-600 mb-2">Kişi Başı</p>
                                        <div className="text-4xl font-bold text-blue-600 mb-4">
                                            {tour?.price} TL
                                        </div>
                                        <Link 
                                            to={`/tour-reservation/${tour.id}`}
                                            className="block w-full bg-[#00A9FF] hover:bg-[#0098e5] text-white py-3 px-6 rounded-lg 
                                                     transition-colors duration-300 text-center font-semibold"
                                        >
                                            Hemen Rezervasyon Yap
                                        </Link>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Anında Onay
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Ücretsiz İptal
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Harita veya Ek Bilgiler */}
                            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                <h2 className="text-2xl font-semibold mb-4">Tur Güzergahı</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                        <p>Başlangıç: {tour?.tourStartAddress}</p>
                                    </div>
                                    <div className="w-0.5 h-6 bg-gray-300 ml-1.5"></div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                        <p>Bitiş: {tour?.tourEndAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TourDetailPage;