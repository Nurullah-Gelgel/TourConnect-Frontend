import React, { useState, useEffect } from 'react';
import { reviewService } from '../../services/reviewService';
import { FiStar, FiMessageSquare, FiThumbsUp, FiFlag, FiEdit, FiTrash2 } from 'react-icons/fi';

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        rating: '',
        comment: '',
        status: ''
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const data = await reviewService.getAllReviews();
            setReviews(data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching reviews:', err);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await reviewService.updateReview(selectedReview.id, formData);
                setReviews(reviews.map(review => 
                    review.id === selectedReview.id ? { ...review, ...formData } : review
                ));
            }
            setIsEditing(false);
            setSelectedReview(null);
            setFormData({ rating: '', comment: '', status: '' });
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const handleEdit = (review) => {
        setSelectedReview(review);
        setFormData({
            rating: review.rating,
            comment: review.comment,
            status: review.status
        });
        setIsEditing(true);
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await reviewService.deleteReview(reviewId);
                setReviews(reviews.filter(review => review.id !== reviewId));
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const calculateAverageRating = () => {
        if (!reviews.length) return 0;
        const validRatings = reviews.filter(review => review && typeof review.rating === 'number');
        if (!validRatings.length) return 0;
        return (validRatings.reduce((acc, review) => acc + review.rating, 0) / validRatings.length).toFixed(1);
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                            <FiStar className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Average Rating</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {calculateAverageRating()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                            <FiMessageSquare className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Reviews</p>
                            <p className="text-2xl font-semibold text-gray-700">{reviews.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                            <FiThumbsUp className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Positive Reviews</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {reviews.filter(review => review && review.rating >= 4).length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-red-500 bg-opacity-10">
                            <FiFlag className="h-8 w-8 text-red-500" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Flagged Reviews</p>
                            <p className="text-2xl font-semibold text-gray-700">
                                {reviews.filter(review => review && review.isFlagged).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Edit Review</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                                </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Comment</label>
                            <textarea
                                value={formData.comment}
                                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            </div>
                            <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="APPROVED">Approved</option>
                                <option value="PENDING">Pending</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                            </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setSelectedReview(null);
                                }}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                            </div>
                        )}

            {/* Reviews Table */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Review List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reviews.map((review) => (
                                    <tr key={review.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {review.user?.name || 'Anonymous'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {review.rating} <FiStar className="inline text-yellow-400" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                {review.comment}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEdit(review)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <FiEdit className="h-5 w-5 inline" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review.id)}
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

export default ReviewManagement; 