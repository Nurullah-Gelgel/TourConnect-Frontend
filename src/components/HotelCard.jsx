import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HotelCard = ({ hotel }) => {
    const { t } = useTranslation();
    
    if (!hotel) return null; // Hotel verisi yoksa null döndür

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
                src={hotel.photoUrl || "/hotel-placeholder.jpg"} 
                alt={hotel.hotelName} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.target.src = "/hotel-placeholder.jpg"; // Resim yüklenemezse placeholder göster
                }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{hotel.hotelName}</h3>
                <div className="mt-2 space-y-1">
                    <p className="text-gray-600">
                        <span className="font-medium">{t('hotels.location')}:</span> {hotel.hotelCity}, {hotel.district}
                    </p>
                    
                    {hotel.starRating && (
                        <p className="text-yellow-500">
                            {'⭐'.repeat(hotel.starRating)}
                        </p>
                    )}
                    {hotel.phone && (
                        <p className="text-gray-600">
                            <span className="font-medium">{t('hotels.phone')}:</span> {hotel.phone}
                        </p>
                    )}
                </div>
                <div className="flex justify-between mt-4">
                    <Link 
                        to={`/hotel/${hotel.id}`} 
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                    >
                        {t('hotels.details')}
                    </Link>
                    <Link 
                        to={`/reserve/${hotel.id}`} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                    >
                        {t('hotels.book')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotelCard; 