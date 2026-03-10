'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Clock, CheckCircle, Search, Calendar, ChevronRight, Truck, PackageCheck } from 'lucide-react';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';

export default function BuyerDashboard() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('placed');
    const [actionLoading, setActionLoading] = useState(null);

    // Complaints state
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [issueType, setIssueType] = useState('QUALITY');
    const [issueDescription, setIssueDescription] = useState('');
    const [isSubmittingIssue, setIsSubmittingIssue] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await ApiService.getMyOrders();
            const formattedOrders = data.map(order => ({
                id: order.id,
                items: order.items.map(i => `${i.cropName} (${i.quantity}kg)`).join(', '),
                total: `₹${order.totalAmount}`,
                totalNum: order.totalAmount,
                status: order.status,
                date: new Date(order.createdAt).toISOString().split('T')[0],
                farmer: order.farmerName || 'Farmer',
                image: order.items[0]?.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=100'
            }));
            setOrders(formattedOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error(t('common.error') || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDelivery = async (orderId) => {
        if (!window.confirm('Confirm that you have received this order?')) return;
        setActionLoading(orderId);
        try {
            await ApiService.updateOrderStatus(orderId, 'delivered');
            toast.success('Delivery confirmed! Payment completed.');
            fetchOrders();
        } catch (err) {
            toast.error(err.message || 'Failed to confirm delivery');
        } finally {
            setActionLoading(null);
        }
    };

    if (!mounted) return null;

    const stats = [
        { label: t('dashboard.buyer.stats.totalOrders'), value: orders.length, icon: ShoppingBag, bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', color: '#1d4ed8' },
        { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, icon: Truck, bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#d97706' },
        { label: t('dashboard.buyer.stats.completed'), value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle, bg: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', color: '#065f46' },
    ];

    const tabs = [
        { key: 'placed', label: 'Placed' },
        { key: 'shipped', label: 'Shipped' },
        { key: 'delivered', label: 'Delivered' },
        { key: 'cancelled', label: 'Cancelled' },
    ];

    const getStatusBadge = (status) => {
        const map = {
            placed: { bg: '#fef3c7', color: '#92400e', dot: '#d97706', label: 'Placed' },
            shipped: { bg: '#dbeafe', color: '#1e40af', dot: '#3b82f6', label: 'Shipped' },
            delivered: { bg: '#ecfdf5', color: '#065f46', dot: '#10b981', label: 'Delivered' },
            cancelled: { bg: '#fef2f2', color: '#991b1b', dot: '#ef4444', label: 'Cancelled' },
        };
        const s = map[status] || map.placed;
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{
                    width: 8, height: 8, borderRadius: '50%', background: s.dot,
                    ...(status === 'placed' || status === 'shipped' ? { animation: 'pulse 2s infinite' } : {})
                }} />
                <span style={{
                    fontSize: '0.75rem', fontWeight: 600, padding: '0.125rem 0.5rem',
                    borderRadius: '6px', background: s.bg, color: s.color
                }}>{s.label}</span>
            </div>
        );
    };

    const handleOpenIssueModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIssueType('QUALITY');
        setIssueDescription('');
        setIsIssueModalOpen(true);
    };

    const handleSubmitIssue = async (e) => {
        e.preventDefault();
        if (!issueDescription.trim()) {
            toast.error('Description is required');
            return;
        }
        setIsSubmittingIssue(true);
        try {
            await ApiService.raiseOrderIssue(selectedOrderId, { issueType, description: issueDescription });
            toast.success('Issue raised successfully');
            setIsIssueModalOpen(false);
        } catch (error) {
            toast.error('Failed to raise issue');
        } finally {
            setIsSubmittingIssue(false);
        }
    };

    return (
        <div className="min-h-screen pb-24 font-sans" style={{ background: 'linear-gradient(180deg, #fefce8 0%, #fffef5 50%, #fefce8 100%)' }}>
            <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
                {/* Welcome Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #065f46, #10b981)',
                    borderRadius: '20px', padding: '1.5rem 2rem', color: 'white',
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                    alignItems: 'center', gap: '1rem',
                    boxShadow: '0 8px 30px rgba(6,95,70,0.3)'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('dashboard.buyer.welcome')}</h1>
                        <p style={{ opacity: 0.85, fontSize: '0.875rem', marginTop: '0.25rem' }}>{t('dashboard.buyer.welcomeDesc')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Link href="/market" style={{
                            background: '#fbbf24', color: '#1c1917',
                            padding: '0.625rem 1.5rem', borderRadius: '9999px',
                            fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: '0.875rem', textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(251,191,36,0.4)', transition: 'all 0.3s'
                        }}>
                            <Search className="w-4 h-4" />
                            {t('dashboard.buyer.browseMarket')}
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} style={{
                            background: '#fffef5', borderRadius: '16px', padding: '1.25rem 1.5rem',
                            border: '1px solid #e7e5e4', display: 'flex', alignItems: 'center', gap: '1rem',
                            boxShadow: '0 4px 20px rgba(28,25,23,0.04)'
                        }}>
                            <div style={{ padding: '0.75rem', borderRadius: '14px', background: stat.bg, color: stat.color }}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p style={{ color: '#78716c', fontSize: '0.875rem', fontWeight: 500 }}>{stat.label}</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917' }}>{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Orders Section */}
                <div style={{ background: '#fffef5', borderRadius: '20px', border: '1px solid #e7e5e4', overflow: 'hidden', boxShadow: '0 4px 20px rgba(28,25,23,0.04)' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '2px solid #e7e5e4', overflowX: 'auto' }}>
                        {tabs.map((tab) => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                                style={{
                                    padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600,
                                    position: 'relative', whiteSpace: 'nowrap', border: 'none', cursor: 'pointer',
                                    background: activeTab === tab.key ? 'rgba(6,95,70,0.04)' : 'transparent',
                                    color: activeTab === tab.key ? '#065f46' : '#78716c',
                                    transition: 'all 0.3s'
                                }}>
                                {tab.label}
                                <span style={{
                                    marginLeft: '0.5rem', fontSize: '0.75rem',
                                    padding: '0.125rem 0.5rem', borderRadius: '9999px',
                                    background: activeTab === tab.key ? '#ecfdf5' : '#f5f5f4',
                                    color: activeTab === tab.key ? '#065f46' : '#78716c'
                                }}>
                                    {orders.filter(o => o.status === tab.key).length}
                                </span>
                                {activeTab === tab.key && (
                                    <div style={{
                                        position: 'absolute', bottom: '-2px', left: 0, width: '100%',
                                        height: '3px', background: 'linear-gradient(90deg, #065f46, #10b981)',
                                        borderRadius: '3px 3px 0 0'
                                    }} />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 md:p-6">
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                <div className="animate-spin" style={{
                                    width: 40, height: 40, margin: '0 auto',
                                    borderRadius: '50%', borderBottom: '3px solid #065f46',
                                    borderLeft: '3px solid transparent', borderRight: '3px solid transparent',
                                    borderTop: '3px solid transparent'
                                }} />
                                <p style={{ marginTop: '1rem', color: '#78716c', fontSize: '0.875rem' }}>{t('common.loading')}</p>
                            </div>
                        ) : orders.filter(o => o.status === activeTab).length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <ShoppingBag className="w-8 h-8" style={{ color: '#10b981' }} />
                                </div>
                                <h3 style={{ color: '#1c1917', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                                    No {activeTab} orders
                                </h3>
                                <p style={{ color: '#78716c', fontSize: '0.875rem', maxWidth: '24rem', margin: '0 auto 1.5rem' }}>
                                    {activeTab === 'placed' ? 'Browse the market to place your first order!' : `You have no ${activeTab} orders yet.`}
                                </p>
                                {activeTab === 'placed' && (
                                    <Link href="/market" style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        color: '#065f46', fontWeight: 700, background: '#ecfdf5',
                                        padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none'
                                    }}>
                                        <Search className="w-4 h-4" /> Start Shopping
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.filter(o => o.status === activeTab).map((order) => (
                                    <div key={order.id} style={{
                                        background: '#fffef5', borderRadius: '16px',
                                        border: '1px solid #e7e5e4', padding: '1rem',
                                        transition: 'all 0.3s', boxShadow: '0 2px 10px rgba(28,25,23,0.03)'
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(6,95,70,0.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e7e5e4'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(28,25,23,0.03)'; }}>
                                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                            {/* Image */}
                                            <div style={{ width: 64, height: 64, borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#f5f5f4' }}>
                                                <img src={order.image} alt={order.items} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                                                    <div>
                                                        <h3 style={{ fontWeight: 700, color: '#1c1917' }} className="truncate">{order.items}</h3>
                                                        <p style={{ fontSize: '0.875rem', color: '#78716c' }}>Order #{order.id}</p>
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.875rem', fontWeight: 700, color: '#065f46',
                                                        background: '#ecfdf5', padding: '0.25rem 0.5rem', borderRadius: '6px'
                                                    }}>{order.total}</span>
                                                </div>
                                                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs" style={{ color: '#78716c' }}>
                                                    <div className="flex items-center gap-1">
                                                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>👨‍🌾</div>
                                                        <span style={{ fontWeight: 500, color: '#44403c' }}>{order.farmer}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" /><span>{order.date}</span>
                                                    </div>
                                                    {getStatusBadge(order.status)}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0" style={{ borderTop: '1px solid #e7e5e4' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {/* Confirm Delivery for shipped orders */}
                                                    {order.status === 'shipped' && (
                                                        <button
                                                            onClick={() => handleConfirmDelivery(order.id)}
                                                            disabled={actionLoading === order.id}
                                                            style={{
                                                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                                                                fontSize: '0.875rem', fontWeight: 700, color: 'white',
                                                                padding: '0.625rem 1rem', borderRadius: '10px',
                                                                background: 'linear-gradient(135deg, #065f46, #10b981)',
                                                                border: 'none', cursor: 'pointer',
                                                                boxShadow: '0 4px 12px rgba(6,95,70,0.3)',
                                                                opacity: actionLoading === order.id ? 0.6 : 1,
                                                                transition: 'all 0.3s'
                                                            }}>
                                                            <PackageCheck style={{ width: 16, height: 16 }} />
                                                            {actionLoading === order.id ? 'Confirming...' : 'Confirm Delivery & Pay'}
                                                        </button>
                                                    )}
                                                    {/* Raise Issue */}
                                                    {(order.status === 'delivered' || order.status === 'shipped') && (
                                                        <button onClick={() => handleOpenIssueModal(order.id)}
                                                            style={{
                                                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                                                                fontSize: '0.8rem', fontWeight: 500, color: '#dc2626',
                                                                padding: '0.375rem 0.75rem', borderRadius: '8px',
                                                                border: '1px solid #fecaca', background: '#fef2f2', cursor: 'pointer',
                                                                transition: 'all 0.2s'
                                                            }}>
                                                            Raise Issue
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Raise Issue Modal */}
            {isIssueModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '28rem', padding: '1.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                        onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c1917' }}>Raise Issue</h3>
                            <button onClick={() => setIsIssueModalOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c', fontSize: '1.25rem' }}>✕</button>
                        </div>
                        <form onSubmit={handleSubmitIssue} className="space-y-4">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#44403c', marginBottom: '0.375rem' }}>Issue Type</label>
                                <select value={issueType} onChange={(e) => setIssueType(e.target.value)}
                                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #d6d3d1', borderRadius: '10px', outline: 'none', fontSize: '0.875rem' }}>
                                    <option value="QUALITY">Quality Issue</option>
                                    <option value="DELIVERY">Delivery Issue</option>
                                    <option value="QUANTITY">Quantity Issue</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#44403c', marginBottom: '0.375rem' }}>Description</label>
                                <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)}
                                    placeholder="Describe the issue..." required
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d6d3d1', borderRadius: '10px', outline: 'none', minHeight: 100, resize: 'none', fontSize: '0.875rem' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                                <button type="button" onClick={() => setIsIssueModalOpen(false)}
                                    style={{ flex: 1, padding: '0.625rem', border: '1px solid #d6d3d1', borderRadius: '10px', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#44403c' }}>
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmittingIssue || !issueDescription.trim()}
                                    style={{
                                        flex: 1, padding: '0.625rem', border: 'none', borderRadius: '10px',
                                        background: '#dc2626', color: 'white', cursor: 'pointer', fontWeight: 600,
                                        opacity: isSubmittingIssue ? 0.6 : 1
                                    }}>
                                    {isSubmittingIssue ? 'Submitting...' : 'Submit Issue'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
