import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { tourService } from '../services/tourService';

const TourReservationPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        numberOfPeople: 1,
        specialRequests: ''
    });

    useEffect(() => {
        fetchTourDetails();
    }, [id]);

    const fetchTourDetails = async () => {
        try {
            setLoading(true);
            const data = await tourService.getTourById(id);
            setTour(data);
        } catch (err) {
            console.error('Tur detayları yüklenirken hata:', err);
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
        // Burada rezervasyon API çağrısı yapılacak
        console.log('Rezervasyon bilgileri:', formData);
        // Başarılı rezervasyon sonrası kullanıcıyı yönlendir
        alert('Rezervasyonunuz alınmıştır. Teşekkür ederiz!');
        navigate('/');
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                                {t('tours.reservation.title')}
                            </h1>
                            
                            {tour && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h2 className="text-xl font-semibold text-gray-800">{tour.tourName}</h2>
                                    <p className="text-gray-600 mt-2">
                                        {new Date(tour.startDate).toLocaleDateString()} - 
                                        {new Date(tour.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-blue-600 font-semibold mt-2">
                                        {t('tours.price')}: {tour.price} TL / {t('tours.perPerson')}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        {t('tours.reservation.fullName')}
                                    </label>
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
                                    <label className="block text-gray-700 mb-2">
                                        {t('tours.reservation.email')}
                                    </label>
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
                                    <label className="block text-gray-700 mb-2">
                                        {t('tours.reservation.phone')}
                                    </label>
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
                                    <label className="block text-gray-700 mb-2">
                                        {t('tours.reservation.participants')}
                                    </label>
                                    <input
                                        type="number"
                                        name="numberOfPeople"
                                        value={formData.numberOfPeople}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        {t('tours.reservation.specialRequests')}
                                    </label>
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
                                        {t('tours.reservation.total')}: {tour ? (tour.price * formData.numberOfPeople) : 0} TL
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#00A9FF] hover:bg-[#0098e5] text-white px-6 py-3 rounded-lg 
                                                 transition-colors duration-300"
                                    >
                                        {t('tours.reservation.completeReservation')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TourReservationPage; 