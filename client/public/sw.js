// on install
self.addEventListener ('install', event => {
  event.waitUntil (caches.open ('v1'));
});

self.addEventListener('activate', event => {
  console.log ('activated');
});

self.addEventListener('fetch', event => {
  event.respondWith (
    caches.open ('v1').then (function (cache) {
      return cache.match (event.request).then (function (matching) {
        if (matching) return matching;
        return fetch (event.request).then (response => {
          return response;
        });
      })
    })
  );

  event.waitUntil (
    caches.open ('v1').then (function (cache) {
      return fetch(event.request).then (function (response) {
        return cache.put (event.request, response);
      });
    })
  )
});