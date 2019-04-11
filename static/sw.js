importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0ffeac052615ce386a74.js",
    "revision": "9ad86c256999bec6bae76161cf602285"
  },
  {
    "url": "/_nuxt/3d04aabfd3a13344c479.js",
    "revision": "1bb1aa6e4f2a2bc35a701528f6ef48d8"
  },
  {
    "url": "/_nuxt/7c4ff86e27389e33985d.js",
    "revision": "f316168b5124baf5d55a0a303d8ba05f"
  },
  {
    "url": "/_nuxt/8008ad8f3e4aa78d72d2.js",
    "revision": "46413ab2cdffaea97b2eb74001526d7c"
  },
  {
    "url": "/_nuxt/91ca5acc3d20a6b48aa7.js",
    "revision": "cd493b28087e19fb81130f06bd2f8547"
  },
  {
    "url": "/_nuxt/af65e825ca264b039013.js",
    "revision": "be0435070b34196d3eb2ef81fc30a9fe"
  },
  {
    "url": "/_nuxt/b55dad3a4d64f6181fc3.js",
    "revision": "0eec93fdc1c90438bae742ac5a0a1e49"
  },
  {
    "url": "/_nuxt/b70602c791391da9917c.js",
    "revision": "63a580aebdcdd847310f490086329196"
  },
  {
    "url": "/_nuxt/c88cc1ed4b45d51e63f2.js",
    "revision": "28bc967c33521f282e92fb8a0af82f6f"
  },
  {
    "url": "/_nuxt/d5c132e6368043bb9113.js",
    "revision": "46733084f886c31af8449048c05fbfe2"
  },
  {
    "url": "/_nuxt/dcdf2ae5241be478c663.js",
    "revision": "65ecead9961fe2089a615c1f8bce5d48"
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
