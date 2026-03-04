'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Clock, CheckCircle, Search, Calendar, ChevronRight } from 'lucide-react';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';

export default function BuyerDashboard() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');

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
                status: order.status === 'placed' ? 'active' : order.status,
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

    if (!mounted) return null;

    const stats = [
        { label: t('dashboard.buyer.stats.totalOrders'), value: orders.length, icon: ShoppingBag, bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', color: '#1d4ed8' },
        { label: t('dashboard.buyer.stats.activeOrders'), value: orders.filter(o => o.status === 'active').length, icon: Clock, bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#d97706' },
        { label: t('dashboard.buyer.stats.completed'), value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, bg: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', color: '#065f46' },
    ];

    const getTabLabel = (tab) => {
        switch (tab) {
            case 'active': return t('dashboard.buyer.tabs.active');
            case 'completed': return t('dashboard.buyer.tabs.completed');
            case 'cancelled': return t('dashboard.buyer.tabs.cancelled');
            default: return tab;
        }
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
            toast.error(t('common.error') || 'Description is required');
            return;
        }

        setIsSubmittingIssue(true);
        try {
            await ApiService.raiseOrderIssue(selectedOrderId, {
                issueType,
                description: issueDescription
            });
            toast.success(t('dashboard.buyer.issueSuccess'));
            setIsIssueModalOpen(false);
        } catch (error) {
            console.error('Failed to raise issue:', error);
            toast.error(t('dashboard.buyer.issueFailed'));
        } finally {
            setIsSubmittingIssue(false);
        }
    };

    return (
        <div className="min-h-screen pb-24 font-sans" style={{ background: 'linear-gradient(180deg, #fefce8 0%, #fffef5 50%, #fefce8 100%)' }}>
            <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
                {/* Welcome + Actions — Gradient Banner */}
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
                    <div style={{ display: 'flex', gap: '0.75rem', width: 'auto' }}>
                        <Link
                            href="/market"
                            style={{
                                background: '#fbbf24', color: '#1c1917',
                                padding: '0.625rem 1.5rem', borderRadius: '9999px',
                                fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontSize: '0.875rem', textDecoration: 'none',
                                boxShadow: '0 4px 15px rgba(251,191,36,0.4)',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Search className="w-4 h-4" />
                            {t('dashboard.buyer.browseMarket')}
                        </Link>
                    </div>
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} style={{
                            background: '#fffef5', borderRadius: '16px', padding: '1.25rem 1.5rem',
                            border: '1px solid #e7e5e4', display: 'flex', alignItems: 'center', gap: '1rem',
                            boxShadow: '0 4px 20px rgba(28,25,23,0.04)',
                            transition: 'box-shadow 0.3s'
                        }}>
                            <div style={{
                                padding: '0.75rem', borderRadius: '14px',
                                background: stat.bg, color: stat.color
                            }}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p style={{ color: '#78716c', fontSize: '0.875rem', fontWeight: 500 }}>{stat.label}</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917' }}>{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div style={{ background: '#fffef5', borderRadius: '20px', border: '1px solid #e7e5e4', overflow: 'hidden', boxShadow: '0 4px 20px rgba(28,25,23,0.04)' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '2px solid #e7e5e4', overflowX: 'auto' }}>
                        {['active', 'completed', 'cancelled'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600,
                                    textTransform: 'capitalize', position: 'relative', whiteSpace: 'nowrap',
                                    background: activeTab === tab ? 'rgba(6,95,70,0.04)' : 'transparent',
                                    color: activeTab === tab ? '#065f46' : '#78716c',
                                    border: 'none', cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {getTabLabel(tab)}
                                <span style={{
                                    marginLeft: '0.5rem', fontSize: '0.75rem',
                                    padding: '0.125rem 0.5rem', borderRadius: '9999px',
                                    background: activeTab === tab ? '#ecfdf5' : '#f5f5f4',
                                    color: activeTab === tab ? '#065f46' : '#78716c'
                                }}>
                                    {orders.filter(o => o.status === tab).length}
                                </span>
                                {activeTab === tab && (
                                    <div style={{
                                        position: 'absolute', bottom: '-2px', left: 0, width: '100%',
                                        height: '3px', background: 'linear-gradient(90deg, #065f46, #10b981)',
                                        borderRadius: '3px 3px 0 0'
                                    }} />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Orders List */}
                    <div className="p-4 md:p-6">
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                <div className="animate-spin rounded-full h-10 w-10 mx-auto" style={{ borderBottom: '3px solid #065f46', borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: '3px solid transparent' }}></div>
                                <p style={{ marginTop: '1rem', color: '#78716c', fontSize: '0.875rem' }}>{t('common.loading')}</p>
                            </div>
                        ) : orders.filter(o => o.status === activeTab).length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <ShoppingBag className="w-8 h-8" style={{ color: '#10b981' }} />
                                </div>
                                <h3 style={{ color: '#1c1917', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{t('dashboard.buyer.empty.title', { status: activeTab })}</h3>
                                <p style={{ color: '#78716c', fontSize: '0.875rem', maxWidth: '24rem', margin: '0 auto 1.5rem' }}>
                                    {t('dashboard.buyer.empty.desc', { status: activeTab })}
                                </p>
                                {activeTab === 'active' && (
                                    <Link
                                        href="/market"
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                            color: '#065f46', fontWeight: 700, background: '#ecfdf5',
                                            padding: '0.5rem 1rem', borderRadius: '0.5rem',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Search className="w-4 h-4" />
                                        {t('dashboard.buyer.empty.startShopping')}
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.filter(o => o.status === activeTab).map((order) => (
                                    <div key={order.id} style={{
                                        background: '#fffef5', borderRadius: '16px',
                                        border: '1px solid #e7e5e4', padding: '1rem',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: '0 2px 10px rgba(28,25,23,0.03)'
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)';
                                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(6,95,70,0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = '#e7e5e4';
                                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(28,25,23,0.03)';
                                        }}
                                    >
                                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                            {/* Image */}
                                            <div style={{ width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#f5f5f4' }}>
                                                <img src={order.image} alt={order.items} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                                                    <div>
                                                        <h3 style={{ fontWeight: 700, color: '#1c1917' }} className="truncate">{order.items}</h3>
                                                        <p style={{ fontSize: '0.875rem', color: '#78716c' }}>{t('dashboard.buyer.orderId')}{order.id}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 md:mt-0">
                                                        <span style={{
                                                            fontSize: '0.875rem', fontWeight: 700, color: '#065f46',
                                                            background: '#ecfdf5', padding: '0.25rem 0.5rem', borderRadius: '6px'
                                                        }}>
                                                            {order.total}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs" style={{ color: '#78716c' }}>
                                                    <div className="flex items-center gap-1">
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>👨‍🌾</div>
                                                        <span style={{ fontWeight: 500, color: '#44403c' }}>{order.farmer}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{order.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 ml-auto md:ml-0">
                                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: order.status === 'active' ? '#d97706' : '#10b981' }} className={order.status === 'active' ? 'animate-pulse' : ''}></span>
                                                        <span className="capitalize">{order.status === 'active' ? t('dashboard.buyer.inProgress') : order.status}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0" style={{ borderTop: '1px solid #e7e5e4' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <button style={{
                                                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                                                        fontSize: '0.875rem', fontWeight: 500, color: '#065f46',
                                                        padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
                                                        background: 'none', border: 'none', cursor: 'pointer',
                                                        transition: 'background 0.2s'
                                                    }}>
                                                        {t('dashboard.buyer.trackOrder')} <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                    {/* Raise Issue Button added here */}
                                                    {(order.status === 'completed' || order.status === 'active') && (
                                                        <button
                                                            onClick={() => handleOpenIssueModal(order.id)}
                                                            className="w-full flex items-center justify-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 py-1.5 px-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                                                        >
                                                            {t('dashboard.buyer.raiseIssue')}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold text-gray-900">{t('dashboard.buyer.raiseIssue')}</h3>
                            <button onClick={() => setIsIssueModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmitIssue} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.buyer.issueType')}</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    value={issueType}
                                    onChange={(e) => setIssueType(e.target.value)}
                                >
                                    <option value="QUALITY">{t('dashboard.buyer.issueTypes.quality')}</option>
                                    <option value="DELIVERY">{t('dashboard.buyer.issueTypes.delivery')}</option>
                                    <option value="QUANTITY">{t('dashboard.buyer.issueTypes.quantity')}</option>
                                    <option value="OTHER">{t('dashboard.buyer.issueTypes.other')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.buyer.issueDescription')}</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none min-h-[120px]"
                                    placeholder={t('dashboard.buyer.issueDescPlaceholder')}
                                    value={issueDescription}
                                    onChange={(e) => setIssueDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsIssueModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingIssue || !issueDescription.trim()}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmittingIssue ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        t('dashboard.buyer.issueSubmit')
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
