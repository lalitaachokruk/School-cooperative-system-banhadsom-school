const CACHE_NAME = 'coop-pos-v1';
const urlsToCache = [
    './',
    './index.html',
    'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    'https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore-compat.js',
    'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'
];

// ตอนติดตั้งแอปครั้งแรก ให้โหลดไฟล์สำคัญมาเก็บในเครื่อง
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// กลไก Offline: พยายามดึงจากเน็ตก่อน ถ้าเน็ตหลุด (catch) ให้ดึงจากที่แอบโหลดเก็บไว้มาโชว์แทน
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
