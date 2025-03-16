import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { tourService } from '../services/tourService';

const TourListPage = () => {
    const { t } = useTranslation();
    const [category, setCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [duration, setDuration] = useState('all');
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            setLoading(true);
            const data = await tourService.getAllTours();
            setTours(data);
            setError(null);
        } catch (err) {
            console.error('Turlar yüklenirken hata:', err);
            setError('Turlar yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    // Fiyat aralığına göre filtreleme
    const filterByPrice = (tour) => {
        if (priceRange === 'all') return true;
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange === '501+') return tour.price >= 501;
        return tour.price >= min && tour.price <= max;
    };

    // Filtrelenmiş turları al
    const filteredTours = tours.filter(filterByPrice);

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4">
                    {/* Filter Section */}
                    <div className="p-4 bg-white shadow-md">
                        <h1 className="text-3xl font-bold mb-4">{t('tours.title')}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="all">{t('tours.search.allTypes')}</option>
                                <option value="cultural">{t('tours.search.cultural')}</option>
                                <option value="nature">{t('tours.search.nature')}</option>
                                <option value="daily">{t('tours.search.daily')}</option>
                            </select>

                            <select 
                                value={priceRange} 
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="all">{t('tours.price')} - {t('common.all')}</option>
                                <option value="0-200">0-200 TL</option>
                                <option value="201-500">201-500 TL</option>
                                <option value="501+">501+ TL</option>
                            </select>

                            <select 
                                value={duration} 
                                onChange={(e) => setDuration(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="all">{t('tours.duration')} - {t('common.all')}</option>
                                <option value="half-day">{t('tours.halfDay')}</option>
                                <option value="full-day">{t('tours.fullDay')}</option>
                            </select>

                            <input 
                                type="date" 
                                className="border p-2 rounded"
                                placeholder={t('tours.search.date')}
                            />
                        </div>
                    </div>

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
                                onClick={fetchTours}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {t('common.tryAgain')}
                            </button>
                        </div>
                    )}

                    {/* Tour List */}
                    {!loading && !error && (
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTours.map((tour) => (
                                <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img 
                                        src={tour.photoUrl || "/tour-placeholder.jpg"}
                                        alt={tour.tourName} 
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = "/tour-placeholder.jpg";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold">{tour.tourName}</h3>  
                                        <p className="text-gray-600">
                                            {tour.tourStartAddress} - {tour.tourEndAddress}
                                        </p>
                                        <div className="mt-2">
                                            <span className="text-blue-500 font-bold">
                                                {tour.price} TL / {t('tours.perPerson')}
                                            </span>
                                            {tour.starRating && (
                                                <span className="ml-2 text-yellow-500">
                                                    {'⭐'.repeat(tour.starRating)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <Link 
                                                to={`/tour/${tour.id}`} 
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                            >
                                                {t('tours.details')}
                                            </Link>
                                            <Link 
                                                to={`/tour-reservation/${tour.id}`} 
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                            >
                                                {t('tours.book')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredTours.length === 0 && (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-500">{t('tours.search.noResults')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default TourListPage; 