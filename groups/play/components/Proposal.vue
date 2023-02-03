<script lang="ts" setup>
const props = defineProps({
  proposal: { type: Object, required: true },
  answer: { type: Function, required: true },
  skip: { type: Function, required: true },
})

const choiceIdx = ref(-1)

function pick(idx: number) {
  if (choiceIdx.value === idx) {
    props.answer(idx)
  } else {
    choiceIdx.value = idx
  }
}
</script>

<template>
  <div class="flex flex-col w-full overflow-hidden">
    <!-- header -->
    <div class="flex flex-col mb-2 px-4">
      <h1 class="font-semibold text-2xl">{{ proposal.title }}</h1>
      <!-- <article v-html="proposal.body" class="text-start"></article> -->
      <small class="text-gray-700">Pick aswer you think people voted</small>
      <!-- <small class="text-xs">{{ proposal.id }}</small> -->
    </div>
    <!-- items -->
    <div class="flex flex-col gap-y-2 w-full">
      <div
        v-for="(c, ci) in proposal.choices" :key="c"
        :class="choiceIdx === ci ? 'null' : 'px-4'"
      >
        <BaseButton
          :type="choiceIdx === ci ? 'primary' : 'secondary'"
          class="w-full"
          @click="pick(ci)"
        >
          <span>{{ c }}</span>
        </BaseButton>
      </div>
    </div>
    <!-- footer -->
    <div class="flex flex-col w-full p-4">
      <!-- <small>Scores total: {{ proposal.scores_total}}</small> -->
      <BaseButton type="secondary" @click="skip()">
        Skip
        <div i-heroicons-outline-arrow-right class="w-20px h-20px"></div>
      </BaseButton>
    </div>
    <!-- <pre class="text-xs">{{ proposal }}</pre> -->
  </div>
</template>
