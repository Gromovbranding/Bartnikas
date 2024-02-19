const DEV_BASE_API_URL = 'http://localhost:3000/api'
const PROD_BASE_API_URL = 'https://stanislavbartnikas.com/api'
const BASE_API_FILES = '/files'
const AVAILABLE_LOCALES = [
  { code: 'en', label: 'English', icon: 'en' },
  { code: 'ru', label: 'Русский', icon: 'ru' },
  { code: 'fr', label: 'Français', icon: 'fr' },
  { code: 'de', label: 'Deutsche', icon: 'de' }
]
export default defineNuxtConfig({
  srcDir: 'src',
  modules: [
    '@nuxt/image',
    'nuxt-swiper',
    [
      '@element-plus/nuxt',
      {
        importStyle: 'css'
      }
    ],
    [
      '@nuxtjs/i18n',
      {
        skipSettingLocaleOnNavigate: true,
        vueI18n: './src/packages/i18n.ts',
        locales: AVAILABLE_LOCALES,
        defaultLocale: 'en',
        detectBrowserLanguage: {
          alwaysRedirect: true,
          fallbackLocale: 'en',
          cookieSecure: true,
          useCookie: true
        }
      }
    ]
  ],

  $development: {
    runtimeConfig: {
      public: {
        apiBaseUrl: DEV_BASE_API_URL,
        apiFilesUrl: `${DEV_BASE_API_URL}${BASE_API_FILES}`
      }
    },
    image: {
      domains: [DEV_BASE_API_URL],
      alias: {
        baseApiFiles: `${DEV_BASE_API_URL}${BASE_API_FILES}`
      }
    }
  },

  $production: {
    runtimeConfig: {
      public: {
        apiBaseUrl: PROD_BASE_API_URL,
        apiFilesUrl: `${PROD_BASE_API_URL}${BASE_API_FILES}`
      }
    },
    image: {
      domains: [PROD_BASE_API_URL],
      alias: {
        baseApiFiles: `${PROD_BASE_API_URL}${BASE_API_FILES}`
      }
    }
  },

  runtimeConfig: {
    public: {
      avaiableLocales: AVAILABLE_LOCALES
    }
  },

  image: {
    format: ['webp', 'avif', 'png', 'jpg', 'jpeg', 'svg']
  },

  routeRules: {
    '/admin/': { redirect: '/admin/projects', ssr: false },
    '/cart': { redirect: '/', ssr: false },
    '/checkout': { redirect: '/', ssr: false },
    '/payment': { redirect: '/', ssr: false },
    '/admin/delivery-static': { redirect: '/admin/projects', ssr: false },
    '/admin/media/cv': { redirect: '/admin/projects', ssr: false }
  },

  devServer: {
    port: 5173,
    host: '127.0.0.1'
  },

  app: {
    // pageTransition: { name: "page", mode: "out-in" },
    rootTag: 'div',
    head: {
      titleTemplate: '%s | Bartnikas',
      meta: [
        { 'http-equiv': 'x-ua-compatible', content: 'true' },
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'
        },
        { name: 'HandheldFriendly', content: 'true' },
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  build: {
    transpile:
      process.env.npm_lifecycle_event === 'build' ? ['element-plus'] : []
  },

  experimental: {
    scanPageMeta: true,
    cookieStore: true
  },

  nitro: {
    compressPublicAssets: true,
    preset: 'node-server'
  },

  devtools: {
    enabled: false
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/_colors.scss" as *;
          `
        }
      }
    }
  }
})
