import React from 'react';

const ReservationHistory = () => {
    const reservations = [
        {
            id: 1,
            type: 'hotel',
            name: 'Elite World Van',
            date: '2024-03-15',
            status: 'completed',
            price: '750 TL'
        },
        // Diğer rezervasyonlar...
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Rezervasyon Geçmişi</h2>
            <div className="space-y-4">
                {reservations.map(reservation => (
                    <div key={reservation.id} className="border p-4 rounded">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold">{reservation.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {reservation.type === 'hotel' ? 'Otel' : 'Tur'}
                                </p>
                                <p className="text-sm">Tarih: {reservation.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{reservation.price}</p>
                                <span className={`text-sm ${
                                    reservation.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                                }`}>
                                    {reservation.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationHistory; 