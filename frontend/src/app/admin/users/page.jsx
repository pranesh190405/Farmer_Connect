'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, Search, Shield, ShieldCheck, ShieldX } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';

export default function AdminUsersPage() {
    const { t } = useTranslation('common');
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await ApiService.getAdminUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
            toast.error('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!window.confirm('Approve this user and verify their Aadhaar?')) return;
        setActionLoading(id);
        try {
            await ApiService.approveUser(id, 'Approved by admin');
            toast.success('User approved & Aadhaar verified');
            fetchUsers();
        } catch (err) {
            toast.error(err.message || 'Failed to approve');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id) => {
        const reason = window.prompt('Reason for rejection:');
        if (!reason) return;
        setActionLoading(id);
        try {
            await ApiService.rejectUser(id, reason);
            toast.success('User rejected');
            fetchUsers();
        } catch (err) {
            toast.error(err.message || 'Failed to reject');
        } finally {
            setActionLoading(null);
        }
    };

    const getFilteredUsers = () => {
        return users.filter(u => {
            if (u.type === 'admin') return false;
            const matchesTab = activeTab === 'all' ||
                (activeTab === 'pending' && u.status === 'PENDING') ||
                (activeTab === 'approved' && u.status === 'APPROVED') ||
                (activeTab === 'rejected' && u.status === 'REJECTED');
            const q = searchQuery.toLowerCase();
            const matchesSearch = !q ||
                (u.name || '').toLowerCase().includes(q) ||
                (u.mobile || '').includes(q) ||
                (u.type || '').toLowerCase().includes(q);
            return matchesTab && matchesSearch;
        });
    };

    const filteredUsers = getFilteredUsers();
    const counts = {
        all: users.filter(u => u.type !== 'admin').length,
        pending: users.filter(u => u.status === 'PENDING' && u.type !== 'admin').length,
        approved: users.filter(u => u.status === 'APPROVED' && u.type !== 'admin').length,
        rejected: users.filter(u => u.status === 'REJECTED' && u.type !== 'admin').length,
    };

    const statusBadge = (status) => {
        const colors = {
            APPROVED: { bg: '#ecfdf5', color: '#065f46', border: '#bbf7d0' },
            PENDING: { bg: '#fef3c7', color: '#92400e', border: '#fde68a' },
            REJECTED: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
        };
        const c = colors[status] || colors.PENDING;
        return (
            <span style={{
                padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem',
                fontWeight: 600, background: c.bg, color: c.color, border: `1px solid ${c.border}`,
                textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
                {status}
            </span>
        );
    };

    const aadharBadge = (verified) => (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            fontSize: '0.75rem', fontWeight: 600,
            color: verified ? '#065f46' : '#d97706'
        }}>
            {verified ? <ShieldCheck style={{ width: 14, height: 14 }} /> : <Shield style={{ width: 14, height: 14 }} />}
            {verified ? 'Verified' : 'Unverified'}
        </div>
    );

    if (isLoading) {
        return (
            <AdminLayout>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                    <div style={{ width: 32, height: 32, border: '4px solid #065f46', borderTopColor: 'transparent', borderRadius: '50%' }}
                        className="animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div style={{ maxWidth: '80rem', margin: '0 auto' }} className="space-y-6">
                {/* Header */}
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917' }}>User Management</h1>
                    <p style={{ fontSize: '0.875rem', color: '#78716c', marginTop: '0.25rem' }}>
                        Approve users to verify their Aadhaar and grant checkout access.
                    </p>
                </div>

                {/* Tabs & Search */}
                <div style={{
                    background: 'white', padding: '1rem', borderRadius: '16px',
                    border: '1px solid #e7e5e4', display: 'flex', flexWrap: 'wrap',
                    gap: '1rem', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', background: '#f5f5f4', padding: '0.25rem', borderRadius: '12px' }}>
                        {['all', 'pending', 'approved', 'rejected'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem',
                                    fontWeight: 600, textTransform: 'capitalize', border: 'none', cursor: 'pointer',
                                    background: activeTab === tab ? 'white' : 'transparent',
                                    color: activeTab === tab ? '#1c1917' : '#78716c',
                                    boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                    transition: 'all 0.2s'
                                }}>
                                {tab} <span style={{
                                    marginLeft: '0.375rem', fontSize: '0.7rem', padding: '0.125rem 0.375rem',
                                    borderRadius: '9999px',
                                    background: activeTab === tab ? '#ecfdf5' : '#e7e5e4',
                                    color: activeTab === tab ? '#065f46' : '#78716c'
                                }}>{counts[tab]}</span>
                            </button>
                        ))}
                    </div>
                    <div style={{ position: 'relative', width: '18rem' }}>
                        <Search style={{ width: 18, height: 18, color: '#a8a29e', position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                        <input type="text" placeholder="Search by name or mobile..."
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%', paddingLeft: '2.25rem', paddingRight: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem',
                                border: '1px solid #d6d3d1', borderRadius: '10px', outline: 'none', fontSize: '0.875rem'
                            }} />
                    </div>
                </div>

                {/* Table */}
                {filteredUsers.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '4rem 1rem', background: 'white',
                        borderRadius: '16px', border: '2px dashed #d6d3d1'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>👥</div>
                        <h3 style={{ fontWeight: 700, color: '#1c1917' }}>No users found</h3>
                        <p style={{ color: '#78716c', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                            Try a different search or tab.
                        </p>
                    </div>
                ) : (
                    <div style={{
                        background: 'white', borderRadius: '16px', border: '1px solid #e7e5e4',
                        overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                <thead>
                                    <tr style={{ background: '#fafaf9', borderBottom: '1px solid #e7e5e4' }}>
                                        {['User', 'Role', 'Aadhaar', 'Status', 'Joined', 'Actions'].map(h => (
                                            <th key={h} style={{
                                                padding: '0.875rem 1.25rem', fontSize: '0.75rem', fontWeight: 600,
                                                color: '#78716c', textAlign: h === 'Actions' ? 'right' : 'left',
                                                textTransform: 'uppercase', letterSpacing: '0.05em'
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((u) => (
                                        <tr key={u.id} style={{ borderBottom: '1px solid #f5f5f4', transition: 'background 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#fafaf9'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                                            <td style={{ padding: '1rem 1.25rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{
                                                        width: 40, height: 40, borderRadius: '50%',
                                                        background: u.type === 'farmer' ? '#ecfdf5' : '#dbeafe',
                                                        color: u.type === 'farmer' ? '#065f46' : '#1d4ed8',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontWeight: 700, fontSize: '0.875rem'
                                                    }}>
                                                        {(u.name?.[0] || 'U').toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: '#1c1917' }}>{u.name || 'Unknown'}</p>
                                                        <p style={{ fontSize: '0.75rem', color: '#a8a29e' }}>{u.mobile}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem 1.25rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem',
                                                    fontWeight: 600, textTransform: 'uppercase',
                                                    background: u.type === 'farmer' ? '#ecfdf5' : '#dbeafe',
                                                    color: u.type === 'farmer' ? '#065f46' : '#1d4ed8'
                                                }}>{u.type}</span>
                                            </td>
                                            <td style={{ padding: '1rem 1.25rem' }}>
                                                {aadharBadge(u.aadharVerified)}
                                            </td>
                                            <td style={{ padding: '1rem 1.25rem' }}>
                                                {statusBadge(u.status)}
                                            </td>
                                            <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#78716c' }}>
                                                {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td style={{ padding: '1rem 1.25rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                    {(u.status === 'PENDING' || u.status === 'REJECTED') && (
                                                        <button onClick={() => handleApprove(u.id)}
                                                            disabled={actionLoading === u.id}
                                                            style={{
                                                                padding: '0.375rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem',
                                                                fontWeight: 600, border: '1px solid #bbf7d0', cursor: 'pointer',
                                                                background: '#ecfdf5', color: '#065f46',
                                                                display: 'flex', alignItems: 'center', gap: '0.25rem',
                                                                opacity: actionLoading === u.id ? 0.5 : 1,
                                                                transition: 'all 0.2s'
                                                            }}>
                                                            <Check style={{ width: 14, height: 14 }} />
                                                            Approve
                                                        </button>
                                                    )}
                                                    {(u.status === 'PENDING' || u.status === 'APPROVED') && (
                                                        <button onClick={() => handleReject(u.id)}
                                                            disabled={actionLoading === u.id}
                                                            style={{
                                                                padding: '0.375rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem',
                                                                fontWeight: 600, border: '1px solid #fecaca', cursor: 'pointer',
                                                                background: '#fef2f2', color: '#991b1b',
                                                                display: 'flex', alignItems: 'center', gap: '0.25rem',
                                                                opacity: actionLoading === u.id ? 0.5 : 1,
                                                                transition: 'all 0.2s'
                                                            }}>
                                                            <X style={{ width: 14, height: 14 }} />
                                                            {u.status === 'APPROVED' ? 'Revoke' : 'Reject'}
                                                        </button>
                                                    )}
                                                </div>
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
