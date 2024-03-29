// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  app: {
    baseURL: '/editor-slash-command/',
    head: {
      script: []
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt'
  ]
})
