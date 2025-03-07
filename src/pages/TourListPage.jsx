import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
const TourListPage = () => {
    const [category, setCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [duration, setDuration] = useState('all');

    // Sample tour data (in a real app, this would come from an API)
    const tours = [
        {
            id: 1,
            name: 'Van Kalesi Turu',
            category: 'cultural',
            image: '/path/to/tour-image.jpg',
            description: 'Van Kalesi ve çevresini keşfedin',
            guided: true,
            duration: 'half-day',
            price: 200,
            available: true
        },
        // Add more tour examples
    ];

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
          
            <div className="container mx-auto p-4">
                {/* Filter Section */}
                <div className="p-4 bg-white shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Van Turları</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="all">Tüm Kategoriler</option>
                            <option value="cultural">Kültürel Turlar</option>
                            <option value="nature">Doğa Gezileri</option>
                            <option value="food">Yemek Turları</option>
                        </select>

                        <select 
                            value={priceRange} 
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="all">Tüm Fiyatlar</option>
                            <option value="0-200">0-200 TL</option>
                            <option value="201-500">201-500 TL</option>
                            <option value="501+">501+ TL</option>
                        </select>

                        <select 
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="all">Tüm Süreler</option>
                            <option value="half-day">Yarım Gün</option>
                            <option value="full-day">Tam Gün</option>
                        </select>

                        <input 
                            type="date" 
                            className="border p-2 rounded"
                        />
                    </div>
                </div>

                {/* Tour List */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tours.map((tour) => (
                        <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img 
                                src={tour.image} 
                                alt={tour.name} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{tour.name}</h3>
                                <p className="text-gray-600">{tour.description}</p>
                                <div className="mt-2">
                                    <span className="text-blue-500 font-bold">{tour.price} TL</span>
                                    <span className="ml-2">{tour.guided ? '🎯 Rehberli' : '🚶‍♂️ Rehbersiz'}</span>
                                    <span className="ml-2">{tour.duration === 'half-day' ? '½ Gün' : 'Tam Gün'}</span>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <Link 
                                        to={`/tour/${tour.id}`} 
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Detayları Gör
                                    </Link>
                                    <Link 
                                        to={`/tour-reserve/${tour.id}`} 
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Rezervasyon Yap
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
        </Layout>
    );
};

export default TourListPage; 