import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hotelService } from '../services/hotelService';
import Layout from '../components/Layout';
import HotelCard from '../components/HotelCard';

const HotelSearchPage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        city: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const data = await hotelService.getAllHotels();
            setHotels(data);
            setError(null);
        } catch (err) {
            setError('Oteller yüklenirken bir hata oluştu.');
            console.error('Hata:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Arama fonksiyonu eklenecek
        console.log('Arama parametreleri:', searchParams);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold p-4">Otel Arama ve Rezervasyon</h1>
                    
                    {/* Search & Filter Panel */}
                    <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <input 
                                type="text" 
                                name="city"
                                value={searchParams.city}
                                onChange={handleInputChange}
                                placeholder="Şehir" 
                                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input 
                                type="date" 
                                name="checkIn"
                                value={searchParams.checkIn}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            />
                            <input 
                                type="date" 
                                name="checkOut"
                                value={searchParams.checkOut}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            />
                            <input 
                                type="number" 
                                name="guests"
                                value={searchParams.guests}
                                onChange={handleInputChange}
                                placeholder="Kişi Sayısı" 
                                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            />
                            <button 
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Ara
                            </button>
                        </div>
                    </form>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-10">
                            <p className="text-red-500">{error}</p>
                            <button 
                                onClick={fetchHotels}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Tekrar Dene
                            </button>
                        </div>
                    )}

                    {/* Hotel List */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hotels.map((hotel) => (
                                <HotelCard key={hotel.id} hotel={hotel} />
                            ))}

                            {hotels.length === 0 && !loading && (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-500">Hiç otel bulunamadı.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HotelSearchPage;