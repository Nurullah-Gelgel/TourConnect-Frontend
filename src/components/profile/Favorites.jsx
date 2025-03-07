import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const favorites = [
        {
            id: 1,
            type: 'hotel',
            name: 'Elite World Van',
            image: '/path/to/hotel.jpg',
            price: '750 TL'
        },
        // Diğer favoriler...
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Favoriler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map(item => (
                    <div key={item.id} className="border p-4 rounded">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="font-semibold mt-2">{item.name}</h3>
                        <p className="text-blue-500">{item.price}</p>
                        <div className="mt-2 flex justify-between">
                            <Link
                                to={`/${item.type}/${item.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                Detayları Gör
                            </Link>
                            <button className="text-red-500">
                                Favorilerden Çıkar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites; 