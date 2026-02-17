'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Plus, Package, Clock, MoreVertical, Edit, Trash } from 'lucide-react';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';

export default function FarmerDashboard() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');

    useEffect(() => {
        setMounted(true);
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const data = await ApiService.getFarmerListings();
            setListings(data);
        } catch (error) {
            console.error('Failed to fetch listings:', error);
            toast.error(t('common.error') || 'Failed to load listings');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm(t('common.confirmDelete') || 'Are you sure you want to delete this listing?')) {
            const success = await ApiService.deleteListing(id);
            if (success) {
                toast.success(t('common.deleteSuccess') || 'Listing deleted successfully');
                fetchListings(); // Refresh
            } else {
                toast.error(t('common.error') || 'Failed to delete');
            }
        }
    };

    if (!mounted) return null;

    const activeCount = listings.filter(l => l.status === 'active').length;

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            <main className="max-w-7xl mx-auto p-6 space-y-8">

                {/* Welcome Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.welcomeFarmer')}</h1>
                        <p className="text-gray-500 text-sm mt-1">{t('dashboard.manageCrops')}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/farmer/listing/batch"
                            className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-full font-medium flex items-center gap-2 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                            <Package className="w-4 h-4" />
                            Batch Mode
                        </Link>
                        <Link
                            href="/farmer/listing/new"
                            className="bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 text-sm hover:bg-green-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            {t('dashboard.newListing')}
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-xl bg-green-100 text-green-600">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">{t('dashboard.activeListings')}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{activeCount}</h3>
                    </div>
                </div>

                {/* Tabs */}
                <div>
                    <div className="flex gap-8 border-b border-gray-200">
                        {['active', 'sold', 'expired'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    pb-3 text-base font-medium capitalize transition-all relative
                                    ${activeTab === tab
                                        ? 'text-green-600'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }
                                `}
                            >
                                {t(`dashboard.status.${tab}`) || tab}
                                <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${activeTab === tab ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {listings.filter(l => l.status === tab).length}
                                </span>
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">{t('common.loading')}</p>
                    </div>
                ) : listings.filter(l => l.status === activeTab).length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                            <Package className="w-10 h-10 opacity-50" />
                        </div>
                        <h3 className="text-gray-900 font-bold text-lg mb-2">{t('dashboard.noListings')}</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                            {t('dashboard.startSellingDescription')}
                        </p>
                        <Link
                            href="/farmer/listing/new"
                            className="text-green-600 font-semibold hover:text-green-700 hover:underline"
                        >
                            + {t('dashboard.createFirstListing')}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.filter(l => l.status === activeTab).map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.crop}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Package className="w-12 h-12 text-green-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                                        {item.quantity}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 text-lg truncate pr-2">{item.crop}</h3>
                                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-2xl font-bold text-green-700">{item.price}</span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {item.date}
                                        </div>
                                        <div className="ml-auto flex gap-2">
                                            <Link
                                                href={`/farmer/listing/edit/${item.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title={t('common.edit')}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title={t('common.delete')}
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
