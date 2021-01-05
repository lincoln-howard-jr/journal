const shouldCache = (url, method) => {
  let yes = ['http://localhost:3000', 'https://fonts.gstatic.com', 'https://fonts.googleapis.com', 'https://lincoln-howard-jr.github.io/journal'].filter (start => url.startsWith (start)).length > 0;
  return yes || (url.startsWith ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod') && method.toLowerCase () === 'get');
}
// on install
self.addEventListener ('install', event => {
  event.waitUntil (caches.open ('v1').then (cache => {
  }));
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
      if (!shouldCache (event.request.url, event.request.method)) return;
      return fetch(event.request).then (function (response) {
        return cache.put (event.request, response);
      });
    })
  )
});