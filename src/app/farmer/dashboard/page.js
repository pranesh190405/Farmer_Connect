'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Package, MapPin, Clock, MoreVertical, Edit, Trash } from 'lucide-react';

export default function FarmerDashboard() {
    const [activeTab, setActiveTab] = useState('active');

    // Mock Data
    const listings = [
        {
            id: 1,
            crop: 'Potato (Kufri Jyoti)',
            quantity: '500 kg',
            price: '₹12/kg',
            date: '2 Feb 2026',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82a6b696?w=200&h=200&fit=crop'
        },
        {
            id: 2,
            crop: 'Onion (Red)',
            quantity: '100 kg',
            price: '₹25/kg',
            date: '28 Jan 2026',
            status: 'sold',
            image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&h=200&fit=crop'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
                    <Link
                        href="/farmer/listing/new"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm hover:bg-green-700 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Listing
                    </Link>
                </div>
            </header>

            {/* Tabs */}
            <div className="bg-white px-4 border-b flex gap-6 overflow-x-auto hide-scrollbar">
                {['active', 'sold', 'expired'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            py-3 px-1 border-b-2 font-medium capitalize whitespace-nowrap transition-colors
                            ${activeTab === tab
                                ? 'border-green-600 text-green-700'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        {tab} ({listings.filter(l => l.status === tab).length})
                    </button>
                ))}
            </div>

            {/* Content */}
            <main className="p-4 space-y-4">
                {listings.filter(l => l.status === activeTab).length === 0 ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Package className="w-8 h-8" />
                        </div>
                        <h3 className="text-gray-900 font-medium mb-1">No listings found</h3>
                        <p className="text-gray-500 text-sm">
                            You haven't posted any {activeTab} listings yet.
                        </p>
                    </div>
                ) : (
                    listings.filter(l => l.status === activeTab).map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border p-3 flex gap-4">
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.crop}
                                className="w-24 h-24 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                            />

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-900 truncate">{item.crop}</h3>
                                    <button className="p-1 -mr-2 text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>

                                <p className="text-green-700 font-semibold mb-2">{item.price}</p>

                                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <Package className="w-3 h-3" />
                                        {item.quantity}
                                    </div>
                                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <Clock className="w-3 h-3" />
                                        {item.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}
