// Service Worker for Islamic Tasbih App
const CACHE_NAME = 'islamic-tasbih-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/mosque1.jpg',
    '/mosque2.jpg',
    '/mosque3.png',
    '/quran1.jpg',
    '/quran2.jpg',
    '/quran3.jpg',
    'https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Cairo:wght@300;400;600;700;800&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});

