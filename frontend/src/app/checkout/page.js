'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, MapPin, CreditCard, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { clearCart } from '@/store/slices/cartSlice';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';
import Button from '@/components/ui/Button';

export default function CheckoutPage() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const router = useRouter();
    const { items } = useSelector((state) => state.cart);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // Compute total from cart items — price is stored as "₹45/kg"
    const total = items.reduce((sum, item) => {
        const price = parseFloat(String(item.price).replace(/[₹,]/g, '').replace(/\/.*$/, ''));
        return sum + (price * item.quantity);
    }, 0);

    const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(user?.address || '');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const isVerified = user?.aadharVerified;

    // Guard: Redirect if not authenticated or empty cart
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (items.length === 0 && step !== 3) {
            router.push('/market');
        }
    }, [isAuthenticated, items, router, step]);

    // Guard: Redirect if not verified
    useEffect(() => {
        if (isAuthenticated && !isVerified) {
            toast.error(t('cart.verificationRequired') || 'Aadhar verification required');
            router.push('/market'); // Or cart, but market is safer
        }
    }, [isAuthenticated, isVerified, router, t]);

    const handlePlaceOrder = async () => {
        if (!address.trim()) {
            toast.error(t('checkout.addressRequired'));
            return;
        }

        setLoading(true);
        try {
            // Parse cart items into the format the backend expects
            const orderItems = items.map(item => {
                // price is stored as "₹45/kg" — extract the number
                const priceNum = parseFloat(
                    String(item.price).replace(/[₹,]/g, '').replace(/\/.*$/, '')
                ) || 0;
                return {
                    id: item.id,
                    quantity: item.quantity,
                    price: priceNum,
                };
            });

            const totalAmount = orderItems.reduce(
                (sum, i) => sum + i.price * i.quantity, 0
            );

            await ApiService.placeOrder({
                items: orderItems,
                deliveryAddress: address.trim(),
                paymentMethod,
                totalAmount,
            });

            dispatch(clearCart());
            setStep(3); // Success
            toast.success(t('checkout.orderPlaced'));
        } catch (err) {
            console.error('Place order failed:', err);
            toast.error(err.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated || (items.length === 0 && step !== 3)) {
        return null; // or loading spinner
    }

    if (!isVerified) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('cart.verificationRequired') || 'Verification Required'}</h2>
                    <p className="text-gray-500 mb-6">
                        {t('cart.pendingVerification') || 'Your account needs admin approval before you can place orders.'}
                    </p>
                    <Link href="/profile">
                        <Button fullWidth>{t('checkout.checkStatus')}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 font-sans">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg text-center max-w-lg w-full">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('checkout.orderPlacedTitle')}</h1>
                    <p className="text-gray-500 mb-8 text-lg">
                        {t('checkout.orderPlacedDesc')}
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/buyer/dashboard">
                            <Button fullWidth>{t('checkout.trackOrder')}</Button>
                        </Link>
                        <Link href="/market" className="text-green-600 font-medium hover:underline py-2">
                            {t('cart.continueShopping')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            <header className="bg-white border-b px-6 py-4 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center gap-2">
                    <Link href="/market" className="text-gray-500 hover:text-gray-900">
                        {t('nav.market')}
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">{t('checkout.title')}</span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Steps */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Address Section */}
                        <div className={`bg-white rounded-2xl p-6 shadow-sm border ${step === 1 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-100'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                                <h2 className="text-xl font-bold text-gray-900">{t('checkout.address')}</h2>
                            </div>

                            <div className="pl-11">
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder={t('checkout.enterAddress')}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none min-h-[100px]"
                                    disabled={step !== 1}
                                />
                                {step === 1 && (
                                    <div className="mt-4">
                                        <Button onClick={() => {
                                            if (address.trim()) setStep(2);
                                            else toast.error(t('checkout.addressRequired'));
                                        }}>
                                            {t('checkout.continueToPayment')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className={`bg-white rounded-2xl p-6 shadow-sm border ${step === 2 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-100'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                                <h2 className="text-xl font-bold text-gray-900">{t('checkout.paymentMethod')}</h2>
                            </div>

                            {step === 2 && (
                                <div className="pl-11 space-y-3">
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-green-500 transition-all bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                                        />
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <CreditCard className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">Pay on Collection / Delivery</p>
                                                <p className="text-sm text-gray-500">Pay when you collect or receive your order</p>
                                            </div>
                                        </div>
                                    </label>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                                        <p className="text-sm text-yellow-800">
                                            Amount is to be paid just before collecting the order and not before.
                                        </p>
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            {t('common.back')}
                                        </button>
                                        <Button onClick={handlePlaceOrder} isLoading={loading}>
                                            {t('checkout.placeOrderTotal', { total: total.toFixed(2) })}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('checkout.orderSummary')}</h3>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">{t('checkout.qty')}: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{item.price}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 py-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{t('checkout.subtotal')}</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{t('checkout.delivery')}</span>
                                    <span className="text-green-600">{t('checkout.free')}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-100">
                                <span>{t('checkout.total')}</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>

                            <div className="mt-6 bg-green-50 rounded-lg p-3 flex gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <p className="text-xs text-green-800">
                                    {t('checkout.safePayment')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
