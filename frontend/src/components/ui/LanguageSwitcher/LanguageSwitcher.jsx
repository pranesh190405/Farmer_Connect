'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import styles from './LanguageSwitcher.module.css';

const LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'hr', name: 'Haryanvi', nativeName: 'हरियाणवी' },
];

export default function LanguageSwitcher({ variant = 'default' }) {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Extract language from googtrans cookie or fallback to 'en'
        const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
        if (match && match[1]) {
            setCurrentLang(match[1]);
        } else {
            setCurrentLang('en');
        }
    }, []);

    if (!mounted) {
        return null;
    }

    const changeLanguage = (langCode) => {
        // We DO NOT call i18n.changeLanguage() because React reconciliation 
        // wipes out Google Translate's DOM mutations across the entire app.
        // Instead, we let Google Translate cleanly handle 100% of the UI natively.
        setCurrentLang(langCode);

        // Update Google Translate cookie
        const domain = window.location.hostname;
        const cookieDomain = domain === 'localhost' ? '' : `; domain=${domain}`;

        if (langCode === 'en') {
            document.cookie = `googtrans=/en/en; path=/${cookieDomain}`;
            document.cookie = `googtrans=/en/en; path=/`;
        } else {
            document.cookie = `googtrans=/en/${langCode}; path=/${cookieDomain}`;
            document.cookie = `googtrans=/en/${langCode}; path=/`;
        }

        setIsOpen(false);
        // Add a slight delay before reload to ensure the cookie is fully saved
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const currentLanguage = LANGUAGES.find(lang => lang.code === currentLang) || LANGUAGES[0];

    return (
        <div className={`${styles.switcher} ${styles[variant]} notranslate`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${styles.mainButton} notranslate`}
                aria-label={t('common.changeLanguage')}
                aria-expanded={isOpen}
            >
                <span className={styles.langIcon}>🌐</span>
                <span className={styles.langCode}>{currentLanguage.nativeName}</span>
                <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <div className={`${styles.dropdown} notranslate`}>
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`${styles.langOption} notranslate ${lang.code === currentLang ? styles.active : ''}`}
                        >
                            <span className={styles.langName}>{lang.nativeName}</span>
                            <span className={styles.langEnglish}>{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
