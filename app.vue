<script lang="ts" setup>
const { log } = useLogger('App')

onMounted(() => {
  log(':onMounted')
})
</script>

<template>
  <div class="flex flex-col w-full p-2 items-center content-center">
    <div class="flex flex-row w-full max-w-400px pb-4 items-center content-center justify-between">
      <NuxtLink to="/">
        <h1 class="text-2xl">snapshot.fun</h1>
      </NuxtLink>
      <NuxtLink to="/about">
          <span class="mt-1">About</span>
        </NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>
