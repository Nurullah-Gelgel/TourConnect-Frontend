import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
const TourDetailPage = () => {
    const { id } = useParams();

    // Sample tour data (in a real app, this would come from an API)
    const tour = {
        id,
        name: 'Van Kalesi Turu',
        description: 'Van Kalesi ve çevresini keşfedin',
        image: '/path/to/tour-image.jpg',
        price: 200,
        guided: true,
        duration: 'half-day',
        schedule: [
            '09:00 - Otel önünden hareket',
            '09:30 - Van Kalesi varış',
            '12:00 - Öğle yemeği molası',
            '14:00 - Tur sonu'
        ],
        included: [
            'Ulaşım',
            'Profesyonel rehber',
            'Öğle yemeği',
            'Müze giriş ücretleri'
        ],
        startLocation: 'Van Merkez',
        reviews: [
            { user: 'Ahmet', rating: 5, comment: 'Harika bir deneyimdi!' },
            { user: 'Mehmet', rating: 4, comment: 'Çok bilgilendirici bir turdu.' }
        ]
    };

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
            
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                        src={tour.image} 
                        alt={tour.name} 
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                        <h1 className="text-3xl font-bold">{tour.name}</h1>
                        <p className="text-gray-600 mt-2">{tour.description}</p>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Günlük Program</h2>
                            <ul className="list-disc pl-5 mt-2">
                                {tour.schedule.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Dahil Olan Hizmetler</h2>
                            <ul className="list-disc pl-5 mt-2">
                                {tour.included.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Başlangıç Noktası</h2>
                            <p>{tour.startLocation}</p>
                            {/* Add map component here */}
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Yorumlar</h2>
                            <div className="mt-2">
                                {tour.reviews.map((review, index) => (
                                    <div key={index} className="border-b pb-2 mb-2">
                                        <div className="flex items-center">
                                            <span className="font-semibold">{review.user}</span>
                                            <span className="ml-2">{'⭐'.repeat(review.rating)}</span>
                                        </div>
                                        <p>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <div>
                                <span className="text-2xl font-bold text-blue-500">{tour.price} TL</span>
                                <span className="ml-2">{tour.guided ? '🎯 Rehberli' : '🚶‍♂️ Rehbersiz'}</span>
                                <span className="ml-2">{tour.duration === 'half-day' ? '½ Gün' : 'Tam Gün'}</span>
                            </div>
                            <Link 
                                to={`/tour-reserve/${tour.id}`}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg"
                            >
                                Hemen Rezervasyon Yap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        </Layout>
    );
};

export default TourDetailPage; 