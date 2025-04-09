import React, { useState, useEffect } from 'react';
import { touristPlaceService } from '../../services/touristPlaceService';
import { FiMapPin, FiClock, FiUsers, FiDollarSign, FiEdit, FiTrash2 } from 'react-icons/fi';

const TouristPlaceManagement = () => {
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        image: '',
        bestSeasons: [],
        facilities: [],
        visitOpenTime: '',
        visitCloseTime: '',
        visitDays: [],
        entryFeeAdult: 0,
        entryFeeStudent: 0,
        entryFeeMuseum: 0,
        transportationCars: []
    });

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const data = await touristPlaceService.getAllPlaces();
            setPlaces(data);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['bestSeasons', 'facilities', 'visitDays', 'transportationCars'].includes(name)) {
            setFormData(prev => ({
                ...prev,
                [name]: value.split(',').map(item => item.trim())
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedPlace) {
                await touristPlaceService.updatePlace(selectedPlace.id, formData);
            } else {
                await touristPlaceService.createPlace(formData);
            }
            fetchPlaces();
            resetForm();
        } catch (error) {
            console.error('Error saving place:', error);
        }
    };

    const handleEdit = (place) => {
        setSelectedPlace(place);
        setFormData({
            ...place,
            bestSeasons: place.bestSeasons.join(', '),
            facilities: place.facilities.join(', '),
            visitDays: place.visitDays.join(', '),
            transportationCars: place.transportationCars.join(', ')
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this place?')) {
            try {
                await touristPlaceService.deletePlace(id);
                fetchPlaces();
            } catch (error) {
                console.error('Error deleting place:', error);
            }
        }
    };

    const resetForm = () => {
        setSelectedPlace(null);
        setFormData({
            name: '',
            description: '',
            location: '',
            image: '',
            bestSeasons: [],
            facilities: [],
            visitOpenTime: '',
            visitCloseTime: '',
            visitDays: [],
            entryFeeAdult: 0,
            entryFeeStudent: 0,
            entryFeeMuseum: 0,
            transportationCars: []
        });
    };

    return (
        <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                        <FiMapPin className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-500">Total Places</p>
                        <p className="text-2xl font-semibold text-gray-700">{places.length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                        <FiClock className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-500">Open Places</p>
                        <p className="text-2xl font-semibold text-gray-700">
                            {places.filter(place => place.visitDays.includes(new Date().toLocaleDateString('en-US', { weekday: 'long' }))).length}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                        <FiUsers className="h-8 w-8 text-purple-500" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-500">With Facilities</p>
                        <p className="text-2xl font-semibold text-gray-700">
                            {places.filter(place => place.facilities.length > 0).length}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                        <FiDollarSign className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-500">Avg. Entry Fee</p>
                        <p className="text-2xl font-semibold text-gray-700">
                            ${places.reduce((acc, place) => acc + place.entryFeeAdult, 0) / (places.length || 1)}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
                {selectedPlace ? 'Edit Tourist Place' : 'Add New Tourist Place'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Visit Open Time</label>
                        <input
                            type="time"
                            name="visitOpenTime"
                            value={formData.visitOpenTime}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Visit Close Time</label>
                        <input
                            type="time"
                            name="visitCloseTime"
                            value={formData.visitCloseTime}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Best Seasons (comma-separated)</label>
                        <input
                            type="text"
                            name="bestSeasons"
                            value={formData.bestSeasons}
                            onChange={handleInputChange}
                            placeholder="Spring, Summer, etc."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
                        <input
                            type="text"
                            name="facilities"
                            value={formData.facilities}
                            onChange={handleInputChange}
                            placeholder="WC, Cafe, Parking, etc."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Visit Days (comma-separated)</label>
                        <input
                            type="text"
                            name="visitDays"
                            value={formData.visitDays}
                            onChange={handleInputChange}
                            placeholder="Monday, Tuesday, etc."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adult Entry Fee</label>
                        <input
                            type="number"
                            name="entryFeeAdult"
                            value={formData.entryFeeAdult}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Student Entry Fee</label>
                        <input
                            type="number"
                            name="entryFeeStudent"
                            value={formData.entryFeeStudent}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Museum Card Fee</label>
                        <input
                            type="number"
                            name="entryFeeMuseum"
                            value={formData.entryFeeMuseum}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Transportation (comma-separated)</label>
                        <input
                            type="text"
                            name="transportationCars"
                            value={formData.transportationCars}
                            onChange={handleInputChange}
                            placeholder="Bus, Taxi, etc."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {selectedPlace ? 'Update Place' : 'Create Place'}
                    </button>
                </div>
            </form>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Tourist Places List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Hours</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adult Fee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {places.map(place => (
                                <tr key={place.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{place.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{place.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {place.visitOpenTime} - {place.visitCloseTime}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">${place.entryFeeAdult}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <button
                                            onClick={() => handleEdit(place)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <FiEdit className="h-5 w-5 inline" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(place.id)}
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

export default TouristPlaceManagement;