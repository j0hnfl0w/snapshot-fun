<script lang="ts" setup>
const { log } = useLogger('App')

onMounted(() => {
  log(':onMounted')
})
</script>

<template>
  <div class="flex flex-col w-full p-2 items-center content-center">
    <div class="flex flex-col w-full max-w-400px pb-4">
      <NuxtLink to="/">
        <h1 class="text-2xl">snapshot.fun</h1>
      </NuxtLink>
      <div class="flex flex-row gap-x-2">
        <NuxtLink to="/about">
          <span>About</span>
        </NuxtLink>
        <NuxtLink to="/play">
          <span>Play</span>
        </NuxtLink>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
