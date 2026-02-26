'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Check, X, Search, Filter } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { approveUser, rejectUser } from '@/store/slices/authSlice';
import { showToast } from '@/components/ui/Toast/Toast';

export default function AdminUsersPage() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();

    // Fallback to empty array if undefined
    const { users = [] } = useSelector((state) => state.auth) || {};

    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');

    // Load users (mock logic initially, will plug into real API later)
    useEffect(() => {
        // Here we would typically dispatch a fetchAllUsers action
        // For now, authSlice handles the mock initial state well enough for the UI
    }, [dispatch]);

    const handleApprove = (id) => {
        if (window.confirm('Are you sure you want to approve this user?')) {
            dispatch(approveUser(id));
            showToast(t('admin.userApproved') || 'User approved successfully', 'success');
        }
    };

    const handleReject = (userId) => {
        const reason = window.prompt("Please provide a reason for rejection:");
        if (reason) {
            // Future API integration for reject with notes
            dispatch(rejectUser(userId));
            showToast(t('admin.userRejected') || 'User rejected', 'info');
        }
    };

    const getFilteredUsers = (status) => {
        return users.filter(u => {
            const matchesStatus = u.status === status;
            const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.mobile?.includes(searchQuery) ||
                u.type?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    };

    const pendingUsers = getFilteredUsers('PENDING');
    const approvedUsers = getFilteredUsers('APPROVED');
    const rejectedUsers = getFilteredUsers('REJECTED');

    const renderUserList = (list) => {
        if (list.length === 0) {
            return (
                <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="text-4xl mb-3">👥</div>
                    <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                    <p className="text-gray-500 mt-1">Try changing your search query or tab.</p>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">User Details</th>
                                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Role</th>
                                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Contact</th>
                                <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Verification Date</th>
                                <th className="py-4 px-6 font-semibold text-gray-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {list.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm shrink-0">
                                                {(u.name?.[0] || 'U').toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{u.name || 'Unknown User'}</p>
                                                <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {u.id.substring(0, 8)}</p>
                                                {u.businessName && <p className="text-xs text-indigo-600 mt-0.5">{u.businessName}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${u.type === 'farmer' ? 'bg-green-100 text-green-800' :
                                                u.type === 'buyer' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {u.type}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-600">
                                        <div className="text-sm font-medium">{u.mobile}</div>
                                        {u.email && <div className="text-xs text-gray-500 mt-1">{u.email}</div>}
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm text-gray-800">
                                            {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-end gap-2">
                                            {u.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(u.id)}
                                                        className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 border border-green-200 hover:border-green-600"
                                                    >
                                                        <Check className="w-3.5 h-3.5" /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(u.id)}
                                                        className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 border border-red-200 hover:border-red-600"
                                                    >
                                                        <X className="w-3.5 h-3.5" /> Reject
                                                    </button>
                                                </>
                                            )}
                                            {u.status === 'APPROVED' && (
                                                <button
                                                    onClick={() => handleReject(u.id)}
                                                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                >
                                                    Revoke
                                                </button>
                                            )}
                                            {u.status === 'REJECTED' && (
                                                <button
                                                    onClick={() => handleApprove(u.id)}
                                                    className="px-3 py-1.5 text-green-600 hover:bg-green-50 text-xs font-medium rounded-lg transition-colors border border-transparent hover:border-green-200"
                                                >
                                                    Re-Approve
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Review, approve, and manage Farmers and Buyers.</p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                        {['pending', 'approved', 'rejected'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex-1 sm:flex-none capitalize ${activeTab === tab
                                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200/60'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                                <span className={`ml-2 text-xs py-0.5 px-2 rounded-full hidden sm:inline-block ${activeTab === tab ? 'bg-gray-100 text-gray-900' : 'bg-gray-200/50 text-gray-500'
                                    }`}>
                                    {tab === 'pending' ? pendingUsers.length : tab === 'approved' ? approvedUsers.length : rejectedUsers.length}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Find user by name or mobile..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm"
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div>
                    {renderUserList(
                        activeTab === 'pending' ? pendingUsers :
                            activeTab === 'approved' ? approvedUsers :
                                rejectedUsers
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
