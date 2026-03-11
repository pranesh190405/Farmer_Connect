'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Search, ShoppingBag, MapPin, Truck, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import { showToast } from '@/components/ui/Toast/Toast';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Future admin API for all orders: /api/admin/orders
                // For now, we simulate fetching all orders
                const response = await fetch('/api/orders/my'); // This is user-specific, but placeholder for now
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.orders || []);
                }
            } catch (err) {
                console.error("Failed to fetch orders", err);
                showToast("Failed to load orders data", "error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.id?.toString().includes(searchQuery) ||
            o.total_amount?.toString().includes(searchQuery);
        const matchesStatus = statusFilter === 'ALL' || o.status?.toUpperCase() === statusFilter.toUpperCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusConfig = (status) => {
        const s = (status || '').toUpperCase();
        switch (s) {
            case 'CONFIRMED': return { icon: CheckCircle, color: 'text-green-700', bg: 'bg-green-100', border: 'border-green-200' };
            case 'SHIPPED': return { icon: Truck, color: 'text-blue-700', bg: 'bg-blue-100', border: 'border-blue-200' };
            case 'DELIVERED': return { icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-200' };
            case 'CANCELLED': return { icon: XCircle, color: 'text-red-700', bg: 'bg-red-100', border: 'border-red-200' };
            default: return { icon: Clock, color: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-200' }; // PLACED
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Track and manage all platform orders and deliveries.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                        {['ALL', 'PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${statusFilter === status
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
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
                            placeholder="Search Order ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-sm"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                        <p className="text-gray-500 mt-1">No orders match your current filters.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Order ID</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Amount</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm">Customer Info</th>
                                        <th className="py-4 px-6 font-semibold text-gray-600 text-sm text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredOrders.map((order) => {
                                        const statusConfig = getStatusConfig(order.status);
                                        const StatusIcon = statusConfig.icon;

                                        return (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                                                            <FileText className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">#{order.id}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{new Date(order.created_at).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <p className="font-semibold text-gray-900">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</p>
                                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{order.payment_method}</p>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-start gap-2 max-w-xs">
                                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                                        <p className="text-sm text-gray-600 line-clamp-2">{order.delivery_address}</p>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <div className="flex justify-end">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
                                                            <StatusIcon className="w-3.5 h-3.5" />
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
