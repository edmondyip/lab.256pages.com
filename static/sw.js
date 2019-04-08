importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/2a570312ad9938cac7cf.js",
    "revision": "e42cff86fd9b9ebe09433755ce1cd528"
  },
  {
    "url": "/_nuxt/715c62c0df270e34e23e.js",
    "revision": "015cae3133fc15ffbeb99db33e20afdd"
  },
  {
    "url": "/_nuxt/807437e823a3eb5c1182.js",
    "revision": "76981b4aa1360f98cf01ba29ca3ea3ce"
  },
  {
    "url": "/_nuxt/969e3ce583019d49559e.js",
    "revision": "4596d5ca1cdabe8b8b6cc87385e09b2d"
  },
  {
    "url": "/_nuxt/98b3cd9290eace0c8e9e.js",
    "revision": "cbe2adffc7fb9167006bb2e9400a56c4"
  },
  {
    "url": "/_nuxt/9fc33d73b2a35ddf2b91.js",
    "revision": "f7dd9292234e5f6459d6762f56abf11d"
  },
  {
    "url": "/_nuxt/bebad695c33559cbe852.js",
    "revision": "b6d8d3d8ad26485910059d00a99d9343"
  },
  {
    "url": "/_nuxt/e8c8c59db989d10165ca.js",
    "revision": "4f001a378b883a99041383068515fd69"
  }
], {
  "cacheId": "webgl",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
