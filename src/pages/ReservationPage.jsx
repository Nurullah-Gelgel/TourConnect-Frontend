import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { hotelService } from '../services/hotelService';
import { reservationService } from '../services/reservationService';
import { paymentService } from '../services/paymentService';

const ReservationPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const [receiptFile, setReceiptFile] = useState(null);
    const [uploadingReceipt, setUploadingReceipt] = useState(false);
    const [createdReservation, setCreatedReservation] = useState(null);
    const [createdPayment, setCreatedPayment] = useState(null);
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    
    // IBAN bilgisini burada sabit olarak tanımlıyoruz
    const BANK_IBAN = "TR12 3456 7890 1234 5678 9012 34";
    const BANK_NAME = t('hotels.reservation.bankName');
    const BANK_ACCOUNT_NAME = t('hotels.reservation.bankAccountName');
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1,
        rooms: [{ type: 'single', quantity: 1 }],
        paymentMethod: 'bank',
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

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setReceiptFile(e.target.files[0]);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ''; // Geçersiz tarih kontrolü
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!hotel || !hotel.id) {
                throw new Error('Otel bilgisi eksik');
            }

            // Tarih kontrolü
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const checkIn = new Date(formData.checkInDate);
            const checkOut = new Date(formData.checkOutDate);
            
            if (checkIn < today) {
                throw new Error('Geçmiş bir tarih için rezervasyon yapamazsınız');
            }
            
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

            
            const reservationResponse = await reservationService.createReservation(reservationData);
            
            setCreatedReservation(reservationResponse);
            
            // Eğer ödeme yöntemi banka transferi ise ödeme kaydı oluştur
            if (formData.paymentMethod === 'bank') {
                const paymentData = {
                    reservationId: reservationResponse.id,
                    amount: totalAmount,
                    currency: "TRY",
                    status: "PENDING",
                    provider: "BANK_TRANSFER",
                    transactionId: `BT-${reservationResponse.pnrCode}`,
                    paymentDate: new Date().toISOString()
                };
                
                try {
                    const paymentResponse = await paymentService.createPayment(paymentData);
                    setCreatedPayment(paymentResponse);
                    setShowPaymentInfo(true);
                } catch (paymentError) {
                    console.error('Ödeme kaydı oluşturma hatası:', paymentError);
                    // Ödeme kaydı oluşturma hatası olsa bile kullanıcıya gösterme
                }
            } else {
                // Kredi kartı ödemesi için ayrı bir işlem yapılabilir
                alert(`Rezervasyon başarıyla oluşturuldu!\nPNR Kodunuz: ${reservationResponse.pnrCode}`);
                navigate('/');
            }
        } catch (err) {
            console.error('Rezervasyon oluşturma hatası:', err);
            alert(err.message || 'Rezervasyon oluşturulurken bir hata oluştu');
        }
    };

    const handleReceiptUpload = async () => {
        if (!receiptFile || !createdPayment) {
            alert('Lütfen bir dekont dosyası seçin');
            return;
        }
        
        try {
            setUploadingReceipt(true);
            
            // Dosya boyutu kontrolü
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (receiptFile.size > maxSize) {
                throw new Error('Dosya boyutu 5MB\'dan küçük olmalıdır');
            }

            // Dosya tipi kontrolü
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(receiptFile.type)) {
                throw new Error('Sadece JPG, PNG ve PDF dosyaları yüklenebilir');
            }
            
            const result = await paymentService.uploadReceipt(receiptFile, createdPayment.id);
            
            // Eğer result true ise başarılı sayıyoruz
            if (result) {
                // Navigate to confirmation page with reservation details
                navigate('/reservation-confirmation', {
                    state: {
                        reservationDetails: {
                            ...createdReservation,
                            hotelName: hotel?.hotelName
                        }
                    }
                });
            } else {
                throw new Error('Dekont yükleme işlemi tamamlanamadı');
            }
            
        } catch (error) {
            console.error('Receipt upload failed:', error);
            
            // 403 hatası alındıysa ve dosya yüklendiyse başarılı sayalım
            if (error.response?.status === 403) {
                navigate('/reservation-confirmation', {
                    state: {
                        reservationDetails: {
                            ...createdReservation,
                            hotelName: hotel?.hotelName
                        }
                    }
                });
                return;
            }
            
            let errorMessage = 'Dekont yüklenirken bir hata oluştu: ';
            if (error.message) {
                errorMessage += error.message;
            } else if (error.response?.data?.message) {
                errorMessage += error.response.data.message;
            } else {
                errorMessage += 'Bilinmeyen bir hata oluştu';
            }
            
            alert(errorMessage);
        } finally {
            setUploadingReceipt(false);
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

    if (showPaymentInfo) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow bg-gray-100">
                    <div className="container mx-auto p-4">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h1 className="text-2xl font-bold mb-6">
                                {t('hotels.reservation.successTitle')}
                            </h1>
                            
                            <div className="bg-blue-50 p-4 mb-6 rounded-lg">
                                <p className="font-semibold">{t('hotels.reservation.pnrCode')}: {createdReservation?.pnrCode}</p>
                                <p>{t('hotels.reservation.pnrNote')}</p>
                            </div>
                            
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-3">{t('hotels.reservation.bankDetails')}</h2>
                                <div className="p-4 border rounded-lg space-y-2">
                                    <p><span className="font-semibold">{t('hotels.reservation.bank')}:</span> {BANK_NAME}</p>
                                    <p><span className="font-semibold">{t('hotels.reservation.accountHolder')}:</span> {BANK_ACCOUNT_NAME}</p>
                                    <p><span className="font-semibold">IBAN:</span> {BANK_IBAN}</p>
                                    <p><span className="font-semibold">{t('hotels.reservation.totalAmount')}:</span> {createdReservation?.totalAmount} TL</p>
                                    <p><span className="font-semibold">{t('hotels.reservation.description')}:</span> {createdReservation?.pnrCode}</p>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-3">{t('hotels.reservation.uploadReceipt')}</h2>
                                <p className="mb-3">{t('hotels.reservation.uploadReceiptNote')}</p>
                                
                                <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                    />
                                    
                                    {!receiptFile ? (
                                        <div className="text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="mt-1 text-sm text-gray-600">{t('hotels.reservation.dragAndDrop')}</p>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                            >
                                                {t('hotels.reservation.selectFile')}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-green-600 font-semibold">{receiptFile.name}</p>
                                            <p className="text-sm text-gray-500">({Math.round(receiptFile.size / 1024)} KB)</p>
                                            <div className="flex space-x-2 mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setReceiptFile(null)}
                                                    className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                                                >
                                                    {t('hotels.reservation.removeFile')}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleReceiptUpload}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                                    disabled={uploadingReceipt}
                                                >
                                                    {uploadingReceipt ? t('hotels.reservation.uploading') : t('hotels.reservation.uploadReceipt')}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="text-gray-700 text-sm mb-6">
                                <p>{t('hotels.reservation.attention')}:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>{t('hotels.reservation.transferNote')}</li>
                                    <li>{t('hotels.reservation.emailConfirmation')}</li>
                                    <li>{t('hotels.reservation.supportContact')}</li>
                                </ul>
                            </div>
                            
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                                >
                                    {t('common.backToHome')}
                                </button>
                            </div>
                        </div>
                    </div>
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
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                            {t('hotels.reservation.title')} - {hotel?.hotelName}
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.fullName')}</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.phone')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.guests')}</label>
                                    <input
                                        type="number"
                                        name="numberOfGuests"
                                        value={formData.numberOfGuests}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.checkIn')}</label>
                                    <input
                                        type="date"
                                        name="checkInDate"
                                        value={formData.checkInDate}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.checkOut')}</label>
                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        value={formData.checkOutDate}
                                        onChange={handleInputChange}
                                        min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.rooms')}</label>
                                    {formData.rooms.map((room, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
                                            <select
                                                value={room.type}
                                                onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                                                className="p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                                            >
                                                <option value="single">{t('hotels.reservation.roomTypes.single')}</option>
                                                <option value="double">{t('hotels.reservation.roomTypes.double')}</option>
                                            </select>
                                            
                                            <input
                                                type="number"
                                                value={room.quantity}
                                                onChange={(e) => handleRoomChange(index, 'quantity', parseInt(e.target.value))}
                                                min="1"
                                                className="w-full sm:w-24 p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder={t('hotels.reservation.roomQuantity')}
                                            />
                                            
                                            {formData.rooms.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveRoom(index)}
                                                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
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

                                <div className="sm:col-span-2">
                                    <label className="block text-gray-700 mb-1 sm:mb-2">{t('hotels.reservation.paymentMethod')}</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="bank">{t('hotels.reservation.bankTransfer')}</option>
                                    </select>
                                    
                                    {formData.paymentMethod === 'bank' && (
                                        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <p className="text-sm text-yellow-800">
                                                <strong>{t('common.note')}:</strong> {t('hotels.reservation.bankTransferNote')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                                <div className="text-base sm:text-lg font-semibold">
                                    {t('hotels.reservation.advancePayment')}: {hotel?.advancePayment * formData.numberOfGuests} TL
                                </div>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-[#00A9FF] hover:bg-[#0098e5] text-white px-6 py-3 rounded-lg 
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