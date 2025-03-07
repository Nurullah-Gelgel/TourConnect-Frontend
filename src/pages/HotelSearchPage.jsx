import React from 'react';
import HotelCard from '../components/HotelCard';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
const HotelSearchPage = () => {
    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold p-4">Otel Arama ve Rezervasyon</h1>
                {/* Search & Filter Panel */}
                <div className="p-4 flex flex-col md:flex-row md:justify-between">
                    <input type="text" placeholder="Şehir" className="border border-gray-300 p-2 w-full md:w-1/4 mb-2 md:mb-0" />
                    <input type="date" className="border border-gray-300 p-2 w-full md:w-1/4 mb-2 md:mb-0" />
                    <input type="date" className="border border-gray-300 p-2 w-full md:w-1/4 mb-2 md:mb-0" />
                    <input type="number" placeholder="Kişi Sayısı" className="border border-gray-300 p-2 w-full md:w-1/4 mb-2 md:mb-0" />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Ara</button>
                </div>

                {/* Hotel List */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Example hotel cards */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((hotel) => (
                        <div key={hotel} className="bg-white shadow-md rounded-lg p-4">
                            <img src="/path/to/hotel-image.jpg" alt="Hotel" className="w-full h-32 object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2">Otel Adı {hotel}</h3>
                            <p className="text-gray-600">Konum: Van</p>
                            <p className="text-blue-500 font-bold">Fiyat: 100₺/gece</p>
                            <p className="text-yellow-500">⭐ 4.5 (100 Yorum)</p>
                            <div className="flex justify-between mt-4">
                                <Link to={`/hotel/${hotel}`} className="bg-green-500 text-white px-4 py-2 rounded">Detayları Gör</Link>
                                <Link to={`/reserve/${hotel}`} className="bg-blue-500 text-white px-4 py-2 rounded">Rezervasyon Yap</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default HotelSearchPage;