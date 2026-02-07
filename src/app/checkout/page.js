'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Package, CreditCard } from 'lucide-react';
import { clearCart } from '@/store/slices/cartSlice';
import { showToast } from '@/components/ui/Toast/Toast';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'cod'
    });

    const subtotal = items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('₹', '').replace('/kg', ''));
        return sum + (price * item.quantity);
    }, 0);

    const deliveryCharge = subtotal > 500 ? 0 : 50;
    const total = subtotal + deliveryCharge;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.fullName || !formData.phoneNumber || !formData.address || !formData.city || !formData.state || !formData.pincode) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        // Simulate order placement
        const orderNumber = 'ORD' + Date.now();
        dispatch(clearCart());
        showToast(t('checkout.orderPlaced') || 'Order placed successfully!', 'success');

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            router.push('/buyer/dashboard');
        }, 2000);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('cart.empty')}</h2>
                    <p className="text-gray-500 mb-6">{t('cart.emptyDesc')}</p>
                    <Link
                        href="/buyer/dashboard"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                    >
                        {t('cart.continueShopping')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link href="/buyer/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">{t('checkout.title')}</h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Delivery Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('checkout.deliveryInfo')}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder={t('checkout.fullName') || 'Full Name'}
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder={t('checkout.phoneNumber') || 'Phone Number'}
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <textarea
                                    placeholder={t('checkout.address') || 'Address'}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                    rows="3"
                                    required
                                />
                                <div className="grid md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        placeholder={t('checkout.city') || 'City'}
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder={t('checkout.state') || 'State'}
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder={t('checkout.pincode') || 'Pincode'}
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('checkout.paymentMethod')}</h2>
                            <div className="space-y-3">
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                                    />
                                    <CreditCard className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-gray-900">{t('checkout.cod') || 'Cash on Delivery'}</span>
                                </label>
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'online' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="online"
                                        checked={formData.paymentMethod === 'online'}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                                    />
                                    <CreditCard className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium text-gray-900">{t('checkout.online') || 'Online Payment'}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('checkout.orderSummary')}</h2>

                            {/* Items */}
                            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.quantity} kg</p>
                                            <p className="text-sm font-bold text-green-600">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('cart.subtotal')}</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('checkout.deliveryCharge')}</span>
                                    <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                                    <span>{t('checkout.grandTotal')}</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg mt-6"
                            >
                                {t('checkout.placeOrder')}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
