<script lang="ts" setup>
import { useStore } from '@/groups/play/store'
import Proposal from './Proposal.vue'

const { log } = useLogger('Feed')
const store = useStore()

onMounted(() => {
  log(':onMounted')
})
</script>

<template>
  <div class="flex flex-col mb-400px w-full pt-100px gap-y-200px items-center content-center">
    <Proposal
      v-for="p in store.proposals" :key="p.id"
      :proposal="p"
      class="max-w-400px"
    >
    </Proposal>
  </div>
</template>
