<template>
  <button
    @click="$emit('openProject', p)"
    class="group relative card bg-base-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 cursor-pointer text-left overflow-hidden border border-base-300 hover:border-primary/50">
    <figure class="relative overflow-hidden">
      <img :src="p.image" :alt="p.title"
           class="aspect-video object-cover transition-transform duration-700 group-hover:scale-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-base-300/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div class="absolute top-3 right-3 badge badge-primary badge-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
        View Details →
      </div>
    </figure>
    <div class="card-body">
      <h3 class="card-title text-lg font-bold group-hover:text-primary transition-colors">{{ p.title }}</h3>
      <p class="text-sm opacity-70 line-clamp-2 group-hover:opacity-100 transition-opacity">{{ p.desc }}</p>
      <div class="card-actions justify-end mt-3 flex-wrap">
        <div
          v-for="tag in p.stack"
          :key="tag"
          class="badge badge-outline badge-sm hover:badge-primary transition-all">{{ tag }}</div>
      </div>
    </div>
    <div class="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/20 rounded-2xl transition-all duration-500 pointer-events-none"></div>
  </button>
</template>

<script setup lang="ts">
defineProps<{ p: {
  title: string; desc: string; link?: string;
  image: string; images: string[]; description: string; stack: string[];
} }>()

defineEmits<{
  openProject: [project: any]
}>()
</script>
