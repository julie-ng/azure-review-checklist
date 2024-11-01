// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '~/assets/bulma.scss',
    '~/assets/main.scss'
  ],

  devServer: {
    port: 3300,
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/content'
  ]
})