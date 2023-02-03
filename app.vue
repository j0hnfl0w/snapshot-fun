<script lang="ts" setup>
const showAbout = ref(true)

function clear() {
  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 w-full flex flex-row justify-center p-2 z-100">
      <div class="flex flex-row flex-wrap w-full justify-between max-w-550px pt-2 px-4">
        <h1 class="font-semibold text-lg">snapshot.fun</h1>
        <div class="flex flex-row gap-x-2">
          <span @click="clear()">Clear</span>
          <span @click="showAbout = !showAbout">About</span>
        </div>
        <div v-if="showAbout" class="flex flex-col w-full gap-y-2 text-justify pt-2" @click="showAbout = false">
          <p>We noticed that after the voting on Proposal ends, they are no longer interesting to anyone - this is our attempt to give them a second life.</p>
          <p>Rewind all past proposals and try to guess how the vote went (don't peek).</p>
        </div>
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
