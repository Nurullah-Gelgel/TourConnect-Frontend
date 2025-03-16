import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
    const { t } = useTranslation();

    return (
        <div id={`place-${place.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Resim */}
            <div className="relative h-48">
                <img
                    src={place.image || "/place-placeholder.jpg"}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "/place-placeholder.jpg";
                    }}
                />
            </div>

            {/* İçerik */}
            <div className="p-4">
                {/* Temel Bilgiler */}
                <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
                <p className="text-gray-600 mb-4">{place.description}</p>

                {/* Ziyaret Bilgileri */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">{t('places.openingHours')}</h3>
                    <p className="text-sm">
                        🕒 {place.visitTimes.open} - {place.visitTimes.close}
                    </p>
                    <p className="text-sm">
                        ⏱️ {t('places.visitInfo')}: {place.visitTimes.duration}
                    </p>
                </div>

                {/* Giriş Ücretleri */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">{t('places.entryFees')}</h3>
                    <p className="text-sm">{t('places.fees.adult')}: {place.entryFee.adult}</p>
                    <p className="text-sm">{t('places.fees.student')}: {place.entryFee.student}</p>
                    <p className="text-sm">{t('places.fees.museumCard')}: {place.entryFee.museum_card}</p>
                </div>

                {/* Olanaklar */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">{t('places.facilities')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {place.facilities.map((facility, index) => (
                            <span 
                                key={index}
                                className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                            >
                                {facility}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Ulaşım */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">{t('places.transportation')}</h3>
                    <p className="text-sm">🚗 {t('places.transportTypes.car')}: {place.transportation.car}</p>
                    <p className="text-sm">🚌 {t('places.transportTypes.bus')}: {place.transportation.bus}</p>
                    <p className="text-sm">🚕 {t('places.transportTypes.taxi')}: {place.transportation.taxi}</p>
                </div>

                {/* Detay Butonu */}
                <Link 
                    to={`/place/${place.id}`}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded block text-center"
                >
                    {t('places.details')}
                </Link>
            </div>
        </div>
    );
};

// Alt bileşenler
const ImageGallery = ({ place }) => {
    const { t } = useTranslation();
    
    return (
        <div className="relative h-48">
            <img
                src={place.image || "/place-placeholder.jpg"}
                alt={place.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.src = "/place-placeholder.jpg";
                }}
            />
            <div className="absolute bottom-2 right-2">
                <button className="bg-white p-1 rounded-full">
                    🖼️ {t('places.viewAllPhotos')}
                </button>
            </div>
        </div>
    );
};

const BasicInfo = ({ place }) => (
    <>
        <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
        <p className="text-gray-600 mb-4">{place.description}</p>
    </>
);

const VisitInfo = ({ visitTimes }) => {
    const { t } = useTranslation();
    
    return (
        <div className="mb-4">
            <h3 className="font-semibold mb-2">{t('places.visitInfo')}</h3>
            <p className="text-sm">
                🕒 {visitTimes.open} - {visitTimes.close}
            </p>
            <p className="text-sm">⏱️ {t('places.recommendedDuration')}: {visitTimes.duration}</p>
        </div>
    );
};

// Diğer alt bileşenler benzer şekilde oluşturulabilir...

export default PlaceCard; 