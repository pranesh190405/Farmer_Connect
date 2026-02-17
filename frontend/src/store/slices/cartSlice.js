'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // { id, name, price, quantity, image, farmer, minQty }
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += item.quantity || 1;
            } else {
                state.items.push({
                    ...item,
                    quantity: item.quantity || 1
                });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
