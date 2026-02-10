'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function AuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Allow public paths (redundant if used as a wrapper, but safe)
        if (isLoading) return;

        if (!isAuthenticated) {
            router.push('/login');
            setAuthorized(false);
        } else {
            setAuthorized(true);
        }
    }, [isAuthenticated, isLoading, router, pathname]);

    // Show nothing while checking or if redirecting
    if (isLoading || !isAuthenticated) {
        return null; // Or a loading spinner
    }

    return children;
}
