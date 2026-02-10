'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/lib/i18n';

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
