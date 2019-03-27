importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/6dbbf05ecae94fd2e1da.js",
    "revision": "ea055063a14af095ad7b4da7efe3793a"
  },
  {
    "url": "/_nuxt/93a419f38e2caab54ee3.js",
    "revision": "4aca993db7c99264d543b0c07e6e33a7"
  },
  {
    "url": "/_nuxt/aaa875cc133507a3909f.js",
    "revision": "268e92654e3f2aab479b25545501adba"
  },
  {
    "url": "/_nuxt/ad995e31aef412870582.js",
    "revision": "68a40d53482ecddb66ab45457eb5a667"
  },
  {
    "url": "/_nuxt/b21ae6cfe5aedcf5a4b0.js",
    "revision": "de13be2fbf2c5336925d1d4f04df6631"
  },
  {
    "url": "/_nuxt/f939eea88fd64d13a43f.js",
    "revision": "73e080a720ad5a96b8b76800b76e436a"
  },
  {
    "url": "/_nuxt/f9dcd8951d4d00ac816f.js",
    "revision": "ad34af1e30a91170f5bba8d430988e56"
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
