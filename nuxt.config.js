const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    titleTemplate: '%s - WebGL Lab',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
        minimumScale: '1.0',
        maximumScale: '1.0',
        userScalable: 'no',
        shrinkToFit: 'no',
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffffff',
      }
    ],
    link: [{
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab/svg',
        color: '#5bbad5',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:300|Oswald:300',
      },
    ],
  },
  /*
   ** PWA setting
   */

  manifest: {
    name: 'Real 3D Web Experiment',
    short_name: 'WebGL',
    description: 'Real Time 3D Web Experiment by Edmond Yip',
    display: 'fullscreen',
    lang: "en",
    theme_color: '#F3D03F',
    background_color: '#ffffff',
    icons: [{
        "src": "/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#F3D03F',
    height: "100px"
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/Three.client.js',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    stylus: [
      './assets/css/_mixins.styl',
    ]
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here 
     */
    vendor: ['three', 'three-orbitcontrols', 'postprocessing', 'stats-js'],
    extend(config, ctx) {
      config.performance = config.performance || {}
      config.performance.maxEntrypointSize = 1200 * 1024
      config.performance.maxAssetSize = 700 * 1024
    },
  }
}