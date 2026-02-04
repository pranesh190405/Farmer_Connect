'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import VoiceSearch from '@/components/ui/VoiceSearch/VoiceSearch';
import styles from './Header.module.css';

export default function Header({ showVoiceSearch = false, onVoiceResult }) {
    const { t } = useTranslation('common');

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>{t('app.name')}</span>
                    <span className={styles.tagline}>{t('app.tagline')}</span>
                </Link>

                <div className={styles.actions}>
                    {showVoiceSearch && (
                        <VoiceSearch onResult={onVoiceResult} />
                    )}
                    <LanguageSwitcher variant="header" />
                </div>
            </div>
        </header>
    );
}
