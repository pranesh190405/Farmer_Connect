'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './OfflineBanner.module.css';

export default function OfflineBanner() {
    const { t } = useTranslation('common');
    const [isOnline, setIsOnline] = useState(true);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            // Show "back online" message briefly
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowBanner(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!showBanner && isOnline) {
        return null;
    }

    return (
        <div
            className={`${styles.banner} ${isOnline ? styles.online : styles.offline}`}
            role="alert"
            aria-live="assertive"
        >
            <div className={styles.content}>
                <span className={styles.icon}>
                    {isOnline ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                            <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                            <line x1="12" y1="20" x2="12.01" y2="20" />
                        </svg>
                    )}
                </span>
                <span className={styles.message}>
                    {isOnline ? t('offline.backOnline') : t('offline.noConnection')}
                </span>
            </div>
        </div>
    );
}
