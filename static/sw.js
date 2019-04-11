importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0f118db0220647ed2d77.js",
    "revision": "f57a729e8fafb44e3370f472f08ed510"
  },
  {
    "url": "/_nuxt/3d651a613d8e855306d6.js",
    "revision": "bd809bc18fa9829f421496e0c3d0aa8c"
  },
  {
    "url": "/_nuxt/53e12ae4c7ea2d33ee26.js",
    "revision": "483b3597d6721731f24c9d38739f65c3"
  },
  {
    "url": "/_nuxt/7dfac1bf8a428e7ff4d2.js",
    "revision": "a957be7bfa891e3961a7e9b036045323"
  },
  {
    "url": "/_nuxt/82d7692c037ce7f5688d.js",
    "revision": "c5a7ab458ec8092d1f71a7ee364384e8"
  },
  {
    "url": "/_nuxt/995e4330905fca7c5d90.js",
    "revision": "d31c2aac64d119309f24ca31367a43fc"
  },
  {
    "url": "/_nuxt/a8a36e5df4e44c8f216b.js",
    "revision": "dc50df64e54ac788b84e52c660bd457d"
  },
  {
    "url": "/_nuxt/c8c6be057e8447e1d726.js",
    "revision": "721d5e917a0c2d1fa37368a759eacddd"
  },
  {
    "url": "/_nuxt/d293fa15b067a22c3949.js",
    "revision": "4bb51e9fb6558f065b091c2f54259d5b"
  },
  {
    "url": "/_nuxt/dc31fef80c344150dfe6.js",
    "revision": "348be444e8684966a52a896180821e97"
  },
  {
    "url": "/_nuxt/e9c02e47ed45c4c199c4.js",
    "revision": "78c3588ecdd539c987c0c820b116e91e"
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
