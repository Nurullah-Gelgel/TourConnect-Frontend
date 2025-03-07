import React, { useState } from 'react';

const PaymentMethods = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            number: '**** **** **** 1234',
            name: 'John Doe',
            expiry: '12/24'
        }
    ]);

    const [showAddCard, setShowAddCard] = useState(false);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Ödeme Yöntemleri</h2>
            
            {/* Kayıtlı Kartlar */}
            <div className="space-y-4 mb-4">
                {cards.map(card => (
                    <div key={card.id} className="border p-4 rounded flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{card.number}</p>
                            <p className="text-sm text-gray-600">{card.name}</p>
                            <p className="text-sm text-gray-600">Son Kullanma: {card.expiry}</p>
                        </div>
                        <button
                            onClick={() => {
                                setCards(cards.filter(c => c.id !== card.id));
                            }}
                            className="text-red-500"
                        >
                            Kartı Sil
                        </button>
                    </div>
                ))}
            </div>

            {/* Yeni Kart Ekleme */}
            <button
                onClick={() => setShowAddCard(!showAddCard)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Yeni Kart Ekle
            </button>

            {showAddCard && (
                <form className="mt-4 space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Kart Numarası</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="**** **** **** ****"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Kart Üzerindeki İsim</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">Son Kullanma Tarihi</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">CVV</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="***"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Kartı Kaydet
                    </button>
                </form>
            )}
        </div>
    );
};

export default PaymentMethods; 