export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'open-supplier-database',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://www.jsdelivr.com/package/npm/vue-place-autocomplete',
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDHL-FHcfS_ZS5RrlZxvKSoT42-gTCxy_M&libraries=places"
      }
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
      {src: '~/plugins/vue-place-autocomplete.js', ssr: false},
      {src: '~/plugins/vue-multiselect.js', ssr: false},
      { src: '~plugins/vue-google-autocomplete', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    BaseURL: 'api/api/'
  },
  proxy: {
    '/api/api/': 'http://localhost:3000'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'vue-place-autocomplete', 'VuePlaceAutocomplete', 'vue-google-autocomplete'
    ]
  },
  
}
