import React, { useState } from 'react';

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            userName: 'Mehmet K.',
            rating: 4,
            comment: 'Çok güzel bir konaklama deneyimiydi.',
            date: '2024-03-10',
            status: 'pending',
            reply: ''
        },
        // Diğer yorumlar...
    ]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Yorum Yönetimi</h2>

            {/* Filtreleme */}
            <div className="mb-4 flex gap-4">
                <select className="border p-2 rounded">
                    <option value="all">Tüm Yorumlar</option>
                    <option value="pending">Yanıtlanmamış</option>
                    <option value="answered">Yanıtlanmış</option>
                </select>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Filtrele
                </button>
            </div>

            {/* Yorum Listesi */}
            <div className="space-y-4">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="font-semibold">{review.userName}</span>
                                <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                                <div className="text-yellow-400">
                                    {'⭐'.repeat(review.rating)}
                                </div>
                            </div>
                            <div>
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    review.status === 'pending' 
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {review.status === 'pending' ? 'Yanıtlanmadı' : 'Yanıtlandı'}
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">{review.comment}</p>
                        
                        {review.reply && (
                            <div className="bg-gray-50 p-3 rounded mb-4">
                                <p className="text-sm font-semibold">Yanıtınız:</p>
                                <p className="text-gray-700">{review.reply}</p>
                            </div>
                        )}

                        {!review.reply && (
                            <div>
                                <textarea
                                    placeholder="Yoruma yanıt yazın..."
                                    className="w-full border p-2 rounded mb-2"
                                    rows="3"
                                ></textarea>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Yanıtla
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewManagement; 