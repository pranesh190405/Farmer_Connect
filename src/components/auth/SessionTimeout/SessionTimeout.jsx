'use client';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import useAuth from '@/hooks/useAuth';
import styles from './SessionTimeout.module.css';

/**
 * SessionTimeout Component
 * Shows warning modal before session expires
 */
export default function SessionTimeout() {
    const { showTimeoutWarning, timeRemaining, extendSession, handleLogout } = useAuth();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Modal
            isOpen={showTimeoutWarning}
            onClose={extendSession}
            title="Session Expiring"
            size="sm"
        >
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon}>⏰</span>
                </div>

                <p className={styles.message}>
                    Your session will expire in
                </p>

                <div className={styles.timer}>
                    {formatTime(timeRemaining)}
                </div>

                <p className={styles.hint}>
                    Click below to stay logged in
                </p>

                <div className={styles.actions}>
                    <Button onClick={extendSession} fullWidth>
                        Stay Logged In
                    </Button>
                    <Button onClick={handleLogout} variant="outline" fullWidth>
                        Log Out
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
