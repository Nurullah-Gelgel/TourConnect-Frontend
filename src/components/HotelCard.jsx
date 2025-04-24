import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiStar, FiMapPin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HotelCard = ({ hotel }) => {
    const { t } = useTranslation();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    
    if (!hotel) return null;

    // Ensure photoUrls is an array and has items
    const photoUrls = Array.isArray(hotel.photoUrls) ? hotel.photoUrls : [];
    
    const handlePrevPhoto = (e) => {
        e.preventDefault();
        setCurrentPhotoIndex((prev) => (prev === 0 ? photoUrls.length - 1 : prev - 1));
    };

    const handleNextPhoto = (e) => {
        e.preventDefault();
        setCurrentPhotoIndex((prev) => (prev === photoUrls.length - 1 ? 0 : prev + 1));
    };

    const handleWhatsAppClick = (phone) => {
        // Remove any non-numeric characters from phone number
        const cleanPhone = phone.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

    return (
        <Link to={`/hotel/${hotel.id}`} className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="relative">
                    <img
                        src={photoUrls.length > 0 ? photoUrls[currentPhotoIndex] : '/hotel-placeholder.jpg'}
                        alt={hotel.hotelName}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            console.log('Image load error:', photoUrls[currentPhotoIndex]);
                            e.target.src = '/hotel-placeholder.jpg';
                        }}
                    />
                    {photoUrls.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevPhoto}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <FiChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNextPhoto}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <FiChevronRight size={20} />
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {photoUrls.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPhotoIndex(index);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500 font-semibold">{hotel.starRating}</span>
                            <FiStar className="text-yellow-500" />
                            <span className="text-yellow-500">{t('hotels.starRating')}</span>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{hotel.hotelName}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                        <FiMapPin className="mr-1" />
                        <span className="text-sm">{hotel.hotelCity}, {hotel.district}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-gray-600">
                            <span className="text-sm">{t('hotels.startingFrom')}</span>
                            <p className="text-lg font-bold text-blue-600">{hotel.advancePayment} TL</p>
                            <span className="text-sm text-gray-500">{t('hotels.perNight')}</span>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            {t('hotels.details')}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HotelCard; 