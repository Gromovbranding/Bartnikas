const BASE_URL_API = "https://api.stanislavbartnikas.com";

export default defineNuxtConfig({
  srcDir: "src",
  modules: [
    [
      "@element-plus/nuxt",
      {
        importStyle: "css",
      },
    ],
    "nuxt-swiper",
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: BASE_URL_API,
      apiFilesUrl: BASE_URL_API + "/files",
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
