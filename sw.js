const VERSION = '52940cf0831a';
const PRECACHE = ["./aluno/index.html","./aluno/manifest.webmanifest","./assets/aluno-moHtSidY.js","./assets/bricolage-grotesque-latin-ext-wght-normal-CcLUaPy7.woff2","./assets/bricolage-grotesque-latin-wght-normal-DLoelf7F.woff2","./assets/bricolage-grotesque-vietnamese-wght-normal-BUzh504Q.woff2","./assets/dm-sans-latin-ext-wght-normal-BOFOeGcA.woff2","./assets/dm-sans-latin-wght-normal-Xz1IZZA0.woff2","./assets/esm-BWjMRdXy.js","./assets/esm-BoqSdm9E.js","./assets/esm-C3sv9uhP.js","./assets/esm-C8JLoPc3.js","./assets/esm-DJu-V8V2.js","./assets/esm-Diw7x-80.js","./assets/esm-OEgFwCMs.js","./assets/gestao-DWSKd61-.js","./assets/main-DcnhdrE1.js","./assets/main-Du3UR_l5.css","./assets/web-BANTRTBE.js","./assets/web-BH6g6eIE.js","./assets/web-BtpqialC.js","./assets/web-CuykPr2y.js","./assets/web-D--8JqQK.js","./assets/web-DfRgSNFX.js","./assets/web-DiA5pQzu.js","./gestao/index.html","./gestao/manifest.webmanifest","./icons/aluno-180.png","./icons/aluno-192.png","./icons/aluno-32.png","./icons/aluno-512.png","./icons/aluno-maskable-512.png","./icons/aluno.svg","./icons/coach-180.png","./icons/coach-192.png","./icons/coach-32.png","./icons/coach-512.png","./icons/coach-maskable-512.png","./icons/coach.svg","./index.html","./gestao/","./aluno/","./"];
const LAZY = ["./assets/pdf-ULJPBbF3.js","./assets/pdf.worker.min-CjEcRF4W.mjs","./assets/pdf.worker.min-DI4FfYVf.js"];
const CACHE = 'tunofit-' + VERSION;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('tunofit-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
    .then(() => caches.open(CACHE)).then(c => c.addAll(LAZY)).catch(() => undefined));
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req, { ignoreSearch: true, ignoreVary: true }).then(r => r || caches.match(new URL('index.html', req.url).href, { ignoreVary: true }))));
    return;
  }
  event.respondWith(caches.match(req, { ignoreSearch: true, ignoreVary: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
