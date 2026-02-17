'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Users, AlertCircle, CheckCircle, XCircle, LogOut, Check, X } from 'lucide-react';
import { approveUserAsync, rejectUserAsync, logout } from '@/store/slices/authSlice';
import { showToast } from '@/components/ui/Toast/Toast';
import Button from '@/components/ui/Button';

export default function AdminDashboard() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const router = useRouter();
    const { users = [], user } = useSelector((state) => state.auth) || {};
    const [activeTab, setActiveTab] = useState('pending');

    const pendingUsers = users.filter(u => u.status === 'PENDING');
    const approvedUsers = users.filter(u => u.status === 'APPROVED');
    const rejectedUsers = users.filter(u => u.status === 'REJECTED');

    const handleApprove = async (id) => {
        const result = await dispatch(approveUserAsync(id));
        if (approveUserAsync.fulfilled.match(result)) {
            showToast('User approved successfully', 'success');
        } else {
            showToast(result.payload || 'Failed to approve', 'error');
        }
    };

    const handleReject = async (id) => {
        const result = await dispatch(rejectUserAsync(id));
        if (rejectUserAsync.fulfilled.match(result)) {
            showToast('User rejected', 'info');
        } else {
            showToast(result.payload || 'Failed to reject', 'error');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/admin/login');
    };

    const renderUserList = (list) => {
        if (list.length === 0) {
            return (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                    <p>No users found in this category.</p>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="p-4 text-sm font-semibold text-gray-600">User Details</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Role</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Mobile</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((u) => (
                            <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                                <td className="p-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{u.name || 'Unknown'}</p>
                                        <p className="text-xs text-gray-500">ID: {u.id.substring(0, 8)}...</p>
                                        <p className="text-xs text-gray-400">Joined: {new Date(u.joinedAt).toLocaleDateString()}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${u.type === 'farmer' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {u.type}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 font-mono text-sm">{u.mobile}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${u.status === 'APPROVED' ? 'bg-green-50 text-green-600' :
                                        u.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                                            'bg-yellow-50 text-yellow-600'
                                        }`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {u.status === 'PENDING' && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(u.id)}
                                                    className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleReject(u.id)}
                                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    title="Reject"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                        {u.status === 'APPROVED' && (
                                            <button
                                                onClick={() => handleReject(u.id)}
                                                className="text-xs text-red-600 hover:underline"
                                            >
                                                Revoke
                                            </button>
                                        )}
                                        {u.status === 'REJECTED' && (
                                            <button
                                                onClick={() => handleApprove(u.id)}
                                                className="text-xs text-green-600 hover:underline"
                                            >
                                                Re-approve
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            <main className="max-w-7xl mx-auto p-6 space-y-8">

                {/* Welcome Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Console</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage users and platform</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600">Admin</span>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-yellow-200 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 font-medium">Pending Approvals</h3>
                            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{pendingUsers.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-blue-200 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 font-medium">Total Users</h3>
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                    </div>
                </div>

                {/* User Management */}
                <div className="space-y-4">
                    <div className="flex gap-2 border-b border-gray-200 pb-1">
                        {['pending', 'approved', 'rejected'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all relative top-0.5 ${activeTab === tab
                                    ? 'bg-white text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                <span className={`ml-2 text-xs py-0.5 px-1.5 rounded-full ${activeTab === tab ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {users.filter(u => u.status.toLowerCase() === tab).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {renderUserList(
                        activeTab === 'pending' ? pendingUsers :
                            activeTab === 'approved' ? approvedUsers :
                                rejectedUsers
                    )}
                </div>
            </main>
        </div>
    );
}
