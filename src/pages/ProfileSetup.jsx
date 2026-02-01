import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ProfileSetup = () => {
    const { user } = useAuth(); // Note: user in context might be stale if we just updated it, but fine for initial load
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        role: 'farmer', // default
        cropInterests: '',
        buyingPreferences: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                location: user.location || '',
                role: user.role || 'farmer',
                cropInterests: user.cropInterests?.join(', ') || '',
                buyingPreferences: user.buyingPreferences?.join(', ') || '',
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/users/profile', {
                name: formData.name,
                location: formData.location,
                // We typically don't allow changing role after registration in this flow, but good for MVP
                // However, role is usually set during registration.
                // For this MVP, let's assume we are just updating profile fields
                cropInterests: formData.cropInterests.split(',').map(s => s.trim()).filter(Boolean),
                buyingPreferences: formData.buyingPreferences.split(',').map(s => s.trim()).filter(Boolean),
            });
            // Force reload context or just navigate
            window.location.href = '/dashboard'; // Hard reload to update context for now
        } catch (error) {
            console.error("Update failed", error);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Complete your Profile
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                name="location"
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="City, State"
                            />
                        </div>

                        {user?.role === 'farmer' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Interests (comma separated)</label>
                                <textarea
                                    name="cropInterests"
                                    value={formData.cropInterests}
                                    onChange={(e) => setFormData({ ...formData, cropInterests: e.target.value })}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                    placeholder="Wheat, Rice, Corn"
                                />
                            </div>
                        )}

                        {user?.role === 'buyer' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Buying Preferences (comma separated)</label>
                                <textarea
                                    name="buyingPreferences"
                                    value={formData.buyingPreferences}
                                    onChange={(e) => setFormData({ ...formData, buyingPreferences: e.target.value })}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                    placeholder="Vegetables, Fruits"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;
