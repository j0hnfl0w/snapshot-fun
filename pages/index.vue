<script lang="ts" setup>
import Feed from '@/groups/play/components/Feed.vue'
</script>

<template>
  <div class="flex flex-col w-full h-screen items-center content-center justify-center">
    <ClientOnly>
      <Feed />
    </ClientOnly>
  </div>
</template>
