// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',

//   ssr: true,

//   modules: [
//     '@nuxtjs/sitemap',
//     '@nuxtjs/robots',
//     '@nuxt/image',
//     '@nuxtjs/tailwindcss'
//   ],
//     tailwindcss: {
//     // optional config
//     cssPath: '~/assets/css/tailwind.css',
//     viewer: false, // optional: disable Tailwind viewer
//   },

//   nitro: {
//     prerender: {
//       crawlLinks: true,
//       routes: ['/']
//     }
//   },

//   routeRules: {
//     '/**': { static: true }
//   },
// })

export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: '/Albay-Frontend/'
  },

  nitro: {
    preset: 'static'
  },

  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  site: {
    url: 'https://hunter123322.github.io/Albay-Frontend/'
  }
})
