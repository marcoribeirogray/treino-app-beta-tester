const VERSION = 'd2fde04c5c87';
const PRECACHE = ["./aluno/index.html","./aluno/manifest.webmanifest","./assets/aluno-IigF496O.js","./assets/barlow-condensed-latin-600-normal-BFJEwTuo.woff","./assets/barlow-condensed-latin-600-normal-DepVgxBB.woff2","./assets/barlow-condensed-latin-700-normal-Dmwat-ge.woff","./assets/barlow-condensed-latin-700-normal-v1xN8_Wq.woff2","./assets/barlow-condensed-latin-ext-600-normal-18ESti3H.woff2","./assets/barlow-condensed-latin-ext-600-normal-Clv9cIcR.woff","./assets/barlow-condensed-latin-ext-700-normal-BIHFfxf0.woff","./assets/barlow-condensed-latin-ext-700-normal-CwuXbfVR.woff2","./assets/barlow-condensed-vietnamese-600-normal-A5AYRdjN.woff2","./assets/barlow-condensed-vietnamese-600-normal-CNlPk46_.woff","./assets/barlow-condensed-vietnamese-700-normal-DYeBwlKR.woff2","./assets/barlow-condensed-vietnamese-700-normal-DhIzd8Tb.woff","./assets/barlow-latin-400-normal-fsAxiSwU.woff","./assets/barlow-latin-400-normal-qiz4-Cze.woff2","./assets/barlow-latin-500-normal-BPAOfeC8.woff2","./assets/barlow-latin-500-normal-C1h8hMer.woff","./assets/barlow-latin-600-normal-CNwfPWQD.woff","./assets/barlow-latin-600-normal-DILqtrty.woff2","./assets/barlow-latin-ext-400-normal-CvBsJvxq.woff","./assets/barlow-latin-ext-400-normal-HxX4XjxC.woff2","./assets/barlow-latin-ext-500-normal-CJPcKP2Q.woff","./assets/barlow-latin-ext-500-normal-DOaysfXq.woff2","./assets/barlow-latin-ext-600-normal-B8NK_A3D.woff2","./assets/barlow-latin-ext-600-normal-DMVRjfRT.woff","./assets/barlow-vietnamese-400-normal-BFeobeCK.woff","./assets/barlow-vietnamese-400-normal-Dpl4UHAZ.woff2","./assets/barlow-vietnamese-500-normal-GNfB7rCE.woff","./assets/barlow-vietnamese-500-normal-zTViEIzf.woff2","./assets/barlow-vietnamese-600-normal-CA_GiK2e.woff","./assets/barlow-vietnamese-600-normal-DcjprdFV.woff2","./assets/esm-BH3olbrh.js","./assets/esm-BImmrbnL.js","./assets/esm-BO4tPxlU.js","./assets/esm-CJYDdkX-.js","./assets/esm-Ct6uzsTf.js","./assets/esm-DqNXD3Wl.js","./assets/esm-bjueloS7.js","./assets/gestao-GaRGIjod.js","./assets/index-Dr3JkNbj.css","./assets/main-CicesQc4.js","./assets/main-DFlRScut.css","./assets/polyfills-CWa_hb_g.js","./assets/web-B1Lp16RA.js","./assets/web-B8GI0jZu.js","./assets/web-BSG8xbwc.js","./assets/web-BzdN9XSX.js","./assets/web-CBxEiWS1.js","./assets/web-Ch7IJNra.js","./assets/web-dL_BfWXl.js","./gestao/index.html","./gestao/manifest.webmanifest","./icons/aluno-180.png","./icons/aluno-192.png","./icons/aluno-32.png","./icons/aluno-512.png","./icons/aluno-maskable-512.png","./icons/aluno.svg","./icons/coach-180.png","./icons/coach-192.png","./icons/coach-32.png","./icons/coach-512.png","./icons/coach-maskable-512.png","./icons/coach.svg","./index.html","./gestao/","./aluno/","./"];
const LAZY = ["./assets/pdf-D6J7PVQ0.js","./assets/pdfWorker-BfOnV-7P.js"];
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
  if (new URL(req.url).pathname.endsWith('/version.json')) return;
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
