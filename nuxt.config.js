require('dotenv').config();

const axios =  require('axios')

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
      // {
      //   hid: 'description',
      //   name: 'description',
      //   content: process.env.npm_package_description || ''
      // }
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://code.jquery.com/jquery-3.5.1.slim.min.js',
          defer: true
      },
      {
        src:
          'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
          defer: true
      },
      {
        src:
          'https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js',
          defer: true
      },
    ]
  },


  loading: { color: '#007bff', height:'5px' },
  css: ['@/assets/scss/main.scss'],
  serverMiddleware:[
    '~/serverMiddleware/headers.js'
  ],
  render: {
    // Setting up cache for 'static' directory - a year in milliseconds
    // https://web.dev/uses-long-cache-ttl
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
  },

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
    '@nuxtjs/robots',
    ['nuxt-lazy-load', {
      // Your options
      defaultImage: '/lazy.gif',
      directiveOnly: true
    }],
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap',
  ],



  sitemap: {
    // hostname: 'https://example.com',
    gzip: true,
    exclude: [
      '/admin/**'
    ],
    routes: async ()=>{
     let staticRoutes = [
        '/',
        '/faq',
        '/tos',
        '/privacy',
        '/contact',
        '/login',
        '/register',
        '/anecdotes/maps',
        '/anecdotes/rated',
        '/anecdotes/trending',
        '/anecdotes/viewed',
        '/anecdotes/recent',
        '/anecdotes/closest',
        '/anecdotes/video',
      ];

      // let {data}  = await axios.get(`${process.env.API_URL}/threads`);
      // const threadRoutes = data.data.map(item=> `/anecdotes/${item.slug}`)

      // let tags  = await axios.get(`${process.env.API_URL}/tags`);
      // const tagsRoutes = tags.data.map(item=> `/tags/${item}`)
      // return [...staticRoutes, ...threadRoutes, ...tagsRoutes];

      let threads  = await axios.get(`${process.env.API_URL}/sitemap/threads`);
      const threadRoutes = threads.data.map(item=> `/anecdotes/${item}`)
      return threadRoutes;


    }
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    autoTracking: {
      screenview: true
    }
  },

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
  robots: [
    {
      UserAgent: 'PetalBot',
      Disallow: '/',
    },
    {
      UserAgent: 'MJ12bot',
      Disallow: '/',
    },
    {
      UserAgent: 'Bytespider',
      Disallow: '/',
    },
    {
      UserAgent: '*',
      Disallow: ['/admin','/profile','/api/*'],
    },
  ],

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
    },


  }
};
