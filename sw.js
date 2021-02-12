const initialCache = [
  '/journal/'
]
// on install
self.addEventListener ('install', event => {
  event.waitUntil (
    caches.open ('v1').then (cache => {
      return cache.addAll (initialCache)
    })
  );
});

self.addEventListener('activate', event => {
  console.log (self.clients.claim ());
});

self.addEventListener ('fetch', event => {
  
  console.log (event);

  if (event.request.method.toLowerCase () !== 'get') return;
  
  event.respondWith (
    (async () => {
      let cache = await caches.open ('v1');
      let match = await cache.match (event.request);
      event.waitUntil (cache.add (event.request));
      return !!match ? match : fetch (event.request);
    }) ()
  );
});