import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReservationConfirmationPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { reservationDetails } = location.state || {};

    if (!reservationDetails) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('hotels.confirmation.noReservation')}</h1>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                        >
                            {t('common.backToHome')}
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-gray-50">
                <div className="container mx-auto p-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="mb-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{t('hotels.confirmation.successTitle')}</h1>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                                {t('hotels.confirmation.receiptUploaded')}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4">{t('hotels.confirmation.reservationDetails')}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.pnrCode')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{reservationDetails.pnrCode}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.hotel')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{reservationDetails.hotelName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.guestName')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{reservationDetails.guestName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.email')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{reservationDetails.guestEmail}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.checkIn')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{new Date(reservationDetails.checkIn).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.checkOut')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{new Date(reservationDetails.checkOut).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.guests')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{reservationDetails.reservationGuests} {t('hotels.confirmation.person')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('hotels.confirmation.totalAmount')}</p>
                                    <p className="text-base sm:text-lg font-semibold">{reservationDetails.totalAmount} TL</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">{t('hotels.confirmation.importantInfo')}</h3>
                            <ul className="list-disc list-inside text-blue-700 space-y-2 text-sm sm:text-base">
                                <li>{t('hotels.confirmation.checkPnr')}</li>
                                <li>{t('hotels.confirmation.checkInRequirements')}</li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm sm:text-base"
                            >
                                {t('common.backToHome')}
                            </button>
                            <button
                                onClick={() => navigate('/reservations/search')}
                                className="w-full sm:w-auto bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base"
                            >
                                {t('hotels.confirmation.checkReservation')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReservationConfirmationPage; 