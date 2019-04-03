importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/23699267dfc2095e3bfe.js",
    "revision": "027d8468a77a4c07c2069ba0e4766638"
  },
  {
    "url": "/_nuxt/26301c9267581d48abc6.js",
    "revision": "85e90d0fa1c8c6e52ca7401a90d506dc"
  },
  {
    "url": "/_nuxt/333fe8eea3b80ebf2152.js",
    "revision": "1014d1dd5ff7cb9d6357bce0c34406c1"
  },
  {
    "url": "/_nuxt/336b7dfd95845d778b09.js",
    "revision": "a565cee295e4914cb857f72ec285991a"
  },
  {
    "url": "/_nuxt/9fb0e26e8d8647633b08.js",
    "revision": "f38925d93eb23e182618f47f92e4d6e9"
  },
  {
    "url": "/_nuxt/a3b69b1bb57e43d3429e.js",
    "revision": "328d530a5f431fc14ba839d5e7d1a7f9"
  },
  {
    "url": "/_nuxt/ee27d4d4b5898e52f4a0.js",
    "revision": "01be295ae734563752f6e721a45a5110"
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
