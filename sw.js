/**
 * Service Worker for Hardware Engineer Knowledge Base
 * Provides offline functionality and caching
 * Version: 2.2.3
 */

const CACHE_NAME = 'hardware-kb-v2.3.0';
const RUNTIME_CACHE = 'hardware-kb-runtime';

// Files to cache immediately on install
const PRECACHE_URLS = [
    '/hardware_knowledge_base/',
    '/hardware_knowledge_base/index.html',
    '/hardware_knowledge_base/cases.html',
    '/hardware_knowledge_base/quick-reference.html',
    '/hardware_knowledge_base/api-docs.html',
    '/hardware_knowledge_base/404.html',
    '/hardware_knowledge_base/offline.html',
    '/hardware_knowledge_base/styles.css',
    '/hardware_knowledge_base/print.css',
    '/hardware_knowledge_base/script.js',
    '/hardware_knowledge_base/cases.js',
    '/hardware_knowledge_base/search-optimizer.js',
    '/hardware_knowledge_base/analytics.js',
    '/hardware_knowledge_base/feedback.js',
    '/hardware_knowledge_base/share.js',
    '/hardware_knowledge_base/sw-register.js',
    '/hardware_knowledge_base/manifest.json'
];

// CDN resources (cache separately)
const CDN_URLS = [
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

/**
 * Install Event
 * Pre-cache essential files
 */
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching app shell...');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                console.log('[SW] Service Worker installed successfully!');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('[SW] Pre-caching failed:', error);
            })
    );
});

/**
 * Activate Event
 * Clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            // Delete old caches
                            return name !== CACHE_NAME && name !== RUNTIME_CACHE;
                        })
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Service Worker activated!');
                return self.clients.claim(); // Take control immediately
            })
    );
});

/**
 * Fetch Event
 * Network-first strategy for HTML, Cache-first for assets
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests (except CDN)
    if (url.origin !== location.origin && !isCDNRequest(url)) {
        return;
    }

    // Choose strategy based on request type
    if (request.mode === 'navigate' || request.headers.get('accept').includes('text/html')) {
        // Network-first for HTML pages
        event.respondWith(networkFirst(request));
    } else if (isCDNRequest(url)) {
        // Cache-first for CDN resources
        event.respondWith(cacheFirstWithExpiry(request, 7 * 24 * 60 * 60 * 1000)); // 7 days
    } else {
        // Cache-first for local assets
        event.respondWith(cacheFirst(request));
    }
});

/**
 * Network-First Strategy
 * Try network first, fall back to cache
 */
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        // Try network first
        const response = await fetch(request);

        // Cache successful responses
        if (response && response.status === 200) {
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        // Network failed, try cache
        console.log('[SW] Network request failed, trying cache:', request.url);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // If HTML request and no cache, return offline page
        if (request.mode === 'navigate') {
            const offlineResponse = await cache.match('/hardware_knowledge_base/offline.html');
            if (offlineResponse) {
                return offlineResponse;
            }
            // Fallback to 404 page
            const fallbackResponse = await cache.match('/hardware_knowledge_base/404.html');
            if (fallbackResponse) {
                return fallbackResponse;
            }
        }

        // No cache available
        return new Response('Offline - No cached version available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
    }
}

/**
 * Cache-First Strategy
 * Try cache first, fall back to network
 */
async function cacheFirst(request) {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    // Cache miss, fetch from network
    try {
        const response = await fetch(request);

        // Cache successful responses
        if (response && response.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        console.error('[SW] Fetch failed:', error);

        // Return a generic offline response
        return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

/**
 * Cache-First with Expiry
 * Check cache expiry time
 */
async function cacheFirstWithExpiry(request, maxAge) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        const cachedTime = new Date(cachedResponse.headers.get('date')).getTime();
        const now = Date.now();

        // Check if cache is still valid
        if (now - cachedTime < maxAge) {
            return cachedResponse;
        }
    }

    // Cache expired or not found, fetch from network
    try {
        const response = await fetch(request);

        if (response && response.status === 200) {
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        // Network failed, return expired cache if available
        if (cachedResponse) {
            console.log('[SW] Using expired cache:', request.url);
            return cachedResponse;
        }

        throw error;
    }
}

/**
 * Check if request is to CDN
 */
function isCDNRequest(url) {
    const cdnHosts = [
        'cdn.jsdelivr.net',
        'cdnjs.cloudflare.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
    ];

    return cdnHosts.some(host => url.hostname.includes(host));
}

/**
 * Message Event
 * Handle messages from clients
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('[SW] Skipping waiting...');
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME
        });
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        console.log('[SW] Clearing all caches...');
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => caches.delete(name))
            );
        }).then(() => {
            event.ports[0].postMessage({
                success: true,
                message: 'All caches cleared'
            });
        });
    }
});

/**
 * Background Sync Event (for future use)
 */
self.addEventListener('sync', (event) => {
    console.log('[SW] Sync event:', event.tag);

    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

/**
 * Sync data in background
 */
async function syncData() {
    console.log('[SW] Syncing data...');
    // Placeholder for future implementation
    return Promise.resolve();
}

/**
 * Push Event (for future notifications)
 */
self.addEventListener('push', (event) => {
    console.log('[SW] Push notification received:', event);

    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/hardware_knowledge_base/icon-192.png',
        badge: '/hardware_knowledge_base/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '查看更新',
                icon: '/hardware_knowledge_base/check-icon.png'
            },
            {
                action: 'close',
                title: '关闭',
                icon: '/hardware_knowledge_base/close-icon.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('硬件工程师知识库', options)
    );
});

/**
 * Notification Click Event
 */
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event.action);

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/hardware_knowledge_base/')
        );
    }
});

/**
 * Log Service Worker version
 */
console.log('[SW] Service Worker version:', CACHE_NAME);
console.log('[SW] Service Worker loaded successfully!');
