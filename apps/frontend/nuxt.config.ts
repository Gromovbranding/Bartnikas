const APP_CONFIG = {
  DEV_BASE_API_URL: 'http://localhost:3000/api',
  PROD_BASE_API_URL: 'https://stanislavbartnikas.com/api',
  BASE_API_FILES: '/files',
  AVAILABLE_LOCALES: [
    { code: 'en', label: 'English', icon: 'en' },
    { code: 'ru', label: 'Русский', icon: 'ru' },
    { code: 'fr', label: 'Français', icon: 'fr' },
    { code: 'de', label: 'Deutsche', icon: 'de' }
  ],
  DOMAIN: 'https://stanislavbartnikas.com'
}
export default defineNuxtConfig({
  srcDir: 'src',
  modules: [
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    [
      'nuxt-swiper', {
        modules: [
          'thumbs',
          'autoplay',
          'effect-fade',
          'mousewheel'
        ],
        styleLang: 'scss'
      }
    ],
    [
      '@element-plus/nuxt',
      {
        importStyle: 'scss'
      }
    ],
    [
      '@nuxtjs/i18n',
      {
        skipSettingLocaleOnNavigate: true,
        vueI18n: './src/packages/i18n.ts',
        locales: APP_CONFIG.AVAILABLE_LOCALES,
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
        apiBaseUrl: APP_CONFIG.DEV_BASE_API_URL,
        apiFilesUrl: `${APP_CONFIG.DEV_BASE_API_URL}${APP_CONFIG.BASE_API_FILES}`
      }
    },
    image: {
      domains: [APP_CONFIG.DEV_BASE_API_URL],
      alias: {
        baseApiFiles: `${APP_CONFIG.DEV_BASE_API_URL}${APP_CONFIG.BASE_API_FILES}`
      }
    }
  },

  $production: {
    runtimeConfig: {
      public: {
        apiBaseUrl: APP_CONFIG.PROD_BASE_API_URL,
        apiFilesUrl: `${APP_CONFIG.PROD_BASE_API_URL}${APP_CONFIG.BASE_API_FILES}`
      }
    },
    image: {
      domains: [APP_CONFIG.PROD_BASE_API_URL],
      alias: {
        baseApiFiles: `${APP_CONFIG.PROD_BASE_API_URL}${APP_CONFIG.BASE_API_FILES}`
      }
    }
  },

  site: {
    url: APP_CONFIG.DOMAIN
  },

  sitemap: {
    exclude: [
      '/admin/**',
      '/cart/**'
    ]
  },

  runtimeConfig: {
    public: {
      avaiableLocales: APP_CONFIG.AVAILABLE_LOCALES,
      DOMAIN: APP_CONFIG.DOMAIN
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
    rootTag: 'div',
    head: {
      titleTemplate: '%s | Bartnikas',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'description', content: '' },
        {
          name: 'viewport',
          content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
        },
        { name: 'HandheldFriendly', content: 'true' },
        { name: 'theme-color', content: '#fff' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site:name', content: 'StanislavBartnikas' },
        { property: 'og:description', content: '' }
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
