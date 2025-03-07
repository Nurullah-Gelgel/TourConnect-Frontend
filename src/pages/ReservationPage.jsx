import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
const ReservationPage = () => {
    const { id } = useParams(); // Get the hotel ID from the URL
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle reservation logic here (e.g., send data to API)
        alert('Rezervasyon başarıyla tamamlandı!');
    };

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">Rezervasyon - Otel Adı {id}</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block">Ad Soyad:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 p-2 w-full" required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 p-2 w-full" required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Telefon:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="border border-gray-300 p-2 w-full" required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Ödeme Yöntemi:</label>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border border-gray-300 p-2 w-full">
                            <option value="credit">Kredi Kartı</option>
                            <option value="bank">Banka Havalesi</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Rezervasyonu Tamamla</button>
                </form>
            </div>
        </div>
        </Layout>
    );
};

export default ReservationPage; 