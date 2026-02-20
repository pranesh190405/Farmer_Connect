'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, X, Share2 } from 'lucide-react';
import styles from './InstallPrompt.module.css';

export default function InstallPrompt() {
    const { t } = useTranslation('common');
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already installed (standalone mode)
        const standalone = window.matchMedia('(display-mode: standalone)').matches
            || window.navigator.standalone === true;
        setIsStandalone(standalone);

        if (standalone) return;

        // Check if dismissed recently
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed, 10);
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - dismissedTime < sevenDays) return;
        }

        // Detect iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        if (isIOSDevice) {
            // Show iOS-specific install guide after a delay
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        // Listen for beforeinstallprompt (Chrome, Edge, Samsung Internet)
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show after a short delay for better UX
            setTimeout(() => setShowPrompt(true), 2000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Listen for successful install
        const installedHandler = () => {
            setShowPrompt(false);
            setDeferredPrompt(null);
        };
        window.addEventListener('appinstalled', installedHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', installedHandler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setShowPrompt(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    // Don't render if already installed or not showing
    if (isStandalone || !showPrompt) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.banner}>
                <button
                    className={styles.closeBtn}
                    onClick={handleDismiss}
                    aria-label={t('install.dismiss')}
                >
                    <X size={18} />
                </button>

                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <Download size={28} className={styles.icon} />
                    </div>
                    <div className={styles.textContent}>
                        <h3 className={styles.title} suppressHydrationWarning>
                            {t('install.title')}
                        </h3>
                        <p className={styles.description} suppressHydrationWarning>
                            {t('install.description')}
                        </p>
                    </div>
                </div>

                {isIOS ? (
                    <div className={styles.iosGuide}>
                        <Share2 size={16} />
                        <span suppressHydrationWarning>{t('install.iosGuide')}</span>
                    </div>
                ) : (
                    <button
                        className={styles.installBtn}
                        onClick={handleInstall}
                        suppressHydrationWarning
                    >
                        {t('install.button')}
                    </button>
                )}
            </div>
        </div>
    );
}
