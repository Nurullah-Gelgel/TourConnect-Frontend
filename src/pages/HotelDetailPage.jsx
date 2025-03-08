import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import { hotelService } from '../services/hotelService';

const HotelDetailPage = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        Tekrar Dene
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-gray-100">
                <div className="container mx-auto p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Otel Resmi */}
                        <div className="relative h-96">
                            <img 
                                src={hotel?.photoUrl || "/hotel-placeholder.jpg"} 
                                alt={hotel?.hotelName} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "/hotel-placeholder.jpg";
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                <h1 className="text-4xl font-bold text-white">{hotel?.hotelName}</h1>
                                <div className="flex items-center mt-2">
                                    <span className="text-white mr-2">
                                        {hotel?.hotelCity}, {hotel?.district}
                                    </span>
                                    {hotel?.starRating && (
                                        <span className="text-yellow-400">
                                            {'⭐'.repeat(hotel.starRating)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Sol Kolon - Otel Bilgileri */}
                                <div className="md:col-span-2">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold mb-4">Otel Bilgileri</h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Adres:</span>
                                                {hotel?.hotelAddress}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Telefon:</span>
                                                {hotel?.phone}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">E-posta:</span>
                                                {hotel?.email}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Yıldız:</span>
                                                <span className="text-yellow-400">
                                                    {'⭐'.repeat(hotel?.starRating || 0)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Otel Özellikleri */}
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold mb-4">Otel Özellikleri</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {hotel?.features?.map((feature, index) => (
                                                <div key={index} className="flex items-center space-x-2 text-gray-600">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>{feature}</span>
                </div>
            ))}
                                        </div>
                                    </div>

                                    {/* Konum */}
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold mb-4">Konum</h2>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-600">
                                                {hotel?.hotelAddress}
                                            </p>
                                            {/* Burada harita eklenebilir */}
                                        </div>
                                    </div>
                                </div>

                                {/* Sağ Kolon - Rezervasyon Kartı */}
                                <div className="md:col-span-1">
                                    <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                                        <div className="text-center">
                                            <p className="text-gray-600 mb-2">Gecelik</p>
                                            <div className="text-4xl font-bold text-blue-600 mb-4">
                                                {hotel?.price} TL
                                            </div>
                                            <Link 
                                                to={`/hotel-reservation/${hotel?.id}`}
                                                className="block w-full bg-[#00A9FF] hover:bg-[#0098e5] text-white py-3 px-6 rounded-lg 
                                                         transition-colors duration-300 text-center font-semibold mb-4"
                                            >
                                                Hemen Rezervasyon Yap
                                            </Link>
                                            <div className="space-y-3 text-left mt-6">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Ücretsiz İptal
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Hızlı Onay
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Güvenli Ödeme
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
    );
};

export default HotelDetailPage; 