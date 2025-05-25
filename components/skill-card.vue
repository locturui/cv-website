<template>
  <div class="card bg-base-100 shadow-md hover:-translate-y-1 hover:shadow-lg transition">
    <div class="card-body">
      <h3 class="card-title text-primary">{{ title }}</h3>
      <div class="flex flex-wrap gap-2 mt-2">
        <template v-for="t in items" :key="t.name">
          <div v-if="t.icon" class="tooltip" :data-tip="t.name">
            <span class="p-3 badge badge-outline">
              <Icon :name="t.icon" size="24" />
            </span>
          </div>
          <span v-else class="p-3 badge badge-outline">
            {{ t.name }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ 
  title: string; 
  items: {
    name: string,
    icon?: string, 
  }[] 
}>()
</script>
