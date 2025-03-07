import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
const HotelDetailPage = () => {
    const { id } = useParams(); // Get the hotel ID from the URL

    // Sample hotel data (in a real app, this would come from an API)
    const hotel = {
        name: `Otel Adı ${id}`,
        location: 'Van',
        price: '100₺/gece',
        rating: 4.5,
        reviews: [
            { user: 'Ali', comment: 'Harika bir deneyim!', rating: 5 },
            { user: 'Ayşe', comment: 'Temiz ve konforlu.', rating: 4 },
        ],
        services: ['Ücretsiz Wi-Fi', 'Kahvaltı Dahil', 'Otopark'],
    };

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <p className="text-gray-600">Konum: {hotel.location}</p>
            <p className="text-blue-500 font-bold">Fiyat: {hotel.price}</p>
            <p className="text-yellow-500">⭐ {hotel.rating} ({hotel.reviews.length} Yorum)</p>

            <h2 className="text-xl mt-4">Hizmetler</h2>
            <ul>
                {hotel.services.map((service, index) => (
                    <li key={index}>- {service}</li>
                ))}
            </ul>

            <h2 className="text-xl mt-4">Kullanıcı Yorumları</h2>
            {hotel.reviews.map((review, index) => (
                <div key={index} className="border-b mb-2 pb-2">
                    <strong>{review.user}</strong>: {review.comment} (⭐ {review.rating})
                </div>
            ))}

            <Link to={`/reserve/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">Rezervasyon Yap</Link>

            </div>
        </Layout>
    );
};

export default HotelDetailPage; 