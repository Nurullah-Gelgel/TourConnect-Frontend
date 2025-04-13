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
        rooms: [{ type: 'single', quantity: 1 }],
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
            console.log('Fetched hotel details:', data);
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

    const handleAddRoom = () => {
        setFormData(prev => ({
            ...prev,
            rooms: [...prev.rooms, { type: 'single', quantity: 1 }]
        }));
    };

    const handleRemoveRoom = (index) => {
        setFormData(prev => ({
            ...prev,
            rooms: prev.rooms.filter((_, i) => i !== index)
        }));
    };

    const handleRoomChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            rooms: prev.rooms.map((room, i) => {
                if (i === index) {
                    return { ...room, [field]: value };
                }
                return room;
            })
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!hotel || !hotel.id) {
                throw new Error('Otel bilgisi eksik');
            }

            // Tarih kontrolü
            const checkIn = new Date(formData.checkInDate);
            const checkOut = new Date(formData.checkOutDate);
            const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

            if (numberOfNights <= 0) {
                throw new Error('Çıkış tarihi giriş tarihinden sonra olmalıdır');
            }

            // Toplam tutarı advance payment'dan hesapla
            const totalAmount = hotel.advancePayment * formData.numberOfGuests;

            const reservationData = {
                hotelId: hotel.id,
                status: "PENDING",
                totalAmount: totalAmount,
                reservationGuests: parseInt(formData.numberOfGuests),
                checkIn: formData.checkInDate,
                checkOut: formData.checkOutDate,
                reservationCreatedAt: new Date().toISOString().split('T')[0],
                reservationUpdatedAt: new Date().toISOString().split('T')[0],
                guestName: formData.fullName,
                guestEmail: formData.email,
                guestPhone: formData.phone,
                specialRequests: formData.specialRequests || "",
                roomType: formData.rooms[0].type.toUpperCase(),
                roomCount: parseInt(formData.rooms[0].quantity),
                advancePayment: parseFloat(hotel?.advancePayment || 0)
            };

            console.log('Rezervasyon verisi gönderiliyor:', reservationData);
            
            const response = await reservationService.createReservation(reservationData);
            console.log('Rezervasyon oluşturuldu:', response);
            
            // Show success message with PNR code
            alert(`Rezervasyon başarıyla oluşturuldu!\nPNR Kodunuz: ${response.pnrCode}`);
            navigate('/');
        } catch (err) {
            console.error('Rezervasyon oluşturma hatası:', err);
            alert(err.message || 'Rezervasyon oluşturulurken bir hata oluştu');
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
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.guests')}</label>
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
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.checkIn')}</label>
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
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.checkOut')}</label>
                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        value={formData.checkOutDate}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">{t('hotels.reservation.rooms')}</label>
                                    {formData.rooms.map((room, index) => (
                                        <div key={index} className="flex gap-4 mb-4">
                                            <select
                                                value={room.type}
                                                onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                                                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="single">{t('hotels.reservation.roomTypes.single')}</option>
                                                <option value="double">{t('hotels.reservation.roomTypes.double')}</option>
                                                
                                            </select>
                                            
                                            <input
                                                type="number"
                                                value={room.quantity}
                                                onChange={(e) => handleRoomChange(index, 'quantity', parseInt(e.target.value))}
                                                min="1"
                                                className="w-24 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Adet"
                                            />
                                            
                                            {formData.rooms.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveRoom(index)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                                >
                                                    {t('hotels.reservation.removeRoom')}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    
                                    <button
                                        type="button"
                                        onClick={handleAddRoom}
                                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        {t('hotels.reservation.addRoom')}
                                    </button>
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
                                    {t('hotels.reservation.advancePayment')}: {hotel?.advancePayment * formData.numberOfGuests} TL
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