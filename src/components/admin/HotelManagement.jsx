import React, { useState, useEffect } from 'react';
import { hotelService } from '../../services/hotelService';
import { FiHome, FiLayout, FiStar, FiMap, FiDollarSign, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const HotelManagement = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newPhotoUrl, setNewPhotoUrl] = useState('');
    const [formData, setFormData] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelCity: '',
        district: '',
        starRating: 1,
        phone: '',
        photoUrls: [],
        apiUrl: '',
        apiKey: '',
        advancePayment: 0.0
    });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const data = await hotelService.getAllHotels();
            setHotels(data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['advancePayment', 'starRating'].includes(name) ? Number(value) : value
        }));
    };

    const handlePhotoUrlsChange = (e) => {
        const urls = e.target.value.split('\n').filter(url => url.trim() !== '');
        setFormData(prev => ({
            ...prev,
            photoUrls: urls
        }));
    };

    const handleEdit = (hotel) => {
        setSelectedHotel(hotel);
        setFormData({
            hotelName: hotel.hotelName,
            hotelAddress: hotel.hotelAddress,
            hotelCity: hotel.hotelCity,
            district: hotel.district,
            starRating: hotel.starRating,
            phone: hotel.phone,
            photoUrls: hotel.photoUrls || [],
            apiUrl: hotel.apiUrl,
            apiKey: hotel.apiKey,
            advancePayment: hotel.advancePayment
        });
        setIsEditing(true);
    };

    const handleDelete = async (hotelId) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                await hotelService.deleteHotel(hotelId);
                setHotels(hotels.filter(hotel => hotel.id !== hotelId));
            } catch (error) {
                console.error('Error deleting hotel:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && selectedHotel) {
                await hotelService.updateHotel(selectedHotel.id, formData);
                setHotels(hotels.map(hotel => 
                    hotel.id === selectedHotel.id ? { ...hotel, ...formData } : hotel
                ));
            } else {
                const newHotel = await hotelService.createHotel(formData);
                setHotels([...hotels, newHotel]);
            }
            resetForm();
        } catch (error) {
            console.error('Error saving hotel:', error);
        }
    };

    const handleAddPhotoUrl = () => {
        if (newPhotoUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                photoUrls: [...prev.photoUrls, newPhotoUrl.trim()]
            }));
            setNewPhotoUrl('');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setSelectedHotel(null);
        setNewPhotoUrl('');
        setFormData({
            hotelName: '',
            hotelAddress: '',
            hotelCity: '',
            district: '',
            starRating: 1,
            phone: '',
            photoUrls: [],
            apiUrl: '',
            apiKey: '',
            advancePayment: 0.0
        });
    };
    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                            <FiHome className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Hotels</p>
                            <p className="text-2xl font-semibold text-gray-700">{hotels.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                            <FiStar className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">5-Star Hotels</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {hotels.filter(hotel => hotel.starRating === 5).length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                            <FiMap className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Cities</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {new Set(hotels.map(hotel => hotel.city)).size}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                            <FiLayout className="h-8 w-8 text-purple-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Rooms Available</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {hotels.reduce((acc, hotel) => acc + (hotel.roomCount || 0), 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotel Form */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                    {isEditing ? 'Edit Hotel' : 'Add New Hotel'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                            <input
                                type="text"
                                name="hotelName"
                                value={formData.hotelName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="hotelCity"
                                value={formData.hotelCity}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">District</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Star Rating</label>
                            <select
                                name="starRating"
                                value={formData.starRating}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <option key={rating} value={rating}>{rating} Stars</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Advance Payment</label>
                            <input
                                type="number"
                                name="advancePayment"
                                value={formData.advancePayment}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                name="hotelAddress"
                                value={formData.hotelAddress}
                                onChange={handleInputChange}
                                rows="2"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Photo URLs</label>
                            <div className="flex space-x-2 mb-2">
                                <input
                                    type="url"
                                    value={newPhotoUrl}
                                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                                    placeholder="Enter photo URL"
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddPhotoUrl}
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    <FiPlus className="mr-2" /> Add Photo
                                </button>
                            </div>
                            <div className="mt-2 grid grid-cols-4 gap-2">
                                {formData.photoUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <img 
                                            src={url} 
                                            alt={`Hotel photo ${index + 1}`} 
                                            className="h-20 w-20 object-cover rounded"
                                            onError={(e) => e.target.src = 'placeholder-image-url'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    photoUrls: prev.photoUrls.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">API URL</label>
                            <input
                                type="url"
                                name="apiUrl"
                                value={formData.apiUrl}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">API Key</label>
                            <input
                                type="text"
                                name="apiKey"
                                value={formData.apiKey}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
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
                            {isEditing ? 'Save Changes' : 'Add Hotel'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Hotels Table */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Hotel List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photos</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {hotels.map((hotel) => (
                                    <tr key={hotel.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{hotel.hotelName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{`${hotel.hotelCity}, ${hotel.district}`}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {hotel.starRating} <FiStar className="inline text-yellow-400" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{hotel.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-1">
                                                {hotel.photoUrls?.slice(0, 3).map((url, index) => (
                                                    <img 
                                                        key={index}
                                                        src={url} 
                                                        alt={`${hotel.hotelName} photo ${index + 1}`}
                                                        className="h-10 w-10 object-cover rounded"
                                                        onError={(e) => e.target.src = 'placeholder-image-url'}
                                                    />
                                                ))}
                                                {hotel.photoUrls?.length > 3 && (
                                                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-600">
                                                        +{hotel.photoUrls.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEdit(hotel)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <FiEdit className="h-5 w-5 inline" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(hotel.id)}
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

export default HotelManagement; 