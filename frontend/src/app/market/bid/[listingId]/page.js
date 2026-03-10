'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { ApiService } from '@/services/apiService';
import { ArrowLeft, Clock, Gavel, Trophy, User, TrendingUp, MapPin } from 'lucide-react';
import styles from './page.module.css';

const POLL_INTERVAL = 10000; // 10 seconds

export default function BiddingPage() {
    const params = useParams();
    const router = useRouter();
    const listingId = params.listingId;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    // Fetch bid session data
    const fetchData = useCallback(async () => {
        try {
            const result = await ApiService.getBidSession(listingId);
            if (result) {
                setData(result);
            }
        } catch (err) {
            console.error('Error fetching bid data:', err);
        } finally {
            setIsLoading(false);
        }
    }, [listingId]);

    // Initial load
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Polling for updates
    useEffect(() => {
        if (!data?.bidding?.isActive) return;

        const interval = setInterval(fetchData, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [data?.bidding?.isActive, fetchData]);

    // Countdown timer
    useEffect(() => {
        if (!data?.bidding?.endTime) return;

        const updateTimer = () => {
            const now = new Date();
            const end = new Date(data.bidding.endTime);
            const diff = Math.max(0, end - now);

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [data?.bidding?.endTime]);

    // Place bid handler
    const handlePlaceBid = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const amount = parseFloat(bidAmount);
        if (!amount || isNaN(amount) || amount <= 0) {
            setError('Please enter a valid bid amount');
            return;
        }

        setIsSubmitting(true);
        try {
            await ApiService.placeBid(listingId, amount);
            setSuccess('Bid placed successfully!');
            setBidAmount('');
            // Refresh data immediately
            await fetchData();
        } catch (err) {
            setError(err.message || 'Failed to place bid');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate minimum bid
    const getMinimumBid = () => {
        if (!data) return 0;
        const { bidding, listing } = data;
        if (bidding.highestBid) {
            return (bidding.highestBid + bidding.minIncrement).toFixed(2);
        }
        return listing.expectedPrice.toFixed(2);
    };

    if (isLoading) {
        return (
            <div className={styles.loadingSkeleton}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    if (!data) {
        return (
            <AuthGuard>
                <div className={styles.biddingPage}>
                    <div className={styles.header}>
                        <div className={styles.headerContent}>
                            <button onClick={() => router.back()} className={styles.backLink}>
                                <ArrowLeft size={16} /> Back to Market
                            </button>
                            <h1 className={styles.cropTitle}>Listing Not Found</h1>
                        </div>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    const { listing, bidding, bids } = data;
    const isActive = bidding.isActive;
    const isEnded = bidding.isEnded;

    return (
        <AuthGuard>
            <div className={styles.biddingPage}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <button onClick={() => router.back()} className={styles.backLink}>
                            <ArrowLeft size={16} /> Back to Market
                        </button>
                        <h1 className={styles.cropTitle}>{listing.cropName}</h1>
                        <div className={styles.cropMeta}>
                            <span><User size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {listing.farmerName}</span>
                            <span>•</span>
                            <span>{listing.variety}</span>
                            {isActive && (
                                <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                                    <span className={styles.liveDot}></span> Live
                                </span>
                            )}
                            {isEnded && (
                                <span className={`${styles.statusBadge} ${styles.statusEnded}`}>
                                    Ended
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    {/* Winner Banner (when auction ended) */}
                    {isEnded && bidding.winner && (
                        <div className={styles.winnerBanner}>
                            <div className={styles.winnerIcon}>
                                <Trophy size={18} />
                            </div>
                            <div className={styles.winnerInfo}>
                                <div className={styles.winnerTitle}>Auction Winner</div>
                                <div className={styles.winnerName}>{bidding.winner.buyerName}</div>
                            </div>
                            <div className={styles.winnerAmount}>₹{bidding.winner.amount.toFixed(2)}/{listing.unit}</div>
                        </div>
                    )}

                    {/* Countdown Timer */}
                    <div className={`${styles.card} ${styles.timerCard}`}>
                        <div className={styles.cardHeader}>
                            <Clock size={18} color="#d97706" />
                            <span className={styles.cardTitle}>
                                {isActive ? 'Time Remaining' : isEnded ? 'Auction Ended' : 'Bidding Not Active'}
                            </span>
                        </div>
                        <div className={styles.timerContent}>
                            <div className={styles.timerBlock}>
                                <div className={styles.timerValue}>
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </div>
                                <div className={styles.timerLabel}>Hours</div>
                            </div>
                            <span className={styles.timerSeparator}>:</span>
                            <div className={styles.timerBlock}>
                                <div className={styles.timerValue}>
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </div>
                                <div className={styles.timerLabel}>Minutes</div>
                            </div>
                            <span className={styles.timerSeparator}>:</span>
                            <div className={styles.timerBlock}>
                                <div className={styles.timerValue}>
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                                <div className={styles.timerLabel}>Seconds</div>
                            </div>
                        </div>
                    </div>

                    {/* Crop Details */}
                    <div className={styles.card}>
                        <div className={styles.cropImage}>
                            <img
                                src={listing.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600&h=400'}
                                alt={listing.cropName}
                                style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <div className={styles.detailLabel}>Base Price</div>
                                <div className={styles.detailValue}>₹{listing.expectedPrice}/{listing.unit}</div>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.detailLabel}>Quantity</div>
                                <div className={styles.detailValue}>{listing.quantity} {listing.unit}</div>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.detailLabel}>Grade</div>
                                <div className={styles.detailValue}>{listing.qualityGrade}</div>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.detailLabel}>
                                    {bidding.highestBid ? 'Current Highest' : 'Min Bid'}
                                </div>
                                <div className={styles.detailValue} style={{ color: '#d97706' }}>
                                    ₹{bidding.highestBid ? bidding.highestBid.toFixed(2) : listing.expectedPrice.toFixed(2)}/{listing.unit}
                                </div>
                            </div>
                        </div>
                        {listing.location && (
                            <div style={{ padding: '0 1rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.8125rem' }}>
                                <MapPin size={14} /> {listing.location}
                            </div>
                        )}
                    </div>

                    {/* Place Bid Form */}
                    {isActive && (
                        <div className={`${styles.card} ${styles.bidForm}`}>
                            <div className={styles.cardHeader}>
                                <Gavel size={18} color="#d97706" />
                                <span className={styles.cardTitle}>Place Your Bid</span>
                            </div>
                            <div className={styles.cardBody}>
                                {error && <div className={styles.errorBox}>{error}</div>}
                                {success && <div className={styles.successBox}>{success}</div>}

                                <form onSubmit={handlePlaceBid}>
                                    <div className={styles.bidInputWrapper}>
                                        <div style={{ position: 'relative', flex: 1 }}>
                                            <span className={styles.bidInputIcon}>₹</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={bidAmount}
                                                onChange={(e) => {
                                                    setBidAmount(e.target.value);
                                                    setError('');
                                                    setSuccess('');
                                                }}
                                                placeholder={`Min: ₹${getMinimumBid()}`}
                                                className={styles.bidInput}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className={styles.bidButton}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span className={styles.spinner} style={{ width: '1.25rem', height: '1.25rem', borderWidth: '2px' }}></span>
                                            ) : (
                                                <>
                                                    <Gavel size={16} />
                                                    Bid
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className={styles.minBidHint}>
                                        Min increment: 5% of ₹{listing.expectedPrice}/{listing.unit} = ₹{bidding.minIncrement.toFixed(2)} ·
                                        Total bids: {bidding.totalBids}
                                    </p>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Bid History */}
                    <div className={`${styles.card} ${!isActive ? styles.bidForm : ''}`}>
                        <div className={styles.cardHeader}>
                            <TrendingUp size={18} color="#d97706" />
                            <span className={styles.cardTitle}>Bid History ({bidding.totalBids})</span>
                        </div>
                        <div className={styles.cardBody}>
                            {bids.length === 0 ? (
                                <div className={styles.emptyBids}>
                                    <div className={styles.emptyBidsIcon}>🏷️</div>
                                    <p>No bids yet. Be the first to bid!</p>
                                </div>
                            ) : (
                                <ul className={styles.bidList}>
                                    {bids.map((bid, index) => (
                                        <li key={bid.id} className={styles.bidItem}>
                                            <span className={`${styles.bidRank} ${index === 0 ? styles.bidRankTop : ''}`}>
                                                {index + 1}
                                            </span>
                                            <div className={styles.bidBuyerInfo}>
                                                <div className={styles.bidBuyerName}>{bid.buyerName}</div>
                                                <div className={styles.bidTime}>
                                                    {new Date(bid.createdAt).toLocaleString('en-IN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        day: 'numeric',
                                                        month: 'short',
                                                    })}
                                                </div>
                                            </div>
                                            <span className={`${styles.bidAmount} ${index === 0 ? styles.bidAmountTop : ''}`}>
                                                ₹{bid.amount.toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
