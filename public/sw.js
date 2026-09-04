// Aetheria Service Worker for PWA Offline Capability & Standalone Installation
const CACHE_NAME = 'aetheria-pwa-v1.1.4';

const PRECACHE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-192.png',
  '/icon-maskable-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Precache assets with error resilience
      await Promise.all(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[PWA SW] Precache warning for ${url}:`, err);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[PWA SW] Clearing deprecated cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle standard HTTP/HTTPS GET requests
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) return;

  // Navigation requests: Network-first with offline cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request, { ignoreSearch: true });
          if (cachedResponse) return cachedResponse;
          const fallback = await caches.match('/', { ignoreSearch: true });
          if (fallback) return fallback;
          return new Response('Offline: Content currently unavailable without network connectivity.', {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            status: 503,
          });
        })
    );
    return;
  }

  // Static Assets (Next.js chunks, images, icons, fonts, Katex): Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|ico|webp|woff|woff2|ttf|eot|css|js)$/);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch((err) => {
            if (cachedResponse) return cachedResponse;
            throw err;
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default fetch handler
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
