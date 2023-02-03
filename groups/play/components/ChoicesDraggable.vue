<script lang="ts" setup>
const props = defineProps({
  proposal: { type: Object, required: true }
})

const state = reactive({
  isDragging: false
})

const choicesLocal = ref(JSON.parse(JSON.stringify(props.proposal.choices)))
</script>

<template>
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