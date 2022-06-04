export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'server',
  head: {
    title: 'SkillsMaster',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    'animate.css/animate.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/helpers' },
    { src: '~/plugins/crypto' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    prefetch: true,
    families: {
      Montserrat: true,
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit',
    ['cookie-universal-nuxt'],
  ],
  markdownit: {
    runtime: true // Support `$md()`
  },
  apollo: {
    tokenName: process.env.NUXT_ENV_COOKIE_NAME,
    authenticationType: 'Bearer',
    clientConfigs: {
      default: '~/apollo/client-configs/default.js',
      appMainClient: {
        httpEndpoint: process.env.BASE_URL + '/graphql',
      },
    },
    errorHandler: '~/apollo/customErrorHandler.js',
    cookieAttributes: {
      /**
       * Define when the cookie will be removed. Value can be a Number
       * which will be interpreted as days from time of creation or a
       * Date instance. If omitted, the cookie becomes a session cookie.
       */
      expires: 7,

      /**
       * Define the path where the cookie is available. Defaults to '/'
       */
      path: '/',

      /**
       * Define the domain where the cookie is available. Defaults to
       * the domain of the page where the cookie was created.
       */
      domain: process.env.NUXT_ENV_COOKIE_DOMAIN,

      /**
       * A Boolean indicating if the cookie transmission requires a
       * secure protocol (https). Defaults to false.
       */
      secure: false,
    },
  },
  router: {
    middleware: ['global-auth']
  },

  proxy: {
    '/graphql': {target: process.env.NUXT_ENV_API_URL, pathRewrite:{
        '^/graphql':'/'
      }}
  },

  bootstrapVue: {
    icons: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true
    }
  },
  generate: {
    fallback: true
  }
}
