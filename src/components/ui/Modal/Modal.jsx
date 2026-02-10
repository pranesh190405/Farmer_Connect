'use client';

import styles from './Modal.module.css';

/**
 * Modal Component
 * Accessible modal dialog
 */
export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    size = 'md',
}) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose?.();
        }
    };

    return (
        <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={`${styles.modal} ${styles[size]}`}>
                {(title || showCloseButton) && (
                    <header className={styles.header}>
                        {title && <h2 id="modal-title" className={styles.title}>{title}</h2>}
                        {showCloseButton && (
                            <button
                                className={styles.closeButton}
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                        )}
                    </header>
                )}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
