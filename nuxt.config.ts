export default defineNuxtConfig({
    srcDir: "src",
    modules: [
        ["nuxt-purgecss", {
            enabled: true,
            safelist: ['page-headline--grey', 'page-headline--blue']
        }],
    ],

    runtimeConfig: {
        public: {
            app: {
                DEBUG: process.env.NODE_ENV === "development",
            },
        },
    },

    app: {
        pageTransition: true,
        rootTag: 'main',
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
                    content: '',
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