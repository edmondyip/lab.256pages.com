importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/1be57224ca16c1062ca4.js",
    "revision": "b67fbc699ea08fa61d2b11cee43cdc52"
  },
  {
    "url": "/_nuxt/4ffe60ca3716e42fc8a6.js",
    "revision": "7fa4addefed4db53da854918a32381fc"
  },
  {
    "url": "/_nuxt/74f700b704526bf3796c.js",
    "revision": "d9a114fa86845b37a9a3a5cc3eb79291"
  },
  {
    "url": "/_nuxt/b7323ccf1a67d221a156.js",
    "revision": "55c959eafaaa91098f675711b3b46b08"
  },
  {
    "url": "/_nuxt/bc3938db777b1a1c44ca.js",
    "revision": "63c313fb95ce2fe45c912a1992daee9e"
  },
  {
    "url": "/_nuxt/d00bee57d3daf0c67727.js",
    "revision": "95cd6bdd23e21723c4ea8c0f5dd0d017"
  },
  {
    "url": "/_nuxt/e9634433b2a87fef24e5.js",
    "revision": "77123ab450c19a042d0d519b0a0aadc0"
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
