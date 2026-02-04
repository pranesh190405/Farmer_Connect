'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './BottomNav.module.css';

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation('common');

    const navItems = [
        {
            href: '/',
            label: t('nav.home'),
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
            ariaLabel: 'Navigate to home'
        },
        {
            href: '/listings',
            label: t('nav.listings'),
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
            ),
            ariaLabel: 'Navigate to listings'
        },
        {
            href: '/market',
            label: t('nav.market'),
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            ),
            ariaLabel: 'Navigate to market'
        },
        {
            href: '/profile',
            label: t('nav.profile'),
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
            ariaLabel: 'Navigate to profile'
        }
    ];

    return (
        <nav className={styles.bottomNav} role="navigation" aria-label="Main navigation">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        aria-label={item.ariaLabel}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <span className={styles.iconWrapper}>
                            {item.icon}
                        </span>
                        <span className={styles.label}>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
