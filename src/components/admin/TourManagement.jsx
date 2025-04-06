import React, { useState, useEffect } from 'react';
import { tourService } from '../../services/tourService';
import { FiCompass, FiCalendar, FiUsers, FiDollarSign, FiEdit, FiTrash2 } from 'react-icons/fi';

const TourManagement = () => {
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
        capacity: '',
        location: '',
        imageUrl: '',
        category: ''
    });

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            const data = await tourService.getAllTours();
            setTours(data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const handleEdit = (tour) => {
        setSelectedTour(tour);
        setFormData({
            name: tour.name,
            description: tour.description,
            startDate: tour.startDate,
            endDate: tour.endDate,
            price: tour.price,
            capacity: tour.capacity,
            location: tour.location,
            imageUrl: tour.imageUrl,
            category: tour.category
        });
        setIsEditing(true);
    };

    const handleDelete = async (tourId) => {
        if (window.confirm('Are you sure you want to delete this tour?')) {
            try {
                await tourService.deleteTour(tourId);
                setTours(tours.filter(tour => tour.id !== tourId));
            } catch (error) {
                console.error('Error deleting tour:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && selectedTour) {
                await tourService.updateTour(selectedTour.id, formData);
                setTours(tours.map(tour => 
                    tour.id === selectedTour.id ? { ...tour, ...formData } : tour
                ));
            } else {
                const newTour = await tourService.createTour(formData);
                setTours([...tours, newTour]);
            }
            resetForm();
        } catch (error) {
            console.error('Error saving tour:', error);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setSelectedTour(null);
        setFormData({
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            price: '',
            capacity: '',
            location: '',
            imageUrl: '',
            category: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                            <FiCompass className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Active Tours</p>
                            <p className="text-2xl font-semibold text-gray-700">{tours.length}</p>
                        </div>
                    </div>
                </div>
                {/* Add other stat cards */}
            </div>

            {/* Tour Form */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                    {isEditing ? 'Edit Tour' : 'Add New Tour'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tour Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
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
                            {isEditing ? 'Save Changes' : 'Add Tour'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Tours Table */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Tour List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tours.map((tour) => (
                                    <tr key={tour.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{tour.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(tour.startDate).toLocaleDateString()} - 
                                            {new Date(tour.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">${tour.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{tour.capacity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEdit(tour)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <FiEdit className="h-5 w-5 inline" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tour.id)}
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

export default TourManagement; 