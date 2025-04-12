// src/components/TourCard.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
    const { t } = useTranslation();

    // Eğer tour prop'u gönderilmemişse varsayılan görünüm
    if (!tour) {
        return (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src="/tour-placeholder.jpg"
                    alt="Tour"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{t('tours.title')}</h3>
                    <p className="text-gray-600 mt-2">{t('tours.noDescription')}</p>
                    <p className="text-blue-500 font-bold mt-2">{t('tours.price')}: ---₺</p>
                </div>
            </div>
        );
    }

    // Backend'den gelen verilerle görünüm
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
                src={tour.photoUrl || "/tour-placeholder.jpg"}
                alt={tour.tourName}
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.target.src = "/tour-placeholder.jpg";
                }}
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                    {tour.tourName}
                </h3>
                <p className="text-gray-600 mt-2">
                    {tour.tourStartAddress} - {tour.tourEndAddress}
                </p>
                <div className="mt-2">
                    {tour.starRating && (
                        <div className="flex items-center text-yellow-400">
                            {'⭐'.repeat(tour.starRating)}
                        </div>
                    )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <Link
                        to={`/tour/${tour.id}`}
                        className="bg-[#00A9FF] hover:bg-[#0098e5] text-white px-4 py-2 rounded-lg 
                                 transition-colors duration-300"
                    >
                        {t('tours.details')}
                    </Link>
                    <Link
                        to={`/tour-reservation/${tour.id}`}
                        className="bg-[#64CCC5] hover:bg-[#53b5af] text-white px-4 py-2 rounded-lg 
                                 transition-colors duration-300"
                    >
                        {t('tours.book')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TourCard;