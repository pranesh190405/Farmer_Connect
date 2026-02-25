'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Users,
    ShoppingCart,
    Leaf,
    AlertCircle,
    TrendingUp,
    IndianRupee
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { ApiService } from '@/services/apiService';
import { showToast } from '@/components/ui/Toast/Toast';

export default function AdminDashboard() {
    const { t } = useTranslation('common');
    const [stats, setStats] = useState({
        totalUsers: 0,
        pendingUsers: 0,
        activeListings: 0,
        totalOrders: 0,
        revenue: 0,
        openComplaints: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // For now we will mock the stats that don't exist in backend yet
                // Once we build the real APIs we can replace this
                const response = await fetch('/api/admin/stats');
                if (response.ok) {
                    const data = await response.json();
                    setStats(prev => ({
                        ...prev,
                        ...data.stats
                    }));
                }
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
                showToast("Failed to load dashboard statistics", "error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Users',
            value: (stats.farmers || 0) + (stats.buyers || 0),
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            borderColor: 'border-blue-100'
        },
        {
            title: 'Pending Users',
            value: stats.pendingApprovals || 0,
            icon: AlertCircle,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
            borderColor: 'border-yellow-100'
        },
        {
            title: 'Active Listings',
            value: stats.activeListings || 0,
            icon: Leaf,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            borderColor: 'border-green-100'
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders || 0,
            icon: ShoppingCart,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            borderColor: 'border-purple-100'
        },
        {
            title: 'Total Revenue',
            value: `₹${stats.totalRevenue?.toLocaleString('en-IN') || 0}`,
            icon: IndianRupee,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            borderColor: 'border-emerald-100'
        }
    ];

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Platform statistics and activity summary.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className={`bg-white p-6 rounded-2xl border ${stat.borderColor} shadow-sm flex flex-col`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                                    <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* We will add charts or recent activity feeds here later */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-gray-400">
                        <TrendingUp className="w-12 h-12 mb-3 text-gray-300" />
                        <p>Revenue Chart Coming Soon</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-gray-400">
                        <Users className="w-12 h-12 mb-3 text-gray-300" />
                        <p>User Growth Chart Coming Soon</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
