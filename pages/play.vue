<script lang="ts" setup>
import { useStore } from '@/groups/play/store'
import Feed from '@/groups/play/components/Feed.vue'

const api = useApi()
const store = useStore()

</script>

<template>
  <div class="flex flex-row w-full items-start content-start">
    <Feed />
  </div>
</template>
