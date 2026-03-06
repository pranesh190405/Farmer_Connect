'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import VoiceSearch from '@/components/ui/VoiceSearch/VoiceSearch';
import CartButton from '@/components/ui/CartButton/CartButton';
import styles from './Header.module.css';

export default function Header({ showVoiceSearch = false, onVoiceResult }) {
    const { t } = useTranslation('common');
    const user = useSelector((state) => state.auth.user);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>{t('app.name')}</span> {/* Client side only or suppression needed */}
                    <span className={styles.tagline}>{t('app.tagline')}</span>
                </Link>

                <div className={styles.actions}>
                    {showVoiceSearch && (
                        <VoiceSearch onResult={onVoiceResult} />
                    )}
                    {user?.type === 'buyer' && <CartButton />}
                    <LanguageSwitcher variant="header" />
                </div>
            </div>
        </header>
    );
}
