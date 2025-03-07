import React from 'react';
import Layout from '../components/Layout';

const TourReservationPage = () => {
    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold p-4">Tur Rezervasyonu</h1>
            {/* Tour Details */}
            <div className="p-4">
                <h2 className="text-xl">Tur Adı</h2>
                <p>Açıklama burada yer alacak.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Rezervasyon Yap</button>
            </div>

        </div>
        </Layout>
    );
};

export default TourReservationPage; 