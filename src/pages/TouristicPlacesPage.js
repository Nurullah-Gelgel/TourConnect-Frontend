import React, { useState } from 'react';
import FilterSection from '../components/tourist-places/FilterSection';
import MapSection from '../components/tourist-places/MapSection';
import PlaceCard from '../components/tourist-places/PlaceCard';
import { categories, seasons, touristicPlaces } from '../data/touristicPlacesData';
import Layout from '../components/Layout';
const TouristicPlacesPage = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSeason, setSelectedSeason] = useState('all');

    const center = {
        lat: 38.4891,
        lng: 43.4089
    };

    // Filtreleme işlemi
    const filteredPlaces = touristicPlaces.filter(place => 
        (selectedCategory === 'all' || place.category === selectedCategory) &&
        (selectedSeason === 'all' || place.bestSeasons.includes(selectedSeason))
    );

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
           
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Van'daki Turistik Yerler</h1>

                {/* Filtreler */}
                <FilterSection 
                    selectedCategory={selectedCategory}
                    selectedSeason={selectedSeason}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSeason={setSelectedSeason}
                    categories={categories}
                    seasons={seasons}
                />

                {/* Harita */}
                <MapSection 
                    center={center}
                    places={filteredPlaces}
                    selectedPlace={selectedPlace}
                    setSelectedPlace={setSelectedPlace}
                />

                {/* Turistik Yerler Listesi */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlaces.map(place => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
            </div>
            
        </div>
        </Layout>
    );
};

export default TouristicPlacesPage;