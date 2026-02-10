'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Clock, CheckCircle, Search, Calendar, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/Toast/Toast';

export default function BuyerDashboard() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');

    useEffect(() => {
        setMounted(true);
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Mock data for UI demonstration
            setTimeout(() => {
                setOrders([
                    { id: 'ORD-7829', items: 'Fresh Tomatoes (50kg)', total: '₹2,500', status: 'active', date: '2025-02-09', farmer: 'Ramesh Kumar', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=100' },
                    { id: 'ORD-7830', items: 'Potatoes (100kg)', total: '₹4,000', status: 'active', date: '2025-02-08', farmer: 'Suresh Patil', image: 'https://images.unsplash.com/photo-1518977676651-71f646571817?auto=format&fit=crop&q=80&w=100' },
                    { id: 'ORD-7815', items: 'Red Onions (20kg)', total: '₹800', status: 'completed', date: '2025-02-01', farmer: 'Amit Singh', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=100' },
                    { id: 'ORD-7750', items: 'Basmati Rice (25kg)', total: '₹3,200', status: 'completed', date: '2025-01-25', farmer: 'Vikram Singh', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=100' },
                ]);
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error(t('common.error') || 'Failed to load orders');
            setLoading(false);
        }
    };

    if (!mounted) return null;

    const stats = [
        { label: t('dashboard.buyer.stats.totalOrders'), value: orders.length, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
        { label: t('dashboard.buyer.stats.activeOrders'), value: orders.filter(o => o.status === 'active').length, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
        { label: t('dashboard.buyer.stats.completed'), value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    ];

    const getTabLabel = (tab) => {
        switch (tab) {
            case 'active': return t('dashboard.buyer.tabs.active');
            case 'completed': return t('dashboard.buyer.tabs.completed');
            case 'cancelled': return t('dashboard.buyer.tabs.cancelled');
            default: return tab;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.buyer.welcome')}</h1>
                        <p className="text-gray-500 text-sm mt-1">{t('dashboard.buyer.welcomeDesc')}</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Link
                            href="/market"
                            className="bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 text-sm hover:bg-green-700 active:scale-95 transition-all shadow-md hover:shadow-lg w-full md:w-auto"
                        >
                            <Search className="w-4 h-4" />
                            {t('dashboard.buyer.browseMarket')}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar">
                        {['active', 'completed', 'cancelled'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    px-6 py-4 text-sm font-medium capitalize transition-all relative whitespace-nowrap
                                    ${activeTab === tab
                                        ? 'text-green-600 bg-green-50/50'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }
                                `}
                            >
                                {getTabLabel(tab)}
                                <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${activeTab === tab ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {orders.filter(o => o.status === tab).length}
                                </span>
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Orders List */}
                    <div className="p-4 md:p-6">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
                                <p className="mt-4 text-gray-500 text-sm">{t('common.loading')}</p>
                            </div>
                        ) : orders.filter(o => o.status === activeTab).length === 0 ? (
                            <div className="text-center py-16 px-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-gray-900 font-bold text-lg mb-1">{t('dashboard.buyer.empty.title', { status: activeTab })}</h3>
                                <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                                    {t('dashboard.buyer.empty.desc', { status: activeTab })}
                                </p>
                                {activeTab === 'active' && (
                                    <Link
                                        href="/market"
                                        className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 bg-green-50 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <Search className="w-4 h-4" />
                                        {t('dashboard.buyer.empty.startShopping')}
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.filter(o => o.status === activeTab).map((order) => (
                                    <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-green-200 transition-all shadow-sm hover:shadow-md group">
                                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                            {/* Image */}
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                <img src={order.image} alt={order.items} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 truncate">{order.items}</h3>
                                                        <p className="text-sm text-gray-500">{t('dashboard.buyer.orderId')}{order.id}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 md:mt-0">
                                                        <span className="text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md">
                                                            {order.total}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">👨‍🌾</div>
                                                        <span className="font-medium text-gray-700">{order.farmer}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{order.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 ml-auto md:ml-0">
                                                        <span className={`w-2 h-2 rounded-full ${order.status === 'active' ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></span>
                                                        <span className="capitalize">{order.status === 'active' ? t('dashboard.buyer.inProgress') : order.status}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                                                <button className="w-full md:w-auto flex items-center justify-center gap-1 text-sm font-medium text-gray-600 hover:text-green-600 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                    {t('dashboard.buyer.trackOrder')} <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
