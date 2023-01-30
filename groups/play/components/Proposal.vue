<script lang="ts" setup>
import { useStore } from '@/groups/play/store'
import draggable from 'vuedraggable'

const props = defineProps({
  proposal: { type: Object, required: true }
})

const { log } = useLogger('Proposal')
const store = useStore()

const state = reactive({
  isDragging: false
})

const choicesLocal = ref(JSON.parse(JSON.stringify(props.proposal.choices)))
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col mb-2">
      <h2 class="font-semibold text-lg">{{ proposal.title }}</h2>
      <small class="text-gray-700">Order by you think people voted</small>
    </div>
    <!-- TODO: handle diff types? -->
    <template v-if="proposal.type === 'single-choice'">
      <draggable 
        v-model="choicesLocal" 
        :group="`proposal:${proposal.id}`" 
        @start="state.isDragging = true" 
        @end="state.isDragging = false" 
        :item-key="i => i"
        class="flex flex-col gap-y-1 items-center content-center"
      >
        <template #item="{ element, index }">
          <div class="rounded cursor-auto flex flex-row bg-gray-300 w-full p-2" :style="{maxWidth: 100-(index*3)+'%'}">
            <span class="mx-2 text-gray-700">::</span>
            <span>{{ element }}</span>
          </div>
        </template>
      </draggable>
    </template>
    <BaseButton class="mt-2">Submit answer</BaseButton>
  </div>
</template>
