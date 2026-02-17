'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { closeCart, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const { items, isOpen } = useSelector((state) => state.cart);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const isAadharVerified = user?.aadharVerified || false;

    const total = items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('₹', '').replace('/kg', ''));
        return sum + (price * item.quantity);
    }, 0);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={() => dispatch(closeCart())}
            />

            {/* Cart Panel */}
            <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6 text-green-600" />
                        <h2 className="text-xl font-bold text-gray-900">{t('cart.title')}</h2>
                    </div>
                    <button
                        onClick={() => dispatch(closeCart())}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">{t('cart.empty')}</p>
                            <p className="text-gray-400 text-sm mt-2">{t('cart.emptyDesc')}</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                                    <Image
                                        src={(item.image && typeof item.image === 'string' && item.image.trim() !== '') ? item.image : 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400&h=400'}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.farmer}</p>
                                    <p className="text-green-600 font-bold mt-1">{item.price}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <span className="px-3 font-medium text-gray-900">{item.quantity} kg</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                                            >
                                                <Plus className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-6 space-y-4 bg-gray-50">
                        {/* Aadhar Verification Warning */}
                        {isAuthenticated && !isAadharVerified && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">⚠️</span>
                                    <div className="flex-1">
                                        <p className="font-semibold text-yellow-900 text-sm mb-1">
                                            {t('cart.verificationRequired')}
                                        </p>
                                        <p className="text-xs text-yellow-800">
                                            {t('cart.pendingVerification')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">{t('cart.subtotal')}</span>
                            <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                        </div>

                        {isAadharVerified ? (
                            <Link
                                href="/checkout"
                                className="block w-full bg-green-600 text-white text-center py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
                                onClick={() => dispatch(closeCart())}
                            >
                                {t('cart.checkout')}
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="w-full bg-gray-300 text-gray-500 text-center py-3.5 rounded-xl font-bold cursor-not-allowed shadow-lg"
                                title={t('cart.verifyToCheckout')}
                            >
                                {t('cart.checkout')} 🔒
                            </button>
                        )}

                        <button
                            onClick={() => dispatch(closeCart())}
                            className="w-full text-gray-600 text-center py-2 font-medium hover:text-gray-900 transition-colors"
                        >
                            {t('cart.continueShopping')}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
