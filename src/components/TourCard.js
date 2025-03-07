// src/components/TourCard.js
import React from 'react';

const TourCard = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/path/to/tour-image.jpg" alt="Tour" className="w-full h-32 object-cover rounded-t-lg" />
            <h3 className="text-lg font-semibold mt-2">Tur Adı</h3>
            <p className="text-gray-600">Açıklama burada yer alacak.</p>
            <p className="text-blue-500 font-bold">Fiyat: 200₺</p>
        </div>
    );
};

export default TourCard;