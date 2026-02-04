'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/ui/Header/Header';
import styles from './page.module.css';

export default function Home() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVoiceResult = (transcript) => {
    console.log('Voice search result:', transcript);
    setSearchQuery(transcript);
    // You can implement search logic here
  };

  return (
    <>
      <Header showVoiceSearch={true} onVoiceResult={handleVoiceResult} />
      <main className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.logo}>🌾</div>
          <h1 className={styles.title}>{t('app.name')}</h1>
          <p className={styles.subtitle}>{t('app.tagline')}</p>
          {searchQuery && (
            <div className={styles.searchResult}>
              Voice search: "{searchQuery}"
            </div>
          )}
        </div>

        <div className={styles.cards}>
          <Link href="/farmer/register" className={styles.card}>
            <span className={styles.cardIcon}>👨‍🌾</span>
            <h2>I'm a Farmer</h2>
            <p>Sell your produce directly to buyers</p>
          </Link>

          <Link href="/buyer/register" className={styles.card}>
            <span className={styles.cardIcon}>🏪</span>
            <h2>I'm a Buyer</h2>
            <p>Source fresh produce from farmers</p>
          </Link>
        </div>

        <div className={styles.links}>
          <h3>Quick Links (For Testing)</h3>
          <div className={styles.linkGrid}>
            <Link href="/farmer/register">Farmer Registration</Link>
            <Link href="/buyer/register">Buyer Registration</Link>
            <Link href="/profile">Profile Settings</Link>
            <Link href="/profile/kyc">KYC Verification</Link>
          </div>
        </div>

        <div className={styles.features}>
          <h3>✨ New Features (Epic 2)</h3>
          <ul>
            <li>🌐 Language switcher (Top right - EN/HI)</li>
            <li>🎤 Voice search (Try speaking your search)</li>
            <li>📱 Bottom navigation (Sticky at bottom)</li>
            <li>📡 Offline indicator (Try disconnecting)</li>
          </ul>
        </div>
      </main>
    </>
  );
}
