export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: ''
    } 
  },
  app: {
    head: {
      title: 'snapshot.guess',
      meta: [
        { name: 'description', content: 'Get a random Proposal from snapshot.org and try to guess how people voted.' }
      ],
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
