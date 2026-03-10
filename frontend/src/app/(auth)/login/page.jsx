'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginAsync } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast/Toast';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fefce8 0%, #fffef5 30%, #fefce8 60%, #fef3c7 100%)' }}><div style={{ fontSize: '3rem' }}>🌾</div></div>}>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const { isAuthenticated, user, error, isLoading } = useSelector((state) => state.auth);

    const typeParam = searchParams.get('type');
    const initialType = ['farmer', 'buyer', 'admin'].includes(typeParam) ? typeParam : 'farmer';
    const [userType, setUserType] = useState(initialType);
    const [mobile, setMobile] = useState('');
    const [pin, setPin] = useState('');

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.type === 'farmer') router.push('/farmer/dashboard');
            else if (user.type === 'buyer') router.push('/buyer/dashboard');
            else if (user.type === 'admin') router.push('/admin/dashboard');
        }
    }, [isAuthenticated, user, router]);

    useEffect(() => {
        if (error) {
            showToast(error, 'error');
        }
    }, [error]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (mobile.length !== 10) {
            showToast(t('auth.login.enterValidMobile'), 'error');
            return;
        }
        if (pin.length !== 4) {
            showToast(t('auth.login.enterValidPin'), 'error');
            return;
        }

        try {
            await dispatch(loginAsync({ mobile, pin, userType })).unwrap();
        } catch (err) {
            showToast(err || t('auth.login.loginFailed'), 'error');
        }
    };

    const roles = [
        { key: 'farmer', label: 'Farmer' },
        { key: 'buyer', label: 'Buyer' },
        { key: 'admin', label: 'Admin' },
    ];

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #fefce8 0%, #fffef5 30%, #fefce8 60%, #fef3c7 100%)'
        }}>

            {/* Animated Background Orbs — emerald + gold */}
            <div style={{
                position: 'absolute', top: '-100px', right: '-80px',
                width: '350px', height: '350px',
                background: 'radial-gradient(circle, rgba(6,95,70,0.12) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(60px)',
                animation: 'orbFloat1 15s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute', bottom: '-120px', left: '-100px',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(60px)',
                animation: 'orbFloat2 18s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute', top: '30%', right: '20%',
                width: '200px', height: '200px',
                background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)',
                animation: 'orbFloat1 20s ease-in-out infinite reverse'
            }} />

            {/* Login Card */}
            <div className="animate-scaleIn" style={{
                position: 'relative', width: '100%', maxWidth: '440px',
                background: 'rgba(255,254,245,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '24px', padding: '2.5rem',
                border: '1px solid rgba(231,229,228,0.5)',
                boxShadow: '0 20px 60px rgba(28,25,23,0.06), 0 4px 20px rgba(6,95,70,0.04)',
                overflow: 'hidden'
            }}>

                {/* Gold shimmer overlay */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.08), transparent)',
                    animation: 'shimmer 4s linear infinite', pointerEvents: 'none'
                }} />

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                    <h1 className="animate-fadeInUp delay-1" style={{
                        fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem'
                    }}>Farmer Connect</h1>
                    <h2 className="animate-fadeInUp delay-1" style={{
                        fontSize: '1.25rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.25rem'
                    }}>Welcome Back</h2>
                    <p className="animate-fadeInUp delay-2" style={{ color: '#78716c', fontSize: '0.95rem' }}>
                        Login to continue
                    </p>
                </div>

                {/* Role Tabs */}
                <div className="animate-fadeInUp delay-3" style={{
                    display: 'flex', background: '#f5f5f4', padding: '4px',
                    borderRadius: '14px', marginBottom: '1.5rem', position: 'relative', zIndex: 1
                }}>
                    {roles.map((role) => (
                        <button
                            key={role.key}
                            onClick={() => setUserType(role.key)}
                            style={{
                                flex: 1, padding: '0.75rem 0', borderRadius: '10px',
                                fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                background: userType === role.key ? 'white' : 'transparent',
                                color: userType === role.key ? '#065f46' : '#78716c',
                                boxShadow: userType === role.key ? '0 2px 10px rgba(28,25,23,0.08)' : 'none',
                                transform: userType === role.key ? 'scale(1.02)' : 'scale(1)'
                            }}
                        >
                            {role.label}
                        </button>
                    ))}
                </div>

                {/* Form or Admin Link */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {userType === 'admin' ? (
                        <div className="animate-fadeInUp" style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <Link href="/admin/login" style={{
                                color: '#065f46', fontWeight: 600, textDecoration: 'none',
                                fontSize: '1rem', transition: 'color 0.2s'
                            }}>
                                Go to Admin Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="animate-fadeInUp delay-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <Input
                                label="Mobile Number"
                                placeholder="Enter your 10-digit mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                type="tel"
                                inputMode="numeric"
                                prefix="+91"
                                required
                            />

                            <Input
                                label="4-Digit PIN"
                                placeholder="Enter your PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                type="password"
                                inputMode="numeric"
                                maxLength={4}
                                required
                            />

                            <Button type="submit" fullWidth isLoading={isLoading}>
                                Login
                            </Button>

                            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link href={`/forgot-pin?type=${userType}`} style={{
                                    fontSize: '0.875rem', color: '#d97706', fontWeight: 600,
                                    textDecoration: 'none', transition: 'color 0.2s'
                                }}>
                                    Forgot PIN?
                                </Link>
                                <p style={{ fontSize: '0.875rem', color: '#78716c' }}>
                                    {"Don't have an account?"}{' '}
                                    <Link href={`/${userType}/register`} style={{
                                        color: '#065f46', fontWeight: 600, textDecoration: 'none'
                                    }}>
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
