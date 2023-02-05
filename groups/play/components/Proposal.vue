<script lang="ts" setup>
import { shortenString } from '@/utils'

const props = defineProps({
  proposal: { type: Object, required: true },
  answer: { type: Function, required: true },
  skip: { type: Function, required: true },
})

const choiceIdx = ref(-1)
const isLoading = ref(false)

function pick(idx: number) {
  if (choiceIdx.value === idx) {
  isLoading.value = true
  props.answer(idx).then(() => {
    isLoading.value = false
    choiceIdx.value = -1
  })
  } else {
    choiceIdx.value = idx
  }
}
</script>

<template>
  <div class="flex flex-col w-full overflow-hidden">
    <!-- header -->
    <div class="flex flex-col mb-2 px-4 text-center">
      <h1 class="font-semibold text-2xl">{{ proposal.title }}</h1>
      <!-- <article v-html="proposal.body" class="text-start"></article> -->
      <small class="text-gray-400">by {{ shortenString(proposal.author) }} in {{ proposal.space?.id }}</small>
    </div>
    <!-- items -->
    <div class="flex flex-col w-full py-4">
      <div
        v-for="(c, ci) in proposal.choices" :key="c"
        :class="choiceIdx === ci ? 'null' : 'px-4'"
        class="flex flex-col text-center"
      >
        <BaseButton
          :type="choiceIdx === ci ? 'primary' : 'secondary'"
          :disabled="isLoading"
          class="w-full"
          @click="pick(ci)"
        >
          <span>{{ c }}</span>
        </BaseButton>
        <div class="h-24px text-center flex flex-row justify-center items-start content-start">
          <small v-if="choiceIdx === ci" class="text-gray-400">{{isLoading ? 'loading' : 'click again to answer'}}</small>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="flex flex-col w-full p-4">
      <BaseButton type="secondary" class="opacity-60" @click="skip()">
        Skip
        <div i-heroicons-outline-arrow-right class="w-20px h-20px"></div>
      </BaseButton>
    </div>
    <!-- <pre class="text-xs">{{ proposal }}</pre> -->
  </div>
</template>
