<script lang="ts" setup>
import { useStore } from '@/groups/play/store'
import draggable from 'vuedraggable'

const props = defineProps({
  proposal: { type: Object, required: true }
})

const { log } = useLogger('Proposal')
const store = useStore()

const state = reactive({
  isDragging: false,
})

// const choicesLocal = reactive(props.proposal.choices)
// const choicesLocal = JSON.parse(JSON.stringify(props.proposal.choices))
const choicesLocal = ref(JSON.parse(JSON.stringify(props.proposal.choices)))

watch(
  () => choicesLocal,
  (to, from) => {
    log(':W choicesLocal', to, from)
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col mb-2">
      <h2 class="font-semibold text-lg">{{ proposal.title }}</h2>
      <small class="text-gray-700">Order by you think people voted</small>
    </div>
    <draggable 
      v-model="choicesLocal" 
      :group="`proposal:${proposal.id}`" 
      @start="state.isDragging = true" 
      @end="state.isDragging = false" 
      :item-key="i => i"
      class="flex flex-col gap-y-1"
    >
      <template #item="{ element }">
        <div class="rounded cursor-auto flex flex-row bg-gray-300 p-2">
          <span class="mx-2 text-gray-700">::</span>
          <span>{{ element }}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>
