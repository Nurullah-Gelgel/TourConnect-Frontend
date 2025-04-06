import React, { useState, useEffect } from 'react';
import { touristPlaceService } from '../../services/touristPlaceService';

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
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold">
                    {selectedPlace ? 'Edit Tourist Place' : 'Create New Tourist Place'}
                </h2>

                <div className="grid grid-cols-2 gap-4">
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

                    <div className="col-span-2">
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Best Seasons (comma-separated)</label>
                        <input
                            type="text"
                            name="bestSeasons"
                            value={formData.bestSeasons}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Add other form fields similarly */}
                </div>

                <div className="flex justify-end space-x-3">
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
                        {selectedPlace ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Fee (Adult)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {places.map(place => (
                            <tr key={place.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{place.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{place.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{place.entryFeeAdult}</td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                        onClick={() => handleEdit(place)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(place.id)}
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
    );
};

export default TouristPlaceManagement; 