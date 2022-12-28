const APP_NAME = "Bartnikas";

export default defineNuxtConfig({
    srcDir: "src",
    modules: [
        "nuxt-purgecss",
        [
            "@nuxtjs/google-fonts", {
                // families: {
                //     'HelveticaNeue': {
                //         wght: [400, 500, 600],
                //     },
                // },
            }
        ],
    ],

    runtimeConfig: {
        public: {
            app: {
                DEBUG: process.env.NODE_ENV === "development",
            },
        },
    },

    app: {
        head: {
            title: APP_NAME,
            titleTemplate: `%s | ${APP_NAME}`,
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
                    content: APP_NAME,
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