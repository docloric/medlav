// MedLav Service Worker v2 — percorsi corretti per /medlav/
const CACHE = 'medlav-v2';
const ASSETS = [
  '/medlav/',
  '/medlav/index.html',
  '/medlav/manifest.json',
  '/medlav/icon-192.png',
  '/medlav/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/medlav/index.html')))
  );
});
