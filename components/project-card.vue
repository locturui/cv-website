<template>
  <a
    :href="p.link"
    target="_blank"
    class="card bg-base-100 hover:-translate-y-2 hover:shadow-xl transition">
    <figure>
      <img :src="p.image" :alt="p.title"
           class="aspect-video object-cover" />
    </figure>
    <div class="card-body">
      <h3 class="card-title">{{ p.title }}</h3>
      <p class="text-sm opacity-80">{{ p.desc }}</p>
      <div class="card-actions justify-end mt-2">
        <div
          v-for="tag in p.stack"
          :key="tag"
          class="badge badge-outline">{{ tag }}</div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{ p: {
  title: string; desc: string; link?: string;
  image: string; stack: string[];
} }>()
</script>
