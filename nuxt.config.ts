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
      apiBaseUrl: "http://localhost:8080",
    },
  },

  routeRules: {
    "/admin/": { redirect: "/admin/projects" },
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

  debug: true,

  logLevel: "silent",

  nitro: {
    preset: "node-cluster",
    logLevel: 5,
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
