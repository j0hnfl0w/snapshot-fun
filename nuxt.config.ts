export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: ''
    } 
  },
  app: {
    head: {
      title: 'snapshot-fun'
    }
  },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  build: {
    transpile: ["@urql/vue"]
  },
  telemetry: false
})
