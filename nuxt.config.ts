export default defineNuxtConfig({
  srcDir: "src",
  modules: [
    // [
    //   "nuxt-purgecss",
    //   {
    //     enabled: true,
    //     safelist: [/.*--.*/],
    //   },
    // ],
    "nuxt-swiper",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
  ],

  runtimeConfig: {
    public: {
      app: {
        DEBUG: process.env.NODE_ENV === "development",
      },
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" }, // Вызывает баг при быстром переключении страниц: https://github.com/nuxt/nuxt/issues/12735
    // pageTransition: { name: "fade", mode: "default" }, // Оставлю предыдущую настройку, посмотреть, будет ли баг на серваке. В противном случае заменить pageTransition на default
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

  css: ["@/assets/styles/_config.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_colors.scss" as *;',
        },
      },
    },
  },
});
