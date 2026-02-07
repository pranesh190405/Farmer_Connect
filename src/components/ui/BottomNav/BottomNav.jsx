'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Home, ShoppingBag, User, Store, List } from 'lucide-react';
import styles from './BottomNav.module.css';

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation('common');
    const { userType } = useSelector((state) => state.auth);

    // Don't show on auth pages or landing page if not logged in (optional, but good for UX)
    // For now, we show it everywhere as per request, but adapt links.

    // Default links (public)
    let navItems = [
        { href: '/', label: t('nav.home'), icon: Home },
        { href: '/market', label: t('nav.market'), icon: Store },
        { href: '/profile', label: t('nav.profile'), icon: User },
    ];

    if (userType === 'farmer') {
        navItems = [
            { href: '/farmer/dashboard', label: t('nav.home'), icon: Home },
            { href: '/farmer/listings', label: t('nav.listings'), icon: List }, // Need to create this or redirect
            { href: '/market', label: t('nav.market'), icon: Store },
            { href: '/profile', label: t('nav.profile'), icon: User },
        ];
    } else if (userType === 'buyer') {
        navItems = [
            { href: '/buyer/dashboard', label: t('nav.home'), icon: Home },
            { href: '/market', label: t('nav.market'), icon: Store },
            // Maybe add Orders here later
            { href: '/profile', label: t('nav.profile'), icon: User },
        ];
    }

    return (
        <nav className={styles.bottomNav} role="navigation" aria-label="Main navigation">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        aria-label={item.label}
                        aria-current={isActive ? 'page' : undefined}
                        suppressHydrationWarning
                    >
                        <span className={styles.iconWrapper}>
                            <Icon size={24} />
                        </span>
                        <span className={styles.label} suppressHydrationWarning>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
