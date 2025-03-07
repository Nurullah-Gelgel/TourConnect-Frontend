import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
    return (
        <div id={`place-${place.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Resim */}
            <div className="relative h-48">
                <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* İçerik */}
            <div className="p-4">
                {/* Temel Bilgiler */}
                <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
                <p className="text-gray-600 mb-4">{place.description}</p>

                {/* Ziyaret Bilgileri */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Ziyaret Saatleri</h3>
                    <p className="text-sm">
                        🕒 {place.visitTimes.open} - {place.visitTimes.close}
                    </p>
                    <p className="text-sm">
                        ⏱️ Tavsiye Edilen Süre: {place.visitTimes.duration}
                    </p>
                </div>

                {/* Giriş Ücretleri */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Giriş Ücretleri</h3>
                    <p className="text-sm">Tam: {place.entryFee.adult}</p>
                    <p className="text-sm">Öğrenci: {place.entryFee.student}</p>
                    <p className="text-sm">Müzekart: {place.entryFee.museum_card}</p>
                </div>

                {/* Olanaklar */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Olanaklar</h3>
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
                    <h3 className="font-semibold mb-2">Ulaşım</h3>
                    <p className="text-sm">🚗 {place.transportation.car}</p>
                    <p className="text-sm">🚌 {place.transportation.bus}</p>
                    <p className="text-sm">🚕 {place.transportation.taxi}</p>
                </div>

                {/* Detay Butonu */}
                <Link 
                    to={`/place/${place.id}`}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded block text-center"
                >
                    Detayları Görüntüle
                </Link>
            </div>
        </div>
    );
};

// Alt bileşenler
const ImageGallery = ({ place }) => (
    <div className="relative h-48">
        <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2">
            <button className="bg-white p-1 rounded-full">
                🖼️ Tüm Fotoğraflar
            </button>
        </div>
    </div>
);

const BasicInfo = ({ place }) => (
    <>
        <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
        <p className="text-gray-600 mb-4">{place.description}</p>
    </>
);

const VisitInfo = ({ visitTimes }) => (
    <div className="mb-4">
        <h3 className="font-semibold mb-2">Ziyaret Bilgileri</h3>
        <p className="text-sm">
            🕒 {visitTimes.open} - {visitTimes.close}
        </p>
        <p className="text-sm">⏱️ Tavsiye Edilen Süre: {visitTimes.duration}</p>
    </div>
);

// Diğer alt bileşenler benzer şekilde oluşturulabilir...

export default PlaceCard; 