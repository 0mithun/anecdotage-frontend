require('dotenv').config();
const PRIMARY_HOSTS = `anecdotage.com`


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
      // { 'http-equiv':'Content-Security-Policy', content:"default-src *; style-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval'"},
      // { 'http-equiv':'Content-Security-Policy', content:"script-src self 'sha256-bav3DhTTktu5WW6mXc6L9ri8ZwCrRtn2bG3Etd0xzZQ=' 'unsafe-inline';"},

      // {
      //   hid: 'description',
      //   name: 'description',
      //   content: process.env.npm_package_description || ''
      // }
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap', async: true },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css', async: true },
    ],
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
        hid:'ckeditor',
        src:'https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js',
          // async: true,
        defer:true
      },
    ]
  },


  loading: { color: '#007bff', height:'5px' },
  css: ['@/assets/scss/main.scss'],
  render: {
    // Setting up cache for 'static' directory - a year in milliseconds
    // https://web.dev/uses-long-cache-ttl
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
    csp: {
      addMeta: true,
      hashArgorism: 'sha256',
      policies: {
        'default-src': ["'self'"],
        'font-src': ["'self'",PRIMARY_HOSTS, '*.gstatic.com',  '*.googleapis.com'],
        'img-src': [ 'self',  "'unsafe-inline'", '*.google-analytics.com','*.wikimedia.org',  PRIMARY_HOSTS, '*.anecdotage.com'],
        'worker-src': ["'self'", "'unsafe-inline'", `blob:`, PRIMARY_HOSTS,'*.anecdotage.com'],
        'style-src': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS, '*.jsdelivr.net' ,'*.googleapis.com'],
        'style-src-elem': ["'self'", "'unsafe-inline'", PRIMARY_HOSTS, '*.jsdelivr.net' ,'*.googleapis.com'],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          PRIMARY_HOSTS,
          '*.google-analytics.com',
          '*.jquery.com', '*.jsdelivr.net','*.googlesyndication.com',
          '*.doubleclick.net', '*.ezodn.com','*.ckeditor.com','*.google.com',
        ],
        'script-src-elem': [
          "'self'",
          "'unsafe-inline'",
          PRIMARY_HOSTS,
          '*.google-analytics.com',
          '*.jquery.com', '*.jsdelivr.net','*.googlesyndication.com',
          '*.doubleclick.net', '*.ezodn.com','*.ckeditor.com','*.google.com',
        ],
        'connect-src': [PRIMARY_HOSTS,  '*.google-analytics.com', '*.doubleclick.net'],
        'frame-src': [PRIMARY_HOSTS,  '*.google-analytics.com', '*.doubleclick.net','*.adnxs.com'],
        'form-action': ["'self'"],
        // 'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': [PRIMARY_HOSTS],
        // 'report-uri': [
        //   `https://sentry.io/api/<project>/security/?sentry_key=<key>`
        // ]
      }
    }
  },

  plugins: [
    '~plugins/vform',
    '~/plugins/toastNotification',
    '~/plugins/echo',
    { src: '~/plugins/gmaps', ssr: false },

    // '~components/_global',
    // '~/plugins/strPlural',
    // '~/plugins/formatCounts',
    // '~/plugins/fromNow',
    // '~/plugins/chatscroll',
    // '~/plugins/vselect',
    // '~/plugins/uiv',
    // '~/plugins/swal',




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
      },
    ],
    'nuxt-compress'
  ],
  echo: {
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true
  },

  modules: [
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
        '/','/faq','/tos','/privacy','/contact','/login','/register','/anecdotes/maps','/anecdotes/rated','/anecdotes/trending','/anecdotes/viewed','/anecdotes/recent','/anecdotes/closest','/anecdotes/video',
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
      UserAgent: 'SemrushBot',
      Disallow: '/',
    },
    {
      UserAgent: '*',
      Disallow: ['/admin','/profile','/api/*','/?page=1', '/anecdotes/most-viewed/', '/anecdotes/last-viewed/','/anecdotes/top-rated/','/anecdotes/videos/','/anecdotes/closest/','/anecdotes/trending/','/anecdotes/newest/','/anecdotes/emoji/*'],
      //   '/*/?page=1',
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
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
          collapseWhitespace: true,
        removeComments: true
      }
    },


  },
  router: {
    // base: '/subfolder/',
    base: process.env.NODE_ENV === 'dev' ? '/' : '/',
    trailingSlash: true,

  },
};
