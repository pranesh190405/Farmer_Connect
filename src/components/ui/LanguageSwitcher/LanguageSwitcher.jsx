'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher({ variant = 'default' }) {
    const { i18n, t } = useTranslation('common');
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className={`${styles.switcher} ${styles[variant]}`}
            aria-label={t('common.changeLanguage')}
            title={t('common.changeLanguage')}
        >
            <span className={styles.langIcon}>🌐</span>
            <span className={styles.langCode}>{currentLang.toUpperCase()}</span>
        </button>
    );
}
