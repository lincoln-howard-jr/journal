const initialCache = [
  '/journal/',
  '/journal/?page=settings',
  '/journal/?page=journal',
  '/journal/?page=write',
  '/journal/?page=skills'
]
let online = true;

const isStaticAsset = url => {
  return initialCache.includes (url);
}

self.addEventListener ('message', event => {
  online = event.data.online;
});

// on install
self.addEventListener ('install', event => {
  event.waitUntil (
    caches.open ('v1').then (cache => {
      return cache.addAll (initialCache)
    })
  );
});

self.addEventListener('activate', event => {
  self.clients.claim ();
});

self.addEventListener ('fetch', event => {

  if (event.request.method.toLowerCase () !== 'get') return;
  
  if (isStaticAsset (event.request.pathname)) return event.respondWith (
    (async () => {
      let cache = await caches.open ('v1');
      let match = await cache.match (event.request);
      return !!match ? match : fetch (event.request);
    }) ()
  )

  event.respondWith (
    (async () => {
      let cache = await caches.open ('v1');
      let match = await cache.match (event.request);
      try {
        if (!online) throw '';
        event.waitUntil (cache.add (event.request));
      } catch (e) {
      }
      return !!match ? match : fetch (event.request);
    }) ()
  );
});