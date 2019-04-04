importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/27a99e7802b3499b9b80.js",
    "revision": "bdaa26322f5b25becbe89c4245cdc8fb"
  },
  {
    "url": "/_nuxt/9d15aad069aeabfade61.js",
    "revision": "18ac8b9e963361071e1363c99dacefb4"
  },
  {
    "url": "/_nuxt/b0dc1c965084cd4307c8.js",
    "revision": "09c8b300fe34aa2e66808334333a0d08"
  },
  {
    "url": "/_nuxt/bcc649e40175c8418827.js",
    "revision": "758133d6f9a54298975ae0878dcd54e2"
  },
  {
    "url": "/_nuxt/df779eae91998a742da6.js",
    "revision": "298ae6f39ae9dc43387ae8a316d61d8a"
  },
  {
    "url": "/_nuxt/f8044411da287d2b50b8.js",
    "revision": "8627529142472ffc5cf297ed68d0e70b"
  },
  {
    "url": "/_nuxt/ff717ac77341b5331219.js",
    "revision": "6198d57d6368d79dd5a2c0528dda74dc"
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
