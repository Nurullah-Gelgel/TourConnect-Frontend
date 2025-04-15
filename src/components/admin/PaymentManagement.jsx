import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import { FiCreditCard, FiDollarSign, FiCheck, FiX, FiClock, FiUpload, FiEye, FiTrash2 } from 'react-icons/fi';

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'COMPLETED':
            return 'bg-green-100 text-green-800';
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800';
        case 'RECEIPT_UPLOADED':
            return 'bg-blue-100 text-blue-800';
        case 'REJECTED':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getStatusText = (status) => {
    switch (status) {
        case 'COMPLETED':
            return 'Tamamlandı';
        case 'PENDING':
            return 'Beklemede';
        case 'RECEIPT_UPLOADED':
            return 'Dekont Yüklendi';
        case 'REJECTED':
            return 'Reddedildi';
        default:
            return status;
    }
};

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        currency: 'TRY',
        provider: 'BANK_TRANSFER',
        status: 'PENDING',
        reservationId: '',
        transactionId: '',
        paymentDate: new Date().toISOString().split('T')[0]
    });
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            // Burada tüm ödemeleri getiren bir API endpoint'i olmalı
            const data = await paymentService.getAllPayments();
            setPayments(data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const handlePaymentStatus = async (transactionId) => {
        try {
            const status = await paymentService.getPaymentStatus(transactionId);
            // Ödeme durumunu güncelle
            fetchPayments();
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await paymentService.createPayment(formData);
            alert('Ödeme başarıyla eklendi');
            setShowAddModal(false);
            setFormData({
                amount: '',
                currency: 'TRY',
                provider: 'BANK_TRANSFER',
                status: 'PENDING',
                reservationId: '',
                transactionId: '',
                paymentDate: new Date().toISOString().split('T')[0]
            });
            await fetchPayments();
        } catch (error) {
            alert('Ödeme eklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                            <FiDollarSign className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                ${payments.reduce((acc, payment) => acc + payment.amount, 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                            <FiCreditCard className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Transactions</p>
                            <p className="text-2xl font-semibold text-gray-700">{payments.length}</p>
                        </div>
                    </div>
                </div>
                {/* ... other stats ... */}
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payments && payments.map(payment => (
                            <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{payment.transactionId}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">${payment.amount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        payment.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handlePaymentStatus(payment.transactionId)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Check Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManagement; 