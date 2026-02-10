'use client';

import { useRef, useState } from 'react';
import styles from './FileUpload.module.css';

/**
 * FileUpload Component
 * Document/Image upload with progress indicator
 * 
 * @param {Object} props
 * @param {string} props.label - Upload label
 * @param {string} props.accept - Accepted file types
 * @param {number} props.maxSize - Max file size in MB
 * @param {function} props.onUpload - Called when file is selected
 * @param {string} props.error - Error message
 */
export default function FileUpload({
    label,
    accept = 'image/*,.pdf',
    maxSize = 5, // MB
    onUpload,
    error,
    hint,
    preview,
    disabled = false,
}) {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleClick = () => {
        if (!disabled) inputRef.current?.click();
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const processFile = async (file) => {
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            if (onUpload) onUpload(null, `File size must be less than ${maxSize}MB`);
            return;
        }

        setFileName(file.name);
        setUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);

        // Convert to base64 for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            if (onUpload) onUpload(file, null, reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleRemove = () => {
        setFileName('');
        setUploadProgress(0);
        if (inputRef.current) inputRef.current.value = '';
        if (onUpload) onUpload(null);
    };

    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}</label>}

            <div
                className={`${styles.dropzone} ${dragActive ? styles.active : ''} ${error ? styles.hasError : ''} ${disabled ? styles.disabled : ''} ${preview ? styles.hasPreview : ''}`}
                onClick={handleClick}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label={label || 'Upload file'}
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    disabled={disabled}
                    className={styles.input}
                    aria-hidden="true"
                />

                {preview ? (
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="Document preview" className={styles.previewImage} />
                        <button
                            className={styles.removeButton}
                            onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                            aria-label="Remove file"
                        >
                            ✕
                        </button>
                    </div>
                ) : uploading ? (
                    <div className={styles.uploadingState}>
                        <div className={styles.progressRing}>
                            <svg viewBox="0 0 36 36">
                                <path
                                    className={styles.progressBg}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className={styles.progressBar}
                                    strokeDasharray={`${uploadProgress}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <span className={styles.progressText}>{uploadProgress}%</span>
                        </div>
                        <p className={styles.fileName}>{fileName}</p>
                    </div>
                ) : (
                    <div className={styles.defaultState}>
                        <span className={styles.uploadIcon}>📄</span>
                        <p className={styles.dropText}>
                            <strong>Click to upload</strong> or drag and drop
                        </p>
                        <p className={styles.fileTypes}>
                            {accept.replace(/\./g, '').toUpperCase()} (Max {maxSize}MB)
                        </p>
                    </div>
                )}
            </div>

            {fileName && !uploading && !preview && (
                <div className={styles.fileInfo}>
                    <span>✓ {fileName}</span>
                    <button onClick={handleRemove} className={styles.removeLink}>Remove</button>
                </div>
            )}

            {error && <p className={styles.error} role="alert">{error}</p>}
            {hint && !error && <p className={styles.hint}>{hint}</p>}
        </div>
    );
}
