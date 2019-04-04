const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    titleTemplate: '%s - webGL Lab',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css?family=Noto+Serif+TC',
      // },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:300|Oswald:300',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#ffee00'
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

    }
  }
}