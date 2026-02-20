// Service Worker for Digital Agri Market PWA
// Handles caching and offline support

const CACHE_NAME = 'agri-market-v1';
const STATIC_CACHE = 'agri-static-v1';
const API_CACHE = 'agri-api-v1';
const IMAGE_CACHE = 'agri-images-v1';

// Pages to pre-cache for offline access
const PRECACHE_URLS = [
    '/',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Install event - precache essential resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => {
                        return name !== STATIC_CACHE && name !== API_CACHE && name !== IMAGE_CACHE;
                    })
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache with appropriate strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) return;

    // API calls: Network First with cache fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request, API_CACHE));
        return;
    }

    // Images: Cache First
    if (request.destination === 'image' || /\.(png|jpg|jpeg|svg|gif|webp|ico)$/.test(url.pathname)) {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
        return;
    }

    // Static assets (JS, CSS, fonts): Stale While Revalidate
    if (/\.(js|css|woff|woff2|ttf|eot)$/.test(url.pathname) || url.pathname.startsWith('/_next/static/')) {
        event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
        return;
    }

    // Pages: Network First
    event.respondWith(networkFirst(request, CACHE_NAME));
});

// Strategy: Network First (try network, fall back to cache)
async function networkFirst(request, cacheName) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;

        // If no cached version and it's a navigation request, show offline page
        if (request.mode === 'navigate') {
            const cachedHome = await caches.match('/');
            if (cachedHome) return cachedHome;
        }

        return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' }),
        });
    }
}

// Strategy: Cache First (try cache, fall back to network)
async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return new Response('', { status: 408, statusText: 'Request Timeout' });
    }
}

// Strategy: Stale While Revalidate (serve cache, update in background)
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const fetchPromise = fetch(request)
        .then((response) => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cached);

    return cached || fetchPromise;
}
