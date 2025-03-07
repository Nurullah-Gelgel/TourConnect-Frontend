import React, { useState } from 'react';

const RoomManagement = () => {
    const [rooms, setRooms] = useState([
        { id: 1, number: '101', type: 'Standart', status: 'available', price: 500 },
        { id: 2, number: '102', type: 'Deluxe', status: 'occupied', price: 750 },
        // Diğer odalar...
    ]);

    const [showAddRoom, setShowAddRoom] = useState(false);
    const [newRoom, setNewRoom] = useState({
        number: '',
        type: 'Standart',
        price: ''
    });

    const handleAddRoom = (e) => {
        e.preventDefault();
        setRooms([...rooms, { ...newRoom, id: Date.now(), status: 'available' }]);
        setShowAddRoom(false);
        setNewRoom({ number: '', type: 'Standart', price: '' });
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Oda Yönetimi</h2>
                <button
                    onClick={() => setShowAddRoom(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Yeni Oda Ekle
                </button>
            </div>

            {/* Yeni Oda Ekleme Formu */}
            {showAddRoom && (
                <div className="mb-4 p-4 border rounded">
                    <form onSubmit={handleAddRoom}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Oda Numarası"
                                value={newRoom.number}
                                onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
                                className="border p-2 rounded"
                                required
                            />
                            <select
                                value={newRoom.type}
                                onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                                className="border p-2 rounded"
                            >
                                <option value="Standart">Standart</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Suite">Suite</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Fiyat"
                                value={newRoom.price}
                                onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                                className="border p-2 rounded"
                                required
                            />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowAddRoom(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Oda Listesi */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Oda No</th>
                            <th className="px-4 py-2">Tip</th>
                            <th className="px-4 py-2">Durum</th>
                            <th className="px-4 py-2">Fiyat</th>
                            <th className="px-4 py-2">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room.id} className="border-b">
                                <td className="px-4 py-2 text-center">{room.number}</td>
                                <td className="px-4 py-2 text-center">{room.type}</td>
                                <td className="px-4 py-2 text-center">
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        room.status === 'available' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {room.status === 'available' ? 'Müsait' : 'Dolu'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center">{room.price} TL</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                                        Düzenle
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        Sil
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

export default RoomManagement; 