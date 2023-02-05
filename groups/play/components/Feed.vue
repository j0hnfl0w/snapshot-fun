<script lang="ts" setup>
import Proposal from './Proposal.vue'

const { log } = useLogger('Feed')
const { state, page, proposals, proposalsAnsweredMeta, proposal, skip, answer } = await useApi()

const winRateText = computed(() => {
  return Math.round(proposalsAnsweredMeta.value.winRate * 100)
})

function clear() {
  localStorage.clear()
  window.location.reload()
}

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
    <!-- footer -->
    <div class="fixed bottom-0 left-0 flex flex-row w-full justify-center p-2">
      <div class="max-w-550px flex flex-col items-center content-center">
        <h2 class="font-bold" style="font-size: 50px">{{ winRateText }}%</h2>
        <p>your winrate</p>
        <span class="cursor-pointer underline mt-2" @click="clear()">start again</span>
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
  @apply bg-red-3;
}
</style>
