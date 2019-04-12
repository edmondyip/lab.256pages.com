importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0c1ebd7d5731e9f72c88.js",
    "revision": "f57afc5c4ad7c9575f3f199bb18f3535"
  },
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
    "url": "/_nuxt/85ba82b111b9b4359cd4.js",
    "revision": "141fb0783961b0cf0630e848964a0b9c"
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
    "url": "/_nuxt/b5c1caff2b7a471035de.js",
    "revision": "baeee57d6d0de8262993e9c87d243ef2"
  },
  {
    "url": "/_nuxt/c88cc1ed4b45d51e63f2.js",
    "revision": "28bc967c33521f282e92fb8a0af82f6f"
  },
  {
    "url": "/_nuxt/cc186c0864eda5161564.js",
    "revision": "d651656cf3102d3f21801e97ce7a9a4d"
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
