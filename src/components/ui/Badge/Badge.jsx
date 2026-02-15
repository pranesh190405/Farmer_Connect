'use client';

import styles from './Badge.module.css';

/**
 * Badge Component
 * Status badge for verification states
 * 
 * @param {Object} props
 * @param {'pending' | 'verified' | 'rejected' | 'active' | 'sold' | 'expired'} props.status
 * @param {string} props.label - Optional custom label
 * @param {'sm' | 'md' | 'lg'} props.size
 */
export default function Badge({
    status = 'pending',
    label,
    size = 'md',
}) {
    const statusLabels = {
        pending: 'Pending',
        verified: 'Verified',
        rejected: 'Rejected',
        active: 'Active',
        sold: 'Sold',
        expired: 'Expired',
        negotiating: 'Negotiating',
    };

    const statusIcons = {
        pending: '⏳',
        verified: '✓',
        rejected: '✕',
        active: '●',
        sold: '✓',
        expired: '○',
        negotiating: '💬',
    };

    return (
        <span
            className={`${styles.badge} ${styles[status]} ${styles[size]}`}
            role="status"
            aria-label={`Status: ${label || statusLabels[status]}`}
        >
            <span className={styles.icon} aria-hidden="true">
                {statusIcons[status]}
            </span>
            {label || statusLabels[status]}
        </span>
    );
}
