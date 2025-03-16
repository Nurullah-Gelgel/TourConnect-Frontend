// src/components/TourCard.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
    const { t } = useTranslation();

    // Eğer tour prop'u gönderilmemişse varsayılan görünüm
    if (!tour) {
        return (
            <div className="bg-white shadow-md rounded-lg p-4">
                <img 
                    src="/tour-placeholder.jpg" 
                    alt="Tour" 
                    className="w-full h-32 object-cover rounded-t-lg" 
                />
                <h3 className="text-lg font-semibold mt-2">{t('tours.title')}</h3>
                <p className="text-gray-600">{t('tours.noDescription')}</p>
                <p className="text-blue-500 font-bold">{t('tours.price')}: ---₺</p>
            </div>
        );
    }

    // Backend'den gelen verilerle görünüm
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img 
                src={tour.photoUrl || "/tour-placeholder.jpg"} 
                alt={tour.tourName} 
                className="w-full h-32 object-cover rounded-t-lg" 
                onError={(e) => {
                    e.target.src = "/tour-placeholder.jpg";
                }}
            />
            <h3 className="text-lg font-semibold mt-2">{tour.tourName}</h3>
            <p className="text-gray-600">
                {tour.tourStartAddress} - {tour.tourEndAddress}
            </p>
            <p className="text-blue-500 font-bold">
                {t('tours.price')}: {tour.price}₺
            </p>
            <div className="mt-4 flex justify-between items-center">
                <Link 
                    to={`/tour/${tour.id}`}
                    className="text-blue-500 hover:text-blue-700"
                >
                    {t('tours.details')}
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