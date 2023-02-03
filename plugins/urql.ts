import { createClient, ssrExchange, dedupExchange, fetchExchange, Client } from '@urql/core';
import { defineNuxtPlugin } from '#app'

const ssrKey = '__URQL_DATA__'

export default defineNuxtPlugin(nuxt => {
  const { vueApp } = nuxt

  const config = useRuntimeConfig()

  const ssr = ssrExchange({
    isClient: process.client
  })

  // when app is created in browser, restore SSR state from nuxt payload
  if (process.client) {
    nuxt.hook('app:created', () => {
      ssr.restoreData(nuxt.payload[ssrKey])
    })
  }

  // when app has rendered in server, send SSR state to client
  if (process.server) {
    nuxt.hook('app:rendered', () => {
      nuxt.payload[ssrKey] = ssr.extractData()
    })
  }

  const client = createClient({
    url: config.public.apiUrl,
    exchanges: [
      dedupExchange,
      ssr,
      fetchExchange,
    ]
  })

  nuxt.provide('urql', client)
  vueApp.provide('$urql', ref(client))

})

declare module '#app' {
  interface NuxtApp {
    $urql: Client
  }
}
