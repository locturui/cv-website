<template>
  <div class="card bg-base-100 shadow-lg hover:-translate-y-1 hover:shadow-xl transition">
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="t in items"
          :key="t"
          class="badge badge-outline">{{ t }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: string[] }>()
</script>
