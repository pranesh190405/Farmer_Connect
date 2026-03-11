'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { AlertCircle, CheckCircle, Clock, MessageSquare, X } from 'lucide-react';
import { showToast } from '@/components/ui/Toast/Toast';

export default function AdminComplaintsPage() {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Resolve modal state
    const [resolveModal, setResolveModal] = useState(null); // complaint object or null
    const [adminResponse, setAdminResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await fetch('/api/admin/complaints', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setComplaints(data.complaints || []);
            }
        } catch (err) {
            console.error('Failed to fetch complaints', err);
            showToast('Failed to load complaints', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResolve = async (e) => {
        e.preventDefault();
        if (!adminResponse.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/admin/complaints/${resolveModal.id}/resolve`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminResponse, status: 'RESOLVED' }),
            });

            if (res.ok) {
                showToast('Complaint resolved successfully', 'success');
                setResolveModal(null);
                setAdminResponse('');
                fetchComplaints();
            } else {
                showToast('Failed to resolve complaint', 'error');
            }
        } catch (err) {
            console.error('Resolve error', err);
            showToast('An error occurred', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredComplaints = complaints.filter(c => {
        return statusFilter === 'ALL' || c.status === statusFilter;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'OPEN':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                        <AlertCircle className="w-3.5 h-3.5" /> Open
                    </span>
                );
            case 'RESOLVED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Resolved
                    </span>
                );
            case 'CLOSED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                        <Clock className="w-3.5 h-3.5" /> Closed
                    </span>
                );
            default:
                return <span className="text-xs text-gray-500">{status}</span>;
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
                    <p className="text-sm text-gray-500 mt-1">Review and resolve issues raised by users on their orders.</p>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-2 overflow-x-auto">
                    {['ALL', 'OPEN', 'RESOLVED', 'CLOSED'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${statusFilter === status
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredComplaints.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No complaints found</h3>
                        <p className="text-gray-500 mt-1">No complaints match the current filter.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredComplaints.map((complaint) => (
                            <div key={complaint.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {getStatusBadge(complaint.status)}
                                            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium bg-gray-50 px-2 py-0.5 rounded">
                                                {complaint.issueType}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Order #{complaint.orderId}
                                            </span>
                                        </div>

                                        <p className="text-gray-800 text-sm leading-relaxed">{complaint.description}</p>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                                            <span>Raised by: <strong className="text-gray-700">{complaint.raiserName}</strong> ({complaint.raiserType})</span>
                                            <span>Mobile: {complaint.mobile}</span>
                                            <span>Order: ₹{complaint.orderAmount?.toLocaleString('en-IN')} ({complaint.orderStatus})</span>
                                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        {complaint.adminResponse && (
                                            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                                                <p className="text-xs font-semibold text-green-700 mb-1">Admin Response:</p>
                                                <p className="text-sm text-green-800">{complaint.adminResponse}</p>
                                            </div>
                                        )}
                                    </div>

                                    {complaint.status === 'OPEN' && (
                                        <button
                                            onClick={() => { setResolveModal(complaint); setAdminResponse(''); }}
                                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shrink-0"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Resolve Modal */}
            {resolveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Resolve Complaint #{resolveModal.id}</h3>
                            <button onClick={() => setResolveModal(null)} className="text-gray-400 hover:text-gray-600 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-700">
                            <p className="font-medium">Issue: <span className="font-normal">{resolveModal.description}</span></p>
                            <p className="mt-1 text-xs text-gray-500">Type: {resolveModal.issueType} | Order #{resolveModal.orderId} | By {resolveModal.raiserName}</p>
                        </div>

                        <form onSubmit={handleResolve} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Response</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none min-h-[120px]"
                                    placeholder="Describe the resolution or action taken..."
                                    value={adminResponse}
                                    onChange={(e) => setAdminResponse(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setResolveModal(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !adminResponse.trim()}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Mark as Resolved'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
