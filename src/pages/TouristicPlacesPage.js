import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FilterSection from '../components/tourist-places/FilterSection';
import MapSection from '../components/tourist-places/MapSection';
import PlaceCard from '../components/tourist-places/PlaceCard';
import { categories, seasons } from '../data/touristicPlacesData';
import Layout from '../components/Layout';
import { touristPlaceService } from '../services/touristPlaceService';

const TouristicPlacesPage = () => {
    const { t } = useTranslation();
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSeason, setSelectedSeason] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const center = {
        lat: 38.4891,
        lng: 43.4089
    };

    // Backend verisini mevcut yapıya dönüştürme fonksiyonu
    const transformPlaceData = (backendData) => {
        return backendData.map(place => ({
            id: place.id,
            name: place.name,
            description: place.description,
            image: place.image,
            category: place.category || 'all',
            bestSeasons: ['spring', 'summer', 'autumn', 'winter'], // Varsayılan tüm mevsimler
            position: {
                lat: center.lat, // Varsayılan konum
                lng: center.lng
            },
            visitTimes: {
                open: '09:00',
                close: '17:00',
                duration: '2 saat'
            },
            entryFee: {
                adult: `${place.entryFeeAdult} TL`,
                student: `${place.entryFeeStudent} TL`,
                museum_card: `${place.entryFeeMuseum} TL`
            },
            facilities: [
                'Otopark',
                'Rehberlik',
                'Fotoğraf Çekimi'
            ],
            transportation: {
                car: 'Özel araçla ulaşım mümkün',
                bus: 'Toplu taşıma mevcut',
                taxi: 'Taksi ile ulaşılabilir'
            },
            starRating: place.starRating
        }));
    };

    useEffect(() => {
        fetchTouristicPlaces();
    }, []);

    const fetchTouristicPlaces = async () => {
        try {
            setLoading(true);
            const data = await touristPlaceService.getAllPlaces();
            const transformedData = transformPlaceData(data);
            setPlaces(transformedData);
            setError(null);
        } catch (err) {
            console.error('Turistik yerler yüklenirken hata:', err);
            setError('Turistik yerler yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    // Filtreleme işlemi
    const filteredPlaces = places.filter(place => 
        (selectedCategory === 'all' || place.category === selectedCategory) &&
        (selectedSeason === 'all' || place.bestSeasons.includes(selectedSeason))
    );

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
                     {/*<h1 className="text-3xl font-bold mb-6">{t('places.title')}</h1>

                    Filtreler 
                    <div className="p-4 bg-white shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="all">{t('places.categories.all')}</option>
                                <option value="historical">{t('places.categories.historical')}</option>
                                <option value="nature">{t('places.categories.nature')}</option>
                                <option value="culture">{t('places.categories.culture')}</option>
                                <option value="religious">{t('places.categories.religious')}</option>
                                <option value="museum">{t('places.categories.museum')}</option>
                            </select>

                            <select 
                                value={selectedSeason} 
                                onChange={(e) => setSelectedSeason(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="all">{t('places.seasons.all')}</option>
                                <option value="spring">{t('places.seasons.spring')}</option>
                                <option value="summer">{t('places.seasons.summer')}</option>
                                <option value="autumn">{t('places.seasons.autumn')}</option>
                                <option value="winter">{t('places.seasons.winter')}</option>
                            </select>

                            <input 
                                type="date" 
                                className="border p-2 rounded"
                            />
                        </div>
                    </div>
                        */}
                    {/* Turistik Yerler Listesi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {filteredPlaces.map(place => (
                            <PlaceCard key={place.id} place={place} />
                        ))}

                        {filteredPlaces.length === 0 && (
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