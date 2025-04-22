import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HotelCard = ({ hotel }) => {
    const { t } = useTranslation();
    
    if (!hotel) return null; // Hotel verisi yoksa null döndür

    const handleWhatsAppClick = (phone) => {
        // Remove any non-numeric characters from phone number
        const cleanPhone = phone.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

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
                        <div className="flex items-center text-gray-600">
                            <span className="font-medium mr-1">{t('hotels.phone')}:</span>
                            <span>{hotel.phone}</span>
                            <button 
                                onClick={() => handleWhatsAppClick(hotel.phone)}
                                className="ml-2 text-green-500 hover:text-green-600"
                                title="WhatsApp ile iletişime geç"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                                </svg>
                            </button>
                        </div>
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