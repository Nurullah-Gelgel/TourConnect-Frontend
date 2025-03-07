import React, { useState } from 'react';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([
        {
            id: 1,
            roomNumber: '101',
            guestName: 'Ahmet Yılmaz',
            checkIn: '2024-03-15',
            checkOut: '2024-03-17',
            status: 'confirmed',
            price: 1000
        },
        // Diğer rezervasyonlar...
    ]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Rezervasyon Yönetimi</h2>
            
            {/* Filtreleme */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Misafir Ara"
                    className="border p-2 rounded"
                />
                <select className="border p-2 rounded">
                    <option value="all">Tüm Durumlar</option>
                    <option value="confirmed">Onaylandı</option>
                    <option value="pending">Beklemede</option>
                    <option value="cancelled">İptal Edildi</option>
                </select>
                <input
                    type="date"
                    className="border p-2 rounded"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Filtrele
                </button>
            </div>

            {/* Rezervasyon Listesi */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Rezervasyon No</th>
                            <th className="px-4 py-2">Oda</th>
                            <th className="px-4 py-2">Misafir</th>
                            <th className="px-4 py-2">Giriş</th>
                            <th className="px-4 py-2">Çıkış</th>
                            <th className="px-4 py-2">Durum</th>
                            <th className="px-4 py-2">Tutar</th>
                            <th className="px-4 py-2">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id} className="border-b">
                                <td className="px-4 py-2 text-center">#{reservation.id}</td>
                                <td className="px-4 py-2 text-center">{reservation.roomNumber}</td>
                                <td className="px-4 py-2">{reservation.guestName}</td>
                                <td className="px-4 py-2 text-center">{reservation.checkIn}</td>
                                <td className="px-4 py-2 text-center">{reservation.checkOut}</td>
                                <td className="px-4 py-2 text-center">
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        reservation.status === 'confirmed' 
                                            ? 'bg-green-100 text-green-800'
                                            : reservation.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {reservation.status === 'confirmed' ? 'Onaylandı' 
                                            : reservation.status === 'pending' ? 'Beklemede' 
                                            : 'İptal Edildi'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center">{reservation.price} TL</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                                        Detaylar
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        İptal Et
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationManagement; 