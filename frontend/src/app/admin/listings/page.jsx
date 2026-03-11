'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Search, MapPin, Package, Clock, Filter, AlertCircle } from 'lucide-react';
import { showToast } from '@/components/ui/Toast/Toast';

export default function AdminListingsPage() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Fetch listings from backend
                const response = await fetch('/api/listings?limit=100'); // Fetch a good chunk for admin view
                if (response.ok) {
                    const data = await response.json();
                    setListings(data.listings);
                }
            } catch (err) {
                console.error("Failed to fetch listings", err);
                showToast("Failed to load listings data", "error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchListings();
    }, []);

    const filteredListings = listings.filter(l => {
        const matchesSearch = l.crop_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.farmer_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || l.status?.toUpperCase() === statusFilter.toUpperCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const s = (status || '').toUpperCase();
        if (s === 'ACTIVE') return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">Active</span>;
        if (s === 'SOLD') return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">Sold Out</span>;
        if (s === 'CLOSED') return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">Closed</span>;
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{s}</span>;
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Listings Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Monitor all agricultural listings on the platform.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                        {['ALL', 'ACTIVE', 'SOLD', 'CLOSED'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${statusFilter === status
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {status.charAt(0) + status.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search crops or farmers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredListings.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
                        <p className="text-gray-500 mt-1">No listings match your current filters.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Crop Info</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Farmer</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Price / Quantity</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Location</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredListings.map((listing) => (
                                        <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4 text-green-800 font-medium">
                                                    {listing.images && listing.images[0] ? (
                                                        <img src={listing.images[0]} alt={listing.crop_name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center border border-green-100">
                                                            <Leaf className="w-6 h-6 text-green-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-gray-900 font-semibold">{listing.crop_name}</p>
                                                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{listing.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <p className="text-sm font-medium text-gray-900">{listing.farmer_name || 'Unknown'}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">ID: {listing.farmer_id}</p>
                                            </td>
                                            <td className="p-6">
                                                <p className="text-sm font-semibold text-gray-900">₹{listing.expected_price} / {listing.unit}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Stock: {listing.quantity} {listing.unit}</p>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                                                    <span className="truncate max-w-[150px]">{listing.region || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                {getStatusBadge(listing.status)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
