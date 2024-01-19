const DEV_BASE_API_URL = "http://localhost:8080";
const PROD_BASE_API_URL = "https://api.stanislavbartnikas.com";
const BASE_API_FILES = "/files";

export default defineNuxtConfig({
  srcDir: "src",
  modules: [
    [
      "@element-plus/nuxt",
      {
        importStyle: "css",
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        vueI18n: "./src/packages/i18n.ts",
        locales: ["ru", "en", "fr", "de"],
        defaultLocale: "en",
      },
    ],
    "@nuxt/image",
    "nuxt-swiper",
  ],

  $development: {
    runtimeConfig: {
      public: {
        apiBaseUrl: DEV_BASE_API_URL,
        apiFilesUrl: `${DEV_BASE_API_URL}${BASE_API_FILES}`,
      },
    },
    image: {
      domains: [DEV_BASE_API_URL],
      alias: {
        baseApiFiles: `${DEV_BASE_API_URL}${BASE_API_FILES}`,
      },
    },
  },

  $production: {
    runtimeConfig: {
      public: {
        apiBaseUrl: PROD_BASE_API_URL,
        apiFilesUrl: `${PROD_BASE_API_URL}${BASE_API_FILES}`,
      },
    },
    image: {
      domains: [PROD_BASE_API_URL],
      alias: {
        baseApiFiles: `${PROD_BASE_API_URL}${BASE_API_FILES}`,
      },
    },
  },

  image: {
    format: ["webp", "avif", "png", "jpg", "jpeg", "svg"],
  },

  routeRules: {
    "/admin/": { redirect: "/admin/projects", ssr: false },
    "/cart": { redirect: "/", ssr: false },
    "/checkout": { redirect: "/", ssr: false },
    "/payment": { redirect: "/", ssr: false },
    "/admin/delivery-static": { redirect: "/admin/projects", ssr: false },
    "/admin/media/cv": { redirect: "/admin/projects", ssr: false },
  },

  app: {
    // pageTransition: { name: "page", mode: "out-in" },
    rootTag: "div",
    head: {
      titleTemplate: `%s | Bartnikas`,
      meta: [
        { "http-equiv": "x-ua-compatible", content: "true" },
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no",
        },
        { name: "HandheldFriendly", content: "true" },
        {
          hid: "description",
          name: "description",
          content: "",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  build: {
    transpile:
      process.env.npm_lifecycle_event === "build" ? ["element-plus"] : [],
  },

  nitro: {
    preset: "node-cluster",
  },

  devtools: {
    enabled: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/_colors.scss" as *;
          `,
        },
      },
    },
  },
});
