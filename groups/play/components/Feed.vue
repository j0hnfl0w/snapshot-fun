<script lang="ts" setup>
import Proposal from './Proposal.vue'

const { log } = useLogger('Feed')
const { state, proposals, proposalsFiltered, proposalsAnsweredMeta, proposal, skip, answer } = await useApi()

onMounted(() => {
  log(':onMounted')
})
</script>

<template>
  <div
    class="flex flex-col w-full items-center content-center justify-center px-4 h-screen bg"
    :class="state"
  >
    <div class="w-full max-w-550px">
      <Proposal
        v-if="proposal"
        :key="proposal.id"
        :proposal="proposal"
        :skip="skip"
        :answer="answer"
        class="max-w-550px"
      >
      </Proposal>
    </div>
    <div class="fixed bottom-0 left-0 flex flex-row w-full justify-center p-2">
      <div class="max-w-550px flex">
        <pre class="text-xs">{{ proposalsAnsweredMeta }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  transition: background-color 0.5s;
}
.win {
  @apply bg-green-3;
}
.lose {
  @apply bg-red-4;
}
</style>
