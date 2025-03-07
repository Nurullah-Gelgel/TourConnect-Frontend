import React from 'react';

const Statistics = () => {
    // Örnek veriler
    const stats = {
        monthlyRevenue: 75000,
        occupancyRate: 85,
        totalReservations: 120,
        averageRating: 4.5
    };

    const monthlyData = [
        { month: 'Ocak', revenue: 65000, occupancy: 75 },
        { month: 'Şubat', revenue: 70000, occupancy: 80 },
        { month: 'Mart', revenue: 75000, occupancy: 85 },
        // Diğer aylar...
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Raporlar & İstatistikler</h2>

            {/* Özet Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Aylık Gelir</h3>
                    <p className="text-2xl font-bold text-green-600">{stats.monthlyRevenue} TL</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Doluluk Oranı</h3>
                    <p className="text-2xl font-bold text-blue-600">%{stats.occupancyRate}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Toplam Rezervasyon</h3>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalReservations}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Ortalama Puan</h3>
                    <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                </div>
            </div>

            {/* Aylık Rapor Tablosu */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Aylık Rapor</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Ay</th>
                                <th className="px-4 py-2">Gelir</th>
                                <th className="px-4 py-2">Doluluk Oranı</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((data, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{data.month}</td>
                                    <td className="px-4 py-2">{data.revenue} TL</td>
                                    <td className="px-4 py-2">%{data.occupancy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Statistics; 