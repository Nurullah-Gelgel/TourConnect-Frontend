import React, { useState, useEffect } from 'react';
import { reservationService } from '../../services/reservationService';
import { hotelService } from '../../services/hotelService';
import { FiCalendar, FiClock, FiCheck, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        status: 'PENDING',
        totalAmount: '',
        reservationGuests: '',
        checkIn: '',
        checkOut: '',
        reservationCreatedAt: new Date().toISOString().split('T')[0],
        reservationUpdatedAt: new Date().toISOString().split('T')[0],
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        specialRequests: '',
        hotelId: '',
        roomType: 'SINGLE',
        roomCount: 1,
        userId: null // Eğer kullanıcı girişi varsa buraya userId gelecek
    });

    useEffect(() => {
        fetchReservations();
        fetchHotels();
    }, []);

    const fetchReservations = async () => {
        try {
            const data = await reservationService.getAllReservations();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const fetchHotels = async () => {
        try {
            const data = await hotelService.getAllHotels();
            setHotels(data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const handleEdit = (reservation) => {
        setSelectedReservation(reservation);
        setFormData({
            hotelId: reservation.hotelId,
            checkIn: reservation.checkInDate.split('T')[0],
            checkOut: reservation.checkOutDate.split('T')[0],
            guestCount: reservation.guestCount,
            status: reservation.status,
            specialRequests: reservation.specialRequests || '',
            totalPrice: reservation.totalPrice,
            guestName: reservation.guestName,
            guestEmail: reservation.guestEmail,
            guestPhone: reservation.guestPhone,
            reservationCreatedAt: reservation.reservationCreatedAt,
            reservationUpdatedAt: reservation.reservationUpdatedAt,
            roomType: reservation.roomType,
            roomCount: reservation.roomCount,
            totalAmount: reservation.totalAmount
        });
        setIsEditing(true);
    };

    const handleDelete = async (reservationId) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            try {
                await reservationService.deleteReservation(reservationId);
                setReservations(reservations.filter(res => res.id !== reservationId));
            } catch (error) {
                console.error('Error deleting reservation:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reservationData = {
                ...formData,
                checkIn: formData.checkIn,
                checkOut: formData.checkOut,
                totalAmount: parseFloat(formData.totalAmount),
                reservationGuests: parseInt(formData.reservationGuests),
                roomCount: parseInt(formData.roomCount)
            };

            if (isEditing && selectedReservation) {
                await reservationService.updateReservation(selectedReservation.id, reservationData);
                setReservations(reservations.map(res => 
                    res.id === selectedReservation.id ? { ...res, ...reservationData } : res
                ));
            } else {
                const newReservation = await reservationService.createReservation(reservationData);
                setReservations([...reservations, newReservation]);
            }
            resetForm();
        } catch (error) {
            console.error('Error saving reservation:', error);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setSelectedReservation(null);
        setFormData({
            status: 'PENDING',
            totalAmount: '',
            reservationGuests: '',
            checkIn: '',
            checkOut: '',
            reservationCreatedAt: new Date().toISOString().split('T')[0],
            reservationUpdatedAt: new Date().toISOString().split('T')[0],
            guestName: '',
            guestEmail: '',
            guestPhone: '',
            specialRequests: '',
            hotelId: '',
            roomType: 'SINGLE',
            roomCount: 1,
            userId: null
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'text-green-600';
            case 'PENDING': return 'text-yellow-600';
            case 'CANCELLED': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                            <FiCalendar className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Reservations</p>
                            <p className="text-2xl font-semibold text-gray-700">{reservations.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                            <FiCheck className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Confirmed</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {reservations.filter(r => r.status === 'CONFIRMED').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                            <FiClock className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {reservations.filter(r => r.status === 'PENDING').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-red-500 bg-opacity-10">
                            <FiX className="h-8 w-8 text-red-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Cancelled</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {reservations.filter(r => r.status === 'CANCELLED').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reservation Form */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                    {isEditing ? 'Edit Reservation' : 'Add New Reservation'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
                            <label className="block text-sm font-medium text-gray-700">Guest Name</label>
                <input
                    type="text"
                                name="guestName"
                                value={formData.guestName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Guest Email</label>
                            <input
                                type="email"
                                name="guestEmail"
                                value={formData.guestEmail}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Guest Phone</label>
                            <input
                                type="tel"
                                name="guestPhone"
                                value={formData.guestPhone}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hotel</label>
                            <select
                                name="hotelId"
                                value={formData.hotelId}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select a hotel</option>
                                {hotels.map(hotel => (
                                    <option key={hotel.id} value={hotel.id}>
                                        {hotel.name}
                                    </option>
                                ))}
                </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                            <input
                                type="date"
                                name="checkIn"
                                value={formData.checkIn}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                <input
                    type="date"
                                name="checkOut"
                                value={formData.checkOut}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Room Type</label>
                            <select
                                name="roomType"
                                value={formData.roomType}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="SINGLE">Single</option>
                                <option value="DOUBLE">Double</option>
                                <option value="SUITE">Suite</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Room Count</label>
                            <input
                                type="number"
                                name="roomCount"
                                value={formData.roomCount}
                                onChange={handleInputChange}
                                min="1"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                            <input
                                type="number"
                                name="reservationGuests"
                                value={formData.reservationGuests}
                                onChange={handleInputChange}
                                min="1"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                            <input
                                type="number"
                                name="totalAmount"
                                value={formData.totalAmount}
                                onChange={handleInputChange}
                                step="0.01"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                        <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            {isEditing ? 'Save Changes' : 'Add Reservation'}
                </button>
                    </div>
                </form>
            </div>

            {/* Reservations Table */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Reservation List</h2>
            <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reservations.map((reservation) => (
                                    <tr key={reservation.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {hotels.find(h => h.id === reservation.hotelId)?.name || 'Unknown Hotel'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(reservation.checkInDate).toLocaleDateString()} - 
                                            {new Date(reservation.checkOutDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {reservation.guestCount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`${getStatusColor(reservation.status)}`}>
                                                {reservation.status}
                                    </span>
                                </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            ${reservation.totalPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEdit(reservation)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <FiEdit className="h-5 w-5 inline" />
                                    </button>
                                            <button
                                                onClick={() => handleDelete(reservation.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FiTrash2 className="h-5 w-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationManagement; 