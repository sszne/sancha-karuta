import colors from "vuetify/es5/util/colors";
require("dotenv").config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // base: {
    //   href: "router.base"
    // },
    titleTemplate: "%s - 3cha-karuta",
    title: "3cha-karuta",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "三茶WORK2周年記念企画！三茶の日常をカルタにしよう！あまりにも面白くなったら本当のカルタになる！かも！"
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "さんちゃかるた"
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://3chawork.tokyo/sancha-karuta/"
      },
      { hid: "og:title", property: "og:title", content: "さんちゃかるた" },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "三茶WORK2周年記念企画！三茶の日常をカルタにしよう！あまりにも面白くなったら本当のカルタになる！かも！"
      },
      { hid: "og:image", property: "og:image", content: "ogp-main.png" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }]
  },
  // router: {
  //   base: "/sancha-karuta/",
  //   trailingSlash: true
  // },
  // build: {
  //   publicPath: "/"
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/common.css",
    "~/assets/css/custom.css",
    "~/assets/css/reset.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/firebase" },
    { src: "~/plugins/kanaList" },
    { src: "~/plugins/vue-social-sharing" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  ssr: false,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [["nuxt-webfontloader"]],
  webfontloader: {
    google: {
      families: ["Noto+Serif+JP:wght@100;300;400;500;700;900"]
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  moment: {
    locales: ["ja"]
  },
  publicRuntimeConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  }
};
