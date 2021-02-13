const initialCache = [
  '/journal/',
  '/journal/?page=settings',
  '/journal/?page=journal',
  '/journal/?page=write',
  '/journal/?page=skills'
]
let online = true;

self.addEventListener ('message', event => {
  console.log (event);
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
  console.log (self.clients.claim ());
});

self.addEventListener ('fetch', event => {
  
  console.log (event, online);

  if (event.request.method.toLowerCase () !== 'get') return;
  
  event.respondWith (
    (async () => {
      let cache = await caches.open ('v1');
      let match = await cache.match (event.request);
      try {
        if (!online) throw '';
        event.waitUntil (cache.add (event.request));
      } catch (e) {
        console.log (e);
      }
      return !!match ? match : fetch (event.request);
    }) ()
  );
});