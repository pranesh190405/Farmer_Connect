'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import styles from './page.module.css';

// Document types for KYC
const DOCUMENT_TYPES = [
    { value: 'aadhaar', label: 'Aadhaar Card' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'voter_id', label: 'Voter ID' },
    { value: 'driving_license', label: 'Driving License' },
    { value: 'passport', label: 'Passport' },
];

export default function KYCPage() {
    const { t } = useTranslation();

    const [documentType, setDocumentType] = useState('');
    const [frontDoc, setFrontDoc] = useState(null);
    const [frontPreview, setFrontPreview] = useState('');
    const [backDoc, setBackDoc] = useState(null);
    const [backPreview, setBackPreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, verified, rejected
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleFrontUpload = (file, error, preview) => {
        if (error) {
            setErrors(prev => ({ ...prev, front: error }));
            return;
        }
        setFrontDoc(file);
        setFrontPreview(preview);
        setErrors(prev => ({ ...prev, front: '' }));
    };

    const handleBackUpload = (file, error, preview) => {
        if (error) {
            setErrors(prev => ({ ...prev, back: error }));
            return;
        }
        setBackDoc(file);
        setBackPreview(preview);
        setErrors(prev => ({ ...prev, back: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!documentType) {
            newErrors.documentType = 'Please select a document type';
        }
        if (!frontDoc) {
            newErrors.front = 'Please upload front side of the document';
        }
        if (!backDoc && documentType !== 'pan') {
            newErrors.back = 'Please upload back side of the document';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setVerificationStatus('pending');
    };

    if (isSubmitted) {
        return (
            <main className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.statusCard}>
                        <div className={styles.header}>
                            <div className={`${styles.iconWrapper} ${styles[verificationStatus]}`}>
                                <span className={styles.icon}>
                                    {verificationStatus === 'verified' ? '✓' : verificationStatus === 'rejected' ? '✕' : '⏳'}
                                </span>
                            </div>
                            <h1 className={styles.title}>Verification Status</h1>
                            <Badge status={verificationStatus} size="lg" />
                        </div>

                        <div className={styles.statusInfo}>
                            {verificationStatus === 'pending' && (
                                <>
                                    <p>Your documents have been submitted successfully.</p>
                                    <p className={styles.muted}>We will verify your documents within 24-48 hours. You will receive an SMS notification once verified.</p>
                                </>
                            )}
                            {verificationStatus === 'verified' && (
                                <p className={styles.successText}>Your identity has been verified. You now have full access to the marketplace.</p>
                            )}
                            {verificationStatus === 'rejected' && (
                                <>
                                    <p className={styles.errorText}>Your documents could not be verified.</p>
                                    <p className={styles.muted}>Please re-upload clear images of your documents.</p>
                                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                        Re-upload Documents
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className={styles.submittedDocs}>
                            <h3>Submitted Documents</h3>
                            <div className={styles.docType}>
                                <span>Document Type:</span>
                                <strong>{DOCUMENT_TYPES.find(d => d.value === documentType)?.label}</strong>
                            </div>
                        </div>

                        <Button onClick={() => window.location.href = '/profile'} fullWidth>
                            Back to Profile
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <span className={styles.icon} role="img" aria-label="verification">🪪</span>
                    </div>
                    <h1 className={styles.title}>Identity Verification</h1>
                    <p className={styles.subtitle}>
                        Upload a government-issued ID to verify your identity
                    </p>
                </div>

                <div className={styles.form}>
                    <Select
                        label="Document Type"
                        placeholder="Select ID type"
                        options={DOCUMENT_TYPES}
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        error={errors.documentType}
                        required
                    />

                    <div className={styles.uploadSection}>
                        <FileUpload
                            label="Front Side"
                            accept="image/*"
                            maxSize={5}
                            onUpload={handleFrontUpload}
                            preview={frontPreview}
                            error={errors.front}
                            hint="Upload a clear photo of the front side"
                        />

                        {documentType && documentType !== 'pan' && (
                            <FileUpload
                                label="Back Side"
                                accept="image/*"
                                maxSize={5}
                                onUpload={handleBackUpload}
                                preview={backPreview}
                                error={errors.back}
                                hint="Upload a clear photo of the back side"
                            />
                        )}
                    </div>

                    <div className={styles.guidelines}>
                        <h4>📋 Guidelines</h4>
                        <ul>
                            <li>Ensure all details are clearly visible</li>
                            <li>Avoid glare and shadows</li>
                            <li>Document should not be expired</li>
                            <li>File size must be under 5MB</li>
                        </ul>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        disabled={!documentType || !frontDoc}
                        fullWidth
                    >
                        Submit for Verification
                    </Button>
                </div>
            </div>
        </main>
    );
}
