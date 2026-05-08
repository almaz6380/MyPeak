const CACHE_NAME = 'mypeak-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy — app always uses fresh data
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
