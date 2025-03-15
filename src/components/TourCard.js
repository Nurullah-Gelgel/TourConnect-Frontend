// src/components/TourCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
    // Eğer tour prop'u gönderilmemişse varsayılan görünüm
    if (!tour) {
        return (
            <div className="bg-white shadow-md rounded-lg p-4">
                <img 
                src={tour.photoUrl} 
                alt="Tour" 
                    className="w-full h-32 object-cover rounded-t-lg" 
                />
                <h3 className="text-lg font-semibold mt-2">Tur Adı</h3>
                <p className="text-gray-600">Açıklama burada yer alacak.</p>
                <p className="text-blue-500 font-bold">Fiyat: ---₺</p>
            </div>
        );
    }

    // Backend'den gelen verilerle görünüm
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img 
                src={tour.photoUrl} 
                alt={tour.tourName} 
                className="w-full h-32 object-cover rounded-t-lg" 
            />
            <h3 className="text-lg font-semibold mt-2">{tour.tourName}</h3>
            <p className="text-gray-600">
                {tour.tourStartAddress} - {tour.tourEndAddress}
            </p>
            <p className="text-blue-500 font-bold">
                Fiyat: {tour.price}₺
            </p>
            <div className="mt-4 flex justify-between items-center">
                <Link 
                    to={`/tour/${tour.id}`}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Detaylar
                </Link>
                {tour.starRating && (
                    <span className="text-yellow-500">
                        {'⭐'.repeat(tour.starRating)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TourCard;