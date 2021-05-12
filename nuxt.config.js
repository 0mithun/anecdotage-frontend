require('dotenv').config();
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Anecdotage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.bundle.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js'
      },
      {
        src:
          'https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js'
      }

    ]
  },


  loading: { color: '#007bff', height:'5px' },
  css: ['@/assets/scss/main.scss'],

  plugins: [
    '~plugins/vform',
    '~components/_global',
    '~/plugins/strPlural',
    '~/plugins/formatCounts',
    '~/plugins/fromNow',
    '~/plugins/toastNotification',
    '~/plugins/swal',
    '~/plugins/vselect',
    '~/plugins/uiv',
    '~/plugins/echo',
    '~/plugins/chatscroll',
    // '~/plugins/loading',//not using
    { src: '~/plugins/gmaps', ssr: false },
    // { src: '~/plugins/vueat', ssr: false },
  ],

  buildModules: ['@nuxtjs/router',
    [
      '@nuxtjs/laravel-echo',
      {
        broadcaster: 'pusher',
        key: process.env.PUSHER_APP_KEY,
        cluster: process.env.PUSHER_APP_CLUSTER,
        encrypted: false,
        wsHost: process.env.WEBSOCKET_BASE_URL,
        authEndpoint: process.env.API_URL + '/broadcasting/auth',
        wsPort: 6001,
        wssPort: 6001,
        disableStats: true,
        forceTLS: false,
        enabledTransports: ["ws", "wss"],
      }
    ]
  ],
  echo: {
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true
  },

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',

  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get', propertyName: 'data' },
          // user: { url: '/me', method: 'get', propertyName: false }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },

  axios: {
    baseURL: process.env.API_URL,
    // debug: true
  },

  build: {
    // babel: {
    //   presets({isServer}) {
    //     const targets = isServer ? { node: 'current' } : { ie: 11 }
    //     return [
    //       [ require.resolve("@babel/preset-env"), { targets }  ]
    //     ]
    //   },
    //   plugins: [
    //     "@babel/syntax-dynamic-import",
    //     "@babel/transform-runtime",
    //     "@babel/transform-async-to-generator"
    //   ]
    // },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },


    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }
  }
};
