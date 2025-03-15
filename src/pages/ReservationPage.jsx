import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { hotelService } from '../services/hotelService';
import { reservationService } from '../services/reservationService';

const ReservationPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1,
        paymentMethod: 'credit',
        specialRequests: ''
    });

    useEffect(() => {
        fetchHotelDetails();
    }, [id]);

    const fetchHotelDetails = async () => {
        try {
            setLoading(true);
            const data = await hotelService.getHotelById(id);
            setHotel(data);
            setError(null);
        } catch (err) {
            console.error('Otel detayları yüklenirken hata:', err);
            setError('Otel detayları yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reservationData = {
                hotelId: id,
                ...formData
            };
            
            await reservationService.createReservation(reservationData);
            alert('Rezervasyon başarıyla oluşturuldu!');
            navigate('/reservations'); // veya başka bir sayfaya yönlendirme
        } catch (err) {
            console.error('Rezervasyon oluşturulurken hata:', err);
            alert('Rezervasyon oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-gray-100">
                <div className="container mx-auto p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">
                            {t('hotels.reservation.title')} - {hotel?.hotelName}
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.fullName')}</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.phone')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.numberOfGuests')}</label>
                                    <input
                                        type="number"
                                        name="numberOfGuests"
                                        value={formData.numberOfGuests}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.checkInDate')}</label>
                                    <input
                                        type="date"
                                        name="checkInDate"
                                        value={formData.checkInDate}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.checkOutDate')}</label>
                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        value={formData.checkOutDate}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.paymentMethod')}</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="credit">{t('hotels.reservation.creditCard')}</option>
                                        <option value="bank">{t('hotels.reservation.bankTransfer')}</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">{t('hotels.reservation.specialRequests')}</label>
                                <textarea
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="text-lg font-semibold">
                                    {t('hotels.reservation.total')}: {hotel?.price * formData.numberOfGuests} TL
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#00A9FF] hover:bg-[#0098e5] text-white px-6 py-3 rounded-lg 
                                             transition-colors duration-300"
                                >
                                    {t('hotels.reservation.completeReservation')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReservationPage; 