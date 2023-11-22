const BASE_URL_API = "http://localhost:8080";
const BASE_URL_FILES_API = BASE_URL_API + "/files";

export default defineNuxtConfig({
  srcDir: "src",
  modules: [
    [
      "@element-plus/nuxt",
      {
        importStyle: "css",
      },
    ],
    "@nuxt/image",
    "nuxt-swiper",
  ],

  image: {
    format: ["webp", "avif", "png", "jpg", "jpeg", "svg"],
    domains: [BASE_URL_API],
    alias: {
      baseApiFiles: BASE_URL_FILES_API,
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: BASE_URL_API,
      apiFilesUrl: BASE_URL_FILES_API,
    },
  },

  routeRules: {
    "/admin/": { redirect: "/admin/projects", ssr: false },
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
