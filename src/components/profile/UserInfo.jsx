import React, { useState } from 'react';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0123',
        profileImage: '/path/to/profile.jpg'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kullanıcı bilgilerini güncelleme işlemi
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Profil Bilgileri</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Profil Fotoğrafı</label>
                    <div className="flex items-center">
                        <img
                            src={userInfo.profileImage}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="ml-4"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Ad Soyad</label>
                    <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">E-posta</label>
                    <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Telefon</label>
                    <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Bilgileri Güncelle
                </button>
            </form>
        </div>
    );
};

export default UserInfo; 