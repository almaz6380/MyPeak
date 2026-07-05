const CACHE_NAME = 'mypeak-v3';
const STATIC_ASSETS = ['/', '/manifest.json', '/mypeak-icon-v2.svg', '/mypeak-arrow-v2.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API calls (Supabase): network-only, no caching
  if (url.hostname.includes('supabase') || url.hostname.includes('openfoodfacts')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Navigation (index.html): IMMER Netz zuerst. Ein gecachtes index.html
  // verweist nach einem Deploy auf gelöschte Asset-Hashes → weiße Seite.
  // Cache dient nur noch als Offline-Fallback.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || caches.match('/'))
        )
    );
    return;
  }

  // Übrige Assets (gehashte Dateien sind unveränderlich): stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      const fetchPromise = fetch(event.request).then((response) => {
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
