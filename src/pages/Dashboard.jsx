import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DocumentUpload from '../components/common/DocumentUpload';
import ProductList from '../components/farmer/ProductList';
import { useState } from 'react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // Local state to force refresh or just reload page
    const [refreshKey, setRefreshKey] = useState(0);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleUploadSuccess = () => {
        // ideally reload user context, but for now reload page
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-500">Welcome, {user?.role === 'farmer' ? 'Farmer' : 'Buyer'} {user?.mobileNumber}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Verification Status</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${user?.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' :
                                    user?.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                    {user?.verificationStatus?.toUpperCase() || 'UNVERIFIED'}
                                </span>
                            </div>

                            {!user?.isVerified && user?.verificationStatus !== 'verified' && (
                                <div className="mt-4">
                                    <DocumentUpload onUploadSuccess={handleUploadSuccess} />
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Profile Details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Name</span>
                                <span className="font-medium">{user?.name || 'Not Set'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Location</span>
                                <span className="font-medium">{user?.location || 'Not Set'}</span>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => navigate('/profile-setup')}
                                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {user?.role === 'farmer' && (
                    <div className="mt-8">
                        <ProductList />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
