const shouldCache = (url, method) => {
  if (method !== 'get') return false;
  let yes = ['http://localhost:3000', 'https://fonts.gstatic.com', 'https://fonts.googleapis.com', 'https://lincoln-howard-jr.github.io/journal', 'https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod'].filter (start => url.startsWith (start));
  console.log (url, method, yes);
  return yes.length > 0;
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
      return fetch (event.request).then (function (response) {
        return cache.put (event.request, response);
      });
    })
  )
});