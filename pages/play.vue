<script lang="ts" setup>
const api = useApi();
</script>

<template>
  <div>
    <div v-for="p in api.proposals" :key="p.id">
      <span>{{ p.title }}</span>
      <pre style="font-size: 12px">{{ p }}</pre>
      <button>Answer</button>
    </div>
  </div>
</template>
