<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <button
    class="flex flex-row justify-center items-center content-center gap-x-2 rounded min-w-100px p-2 "
    :class="props.type">
    <slot />
  </button>
</template>

<style scoped>
.primary {
  @apply bg-yellow-400 hover:bg-yellow-500 color-black;
}
.secondary {
  @apply bg-gray-3 hover:bg-gray-4 color-black;
}
</style>
