importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/02f826ea6601e48ca4f5.js",
    "revision": "5dc5a29dbe0ac11b877b6905a8b6d84e"
  },
  {
    "url": "/_nuxt/0f118db0220647ed2d77.js",
    "revision": "f57a729e8fafb44e3370f472f08ed510"
  },
  {
    "url": "/_nuxt/12787dd24a11798fcecc.js",
    "revision": "cb942e1c35bda2ee69d664dba7f7df89"
  },
  {
    "url": "/_nuxt/3d651a613d8e855306d6.js",
    "revision": "bd809bc18fa9829f421496e0c3d0aa8c"
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
    "url": "/_nuxt/c9561961113b38c7e791.js",
    "revision": "55e4cde43f885c836f6af52555532e43"
  },
  {
    "url": "/_nuxt/dc31fef80c344150dfe6.js",
    "revision": "348be444e8684966a52a896180821e97"
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
