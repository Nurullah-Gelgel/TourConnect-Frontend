import React, { useState, useEffect } from 'react';
import { hotelService } from '../../services/hotelService';

const RoomManagement = () => {
    const [hotels, setHotels] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        hotelId: '',
        name: '',
        pricePerNight: 0
    });
    const [selectedHotel, setSelectedHotel] = useState(null);

    // Define fetchRoomTypes before useEffect
    const fetchRoomTypes = async () => {
        if (selectedHotel) {
            try {
                const data = await hotelService.getRoomTypesByHotelId(selectedHotel);
                setRoomTypes(data);
            } catch (error) {
                console.error('Error fetching room types:', error);
            }
        }
    };

    useEffect(() => {
        fetchHotels();
        fetchRoomTypes();
    }, [selectedHotel]); // Use selectedHotel as a dependency

    const fetchHotels = async () => {
        try {
            const data = await hotelService.getAllHotels();
            setHotels(data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Sending room type data:', formData); // Debug log
            const response = await hotelService.createRoomType(formData);
            console.log('Room type created:', response); // Debug log
            fetchRoomTypes();
            setFormData({
                hotelId: formData.hotelId,
                name: '',
                pricePerNight: 0
            });
        } catch (error) {
            console.error('Error creating room type:', error);
            alert('Failed to create room type: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleHotelChange = async (hotelId) => {
        setSelectedHotel(hotelId);
        setFormData(prev => ({ ...prev, hotelId }));
    };

    const handleDeleteRoomType = async (roomTypeId) => {
        try {
            await hotelService.deleteRoomType(roomTypeId);
            fetchRoomTypes(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting room type:', error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Room Type Management</h2>

            {/* Add Room Type Form */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Add New Room Type</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hotel</label>
                        <select
                            value={formData.hotelId}
                            onChange={(e) => handleHotelChange(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Hotel</option>
                            {hotels.map(hotel => (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.hotelName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Room Type Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price Per Night</label>
                        <input
                            type="number"
                            value={formData.pricePerNight}
                            onChange={(e) => setFormData(prev => ({ ...prev, pricePerNight: parseFloat(e.target.value) }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add Room Type'}
                    </button>
                </form>
            </div>

            {/* Room Types List */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Room Types</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Night</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {roomTypes.map(roomType => (
                                <tr key={roomType.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {hotels.find(h => h.id === roomType.hotelId)?.hotelName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{roomType.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{roomType.pricePerNight} TL</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDeleteRoomType(roomType.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RoomManagement; 