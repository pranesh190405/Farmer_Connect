'use client';

import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { toggleCart } from '@/store/slices/cartSlice';

export default function CartButton() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors"
        >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {itemCount > 9 ? '9+' : itemCount}
                </span>
            )}
        </button>
    );
}
