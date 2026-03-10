'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Plus, Package, Clock, Edit, Trash, Truck, ShoppingBag, PackageCheck, Calendar } from 'lucide-react';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';
import { translateCropName } from '@/utils/translateCropName';

export default function FarmerDashboard() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [listings, setListings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');
    const [view, setView] = useState('listings');
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchListings();
        fetchOrders();
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

    const fetchOrders = async () => {
        try {
            const data = await ApiService.getMyOrders();
            const formattedOrders = data.map(o => ({
                id: o.id,
                items: o.items.map(i => `${i.cropName} (${i.quantity}kg)`).join(', '),
                total: `₹${o.totalAmount}`,
                status: o.status,
                date: new Date(o.createdAt).toISOString().split('T')[0],
                buyerName: o.buyerName || 'Buyer',
            }));
            setOrders(formattedOrders);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm(t('common.confirmDelete') || 'Are you sure you want to delete this listing?')) {
            const success = await ApiService.deleteListing(id);
            if (success) {
                toast.success(t('common.deleteSuccess') || 'Listing deleted successfully');
                fetchListings();
            } else {
                toast.error(t('common.error') || 'Failed to delete');
            }
        }
    };

    const handleMarkShipped = async (orderId) => {
        if (!window.confirm('Mark this order as shipped?')) return;
        setActionLoading(orderId);
        try {
            await ApiService.updateOrderStatus(orderId, 'shipped');
            toast.success('Order marked as shipped');
            fetchOrders();
        } catch (err) {
            toast.error(err.message || 'Failed to update order');
        } finally {
            setActionLoading(null);
        }
    };

    if (!mounted) return null;

    const activeCount = listings.filter(l => l.status === 'active').length;
    const placedOrders = orders.filter(o => o.status === 'placed');
    const shippedOrders = orders.filter(o => o.status === 'shipped');
    const deliveredOrders = orders.filter(o => o.status === 'delivered');

    const getStatusBadge = (status) => {
        const map = {
            placed: { bg: '#fef3c7', color: '#92400e', label: 'Placed' },
            shipped: { bg: '#dbeafe', color: '#1e40af', label: 'Shipped' },
            delivered: { bg: '#ecfdf5', color: '#065f46', label: 'Delivered' },
            cancelled: { bg: '#fef2f2', color: '#991b1b', label: 'Cancelled' },
        };
        const s = map[status] || map.placed;
        return (
            <span style={{
                fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem',
                borderRadius: '6px', background: s.bg, color: s.color
            }}>{s.label}</span>
        );
    };

    return (
        <div className="min-h-screen pb-24 font-sans" style={{ background: 'linear-gradient(180deg, #fefce8 0%, #fffef5 50%, #fefce8 100%)' }}>
            <main className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Welcome Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #065f46, #10b981)',
                    borderRadius: '20px', padding: '2rem', color: 'white',
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                    alignItems: 'center', gap: '1rem',
                    boxShadow: '0 8px 30px rgba(6,95,70,0.3)'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('dashboard.welcomeFarmer')}</h1>
                        <p style={{ opacity: 0.85, fontSize: '0.875rem', marginTop: '0.25rem' }}>{t('dashboard.manageCrops')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Link href="/farmer/listing/batch" style={{
                            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                            color: 'white', padding: '0.625rem 1.25rem', borderRadius: '9999px',
                            fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: '0.875rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)',
                            transition: 'all 0.3s'
                        }}>
                            <Package className="w-4 h-4" />
                            {t('dashboard.batchMode') || 'Batch Mode'}
                        </Link>
                        <Link href="/farmer/listing/new" style={{
                            background: '#fbbf24', color: '#1c1917',
                            padding: '0.625rem 1.5rem', borderRadius: '9999px',
                            fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: '0.875rem', textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(251,191,36,0.4)', transition: 'all 0.3s'
                        }}>
                            <Plus className="w-5 h-5" />
                            {t('dashboard.newListing')}
                        </Link>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: t('dashboard.activeListings'), value: activeCount, icon: Package, bg: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', color: '#065f46' },
                        { label: 'New Orders', value: placedOrders.length, icon: ShoppingBag, bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#d97706' },
                        { label: 'Shipped', value: shippedOrders.length, icon: Truck, bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', color: '#1d4ed8' },
                        { label: 'Delivered', value: deliveredOrders.length, icon: PackageCheck, bg: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', color: '#065f46' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            background: '#fffef5', borderRadius: '16px', padding: '1.25rem',
                            border: '1px solid #e7e5e4', display: 'flex', alignItems: 'center', gap: '0.75rem',
                            boxShadow: '0 4px 20px rgba(28,25,23,0.04)'
                        }}>
                            <div style={{ padding: '0.625rem', borderRadius: '12px', background: stat.bg, color: stat.color }}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p style={{ color: '#78716c', fontSize: '0.75rem', fontWeight: 500 }}>{stat.label}</p>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917' }}>{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Toggle */}
                <div style={{ display: 'flex', background: '#f5f5f4', padding: '0.25rem', borderRadius: '12px', width: 'fit-content' }}>
                    {[
                        { key: 'listings', label: 'My Listings', icon: Package },
                        { key: 'orders', label: 'Incoming Orders', icon: ShoppingBag }
                    ].map(v => (
                        <button key={v.key} onClick={() => setView(v.key)}
                            style={{
                                padding: '0.5rem 1.25rem', borderRadius: '10px', fontSize: '0.875rem',
                                fontWeight: 600, border: 'none', cursor: 'pointer',
                                background: view === v.key ? 'white' : 'transparent',
                                color: view === v.key ? '#1c1917' : '#78716c',
                                boxShadow: view === v.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                display: 'flex', alignItems: 'center', gap: '0.375rem',
                                transition: 'all 0.2s'
                            }}>
                            <v.icon style={{ width: 16, height: 16 }} />
                            {v.label}
                        </button>
                    ))}
                </div>

                {/* ===== LISTINGS VIEW ===== */}
                {view === 'listings' && (
                    <>
                        <div>
                            <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #e7e5e4' }}>
                                {['active', 'sold', 'expired'].map((tab) => (
                                    <button key={tab} onClick={() => setActiveTab(tab)}
                                        style={{
                                            paddingBottom: '0.75rem', fontSize: '1rem', fontWeight: 600,
                                            textTransform: 'capitalize', position: 'relative', background: 'none',
                                            border: 'none', cursor: 'pointer',
                                            color: activeTab === tab ? '#065f46' : '#a8a29e',
                                            transition: 'color 0.3s'
                                        }}>
                                        {t(`dashboard.status.${tab}`) || tab}
                                        <span style={{
                                            marginLeft: '0.5rem', fontSize: '0.75rem', padding: '0.125rem 0.5rem',
                                            borderRadius: '9999px',
                                            background: activeTab === tab ? '#ecfdf5' : '#f5f5f4',
                                            color: activeTab === tab ? '#065f46' : '#78716c'
                                        }}>
                                            {listings.filter(l => l.status === tab).length}
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
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                                <div className="animate-spin rounded-full h-12 w-12 mx-auto" style={{ borderBottom: '3px solid #065f46', borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: '3px solid transparent' }}></div>
                                <p style={{ marginTop: '1rem', color: '#78716c' }}>{t('common.loading')}</p>
                            </div>
                        ) : listings.filter(l => l.status === activeTab).length === 0 ? (
                            <div style={{
                                textAlign: 'center', padding: '5rem 0', background: '#fffef5',
                                borderRadius: '20px', border: '2px dashed #d6d3d1'
                            }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem', color: '#10b981'
                                }}>
                                    <Package className="w-10 h-10" style={{ opacity: 0.6 }} />
                                </div>
                                <h3 style={{ color: '#1c1917', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>{t('dashboard.noListings')}</h3>
                                <p style={{ color: '#78716c', fontSize: '0.875rem', maxWidth: '20rem', margin: '0 auto 1.5rem' }}>
                                    {t('dashboard.startSellingDescription')}
                                </p>
                                <Link href="/farmer/listing/new" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>
                                    + {t('dashboard.createFirstListing')}
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {listings.filter(l => l.status === activeTab).map((item) => (
                                    <div key={item.id} style={{
                                        background: '#fffef5', borderRadius: '20px',
                                        border: '1px solid #e7e5e4', overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(28,25,23,0.04)',
                                        transition: 'all 0.4s'
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(6,95,70,0.1)'; e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,25,23,0.04)'; e.currentTarget.style.borderColor = '#e7e5e4'; }}>
                                        <div style={{ position: 'relative', height: '12rem', overflow: 'hidden', background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)' }}>
                                            {item.image ? (
                                                <img src={item.image} alt={item.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Package className="w-12 h-12" style={{ color: '#34d399' }} />
                                                </div>
                                            )}
                                            <div style={{
                                                position: 'absolute', top: '0.75rem', right: '0.75rem',
                                                background: 'rgba(255,254,245,0.9)', backdropFilter: 'blur(8px)',
                                                padding: '0.25rem 0.75rem', borderRadius: '9999px',
                                                fontSize: '0.75rem', fontWeight: 700, color: '#1c1917'
                                            }}>{item.quantity}</div>
                                        </div>
                                        <div style={{ padding: '1.25rem' }}>
                                            <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '1.125rem', marginBottom: '0.5rem' }}>{translateCropName(item.crop, t)}</h3>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065f46' }}>{item.price}</span>
                                            </div>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '1rem',
                                                fontSize: '0.875rem', color: '#78716c',
                                                paddingTop: '1rem', borderTop: '1px solid #e7e5e4'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                    <Clock className="w-4 h-4" />{item.date}
                                                </div>
                                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                                                    <Link href={`/farmer/listing/edit/${item.id}`}
                                                        style={{ padding: '0.5rem', color: '#0ea5e9', borderRadius: '0.5rem' }}
                                                        title={t('common.edit')}>
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        style={{ padding: '0.5rem', color: '#dc2626', borderRadius: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                                        title={t('common.delete')} onClick={() => handleDelete(item.id)}>
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ===== ORDERS VIEW ===== */}
                {view === 'orders' && (
                    <div style={{ background: '#fffef5', borderRadius: '20px', border: '1px solid #e7e5e4', overflow: 'hidden', boxShadow: '0 4px 20px rgba(28,25,23,0.04)' }}>
                        <div style={{ padding: '1.5rem 1.5rem 0' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c1917' }}>Incoming Orders</h2>
                            <p style={{ fontSize: '0.875rem', color: '#78716c', marginTop: '0.25rem' }}>Orders from buyers for your listings</p>
                        </div>

                        <div className="p-4 md:p-6">
                            {ordersLoading ? (
                                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                    <div className="animate-spin" style={{ width: 40, height: 40, margin: '0 auto', borderRadius: '50%', borderBottom: '3px solid #065f46', borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: '3px solid transparent' }} />
                                    <p style={{ marginTop: '1rem', color: '#78716c' }}>Loading orders...</p>
                                </div>
                            ) : orders.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1rem'
                                    }}>
                                        <ShoppingBag className="w-8 h-8" style={{ color: '#10b981' }} />
                                    </div>
                                    <h3 style={{ color: '#1c1917', fontWeight: 700, fontSize: '1.125rem' }}>No orders yet</h3>
                                    <p style={{ color: '#78716c', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                        When buyers order your products, they'll appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} style={{
                                            background: 'white', borderRadius: '16px', border: '1px solid #e7e5e4',
                                            padding: '1rem 1.25rem', transition: 'all 0.3s'
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(6,95,70,0.06)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e7e5e4'; e.currentTarget.style.boxShadow = 'none'; }}>
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                        <h4 style={{ fontWeight: 700, color: '#1c1917' }}>Order #{order.id}</h4>
                                                        {getStatusBadge(order.status)}
                                                    </div>
                                                    <p style={{ fontSize: '0.875rem', color: '#44403c' }} className="truncate">{order.items}</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2" style={{ fontSize: '0.8rem', color: '#78716c' }}>
                                                        <div className="flex items-center gap-1">
                                                            <span>👤</span><span>{order.buyerName}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar style={{ width: 14, height: 14 }} /><span>{order.date}</span>
                                                        </div>
                                                        <span style={{ fontWeight: 700, color: '#065f46' }}>{order.total}</span>
                                                    </div>
                                                </div>

                                                {order.status === 'placed' && (
                                                    <button onClick={() => handleMarkShipped(order.id)}
                                                        disabled={actionLoading === order.id}
                                                        style={{
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                                                            fontSize: '0.875rem', fontWeight: 700, color: 'white',
                                                            padding: '0.625rem 1.25rem', borderRadius: '10px',
                                                            background: 'linear-gradient(135deg, #065f46, #10b981)',
                                                            border: 'none', cursor: 'pointer',
                                                            boxShadow: '0 4px 12px rgba(6,95,70,0.3)',
                                                            opacity: actionLoading === order.id ? 0.6 : 1,
                                                            transition: 'all 0.3s', whiteSpace: 'nowrap'
                                                        }}>
                                                        <Truck style={{ width: 16, height: 16 }} />
                                                        {actionLoading === order.id ? 'Updating...' : 'Mark Shipped'}
                                                    </button>
                                                )}
                                                {order.status === 'shipped' && (
                                                    <span style={{
                                                        fontSize: '0.8rem', fontWeight: 500, color: '#1e40af',
                                                        background: '#dbeafe', padding: '0.375rem 0.75rem', borderRadius: '8px',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        Awaiting buyer confirmation
                                                    </span>
                                                )}
                                                {order.status === 'delivered' && (
                                                    <span style={{
                                                        fontSize: '0.8rem', fontWeight: 500, color: '#065f46',
                                                        background: '#ecfdf5', padding: '0.375rem 0.75rem', borderRadius: '8px',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        ✓ Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
