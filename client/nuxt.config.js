const webpack = require('webpack')
global.HTMLElement = typeof window === 'undefined' ? Object : window.HTMLElement
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'timetracking',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  modules: [
    '@nuxtjs/font-awesome',
    ['nuxt-buefy', { css: false, defaultIconPack: 'fa', materialDesignIcons: false }],
  ],
  css: [
    '@/assets/scss/app.scss'
  ],
  /*
   ** Plugins
  */
  plugins: [
    { src: '~/directives/directives' },
    { src: '~/plugins/feathers-client', ssr: false },
    { src: '~/plugins/i18n', ssr: true },
    { src: '~/plugins/moment', ssr: true },
  ],
  /*
  ** Build configuration
  */
  build: {
    extractCSS: {
      allChunks: false
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
