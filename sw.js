const initialCache = [
  '/journal/',
  '/journal/?page=settings',
  '/journal/?page=journal',
  '/journal/?page=write',
  '/journal/?page=skills',
  'static/js/runtime-main.bf081229.js',
  'static/js/2.7a8c1fa3.chunk.js',
  'static/css/main.c2254fcd.chunk.css',
  'static/js/main.1f7ac965.chunk.js',
  '/journal/static/js/2.7a8c1fa3.chunk.js.LICENSE.txt',
  '/journal/static/media/book.65cd22a3.svg',
  '/journal/static/media/calendar.0073112f.svg',
  '/journal/static/media/cancel.da5c4222.svg',
  '/journal/static/media/caret-down.bfd98d54.svg',
  '/journal/static/media/filter.8be2c938.svg',
  '/journal/static/media/minus.88ead845.svg',
  '/journal/static/media/plus.a86e5868.svg',
  '/journal/static/media/search.28b0ad10.svg',
  '/journal/static/media/settings.d2739024.svg',
  '/journal/static/media/skill.23054f65.svg',
  '/journal/static/media/stopwatch.43421b05.svg',
  '/journal/static/media/trash.dd7f053f.svg'
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