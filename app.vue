<script lang="ts" setup>
// useHead({
//   title: 'snapshot.guess',
//   meta: [
//     { name: 'description', content: 'Get a random Proposal from snapshot.org and try to guess how people voted.' }
//   ],
// })
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 w-full flex flex-row justify-center p-2 z-100">
      <div class="flex flex-col flex-wrap w-full items-center content-center justify-center max-w-550px pt-2 px-4 text-center">
        <h1 class="font-semibold text-2xl mb-2">snapshot.guess</h1>
        <p>Get a random Proposal from <a href="https://snapshot.org" class="underline">snapshot.org</a><br> and try to guess how people voted.</p>
      </div>
    </div>
  </div>
  <NuxtPage />
</template>

<style>
.br {
  outline: 1px solid red;
}
</style>
