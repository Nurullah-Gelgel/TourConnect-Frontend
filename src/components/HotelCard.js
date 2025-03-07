import React from 'react';

const HotelCard = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/path/to/hotel-image.jpg" alt="Hotel" className="w-full h-32 object-cover rounded-t-lg" />
            <h3 className="text-lg font-semibold mt-2">Otel Adı</h3>
            <p className="text-gray-600">Açıklama burada yer alacak.</p>
            <p className="text-blue-500 font-bold">Fiyat: 100₺/gece</p>
        </div>
    );
};

export default HotelCard;
