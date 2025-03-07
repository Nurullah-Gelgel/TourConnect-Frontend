import React, { useState } from 'react';

const PasswordUpdate = () => {
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Şifre güncelleme işlemi
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Şifre Değiştir</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Mevcut Şifre</label>
                    <input
                        type="password"
                        value={passwords.current}
                        onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Yeni Şifre</label>
                    <input
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                    <input
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Şifreyi Güncelle
                </button>
            </form>
        </div>
    );
};

export default PasswordUpdate; 