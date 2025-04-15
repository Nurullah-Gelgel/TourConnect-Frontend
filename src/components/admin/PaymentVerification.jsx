import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import { FiCreditCard, FiCheck, FiX, FiDownload, FiEye, FiDollarSign } from 'react-icons/fi';
import api from '../../services/api';

const PaymentVerification = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [viewReceiptUrl, setViewReceiptUrl] = useState(null);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const data = await paymentService.getAllPayments();
            setPayments(data);
            setError(null);
        } catch (err) {
            console.error('Ödemeler yüklenirken hata:', err);
            setError('Ödemeler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyPayment = async (paymentId, status) => {
        try {
            setLoading(true);
            await paymentService.verifyPayment(paymentId, status);
            
            // Başarı mesajı göster
            alert(status ? 'Ödeme başarıyla onaylandı!' : 'Ödeme reddedildi!');
            
            // Ödeme listesini yenile
            await fetchPayments();
        } catch (error) {
            console.error('Ödeme doğrulama hatası:', error);
            alert('Ödeme doğrulanırken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleViewReceipt = async (receiptFilename) => {
        try {
            // Eğer receiptFilename zaten tam path içeriyorsa, sadece filename kısmını al
            const filename = receiptFilename.split('/').pop();
            
            // Backend endpoint'ine uygun URL oluştur
            const baseUrl = api.defaults.baseURL.replace(/\/+$/, ''); // Sondaki slash'leri temizle
            const receiptUrl = `${baseUrl}/api/files/uploads/${filename}`;
            
            
            // iframe için content-disposition ve content-type ayarlarını ekle
            const response = await fetch(receiptUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setSelectedReceipt(url);
            
        } catch (error) {
            console.error('Dekont görüntüleme hatası:', error);
            alert('Dekont görüntülenirken bir hata oluştu');
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    <p>{error}</p>
                    <button 
                        onClick={fetchPayments} 
                        className="mt-2 bg-red-200 px-4 py-2 rounded hover:bg-red-300"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                            <FiDollarSign className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Toplam Ödeme</p>
                            <p className="text-2xl font-semibold text-gray-700">{payments.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                            <FiDollarSign className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Onay Bekleyen</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {payments.filter(p => p.status === 'PENDING' && p.receipt && !p.isReceiptVerified).length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                            <FiCheck className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Onaylanmış</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {payments.filter(p => p.status === 'PAID' || p.isReceiptVerified).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Viewer Modal */}
            {selectedReceipt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Dekont Görüntüleme</h3>
                            <button 
                                onClick={() => {
                                    // URL object'ini temizle
                                    if (selectedReceipt.startsWith('blob:')) {
                                        URL.revokeObjectURL(selectedReceipt);
                                    }
                                    setSelectedReceipt(null);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="h-[70vh] border overflow-hidden">
                            <iframe 
                                src={selectedReceipt}
                                className="w-full h-full" 
                                title="Dekont"
                                sandbox="allow-same-origin"
                            />
                        </div>
                        
                        <div className="flex justify-end mt-4">
                            <a 
                                href={selectedReceipt}
                                download
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                İndir
                            </a>
                            <button
                                onClick={() => {
                                    if (selectedReceipt.startsWith('blob:')) {
                                        URL.revokeObjectURL(selectedReceipt);
                                    }
                                    setSelectedReceipt(null);
                                }}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pending Receipts Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold">Dekont Onay İşlemleri</h2>
                    <p className="text-gray-500 text-sm">Onay bekleyen banka havalesi dekontlarını inceleyip onaylayabilirsiniz.</p>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    PNR / Misafir
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tutar
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tarih
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durum
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments
                                .filter(payment => payment.receipt && !payment.isReceiptVerified)
                                .map(payment => (
                                    <tr key={payment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {payment.id}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {payment.reservation?.guestName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {payment.amount} {payment.currency}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(payment.paymentDate).toLocaleDateString('tr-TR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Onay Bekliyor
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewReceipt(payment.receipt)}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 rounded-full p-2"
                                                    title="Dekontu Görüntüle"
                                                >
                                                    <FiEye className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleVerifyPayment(payment.id, true)}
                                                    className="text-green-600 hover:text-green-900 bg-green-50 rounded-full p-2"
                                                    title="Onayla"
                                                >
                                                    <FiCheck className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleVerifyPayment(payment.id, false)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 rounded-full p-2"
                                                    title="Reddet"
                                                >
                                                    <FiX className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* All Payments Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold">Tüm Ödemeler</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    İşlem ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    PNR / Misafir
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tutar
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ödeme Türü
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durum
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tarih
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                        Henüz hiç ödeme kaydı bulunmuyor.
                                    </td>
                                </tr>
                            ) : (
                                payments.map(payment => (
                                    <tr key={payment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {payment.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {payment.reservation?.pnrCode || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {payment.reservation?.guestName || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 font-medium">
                                                {payment.amount} {payment.currency}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {payment.provider === 'BANK_TRANSFER' ? 'Banka Havalesi' : 'Kredi Kartı'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                payment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {payment.status === 'PAID' ? 'Ödendi' :
                                                payment.status === 'COMPLETED' ? 'Ödendi' :
                                                 payment.status === 'PENDING' ? 'Beklemede' :
                                                 payment.status === 'CANCELLED' ? 'İptal Edildi' :
                                                 payment.status === 'REFUNDED' ? 'İade Edildi' : 'Başarısız'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(payment.paymentDate).toLocaleDateString('tr-TR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {payment.receipt && (
                                                <button
                                                    onClick={() => handleViewReceipt(payment.receipt)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Dekontu Görüntüle"
                                                >
                                                    <FiEye className="h-5 w-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentVerification;